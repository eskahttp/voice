import { create } from "zustand";

interface selectedProfile {
    userId: number
    setUserId: (userId: number) => void
    clear: () => void;
}

export const useSelectedProfileStore = create<selectedProfile>((set) => ({
    userId: 0,
    setUserId: (userId: number) => set({ userId }),
    clear: () => set({ userId: 0 }),
}))