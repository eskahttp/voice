'use client';

import {ReactNode, useState} from "react";
import AddFriend from "@/app/(home)/client/pageComponent/RightBarComponent/AddFriend";
import FriendsList from "@/app/(home)/client/pageComponent/RightBarComponent/FriendsList";

interface Props {

}

type Filter = 'online' | 'all' | 'add';

function RightBarClient({}: Props){
    const [filter, setFilter] = useState<Filter>('online');

    const FilteredComponent : ()=> ReactNode = ()=> {
        if (filter === 'add') return <AddFriend />;
        else return <FriendsList/>
    }

    return (
        <div className="flex-1 flex flex-col bg-[#0d0d0f]">
        <div className="h-12 border-b border-[#232428] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                    <span>👥</span>
                    <span className="font-semibold">Friends</span>
                </div>
                <div className="w-px h-6 bg-[#232428]" />
                <div className="flex items-center gap-4 text-sm">
                    <button onClick={() => setFilter('online')} className={`px-2 py-0.5 rounded ${filter === 'online' ? 'bg-[#4e5058]' : 'hover:cursor-pointer'} text-white font-medium`}>
                        Online
                    </button>
                    <button onClick={() => setFilter('all')} className={`px-2 py-0.5 rounded ${filter === 'all' ? 'bg-[#4e5058]' : 'hover:cursor-pointer'} text-white font-medium`}>
                        All
                    </button>
                    <button onClick={() => setFilter('add')}
                        className="px-3 py-1 rounded bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-[inset_0_10px_15px_-5px_rgba(0,0,0,0.25),inset_0_-10px_15px_-5px_rgba(0,0,0,0.25)] text-white text-sm font-medium cursor-pointer transition-all duration-350">
                        Add friend
                    </button>
                </div>
            </div>
        </div>
            {FilteredComponent()}
    </div>)
}

export default RightBarClient;