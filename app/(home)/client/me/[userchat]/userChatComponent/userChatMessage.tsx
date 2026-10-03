import {JSX} from "react";

interface Props {}

export const UserChatMessage = ({}: Props) : JSX.Element => {
    return (<div className="flex flex-1 flex-col min-w-0">
        <div className="flex flex-1 flex-col justify-end overflow-y-auto px-6 pb-4 min-h-0">
            <div className="pt-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-700 text-3xl font-semibold text-white">
                    FL
                </div>
                <h1 className="mt-4 text-3xl font-bold text-white">Horkey</h1>
                <p className="text-lg text-gray-300">Horkey</p>
                <p className="mt-4 text-sm text-gray-400">
                    This is the beginning of your direct message history with{" "}
                    <span className="font-semibold text-white">Horkey</span>.
                </p>

                <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[9px] font-semibold text-white">
                            СЕ
                        </div>
                        <span>1 Mutual Server</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <button className="rounded-md bg-neutral-800 px-3 py-1 text-xs text-gray-200 hover:bg-neutral-700">
                        Remove Friend
                    </button>
                </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
                <div className="h-px flex-1 bg-neutral-800" />
                <span className="text-xs text-gray-500">July 26, 2025</span>
                <div className="h-px flex-1 bg-neutral-800" />
            </div>

            <div className="mt-4 flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-700 text-sm font-semibold text-white">
                    СП
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-white">
                    konkon
                  </span>
                        <span className="text-xs text-gray-500">
                    7/26/25, 1:57 AM
                  </span>
                    </div>
                    <p className="text-sm text-gray-200">Hey!</p>
                </div>
            </div>
        </div>

        <div className="shrink-0 px-4 pb-6">
            <div className="flex items-center gap-3 rounded-lg bg-neutral-900 px-4 py-3">
                <input
                    type="text"
                    placeholder="Message @Horkey"
                    className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
                />
            </div>
        </div>
    </div>)
}