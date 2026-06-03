export default function FilterButton  ({label,count,active,onClick,}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                w-full
                flex
                items-center
                justify-between
                py-1.5
                text-right
                group
            "
        >
            <span
                className={`
                    text-[15px]
                    transition
                    ${
                        active
                            ? "text-[var(--primary)] font-semibold"
                            : "text-[var(--secondary)]"
                    }
                `}
            >
                {label}
            </span>

            <span
                className={`
                    min-w-[38px]
                    h-5
                    px-2
                    flex
                    items-center
                    justify-center
                    rounded-full
                    text-[11px]
                    border
                    transition
                    ${
                        active
                            ? "bg-[var(--primary)] text-white border-[var(--border)]"
                            : "bg-white text-gray-500 border-[#d8d8d8]"
                    }
                `}
            >
                {count}
            </span>
        </button>
    );
}
