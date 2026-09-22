'use client';

import { useEffect, useRef, useState } from "react";
import RightClient from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/RightPageTSX";
import { useSocket } from "@/app/CustomHooks/socket";
import {FormSubmit} from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/SendingMessageFn";
import {useActivityServerUsers} from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/hooks/useActivityServerUsers";

interface User { id: string; nickname: string; }
interface Message { id: string; nickname: string; message: string; created_at: string; }
interface Props { serverId: string; GetMessage: Message[]; nickname: string; }

function RightPage({serverId, GetMessage, nickname }: Props) {
    const [message, setMessage] = useState<Message[]>(GetMessage);

    const [userList, setUserList] = useState<User[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);

    const socket = useSocket();

    useActivityServerUsers(socket, serverId, setMessage, setUserList)

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [message]);


    return (
        <RightClient
            userList={userList}
            SubmitAction={(formData:FormData)=> FormSubmit(formData,socket,serverId,nickname)}
            message={message}
            scrollRef={scrollRef}
        />
    );
}

export default RightPage;