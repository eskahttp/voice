'use client';

import { useEffect, useRef, useState } from "react";
import RightClient from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/RightPageTSX";
import { useSocket } from "@/app/CustomHooks/socket";
import {FormSubmit} from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/SendingMessageFn";
import {useActivityServerUsers} from "@/app/(home)/client/[id]/components/RightPage/RightPageComponent/hooks/useActivityServerUsers";

interface User { id: number; login:string; nickname: string; avatar_url: string; }
interface Message { id: string; login:string; nickname: string; avatar_url: string; message: string; created_at: string; }
interface Props { serverId: string; GetMessage: Message[];}

function RightPage({serverId, GetMessage }: Props) {
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
            SubmitAction={(formData:FormData)=> FormSubmit(formData,socket,serverId)}
            message={message}
            scrollRef={scrollRef}
        />
    );
}

export default RightPage;