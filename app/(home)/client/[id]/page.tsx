import ServerPage from "@/app/(home)/client/[id]/components/ServerPage";
import { TakeServerName } from "@/app/(home)/client/[id]/components/action/action";
import { TakeChannels } from "@/app/(home)/client/[id]/components/Channels/action/buttonAction";
import { TakeNickname } from "@/app/global/account/components/action/action";

interface Props {
    params: Promise<{ id: string }>;
}

interface Channel {
    id: number;
    name: string;
}

async function Page({ params }: Props) {
    const { id } = await params;

    const serverName = await TakeServerName(id);
    const channels: Channel[] = await TakeChannels(id);
    const nickname = await TakeNickname();

    return (
        <ServerPage
            name={serverName}
            channels={channels}
            nickname={nickname}
        />
    );
}

export default Page;