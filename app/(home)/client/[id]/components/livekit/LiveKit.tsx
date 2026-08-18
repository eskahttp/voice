'use client';

import {
    LiveKitRoom,
    VideoConference,
    RoomAudioRenderer,
    useRoomContext,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Room } from 'livekit-client';
import { useEffect, useState } from 'react';

interface Props {
    Nickname: string;
    room: string;
    onLeave: () => void;
    onRoomConnected?: (room: Room) => void;
}

function RoomBridge({ onRoomConnected }: { onRoomConnected?: (r: Room) => void }) {
    const room = useRoomContext();

    useEffect(() => {
        if (room && onRoomConnected) {
            onRoomConnected(room);
        }
    }, [room, onRoomConnected]);

    return null;
}

export default function RoomPage({ Nickname, room, onLeave, onRoomConnected }: Props) {
    const [token, setToken] = useState<string>('');
    const [micEnabled, setMicEnabled] = useState<boolean>(true);

    useEffect(() => {
        try{
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
        (async () => {
            try {
                const res = await fetch(
                    `/api/token?room=${room}&username=${Nickname}`
                );
                const data = await res.json();
                setToken(data.token);
            } catch (e) {
                console.error('Не удалось получить токен', e);
            }
        })();
    }, [room, Nickname]);

    if (!token) return <div>Подключение...</div>;

    return (
        <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect={true}
            video={false}
            audio={micEnabled}
            onDisconnected={onLeave}
            data-lk-theme="default"
            style={{ height: '100%', width: '100%' }}
        >
            <RoomBridge onRoomConnected={onRoomConnected} />
            <VideoConference />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}