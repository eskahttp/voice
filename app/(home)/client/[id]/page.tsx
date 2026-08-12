import ServerPage from "@/app/(home)/client/[id]/components/RightPage/ServerPage";
import { TakeChannelsAndServerName } from "@/app/(home)/client/[id]/components/Channels/action/buttonAction";
import { TakeNickname } from "@/app/global/account/components/action/action";
import RightPage from "@/app/(home)/client/[id]/components/RightPage/RightServerPage";
import {TakeUserServer} from "@/app/(home)/client/[id]/components/RightPage/UserAction/ServerUser";

interface Props {
    params: Promise<{ id: string }>;
}

async function Page({ params }: Props) {
    const { id } = await params;

    const [{ serverName, channels }, nickname , UserServer] = await Promise.all([
        TakeChannelsAndServerName(id),
        TakeNickname(),
        TakeUserServer(id)
    ]);

    return (
        <ServerPage
            name={serverName}
            channels={channels}
            nickname={nickname}
            RightPage={<RightPage serverId={id} users={UserServer} />}
        />
    );
}

export default Page;