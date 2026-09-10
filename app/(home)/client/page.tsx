import LeftBarClient from "@/app/(home)/client/pageComponent/LeftBar";
import RightBarClient from "@/app/(home)/client/pageComponent/RightBar";
import {CheckPendingFriend} from "@/app/(home)/client/pageComponent/pageAction/PendingFriendAction/PendingFriendAction";


async function PageClient(){
    const PendingFriend = await CheckPendingFriend()

    return (<div className="flex flex-col h-full w-full bg-[#1e1f22] text-gray-300 overflow-hidden">
        <div className="flex flex-1 overflow-hidden border-l border-[#232428] ">
            <LeftBarClient />
            <RightBarClient
            ArrPending={PendingFriend}
            />
        </div>
    </div>)
}

export default PageClient;