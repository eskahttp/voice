import LeftBarClient from "@/app/(home)/client/pageComponent/LeftBar";
import RightBarClient from "@/app/(home)/client/pageComponent/RightBar";

interface Props {

}

function PageClient({}: Props){
    return (<div className="flex flex-col h-screen w-screen bg-[#1e1f22] text-gray-300 overflow-hidden">
        <div className="flex flex-1 overflow-hidden border-l border-[#232428] ">
            <LeftBarClient />
            <RightBarClient />
        </div>
    </div>)
}

export default PageClient;