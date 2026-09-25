import { create } from 'zustand';


interface OnlineFriendsState {
    onlineIds: Set<number>;
    addOnline: (id: number) => void;
    removeOnline: (id: number) => void;
    setOnline: (ids: number[]) => void;
}

export const useOnlineServersUserStore = create<OnlineFriendsState>((set, get) => ({
    onlineIds: new Set<number>(),

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