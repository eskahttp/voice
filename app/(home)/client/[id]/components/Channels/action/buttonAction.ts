'use server';

import { pool } from '@/app/lib/db';

interface Channel {
    id: string;
    name: string;
}

interface Result {
    serverName: string;
    channels: Channel[];
}

export async function TakeChannelsAndServerName(id: string): Promise<Result> {
    const [channelsRes, serverRes] = await Promise.all([
        pool.query(
            'SELECT id, name FROM voice_chanels WHERE server_id = $1',
            [id]
        ),
        pool.query('SELECT name FROM servers WHERE id = $1', [id]),
    ]);

    return {
        serverName: serverRes.rows[0].name,
        channels: channelsRes.rows,
    };
}