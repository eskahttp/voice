import {ImConnection, ImPhoneHangUp} from "react-icons/im";
import {PiVideoCameraFill} from "react-icons/pi";
import {LuMonitorUp} from "react-icons/lu";

interface Props {
    ActiveRoomId: string | null
    ActiveRoomName: string | null
    AccountInfo: React.ReactNode
    leaveRoom: ()=> void
}

export function AccountUpperInfo({ActiveRoomId, ActiveRoomName, leaveRoom, AccountInfo}: Props){
    return (
        <div className="fixed bottom-0 w-[364px] flex flex-col z-50 p-2">
            <div className="bg-[#0b0b0d] border border-gray-700/80 rounded-xl shadow-lg overflow-hidden">
        {ActiveRoomId && (
            <>
                <div className="px-3 pt-2 pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                <span className="text-green-400 text-base leading-none">
                  <ImConnection />
                </span>
                            <div className="flex flex-col min-w-0">
                                <div className="text-sm text-green-400 font-semibold truncate">
                                    Voice Connected
                                </div>
                                <div className="text-[11px] text-gray-400 truncate">
                                    {ActiveRoomName ?? `Канал #${ActiveRoomId}`}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                            <button
                                onClick={leaveRoom}
                                className="w-7 h-7 rounded hover:bg-[#35373c]/50 text-gray-200 flex items-center justify-center cursor-pointer"
                            >
                                <ImPhoneHangUp />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                            className="h-9 rounded-lg bg-[#2b2d37] hover:bg-[#35373c]/50 text-gray-300 flex items-center justify-center transition"
                        >
                            <PiVideoCameraFill />
                        </button>
                        <button
                            className="h-9 rounded-lg bg-[#2b2d37] hover:bg-[#35373c]/50 text-gray-300 flex items-center justify-center transition"
                        >
                            <LuMonitorUp />
                        </button>
                    </div>
                </div>

                <div className="h-px bg-gray-700/60 mx-3" />
            </>
        )}
                {AccountInfo}
</div>
</div>
    )
}