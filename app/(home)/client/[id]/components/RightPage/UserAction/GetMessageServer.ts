'use server';

import {pool} from "@/app/lib/db";

interface GetMessageServer {
    id: string;
    login: string;
    nickname: string;
    avatar_url: string;
    message: string;
    created_at: string;
}

export async function getMessage(id : string): Promise<GetMessageServer[]> {

    const result = await pool.query(`SELECT 
                    mus.id,
                    u.nickname,
                    u.login,
                    u.avatar_url,
                    mus.message,
                    TO_CHAR(mus.created_at, \'HH24:MI\') AS created_at
                FROM message_user_server mus
                JOIN users u ON u.id = mus.user_id
                WHERE mus.server_id = $1
                ORDER BY mus.created_at ASC`, [id])

    return result.rows;

}