'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from "@/app/CustomHooks/socket";

interface ServerModalProps {
    serverName: string;
    ServerId: string;
}

function ServerModal({ serverName, ServerId }: ServerModalProps) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const socket = useSocket();

    const handleClose = () => {
        setIsOpen(false);
        router.back();
    };

    const handleJoin = async () => {
        if (!socket) return;
        socket.emit('userJoinedServer', ServerId);

        router.refresh();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-6">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Закрыть"
                >
                    ✖
                </button>

                <div className="mb-6">
                    <p className="text-sm text-neutral-400 mb-1">Join the server</p>
                    <h2 className="text-2xl font-bold text-white truncate">{serverName}</h2>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4 mb-6 border border-neutral-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                            {serverName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{serverName}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleJoin}
                    className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/20"
                >
                    Join
                </button>
            </div>
        </div>
    );
}

export default ServerModal;