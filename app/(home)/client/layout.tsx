import type { Metadata } from "next";
import "@/app/globals.css";
import LeftBar from "@/app/global/leftbar/leftbar";
import AccountInfo from "@/app/global/account/account";


export const metadata: Metadata = {
    title: "DianaVoice",
    description: "DianaVoice",
};

export default function NewLayout({
   children,
   }: Readonly<{
   children: React.ReactNode;
}>) {
    return (<div className="overflow-hidden" >

        <LeftBar />
        <AccountInfo />
        <div className="ml-[72px] h-screen overflow-hidden">

            {children}

        </div>
    </div>);
}
