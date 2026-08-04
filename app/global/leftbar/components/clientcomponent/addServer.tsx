'use client';

import {useState} from "react";
import FormComponent from "@/app/global/leftbar/components/clientcomponent/formComponents";


function AddServer(){
    const [formServer, setFormServer] = useState<boolean>(false);

    return (<div>
        <div onClick={()=>setFormServer(true)}
            className={"inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 text-white cursor-pointer hover:bg-neutral-700 transition-colors text-2xl"}>
            +
        </div>


        {formServer && (<FormComponent
        SetState={()=> setFormServer(false)}
        />)}
    </div>)
}

export default AddServer;