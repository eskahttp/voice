import ServerPage from "@/app/(home)/client/[id]/components/RightPage/ServerPage";
import { TakeChannelsAndServerName } from "@/app/(home)/client/[id]/components/Channels/action/buttonAction";
import RightPage from "@/app/(home)/client/[id]/components/RightPage/RightServerPage";
import {getMessage} from "@/app/(home)/client/[id]/components/RightPage/UserAction/GetMessageServer";
import {CheckUserOnServer} from "@/app/(home)/client/[id]/CheckUserServer/CheckAction/CheckUserAction";
import ServerModal from "@/app/(home)/client/[id]/CheckUserServer/Component/CheckPage";

interface Props {
    params: Promise<{ id: string }>;
}

async function Page({ params }: Props) {
    const { id } = await params;

    const CheckUOnS: number = await CheckUserOnServer(id)

    const [{ serverName, channels } , GetMessage] = await Promise.all([
        TakeChannelsAndServerName(id),
        getMessage(id)
    ]);

    return (
        CheckUOnS ?
    <ServerPage
        referal={serverName.referal}
        name={serverName.name}
        channels={channels}
        RightPage={
            <RightPage serverId={id} GetMessage={GetMessage}/>}
    />
            :
            <ServerModal
                serverName={serverName.name}
                ServerId={id}
            />
 );
}

export default Page;