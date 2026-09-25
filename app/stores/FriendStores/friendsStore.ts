import { create } from 'zustand';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
}

interface FriendsStore{
    allFriends: ArrFriend[];
    setFriends: (friends: ArrFriend[]) => void;
    addFriends: (friends: ArrFriend[]) => void;
}

export const useFriendsStore = create<FriendsStore>((set) => ({
    allFriends: [],
    setFriends: (friends) => set({ allFriends: friends }),
    addFriends: (friends) => set(state => ({ allFriends: [...state.allFriends, ...friends] })),
}));