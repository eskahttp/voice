import { useEffect, useRef, useState } from "react";
import { Mic, Headphones, ChevronDown } from "lucide-react";

export default function VoiceSection() {
    const [micVol, setMicVol] = useState(80);
    const [spkVol, setSpkVol] = useState(60);
    const [testing, setTesting] = useState(false);
    const [bars, setBars] = useState<number[]>(
        Array.from({ length: 40 }, () => 15)
    );
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!testing) {
            setBars(Array.from({ length: 40 }, () => 15));
            return;
        }
        const tick = () => {
            setBars((prev) =>
                prev.map(() => Math.max(15, Math.random() * 100))
            );
            rafRef.current = window.setTimeout(
                tick,
                70
            ) as unknown as number;
        };
        tick();
        return () => {
            if (rafRef.current) clearTimeout(rafRef.current);
        };
    }, [testing]);

    const rangeStyle = (val: number) => ({
        background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${val}%, #4e5058 ${val}%, #4e5058 100%)`,
    });

    return (
        <>
            <h2 className="text-xl font-semibold text-white mb-6">Voice</h2>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5 mb-6">
                {/* Microphone select */}
                <div>
                    <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2 tracking-wider">
                        Microphone
                    </label>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 bg-[#1e1f22] hover:bg-[#111214] border border-[#1e1f22] rounded text-white text-sm transition">
            <span className="flex items-center gap-2 truncate">
              <Mic size={16} className="text-[#b5bac1] shrink-0" />
              <b className="font-semibold">Windows Default</b>
              <span className="text-[#b5bac1] truncate">
                (Микрофон (Realt…
              </span>
            </span>
                        <ChevronDown size={16} className="text-[#b5bac1] shrink-0" />
                    </button>
                </div>

                {/* Speaker select */}
                <div>
                    <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2 tracking-wider">
                        Speaker
                    </label>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 bg-[#1e1f22] hover:bg-[#111214] border border-[#1e1f22] rounded text-white text-sm transition">
            <span className="flex items-center gap-2 truncate">
              <Headphones size={16} className="text-[#b5bac1] shrink-0" />
              <b className="font-semibold">Windows Default</b>
              <span className="text-[#b5bac1] truncate">
                (Динамики (Realt…
              </span>
            </span>
                        <ChevronDown size={16} className="text-[#b5bac1] shrink-0" />
                    </button>
                </div>

                {/* Mic volume */}
                <div>
                    <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2 tracking-wider">
                        Microphone Volume
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={micVol}
                        onChange={(e) => setMicVol(+e.target.value)}
                        style={rangeStyle(micVol)}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-0"
                    />
                </div>

                {/* Speaker volume */}
                <div>
                    <label className="block text-xs font-bold uppercase text-[#b5bac1] mb-2 tracking-wider">
                        Speaker Volume
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={spkVol}
                        onChange={(e) => setSpkVol(+e.target.value)}
                        style={rangeStyle(spkVol)}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-0"
                    />
                </div>
            </div>

            {/* Mic test */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => setTesting((t) => !t)}
                    className={[
                        "px-5 py-2 rounded text-white text-sm font-medium transition shrink-0",
                        testing
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-[#5865f2] hover:bg-[#4752c4]",
                    ].join(" ")}
                >
                    {testing ? "Stop Testing" : "Mic Test"}
                </button>
                <div className="flex-1 flex items-center gap-[2px] h-8">
                    {bars.map((h, i) => (
                        <span
                            key={i}
                            className="flex-1 bg-[#b5bac1] rounded-sm transition-all duration-75"
                            style={{
                                height: `${h}%`,
                                opacity: testing ? 1 : 0.4,
                                background: testing
                                    ? "linear-gradient(to top, #5865f2, #23a559)"
                                    : "#4e5058",
                            }}
                        />
                    ))}
                </div>
            </div>

            <p className="text-sm text-[#b5bac1]">
                Need help? Check out our{" "}
                <a href="#" className="text-[#00a8fc] hover:underline">
                    troubleshooting guide
                </a>
                .
            </p>
        </>
    );
}