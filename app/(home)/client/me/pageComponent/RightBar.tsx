'use client';

import {useEffect, useState} from 'react';
import { usePendingStore } from '@/app/stores/pendingStore';
import RightPageTSX from "@/app/(home)/client/me/pageComponent/RightBarComponent/RightBarTSX";
import {RightBarContent} from "@/app/(home)/client/me/pageComponent/RightBarComponent/customHooksRightBar/FilteredComponentRightBar";
import {useOnlineFriends} from "@/app/(home)/client/me/pageComponent/RightBarComponent/customHooksRightBar/useOnlineFriends";
import {useHandleAddOrNot} from "@/app/(home)/client/me/pageComponent/RightBarComponent/customHooksRightBar/useHandleAddOrNot";
import {useSocket} from "@/app/CustomHooks/socket";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    FriendsArr: ArrFriend[]; }

type Filter = 'online' | 'all' | 'add' | 'pending';

function RightBarClient({FriendsArr}: Props) {
    const [filter, setFilter] = useState<Filter>('online');
    const [friendsAll, setAllFriends] = useState<ArrFriend[]>(FriendsArr);

    const AllPending = usePendingStore((s) => s.AllPending);

    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;

        const onAdopted = (profile: ArrFriend) => setAllFriends((prev) => [...prev, profile]);

        socket.on('AdoptedProfile', onAdopted);

        return () => {
            socket.off('AdoptedProfile', onAdopted);
        };
    }, [socket, setAllFriends]);

    const onlineIds = useOnlineFriends();
    const handleAddOrNot = useHandleAddOrNot(setAllFriends);

    return (
        <div onContextMenu={(e)=> e.preventDefault() } className="flex-1 min-w-0 flex flex-col bg-[#0d0d0f]">
            <RightPageTSX filter={filter} setFilter={setFilter} AllPending={AllPending} />
            <RightBarContent
                filter={filter}
                friendsAll={friendsAll}
                onlineIds={onlineIds}
                allPending={AllPending}
                onAddOrNot={handleAddOrNot}
            />
        </div>
    );
}

export default RightBarClient;