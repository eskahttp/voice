'use client';

import { useVoice } from '@/app/(home)/client/[id]/context/VoiceContext';
import RoomPage from '@/app/(home)/client/[id]/components/livekit/LiveKit';

export default function VoiceConnection({ Nickname }: { Nickname: string }) {
    const { activeRoomId, setActiveRoomId, setActiveRoomName, setRoom } = useVoice();

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
                    setActiveRoomId(null);
                    setActiveRoomName(null);
                    setRoom(null);
                }}
                onRoomConnected={(r) => setRoom(r)}
            />
        </div>
    );
}