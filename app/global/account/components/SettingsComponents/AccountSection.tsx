import {useMyAccountStore} from "@/app/stores/MyAccountStores/myAccountStore";

interface Field {
    label: string;
    value: string;
}

export default function AccountSection() {

    const nickname = useMyAccountStore((state)=> state.nickname)
    const login = useMyAccountStore((state)=> state.login)
    const email = useMyAccountStore((state)=> state.email)

    const FIELDS: Field[] = [
        { label: "Nickname", value: nickname },
        { label: "Username", value: login },
        { label: "Email", value: email },
    ];

    return (
        <>
            <h2 className="text-xl font-semibold text-white mb-6">Account Info</h2>
            <div className="flex flex-col">
                {FIELDS.map((f) => {

                    return (
                        <div
                            key={f.label}
                            className="flex items-center justify-between py-4"
                        >
                            <div className="text-sm font-semibold text-white">{f.label}</div>
                            <div className="flex items-center gap-4">
                <span className="text-sm text-[#dbdee1] flex items-center gap-2">
                  {f.value}
                </span>
                                    <button className="px-8 py-2 rounded bg-[#1e1f22] hover:bg-[#25272a] text-white text-sm font-medium transition cursor-pointer">
                                        Edit
                                    </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="h-px bg-[#3f4147] my-6" />

            <h2 className="text-xl font-semibold text-white mb-6">
                Password & Security
            </h2>
            <div className="flex items-center justify-between py-4">
                <div className="text-sm font-semibold text-white">Password</div>
                <button className="px-4 py-1.5 rounded bg-[#1e1f22] hover:bg-[#25272a] text-white text-sm font-medium transition cursor-pointer">
                    Edit
                </button>
            </div>

            <div className="h-px bg-[#3f4147] my-6" />

            <h2 className="text-xl font-semibold text-white mb-6">
                Delete Account
            </h2>
            <div className="flex items-center justify-between py-4">
                <div className="text-sm font-semibold text-white">Close your account</div>
                <button className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-900
                   text-white text-sm font-medium
                   transition-colors duration-250 cursor-pointer">
                    Delete Account
                </button>
            </div>
        </>
    );
}