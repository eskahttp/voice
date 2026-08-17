'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

export async function CheckUserOnServer(ServerId: string): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    const Check = await pool.query('SELECT id FROM server_users WHERE server_id = $1' +
        ' AND user_id = $2'
        ,[ServerId,UserId.rows[0].login_id]);

    if (Check.rows.length === 0) return 'No'

    return 'Yes'
}