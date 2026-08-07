'use server';

import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";
import {pool} from "@/app/lib/db";
import {redirect} from "next/navigation";

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const Session: string | undefined = cookieStore.get('sessionToken')?.value;

    const IdUser = await pool.query('SELECT login_id FROM session WHERE cookie = $1', [Session])

    const CheckUser = IdUser.rows[0].login_id

    if (!CheckUser || null || undefined) redirect('/login');

    const room = req.nextUrl.searchParams.get('room');
    const username = req.nextUrl.searchParams.get('username');

    if (!room || !username) {
        return NextResponse.json(
            { error: 'Missing room or username' },
            { status: 400 }
        );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        return NextResponse.json(
            { error: 'Server misconfigured' },
            { status: 500 }
        );
    }

    const at = new AccessToken(apiKey, apiSecret, {
        identity: CheckUser,
        name: username,
        ttl: '1h', // Lifespan — 1 hour
    });

    at.addGrant({
        room,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
    });

    const token = await at.toJwt();

    return NextResponse.json({ token });
}