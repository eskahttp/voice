import { useEffect } from "react";
import { useMyAccountStore } from "@/app/stores/MyAccountStores/myAccountStore";

export function useSetMyInfoOnStore(
    userLogin: string,
    userNickname: string,
    userEmail: string,
    userAvatarUrl:string
) {
    const setLogin = useMyAccountStore((state) => state.setLogin);
    const setNickname = useMyAccountStore((state) => state.setNickname);
    const setEmail = useMyAccountStore((state) => state.setEmail);
    const setAvatarUrl = useMyAccountStore((state) => state.setAvatarUrl);

    useEffect(() => {
        setLogin(userLogin);
        setNickname(userNickname);
        setEmail(userEmail);
        setAvatarUrl(userAvatarUrl);
    }, [userLogin, userNickname, userEmail, userAvatarUrl, setLogin, setNickname, setEmail, setAvatarUrl]);
}