import {useEffect} from "react";
import {Room, RoomEvent} from "livekit-client";

export function useMicrophoneEvents(room: Room | null, setMicrophone: (mic:boolean)=> void) {
    useEffect(() => {
        if (!room) return

        const updateMic = () => {
            setMicrophone(room.localParticipant.isMicrophoneEnabled);
        };

        updateMic();


        room.on(RoomEvent.TrackMuted, updateMic);
        room.on(RoomEvent.TrackUnmuted, updateMic);
        room.on(RoomEvent.LocalTrackPublished, updateMic);
        room.on(RoomEvent.LocalTrackUnpublished, updateMic);
        room.on(RoomEvent.Connected, updateMic);

        return () => {
            room.off(RoomEvent.TrackMuted, updateMic);
            room.off(RoomEvent.TrackUnmuted, updateMic);
            room.off(RoomEvent.LocalTrackPublished, updateMic);
            room.off(RoomEvent.LocalTrackUnpublished, updateMic);
            room.off(RoomEvent.Connected, updateMic);
        };
    }, [room,setMicrophone]);
}