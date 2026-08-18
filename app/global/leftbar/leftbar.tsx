import AddServer from "@/app/global/leftbar/components/clientcomponent/addServer";
import {GetUserServers} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/GetUserServers";
import HomeLink from "@/app/global/leftbar/components/clientcomponent/LinkClient";

async function LeftBar() {
    const MyServers = await GetUserServers() ?? []

    return (
        <div className="fixed top-0 left-0 h-screen w-[72px] bg-[#0b0b0d] flex flex-col items-center overflow-y-auto z-40">
            <div className="h-[72px] flex items-center justify-center shrink-0">
                <HomeLink />
            </div>

            <div className="h-[16px] w-full flex items-center justify-center shrink-0">
                <div className="w-8 h-0.5 bg-[#232428] rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-2 pt-2 pb-3 w-full">
                <AddServer ServerBar={MyServers} />
            </div>
        </div>
    );
}

export default LeftBar;