'use client';

import { JSX, useEffect, useState } from "react";
import { RoomEvent } from 'livekit-client';
import {useVoice} from "@/app/(home)/client/[id]/context/VoiceContext";
interface Props {
    Nickname: string;
}

function AccountInfo({ Nickname }: Props): JSX.Element {
    const { room, setRoom, activeRoomId, setActiveRoomId, activeRoomName, setActiveRoomName } = useVoice();

    const [micEnabled, setMicEnabled] = useState(true);

    useEffect(() => {
        if (!room) return

        const updateMic = () => {
            setMicEnabled(room.localParticipant.isMicrophoneEnabled);
        };


        updateMic();


        room.on(RoomEvent.TrackMuted, updateMic);
        room.on(RoomEvent.TrackUnmuted, updateMic);
        room.on(RoomEvent.LocalTrackPublished, updateMic);
        room.on(RoomEvent.LocalTrackUnpublished, updateMic);
        room.on(RoomEvent.Connected, updateMic);

        return () => {
            room.off(RoomEvent.TrackMuted, updateMic);
            room.off(RoomEvent.TrackUnmuted, updateMic);
            room.off(RoomEvent.LocalTrackPublished, updateMic);
            room.off(RoomEvent.LocalTrackUnpublished, updateMic);
            room.off(RoomEvent.Connected, updateMic);
        };
    }, [room]);

    const toggleMic = async () => {
        if (!room) return;

        const currentlyEnabled = room.localParticipant.isMicrophoneEnabled;
        await room.localParticipant.setMicrophoneEnabled(!currentlyEnabled);
    };

    const leaveRoom = async () => {
        if (!room) return;
        await room.disconnect();
        setMicEnabled(true);
        setRoom(null);
        setActiveRoomId(null);
        setActiveRoomName(null);
    };

    return (
        <div className="fixed bottom-0 left-[72px] w-[240px] bg-[#232428] flex flex-col z-50">
            {activeRoomId && (
                <div className="flex items-center justify-between px-2 py-2 border-b border-black/30">
                    <div className="flex flex-col min-w-0">
                        <div className="text-xs text-green-400 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Voice connection established.
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                            {activeRoomName ?? `Канал #${activeRoomId}`}
                        </div>
                    </div>
                    <button
                        onClick={leaveRoom}
                        className="w-7 h-7 rounded hover:bg-red-500/20 text-red-400 flex items-center justify-center"
                        title="Disconnect"
                    >
                        ✕
                    </button>
                </div>
            )}

            <div className="flex items-center gap-1 px-2 py-2">
                <div className="flex items-center gap-2 flex-1 min-w-0 hover:bg-[#35373c] rounded px-1 py-1 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold">
                        {Nickname[0]?.toUpperCase() || 'С'}
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs text-white font-medium truncate">
                            {Nickname}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                            {activeRoomId ? `In ${activeRoomName}` : 'Online'}
                        </div>
                    </div>
                </div>

                <button
                    onClick={toggleMic}
                    disabled={!room}
                    className={`w-8 h-8 rounded hover:bg-[#35373c] flex items-center justify-center transition ${
                        !room ? 'text-gray-600 cursor-not-allowed' :
                            micEnabled ? 'text-gray-300' : 'text-red-400'
                    }`}
                    title={micEnabled ? 'Turn off the microphone' : 'Turn on the microphone'}
                >
                    {micEnabled ? '🎤' : '🚫'}
                </button>

                <button
                    disabled={!room}
                    className={'w-8 h-8 rounded hover:bg-[#35373c] flex items-center justify-center transition '}
                >
                    🎧
                </button>

                <button className="w-8 h-8 rounded hover:bg-[#35373c] text-gray-300 flex items-center justify-center" title="Настройки">
                    ⚙
                </button>
            </div>
        </div>
    );
}

export default AccountInfo;