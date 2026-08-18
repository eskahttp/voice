export default function DiscordHome() {
    return (
        <div className="flex flex-col h-screen w-screen bg-[#1e1f22] text-gray-300 overflow-hidden">
            <div className="h-8 bg-[#0b0b0d] border-b border-[#232428] flex items-center justify-between px-3 text-xs text-gray-400 select-none">
                <div className="flex items-center gap-1">
                    <span className="flex justify-center w-screen">👥 Friends</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden border-l border-[#232428] ">
                <div className="w-72 bg-[#0b0b0d] flex flex-col border-r border-[#232428]">
                    <div className="h-12 flex items-center px-2 border-b border-[#232428] shrink-0">
                        <button className="w-full h-8 bg-[#1e1f22] rounded text-sm text-gray-300 hover:text-white px-2 text-center">
                            Find or start a conversation
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 py-2">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded bg-[#26272b] text-white cursor-pointer">
                                <span>👥</span>
                                <span className="text-sm font-medium">Friends</span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-center justify-between px-2 mb-1">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                    Private messages
                                </span>
                                <button className="text-gray-400 hover:text-gray-200 text-lg leading-none cursor-pointer">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#0d0d0f]">
                    <div className="h-12 border-b border-[#232428] flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white">
                                <span>👥</span>
                                <span className="font-semibold">Friends</span>
                            </div>
                            <div className="w-px h-6 bg-[#232428]" />
                            <div className="flex items-center gap-4 text-sm">
                                <button className="px-2 py-0.5 rounded bg-[#4e5058] text-white font-medium">
                                    Online
                                </button>
                                <button className="text-gray-300 hover:text-white font-medium">
                                    All
                                </button>
                                <button className="px-3 py-1 rounded bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-[inset_0_10px_15px_-5px_rgba(0,0,0,0.25),inset_0_-10px_15px_-5px_rgba(0,0,0,0.25)] text-white text-sm font-medium cursor-pointer transition-all duration-350">
                                    Add friend
                                </button>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-200 text-lg">
                            💬
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 py-4">
                        <div className="relative mb-6">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#0d0d0f] text-sm text-gray-200 placeholder-gray-500
                                    border border-[#232428] rounded-lg pl-9 pr-3 py-2.5
                                    outline-none focus:border-[#3a3b40] transition"
                            />
                        </div>

                        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-3">
                            Online — 0
                        </div>

                        <div className="border-t border-[#232428]" />
                    </div>
                </div>
            </div>
        </div>
    );
}