import {Socket} from "socket.io-client";

export const FormSubmit = async (formData: FormData, socket: Socket | null, serverId: string) => {
    if (!socket) return;
    const Message = formData.get('message');
    if (!Message) return;
    const messageStr = Message.toString().trim();
    if (!messageStr) return;

    socket.emit('message', {
        serverId,
        messageStr,
});
}