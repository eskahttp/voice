import LeftBarTSX from "@/app/(home)/client/me/pageComponent/LeftBarComponent/LeftBarTSX";

function LeftBarClient(){
    return (
        <div className="w-72 bg-[#0b0b0d] flex flex-col border-r border-[#232428] h-screen">
            <LeftBarTSX>
                <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#26272b] cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-lg shrink-0">
                        🌙
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-200 truncate">Sciamachy</div>
                        <div className="text-xs text-gray-400 truncate">you are my special</div>
                    </div>
                </div>
            </LeftBarTSX>
        </div>
    )
}

export default LeftBarClient;