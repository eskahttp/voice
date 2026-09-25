import {Socket} from "socket.io-client";
import {useEffect} from "react";
import {useOnlineServersUserStore} from "@/app/stores/ServersStore/onlineUsersOnServerStore";

export const useOnlineUsersMyServers = (socket: Socket | null)=> {

    const setOnlineUsers = useOnlineServersUserStore((state)=> state.setOnline)
    const addOnline = useOnlineServersUserStore((state)=> state.addOnline)
    const removeOnline = useOnlineServersUserStore((state)=> state.removeOnline)

    useEffect(() => {
        if (!socket) return

        const setUsersStore = (snapshot: number[])=> setOnlineUsers(snapshot)
        const removeUserOnline = (userId:number)=> removeOnline(userId)

        socket.on('onlineUsersMyServers',setUsersStore)
        socket.on('userOfflineOnServers',removeUserOnline)

        return ()=> {
            socket.off('onlineUsersMyServers', setUsersStore)
            socket.off('userOfflineOnServers', removeUserOnline)
        }
    }, [socket,setOnlineUsers,addOnline,removeOnline]);
}