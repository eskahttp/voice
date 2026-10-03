import {JSX} from "react";
import {UserDmPage} from "@/app/(home)/client/me/[userchat]/userChatComponent/userChatTSX";

interface Props {
    params: Promise<{ userchat: string }>;
}

const Page = async ({params}: Props) : Promise<JSX.Element> => {

    const { userchat } = await params;

    return (
        <UserDmPage
            userChatId={userchat}
        />)
}

export default Page;