import {create} from "zustand";

interface userChats {
    conversation_id: number;
    user_id: number;
    nickname : string;
    login : string;
    avatar_url : string;
}

interface userChatsStore {
    allUserChats: userChats[];
    setAllUserChats: (chats : userChats[]) => void;
    addUserChats: (chats : userChats)=> void;
}

export const useUserChatsStore = create<userChatsStore>((set)=> ({
    allUserChats: [],
    setAllUserChats:(chats ) => set({allUserChats: chats}),
    addUserChats: (chat) =>
        set((state) => ({
            allUserChats: state.allUserChats.some((c) => c.conversation_id === chat.conversation_id)
                ? state.allUserChats
                : [...state.allUserChats, chat],
        }))
}))