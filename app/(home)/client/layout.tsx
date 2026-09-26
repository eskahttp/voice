import type { Metadata } from "next";
import "@/app/globals.css";
import LeftBar from "@/app/global/leftbar/leftbar";
import AccountInfo from "@/app/global/account/account";
import { TakeMyInfo } from "@/app/global/account/components/action/TakeMyInfoAction";
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
    const UserInfo = await TakeMyInfo();

    return (
            <div className="h-screen w-screen overflow-hidden">
                <LeftBar />
                <AccountInfo UserInfo={UserInfo} />
                <div className="ml-[72px] h-screen w-[calc(100vw-72px)] overflow-hidden">
                    {children}
                </div>
                <VoiceConnection/>
            </div>
    );
}