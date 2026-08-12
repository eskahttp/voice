'use client';

import {useState} from "react";
import CreateComponent from "@/app/global/leftbar/components/clientcomponent/CreateComponent";
import Link from "next/link";
import {CreateServer} from "@/app/global/leftbar/components/action/action";
import {JoinServerAction} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/JoinServer";

interface Props {
    ServerBar: {
        id: number;
        name: string;
    }[]
}

type Filter = 'CreateServer' | 'JoinServer' | 'nothing' ;


function AddServer({ServerBar}: Props){
    const [filterServer, setFilterServer] = useState<Filter>('nothing');

    return (<div>

        {ServerBar.map(item => (<div key={item.id} >
            <Link href={`/client/${item.id}`} className="w-12 h-12 rounded-2xl bg-[#5865f2] flex items-center justify-center text-white font-bold hover:rounded-xl transition-all cursor-pointer">
                {item.name.slice(0,4)}
           </Link>
        </div>))}

        <div onClick={()=>setFilterServer('CreateServer')}
            className={"inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 text-white cursor-pointer hover:bg-neutral-700 transition-colors text-2xl"}>
            +
        </div>


        {filterServer === 'CreateServer' && (
            <CreateComponent
                UpText={'Создайте свой сервер'}
                MiddleText={'Ваш сервер — это место, где вы можете тусоваться со своими друзьями. Создайте сервер и начните общаться.'}
                NameOrRef={'Название сервера'}
                input={'Например Старперцы'}
                button={'Создать'}
                FNServer={CreateServer}

                JoinServer={<div
                    className={'text-blue-400 cursor-pointer'} > &nbsp; <span className={'underline'}
                        onClick={()=> setFilterServer('JoinServer')}>
                        Или присоедениться к серверу
            </span>
                </div>}

            SetNothing={()=> setFilterServer('nothing')}
        />)}

        {filterServer === 'JoinServer' && (<CreateComponent
            UpText={'Присоединиться к серверу'}
            MiddleText={'Введите приглашение, чтобы присоединиться к существующему серверу'}
            NameOrRef={'Ссылка-приглашение'}
            input={'GHghkwBnf'}
            button={'Присоединиться'}
            FNServer={JoinServerAction}
            SetNothing={()=> setFilterServer('nothing')}
        />)}
    </div>)
}

export default AddServer;