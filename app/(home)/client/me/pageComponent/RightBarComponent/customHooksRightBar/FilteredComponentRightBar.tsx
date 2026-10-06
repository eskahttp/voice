import AddFriend from "@/app/(home)/client/me/pageComponent/RightBarComponent/AddFriend";
import PendingFriend from "@/app/(home)/client/me/pageComponent/RightBarComponent/PendingFriend";
import FriendsList from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendsList";
import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/onlineFriendsStore";
import {useFriendsStore} from "@/app/stores/FriendStores/friendsStore";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

interface Props {
    filter: 'online' | 'all' | 'add' | 'pending';
    allPending: ArrFriend[];
}

export function RightBarContent({ filter, allPending }: Props) {
    const onlineIds = useOnlineFriendsIdStore(state => state.onlineIds)

    const friendsAll: ArrFriend[] = useFriendsStore(state => state.allFriends)


    if (filter === 'add') return <AddFriend />;
    if (filter === 'pending')
        return <PendingFriend ArrPending={allPending} />;

    const list =
        filter === 'online'
            ? friendsAll.filter((f) => onlineIds.has(f.id))
            : friendsAll;

    return <FriendsList FriendsArr={list} isOnlineList={filter === 'online'} onlineIds={onlineIds} />;
}