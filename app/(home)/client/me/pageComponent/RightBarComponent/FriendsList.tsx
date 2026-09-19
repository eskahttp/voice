'use client';

import { useState, useRef } from 'react';
import {MenuItemTSX} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/MenuItemTSX";
import {useFriendList} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/useFriendList";

interface FriendsArr {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    FriendsArr: FriendsArr[];
    isOnlineList?: boolean;
}

interface ContextMenuState {
    x: number;
    y: number;
    friend: FriendsArr;
}

function FriendsList({ FriendsArr, isOnlineList }: Props) {
    const [menu, setMenu] = useState<ContextMenuState | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent, friend: FriendsArr) => {
        e.preventDefault();

        const menuW = 200;
        const menuH = 180;
        const x = Math.min(e.clientX, window.innerWidth - menuW - 8);
        const y = Math.min(e.clientY, window.innerHeight - menuH - 8);

        setMenu({ x, y, friend });
    };

    useFriendList({menuRef, setMenu})

    return (
        <div className="flex-1 overflow-y-auto px-8 py-4">
            <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#0d0d0f] text-sm text-gray-200 placeholder-gray-500
                               border border-[#232428] rounded-lg pl-9 pr-3 py-2.5
                               outline-none focus:border-[#3a3b40] transition"
                />
            </div>

            <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-3">
                {isOnlineList ? 'Online' : 'All Friends'} — {FriendsArr.length}
            </div>

            <div className="border-t border-[#232428]" />

            {FriendsArr.map((friend) => (
                <div
                    key={friend.id}
                    onContextMenu={(e) => handleContextMenu(e, friend)}
                    className="group flex items-center justify-between py-3 border-b border-[#232428] hover:bg-[#1a1b1e] px-2 rounded-md transition hover:cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#232428] overflow-hidden flex items-center justify-center text-gray-300 font-semibold">
                            {friend.nickname.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-gray-100">
                                {friend.nickname}
                                <span className="text-xs font-semibold text-gray-400 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                                    {friend.login}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            {menu && (
                <MenuItemTSX menuRef={menuRef} menu={menu} />
            )}
        </div>
    );
}

export default FriendsList;