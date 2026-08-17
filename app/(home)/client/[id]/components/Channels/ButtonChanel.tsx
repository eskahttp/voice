'use client';

import { useEffect, useState } from 'react';
import { Room, RoomEvent, Participant } from 'livekit-client';

interface Props {
    name: string;
    onClick?: () => void;
    active?: boolean;
    room?: Room | null;
}

function ButtonChannel({ name, onClick, active, room }: Props) {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (!active || !room) {
            setParticipants([]);
            return;
        }

        const update = () => {
            setParticipants([
                room.localParticipant,
                ...Array.from(room.remoteParticipants.values()),
            ]);
        };

        update();

        room.on(RoomEvent.ParticipantConnected, update);
        room.on(RoomEvent.ParticipantDisconnected, update);
        room.on(RoomEvent.ActiveSpeakersChanged, update);
        room.on(RoomEvent.TrackMuted, update);
        room.on(RoomEvent.TrackUnmuted, update);
        room.on(RoomEvent.Connected, update);

        return () => {
            room.off(RoomEvent.ParticipantConnected, update);
            room.off(RoomEvent.ParticipantDisconnected, update);
            room.off(RoomEvent.ActiveSpeakersChanged, update);
            room.off(RoomEvent.TrackMuted, update);
            room.off(RoomEvent.TrackUnmuted, update);
            room.off(RoomEvent.Connected, update);
        };
    }, [active, room]);

    return (
        <div>
            <button
                onClick={onClick}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mt-1 ${
                    active
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-400'
                }`}
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                </svg>
                {name}
            </button>

            {active && participants.length > 0 && (
                <ul className="ml-6 mt-0.5 space-y-0.5">
                    {participants.map((p) => (
                        <li
                            key={p.identity}
                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-gray-300"
                        >
                            <div
                                className={`w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white font-semibold ring-2 transition ${
                                    p.isSpeaking ? 'ring-green-500' : 'ring-transparent'
                                }`}
                            >
                                {(p.name || p.identity)[0]?.toUpperCase()}
                            </div>
                            <span className="truncate flex-1">{p.name || p.identity}</span>

                            {!p.isMicrophoneEnabled && (
                                <span> 🔇 </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ButtonChannel;