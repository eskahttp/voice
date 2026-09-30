import { create } from "zustand";

interface MyAccountStore {
    login: string;
    nickname: string;
    email: string;
}

interface MyAccountStore {
    login: string;
    setLogin: (username: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    email: string;
    setEmail: (email: string) => void;
    avatar_url: string;
    setAvatarUrl: (avatar_url: string) => void;
}

export const useMyAccountStore = create<MyAccountStore>((set) => ({
    login: "",
    setLogin: (login: string) => set({ login }),
    nickname: "",
    setNickname: (nickname: string) => set({ nickname }),
    email: "",
    setEmail: (email: string) => set({ email }),
    avatar_url: "",
    setAvatarUrl: (avatar_url: string) => set({ avatar_url }),
}));