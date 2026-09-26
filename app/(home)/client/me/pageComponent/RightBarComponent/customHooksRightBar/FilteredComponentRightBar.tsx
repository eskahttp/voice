import AddFriend from "@/app/(home)/client/me/pageComponent/RightBarComponent/AddFriend";
import PendingFriend from "@/app/(home)/client/me/pageComponent/RightBarComponent/PendingFriend";
import FriendsList from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendsList";
import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/onlineFriendsStore";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    filter: 'online' | 'all' | 'add' | 'pending';
    friendsAll: ArrFriend[];
    allPending: ArrFriend[];
    handleAddOrNot: (accept: boolean, id: number) => void;
}

export function RightBarContent({ filter, friendsAll, allPending, handleAddOrNot }: Props) {
    const onlineIds = useOnlineFriendsIdStore(state => state.onlineIds)


    if (filter === 'add') return <AddFriend />;
    if (filter === 'pending')
        return <PendingFriend handleAddOrNot={handleAddOrNot} ArrPending={allPending} />;

    const list =
        filter === 'online'
            ? friendsAll.filter((f) => onlineIds.has(f.id))
            : friendsAll;

    return <FriendsList FriendsArr={list} isOnlineList={filter === 'online'} onlineIds={onlineIds} />;
}