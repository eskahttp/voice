'use client';

import MessageServer from "@/app/(home)/client/[id]/components/RightPage/MessageServer";
import UserServer from "@/app/(home)/client/[id]/components/RightPage/UserServer";
import {RefObject} from "react";

interface Users { id: string; nickname: string; }
interface Message { id: string; nickname: string; message: string; created_at: string; }
interface Props { users: Users[]; SubmitAction: (formData:FormData)=> void; message: Message[]; scrollRef: RefObject<HTMLDivElement | null>; }

function RightClient({users,SubmitAction, message, scrollRef}: Props){

    return (
        <div className="flex h-screen w-full bg-[#1e1f22] text-gray-200">
            <div className="flex flex-1 flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-black/40 bg-[#2b2d31] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">#</span>
                        <span className="text-sm font-semibold uppercase text-white">main</span>
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col">
                    <div className="mt-auto">
                        {message.map(mes => (
                            <MessageServer
                                key={mes.id}
                            message={mes.message}
                            nickname={mes.nickname}
                            created_at={mes.created_at}
                            />
                        ))}
                    </div>
                </div>

                <div className="px-4 pb-6">
                    <form
                        action={SubmitAction}
                        className="flex items-center gap-2 rounded-lg bg-[#383a40] px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all"
                    >
                        <input
                            type="text"
                            name="message"
                            required
                            pattern=".*\S+.*"
                            autoComplete="off"
                            onInvalid={(e) => e.preventDefault()}
                            placeholder="Message"
                            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
                        />
                    </form>
                </div>
            </div>

            <div className="w-60 border-l border-black/40 bg-[#2b2d31] p-4">
                <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
                    Online — {users.length}
                </p>
                {users.map(u => (
                    <UserServer key={u.id} nickname={u.nickname} />
                ))}
            </div>
        </div>
    );
}

export default RightClient;