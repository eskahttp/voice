import type { Metadata } from "next";
import "@/app/globals.css";
import LeftBarUserChats from "@/app/(home)/client/me/pageComponent/LeftBarUserChats";
import {getAllUserChats} from "@/app/(home)/client/me/[userchat]/action/getAllUserChats";


export const metadata: Metadata = {
    title: "Diana voice",
    description: "Diana voice",
};

type userChats = {
    conversation_id: number;
    user_id: number;
    nickname : string;
    login : string;
    avatar_url : string;
}

export default async function NewLayout({
   children,
   }: Readonly<{
   children: React.ReactNode;
}>) {
    const allUserChats: userChats[] = await getAllUserChats() ?? []


    return (<div className="flex flex-col h-full w-full bg-[#1e1f22] text-gray-300 overflow-hidden">
        <div className="flex flex-1 overflow-hidden ">
            <LeftBarUserChats allUserChats={allUserChats} />
            {children}
        </div>
    </div>);
}
