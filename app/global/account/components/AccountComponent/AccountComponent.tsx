import { Room } from 'livekit-client';

interface Props {
    Nickname: string,
    activeRoomId: string | null,
    activeRoomName: string | null,
    toggleMic: () => void,
    room: Room | null,
    micEnabled: boolean,
}

function AccountComponent({
                              Nickname, activeRoomId, activeRoomName,
                              toggleMic, room, micEnabled
                          }: Props) {
    return (
        // 👇 ВОТ ЗДЕСЬ регулируй позицию и размер:
        // left-4    - отступ слева
        // bottom-4  - отступ снизу
        // w-72      - ШИРИНА окошка (меняй под себя: w-64, w-80, w-96 или w-[300px])
        <div className="fixed bottom-2 left-2 w-86 z-50">
            <div className="flex items-center gap-1 px-2 py-2 bg-[#121212] rounded-xl shadow-lg border border-gray-500">
                <div className="flex items-center gap-2 flex-1 min-w-0 hover:bg-[#35373c] rounded-xl px-1 py-1 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {Nickname[0]?.toUpperCase() || 'С'}
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs text-white font-medium truncate">
                            {Nickname}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                            {activeRoomId ? `In ${activeRoomName}` : 'Online'}
                        </div>
                    </div>
                </div>

                <button
                    onClick={toggleMic}
                    className={`w-8 h-8 rounded-lg hover:bg-[#35373c] flex items-center justify-center transition shrink-0 ${
                        !room ? 'text-gray-600 cursor-pointer' :
                            micEnabled ? 'text-gray-300' : 'text-red-400'
                    }`}
                    title={micEnabled ? 'Turn off the microphone' : 'Turn on the microphone'}
                >
                    {micEnabled ? '🎤' : '🔇'}
                </button>

                <button
                    disabled={!room}
                    className="w-8 h-8 rounded-lg hover:bg-[#35373c] flex items-center justify-center transition shrink-0"
                >
                    🎧
                </button>

                <button
                    className="w-8 h-8 rounded-lg hover:bg-[#35373c] text-gray-300 flex items-center justify-center shrink-0"
                    title="Настройки"
                >
                    ⚙
                </button>
            </div>
        </div>
    );
}

export default AccountComponent;