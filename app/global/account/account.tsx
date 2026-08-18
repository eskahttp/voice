'use client';

import { JSX, useEffect, useState } from "react";
import { RoomEvent } from 'livekit-client';
import {useVoice} from "@/app/(home)/client/[id]/context/VoiceContext";
import AccountComponent from "@/app/global/account/components/AccountComponent/AccountComponent";
interface Props {
    Nickname: string;
}

function AccountInfo({ Nickname }: Props): JSX.Element {
    const { room, setRoom, activeRoomId, setActiveRoomId, activeRoomName, setActiveRoomName } = useVoice();

    const [micEnabled, setMicEnabled] = useState<boolean>(true);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("micEnabled");
            if (saved !== null) {
                setMicEnabled(JSON.parse(saved));
            }
        }
        catch (e){
            console.error(e);
            setMicEnabled(true);
        }
    }, []);

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
        if (!room) {
            setMicEnabled((prev) => {
                const next = !prev;
                try{
                    localStorage.setItem("micEnabled", JSON.stringify(next));
                    return next;
                }
                catch (e){
                    console.error(e);
                    return true
                }
            });
            return;
        }

        const currentlyEnabled = room.localParticipant.isMicrophoneEnabled;
        const next = !currentlyEnabled;

        await room.localParticipant.setMicrophoneEnabled(next);
        setMicEnabled(next);
        try{
            localStorage.setItem("micEnabled", JSON.stringify(next));
        }
        catch (e){
            console.error(e);
        }
    };

    const leaveRoom = async () => {
        if (!room) return;
        await room.disconnect();
        const saved = localStorage.getItem("micEnabled");
        if (saved !== null) {
            setMicEnabled(JSON.parse(saved));
        }
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
            <AccountComponent
            Nickname={Nickname}
            activeRoomId={activeRoomId}
            activeRoomName={activeRoomName}
            toggleMic={toggleMic}
            room={room}
            micEnabled={micEnabled}
            />
        </div>
    );
}

export default AccountInfo;