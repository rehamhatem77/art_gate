import { iconsMap } from "@/Components/IconPicker";
import { getImage } from "@/Utils/GetImage";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CategoryCard({ category, onEdit, onDelete }) {
    const isImageIcon =
        category.icon &&
        (
            category.icon.includes("category-icons/") ||
            category.icon.endsWith(".png") ||
            category.icon.endsWith(".jpg") ||
            category.icon.endsWith(".jpeg") ||
            category.icon.endsWith(".webp") ||
            category.icon.endsWith(".svg")
        );

    const IconComponent =
        !isImageIcon && category.icon
            ? iconsMap[category.icon]
            : null;
    return (
        <div
            className="
                group
                relative
                flex flex-col items-center
                transition-all duration-500
            "
        >

            <div
                className="
                    absolute inset-0
                    rounded-full
                    bg-[var(--secondary)]
                    blur-2xl
                    scale-75
                    opacity-0
                    transition-all duration-500
                    group-hover:opacity-100
                    
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
                    shadow-[0_7px_30px_rgba(0,0,0,0.12)]
                    ring-2 ring-white
                    transition-all duration-500
                    group-hover:-translate-y-1
                    group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.22)]
                "
            >

                <img
                    src={getImage(category.image)}
                    alt={category.name}
                    className="
                        w-full h-full
                        object-cover
                        transition-all duration-700
                        scale-70
                        group-hover:scale-110
                    "
                />

                {/* SMOOTH DARK OVERLAY */}
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/50
                        to-transparent
                        opacity-70
                        transition-all duration-500
                        group-hover:opacity-90
                    "
                />
                {category.icon && (
                    <div
                        className="
            absolute
            top-5
            right-5
            p-2
            rounded-full
            bg-white/90
            backdrop-blur-lg
            shadow-xl
            z-20
            transition-all
            duration-500
            group-hover:-translate-y-1
            group-hover:scale-105
        "
                    >
                        {isImageIcon ? (
                            <img
                                src={getImage(category.icon)}
                                alt={category.name}
                                className="w-5 h-5 object-contain"
                            />
                        ) : (
                            IconComponent && (
                                <IconComponent
                                    size={20}
                                    className="text-[var(--primary)]"
                                />
                            )
                        )}
                    </div>
                )}

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
                            px-6 py-2
                            rounded-full
                            bg-[var(--secondary)]
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

                        <button
                            onClick={() => onEdit(category)}
                            className="
                                w-8 h-8
                                rounded-full
                                flex items-center justify-center

                                bg-[var(--accent)]
                
                                border border-white/20

                                text-white
                                shadow-lg

                                transition-all duration-300
                                hover:bg-blue-600
                                hover:scale-110
                            "
                        >
                            <FiEdit2 size={14} />
                        </button>


                        <button
                            onClick={() => onDelete(category)}
                            className="
                                w-8 h-8
                                rounded-full
                                flex items-center justify-center

                                bg-[var(--accent)]
                                border border-white/20

                                border border-white/20

                                text-white
                                shadow-lg

                                transition-all duration-300
                                hover:bg-red-600
                                hover:scale-110
                            "
                        >
                            <FiTrash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
