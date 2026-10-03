'use client'

import {usePendingStore} from "@/app/stores/FriendStores/pendingStore";
import {UserGroup} from "lucide-react";
import Link from "next/link";

interface Props {}

function LeftBarTSX({}: Props){
    const AllPending = usePendingStore((s) => s.AllPending);

    return (
        <>
            <div onContextMenu={(e)=> e.preventDefault()} className="h-12 flex items-center px-2 border-b border-[#232428] shrink-0">
                <button className="w-full h-8 bg-[#1e1f22] rounded text-sm text-gray-300 hover:text-white px-2 text-left">
                    Find or start a conversation
                </button>
            </div>

            <div onContextMenu={(e)=> e.preventDefault()} className="flex-1 overflow-y-auto px-2 py-2">
                <div className="space-y-0.5">
                    <div className="flex items-center justify-between gap-3 px-2 py-2 rounded bg-[#26272b] text-white cursor-pointer">
                        <div className="flex items-center gap-3">
                            <UserGroup />
                            <span className="text-sm font-medium">Friends</span>
                        </div>
                        {AllPending.length > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                {AllPending.length}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 px-2 py-2 rounded text-gray-300 hover:bg-[#26272b] hover:text-white cursor-pointer">
                        👺
                        <span className="text-sm font-medium">Nitro</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-2 py-2 rounded text-gray-300 hover:bg-[#26272b] hover:text-white cursor-pointer">
                        <div className="flex items-center gap-3">
                            🦇
                            <span className="text-sm font-medium">Shop</span>
                        </div>
                        <span className="bg-white text-black text-[10px] font-bold rounded-full px-2 py-0.5">NEW</span>
                    </div>

                    <div className="flex items-center gap-3 px-2 py-2 rounded text-gray-300 hover:bg-[#26272b] hover:text-white cursor-pointer">
                        🦜
                        <span className="text-sm font-medium">Quests</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#232428]">
                    <div className="flex items-center justify-between px-2 mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide hover:text-gray-200 cursor-pointer">
                            Direct Messages
                        </span>
                        <button className="text-gray-400 hover:text-white">
                              +
                        </button>
                    </div>

                    <div className="space-y-0.5 mt-1">
                        <Link href={'/client/me/12'} className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#26272b] cursor-pointer group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-lg shrink-0">
                                🌙
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-200 truncate">Sciamachy</div>
                                <div className="text-xs text-gray-400 truncate">you are my special</div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LeftBarTSX;