'use client';

import { useEffect, useState } from 'react';
import {
    Room,
    RoomEvent,
    Participant,
    ParticipantEvent,
} from 'livekit-client';

const PARTICIPANT_EVENTS: ParticipantEvent[] = [
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

export function useRoomParticipants(
    room: Room | null | undefined,
    enabled: boolean,
): Participant[] {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (!enabled || !room) {
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

        const subscribe = (p: Participant) => {
            if (subscribed.has(p)) return;
            subscribed.add(p);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            PARTICIPANT_EVENTS.forEach((e: any) => p.on(e, update));
        };

        const unsubscribe = (p: Participant) => {
            if (!subscribed.has(p)) return;
            subscribed.delete(p);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            PARTICIPANT_EVENTS.forEach((e: any) => p.off(e, update));
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
                PARTICIPANT_EVENTS.forEach((e: any) => p.off(e, update));
            });
            subscribed.clear();
            room.off(RoomEvent.ParticipantConnected, onConnected);
            room.off(RoomEvent.ParticipantDisconnected, onDisconnected);
            room.off(RoomEvent.ActiveSpeakersChanged, update);
        };
    }, [enabled, room]);

    return participants;
}