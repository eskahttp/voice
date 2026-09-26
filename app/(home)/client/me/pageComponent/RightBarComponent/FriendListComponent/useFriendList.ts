import React, {RefObject, useEffect} from "react";

interface FriendsArr {
    id: number;
    nickname: string;
    login: string;
}

interface Props{
    menuRef: RefObject<HTMLDivElement | null>;
    setMenu: React.Dispatch<React.SetStateAction<{ x: number; y: number; friend: FriendsArr } | null>>;
}

export function useFriendList({menuRef, setMenu}: Props){

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenu(null);
            }
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenu(null);
        };
        const handleScroll = () => setMenu(null);

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [menuRef,setMenu]);
}