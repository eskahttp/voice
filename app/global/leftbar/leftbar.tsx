import {GetUserServers} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/GetUserServers";
import LeftBarTSX from "@/app/global/leftbar/components/clientcomponent/LeftBarTSX";
import {
    CheckPendingFriend
} from "@/app/(home)/client/me/pageComponent/pageAction/PendingFriendAction/SelectPendingFriend";

interface MyServersArr {
    id: number;
    name: string;
}

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

async function LeftBar() {  //Remove revalidatePath and create a server store.
    const GetServers : MyServersArr[] = await GetUserServers() ?? []
    const ArrPending: ArrFriend[] = await CheckPendingFriend() ?? []

    return (
        <LeftBarTSX myServers={GetServers} ArrPending={ArrPending} />
    );
}

export default LeftBar;