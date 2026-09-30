'use server';

import path from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { pool } from '@/app/lib/db';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/app/uploads';

export const AddMyPhoto = async (
    formData: FormData
): Promise<string | void> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;
    if (!token) redirect('/login');

    const UserId = await pool.query(
        'SELECT login_id FROM session WHERE cookie = $1',
        [token]
    );
    if (UserId.rows.length === 0) redirect('/login');

    const avatar = formData.get('avatar') as File;
    if (!avatar || avatar.size === 0) return;

    const allowed = ['image/jpeg', 'image/png', 'image/jpg' ,'image/webp'];
    if (!allowed.includes(avatar.type)) return;
    if (avatar.size > 10 * 1024 * 1024) return;

    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const ext = path.extname(avatar.name).toLowerCase();
    const fileName = `${randomUUID()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await fs.writeFile(filePath, buffer);

    const oldAvatar = await pool.query(
        'SELECT avatar_url FROM users WHERE id = $1',
        [UserId.rows[0].login_id]
    );
    const oldUrl = oldAvatar.rows[0]?.avatar_url as string | undefined;

    const defaultAvatars = ['/amomain1.png'];

    if (
        oldUrl &&
        oldUrl.startsWith('/uploads/') &&
        !defaultAvatars.includes(oldUrl)
    ) {
        const oldPath = path.join(UPLOAD_DIR, path.basename(oldUrl));
        await fs.unlink(oldPath).catch(() => {});
    }

    const publicUrl = `/uploads/${fileName}`;

    await pool.query(
        'UPDATE users SET avatar_url = $1 WHERE id = $2',
        [publicUrl, UserId.rows[0].login_id]
    );

    return publicUrl;
};