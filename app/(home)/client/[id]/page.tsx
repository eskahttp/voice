import ServerPage from "@/app/(home)/client/[id]/components/RightPage/ServerPage";
import { TakeChannelsAndServerName } from "@/app/(home)/client/[id]/components/Channels/action/buttonAction";
import { TakeNickname } from "@/app/global/account/components/action/action";
import RightPage from "@/app/(home)/client/[id]/components/RightPage/RightServerPage";
import {TakeUserServer} from "@/app/(home)/client/[id]/components/RightPage/UserAction/ServerUser";
import {getMessage} from "@/app/(home)/client/[id]/components/RightPage/UserAction/GetMessageServer";
import {CheckUserOnServer} from "@/app/(home)/client/[id]/CheckUserServer/CheckAction/CheckUserAction";
import ServerModal from "@/app/(home)/client/[id]/CheckUserServer/Component/CheckPage";

interface Props {
    params: Promise<{ id: string }>;
}

async function Page({ params }: Props) {
    const { id } = await params;

    const CheckUOnS: string = await CheckUserOnServer(id)

    const [{ serverName, channels }, nickname , UserServer, GetMessage] = await Promise.all([
        TakeChannelsAndServerName(id),
        TakeNickname(),
        TakeUserServer(id),
        getMessage(id)
    ]);

    return (
        CheckUOnS === 'Yes' ?
    <ServerPage
        name={serverName}
        channels={channels}
        nickname={nickname}
        RightPage={
            <RightPage
                nickname={nickname}
                serverId={id}
                users={UserServer}
                GetMessage={GetMessage}
            />}
    /> : <ServerModal
                serverName={serverName}
                ServerId={id}
            />
 );
}

export default Page;