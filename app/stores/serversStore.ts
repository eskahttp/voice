import {create} from "zustand";

interface ServersArr {
    id: number;
    name: string;
}

interface ServersStore {
    AllServers: ServersArr[];
    setAllServers: (servers: ServersArr[]) => void;
    addServer: (server: ServersArr) => void;
    removeServer: (id: number) => void;
}

export const useServersStore = create<ServersStore>((set) => ({
    AllServers: [],
    setAllServers: (servers) => set({ AllServers: servers }),
    addServer: (servers) =>
        set((state) => ({ AllServers: [...state.AllServers, servers] })),
    removeServer: (id) =>
        set((state) => ({
            AllServers: state.AllServers.filter((f) => f.id !== id),
        })),
}));