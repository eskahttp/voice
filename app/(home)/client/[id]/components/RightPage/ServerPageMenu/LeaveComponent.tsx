'use client';

import {LeaveServerUser} from "@/app/(home)/client/[id]/components/RightPage/ServerPageMenu/ActionMenu/LeaveServerUser";

interface Props {
    serverName: string;
    onClose: () => void;
    referal: string;
}

function LeaveServerModal({ serverName, onClose, referal }: Props) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="w-[440px] rounded-md bg-[#1e1f22] text-white shadow-2xl p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between mb-3">
                    <h2 className="text-lg font-bold pr-4">
                        Leave &apos;{serverName}&apos;
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition cursor-pointer"
                    >
                        ✖
                    </button>
                </div>

                <p className="text-sm text-gray-300 mb-5">
                    Are you sure you want to leave{' '}
                    <span className="font-semibold text-white">
                        {serverName}
                    </span>
                    ? You won&apos;t be able to rejoin this server unless you
                    are re-invited.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium rounded bg-transparent hover:underline transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <form action={()=> LeaveServerUser(referal)} >
                    <button
                        type='submit'
                        className="px-5 py-2 text-sm font-medium rounded bg-red-600 hover:bg-red-700 transition cursor-pointer"
                    >
                        Leave Server
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LeaveServerModal;