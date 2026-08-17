'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


export async function JoinServerAction(formData: FormData): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const CheckId = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);

    if (CheckId.rows.length === 0) redirect('/login');


    const ServerName = formData.get('ServerName');

    const Server = await pool.query('SELECT id FROM servers WHERE referal = $1', [ServerName])


    const UserId = CheckId.rows[0].login_id;
    const ServerId = Server.rows[0].id;

    const CheckUserInServer = await pool.query('SELECT id FROM server_users WHERE server_id = $1' +
        ' AND user_id = $2', [UserId, ServerId]);

    if (CheckUserInServer.rows.length !== 0) return redirect(`/client/${ServerId}`)

    await pool.query('INSERT INTO server_users (server_id,user_id) VALUES ($1,$2)',
        [ServerId,UserId]);

    revalidatePath('/', 'layout');

    redirect(`/client/${ServerId}`);
}