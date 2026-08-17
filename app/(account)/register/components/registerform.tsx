'use client';

import { useActionState } from "react";
import { createAccount } from "@/app/(account)/register/action/action";

const initialState = { errors: {}, message: '' };

function RegisterForm() {
    const [regPage, regPageAction] = useActionState(createAccount, initialState);

    return (
        <div>
            <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 px-3 py-1 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
                    </span>
                    <span className="text-[10px] tracking-widest text-teal-200/80">
                        JOIN THE WAVE
                    </span>
                </div>

                <h1 className="mb-2 text-3xl font-thin tracking-tight">
                    <span className="bg-gradient-to-br from-white via-teal-100 to-teal-400 bg-clip-text text-transparent">
                        create
                    </span>
                    <span className="ml-2 font-light italic text-teal-300/90">
                        account
                    </span>
                </h1>
                <p className="text-sm font-light text-teal-100/50">
                    start talking with your people
                </p>
            </div>

            {(regPage.nickLogError || regPage.message) && (
                <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 backdrop-blur-sm">
                    <span className="flex justify-center text-sm font-light text-red-300 animate-error-fade">
                        {regPage.nickLogError || regPage.message}
                    </span>
                </div>
            )}

            <form action={regPageAction} className="space-y-5">
                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        E-mail <span className="text-teal-400">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="you@ocean.io"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                    />
                    {regPage?.errors?.email && (
                        <span className="mt-1 block text-xs font-light text-red-300/90">
                            {regPage.errors.email}
                        </span>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        Display name
                    </label>
                    <input
                        name="nickname"
                        type="text"
                        placeholder="how friends see you"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        Login <span className="text-teal-400">*</span>
                    </label>
                    <input
                        name="login"
                        type="text"
                        placeholder="your unique handle"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                    />
                    {regPage?.errors?.login && (
                        <span className="mt-1 block text-xs font-light text-red-300/90">
                            {regPage.errors.login}
                        </span>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-teal-200/60">
                        Password <span className="text-teal-400">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-teal-100/20 backdrop-blur-sm transition-all focus:border-teal-400/60 focus:bg-black/60 focus:outline-none focus:shadow-[0_0_20px_rgba(32,178,170,0.15)]"
                    />
                    {regPage?.errors?.password && (
                        <span className="mt-1 block text-xs font-light text-red-300/90">
                            {regPage.errors.password}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 py-3 text-sm font-medium text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(32,178,170,0.5)]"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Create account
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

export default RegisterForm;