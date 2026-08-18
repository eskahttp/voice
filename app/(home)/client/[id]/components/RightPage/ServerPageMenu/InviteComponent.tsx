import { useState } from "react";


type Props = {
    serverName: string;
    inviteLink: string;
    onClose: () => void;
};

export default function InviteModal({
                                        serverName,
                                        inviteLink,
                                        onClose,
                                    }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[440px] max-h-[90vh] flex flex-col rounded-md bg-[#1e1f22] text-white shadow-2xl">
                <div className="flex items-start justify-between p-4 pb-2">
                    <div>
                        <h2 className="text-lg font-bold">
                            Invite friends to {serverName}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Recipients will land in{" "}
                            <span className="text-gray-300">#Main</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition cursor-pointer"
                    >
                        ✖
                    </button>
                </div>

                <div className="px-4 pb-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none"> 🔍 </span>
                            <input
                            type="text"
                            placeholder="Search for friends"
                            className="w-full bg-[#111214] border border-black/40 rounded-md py-2 pl-9 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                            />
                    </div>
                </div>

                <div className="border-t border-black/40 bg-[#2b2d31] p-4 rounded-b-md">
                    <p className="text-sm font-semibold mb-2">
                        Or, send a server invite link to a friend
                    </p>
                    <div className="flex items-center bg-[#1e1f22] rounded-md p-1">
                        <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={() => {}}
                            className="flex-1 bg-transparent px-3 py-1.5 text-sm text-white outline-none cursor-text select-all"
                        />
                        <button
                            onClick={handleCopy}
                            className={`px-5 py-1.5 text-sm font-medium rounded transition cursor-pointer ${
                                copied
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                        >
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}