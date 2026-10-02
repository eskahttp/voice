import { create } from "zustand";

interface selectedProfile {
    userId: number
    setUserId: (userId: number) => void
}

export const useSelectedProfileStore = create<selectedProfile>((set) => ({
    userId: 0,
    setUserId: (userId: number) => set({ userId }),
}))