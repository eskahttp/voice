import RoomPage from "@/app/(home)/client/room/livekit";
import {TakeNickname} from "@/app/global/account/components/action/action";


async function Page(){
    const Nickname: string = await TakeNickname()

    return (<div>
        <RoomPage
        Nickname={Nickname}
        />
    </div>)
}

export default Page;