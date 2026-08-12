interface Props {
    nickname: string;
}

function UserServer({nickname}: Props) {


    return (
        <div className="flex items-center gap-3 rounded p-1 hover:bg-[#35373c]">
            <div className="relative">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-700">
                    123
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] bg-red-500"/>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white">{nickname}</span>
            </div>
        </div>
    )
}

export default UserServer;