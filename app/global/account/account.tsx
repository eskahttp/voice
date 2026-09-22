'use client';

import { JSX, useEffect } from "react";
import AccountComponent from "@/app/global/account/components/AccountComponent/AccountComponent";
import {useRoomAndMicStore} from "@/app/stores/LiveKit/RoomAndMicStore";
import {useMicrophoneEvents} from "@/app/global/account/components/Hooks/useMicrophoneEvents";

interface Props {
    Nickname: string;
}

const clickAudio = typeof Audio !== "undefined"
    ? new Audio("/audio/minecraft-click_DeZnoGEf.mp3")
    : null;

function AccountInfo({ Nickname }: Props): JSX.Element {

    const room = useRoomAndMicStore((state) => state.room);
    const setRoom = useRoomAndMicStore((state) => state.setRoom);

    const ActiveRoomId = useRoomAndMicStore((state) => state.activeRoomId);
    const ActiveRoomName = useRoomAndMicStore((state) => state.activeRoomName);
    const setActiveRoom = useRoomAndMicStore((state) => state.setActiveRoom);

    const microphone = useRoomAndMicStore((state) => state.microphone);
    const setMicrophone = useRoomAndMicStore((state) => state.setMicrophone);



    useEffect(() => {
        try {
            const saved = localStorage.getItem("micEnabled");
            if (saved !== null) {
                setMicrophone(JSON.parse(saved));
            }
        }catch{}
    }, [setMicrophone]);

    useMicrophoneEvents(room,setMicrophone)

    const toggleMic = async () => {
        clickAudio?.play();
        if (!room) {
            setMicrophone(!microphone);
            try{localStorage.setItem('micEnabled', String(!microphone));} catch{}
            return
        }

        const next = !room.localParticipant.isMicrophoneEnabled;
        await room.localParticipant.setMicrophoneEnabled(next);
        setMicrophone(next);
    };

    const leaveRoom = async () => {
        if (!room) return;
        await room.disconnect();
        setRoom(null);
        setActiveRoom(null, null);
    };

    return (
        <div className="fixed bottom-0 w-[364px] flex flex-col z-50">
            {ActiveRoomId && (
                <div className="flex items-center justify-between px-3 py-2 mx-2 mt-2 rounded-xl bg-[#232428] border border-gray-500">
                    <div className="flex flex-col min-w-0">
                        <div className="text-xs text-green-400 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Voice connection established.
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                            {ActiveRoomName ?? `Канал #${ActiveRoomId}`}
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
                activeRoomId={ActiveRoomId}
                activeRoomName={ActiveRoomName}
                toggleMic={toggleMic}
                room={room}
                micEnabled={microphone}
            />
        </div>
    );
}

export default AccountInfo;