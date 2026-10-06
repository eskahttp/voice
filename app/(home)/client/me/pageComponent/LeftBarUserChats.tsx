'use client';

import LeftBarTSX from "@/app/(home)/client/me/pageComponent/LeftBarComponent/LeftBarTSX";
import {useEffect} from "react";
import {useUserChatsStore} from "@/app/stores/userChatsStore/userChatsStore";
import Image from "next/image";
import Link from "next/link";

type userChats = {
    conversation_id: number;
    user_id: number;
    nickname : string;
    login : string;
    avatar_url : string;
}

interface Props {
    allUserChats: userChats[];
}

function LeftBarUserChats({allUserChats} : Props){

    const setAllUserChats = useUserChatsStore(state => state.setAllUserChats)

    useEffect(() => {
        setAllUserChats(allUserChats);
    }, [allUserChats,setAllUserChats]);

    const allUserChatsState = useUserChatsStore(state => state.allUserChats)

    return (
        <div className="w-72 bg-[#0b0b0d] flex flex-col border-r border-[#232428] h-screen">
            <LeftBarTSX>
                {allUserChatsState.map(chat => (
                    <Link href={`/client/me/${chat.conversation_id}`} key={chat.conversation_id} className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#26272b] cursor-pointer group">
                        <Image
                            width={65}
                            height={65}
                            alt={'photo'}
                            src={chat.avatar_url}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"/>
                        <div className="flex-1 min-w-0">
                            <div className="text-base font-medium text-gray-200 truncate">{chat.nickname}</div>
                            {/*<div className="text-xs text-gray-400 truncate">you are my special</div>  maybe bio later*/}
                        </div>
                    </Link>
                ))}
            </LeftBarTSX>
        </div>
    )
}

export default LeftBarUserChats;