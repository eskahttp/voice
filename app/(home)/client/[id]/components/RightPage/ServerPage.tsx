'use client';

import { ReactNode, useState } from 'react';
import ButtonChannel from '@/app/(home)/client/[id]/components/Channels/ButtonChanel';
import { useVoice } from '@/app/(home)/client/[id]/context/VoiceContext';
import ServerMenu from "@/app/(home)/client/[id]/components/RightPage/ServerPageMenu/ServerPageMenu";

interface Channel {
    id: string;
    name: string;
}

interface Props {
    name: string;
    channels: Channel[];
    nickname: string;
    RightPage: ReactNode;
    referal: string;
}

function ServerPage({ name, channels, RightPage, referal }: Props) {
    const { room, activeRoomId, setActiveRoomId, setActiveRoomName } = useVoice();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleChannelClick = (ch: Channel) => {
        setActiveRoomId(ch.id);
        setActiveRoomName(ch.name);
    };

    return (
        <div className="flex h-screen bg-[#0b0b0d] text-gray-200 border-l border-[#232428]">
            <aside className="w-72 bg-[#0b0b0d] flex flex-col">
                <div className="relative">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#232428] shadow-sm">
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="inline-flex items-center gap-1 font-semibold text-white px-2 py-1 rounded-md cursor-pointer hover:bg-white/10 transition-colors focus:outline-none"
                        >
                            {name}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-200 ${
                                    menuOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    </div>

                    <ServerMenu
                        referal={referal}
                        name={name}
                        open={menuOpen}
                        onClose={() => setMenuOpen(false)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 pb-24">
                    <div className="pt-4">
                        <div className="flex items-center justify-between px-2 py-1 text-xs uppercase text-gray-400">
                            <span>Voice channels</span>
                            <button className="hover:text-white">+</button>
                        </div>

                        {channels.map((ch) => (
                            <ButtonChannel
                                key={ch.id}
                                name={ch.name}
                                active={activeRoomId === ch.id}
                                room={activeRoomId === ch.id ? room : null}
                                onClick={() => handleChannelClick(ch)}
                            />
                        ))}
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <div className="flex-1">{RightPage}</div>
            </main>
        </div>
    );
}

export default ServerPage;