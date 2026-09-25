'use client';

import { JSX, useEffect } from "react";
import AccountComponent from "@/app/global/account/components/AccountComponent/AccountComponent";
import {useRoomAndMicStore} from "@/app/stores/LiveKit/RoomAndMicStore";
import {useMicrophoneEvents} from "@/app/global/account/components/Hooks/useMicrophoneEvents";
import {ImConnection, ImPhoneHangUp} from "react-icons/im";
import {LuMonitorUp} from "react-icons/lu";
import {PiVideoCameraFill} from "react-icons/pi";

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
        <div className="fixed bottom-0 w-[364px] flex flex-col z-50 p-2">
            <div className="bg-[#0b0b0d] border border-gray-700/80 rounded-xl shadow-lg overflow-hidden">
                {ActiveRoomId && (
                    <>
                        <div className="px-3 pt-2 pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                <span className="text-green-400 text-base leading-none">
                  <ImConnection />
                </span>
                                    <div className="flex flex-col min-w-0">
                                        <div className="text-sm text-green-400 font-semibold truncate">
                                            Voice Connected
                                        </div>
                                        <div className="text-[11px] text-gray-400 truncate">
                                            {ActiveRoomName ?? `Канал #${ActiveRoomId}`}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={leaveRoom}
                                        className="w-7 h-7 rounded hover:bg-[#35373c]/50 text-gray-200 flex items-center justify-center cursor-pointer"
                                    >
                                        <ImPhoneHangUp />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <button
                                    className="h-9 rounded-lg bg-[#2b2d37] hover:bg-[#35373c]/50 text-gray-300 flex items-center justify-center transition"
                                >
                                    <PiVideoCameraFill />
                                </button>
                                <button
                                    className="h-9 rounded-lg bg-[#2b2d37] hover:bg-[#35373c]/50 text-gray-300 flex items-center justify-center transition"
                                >
                                    <LuMonitorUp />
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-gray-700/60 mx-3" />
                    </>
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
        </div>
    );
}

export default AccountInfo;