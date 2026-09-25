import {Dispatch, SetStateAction, useEffect} from "react";
import {Socket} from "socket.io-client";
import {useOnlineServersUserStore} from "@/app/stores/ServersStore/onlineUsersOnServerStore";


interface Message { id: string; nickname: string; message: string; created_at: string; }
interface User { id: string; nickname: string; }

export function useActivityServerUsers(socket: Socket|null,
                                       serverId:string,
                                       setMessage: Dispatch<SetStateAction<Message[]>>,
                                       setUserList: Dispatch<SetStateAction<User[]>>,  ) {

    const setOnlineUsers = useOnlineServersUserStore(state => state.setOnline)
    const addOnlineUser = useOnlineServersUserStore(state => state.addOnline)
    const removeOnlineUser = useOnlineServersUserStore(state => state.removeOnline)

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinRoom', serverId);

        const messageHandler = (msg: Message) => {
            setMessage(prev => [...prev, msg]);
        };

        const userJoinedHandler = (user: User) => {
            setUserList(prev => {
                if (prev.some(u => u.id === user.id)) return prev;
                return [...prev, user];
            });
        };

        const setOfflineAndOnlineUsers = (AllUsersServer : {AllUsersServer: User[], OnlineUsersServer: number[]})=>{
            setUserList(AllUsersServer.AllUsersServer)
            setOnlineUsers(AllUsersServer.OnlineUsersServer)
        }

        const newOnlineUser = (userId: number)=> {
            addOnlineUser(userId)
        }
        const deleteOnlineUser = (userId: number)=> {
            removeOnlineUser(userId)
        }

        socket.emit('getServerUsers', serverId)
        socket.on('newOnlineUser',newOnlineUser)
        socket.on('deleteOnlineUser',deleteOnlineUser)
        socket.on('getAllUsersAndOnlineUsers', setOfflineAndOnlineUsers)

        socket.on('message', messageHandler);
        socket.on('userJoined', userJoinedHandler);

        return () => {
            socket.emit('leaveRoom', serverId);
            socket.off('getAllUsersAndOnlineUsers', setOfflineAndOnlineUsers)
            socket.off('newOnlineUser',newOnlineUser)
            socket.off('deleteOnlineUser',deleteOnlineUser)
            socket.off('message', messageHandler);
            socket.off('userJoined', userJoinedHandler);
        };
    }, [socket, serverId,setOnlineUsers,addOnlineUser,removeOnlineUser,setMessage,setUserList]);
}