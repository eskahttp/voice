'use server';

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {pool} from "@/app/lib/db";

type userChats = {
    conversation_id: number;
    user_id: number;
    nickname : string;
    login : string;
    avatar_url : string;
}

export const getAllUserChats = async (): Promise<userChats[]> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) redirect('/login');
    const session = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);
    if (session.rows.length === 0) redirect('/login');

    const userId: number = session.rows[0].login_id;

    const result = await pool.query(
        `
            SELECT
                c.id                AS conversation_id,
                u.id                AS user_id,
                u.nickname,
                u.login,
                u.avatar_url
            FROM conversations c
                     JOIN users u
                          ON u.id = CASE
                                        WHEN c.user_one_id = $1 THEN c.user_two_id
                                        ELSE c.user_one_id
            END
        `,
        [userId]
    );

    return result.rows;

};