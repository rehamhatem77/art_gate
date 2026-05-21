export default function FilterPill({
    label,
    count,
    active,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`
                 px-6 py-1.5 rounded-2xl text-md font-medium
                border transition
                ${active
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[var(--primary)]"
                }
            `}
        >
            {label} {typeof count !== "undefined" && `(${count})`}
        </button>
    );
}