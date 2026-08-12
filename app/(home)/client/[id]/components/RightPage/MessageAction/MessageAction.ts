'use server';

import {cookies} from "next/headers";
import {pool} from "@/app/lib/db";
import {redirect} from "next/navigation";
import {io} from "socket.io-client";

export async function MessageAction(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const ServerId = formData.get('serverId');
    const Message = formData.get('message');

    const CheckUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);

    const IdUser = CheckUser.rows[0].login_id;

    if (CheckUser.rows.length === 0) redirect('/login');

    const TakeMessageId = await pool.query('INSERT INTO message_user_server (server_id,user_id,message) VALUES ($1,$2,$3) RETURNING id', [ServerId,IdUser,Message]);

    const MessageId = TakeMessageId.rows[0].id;

    const CheckNick = await pool.query('SELECT nickname FROM users WHERE id = $1', [IdUser])

    const NickName = CheckNick.rows[0].nickname


    const socket = io('http://localhost:3000');

    socket.on('connect', () => {



        socket.emit('message', {id: MessageId,nickname: NickName, message: Message, created_at: Date.now()});
        console.log("Сокет айди",socket.id);
    })



}