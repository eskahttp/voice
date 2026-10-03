import {useEffect, useState} from "react";
import {useSocket} from "@/app/CustomHooks/socket";

type Message = {
    id: number;
    sender_id: number;
    receiver_id: number;
    body: string;
    created_at: string
}

type Profile = {
    id: number;
    login: string;
    nickname: string;
    avatar_url: string;
    created_at: string;
}

interface ChatInfo {
    usersProfile:{
        myProfile: Profile
        receiverProfile: Profile
    }
    privateUserMessage: Message[]
}


export const UseChatUserInfo = (userChatId: string) : ChatInfo | null => {
    const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;


        socket.emit("joinDM", userChatId);

        const chatInfoListener = (chatInfo: ChatInfo) => {
            setChatInfo(chatInfo);
        }

        socket.on('chatInfo',chatInfoListener)

        return () => {
            socket.emit("leaveDM", userChatId);
            socket.off('chatInfo',chatInfoListener)
        }
    }, [socket, userChatId]);

    return chatInfo
}