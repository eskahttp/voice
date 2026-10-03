import Image from "next/image";
import {MessageCircle, MoreHorizontal, UserCheck, UserPlus} from "lucide-react";
import {format} from "date-fns";
import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/onlineFriendsStore";

interface Props {
    selectedUserId: number;
    avatar: string;
    nickname: string;
    login: string;
    memberSince: string;
    friendsSince: string;
}

export function SelectedProfileInfo({selectedUserId, avatar, nickname, login, memberSince, friendsSince}: Props) {

    const MemberSince = format(new Date(memberSince), "MMM d, yyyy");

    const friendIds = useOnlineFriendsIdStore(state => state.AllFriendIds);
    const onlineFriendIds = useOnlineFriendsIdStore(state => state.onlineIds);

    const isOnline = onlineFriendIds.has(selectedUserId);

    return (
        <div className="flex w-[400px] shrink-0 flex-col overflow-hidden rounded-t-2xl border border-zinc-800 bg-[#0b0b0d]">
            <div className="h-[110px] bg-black/70" />

            <div className="relative px-6">
                <div className="absolute -top-[68px] left-6">
                    <Image
                        src={avatar ? avatar : '/plugImage.png'}
                        width={200}
                        height={200}
                        alt={'ProfilePhoto'}
                        className="flex h-[136px] w-[136px] items-center justify-center rounded-full border-[7px] border-[#0b0b0d] bg-gradient-to-br from-red-700 to-zinc-800 text-4xl font-bold text-white"
                    />
                    <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0b0d]">
                        <div
                            className={`h-5 w-5 rounded-full ${
                                isOnline
                                    ? "bg-green-500"
                                    : "border-[5px] border-zinc-500"
                            }`}
                        />
                    </div>
                </div>
            </div>

            <div className="px-8 pt-20">
                <h2 className="text-2xl font-bold">{nickname}</h2>
                <p className="mt-0.5 text-sm text-zinc-300">
                    {login} <span className="mx-1">•</span>
                </p>

                <div className="mt-5 flex items-center gap-2">
                    <button className="flex h-8 items-center gap-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 select-none px-3 text-sm font-medium text-white hover:bg-[#4752c4]">
                        <MessageCircle size={16} className="fill-white" />
                        Message
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
                        {friendIds.has(selectedUserId) ? <UserCheck size={16}/> : <UserPlus size={16} />}
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                <div className="mt-5 space-y-5">
                    <div>
                        <p className="text-xs text-zinc-400">Member Since</p>
                        <p className="mt-2 text-sm">{MemberSince}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-400">Friends Since</p>
                        <p className="mt-2 text-sm">{friendsSince}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}