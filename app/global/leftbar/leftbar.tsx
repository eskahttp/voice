import Link from "next/link";
import AddServer from "@/app/global/leftbar/components/clientcomponent/addServer";

function LeftBar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 overflow-y-auto z-40">
            <Link href={'/client'} className="w-12 h-12 rounded-2xl bg-[#5865f2] flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer">
                👁️‍🗨️
            </Link>
            <div className="w-8 h-0.5 bg-[#2b2d31] rounded-full my-1" />
            <AddServer/>
        </div>
    );
}

export default LeftBar;