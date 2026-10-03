// @ts-check
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import next from 'next';
import { Server } from 'socket.io';
import { runner } from 'node-pg-migrate';
import dotenv from 'dotenv';
import fs from 'fs';
import { Pool } from 'pg';
import {getCookie} from "./getCookie.js";
import {clearTimeout, setTimeout} from "node:timers";
import {privateDecrypt} from "node:crypto";

if (fs.existsSync('.env.local')) {
    dotenv.config({ path: '.env.local' });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT) || 3000;

const databaseUrl = process.env.DATABASE_URL
    ?? (dev ? 'postgres://postgres:root@localhost:5432/Voice' : undefined);

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString: databaseUrl });

await runner({
    databaseUrl,
    dir: path.join(__dirname, 'migrations'),
    migrationsTable: 'pgmigrations',
    direction: 'up',
    count: Infinity,
    verbose: true,
    logger: console,
});

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

await app.prepare();

const httpServer = createServer(handler);

const io = new Server(httpServer)

const onlineUsers = new Map();
const disconnectTimers = new Map();

io.on('connection', async (socket) => {
    const token = getCookie(socket.handshake.headers.cookie, 'sessionToken');

    if (!token) return socket.disconnect();


    const { rows } = await pool.query(
        `SELECT u.id, u.login, u.nickname ,u.avatar_url, u.created_at
         FROM session s 
         JOIN users u ON u.id = s.login_id 
         WHERE s.cookie = $1`,
        [token]
    );
    if (rows.length === 0) return socket.disconnect();

    const user = rows[0];
    socket.data.user = user;

    const userId = Number(user.id);
    socket.data.userId = userId;

    if (disconnectTimers.has(socket.data.userId)) {
        clearTimeout(disconnectTimers.get(socket.data.userId));
        disconnectTimers.delete(socket.data.userId);
    }

    const wasOffline = !onlineUsers.has(socket.data.userId);
    if (wasOffline) {
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);


    const [friendsResult, serversResult] = await Promise.all([
        pool.query(
            `SELECT user_id2 AS friend_id FROM friends WHERE user_id1 = $1
         UNION
         SELECT user_id1 AS friend_id FROM friends WHERE user_id2 = $1`,
            [socket.data.userId]
        ),
        pool.query(
            `SELECT server_id FROM server_users WHERE user_id = $1`,
            [socket.data.userId]
        )
    ]);
    const friendsRows = friendsResult.rows;
    const serversRows = serversResult.rows;

    const friendIds = friendsRows.map(r => Number(r.friend_id));
    const serverIds = serversRows.map(r => String(r.server_id));

    const onlineFriendIds = friendIds.filter(id => onlineUsers.has(id));

    socket.emit('onlineFriends', {onlineFriendIds: onlineFriendIds, allFriends: friendIds});

    if (wasOffline) {
        for (const fid of friendIds) {
            const sockets = onlineUsers.get(fid);
            if (sockets) {
                io.to([...sockets]).emit('CameOnline', socket.data.userId);
            }
        }

        if (serverIds.length > 0){
            for (const sid of serverIds) {
                socket.to(sid).emit('newOnlineUser', socket.data.userId);
            }
        }
    }

    socket.on('avatarChanged', (avatarChanged)=> {
        if (typeof avatarChanged !== 'string') return;
        socket.data.user.avatar_url = avatarChanged;
    })

    socket.on('getServerUsers', async(serverId)=> {
        const CheckUserOnServer = await pool.query('SELECT user_id FROM server_users WHERE server_id = $1 AND user_id = $2', [serverId, socket.data.userId])
        if (CheckUserOnServer.rows.length === 0) return;

        const AllUsersServerQuery = await pool.query('SELECT u.id, u.nickname,u.login ,u.avatar_url\n' +
            'FROM users u\n' +
            'INNER JOIN server_users su ON su.user_id = u.id\n' +
            'WHERE su.server_id = $1;', [serverId])

        const AllUsersServer = AllUsersServerQuery.rows;
        const OnlineUsersServer = AllUsersServer.map(user => user.id).filter(id => onlineUsers.has(id));

        socket.emit('getAllUsersAndOnlineUsers', {AllUsersServer: AllUsersServer, OnlineUsersServer: OnlineUsersServer});

    })

    socket.on('sendFriendRequest', async (login) => {
        try {
            if (typeof login !== 'string' || login.length === 0 || login.length > 28) return;

            const { rows } = await pool.query(
                `SELECT id FROM users WHERE login = $1`,
                [login]
            );
            if (rows.length === 0) return;
            if (rows[0].id === socket.data.userId) return;

            const checkIt= await pool.query(
                `SELECT 'friends' AS type FROM friends
                                WHERE (user_id1 = $1 AND user_id2 = $2)
                                OR (user_id1 = $2 AND user_id2 = $1)
                                UNION ALL
                                SELECT 'request' AS type FROM friendships
                                WHERE (requester_id = $1 AND addressee_id = $2)
                                OR (requester_id = $2 AND addressee_id = $1)
                                LIMIT 1`,
                [socket.data.userId, rows[0].id]
            );

            if (checkIt.rows.length > 0) return

            await pool.query('INSERT INTO friendships (requester_id,addressee_id) VALUES ($1,$2)'
                , [socket.data.userId, rows[0].id])


            const targetId = rows[0].id;
            const targetSockets = onlineUsers.get(targetId);
            if (!targetSockets) return;

            io.to([...targetSockets]).emit('friendRequestReceived', socket.data.user);
        } catch (err) {
            console.error('sendFriendRequest error:', err);
        }
    });

    socket.on('AdoptedProfile',async (PendingFriendId) => {
        if (typeof PendingFriendId !== 'number' || !Number.isInteger(PendingFriendId)) return;


        const targetSockets = onlineUsers.get(PendingFriendId);
        if (!targetSockets || targetSockets.size === 0) return

        const mySockets = onlineUsers.get(socket.data.userId);

        const { rows } = await pool.query(
            `SELECT 1 FROM friends 
         WHERE (user_id1 = $1 AND user_id2 = $2)
            OR (user_id1 = $2 AND user_id2 = $1)
         LIMIT 1`,
            [socket.data.userId, PendingFriendId]
        );
        if (rows.length === 0) return;

        io.to([...targetSockets]).emit('AdoptedProfile', socket.data.user);
        io.to([...mySockets ]).emit('CameOnline', PendingFriendId);
    })

    socket.on('joinRoom', (serverId) => socket.join(serverId));
    socket.on('leaveRoom', (serverId) => socket.leave(serverId));

    socket.on('message', async ({ serverId, messageStr }) => {
        const UserOnServer = await pool.query('SELECT server_id FROM server_users WHERE server_id = $1' +
            ' AND user_id = $2', [serverId,socket.data.userId]);
        if (UserOnServer.rows.length === 0) return

        const messId = await pool.query('INSERT INTO message_user_server (server_id,user_id,message) VALUES ($1,$2,$3) RETURNING id',
            [serverId,socket.data.userId,messageStr]);

        const dat = new Date();
        const hours = String(dat.getHours()).padStart(2, '0');
        const minutes = String(dat.getMinutes()).padStart(2, '0');

        io.to(serverId).emit('message', {
            id: messId.rows[0].id,
            login: socket.data.user.login,
            avatar_url: socket.data.user.avatar_url,
            nickname: socket.data.user.nickname,
            message: messageStr,
            created_at: `${hours}:${minutes}`
        });
    });

    socket.on('userJoinedServer', async( serverId ) => {
        try {
            await pool.query(
                'INSERT INTO server_users (server_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [serverId, socket.data.userId]
            );
        }
        catch (err) {
            console.error('userJoinedServer error:', err);
            return;
        }

        io.to(serverId).emit('userJoined', socket.data.user);
    });

    socket.on('selectedProfile', async(login)=>{
        if (typeof login !== 'string' || login.length === 0 || login.length > 28) return;

        const selectedProfileInfo = await pool.query(
            `SELECT id,login, nickname, created_at, avatar_url
         FROM users
         WHERE login = $1`,
            [login]
        );

        const userLoginId = selectedProfileInfo.rows[0].id;

        const commonServers = await pool.query(
            `SELECT s.id, s.name
         FROM servers s
         JOIN server_users m1 ON m1.server_id = s.id AND m1.user_id = $1
         JOIN server_users m2 ON m2.server_id = s.id AND m2.user_id = $2`,
            [socket.data.userId, userLoginId]
        );

        socket.emit('infoUserProfile',{profileInfo: selectedProfileInfo.rows[0], commonServers: commonServers.rows});
    })

    socket.on('joinDM',async (userChatId)=> {
        if (typeof userChatId !== 'string') return;

        const receiverId = Number(userChatId)

        const roomId = socket.data.userId + receiverId
        socket.join(roomId)

        const received_id = await pool.query('SELECT id,login,nickname,avatar_url,created_at FROM users WHERE id = $1', [receiverId]);

        const privateUserMessage = await pool.query(`
            SELECT id, sender_id, receiver_id, body, created_at, read_at
            FROM private_messages
            WHERE LEAST(sender_id, receiver_id)    = LEAST($1, $2)
            AND GREATEST(sender_id, receiver_id) = GREATEST($1, $2)
            ORDER BY created_at DESC`,[socket.data.userId,receiverId]
        );

        const result = {
            usersProfile: {
                myProfile: socket.data.user,
                receiverProfile: received_id.rows[0]
            },
            privateUserMessage: privateUserMessage.rows ?? []
        }

        socket.emit('chatInfo', result)

        socket.on('leaveDM', ()=> {
            socket.leave(roomId)
        })
    })

    socket.on('disconnect', () => {
        const userSockets = onlineUsers.get(userId);
        if (!userSockets) return;

        userSockets.delete(socket.id);

        if (userSockets.size > 0) return;

        const disconnectTimer = setTimeout(async () => {
            const current = onlineUsers.get(userId);
            if (!current || current.size > 0) {
                disconnectTimers.delete(userId);
                return;
            }

            try {
                const [freshFriends, freshServers] = await Promise.all([
                    pool.query(
                        `SELECT user_id2 AS friend_id FROM friends WHERE user_id1 = $1
                     UNION
                     SELECT user_id1 AS friend_id FROM friends WHERE user_id2 = $1`,
                        [userId]
                    ),
                    pool.query(
                        `SELECT server_id FROM server_users WHERE user_id = $1`,
                        [userId]
                    ),
                ]);

                const currentFriendIds = freshFriends.rows.map(r => Number(r.friend_id));
                const currentServerIds = freshServers.rows.map(r => String(r.server_id));

                for (const fid of currentFriendIds) {
                    const sockets = onlineUsers.get(fid);
                    if (sockets) {
                        io.to([...sockets]).emit('friendOffline', userId);
                    }
                }

                for (const sid of currentServerIds) {
                    io.to(sid).emit('deleteOnlineUser', userId);
                }

                onlineUsers.delete(userId);
            } catch (err) {
                console.error('disconnect refresh error:', err);
            }
        }, 5000);

        disconnectTimers.set(userId, disconnectTimer);
    });
});

httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
});