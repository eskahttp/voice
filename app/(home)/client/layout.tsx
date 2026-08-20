import type { Metadata } from "next";
import "@/app/globals.css";
import LeftBar from "@/app/global/leftbar/leftbar";
import AccountInfo from "@/app/global/account/account";
import { TakeNickname } from "@/app/global/account/components/action/action";
import { VoiceProvider } from "@/app/(home)/client/[id]/context/VoiceContext";
import VoiceConnection from "@/app/(home)/client/[id]/components/livekit/VoiceConnection";

export const metadata: Metadata = {
    title: "DianaVoice",
    description: "DianaVoice",
};

export default async function NewLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    const Nickname = await TakeNickname();

    return (
        <VoiceProvider>
            <div className="overflow-hidden">
                <LeftBar />
                <AccountInfo Nickname={Nickname} />
                <div className="ml-[72px] h-screen overflow-hidden">
                    {children}
                </div>
                <VoiceConnection Nickname={Nickname} />
            </div>
        </VoiceProvider>
    );
}