import React from "react";
import {UserGroup} from "lucide-react";

type Filter = 'online' | 'all' | 'add' | 'pending';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    filter: Filter;
    setFilter: (f: Filter)=> void
    AllPending: ArrFriend[]
}

function RightPageTSX({ filter ,setFilter, AllPending }: Props){

    const getFilterButtonClass = (isActive: boolean) =>
        `px-2.5 py-1 rounded text-sm font-medium cursor-pointer transition-colors ${
            isActive
                ? 'bg-white/10 text-white'
                : 'text-[#b5bac1] hover:bg-white/5 hover:text-[#dbdee1]'
        }`;

    return (<div className="h-12 border-b border-[#232428] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
                <UserGroup />
                <span className="font-semibold">Friends</span>
            </div>
            <div className="w-px h-6 bg-[#232428]" />
            <div className="flex items-center gap-4 text-sm">
                <button
                    onClick={()=>setFilter('online')}
                    className={getFilterButtonClass(filter === 'online')}
                >
                    Online
                </button>
                <button
                    onClick={()=>setFilter('all')}
                    className={getFilterButtonClass(filter === 'all')}
                >
                    All
                </button>
                {AllPending.length > 0 && (
                    <button
                        onClick={()=>setFilter('pending')}
                        className={getFilterButtonClass(filter === 'pending')}
                    >
                        Pending
                        <span className="ml-1.5 inline-flex items-center justify-center bg-red-500 text-white rounded-full text-[11px] font-bold h-[16px] min-w-[16px] px-[5px] leading-none pt-[1px]">
                                    {AllPending.length} </span>
                    </button>
                )}
                <button
                    onClick={()=>setFilter('add')}
                    className="px-3 py-1 rounded bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-[inset_0_10px_15px_-5px_rgba(0,0,0,0.25),inset_0_-10px_15px_-5px_rgba(0,0,0,0.25)] text-white text-sm font-medium cursor-pointer transition-all duration-350"
                >
                    Add friend
                </button>
            </div>
        </div>
    </div>)
}

export default RightPageTSX;