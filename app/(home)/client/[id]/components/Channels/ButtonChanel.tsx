'use client';

import { useEffect, useState } from 'react';
import {
    Room,
    RoomEvent,
    Participant,
    ParticipantEvent,
    Track,
} from 'livekit-client';
import ButtonComponent from "@/app/(home)/client/[id]/components/Channels/ButtonComponents/ButtonComponent";

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
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (!active || !room) {
            setParticipants([]);
            return;
        }

        const subscribed = new Set<Participant>();

        const update = () => {
            setParticipants([
                room.localParticipant,
                ...Array.from(room.remoteParticipants.values()).sort(
                    (a, b) => a.identity.localeCompare(b.identity),
                ),
            ]);
        };

        const events: ParticipantEvent[] = [
            ParticipantEvent.IsSpeakingChanged,
            ParticipantEvent.TrackMuted,
            ParticipantEvent.TrackUnmuted,
            ParticipantEvent.TrackPublished,
            ParticipantEvent.TrackUnpublished,
            ParticipantEvent.TrackSubscribed,
            ParticipantEvent.TrackUnsubscribed,
            ParticipantEvent.LocalTrackPublished,
            ParticipantEvent.LocalTrackUnpublished,
            ParticipantEvent.ParticipantNameChanged,
            ParticipantEvent.ParticipantMetadataChanged,
            ParticipantEvent.AttributesChanged,
        ];

        const subscribe = (p: Participant) => {
            if (subscribed.has(p)) return;
            subscribed.add(p);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            events.forEach((e: any) => p.on(e, update));
        };

        const unsubscribe = (p: Participant) => {
            if (!subscribed.has(p)) return;
            subscribed.delete(p);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            events.forEach((e: any) => p.off(e, update));
        };

        subscribe(room.localParticipant);
        room.remoteParticipants.forEach(subscribe);

        const onConnected = (p: Participant) => {
            subscribe(p);
            update();
        };
        const onDisconnected = (p: Participant) => {
            unsubscribe(p);
            update();
        };

        room.on(RoomEvent.ParticipantConnected, onConnected);
        room.on(RoomEvent.ParticipantDisconnected, onDisconnected);
        room.on(RoomEvent.ActiveSpeakersChanged, update);

        update();

        return () => {
            subscribed.forEach((p) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                events.forEach((e: any) => p.off(e, update));
            });
            subscribed.clear();
            room.off(RoomEvent.ParticipantConnected, onConnected);
            room.off(RoomEvent.ParticipantDisconnected, onDisconnected);
            room.off(RoomEvent.ActiveSpeakersChanged, update);
        };
    }, [active, room]);

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