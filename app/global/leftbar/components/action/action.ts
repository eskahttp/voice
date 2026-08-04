'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';

export async function AddServer(formData: FormData): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    const ServerName = formData.get('ServerName');

    const IdUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token])

    await pool.query('INSERT INTO servers (login_id,name) VALUES ($1,$2)',
        [IdUser.rows[0].login_id, ServerName])

}