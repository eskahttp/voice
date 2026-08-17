import AddServer from "@/app/global/leftbar/components/clientcomponent/addServer";
import {GetUserServers} from "@/app/global/leftbar/components/clientcomponent/ServersUserAction/GetUserServers";
import HomeLink from "@/app/global/leftbar/components/clientcomponent/LinkClient";

async function LeftBar() {
    const MyServers = await GetUserServers() ?? []

    return (
        <div className="fixed top-0 left-0 h-screen w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 overflow-y-auto z-40">
            <HomeLink/>
            <div className="w-8 h-0.5 bg-[#2b2d31] rounded-full my-1" />
            <AddServer
            ServerBar={MyServers}
            />
        </div>
    );
}

export default LeftBar;