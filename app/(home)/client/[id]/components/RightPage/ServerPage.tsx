'use client';

import { ReactNode } from 'react';
import ButtonChannel from "@/app/(home)/client/[id]/components/Channels/ButtonChanel";
import RoomPage from "@/app/(home)/client/[id]/components/livekit/LiveKit";
import {useVoice} from "@/app/(home)/client/[id]/context/VoiceContext";

interface Channel {
    id: string;
    name: string;
}

interface Props {
    name: string;
    channels: Channel[];
    nickname: string;
    RightPage: ReactNode;
}

function ServerPage({ name, channels, nickname, RightPage }: Props) {
    const { room, setRoom, activeRoomId, setActiveRoomId, setActiveRoomName } = useVoice();

    const handleChannelClick = (ch: Channel) => {
        setActiveRoomId(ch.id);
        setActiveRoomName(ch.name);
    };

    return (
        <div className="flex h-screen bg-[#1e1f22] text-gray-200">
            <aside className="w-60 bg-[#2b2d31] flex flex-col border-r border-black/20">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/30 shadow-sm">
                    <h2 className="font-semibold text-white">{name}</h2>
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

                {activeRoomId && (
                    <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                        <RoomPage
                            key={activeRoomId}
                            Nickname={nickname}
                            room={activeRoomId}
                            onLeave={() => {
                                setActiveRoomId(null);
                                setActiveRoomName(null);
                                setRoom(null);
                            }}
                            onRoomConnected={(r) => setRoom(r)}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}

export default ServerPage;