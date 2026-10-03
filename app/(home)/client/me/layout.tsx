import type { Metadata } from "next";
import "@/app/globals.css";
import LeftBarClient from "@/app/(home)/client/me/pageComponent/LeftBar";


export const metadata: Metadata = {
    title: "Diana voice",
    description: "Diana voice",
};

export default function NewLayout({
   children,
   }: Readonly<{
   children: React.ReactNode;
}>) {
    return (<div className="flex flex-col h-full w-full bg-[#1e1f22] text-gray-300 overflow-hidden">
        <div className="flex flex-1 overflow-hidden ">
            <LeftBarClient />
            {children}
        </div>
    </div>);
}
