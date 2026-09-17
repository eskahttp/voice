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

io.on('connection', async (socket) => {
    const token = getCookie(socket.handshake.headers.cookie, 'sessionToken');

    if (!token) return socket.disconnect();


    const { rows } = await pool.query(
        `SELECT u.id, u.login, u.nickname 
         FROM session s 
         JOIN users u ON u.id = s.login_id 
         WHERE s.cookie = $1`,
        [token]
    );
    if (rows.length === 0) return socket.disconnect();

    const user = rows[0];
    socket.data.user = user;

    const userId = user.id;

    const wasOffline = !onlineUsers.has(userId);
    if (wasOffline) {
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);


    const { rows: friendsRows } = await pool.query(
        `SELECT user_id2 AS friend_id FROM friends WHERE user_id1 = $1
         UNION
         SELECT user_id1 AS friend_id FROM friends WHERE user_id2 = $1`,
        [userId]
    );

    const friendIds = friendsRows.map(r => Number(r.friend_id));

    const onlineFriendIds = friendIds.filter(id => onlineUsers.has(id));
    socket.emit('onlineFriends', onlineFriendIds);

    if (wasOffline) {
        for (const fid of friendIds) {
            const sockets = onlineUsers.get(fid);
            if (sockets) {
                io.to([...sockets]).emit('CameOnline', userId);
            }
        }
    }

    socket.on('sendFriendRequest', async (login) => {
        try {
            if (typeof login !== 'string' || login.length === 0 || login.length > 28) return;

            const { rows } = await pool.query(
                `SELECT id FROM users WHERE login = $1`,
                [login]
            );
            if (rows.length === 0) return;

            const targetId = rows[0].id;
            const targetSockets = onlineUsers.get(targetId);
            if (!targetSockets) return;

            io.to([...targetSockets]).emit('friendRequestReceived', socket.data.user);
        } catch (err) {
            console.error('sendFriendRequest error:', err);
        }
    });

    socket.on('AdoptedProfile', (PendingFriendId) => {
        const targetSockets = onlineUsers.get(PendingFriendId);
        if (!targetSockets) return;

            io.to([...targetSockets]).emit('AdoptedProfile', socket.data.user);
    })

    socket.on('joinRoom', (serverId) => socket.join(serverId));

    socket.on('message', ({ serverId, ...msg }) => {
        io.to(serverId).emit('message', msg);
    });

    socket.on('leaveRoom', (serverId) => socket.leave(serverId));

    socket.on('userJoinedServer', ({ serverId, user }) => {
        io.to(serverId).emit('userJoined', user);
    });

    socket.on('disconnect', () => {
        const userSockets = onlineUsers.get(userId);
        if (!userSockets) return;

        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
            for (const fid of friendIds) {
                const sockets = onlineUsers.get(fid);
                if (sockets) {
                    io.to([...sockets]).emit('friendOffline', userId);
                }
            }
            onlineUsers.delete(userId);
        }
    });
});

httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
});