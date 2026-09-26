'use client';

import { Room, Participant, Track } from 'livekit-client';
import ButtonComponent from '@/app/(home)/client/[id]/components/Channels/ButtonComponents/ButtonComponent';
import {
    useRoomParticipants
} from "@/app/(home)/client/[id]/components/Channels/ButtonComponents/useRoomParticipant/useRoomParticipant";

interface Props {
    name: string;
    onClick?: () => void;
    active?: boolean;
    room?: Room | null;
}

function isMicOn(p: Participant) {
    const pub = p.getTrackPublication(Track.Source.Microphone);
    return !!pub && !pub.isMuted && !!pub.track;
}

function ButtonChannel({ name, onClick, active, room }: Props) {
    const participants = useRoomParticipants(room, !!active);

    return (
        <ButtonComponent
            onClick={onClick}
            active={active}
            name={name}
            participants={participants}
            isMicOn={isMicOn}
        />
    );
}

export default ButtonChannel;