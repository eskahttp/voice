'use client';

import { useEffect, useRef, useState } from "react";
import RightClient from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/RightPageTSX";
import {MessageAction} from "@/app/(home)/client/[id]/components/RightPage/MessageAction/MessageAction";
import {useSocket} from "@/app/CustomHooks/socket";

interface Users { id: string; nickname: string; }
interface Message { id: string; nickname: string; message: string; created_at: string; }
interface Props { users: Users[]; serverId: string; GetMessage: Message[]; nickname: string; }

function RightPage({ users, serverId, GetMessage,nickname }: Props) {
    const [message, setMessage] = useState<Message[]>(GetMessage);
    const scrollRef = useRef<HTMLDivElement>(null);

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinRoom', serverId);

        const handler = (msg: Message) => {
            setMessage(prev => [...prev, msg]);
        };
        socket.on('message', handler);

        return () => {
            socket.emit('leaveRoom', serverId);
            socket.off('message', handler);
        };
    }, [socket,serverId]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [message]);

    const FormSubmit = (formData: FormData) => {
        if (!socket) return;

        const Message = formData.get('message');

        if (!Message) return;

        const messageStr = Message.toString().trim();
        if (!messageStr) return;

        const d = new Date();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        socket.emit('message', {serverId, id: crypto.randomUUID(), nickname:nickname, message: messageStr, created_at: `${hours}:${minutes}`});

        MessageAction(formData, serverId);
    }

    return (
        <RightClient
            users={users}
            SubmitAction={FormSubmit}
            message={message}
            scrollRef={scrollRef}
        />
    )

}

export default RightPage;