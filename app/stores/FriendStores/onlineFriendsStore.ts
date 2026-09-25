import { create } from 'zustand';


interface OnlineFriendsState {
    onlineIds: Set<number>;
    AllFriendIds: Set<number>;
    setIdFriends: (ids: number[]) => void;
    addIdFriend: (id: number) => void;
    addOnline: (id: number) => void;
    removeOnline: (id: number) => void;
    setOnline: (ids: number[]) => void;
}

export const useOnlineFriendsIdStore = create<OnlineFriendsState>((set, get) => ({
    onlineIds: new Set<number>(),

    AllFriendIds: new Set<number>(),
    setIdFriends: (ids) => set({ AllFriendIds: new Set(ids) }),
    addIdFriend: (id) =>
        set((state) => {
            if (state.AllFriendIds.has(id)) return state;
            const next = new Set(state.AllFriendIds);
            next.add(id);
            return { AllFriendIds: next };
        }),

    addOnline: (id) =>
        set((state) => {
            if (state.onlineIds.has(id)) return state;
            const next = new Set(state.onlineIds);
            next.add(id);
            return { onlineIds: next };
        }),

    removeOnline: (id) =>
        set((state) => {
            if (!state.onlineIds.has(id)) return state;
            const next = new Set(state.onlineIds);
            next.delete(id);
            return { onlineIds: next };
        }),

    setOnline: (ids) => set({ onlineIds: new Set(ids) }),
}));