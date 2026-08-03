'use server';

import { pool } from '@/app/lib/db';
import crypto from "crypto";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import {z} from 'zod';
import {redirect} from "next/navigation";


const Logschema = z.object({
    login: z.string().max(28,'Максимум 18 символов').min(7, "Минимум 7 символов"),
    password: z.string().max(26,'Максимум 26 символов').min(8, "Минимум 8 символов")
});

export async function LoginAccount(prevState: object, formData: FormData): Promise<{message:string}>{
    const validatedFields = Logschema.safeParse({
        login: formData.get('login') as string,
        password: formData.get('password') as string
    });

    if (!validatedFields.success) return {
        message: 'Incorrect username and/or password'
    }

    const { login, password } = validatedFields.data;

    const result = await pool.query('SELECT id,nickname,login,password FROM users WHERE login = $1',
        [login]);

    if (!result.rows[0]) return { message: 'Incorrect username and/or password' }

    const isMatch = await bcrypt.compare(password, result.rows[0].password);

    if (!isMatch) return { message: 'Incorrect username and/or password' }

    if(isMatch) {
        const sessionToken = crypto.randomBytes(25).toString('hex');
        await pool.query('DELETE FROM session WHERE login_id = $1', [result.rows[0].id])
        await pool.query('INSERT INTO session (login_id,cookie) VALUES ($1,$2)', [result.rows[0].id, sessionToken])
        const cookieStore = await cookies();
        cookieStore.set('sessionToken', sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 дней
        });
        return redirect('/client')
    }

    return { message: 'Incorrect username and/or password' };
}