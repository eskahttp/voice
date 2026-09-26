'use client';

import React, { useState } from 'react';
import {AddFriendAction} from "@/app/(home)/client/me/pageComponent/RightBarComponent/AddFriendAction/AddFriendAction";
import {useSocket} from "@/app/CustomHooks/socket";

type ColorInput = 'red' | 'green' | 'none'

interface ActionReq{
    message: string
    color: ColorInput
    checkIt: boolean
}

const AddFriend: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [AddFriendState, setAddFriendState] = useState<ActionReq>({message: '', color: 'none', checkIt: false})

    const socket = useSocket();

    const handleSubmit : (formData: FormData) => Promise<void> = async (formData: FormData) : Promise<void> => {
        const MesAndColor = await AddFriendAction(formData) as ActionReq;
        setAddFriendState(MesAndColor);
        setUsername('');

        if (MesAndColor.checkIt) {
            if (!socket) return setUsername('');
            socket.emit('sendFriendRequest', username);
            setUsername('');
        }
    };

    const isActive = username.trim().length > 0;

    const getBorderClass = () => {
        if (AddFriendState.color === 'green') return 'border-green-500 focus-within:border-green-500';
        if (AddFriendState.color === 'red') return 'border-red-500 focus-within:border-red-500';

        return 'border-transparent focus-within:border-indigo-500';
    };

    const getMessageColor = () => {
        if (AddFriendState.color === 'green') return 'text-green-500';
        if (AddFriendState.color === 'red') return 'text-red-500';
    };

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-6xl">
                <div className="pb-5 border-b border-zinc-800">
                    <h2 className="text-white text-xl font-bold mb-2">Add Friend</h2>
                    <p className="text-zinc-400 text-sm">
                        You can add friends with their DianaVoice login.
                    </p>
                </div>

                <form action={handleSubmit} className="mt-6">
                    <div className={`flex items-center bg-[#1e1f22] rounded-lg p-1.5 border transition-colors ${getBorderClass()}`}>
                        <input
                            type="text"
                            value={username}
                            name='FriendLogin'
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (AddFriendState.color !== 'none') {
                                    setAddFriendState({message: '', color: 'none', checkIt: false});
                                }
                            }}
                            placeholder="Enter a username"
                            className='flex-1 min-w-0 bg-transparent outline-none text-zinc-200 px-3 py-2.5 text-base'
                        />
                        <button
                            type="submit"
                            disabled={!isActive}
                            className={`shrink-0 px-4 py-2.5 rounded-md text-sm font-medium text-white whitespace-nowrap transition-colors ${
                                isActive
                                    ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                                    : 'bg-indigo-600/60 opacity-70 cursor-not-allowed'
                            }`}
                        >
                            Send Friend Request
                        </button>
                    </div>
                </form>
                {AddFriendState.message && <p className={`mt-2 text-sm ${getMessageColor()}`}>{AddFriendState.message}</p>}
            </div>
        </div>
    );
};

export default AddFriend;