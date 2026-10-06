import {JSX} from "react";
import Image from "next/image";
import {Socket} from "socket.io-client";
import {format, isToday} from "date-fns";

type CompanionInfo = {
    id: number;
    login: string;
    nickname: string;
    avatar_url: string;
    created_at: string;
}

type Message = {
    id: number;
    sender_id: number;
    sender_login: string;
    sender_nickname: string;
    sender_avatar_url: string;
    body: string;
    created_at: string
}

interface Props {
    companion: CompanionInfo | null
    privateMessages: Message[]
    userChatId: string
    socket: Socket | null
}

export const UserChatMessage = ({socket,companion,privateMessages,userChatId}: Props) : JSX.Element => {

    const handleSubmitMessage = (formData:FormData)=>{
        const message = formData.get("message");
        if (!message) return;

        socket?.emit("sendPrivateMessage", userChatId, message);
    }

    const CreatedMessage = (created_at: string) => {
        const date = new Date(created_at);
        return isToday(date) ? format(date, "hh:mm") : format(date, "MMM d hh:mm");
    };

    return (<div className="flex flex-1 flex-col min-w-0">
        <div className="flex flex-1 flex-col justify-end overflow-y-auto px-6 pb-4 min-h-0">
            <div className="pt-8">
                <Image
                    width={150}
                    height={150}
                    alt={'photo'}
                    src={companion ? companion.avatar_url : '/plugImage.png'}
                    loading="eager"
                    className="flex h-30 w-30 items-center justify-center rounded-full text-3xl font-semibold text-white"/>
                <h1 className="mt-4 text-3xl font-bold text-white">{companion?.nickname}</h1>
                <p className="mt-4 text-sm text-gray-400">
                    This is the beginning of your direct message history with{" "}
                    <span className="font-semibold text-white">{companion?.nickname}</span>.
                </p>

                <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[9px] font-semibold text-white">
                            СЕ
                        </div>
                        <span>1 Mutual Server</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <button className="rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-200 hover:bg-neutral-700">
                        Remove Friend
                    </button>
                </div>
            </div>


            {privateMessages.map((message) => (
                <div key={message.id} className="mt-4 flex gap-3">
                <Image
                    src={message.sender_avatar_url}
                    alt={'photo'}
                    width={50}
                    height={50}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"/>
                <div>
                    <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-white">
                    {message.sender_nickname}
                  </span>
                        <span className="text-xs text-gray-500">
                    {CreatedMessage(message.created_at)}
                  </span>
                    </div>
                    <p className="text-sm text-gray-200">{message.body}</p>
                </div>
            </div>))}
            </div>

        <div className="shrink-0 px-4 pb-6">
            <form action={handleSubmitMessage} >
            <div className="flex items-center gap-3 rounded-lg bg-neutral-900 px-4 py-3">
                <input
                    name="message"
                    type="text"
                    placeholder={`Message ${companion?.nickname}`}
                    className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
            </div>
            </form>
        </div>
    </div>)
}