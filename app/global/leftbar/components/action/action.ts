'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

export async function CreateServer(formData: FormData): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const ServerName = formData.get('ServerName');

    const IdUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);

    if (IdUser.rows.length === 0) redirect('/login');

    const CheckUser = IdUser.rows[0].login_id;

    if (!CheckUser) redirect('/login');

    const result : string = [...crypto.getRandomValues(new Uint8Array(9))]
        .map(n => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[n % 52])
        .join('');

    try
    {
        await pool.query('INSERT INTO servers (creator_id,name, referal) VALUES ($1,$2,$3)',
            [CheckUser, ServerName, result])
    }
    catch (e) {
        console.log(e);
        await pool.query('INSERT INTO servers (creator_id,name, referal) VALUES ($1,$2,$3)',
            [CheckUser, ServerName, result])
    }

    const CheckNickname = await pool.query('SELECT nickname FROM users WHERE id = $1', [CheckUser])

    const Nickname = CheckNickname.rows[0].nickname

    const TakeServer = await pool.query(
        'SELECT id,name FROM servers WHERE creator_id = $1 AND name = $2 AND referal = $3', [CheckUser, ServerName,result]);

    const server:string = TakeServer.rows[0].id
    const serverName:string =  TakeServer.rows[0].name

    await pool.query('' +
        'INSERT INTO server_users (server_name,nickname, user_id ,server_id) VALUES ($1,$2,$3,$4)',[serverName,Nickname,CheckUser, server])

    await pool.query('INSERT INTO voice_chanels (server_id,name) VALUES ($1,$2)',[server,'Лобби'])


    redirect(`/client/${server}`);

}