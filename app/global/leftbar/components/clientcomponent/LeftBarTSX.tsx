'use client';

import HomeLink from "@/app/global/leftbar/components/clientcomponent/LinkClient";
import AddServer from "@/app/global/leftbar/components/clientcomponent/addServer";
import {useSelectedProfileStore} from "@/app/stores/selectedProfileStore/selectedProfileStore";
import {SelectedProfile} from "@/app/global/userProfile/selectedProfile";
import {useAdoptedProfile} from "@/app/global/leftbar/components/hooks/useAdoptedProfile";

interface MyServersArr {
    id: number;
    name: string;
}

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

interface Props {
    myServers: MyServersArr[];
    ArrPending: ArrFriend[];
    FriendsArr: ArrFriend[];
}

function LeftBarTSX({myServers, ArrPending , FriendsArr}: Props){

    const selectedProfile = useSelectedProfileStore(state => state.userId)

    useAdoptedProfile(FriendsArr)

    return (<div>
        {selectedProfile > 0 && (<SelectedProfile userId={selectedProfile} />)}

        <div onContextMenu={(e) => e.preventDefault()} className="fixed top-0 left-0 h-screen w-[72px] bg-[#0b0b0d] flex flex-col items-center overflow-y-auto z-40  border-r border-[#232428]">
        <div className="h-[72px] flex items-center justify-center shrink-0">
            <HomeLink ArrPending={ArrPending} />
        </div>

        <div className="h-[16px] w-full flex items-center justify-center shrink-0">
            <div className="w-8 h-0.5 bg-[#232428] rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-2 pt-2 pb-3 w-full">
            <AddServer ServerBar={myServers} />
        </div>
    </div>
    </div>)
}

export default LeftBarTSX;