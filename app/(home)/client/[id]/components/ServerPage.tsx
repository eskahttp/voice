'use client';

import { useState } from 'react';
import ButtonChannel from "@/app/(home)/client/[id]/components/Channels/ButtonChanel";
import RoomPage from "@/app/(home)/client/[id]/components/livekit/LiveKit";

interface Channel {
    id: string;
    name: string;
}

interface Props {
    name: string;
    channels: Channel[];
    nickname: string;
}

function ServerPage({ name, channels, nickname }: Props) {
    const [activeRoom, setActiveRoom] = useState<string | null>(null);

    return (
        <div className="flex h-screen bg-[#1e1f22] text-gray-200">
            <aside className="w-64 bg-[#2b2d31] flex flex-col border-r border-black/20">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/30 shadow-sm">
                    <h2 className="font-semibold text-white flex items-center gap-1">
                        {name}
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
                    <div className="pt-4">
                        <div className="flex items-center justify-between px-2 py-1 text-xs uppercase text-gray-400 hover:text-gray-200 cursor-pointer">
                            <span className="flex items-center gap-1">
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                Голосовые каналы
                            </span>
                            <button className="hover:text-white">+</button>
                        </div>

                        {channels.map((ch) => (
                            <ButtonChannel
                                key={ch.id}
                                name={ch.name}
                                active={activeRoom === ch.id}
                                onClick={() => setActiveRoom(ch.id)}
                            />
                        ))}
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                {activeRoom ? (
                    <RoomPage
                        key={activeRoom}
                        Nickname={nickname}
                        room={activeRoom}
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Выберите голосовой канал
                    </div>
                )}
            </main>
        </div>
    );
}

export default ServerPage;