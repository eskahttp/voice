import { useRef, useState } from "react";
import { Upload, Trash2, Camera } from "lucide-react";

const PRESETS = ["🦊", "🐼", "🐸", "🦄", "🐺", "🐙", "🦁", "🐵"];

export default function AvatarSection() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [presetEmoji, setPresetEmoji] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setPresetEmoji(null);
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold text-white mb-2">Profile Picture</h2>
            <p className="text-sm text-[#b5bac1] mb-6">
                Upload a new avatar. Recommended size 512×512.
            </p>

            <div className="flex items-center gap-6 mb-8">
                {/* Preview */}
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-[#1e1f22] border-4 border-[#2b2d31] overflow-hidden flex items-center justify-center text-5xl">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : presetEmoji ? (
                            <span>{presetEmoji}</span>
                        ) : (
                            <Camera size={40} className="text-[#80848e]" />
                        )}
                    </div>
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#5865f2] hover:bg-[#4752c4] flex items-center justify-center text-white shadow-lg transition"
                        aria-label="Change avatar"
                    >
                        <Camera size={14} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium transition"
                    >
                        <Upload size={16} />
                        Upload Image
                    </button>
                    <button
                        onClick={() => {
                            setAvatar(null);
                            setPresetEmoji(null);
                        }}
                        disabled={!avatar && !presetEmoji}
                        className="flex items-center gap-2 px-4 py-2 rounded text-red-400 hover:bg-red-500/10 text-sm font-medium transition disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                        <Trash2 size={16} />
                        Remove
                    </button>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFile}
                />
            </div>

            <div className="h-px bg-[#3f4147] my-6" />

            <h2 className="text-xl font-semibold text-white mb-4">Preset Avatars</h2>
            <div className="grid grid-cols-8 gap-3">
                {PRESETS.map((emo) => (
                    <button
                        key={emo}
                        onClick={() => {
                            setPresetEmoji(emo);
                            setAvatar(null);
                        }}
                        className={[
                            "aspect-square rounded-full bg-[#1e1f22] hover:bg-[#404249] text-2xl flex items-center justify-center transition border-2",
                            presetEmoji === emo
                                ? "border-[#5865f2]"
                                : "border-transparent",
                        ].join(" ")}
                    >
                        {emo}
                    </button>
                ))}
            </div>
        </>
    );
}