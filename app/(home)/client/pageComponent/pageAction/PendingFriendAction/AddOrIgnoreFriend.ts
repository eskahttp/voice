'use server';

import { pool } from '@/app/lib/db';
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

export async function AddOrNotFriend(AccOrIgn: boolean, PendingId: number){
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    const CookieId = Number(UserId.rows[0].login_id)

    if(AccOrIgn){
       await pool.query('INSERT INTO friends (user_id1, user_id2) ' +
            'VALUES (LEAST($1::bigint, $2::bigint), GREATEST($1::bigint, $2::bigint));',[CookieId,Number(PendingId)])

       await pool.query('DELETE FROM friendships WHERE addressee_id = $1 AND requester_id = $2', [CookieId, Number(PendingId)])

        const ProfileFriend = await pool.query('SELECT id,login,nickname FROM users WHERE id = $1',[Number(PendingId)])
        return ProfileFriend.rows[0]
    }
    else {
        await pool.query('DELETE FROM friendships WHERE addressee_id = $1 AND requester_id = $2', [CookieId, Number(PendingId)])
    }
}