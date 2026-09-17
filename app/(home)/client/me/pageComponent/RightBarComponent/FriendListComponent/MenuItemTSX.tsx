import {MenuItemFn} from "@/app/(home)/client/me/pageComponent/RightBarComponent/FriendListComponent/MenuItemFn";
import {RefObject} from "react";

interface FriendsArr {
    id: number;
    nickname: string;
    login: string;
}

interface ContextMenuState {
    x: number;
    y: number;
    friend: FriendsArr;
}

interface Props {
    menuRef: RefObject<HTMLDivElement | null>;
    menu: ContextMenuState;
}

export function MenuItemTSX({menuRef, menu}: Props){

    return (
        <div
            ref={menuRef}
            style={{ top: menu.y, left: menu.x }}
            className="fixed z-50 min-w-[200px] bg-[#0d0d0f] border border-[#232428]
                               rounded-lg shadow-2xl py-1.5 animate-in fade-in zoom-in-95 duration-100"
        >
            <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wide border-b border-[#232428] mb-1">
                {menu.friend.nickname}
            </div>

            <MenuItemFn onClick={() => console.log('Открыть профиль', menu.friend)}>
                👤 Открыть профиль
            </MenuItemFn>
            <MenuItemFn onClick={() => console.log('Написать сообщение', menu.friend)}>
                💬 Написать сообщение
            </MenuItemFn>
            <div className="h-px bg-[#232428] my-1" />

            <MenuItemFn danger onClick={() => console.log('Удалить из друзей', menu.friend)}>
                🗑 Удалить из друзей
            </MenuItemFn>
        </div>
    )
}