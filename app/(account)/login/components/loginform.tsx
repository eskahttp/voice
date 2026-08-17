'use client';

import { useActionState } from "react";
import { LoginAccount } from "@/app/(account)/login/action/action";

const initialState = { errors: {}, message: '' };

function LoginForm() {
    const [loginPage, loginPageAction] = useActionState(LoginAccount, initialState);

    return (
        <div>
            {loginPage.message && (
                <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 backdrop-blur-sm">
                    <span className="flex justify-center text-sm font-light text-red-300 animate-error-fade">
                        {loginPage.message}
                    </span>
                </div>
            )}

            <form action={loginPageAction} className="space-y-5">
                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        Login <span className="text-teal-400">*</span>
                    </label>
                    <input
                        name="login"
                        type="text"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                        placeholder="your login"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        Password <span className="text-teal-400">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 py-3 text-sm font-medium text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(32,178,170,0.5)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Sign in
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
            </form>
        </div>
    );
}

export default LoginForm;