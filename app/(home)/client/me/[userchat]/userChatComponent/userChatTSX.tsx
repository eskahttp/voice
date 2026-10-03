'use client';

import {Search} from "lucide-react";
import {UserChatProfile} from "@/app/(home)/client/me/[userchat]/userChatComponent/userChatProfile";
import {UserChatMessage} from "@/app/(home)/client/me/[userchat]/userChatComponent/userChatMessage";
import {UseChatUserInfo} from "@/app/(home)/client/me/[userchat]/userChatComponent/hooks/useChatUserInfo";

interface Props{
    userChatId:string
}

export function UserDmPage({userChatId}: Props) {

    const chatInfo = UseChatUserInfo(userChatId)

    return (
        <div className="flex flex-1 flex-col bg-[#0b0b0d] text-gray-200 overflow-hidden min-w-0">
            <header className="flex h-12 shrink-0 items-center justify-between border-b border-neutral-900 px-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                        FL
                    </div>
                    <span className="text-sm font-medium text-white">Horkey</span>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <div className="relative ml-2">
                        <input
                            type="text"
                            placeholder="Search Horkey"
                            className="h-7 w-56 rounded-md bg-neutral-900 pl-3 pr-8 text-xs text-gray-300 placeholder-gray-500 outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden min-h-0">

                <UserChatMessage/>

                <UserChatProfile/>

            </div>
        </div>
    );
}