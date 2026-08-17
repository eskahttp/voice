'use server';

import { pool } from '@/app/lib/db';

interface Users {
    id: string;
    nickname: string;
}

export async function TakeUserServer( id: string ): Promise<Users[]> {
    const res = await pool.query('SELECT u.id, u.nickname\n' +
        'FROM users u\n' +
        'INNER JOIN server_users su ON su.user_id = u.id\n' +
        'WHERE su.server_id = $1;', [id])

    return res.rows;
}