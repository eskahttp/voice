import React from "react";
import Image from "next/image";

interface Users {
    id: number;
    login: string;
    nickname: string;
    avatar_url: string;
}

interface Props {
    userList: Users[];
    onlineIds: Set<number>;
}

function UserServer({ userList, onlineIds }: Props) {
    const onlineUsers = userList.filter(u => onlineIds.has(Number(u.id)));
    const offlineUsers = userList.filter(u => !onlineIds.has(Number(u.id)));

    const renderUser = (u: Users, isOnline: boolean) => (
        <div
            key={u.id}
            className={`flex items-center gap-3 rounded p-1 hover:bg-[#35373c] ${!isOnline ? 'opacity-50' : ''}`}
        >
            <div className="relative">
                <Image
                    width={47}
                    height={47}
                    src={u.avatar_url}
                    alt={'Photo'}
                    className="h-9 w-9 overflow-hidden rounded-full"/>
                {isOnline &&<div
                    className={'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] bg-green-500'}
                />}
            </div>
            <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white">{u.nickname}</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-4">
            {onlineUsers.length > 0 && (
                <div>
                    <p className="mb-2 text-sm font-normal text-gray-300">
                        Online — {onlineUsers.length}
                    </p>
                    <div className="flex flex-col">
                        {onlineUsers.map(u => renderUser(u, true))}
                    </div>
                </div>
            )}

            {offlineUsers.length > 0 && (
                <div>
                    <p className="mb-2 text-sm font-normal text-gray-300">
                        Offline — {offlineUsers.length}
                    </p>
                    <div className="flex flex-col">
                        {offlineUsers.map(u => renderUser(u, false))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserServer;