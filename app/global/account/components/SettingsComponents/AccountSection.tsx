import { useState } from "react";

interface Field {
    label: string;
    value: string;
    masked?: boolean;
    editable?: boolean;
}

const FIELDS: Field[] = [
    { label: "Username", value: "DianaVoice", editable: true },
    { label: "Email", value: "DianaVoice@gmail.com", masked: true, editable: true },
    { label: "Phone Number", value: "+1DianaVoice", masked: true, editable: true },
    { label: "Age group", value: "Adult", editable: false },
];

const maskEmail = (v: string) => {
    const [name, domain] = v.split("@");
    return "*".repeat(name.length) + "@" + domain;
};

const maskPhone = (v: string) => "*".repeat(v.length - 4) + v.slice(-4);

export default function AccountSection() {
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});
    const toggle = (l: string) =>
        setRevealed((r) => ({ ...r, [l]: !r[l] }));

    return (
        <>
            <h2 className="text-xl font-semibold text-white mb-6">Account Info</h2>

            <div className="flex flex-col">
                {FIELDS.map((f) => {
                    const isRevealed = revealed[f.label];
                    let display = f.value;
                    if (f.masked && !isRevealed) {
                        display =
                            f.label === "Email" ? maskEmail(f.value) : maskPhone(f.value);
                    }

                    return (
                        <div
                            key={f.label}
                            className="flex items-center justify-between py-4"
                        >
                            <div className="text-sm font-semibold text-white">{f.label}</div>
                            <div className="flex items-center gap-4">
                <span className="text-sm text-[#dbdee1] flex items-center gap-2">
                  {display}
                    {f.masked && (
                        <button
                            onClick={() => toggle(f.label)}
                            className="text-[#00a8fc] hover:underline text-sm"
                        >
                            {isRevealed ? "Hide" : "Reveal"}
                        </button>
                    )}
                </span>
                                {f.editable && (
                                    <button className="px-4 py-1.5 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-sm font-medium transition">
                                        Edit
                                    </button>
                                )}
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
                <button className="px-4 py-1.5 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-sm font-medium transition">
                    Edit
                </button>
            </div>
        </>
    );
}