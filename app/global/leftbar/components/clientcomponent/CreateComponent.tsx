'use client';

import {useState} from "react";

interface Props {
    SetNothing: ()=> void;
    FNServer: (formData:FormData)=> void;
    filterServer: string;
    setJoinServer: ()=> void;
    messageServer?: string;
}

function CreateComponent({SetNothing, FNServer, filterServer , setJoinServer, messageServer}: Props){
    const [inputUserValue, setInputUserValue] = useState('');

    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md rounded-lg bg-[#0d0d0f] shadow-2xl">
            <div className="relative px-6 pt-6 pb-4 text-center">
                <button
                    onClick={SetNothing}
                    type="button"
                    aria-label="Закрыть"
                    className="absolute right-4 top-4 text-2xl leading-none text-gray-400 transition hover:text-white cursor-pointer">
                    ×
                </button>
                <h2 className="text-2xl font-bold text-white">
                    {filterServer === 'CreateServer' ? 'Create your own server' : 'Join the server'}
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                    {filterServer === 'CreateServer' ? 'Your server is a place where you can hang out with your friends. Create a server and start chatting.' : 'Enter an invitation to join an existing server.'}
                </p>
            </div>

        <form className="px-6 pb-6" action={FNServer} onSubmit={()=> setInputUserValue('')
        }>
                <div className="mb-6">
                        <span
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-300">
                            {filterServer === 'CreateServer' ? 'Server name' : 'Invitation link'}
                        </span>
                    <input
                        name='ServerName'
                        onChange={(e) => setInputUserValue(e.target.value)}
                        type="text"
                        placeholder={filterServer === 'CreateServer' ? 'For example, a game server.' : 'GHgh2wBnf'}
                        className={`w-full rounded-md bg-[#1e1f22] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 border transition ${messageServer ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : 'border-transparent focus:ring-2 focus:ring-indigo-500'}`}
                    />
                    {messageServer && <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">{messageServer}</div>}
                </div>

                <div className="-mx-6 -mb-6 flex rounded-b-lg bg-[#0d0d0f] px-6 py-4">
                    <button
                        disabled={inputUserValue === ''}
                        type="submit"
                        className="rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 w-full py-2 text-sm font-medium text-white transition hover:shadow-[inset_0_10px_15px_-5px_rgba(0,0,0,0.25),inset_0_-10px_15px_-5px_rgba(0,0,0,0.25)] text-white text-sm font-medium cursor-pointer transition-all duration-350 disabled:bg-[#1e1f22] disabled:text-gray-500 disabled:cursor-default disabled:hover:shadow-none  "
                    >
                        {filterServer === 'CreateServer' ? 'Create' : 'Join'}
                    </button>
                </div>
            </form>

            {filterServer === 'CreateServer' && (<div
                className={'text-blue-400 cursor-pointer'} > &nbsp; <span className={'underline'}
                                                                          onClick={setJoinServer}>
                        Or join the server.
                    </span>
            </div>)}

        </div>
    </div>)
}

export default CreateComponent;