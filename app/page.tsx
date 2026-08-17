"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const particles: {
            x: number;
            y: number;
            r: number;
            vx: number;
            vy: number;
            alpha: number;
        }[] = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.2,
            });
        }

        let time = 0;
        let animationId: number;

        const draw = () => {
            time += 0.005;
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, 0, w, h);

            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(32, 178, 170, ${0.08 + j * 0.03})`;
                ctx.lineWidth = 1;
                for (let x = 0; x < w; x += 5) {
                    const y =
                        h / 2 +
                        Math.sin(x * 0.005 + time + j) * 80 +
                        Math.cos(x * 0.01 + time * 1.5) * 40 +
                        j * 30;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(64, 224, 208, ${p.alpha})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            <div className="pointer-events-none absolute -left-40 top-1/4 z-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-1/4 z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/10 blur-2xl" />

            <nav className="relative z-30 flex items-center justify-between px-8 py-6 md:px-16">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                    <span className="text-sm tracking-[0.3em] text-teal-200/70">
            DIANA
          </span>
                </div>

                <Link
                    href={"/login"}
                    className="group relative overflow-hidden rounded-full border border-teal-400/40 bg-teal-500/5 px-6 py-2.5 text-sm font-medium tracking-wider text-teal-100 backdrop-blur-md transition-all hover:border-teal-300 hover:bg-teal-500/20 hover:shadow-[0_0_30px_rgba(32,178,170,0.4)]"
                >
                    <span className="relative z-10">LogIn</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal-400/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
            </nav>

            <main className="relative z-20 flex min-h-[calc(100vh-96px)] flex-col items-center justify-center px-8 text-center">
                <div
                    className={`transition-all duration-1000 ${
                        mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal-500/30 bg-teal-500/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
                        <span className="text-xs tracking-widest text-teal-200/80">
              SERVERS ONLINE
            </span>
                    </div>

                    <h1 className="mb-6 text-6xl font-thin tracking-tight md:text-8xl lg:text-9xl">
            <span className="bg-gradient-to-br from-white via-teal-100 to-teal-400 bg-clip-text text-transparent">
              Diana
            </span>
                        <span className="ml-4 font-light italic text-teal-300/90">
              voice
            </span>
                    </h1>

                    <p className="mx-auto mb-12 max-w-xl text-lg font-light leading-relaxed text-teal-100/60 md:text-xl">
                        talk. hang out. stay connected.
                        <br />
                        <span className="text-teal-300/70">
              a voice messenger where your friends actually feel close.
            </span>
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-4 font-medium text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(32,178,170,0.6)]">
              <Link href={'/client'} className="relative z-10 flex items-center gap-2">
                Join a channel
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
              </Link>
                        </button>

                        <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-teal-100/80 backdrop-blur-md transition-all hover:border-teal-400/40 hover:bg-white/10">
                            Learn more
                        </button>
                    </div>
                </div>

                <div
                    className={`mt-20 grid grid-cols-3 gap-8 transition-all delay-500 duration-1000 md:gap-16 ${
                        mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    {[
                        { label: "latency", value: "<80ms" },
                        { label: "audio", value: "HD Opus" },
                        { label: "servers", value: "∞" },
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-light text-teal-300 md:text-3xl">
                                {item.value}
                            </div>
                            <div className="mt-1 text-xs tracking-widest text-teal-100/40">
                                {item.label.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4 text-xs tracking-widest text-teal-100/30 md:px-16">
                <span>© 2026 · DIANA VOICE</span>
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-teal-400/50" />
                    <span>SEA WAVE PROTOCOL</span>
                </div>
            </div>
        </div>
    );
}