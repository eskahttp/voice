interface Props {
    name: string
}

function ServerPage({name}: Props) {
    return (
        <div className="flex h-screen bg-[#1e1f22] text-gray-200">
            <aside className="w-64 bg-[#2b2d31] flex flex-col border-r border-black/20">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/30 shadow-sm">
                    <h2 className="font-semibold text-white flex items-center gap-1">
                        {name}
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
                    <div className="pt-4">
                        <div className="flex items-center justify-between px-2 py-1 text-xs uppercase text-gray-400 hover:text-gray-200 cursor-pointer">
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Текстовые каналы
                            </span>
                            <button className="hover:text-white">+</button>
                        </div>

                        <button className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-white/10 text-white mt-1 group">
                            <span className="flex items-center gap-2">
                                <span className="text-gray-400">#</span>
                                общее
                            </span>
                            <span className="flex items-center gap-1 opacity-70">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center justify-between px-2 py-1 text-xs uppercase text-gray-400 hover:text-gray-200 cursor-pointer">
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Голосовые каналы
                            </span>
                            <button className="hover:text-white">+</button>
                        </div>

                        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-gray-400 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                            Лобби
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col bg-[#313338]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/30 shadow-sm">
                    <div className="flex items-center gap-2 text-white font-semibold">
                        <span className="text-gray-400">#</span>
                        общее
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">

                </div>

                <div className="px-4 pb-6 pt-2">
                    <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 gap-3">
                        <input
                            type="text"
                            placeholder="Написать #общее"
                            className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ServerPage;