'use client';

import { Room } from 'livekit-client';
import { useOnlineFriendsSocket } from "@/app/(home)/client/me/pageComponent/RightBarComponent/customHooksRightBar/useOnlineFriends";
import { useSocket } from "@/app/CustomHooks/socket";
import {Settings} from "lucide-react";
import {FaHeadphones, FaMicrophone} from "react-icons/fa";
import {PiMicrophoneSlashFill} from "react-icons/pi";
import {FiChevronDown} from "react-icons/fi";
import {useState} from "react";
import SettingsModal from "@/app/global/account/components/AccountComponent/SettingsModal";
import Image from "next/image";

interface Props {
    Nickname: string;
    Avatar: string;
    activeRoomId: string | null;
    activeRoomName: string | null;
    toggleMic: () => void;
    room: Room | null;
    micEnabled: boolean;
}

function AccountComponent({
                              Nickname,Avatar ,activeRoomId, activeRoomName,
                              toggleMic, room, micEnabled
                          }: Props) {

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const socket = useSocket();
    useOnlineFriendsSocket(socket);

    return (<div onContextMenu={(e) => e.preventDefault()} >
        <div
            className="w-full px-2 py-2"
        >
            <div className="flex items-center gap-1 px-1 py-1">
                <div className="flex items-center gap-2 flex-1 min-w-0 hover:bg-[#35373c] rounded-lg px-1 py-1 cursor-pointer">
                    <Image
                        src={Avatar ? Avatar : '/amomain1.png'}
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                        alt={'Avatar'}
                        priority
                    />
                    <div className="min-w-0">
                        <div className="text-sm text-white font-medium truncate">
                            {Nickname}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">
                            {activeRoomId ? `In ${activeRoomName}` : 'Online'}
                        </div>
                    </div>
                </div>

                <div
                    className={`flex items-center shrink-0 rounded-lg  ${
                        !micEnabled ? 'bg-[#f23f43]/20' : ''
                    }`}
                >
                    <button
                        onClick={toggleMic}
                        className={`w-8 h-8 rounded-l-lg flex items-center justify-center cursor-pointer
                            ${!room ? 'text-gray-600 cursor-pointer hover:bg-[#35373c]/50' : micEnabled ? 'text-gray-300 hover:bg-[#35373c]/50' : 'text-[#f23f43] hover:bg-[#f23f43]/15'}`}
                        title={micEnabled ? 'Turn off the microphone' : 'Turn on the microphone'}
                    >
                        {micEnabled
                            ? <FaMicrophone className="w-4 h-4 text-gray-200" />
                            : <PiMicrophoneSlashFill className="w-5 h-5 text-[#f23f43]" />}
                    </button>
                    <button
                        className={`w-5 h-8 rounded-r-lg flex items-center justify-center cursor-pointer
             ${
                            micEnabled
                                ? 'text-gray-400 hover:bg-[#35373c]/50'
                                : 'text-[#f23f43] hover:bg-[#f23f43]/15'
                        }`}
                    >
                        <FiChevronDown className={`w-3.5 h-3.5 ${micEnabled ? '' : 'text-[#f23f43]'}`} />
                    </button>
                </div>

                <div className="flex items-center shrink-0">
                    <button
                        disabled={!room}
                        className="w-8 h-8 rounded-l-lg hover:bg-[#35373c] text-gray-300 flex items-center justify-center transition cursor-pointer"
                    >
                        <FaHeadphones className="w-4 h-4" />
                    </button>
                    <button
                        className="w-4 h-8 rounded-r-lg hover:bg-[#35373c] text-gray-400 flex items-center justify-center text-[10px] cursor-pointer"
                    >
                        <FiChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>

                <button
                    onClick={() => setSettingsOpen(true)}
                    className="w-8 h-8 rounded-lg hover:bg-[#35373c] text-gray-300 flex items-center justify-center shrink-0 cursor-pointer"
                >
                    <Settings className="w-4 h-4" />
                </button>
            </div>
        </div>
        {settingsOpen && (<SettingsModal onClose={() => setSettingsOpen(false)}/>)}
    </div>);
}

export default AccountComponent;