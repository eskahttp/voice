import { create } from 'zustand';

interface ArrFriend {
    id: number;
    nickname: string;
    login: string;
    avatar_url: string;
}

interface FriendsStore{
    allFriends: ArrFriend[];
    setFriends: (friends: ArrFriend[]) => void;
    addFriend: (friend: ArrFriend) => void;
    removeFriend: (friendId: number) => void;
}

export const useFriendsStore = create<FriendsStore>((set) => ({
    allFriends: [],
    setFriends: (friends: ArrFriend[]) => set({ allFriends: friends }),
    addFriend: (friend: ArrFriend) =>
        set((state) => {
            if (state.allFriends.some((f) => f.id === friend.id)) {
                return state;
            }
            return { allFriends: [...state.allFriends, friend] };
        }),
    removeFriend: (friendId: number) => set(state => ({ allFriends: state.allFriends.filter(friend => friend.id !== friendId) }))
}));