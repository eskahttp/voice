"use server";

import { pool } from '@/app/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const saltRounds = 12;

export type FieldErrors = {
    nickname?: string[];
    login?: string[];
    email?: string[];
    password?: string[];
};

export type RegState = {
    errors?: FieldErrors;
    message?: string;
    nickLogError?: string;
};

const FormSchema = z.object({
    nickname: z.string().max(26, 'Максимум 26 символов'),
    login: z.string().max(28, 'Максимум 28 символов').min(7, "Минимум 7 символов"),
    email: z.string().max(100, 'Максимум 100 символов'),
    password: z.string().max(26, 'Максимум 26 символов').min(8, "Минимум 8 символов"),
});

export async function createAccount(
    prevState: RegState,
    formData: FormData
): Promise<RegState> {
    const validatedFields = FormSchema.safeParse({
        nickname: formData.get('nickname') as string,
        login: formData.get('login') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });



    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors as FieldErrors
        };
    }


    const { nickname, login, email, password } = validatedFields.data;

    const Nonickname = nickname.length === 0 ? 'null' : nickname;
    const checkLogin = await pool.query('SELECT login FROM users WHERE login = $1 ',[login])
    if (checkLogin.rows.length > 0) {
        return { nickLogError: 'Такой логин уже есть' }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
        'INSERT INTO users (login, nickname, email, password) VALUES ($1, $2, $3, $4)',
        [login ,Nonickname ,email, hashedPassword]
    );

    return { message: 'Вы зарегестрировались' };
}