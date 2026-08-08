interface Props {
    name: string;
    onClick?: () => void;
    active?: boolean;
}

function ButtonChannel({ name, onClick, active }: Props) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded mt-1 ${
                    active
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-400'
                }`}
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                </svg>
                {name}
            </button>
        </div>
    );
}

export default ButtonChannel;