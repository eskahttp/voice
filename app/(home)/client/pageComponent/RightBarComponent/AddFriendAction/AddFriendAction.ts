'use server';

import { pool } from '@/app/lib/db';
import { cookies } from 'next/headers';
import {getClientIp} from "@/app/lib/get-client-ip";
import {rateLimit} from "@/app/lib/rate-limit";
import {redirect} from "next/navigation";

export async function AddFriendAction(formData: FormData): Promise<{message: string, color: string, checkIt: boolean}>{
    const ip = await getClientIp();
    const { allowed } = rateLimit({
        action: 'login',
        identifier: ip,
        limit: 10,
        windowMs: 10 * 60 * 1000,
    });
    if (!allowed) {
        return { message: 'Try again later.' , color: 'red', checkIt: false };
    }

    const FriendLogin = formData.get('FriendLogin')

    if (!FriendLogin) {
        return { message: 'Please enter a username.', color: 'red' , checkIt: false};
    }

    const FriendIdQuery = await pool.query('SELECT id FROM users WHERE login = $1',[FriendLogin]);

    if (FriendIdQuery.rows.length === 0) {
        return { message: 'Hm, didn`t work.Double check that the username is correct.', color: 'red', checkIt: false };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    const CheckFriendsList = await pool.query('SELECT created_at FROM friends ' +
        'WHERE user_id1 = $1 AND user_id2 = $2 ' +
        'OR user_id1 = $2 AND user_id2 = $1',[UserId.rows[0].login_id, FriendIdQuery.rows[0].id])

    if(CheckFriendsList.rows.length > 0) {
        return {message: `You're already friends with this user!`, color: 'red', checkIt: false}
    }

    const CheckFriendShips = await pool.query(
        'SELECT id FROM friendships WHERE requester_id = $1 AND addressee_id = $2',[UserId.rows[0].login_id, FriendIdQuery.rows[0].id])

    if (CheckFriendShips.rows.length > 0) return {message: `Success! Your friend request to ${FriendLogin} was sent.`, color: 'green', checkIt: false}

    await pool.query('INSERT INTO friendships (requester_id,addressee_id) VALUES ($1,$2) RETURNING id'
        , [UserId.rows[0].login_id, FriendIdQuery.rows[0].id])

    return {message: `Success! Your friend request to ${FriendLogin} was sent.`, color: 'green', checkIt: true}
}