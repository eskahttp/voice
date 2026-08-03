import {JSX} from "react";

interface Props {
    Nickname: string;
}

function Account({ Nickname }: Props): JSX.Element {
    return (
        <div className="fixed bottom-0 left-[72px] w-[240px] bg-[#232428] flex items-center gap-1 px-2 py-2 z-50">
            <div className="flex items-center gap-2 flex-1 min-w-0 hover:bg-[#35373c] rounded px-1 py-1 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold">
                    С
                </div>
                <div className="min-w-0">
                    <div className="text-xs text-white font-medium truncate">
                        {Nickname}
                    </div>
                    <div className="text-[11px] text-gray-400 truncate">
                        В сети
                    </div>
                </div>
            </div>
            <button className="w-8 h-8 rounded hover:bg-[#35373c] text-gray-300 flex items-center justify-center">
                🎤
            </button>
            <button className="w-8 h-8 rounded hover:bg-[#35373c] text-gray-300 flex items-center justify-center">
                🎧
            </button>
            <button className="w-8 h-8 rounded hover:bg-[#35373c] text-gray-300 flex items-center justify-center">
                ⚙
            </button>
        </div>
    );
}

export default Account;