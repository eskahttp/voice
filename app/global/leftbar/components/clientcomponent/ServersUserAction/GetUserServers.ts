'use server';

import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

interface ServerArray {
 id: number;
 server_name: string;
 server_id: number;
}

export async function GetUserServers(): Promise<ServerArray[]>{
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const IdUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [token]);


    if (IdUser.rows.length === 0) redirect('/login');


    const result = await pool.query('SELECT id,server_name,server_id FROM server_users WHERE user_id = $1', [IdUser.rows[0].login_id]);

    console.log(result.rows);


    return result.rows;
}