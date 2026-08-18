"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLink() {
    const pathname = usePathname();
    const isActive = pathname === '/client';

    return (<div>
        {isActive ? (<div
                className={'w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer bg-gradient-to-r from-teal-500 to-cyan-600 select-none'}
            >
                👁️‍🗨️
            </div>) :(<Link
                href={'/client'}
                className={'w-12 h-12 bg-[#121212] rounded-2xl flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer hover:bg-gradient-to-r from-teal-500 to-cyan-600'}
            >
                👁️‍🗨️
            </Link>)}
    </div> );
}