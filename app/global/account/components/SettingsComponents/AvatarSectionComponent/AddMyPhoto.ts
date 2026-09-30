'use server';

import path from "path";
import {randomUUID} from "crypto";
import fs from "fs/promises";
import { pool } from '@/app/lib/db';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const AddMyPhoto = async (formData: FormData) : Promise<string | void> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const UserId = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (UserId.rows.length === 0) redirect('/login');

    const avatar = formData.get('avatar') as File;

    if (!avatar) return;

    const bytes = await avatar.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadDir = path.join(process.cwd(), '/public')
    const ext = path.extname(avatar.name)
    const fileName = `${randomUUID()}${ext}`
    const filePath = path.join(uploadDir, fileName)
    await fs.writeFile(filePath, buffer)

    await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2',['/'+fileName, UserId.rows[0].login_id]);

    return '/'+fileName

}