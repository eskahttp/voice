interface Props {
    SetNothing: ()=> void;
    UpText: string;
    MiddleText: string;
    NameOrRef:string;
    button:string;
    input:string;
    FNServer: (formData:FormData)=> void;
    JoinServer?: React.ReactElement
}

function CreateComponent({SetNothing,UpText
                             ,MiddleText,NameOrRef
                             ,button,input,
                             FNServer,JoinServer}: Props){
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md rounded-lg bg-[#313338] shadow-2xl">
            <div className="relative px-6 pt-6 pb-4 text-center">
                <button
                    onClick={SetNothing}
                    type="button"
                    aria-label="Закрыть"
                    className="absolute right-4 top-4 text-2xl leading-none text-gray-400 transition hover:text-white cursor-pointer">
                    ×
                </button>
                <h2 className="text-2xl font-bold text-white">
                    {UpText}
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                    {MiddleText}
                </p>
            </div>

            <form className="px-6 pb-6" action={FNServer} onSubmit={SetNothing}>
                <div className="mb-6">
                        <span
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-300">
                            {NameOrRef}
                        </span>
                    <input
                        name='ServerName'
                        type="text"
                        placeholder={input}
                        className="w-full rounded-md border-none bg-[#1e1f22] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="-mx-6 -mb-6 flex justify-end rounded-b-lg bg-[#2b2d31] px-6 py-4">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
                    >
                        {button}
                    </button>
                </div>
            </form>

            {JoinServer}

        </div>
    </div>)
}

export default CreateComponent;