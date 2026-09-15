'use client';

import {Dispatch, SetStateAction, useEffect} from 'react';
import { useSocket } from '@/app/CustomHooks/socket';
import { usePendingStore } from '@/app/stores/pendingStore';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

export function useFriendsSocket(setAllFriends: Dispatch<SetStateAction<ArrFriend[]>>) {
    const socket = useSocket();
    const addPending = usePendingStore((s) => s.addPending);

    useEffect(() => {
        if (!socket) return;

        const onRequest = (newFriend: ArrFriend) => addPending(newFriend);
        const onAdopted = (profile: ArrFriend) => setAllFriends((prev) => [...prev, profile]);

        socket.on('friendRequestReceived', onRequest);
        socket.on('AdoptedProfile', onAdopted);

        return () => {
            socket.off('friendRequestReceived', onRequest);
            socket.off('AdoptedProfile', onAdopted);
        };
    }, [socket, addPending, setAllFriends]);
}