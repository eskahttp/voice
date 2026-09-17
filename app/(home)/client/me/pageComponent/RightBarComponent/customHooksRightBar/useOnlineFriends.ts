'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/app/CustomHooks/socket';

export function useOnlineFriends() {
    const socket = useSocket();
    const [onlineIds, setOnlineIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (!socket) return;

        const onCame = (id: number) =>
            setOnlineIds((prev) => new Set(prev).add(id));

        const onList = (ids: number[]) => setOnlineIds(new Set(ids));

        const onOffline = (id: number) =>
            setOnlineIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });

        socket.on('CameOnline', onCame);
        socket.on('onlineFriends', onList);
        socket.on('friendOffline', onOffline);

        return () => {
            socket.off('CameOnline', onCame);
            socket.off('onlineFriends', onList);
            socket.off('friendOffline', onOffline);
        };
    }, [socket]);

    return onlineIds;
}