import {JSX} from "react";
import {MoreHorizontal, Users} from "lucide-react";
import Image from "next/image";
import {format} from "date-fns";
import {Socket} from "socket.io-client";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";

type CompanionInfo = {
    id: number;
    login: string;
    nickname: string;
    avatar_url: string;
    created_at: string;
}

interface Props {
    companion: CompanionInfo | null;
    socket: Socket | null;
}

export const UserChatProfile = ({companion,socket}: Props) : JSX.Element => {

    const MemberSince = format(new Date(companion ? companion.created_at : '1212'), "MMM d, yyyy");

    const setSelectedProfile = useSelectedProfileStore(state => state.setUserId)

    return (<div className="flex w-80 shrink-0 flex-col border-l border-neutral-900 bg-[#0b0b0d]">
        <div className="relative h-24 shrink-0 bg-black/70">
            <div className="absolute right-3 top-3 flex items-center gap-2">
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">
                    <Users className="h-4 w-4" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>
        </div>

        <div className="relative px-4">
            <Image
                src={companion ? companion.avatar_url : '/plugImage.png'}
                width={130}
                height={130}
                alt="avatar"
                className="absolute -top-15 flex h-27 w-27 items-center justify-center rounded-full border-4 border-black text-2xl font-semibold text-white"/>
        </div>

        <div className="mt-12 flex-1 overflow-y-auto px-4">
            <h2 className="text-xl font-bold text-white">{companion?.nickname}</h2>
            <p className="text-sm text-gray-400">{companion?.login}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[9px] font-semibold text-white">
                    СЕ
                </div>
                <span>1 Mutual Server</span>
            </div>

            <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white">
                    Member Since
                </h3>
                <p className="mt-1 text-sm text-gray-400">{MemberSince}</p>
            </div>
        </div>

        <div className="shrink-0 p-3">
            <button
                onClick={() => {
                    socket?.emit('selectedProfile', companion?.login)
                    setSelectedProfile(1)
            }}
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 py-2 text-sm text-gray-200 hover:bg-neutral-800">
                View Full Profile
            </button>
        </div>
    </div>)
}