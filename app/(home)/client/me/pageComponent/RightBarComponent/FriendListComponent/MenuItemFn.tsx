export function MenuItemFn({
                      children,
                      onClick,
                      danger,
                  }: {
    children: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-sm ${
                danger
                    ? 'text-red-400 hover:bg-red-500/15'
                    : 'text-gray-200 hover:bg-[#1a1b1e]'
            }`}
        >
            {children}
        </button>
    );
}