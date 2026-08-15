interface Props {
    nickname: string
    message: string
    created_at: string
}

function MessageServer({nickname,message,created_at}: Props) {
    return (
        <div className="flex flex-col gap-4 px-4 py-2">
            <div className="flex gap-3 hover:bg-gray-800/40 -mx-4 px-4 py-1 transition-colors">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                    123
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-white hover:underline cursor-pointer">
                            {nickname}
                        </span>
                        <span className="text-xs text-gray-500">{created_at}</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed break-words">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MessageServer;