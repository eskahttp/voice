'use server';

import { pool } from '@/app/lib/db';

interface Channels{
    id: number;
    name: string;
}

export async function TakeChannels(id:string): Promise<Channels[]>{
    const Channels = await pool.query('SELECT id,name FROM voice_chanels WHERE server_id = $1', [id])

    return Channels.rows
}