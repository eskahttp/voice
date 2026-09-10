'use client';

import React, {useActionState, useState} from 'react';
import {AddFriendAction} from "@/app/(home)/client/pageComponent/RightBarComponent/AddFriendAction/AddFriendAction";
import {useSocket} from "@/app/CustomHooks/socket";

type ColorInputt = 'red' | 'green' | 'none'

const AddFriend: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [active, setActive] = useState<ColorInputt>('none'); // Set the color based on the text.
    const [AddFriendState, formAddFriend] = useActionState(AddFriendAction, {message: ''})

    const socket = useSocket();

    const handleSubmit : () => void = () => {
        if (!socket) return setUsername('');
        socket.emit('sendFriendRequest', username);
        setUsername('');
    };

    const border = ()=> {
        return 'border-red-500'
    }

    const isActive = username.trim().length > 0;

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-6xl">
                <div className="pb-5 border-b border-zinc-800">
                    <h2 className="text-white text-xl font-bold mb-2">Add Friend</h2>
                    <p className="text-zinc-400 text-sm">
                        You can add friends with their DianaVoice login.
                    </p>
                </div>

                <form action={formAddFriend} onSubmit={handleSubmit} className="mt-6">
                    <div className='flex items-center bg-[#1e1f22] rounded-lg p-1.5 border border-transparent focus-within:border-indigo-500 transition-colors'>
                        <input
                            type="text"
                            value={username}
                            name='FriendLogin'
                            onChange={(e) => setUsername(e.target.value)}
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
                <p className="text-green-500">{AddFriendState.message}</p>
            </div>
        </div>
    );
};

export default AddFriend;