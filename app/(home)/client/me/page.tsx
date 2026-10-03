import RightBarClient from "@/app/(home)/client/me/pageComponent/RightBar";
import {selectFriendAction} from "@/app/(home)/client/me/pageComponent/RightBarComponent/SelectFriendAction/SelectFriendAction";


async function PageClient(){
    const FriendsList = await selectFriendAction() ?? []

    return (
            <RightBarClient
            FriendsArr={FriendsList}
            />
        )
}

export default PageClient;