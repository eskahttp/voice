'use server';

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {pool} from "@/app/lib/db";

export const CreateMessageConversations = async (memberId: number) : Promise<number>=>{
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) redirect('/login');
    const session = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);
    if (session.rows.length === 0) redirect('/login');

    const conversationId = await pool.query('SELECT id FROM conversations WHERE ' +
        '(user_one_id = $1 AND user_two_id = $2) OR (user_one_id = $2 AND user_two_id = $1)'
        ,[session.rows[0].login_id, memberId])

    if (conversationId.rows.length === 0) {
        const newConversationId = await pool.query(
            'INSERT INTO conversations (user_one_id, user_two_id) VALUES ($1, $2) RETURNING id', [session.rows[0].login_id, memberId]);

        return newConversationId.rows[0].id
    }

    return conversationId.rows[0].id
}