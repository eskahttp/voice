'use client';

import {MenuItemFn} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/MenuItemFn";
import React, {RefObject} from "react";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";
import {useSocket} from "@/app/CustomHooks/socket";
import {
    CreateMessageConversations
} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/createMessageConversations/createMessageConversations";
import {useUserChatsStore} from "@/app/stores/userChatsStore/userChatsStore";
import {redirect} from "next/navigation";

interface FriendsArr {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

interface ContextMenuState {
    x: number;
    y: number;
    friend: FriendsArr;
}

interface Props {
    menuRef: RefObject<HTMLDivElement | null>;
    menu: ContextMenuState;
    setMenu: React.Dispatch<React.SetStateAction<ContextMenuState | null>>
}

export function MenuItemTSX({menuRef, menu,setMenu}: Props){

    const socket = useSocket()

    const addUserChats = useUserChatsStore(state => state.addUserChats)

    const setSelectedProfile = useSelectedProfileStore(state => state.setUserId)

    return (
        <div
            ref={menuRef}
            style={{ top: menu.y, left: menu.x }}
            className="fixed z-50 min-w-[200px] bg-[#0d0d0f] border border-[#232428]
                               rounded-lg shadow-2xl py-1.5 animate-in fade-in zoom-in-95 duration-100"
        >

            <MenuItemFn onClick={() => {
                if (!socket) return
                socket.emit('selectedProfile', menu.friend.login)
                setSelectedProfile(1)
                setMenu(null)
            }}>
                 Profile
            </MenuItemFn>
            <MenuItemFn onClick={async ()=> {
                const conversationId = await CreateMessageConversations(menu.friend.id)
                addUserChats({conversation_id: conversationId,user_id: menu.friend.id,nickname: menu.friend.nickname,login: menu.friend.login,avatar_url: menu.friend.avatar_url})
                redirect(`/client/me/${conversationId}`)
            }}>
                 Message
            </MenuItemFn>
            <MenuItemFn onClick={() => console.log('Invite', menu.friend)}>
                Invite to Server
            </MenuItemFn>
            <div className="h-px bg-[#232428] my-1" />
            <MenuItemFn danger onClick={() => console.log('Delete', menu.friend)}>
                Remove Friend
            </MenuItemFn>
        </div>
    )
}