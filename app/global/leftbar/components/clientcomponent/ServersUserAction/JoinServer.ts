'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";


export async function JoinServerAction(formData: FormData): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const CheckId = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);

    if (CheckId.rows.length === 0) redirect('/login');

    const UserNickname = await pool.query('SELECT nickname FROM users WHERE id = $1', [CheckId.rows[0].login_id]);

    const ServerName = formData.get('ServerName');

    const Server = await pool.query('SELECT id,name FROM servers WHERE referal = $1', [ServerName])



    const IdServer = Server.rows[0].name ;
    const Nickname = UserNickname.rows[0].nickname;
    const UserId = CheckId.rows[0].login_id;
    const ServerId = Server.rows[0].id;

    await pool.query('INSERT INTO server_users (server_name,nickname,user_id,server_id) VALUES ($1,$2,$3,$4)',
        [IdServer,Nickname,UserId,ServerId]);

    redirect(`/client/${ServerId}`);
}