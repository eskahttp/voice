import Link from "next/link";
import LoginForm from "@/app/(account)/login/components/loginform";

export default function DianaLogin() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            <div className="pointer-events-none absolute -left-40 top-1/4 z-0 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-1/4 z-0 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/10 blur-2xl" />

            <div className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                    <span className="text-sm tracking-[0.3em] text-teal-200/70">
                        DIANA
                    </span>
                </Link>
            </div>

            <div className="relative z-10 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border border-teal-400/20 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(32,178,170,0.15)] backdrop-blur-xl">
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 px-3 py-1 backdrop-blur-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
                            </span>
                            <span className="text-[10px] tracking-widest text-teal-200/80">
                                SECURE CONNECTION
                            </span>
                        </div>

                        <h1 className="mb-2 text-3xl font-thin tracking-tight">
                            <span className="bg-gradient-to-br from-white via-teal-100 to-teal-400 bg-clip-text text-transparent">
                                welcome
                            </span>
                            <span className="ml-2 font-light italic text-teal-300/90">
                                back
                            </span>
                        </h1>
                        <p className="text-sm font-light text-teal-100/50">
                            dive back into the conversation
                        </p>
                    </div>

                    <LoginForm />

                    <div className="mt-6 text-center">
                        <p className="text-sm font-light text-teal-100/50">
                            new here?{' '}
                            <Link
                                href="/register"
                                className="text-teal-300 transition-colors hover:text-teal-200 hover:underline"
                            >
                                create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 text-xs tracking-widest text-teal-100/30 md:px-12">
                <span>© 2026 · DIANA VOICE</span>
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-teal-400/50" />
                    <span>SEA WAVE PROTOCOL</span>
                </div>
            </div>
        </div>
    );
}