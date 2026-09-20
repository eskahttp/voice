'use client';

import RoomPage from '@/app/(home)/client/[id]/components/livekit/LiveKit';
import {useRoomAndMicStore} from "@/app/stores/LiveKit/RoomAndMicStore";

export default function VoiceConnection({ Nickname }: { Nickname: string }) {
    const activeRoomId = useRoomAndMicStore((state) => state.activeRoomId);
    const setRoom = useRoomAndMicStore((state) => state.setRoom);
    const setActiveRoomIdAndName = useRoomAndMicStore((state) => state.setActiveRoom);

    if (!activeRoomId) return null;

    return (
        <div
            style={{
                position: 'fixed',
                width: 0,
                height: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            <RoomPage
                key={activeRoomId}
                Nickname={Nickname}
                room={activeRoomId}
                onLeave={() => {
                    setActiveRoomIdAndName(null, null);
                    setRoom(null);
                }}
                onRoomConnected={(r) => setRoom(r)}
            />
        </div>
    );
}