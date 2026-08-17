'use server';

import {cookies} from "next/headers";
import {pool} from "@/app/lib/db";
import {redirect} from "next/navigation";

export async function MessageAction(formData: FormData, serverId : string) : Promise<void> {
    const Message = formData.get('message');

    if (!Message) return

    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const CheckUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);

    const IdUser = CheckUser.rows[0].login_id;

    if (CheckUser.rows.length === 0) redirect('/login');

    await pool.query('INSERT INTO message_user_server (server_id,user_id,message) VALUES ($1,$2,$3)', [serverId,IdUser,Message]);

}