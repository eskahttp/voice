export default function DiscordHome() {
    return (
        <div className="flex flex-col h-screen w-screen bg-[#1e1f22] text-gray-300 overflow-hidden">
            <div className="h-8 bg-[#1e1f22] flex items-center justify-between px-3 text-xs text-gray-400 select-none">
                <div className="flex items-center gap-1">
                    <span className={'flex justify-center w-screen'} >👥 Друзья</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hover:text-white">📥</button>
                    <button className="hover:text-white">❓</button>
                    <button className="hover:text-white">—</button>
                    <button className="hover:text-white">▢</button>
                    <button className="hover:text-white">✕</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">

                <div className="w-60 bg-[#2b2d31] flex flex-col">
                    <div className="p-2 shadow-md">
                        <button className="w-full h-8 bg-[#1e1f22] rounded text-sm text-gray-300 hover:text-white px-2 text-center">
                            Найти или начать беседу
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 py-2">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-3 px-2 py-1.5 rounded bg-[#404249] text-white cursor-pointer">
                                <span>👥</span>
                                <span className="text-sm font-medium">Друзья</span>
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Личные сообщения
                </span>
                                <button className="text-gray-400 hover:text-gray-200 text-lg leading-none">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#232428] px-2 py-2 flex flex-col gap-2">
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#313338]">

                    <div className="h-12 border-b border-black/20 flex items-center justify-between px-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white">
                                <span>👥</span>
                                <span className="font-semibold">Друзья</span>
                            </div>
                            <div className="w-px h-6 bg-gray-600" />
                            <div className="flex items-center gap-4 text-sm">
                                <button className="px-2 py-0.5 rounded bg-[#4e5058] text-white font-medium">
                                    В сети
                                </button>
                                <button className="text-gray-300 hover:text-white font-medium">
                                    Все
                                </button>
                            </div>
                            <button className="px-3 py-1 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium">
                                Добавить в друзья
                            </button>
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
                                placeholder="Поиск"
                                className="w-full bg-[#1e1f22] text-sm text-gray-200 placeholder-gray-500 rounded px-9 py-2 outline-none"
                            />
                        </div>

                        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-3">
                            В сети — 0
                        </div>

                        <div className="border-t border-gray-700/50" />
                    </div>
                </div>
            </div>
        </div>
    );
}