'use client';

import {useSocket} from "@/app/CustomHooks/socket";
import {useEffect, useState} from "react";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    ArrPending: ArrFriend[];
}

function PendingFriend({ ArrPending }: Props) {

    return (
        <div className="flex-1 min-w-0 overflow-y-auto px-8 py-4">
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
                Pending — {ArrPending.length}
            </div>

            <div className="border-t border-[#232428]" />

                {ArrPending.map((friend) => (
                    <div
                        key={friend.id}
                        className="group flex items-center justify-between py-3 border-b border-[#232428] hover:bg-[#1a1b1e] px-2 rounded-md transition">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#232428] overflow-hidden flex items-center justify-center text-gray-300 font-semibold">
                                {friend.nickname.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-100">
                                    {friend.nickname}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {friend.login}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button className="group/accept relative w-11 h-11 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 hover:border-green-500 transition-colors hover:text-green-500">
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover/accept:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Accept
                                </span>
                                ✓
                            </button>

                            <button className="group/ignore relative w-11 h-11 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 hover:border-red-500 transition-colors hover:text-red-500">
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-neutral-800 rounded opacity-0 group-hover/ignore:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    Ignore
                                </span>
                                X
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default PendingFriend;