'use server';

import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

interface Channel {
    id: string;
    name: string;
}

interface Result {
    serverName: { name: string; referal: string };
    channels: Channel[];
}

export async function TakeChannelsAndServerName(id: string): Promise<Result> {
    const [channelsRes, serverRes] = await Promise.all([
        pool.query(
            'SELECT id, name FROM voice_chanels WHERE server_id = $1',
            [id]
        ),
        pool.query('SELECT name,referal FROM servers WHERE id = $1', [id]),
    ]);

    if (serverRes.rows.length === 0) redirect('/client')

    return {
        serverName: serverRes.rows[0],
        channels: channelsRes.rows,
    };
}