import { useEffect } from "react";
import { useMyAccountStore } from "@/app/stores/MyAccountStores/myAccountStore";

export function useSetMyInfoOnStore(
    userLogin: string,
    userNickname: string,
    userEmail: string
) {
    const setLogin = useMyAccountStore((state) => state.setLogin);
    const setNickname = useMyAccountStore((state) => state.setNickname);
    const setEmail = useMyAccountStore((state) => state.setEmail);

    useEffect(() => {
        setLogin(userLogin);
        setNickname(userNickname);
        setEmail(userEmail);
    }, [userLogin, userNickname, userEmail, setLogin, setNickname, setEmail]);
}