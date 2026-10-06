import {GetUserServers} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/GetUserServers";
import LeftBarTSX from "@/app/global/leftbar/components/clientcomponent/LeftBarTSX";
import {
    CheckPendingFriend
} from "@/app/(home)/client/me/pageComponent/pageAction/PendingFriendAction/SelectPendingFriend";
import {
    selectFriendAction
} from "@/app/(home)/client/me/pageComponent/RightBarComponent/SelectFriendAction/SelectFriendAction";

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

type UserInfo = [MyServersArr[],ArrFriend[],ArrFriend[]]

async function LeftBar() {
    const [GetServers,ArrPending,FriendsList] : UserInfo = await Promise.all([
        GetUserServers(),
        CheckPendingFriend(),
        selectFriendAction()])

    return (
        <LeftBarTSX
            FriendsArr={FriendsList ?? []}
            myServers={GetServers ?? []}
            ArrPending={ArrPending ?? []} />
    );
}

export default LeftBar;