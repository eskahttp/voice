'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

export async function TakeNickname(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const result = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (result.rows.length < 0) redirect('/login');

    const profile = await pool.query('SELECT nickname FROM users WHERE id = $1', [result.rows[0].login_id]);


    return profile.rows[0].nickname;
}