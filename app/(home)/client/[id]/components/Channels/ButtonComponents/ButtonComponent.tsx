import {Participant} from "livekit-client";
import {PiMicrophoneSlashFill} from "react-icons/pi";
import {MdVolumeUp} from "react-icons/md";

interface Props {
    onClick?: () => void;
    active?: boolean;
    name: string;
    participants: Participant[];
    isMicOn: (p: Participant)=> boolean;
}

function ButtonComponent({onClick,active,name,participants,isMicOn}: Props){
    return (<div>
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mt-1 ${
                active
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-gray-400'
            }`}
        >
            <MdVolumeUp className={'w-6 h-6'} />
            {name}
        </button>

        {active && participants.length > 0 && (
            <ul className="ml-6 mt-0.5 space-y-0.5">
                {participants.map((p) => {
                    return (
                    <li
                        key={p.identity}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-gray-300"
                    >
                        <div
                            className={`w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white font-semibold ring-2 transition ${
                                p.isSpeaking
                                    ? 'ring-green-500'
                                    : 'ring-transparent'
                            }`}
                        >
                            {(p.name || p.identity)[0]?.toUpperCase()}
                        </div>
                        <span className="truncate flex-1">
                                {p.name || p.identity}
                            </span>
                        {!isMicOn(p) && <span> <PiMicrophoneSlashFill/> </span>}
                    </li>
                )})}
            </ul>
        )}
    </div>)
}

export default ButtonComponent;