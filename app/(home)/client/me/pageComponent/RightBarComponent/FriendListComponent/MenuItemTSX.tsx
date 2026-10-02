import {MenuItemFn} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/MenuItemFn";
import React, {RefObject} from "react";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";
import {useSocket} from "@/app/CustomHooks/socket";

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
            <MenuItemFn onClick={() => console.log('Message', menu.friend)}>
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