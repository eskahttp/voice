'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import { redirect } from 'next/navigation';

export async function TakeMyInfo(): Promise<{ login: string, nickname: string, email: string, avatar_url: string }> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const result = await pool.query(
        `SELECT u.login,u.nickname,u.email,u.avatar_url
         FROM session s
         JOIN users u ON u.id = s.login_id
         WHERE s.cookie = $1`,
        [token]
    );

    if (result.rows.length === 0) redirect('/login');

    return result.rows[0]
}