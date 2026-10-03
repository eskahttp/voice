import {useOnlineFriendsIdStore} from "@/app/stores/FriendStores/onlineFriendsStore";
import {useSocket} from "@/app/CustomHooks/socket";
import {useEffect} from "react";
import {useFriendsStore} from "@/app/stores/FriendStores/friendsStore";

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

export function useAdoptedProfile(FriendsArr: ArrFriend[]) {
    const addFriend = useFriendsStore((s) => s.addFriend);

    const addOnline = useOnlineFriendsIdStore((s) => s.addOnline);
    const addIdFriend = useOnlineFriendsIdStore((s) => s.addIdFriend);

    const setAllFriends = useFriendsStore((state) => state.setFriends);

    useEffect(() => {
        setAllFriends(FriendsArr)
    }, [FriendsArr,setAllFriends]);

    const socket = useSocket();
    useEffect(() => {
        if (!socket) return;

        const onAdopted = (profile: ArrFriend) => {
            addFriend(profile)
            addOnline(profile.id);
            addIdFriend(profile.id);
        };

        socket.on('AdoptedProfile', onAdopted);

        return () => {
            socket.off('AdoptedProfile', onAdopted);
        };
    }, [socket,addOnline,addFriend,addIdFriend]);
}