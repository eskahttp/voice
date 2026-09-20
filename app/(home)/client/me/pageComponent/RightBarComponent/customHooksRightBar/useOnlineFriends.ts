'use client';

import { useEffect } from 'react';
import { useSocket } from '@/app/CustomHooks/socket';
import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/friendsIdStore";

export function useOnlineFriendsSocket() {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        const { addOnline, removeOnline, setOnline } =
            useOnlineFriendsIdStore.getState();

        const onCame = (id: number) => addOnline(id);
        const onList = (ids: number[]) => setOnline(ids);
        const onOffline = (id: number) => removeOnline(id);

        socket.on('CameOnline', onCame);
        socket.on('onlineFriends', onList);
        socket.on('friendOffline', onOffline);

        return () => {
            socket.off('CameOnline', onCame);
            socket.off('onlineFriends', onList);
            socket.off('friendOffline', onOffline);
        };
    }, [socket]);
}