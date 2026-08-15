'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function AddInServer(ServerId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    await pool.query('INSERT INTO server_users (server_id, user_id) VALUES ($1,$2)',[ServerId, UserId.rows[0].login_id]);

    revalidatePath(`/client/${ServerId}`);
}