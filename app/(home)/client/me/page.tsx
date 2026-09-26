import LeftBarClient from "@/app/(home)/client/me/pageComponent/LeftBar";
import RightBarClient from "@/app/(home)/client/me/pageComponent/RightBar";
import {selectFriendAction} from "@/app/(home)/client/me/pageComponent/RightBarComponent/SelectFriendAction/SelectFriendAction";


async function PageClient(){
    const FriendsList = await selectFriendAction() ?? []

    return (<div className="flex flex-col h-full w-full bg-[#1e1f22] text-gray-300 overflow-hidden">
        <div className="flex flex-1 overflow-hidden ">
            <LeftBarClient />
            <RightBarClient
            FriendsArr={FriendsList}
            />
        </div>
    </div>)
}

export default PageClient;