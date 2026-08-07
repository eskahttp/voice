'use server';

import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";

export async function TakeServerName(id: string): Promise<string> {

    const ServerName= await pool.query('SELECT name FROM servers WHERE id = $1', [id]);

    if (ServerName.rows.length === 0) redirect ('/client')

    const CheckServer: string = ServerName.rows[0].name;

    return CheckServer;
}