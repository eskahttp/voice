'use client';

import { JSX, useEffect } from "react";
import AccountComponent from "@/app/global/account/components/AccountComponent/AccountComponent";
import {useRoomAndMicStore} from "@/app/stores/LiveKit/RoomAndMicStore";
import {useMicrophoneEvents} from "@/app/global/account/components/Hooks/useMicrophoneEvents";
import {AccountUpperInfo} from "@/app/global/account/components/AccountComponent/AccountUpperInfo";
import {useSetMyInfoOnStore} from "@/app/global/account/components/Hooks/useSetMyInfoOnStore";
import {useMyAccountStore} from "@/app/stores/MyAccountStores/myAccountStore";

interface Props {
    UserInfo: {
        login: string;
        nickname: string;
        email: string;
        avatar_url: string;
    }
}

const clickAudio = typeof Audio !== "undefined"
    ? new Audio("/audio/minecraft-click_DeZnoGEf.mp3")
    : null;

function AccountInfo({ UserInfo }: Props): JSX.Element {

    useSetMyInfoOnStore(UserInfo.login, UserInfo.nickname, UserInfo.email, UserInfo.avatar_url);

    const room = useRoomAndMicStore((state) => state.room);
    const setRoom = useRoomAndMicStore((state) => state.setRoom);

    const ActiveRoomId = useRoomAndMicStore((state) => state.activeRoomId);
    const ActiveRoomName = useRoomAndMicStore((state) => state.activeRoomName);
    const setActiveRoom = useRoomAndMicStore((state) => state.setActiveRoom);

    const microphone = useRoomAndMicStore((state) => state.microphone);
    const setMicrophone = useRoomAndMicStore((state) => state.setMicrophone);

    const myAvatar = useMyAccountStore((state)=> state.avatar_url)

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
        <div>

        <AccountUpperInfo
            leaveRoom={leaveRoom}
            ActiveRoomId={ActiveRoomId}
            AccountInfo={
            <AccountComponent
                Nickname={UserInfo.nickname}
                Avatar={myAvatar}
                activeRoomId={ActiveRoomId}
                activeRoomName={ActiveRoomName}
                toggleMic={toggleMic}
                room={room}
                micEnabled={microphone}
            />}
            ActiveRoomName={ActiveRoomName}
                />
        </div> );
}

export default AccountInfo;