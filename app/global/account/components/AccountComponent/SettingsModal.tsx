import React, {ReactNode, useState} from "react";
import {
    User,
    Image as ImageIcon,
    Mic,
    LogOut,
    X,
} from "lucide-react";
import AccountSection from "@/app/global/account/components/SettingsComponents/AccountSection";
import AvatarSection from "@/app/global/account/components/SettingsComponents/AvatarSection";
import VoiceSection from "@/app/global/account/components/SettingsComponents/VoiceSection";

type TabKey = "account" | "avatar" | "voice" | "logout";

interface SettingsModalProps {
    open: boolean;
    onClose: () => void;
}

const TABS: { key: TabKey; label: string; icon: ReactNode }[] = [
    { key: "account", label: "Account", icon: <User size={18} /> },
    { key: "avatar", label: "Avatar", icon: <ImageIcon size={18} /> },
    { key: "voice", label: "Voice & Video", icon: <Mic size={18} /> },
    { key: "logout", label: "Log Out", icon: <LogOut size={18} /> },
];

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
    const [active, setActive] = useState<TabKey>("account");

    if (!open) return null;

    const renderContent = () => {
        switch (active) {
            case "account":
                return <AccountSection />;
            case "avatar":
                return <AvatarSection />;
            case "voice":
                return <VoiceSection />;
            case "logout":
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <LogOut size={48} className="text-red-500 mb-4" />
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Log out of your account?
                        </h2>
                        <p className="text-[#b5bac1] mb-6">
                            You will need to sign in again to access your account.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setActive("account")}
                                className="px-5 py-2 rounded-md bg-transparent hover:underline text-white transition"
                            >
                                Cancel
                            </button>
                            <button className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition">
                                Log Out
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 animate-[fadeIn_0.15s_ease-out]"
            onClick={onClose}
        >
            <div
                className="flex w-[min(1100px,96vw)] h-[min(720px,92vh)] bg-[#1e1f22] rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sidebar */}
                <aside className="w-[232px] bg-[#2b2d31] pt-14 pb-5 pl-5 pr-2 flex flex-col gap-1 overflow-y-auto">
                    <div className="text-[12px] font-bold uppercase text-[#80848e] px-2.5 py-1.5 mb-1 tracking-wider">
                        User Settings
                    </div>
                    <nav className="flex flex-col gap-0.5">
                        {TABS.map((tab) => {
                            const isActive = active === tab.key;
                            const isDanger = tab.key === "logout";
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActive(tab.key)}
                                    className={[
                                        "flex items-center gap-2.5 px-2.5 py-2 rounded text-sm font-medium transition-colors text-left",
                                        isDanger
                                            ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                            : isActive
                                                ? "bg-[#404249] text-white"
                                                : "text-[#b5bac1] hover:bg-[#35373c] hover:text-white",
                                    ].join(" ")}
                                >
                                    <span className="opacity-90">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <section className="flex-1 bg-[#313338] relative overflow-hidden">
                    <div className="h-full overflow-y-auto px-10 py-14 max-w-[740px]">
                        {renderContent()}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-14 right-8 flex flex-col items-center text-[#b5bac1] hover:text-white transition"
                        aria-label="Close"
                    >
            <span className="w-9 h-9 rounded-full border-2 border-[#b5bac1] hover:border-white flex items-center justify-center transition">
              <X size={20} />
            </span>
                        <span className="text-[13px] font-semibold mt-1">ESC</span>
                    </button>
                </section>
            </div>
        </div>
    );
}