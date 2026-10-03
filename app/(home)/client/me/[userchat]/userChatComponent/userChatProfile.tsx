import {JSX} from "react";
import {MoreHorizontal, Users} from "lucide-react";

interface Props {}

export const UserChatProfile = ({}: Props) : JSX.Element => {
    return (<div className="flex w-80 shrink-0 flex-col border-l border-neutral-900 bg-[#0b0b0d]">
        <div className="relative h-24 shrink-0 bg-black/70">
            <div className="absolute right-3 top-3 flex items-center gap-2">
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">
                    <Users className="h-4 w-4" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </div>
        </div>

        <div className="relative px-4">
            <div className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-indigo-700 text-2xl font-semibold text-white">
                FL
            </div>
        </div>

        <div className="mt-12 flex-1 overflow-y-auto px-4">
            <h2 className="text-xl font-bold text-white">Horkey</h2>
            <p className="text-sm text-gray-400">Horkey</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[9px] font-semibold text-white">
                    СЕ
                </div>
                <span>1 Mutual Server</span>
            </div>

            <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white">
                    Member Since
                </h3>
                <p className="mt-1 text-sm text-gray-400">Jul 9, 2025</p>
            </div>
        </div>

        <div className="shrink-0 p-3">
            <button className="w-full rounded-md border border-neutral-700 bg-neutral-900 py-2 text-sm text-gray-200 hover:bg-neutral-800">
                View Full Profile
            </button>
        </div>
    </div>)
}