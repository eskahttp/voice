import {SelectedProfileTSX} from "@/app/global/userProfile/selectedProfileTSX";
import {useSocket} from "@/app/CustomHooks/socket";
import {useEffect, useState} from "react";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";


interface Props {userId: number}

interface UserInfo {
    profileInfo: {
        login: string,
        nickname: string,
        created_at: string,
        avatar_url: string
    },
    commonServers: {
        id: number,
        name: string
    }[]
}

export function SelectedProfile({userId}: Props): React.ReactNode | null{
    const socket = useSocket()
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        setUserInfo(null);
    }, [userId]);

    useEffect(() => {
        if (userId === 0 || !socket) return;

        const infoProfile = (userProfile: UserInfo)=>{
            setUserInfo(userProfile)
        }

        socket.on('infoUserProfile', infoProfile)

        return ()=> {
            socket.off('infoUserProfile', infoProfile)
        }

    }, [userId,socket]);

    if (!userInfo) return null;

    return (
        <SelectedProfileTSX
            login={userInfo.profileInfo.login}
            nickname={userInfo.profileInfo.nickname}
            avatar={userInfo.profileInfo.avatar_url}
            friendsSince={'Soon'}
            memberSince={userInfo.profileInfo.created_at}
            commonServers={userInfo.commonServers}
        />)
}
