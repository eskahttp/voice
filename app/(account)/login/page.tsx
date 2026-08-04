import Link from "next/link";
import LoginForm from "@/app/(account)/login/components/loginform";

export default function DiscordLogin() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-700 relative overflow-hidden">

            {/* Логотип Discord */}
            <div className="relative z-10 p-6">
                <div className="flex items-center gap-2 text-white">
                    <span className="text-2xl font-bold">DianaVoice</span>
                </div>
            </div>

            {/* Форма входа */}
            <div className="relative z-10 flex items-center justify-center px-4 py-10">
                <div className="bg-[#1e1f22]/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            С возвращением!
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Мы так рады видеть вас снова!
                        </p>
                    </div>
                        <LoginForm/>
                        <p className="text-sm text-gray-400">
                            Нужна учётная запись?{' '}
                            <Link href="/register" className="text-indigo-400 hover:underline">
                                Зарегистрироваться
                            </Link>
                        </p>

                </div>
            </div>
        </div>
    );
}