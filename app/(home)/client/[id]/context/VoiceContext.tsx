'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Room } from 'livekit-client';

interface VoiceContextType {
    room: Room | null;
    setRoom: (room: Room | null) => void;
    activeRoomId: string | null;
    setActiveRoomId: (id: string | null) => void;
    activeRoomName: string | null;
    setActiveRoomName: (name: string | null) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
    const [room, setRoom] = useState<Room | null>(null);
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [activeRoomName, setActiveRoomName] = useState<string | null>(null);

    return (
        <VoiceContext.Provider
            value={{
                room, setRoom,
                activeRoomId, setActiveRoomId,
                activeRoomName, setActiveRoomName,
            }}
        >
            {children}
        </VoiceContext.Provider>
    );
}

export function useVoice() {
    const ctx = useContext(VoiceContext);
    if (!ctx) throw new Error('useVoice must be used inside VoiceProvider');
    return ctx;
}