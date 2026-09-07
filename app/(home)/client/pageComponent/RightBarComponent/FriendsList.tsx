'use client';

import {useState} from "react";

interface Props {

}

interface Frined {
    id: number,
    nickname: string
}

function FriendsList({}: Props){
    const [friend, setFriend] = useState<Frined[]>([])


    return (<div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="relative mb-6">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔍
                            </span>
            <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#0d0d0f] text-sm text-gray-200 placeholder-gray-500
                                    border border-[#232428] rounded-lg pl-9 pr-3 py-2.5
                                    outline-none focus:border-[#3a3b40] transition"
            />
        </div>

        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-3">
            Online — {friend.length}
        </div>

        <div className="border-t border-[#232428]" />
    </div>)
}

export default FriendsList;