'use client';

import {useEffect, useRef, useState} from 'react';
import InviteModal from "@/app/(home)/client/[id]/components/RightPage/ServerPageMenu/InviteComponent";
import LeaveServerModal from "@/app/(home)/client/[id]/components/RightPage/ServerPageMenu/LeaveComponent";

interface Props {
    open: boolean;
    onClose: () => void;
    name: string;
    referal:string
}

type Filter = 'nothing' | 'invite' | 'leaveServer'

function ServerMenu({name , open, onClose, referal}: Props) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState<Filter>('nothing');

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [open, onClose]);

    return (<>
        <div
            ref={menuRef}
            className={`absolute left-2 right-2 top-full mt-1 z-50 bg-[#1a1b1e] rounded-md shadow-lg border border-[#232428] overflow-hidden transform transition-all duration-200 ease-out origin-top ${
                open
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
            }`}
        >
            <button
                onClick={() => {
                    onClose();
                    setFilter('invite');
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-indigo-500 hover:bg-white/10 transition-colors cursor-pointer"
            >
                <span>Invite People</span>
            </button>

            <div className="h-px bg-[#232428]" />

            <button
                onClick={() => {
                    onClose();
                    setFilter('leaveServer');
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
                <span>Leave Server</span>
            </button>
        </div>

    {filter === 'invite' && (
        <InviteModal
            onClose={()=> setFilter('nothing')}
            inviteLink={referal}
            serverName={name}
    />)}
        {filter === 'leaveServer' && (
            <LeaveServerModal
            referal={referal}
            serverName={name}
            onClose={()=> setFilter('nothing')}
            />)}
    </>);
}

export default ServerMenu;