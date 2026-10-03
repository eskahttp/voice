'use client';

import { X } from "lucide-react";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";
import Link from "next/link";
import {SelectedProfileInfo} from "@/app/global/userProfile/selectedProfileAction/selectedProfileInfo";
import {useState} from "react";

type Server = { id: number; name: string; };
type Tab = "Friends" | "Servers";

interface Props {
    selectedUserId: number;
    login: string;
    nickname: string;
    avatar: string;
    friendsSince: string;
    memberSince: string;
    commonServers: Server[];
}

export function SelectedProfileServersAndFriends({selectedUserId, login, nickname, friendsSince, memberSince, avatar, commonServers}: Props) {
    const [tab, setTab] = useState<Tab>('Servers');
    const clear = useSelectedProfileStore(state => state.clear);

    const tabCss = (tabButt: string) =>
        `-mb-px border-b-2 pb-3 text-sm font-medium ${
            tab === tabButt
                ? "border-white text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
        }`;

    return (
        <div
            onMouseDown={clear}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
            <div
                onMouseDown={(e) => e.stopPropagation()}
                className="relative flex h-[795px] w-full max-w-[953px] gap-8 overflow-hidden rounded-xl border border-zinc-800 bg-black pl-10 pt-12 text-zinc-100"
            >
                <button
                    onClick={clear}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer"
                >
                    <X size={16} />
                </button>

                <SelectedProfileInfo
                    selectedUserId={selectedUserId}
                    login={login}
                    nickname={nickname}
                    friendsSince={friendsSince}
                    memberSince={memberSince}
                    avatar={avatar}
                />

                <div className="flex-1 pr-12 pt-1">
                    <div className="flex gap-6 border-b border-zinc-800">
                        <button onClick={() => setTab('Friends')} className={tabCss('Friends')}>
                            Mutual Friend
                        </button>
                        <button onClick={() => setTab('Servers')} className={tabCss('Servers')}>
                            {commonServers.length} Mutual Server
                        </button>
                    </div>

                    <div className="mt-4 space-y-1">
                        {commonServers.map((s) => (
                            <Link
                                key={s.id}
                                href={`/client/${s.id}`}
                                onClick={clear}
                                className="flex h-[58px] cursor-pointer items-center gap-3 rounded-lg px-1 hover:bg-zinc-900"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white">
                                    {s.name.slice(0, 2)}
                                </span>
                                <div className="min-w-0">
                                    <span className="flex items-center gap-1 text-base font-medium text-zinc-100">
                                        {s.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}