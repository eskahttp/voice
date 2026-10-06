import {LogOut} from "lucide-react";
import React from "react";

interface Props {}

export function LogoutSection({}: Props){
    return (<div className="flex flex-col items-center justify-center h-full text-center">
        <LogOut size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2">
            Log out of your account?
        </h2>
        <p className="text-[#b5bac1] mb-6">
            You will need to sign in again to access your account.
        </p>
        <div className="flex gap-3">
            <button
                onClick={() => console.log("Cancel")}
                className="px-5 py-2 rounded-md bg-transparent hover:underline text-white transition"
            >
                Cancel
            </button>
            <button className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition">
                Log Out
            </button>
        </div>
    </div>)
}
