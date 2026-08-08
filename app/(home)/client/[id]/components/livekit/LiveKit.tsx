'use client';

import {
    LiveKitRoom,
    VideoConference,
    RoomAudioRenderer,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';

interface Props {
    Nickname: string;
    room: string;
}

export default function RoomPage({ Nickname, room }: Props) {
    const [token, setToken] = useState<string>('');

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
            audio={true}
            data-lk-theme="default"
            style={{ height: '100%', width: '100%' }}
        >
            <VideoConference />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}