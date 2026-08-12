import UserServer from "@/app/(home)/client/[id]/components/RightPage/UserServer";
import MessageServer from "@/app/(home)/client/[id]/components/RightPage/MessageServer";

interface Users {
    id: string;
    nickname: string;
}

interface Props {
    users: Users[];
    serverId: string;
}


function RightPage({users, serverId}: Props){
    return (<div className="flex h-screen w-full bg-[#1e1f22] text-gray-200">
        <div className="flex flex-1 flex-col">

            <div className="flex items-center justify-between border-b border-black/40 bg-[#2b2d31] px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">#</span>
                    <span className="text-sm font-semibold uppercase text-white">
              основной
            </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex flex-1 flex-col items-center justify-center px-4">
                    Центр страницы
                </div>

                <MessageServer/>

            </div>

            <div className="px-4 pb-6">
                <form className="flex items-center gap-2 rounded-lg bg-[#383a40] px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                    <input
                        type="text"
                        placeholder="Написать"
                        className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
                    />
                    <input
                    type='hidden'
                    name='serverId'
                    value={serverId}
                    />
                </form>
            </div>
        </div>
        <div className="w-60 border-l border-black/40 bg-[#2b2d31] p-4">
            <p className="mb-3 text-xs font-semibold uppercase text-gray-400">
                В сети — {users.length}
            </p>
            {users.map(u => (<div key={u.id} > <UserServer nickname={u.nickname} /></div>))}
        </div>

    </div>)
}

export default RightPage;