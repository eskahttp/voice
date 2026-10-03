import { useSocket } from '@/app/CustomHooks/socket';
import { usePendingStore } from '@/app/stores/FriendStores/pendingStore';
import { AddOrNotFriend } from '@/app/(home)/client/me/pageComponent/pageAction/PendingFriendAction/AddOrIgnoreFriend';
import { useOnlineFriendsIdStore } from '@/app/stores/FriendStores/onlineFriendsStore';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

type AddFriendFn = (friend: ArrFriend) => void;

export function useHandleAddOrNot(addFriend: AddFriendFn) {
    const socket = useSocket();
    const removePending = usePendingStore((s) => s.removePending);
    const addOnlineFriend = useOnlineFriendsIdStore((s) => s.addIdFriend);

    return async (accept: boolean, pendingFriendId: number) => {
        const profile: ArrFriend = await AddOrNotFriend(accept, pendingFriendId);
        removePending(pendingFriendId);

        if (accept) {
            addFriend(profile);
            addOnlineFriend(pendingFriendId);
            socket?.emit('AdoptedProfile', pendingFriendId);
        }
    };
}