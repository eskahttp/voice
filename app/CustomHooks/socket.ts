'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function useSocket() {
    const [instance, setInstance] = useState<Socket | null>(socket);

    useEffect(() => {
        if (!socket) {
            socket = io();
        }
        setInstance(socket);
    }, []);

    return instance;
}