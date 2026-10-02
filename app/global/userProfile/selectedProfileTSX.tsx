'use client';

import {
    X,
    MessageCircle,
    UserCheck,
    MoreHorizontal,
} from "lucide-react";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

type Server = {
    id: number;
    name: string;
};

const tabs = ["9 Mutual Friends", "8 Mutual Servers"];
const activeTab = "8 Mutual Servers";

interface Props {
    login: string;
    nickname: string;
    avatar: string;
    friendsSince: string;
    memberSince: string;
    commonServers: Server[];
}

export function SelectedProfileTSX({login, nickname, friendsSince, memberSince,avatar,commonServers}: Props) {

    const setUserId = useSelectedProfileStore(state => state.setUserId)

    const formatted = format(new Date(memberSince), "MMM d, yyyy");

    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative flex h-[795px] w-full max-w-[953px] gap-8 overflow-hidden rounded-xl border border-zinc-800 bg-black pl-10 pt-12 text-zinc-100">
                <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer">
                    <X size={16} onClick={()=>setUserId(0)} />
                </button>

                <div className="flex w-[400px] shrink-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-800 bg-[#0b0b0d]">
                    <div className="h-[140px] bg-[#ff7f6e]" />

                    <div className="relative px-6">
                        <div className="absolute -top-[68px] left-6">
                            <Image
                                src={avatar ? avatar : '/plugImage.png'}
                                width={200}
                                height={200}
                                alt={'ProfilePhoto'}
                                className="flex h-[136px] w-[136px] items-center justify-center rounded-full border-[7px] border-[#0b0b0d] bg-gradient-to-br from-red-700 to-zinc-800 text-4xl font-bold text-white"/>
                            <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0b0d]">
                                <div className="h-5 w-5 rounded-full border-[5px] border-zinc-500" />
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pt-20">
                        <h2 className="text-2xl font-bold">{nickname}</h2>
                        <p className="mt-0.5 text-sm text-zinc-300">
                            {login} <span className="mx-1">•</span>
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                            <button className="flex h-8 items-center gap-1.5 rounded-lg bg-[#5865f2] px-3 text-sm font-medium text-white hover:bg-[#4752c4]">
                                <MessageCircle size={16} className="fill-white" />
                                Message
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
                                <UserCheck size={16} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                        <div className="mt-5 space-y-5">
                            <div>
                                <p className="text-xs text-zinc-400">Member Since</p>
                                <p className="mt-2 text-sm">{formatted}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400">Friends Since</p>
                                <p className="mt-2 text-sm">{friendsSince}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 pr-12 pt-1">
                    <div className="flex gap-6 border-b border-zinc-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
                                    tab === activeTab
                                        ? "border-white text-white"
                                        : "border-transparent text-zinc-400 hover:text-zinc-200"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 space-y-1">
                        {commonServers.map((s) => {
                            return (
                                <Link
                                    key={s.id}
                                    href={`/client/${s.id}`}
                                    onClick={() => setUserId(0)}
                                    className="flex h-[58px] cursor-pointer items-center gap-3 rounded-lg px-1 hover:bg-zinc-900"
                                >
                                    <span
                                        className={'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white'}
                                    >
                                        {s.name.slice(0, 2)}
                                    </span>
                                    <div className="min-w-0">
                                        <span
                                            className="flex items-center gap-1 text-base font-medium text-zinc-100">
                                            {s.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}