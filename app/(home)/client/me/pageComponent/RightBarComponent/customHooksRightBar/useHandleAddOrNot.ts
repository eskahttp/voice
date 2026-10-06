import { useSocket } from '@/app/CustomHooks/socket';
import { usePendingStore } from '@/app/stores/FriendStores/pendingStore';
import { AddOrNotFriend } from '@/app/(home)/client/me/pageComponent/pageAction/PendingFriendAction/AddOrIgnoreFriend';
import { useOnlineFriendsIdStore } from '@/app/stores/FriendStores/onlineFriendsStore';
import {useFriendsStore} from "@/app/stores/FriendStores/friendsStore";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

export function useHandleAddOrNot() {
    const socket = useSocket();
    const removePending = usePendingStore((s) => s.removePending);
    const addIdOnlineFriend = useOnlineFriendsIdStore((s) => s.addIdFriend);
    const addFriend = useFriendsStore((s) => s.addFriend);


    return async (accept: boolean, pendingFriendId: number) => {
        const profile: ArrFriend = await AddOrNotFriend(accept, pendingFriendId);
        removePending(pendingFriendId);

        if (accept) {
            addFriend(profile);
            addIdOnlineFriend(pendingFriendId);
            socket?.emit('AdoptedProfile', pendingFriendId);
        }
    };
}