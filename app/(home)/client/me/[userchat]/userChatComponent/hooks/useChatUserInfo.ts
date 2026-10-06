import React, {useEffect} from "react";
import {Socket} from "socket.io-client";

type Message = {
    id: number;
    sender_id: number;
    sender_login: string;
    sender_nickname: string;
    sender_avatar_url: string;
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
    companion: Profile
    privateMessages: Message[]
}


export const UseChatUserInfo = (
    socket: Socket | null,
    userChatId: string,
    setCompanion : React.Dispatch<React.SetStateAction<Profile | null>>,
    setPrivateMessages : React.Dispatch<React.SetStateAction<Message[]>>
    ) : void => {

    useEffect(() => {
        if (!socket) return;
        let call = false

        const addPrivateMessage = (message:Message) => {
            setPrivateMessages((prevMessages) => [...prevMessages, message]);
        }

        socket.on('privateMessage',addPrivateMessage)

        socket.emit('joinDM', userChatId ,(res:ChatInfo)=>{
            if (call) return;
            setCompanion(res.companion);
            setPrivateMessages(res.privateMessages);
        })

        return () => {
            socket.emit('leaveDM', userChatId);
            call = true;
            socket.off('privateMessage',addPrivateMessage)
        }
    }, [socket, userChatId,setCompanion,setPrivateMessages]);
};