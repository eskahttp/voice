'use client';

import {Dispatch, SetStateAction, useEffect} from 'react';
import { useSocket } from '@/app/CustomHooks/socket';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

export function useFriendsSocket(setAllFriends: Dispatch<SetStateAction<ArrFriend[]>>) {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        const onAdopted = (profile: ArrFriend) => setAllFriends((prev) => [...prev, profile]);

        socket.on('AdoptedProfile', onAdopted);

        return () => {
            socket.off('AdoptedProfile', onAdopted);
        };
    }, [socket, setAllFriends]);
}