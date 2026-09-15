import AddFriend from "@/app/(home)/client/pageComponent/RightBarComponent/AddFriend";
import PendingFriend from "@/app/(home)/client/pageComponent/RightBarComponent/PendingFriend";
import FriendsList from "@/app/(home)/client/pageComponent/RightBarComponent/FriendsList";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    filter: 'online' | 'all' | 'add' | 'pending';
    friendsAll: ArrFriend[];
    onlineIds: Set<number>;
    allPending: ArrFriend[];
    onAddOrNot: (accept: boolean, id: number) => void;
}

export function RightBarContent({ filter, friendsAll, onlineIds, allPending, onAddOrNot }: Props) {
    if (filter === 'add') return <AddFriend />;
    if (filter === 'pending')
        return <PendingFriend handleAddOrNot={onAddOrNot} ArrPending={allPending} />;

    const list =
        filter === 'online'
            ? friendsAll.filter((f) => onlineIds.has(f.id))
            : friendsAll;

    return <FriendsList FriendsArr={list} isOnlineList={filter === 'online'} />;
}