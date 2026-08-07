import ServerPage from "@/app/(home)/client/[id]/components/ServerPage";
import {TakeServerName} from "@/app/(home)/client/[id]/components/action/action";

interface Props {
    params: Promise<{id: string}>
}

async function Page({ params }: Props){
    const { id } = await params;
    const ServerName = await TakeServerName(id)

    return (
        <ServerPage
        name={ServerName}
        />)
}

export default Page;