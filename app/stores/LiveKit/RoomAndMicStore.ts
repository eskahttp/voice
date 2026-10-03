import {create} from "zustand";
import {Room} from "livekit-client";

interface RoomAndMicStore {
    activeRoomName: string | null;
    activeRoomId: string | null;
    room: Room | null;
    microphone: boolean;
    setActiveRoom: (id: string | null , name: string | null) => void;
    setRoom: (room: Room | null) => void;
    setMicrophone: (mic:boolean) => void
}

export const useRoomAndMicStore = create<RoomAndMicStore>((set) => ({
    activeRoomName: null,
    activeRoomId: null,
    room: null,
    microphone: true,
    setActiveRoom: (id,name) => set({activeRoomId: id , activeRoomName: name}),
    setRoom: (room) => set({room}),
    setMicrophone: (mic) => set({microphone: mic})
}))