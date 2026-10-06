'use client';

import {useState} from 'react';
import { usePendingStore } from '@/app/stores/FriendStores/pendingStore';
import RightPageTSX from "@/app/(home)/client/me/pageComponent/RightBarComponent/RightBarTSX";
import {RightBarContent} from "@/app/(home)/client/me/pageComponent/RightBarComponent/customHooksRightBar/FilteredComponentRightBar";

type Filter = 'online' | 'all' | 'add' | 'pending';

function RightBarClient() {
    const [filter, setFilter] = useState<Filter>('online');

    const AllPending = usePendingStore((s) => s.AllPending);

    return (
        <div onContextMenu={(e)=> e.preventDefault() } className="flex-1 min-w-0 flex flex-col bg-[#0d0d0f]">
            <RightPageTSX filter={filter} setFilter={setFilter} AllPending={AllPending} />
            <RightBarContent
                filter={filter}
                allPending={AllPending}
            />
        </div>
    );
}

export default RightBarClient;