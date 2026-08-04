import Account from "./components/accounthtml";
import {TakeNickname} from "./components/action/action";

async function AccountInfo() {
    const Nickname = await TakeNickname()

    return (
        <Account
            Nickname={Nickname}
        />
    );
}

export default AccountInfo;