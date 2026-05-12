import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CategoryCard({
    category,
    onEdit,
    onDelete,
}) {
    return (
        <div
            className="
                group
                relative
                flex flex-col items-center
                transition-all duration-500
            "
        >
            {/* OUTER GLOW */}
            <div
                className="
                    absolute inset-0
                    rounded-full
                    bg-[var(--primary)]/10
                    blur-2xl
                    scale-75
                    opacity-0
                    transition-all duration-500
                    group-hover:opacity-100
                    group-hover:scale-100
                "
            />

            {/* CARD */}
            <div
                className="
                    relative
                    w-44 h-44
                    sm:w-52 sm:h-52
                    rounded-full
                    overflow-hidden
                    shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                    ring-4 ring-white
                    transition-all duration-500
                    group-hover:-translate-y-2
                    group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                "
            >
                {/* IMAGE */}
                <img
                    src={category.image}
                    alt={category.name}
                    className="
                        w-full h-full
                        object-cover
                        transition-all duration-700
                        scale-100
                        group-hover:scale-110
                    "
                />

                {/* SMOOTH DARK OVERLAY */}
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                        opacity-70
                        transition-all duration-500
                        group-hover:opacity-90
                    "
                />

                {/* CONTENT */}
                <div
                    className="
                        absolute inset-0
                        flex flex-col
                        items-center
                        justify-end
                        pb-8
                    "
                >
                    {/* CATEGORY NAME */}
                    <div
                        className="
                            px-4 py-2
                            rounded-full
                            bg-white/15
                            backdrop-blur-xl
                            border border-white/20
                            text-white
                            text-sm
                            font-semibold
                            shadow-lg
                            transition-all duration-500
                            group-hover:-translate-y-1
                        "
                    >
                        {category.name}
                    </div>

                    {/* ACTIONS */}
                    <div
                        className="
                            mt-3
                            flex items-center gap-3

                            opacity-0
                            translate-y-4
                            transition-all duration-500

                            group-hover:opacity-100
                            group-hover:translate-y-0
                        "
                    >
                        {/* EDIT */}
                        <button
                            onClick={() => onEdit(category)}
                            className="
                                w-10 h-10
                                rounded-full
                                flex items-center justify-center

                                bg-white/15
                                backdrop-blur-xl
                                border border-white/20

                                text-white
                                shadow-lg

                                transition-all duration-300
                                hover:bg-blue-500
                                hover:scale-110
                            "
                        >
                            <FiEdit2 size={17} />
                        </button>

                        {/* DELETE */}
                        <button
                            onClick={() => onDelete(category)}
                            className="
                                w-10 h-10
                                rounded-full
                                flex items-center justify-center

                                bg-white/15
                                backdrop-blur-xl
                                border border-white/20

                                text-white
                                shadow-lg

                                transition-all duration-300
                                hover:bg-red-500
                                hover:scale-110
                            "
                        >
                            <FiTrash2 size={17} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}