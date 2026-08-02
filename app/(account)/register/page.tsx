import Link from "next/link";
import RegisterForm from "@/app/(account)/register/components/registerform";

export default function DiscordRegisterPage(){
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 relative overflow-hidden">

            <div className="absolute top-6 left-8 flex items-center gap-2 z-10">
                <span className="text-white text-2xl font-bold">DianaVoice</span>
            </div>

            <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
                <div className="w-full max-w-md bg-[#2b2d31]/95 rounded-lg p-8 shadow-2xl">

                    <RegisterForm/>

                    <Link
                        href={"/login"}
                        className="block text-sm text-blue-400 hover:underline"
                    >
                        Уже зарегистрированы? Войти
                    </Link>
                </div>
            </div>
        </div>
    )
}