"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {useEffect} from "react";
import { usePendingStore } from "@/app/stores/FriendStores/pendingStore";
import {useSocket} from "@/app/CustomHooks/socket";
import {FaHome} from "react-icons/fa";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface Props {
    ArrPending: ArrFriend[];
}

export default function HomeLink({ArrPending}: Props) {
    const pathname = usePathname();
    const isActive = pathname === '/client/me';

    const socket = useSocket();

    const pendingCount = usePendingStore((state) => state.AllPending.length);
    const setAllPending = usePendingStore((s) => s.setAllPending);
    const addPending = usePendingStore((s) => s.addPending);

    useEffect(() => {
        setAllPending(ArrPending);
    }, [ArrPending, setAllPending]);

    useEffect(() => {
        if (!socket) return;

        const onRequest = (newFriend: ArrFriend) => addPending(newFriend);

        socket.on('friendRequestReceived', onRequest);

        return () => {
            socket.off('friendRequestReceived', onRequest);
        };
    }, [socket, addPending]);

    return (
        <div>
            {isActive ? (
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-600 select-none">
                    <FaHome className={'w-6 h-6'} />
                    {pendingCount > 0 && (
                        <span className="absolute top-7 -right-1.5 inline-flex items-center justify-center bg-red-500 text-white rounded-full text-[13px] font-bold w-[22px] h-[22px] leading-none border-2 border-[#1e1e1e]">
                            {pendingCount}
                        </span>
                    )}
                </div>
            ) : (
                <Link
                    href={'/client'}
                    className="relative w-12 h-12 bg-[#121212] rounded-2xl flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer hover:bg-gradient-to-r from-teal-500 to-cyan-600"
                >
                    <FaHome className={'w-6 h-6'} />
                    {pendingCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center bg-red-500 text-white rounded-full text-[13px] font-bold w-[22px] h-[22px] leading-none border-2 border-[#1e1e1e]">
                            {pendingCount}
                        </span>
                    )}
                </Link>
            )}
        </div>
    );
}