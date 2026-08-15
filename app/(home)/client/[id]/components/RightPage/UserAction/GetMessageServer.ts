'use server';

import {pool} from "@/app/lib/db";

interface GetMessageServer {
    id: string;
    nickname: string;
    message: string;
    created_at: string;
}

export async function getMessage(id : string): Promise<GetMessageServer[]> {

    const result = await pool.query('SELECT\n' +
        '            mus.id,\n' +
        '            u.nickname,\n' +
        '            mus.message,\n' +
        '            TO_CHAR(mus.created_at, \'HH24:MI\') AS created_at\n' +
        '        FROM message_user_server mus\n' +
        '        JOIN users u ON u.id = mus.user_id\n' +
        '        WHERE mus.server_id = $1\n' +
        '        ORDER BY mus.created_at ASC', [id])

    return result.rows;

}