import { create } from 'zustand';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}
interface PendingStore {
    AllPending: ArrFriend[];
    setAllPending: (pending: ArrFriend[]) => void;
    addPending: (friend: ArrFriend) => void;
    removePending: (id: number) => void;
}

export const usePendingStore = create<PendingStore>((set) => ({
    AllPending: [],
    setAllPending: (pending) => set({ AllPending: pending }),
    addPending: (friend) =>
        set((state) => ({ AllPending: [...state.AllPending, friend] })),
    removePending: (id) =>
        set((state) => ({
            AllPending: state.AllPending.filter((f) => f.id !== id),
        })),
}));