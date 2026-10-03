import { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMyAccountStore } from "@/app/stores/MyAccountStores/myAccountStore";
import { AddMyPhoto } from "@/app/global/account/components/SettingsComponents/AvatarSectionComponent/AddMyPhoto";
import {useSocket} from "@/app/CustomHooks/socket";

export default function AvatarSection() {
    const socket = useSocket()

    const myAvatarUrl = useMyAccountStore((state) => state.avatar_url);
    const setMyAvatarUrl = useMyAccountStore((state) => state.setAvatarUrl);

    const [avatar, setAvatar] = useState<string>(myAvatarUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const onChangePhoto = async (formData:FormData)=>{
        const newPhoto: string | void = await AddMyPhoto(formData)

        if (newPhoto) {
            setMyAvatarUrl(newPhoto)
            setAvatar(newPhoto)
            socket?.emit('avatarChanged', newPhoto.toString())
        }
    }

    return (
        <form action={onChangePhoto} className="flex flex-col flex-1">
            <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                    Profile Picture
                </h2>
                <p className="text-sm text-[#b5bac1] mb-6">
                    Upload a new avatar. Recommended size 512×512.
                </p>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-42 h-42 rounded-full border-4 border-[#2b2d31] overflow-hidden flex items-center justify-center text-5xl">
                            <Image
                                width={150}
                                height={150}
                                src={avatar}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium transition"
                        >
                            <Upload size={16} />
                            Upload Image
                        </button>
                        <button
                            type="button"
                            onClick={() => setAvatar(myAvatarUrl)}
                            disabled={avatar === myAvatarUrl}
                            className="flex items-center gap-2 px-4 py-2 rounded text-red-400 hover:bg-red-500/10 text-sm font-medium transition disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            <Trash2 size={16} />
                            Remove
                        </button>
                    </div>

                    <input
                        name="avatar"
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFile}
                    />
                </div>
            </div>

            {avatar !== myAvatarUrl && (
                <div className="mt-auto flex justify-center pt-6 -mb-5">
                    <div
                        className="flex items-center justify-between gap-8 px-4 py-2 rounded-lg bg-[#2b2d31] border border-[#4a4d55] shadow-lg whitespace-nowrap min-w-[600px]"
                        style={{
                            animation: "slideUpFade 0.2s ease-out 0.1s both",
                        }}
                    >
                        <p className="text-sm text-white">Save settings?</p>
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="px-4 py-1.5 rounded bg-[#248046] hover:bg-[#1a6334] text-white text-sm font-medium transition"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setAvatar(myAvatarUrl)}
                                className="px-3 py-1.5 rounded text-sm text-white hover:underline transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}