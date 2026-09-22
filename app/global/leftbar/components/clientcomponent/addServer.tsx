'use client';

import {useState} from "react";
import CreateComponent from "@/app/global/leftbar/components/clientcomponent/CreateComponent";
import Link from "next/link";
import {CreateServer} from "@/app/global/leftbar/components/action/CreateServer";
import {JoinServerAction} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/JoinServer";
import {useParams} from "next/navigation";

interface Props {
    ServerBar: {
        id: number;
        name: string;
    }[]
}

type Filter = 'CreateServer' | 'JoinServer' | 'nothing' ;


function AddServer({ServerBar}: Props){
    const [filterServer, setFilterServer] = useState<Filter>('nothing');
    const [messageServer, setMessageServer] = useState<{message: string}>({message: ''});

    const params : {id:string} = useParams<{ id: string }>();

    const serverId : number = Number(params.id);

    const CreateOrJoinServer = async (formData:FormData)=>{
        if (filterServer === 'CreateServer'){
            const MesError : void | {message: string} = await CreateServer(formData)
            if (MesError){
                setMessageServer(MesError)
                return;
            }
        }

        if (filterServer === 'JoinServer'){
            const MesError : void | {message: string} = await JoinServerAction(formData)
            if (MesError){
                setMessageServer(MesError)
                return;
            }
        }
    }

    return (<div>

        {ServerBar.map(item => {
            const isActive = serverId === item.id;

            const commonClasses = `w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition-all cursor-pointer hover:bg-gradient-to-r from-teal-500 to-cyan-600 select-none ${
                isActive ? 'bg-gradient-to-r from-teal-500 to-cyan-600' : 'bg-[#121212]'
            }`;

                return (
                    <div key={item.id} className="mb-1">
                        {isActive ? (
                            <div className={commonClasses}>
                                {item.name.slice(0, 4)}
                            </div>
                        ) : (
                            <Link href={`/client/${item.id}`} className={commonClasses}>
                                {item.name.slice(0, 4)}
                            </Link>
                        )}
                    </div>
                );
        })}

        <div onClick={()=>setFilterServer('CreateServer')}
            className={"inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#121212] border border-neutral-700 text-white cursor-pointer hover:bg-gradient-to-r from-teal-500 to-cyan-600"}>
            +
        </div>


        {filterServer !== 'nothing' && (
            <CreateComponent
                messageServer={messageServer.message}
                filterServer={filterServer}
                FNServer={CreateOrJoinServer}
                SetNothing={()=> {
                    setFilterServer('nothing')
                    setMessageServer({message: ''})
                }}
                setJoinServer={()=> setFilterServer('JoinServer')}
        />)}
    </div>)
}

export default AddServer;