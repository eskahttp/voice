'use server';

import { pool } from '@/app/lib/db';
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

export async function CheckPendingFriend(){
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    const PendingFriend = await pool.query('SELECT users.nickname,users.id,users.login FROM friendships ' +
        'JOIN users ON friendships.requester_id = users.id WHERE addressee_id = $1',[UserId.rows[0].login_id])

    return PendingFriend.rows
}