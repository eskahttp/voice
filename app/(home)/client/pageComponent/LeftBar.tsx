interface Props {}

function LeftBarClient({}: Props){
    return (<div className="w-72 bg-[#0b0b0d] flex flex-col border-r border-[#232428]">
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
                </div>
            </div>
        </div>
    </div>)
}

export default LeftBarClient;