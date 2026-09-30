import React, { ReactNode, useState } from "react";
import {User, Image as ImageIcon, Mic, LogOut, X,} from "lucide-react";
import AccountSection from "@/app/global/account/components/SettingsComponents/AccountSection";
import AvatarSection from "@/app/global/account/components/SettingsComponents/AvatarSection";
import VoiceSection from "@/app/global/account/components/SettingsComponents/VoiceSection";
import {LogoutSection} from "@/app/global/account/components/SettingsComponents/LogoutSection";

type TabKey = "account" | "avatar" | "voice" | "logout";

interface SettingsModalProps {
    onClose: () => void;
}

const TABS: { key: TabKey; label: string; icon: ReactNode }[] = [
    { key: "account", label: "Account", icon: <User size={18} /> },
    { key: "avatar", label: "Avatar", icon: <ImageIcon size={18} /> },
    { key: "voice", label: "Voice & Video", icon: <Mic size={18} /> },
    { key: "logout", label: "Log Out", icon: <LogOut size={18} /> },
];

const TAB_TITLES: Record<TabKey, string> = {
    account: "Account",
    avatar: "Avatar",
    voice: "Voice & Video",
    logout: "Log Out",
};

export default function SettingsModal({ onClose }: SettingsModalProps) {
    const [active, setActive] = useState<TabKey>("account");

    const renderContent = () => {
        switch (active) {
            case "account":
                return <AccountSection />;
            case "avatar":
                return <AvatarSection />;
            case "voice":
                return <VoiceSection />;
            case "logout":
                return <LogoutSection/>
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

                <aside className="w-[232px] bg-[#050506] pt-14 pb-5 pl-5 pr-2 flex flex-col gap-1 overflow-y-auto shrink-0 border-r border-[#3f4147]">
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
                                        "flex items-center gap-2.5 px-2.5 py-2 rounded text-sm font-medium transition-colors text-left cursor-pointer",
                                        isDanger
                                            ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                            : isActive
                                                ? "bg-[#212227] text-white"
                                                : "text-[#b5bac1] hover:bg-[#212227] hover:text-white",
                                    ].join(" ")}
                                >
                                    <span className="opacity-90">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <section className="flex-1 bg-[#050506] flex flex-col min-w-0 ">
                    <header className="flex items-center justify-between h-12 px-6 border-b border-[#3f4147] shrink-0">
                        <span className="text-sm font-semibold text-white">
                            {TAB_TITLES[active]}
                        </span>
                        <button
                            onClick={onClose}
                            className="text-[#b5bac1] hover:text-white transition cursor-pointer hover:bg-[#212227]"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 min-h-0 overflow-y-auto custom-scroll flex flex-col">
                        <div className="flex-1 flex flex-col px-10 py-10 max-w-[740px] w-full">
                            {renderContent()}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}