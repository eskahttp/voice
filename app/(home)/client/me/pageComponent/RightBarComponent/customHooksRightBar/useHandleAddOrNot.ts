
import { useSocket } from '@/app/CustomHooks/socket';
import { usePendingStore } from '@/app/stores/FriendStores/pendingStore';
import { AddOrNotFriend } from '@/app/(home)/client/me/pageComponent/pageAction/PendingFriendAction/AddOrIgnoreFriend';
import {Dispatch, SetStateAction} from "react";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

export function useHandleAddOrNot(setAllFriends: Dispatch<SetStateAction<ArrFriend[]>>) {
    const socket = useSocket();
    const removePending = usePendingStore((s) => s.removePending);

    return async (accept: boolean, PendingFriendId: number) => {
        const profile = await AddOrNotFriend(accept, PendingFriendId);
        removePending(PendingFriendId);

        if (accept) {
            setAllFriends((prev) => [...prev, profile]);
            socket?.emit('AdoptedProfile', PendingFriendId);
        }
    };
}