'use client';

import { useEffect } from 'react';
import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/onlineFriendsStore";
import {Socket} from "socket.io-client";

export function useOnlineFriendsSocket(socket:Socket | null) {

    useEffect(() => {
        if (!socket) return;

        const { addOnline, removeOnline, setOnline , setIdFriends } =
            useOnlineFriendsIdStore.getState();

        const onCame = (id: number) => addOnline(id);

        const onList = (ids: {onlineFriendIds: number[], allFriends: number[]}) => {
            setOnline(ids.onlineFriendIds);
            setIdFriends(ids.allFriends);
        };

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