'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import { redirect } from 'next/navigation';

interface ServerArray {
    id: number;
    name: string;
}

export async function GetUserServers(): Promise<ServerArray[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const session = await pool.query(
        'SELECT login_id FROM session WHERE cookie = $1',
        [token]
    );

    if (session.rows.length === 0) redirect('/login');

    const userId = session.rows[0].login_id;

    const result = await pool.query(
        `SELECT servers.id, servers.name
         FROM servers
         JOIN server_users ON server_users.server_id = servers.id
         WHERE server_users.user_id = $1`,
        [userId]
    );

    return result.rows;
}