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


    const ServerName = formData.get('ServerName');

    const Server = await pool.query('SELECT id FROM servers WHERE referal = $1', [ServerName])

    const ServerId = Server.rows[0].id;

    redirect(`/client/${ServerId}`);
}