'use client';

import {ReactNode, useEffect, useState} from "react";
import AddFriend from "@/app/(home)/client/pageComponent/RightBarComponent/AddFriend";
import FriendsList from "@/app/(home)/client/pageComponent/RightBarComponent/FriendsList";
import PendingFriend from "@/app/(home)/client/pageComponent/RightBarComponent/PendingFriend";
import {useSocket} from "@/app/CustomHooks/socket";
import {AddOrNotFriend} from "@/app/(home)/client/pageComponent/pageAction/PendingFriendAction/AddOrIgnoreFriend";
import RightPageTSX from "@/app/(home)/client/pageComponent/RightBarComponent/RightBarTSX";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    ArrPending: ArrFriend[]
    FriendsArr: ArrFriend[]
}

type Filter = 'online' | 'all' | 'add' | 'pending';

function RightBarClient({ArrPending, FriendsArr}: Props){           // Passed to the page
    const [filter, setFilter] = useState<Filter>('online');
    const socket = useSocket();
    const [AllPending, setAllPending] = useState<ArrFriend[]>(ArrPending);

    useEffect(() => {
        if (!socket) return;

        socket.on('friendRequestReceived', (newFriend: ArrFriend) => {
            setAllPending((prev) => [...prev, newFriend]);
        })

    }, [socket]);

    const handleAddOrNot = async (AccOrIgn: boolean, PendingId: number)=>{
        await AddOrNotFriend(AccOrIgn,PendingId)
        setAllPending(AllPending.filter((friend) => friend.id !== PendingId));
    }

    const FilteredComponent: () => ReactNode = () => {
        if (filter === 'add') return <AddFriend />;
        if (filter === 'pending') return <PendingFriend
                                            handleAddOrNot={handleAddOrNot}
                                            ArrPending={AllPending} />
        else return <FriendsList  FriendsArr={FriendsArr} />
    }

    return (
        <div className="flex-1 min-w-0 flex flex-col bg-[#0d0d0f]">
            <RightPageTSX
                filter={filter}
            setFilter={setFilter}
            AllPending={AllPending}
                />
            {FilteredComponent()}
        </div>
    )
}

export default RightBarClient;