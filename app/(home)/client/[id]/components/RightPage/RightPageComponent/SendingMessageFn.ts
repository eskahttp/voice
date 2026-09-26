import {MessageAction} from "@/app/(home)/client/[id]/components/RightPage/MessageAction/MessageAction";
import {Socket} from "socket.io-client";

export const FormSubmit = (formData: FormData, socket: Socket | null, serverId: string, nickname: string) => {
    if (!socket) return;
    const Message = formData.get('message');
    if (!Message) return;
    const messageStr = Message.toString().trim();
    if (!messageStr) return;

    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    socket.emit('message', {
        serverId,
        id: crypto.randomUUID(),
        nickname,
        message: messageStr,
        created_at: `${hours}:${minutes}`
    });

    MessageAction(formData, serverId);
};