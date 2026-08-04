'use client';

import {
    LiveKitRoom,
    VideoConference,
    RoomAudioRenderer,
    ControlBar,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';

export default function RoomPage({Nickname} : {Nickname: string}) {
    const [token, setToken] = useState<string>('');

    const room = 'my-first-room';

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
    }, []);

    if (!token) return <div>Подключение...</div>;

    return (
        <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect={true}
            video={false}
            audio={true}
            data-lk-theme="default"
            style={{ height: '100vh' }}
        >
            <VideoConference />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
}