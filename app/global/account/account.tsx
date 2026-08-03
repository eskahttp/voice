import Account from "@/app/global/components/leftbar";
import {TakeNickname} from "@/app/global/components/action/action";

async function AccountInfo() {
    const Nickname = await TakeNickname()

    return (
        <Account
            Nickname={Nickname}
        />
    );
}

export default AccountInfo;