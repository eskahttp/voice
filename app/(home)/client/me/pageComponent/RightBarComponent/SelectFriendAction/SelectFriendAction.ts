'use server';

import { pool } from '@/app/lib/db';
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

export async function selectFriendAction(){
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserIdQuerry = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserIdQuerry.rows.length === 0) redirect('/login');

    const UserId = UserIdQuerry.rows[0].login_id;

    const friendsList = await pool.query(
        `SELECT u.id, u.nickname, u.login
   FROM (
     SELECT user_id2 AS friend_id FROM friends WHERE user_id1 = $1
     UNION ALL
     SELECT user_id1 AS friend_id FROM friends WHERE user_id2 = $1
   ) f
   JOIN users u ON u.id = f.friend_id;`,
        [UserId]
    );

    return friendsList.rows;
}