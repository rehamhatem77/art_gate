import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-[26px]
                bg-white

max-h-[600px]
                border border-[#ece6df]
                shadow-[0_4px_18px_rgba(0,0,0,0.04)]
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]
                transition duration-500
            "
        >
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-t-[28px]">
                <img
                    src={product.main_image}
                    alt={product.name}
                    className="
            w-full
            h-[280px]
            object-cover
            transition-transform duration-500
            group-hover:scale-105
        "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* PRODUCT CODE */}
                <div className="absolute top-3 left-3">
                    <div
                        className="
                px-3 py-1.5
                rounded-xl
                bg-[var(--primary)]
                opacity-80
                text-white
                text-[11px]
                tracking-wide
                font-bold
                shadow-lg
                backdrop-blur-sm
            "
                    >
                        كود المنتج: {product.code}
                    </div>
                </div>

                {/* COLORS */}
                {product.design_colors?.length > 0 && (
                    <div className="absolute bottom-3 right-3 flex items-center">
                        {product.design_colors
                            .slice(0, 9)
                            .map((color, index) => (
                                <div
                                    key={index}
                                    className="
                            w-7 h-7
                            rounded-full
                            border-2 border-white
                            shadow-md
                            -mr-2
                            first:mr-0
                        "
                                    style={{
                                        backgroundColor: color,
                                        zIndex: 10 - index,
                                    }}
                                />
                            ))}
                    </div>
                )}
            </div>

            {/* CONTENT */}
           {/* CONTENT */}
<div className="px-5 pt-4 pb-4">
                {/* TITLE */}
                <h2
                    className="
                        text-[20px]
                        leading-[38px]
                        text-[var(--text-dark)]
                        text-start
                        line-clamp-1
                    "
                >
                    {product.name}
                </h2>

                {/* CATEGORY + TAGS */}
                <div
                    className="
                        
                        text-start
                        text-[var(--secondary)]
                        text-[17px]
                        font-medium
                        leading-2
                    "
                >
                    <span>{product.category?.name}</span>

                    {product.tags?.length > 0 && (
                        <>
                            {" ، "}
                            {product.tags
                                .slice(0, 2)
                                .map((tag) => tag.name)
                                .join(" ، ")}
                        </>
                    )}
                </div>

                {/* PRICE */}
                <div className="mt-1 text-start">
                    <h3
                        className="
                            text-[20px]
                            leading-none
                            font-extrabold
                            text-[var(--primary)]
                        "
                    >
                        {Number(
                            product.variants?.[0]?.price || 0,
                        ).toLocaleString("en-US")}
                        <span className="text-[17px] mr-1">جنيه</span>
                    </h3>
                </div>

                {/* PRODUCT CODE */}
                <div className="mt-2 text-start">
                    <span
                        className="
                            text-[16px]
                            text-[var(--accent)]
                            font-semibold
                        "
                    >
                        كود المنتج :
                    </span>

                    <span
                        className="
                            text-[16px]
                            text-[var(--accent)]
                            mr-1
                        "
                    >
                        {product.code}
                    </span>
                </div>

                {/* SEPARATOR */}
                <div className="mt-3 border-t border-[#eee7e1]" />

                {/* FOOTER */}
                <div className="pt-4 flex items-center justify-between min-h-[48px]">
                    {/* STATUS */}
                    <div>
                        {product.featured ? (
                            <div
                                className="
                                    px-4 py-1
                                    rounded-full
                                    bg-[var(--bg-light)]
                                    text-[var(--primary)]
                                    text-sm
                                    font-bold
                                "
                            >
                                منتج مميز
                            </div>
                        ) : (
                            <div
                                className="
                                    px-4 py-1
                                    rounded-full
                                    bg-[var(--bg-lighter)]
                                    text-[var(--secondary)]
                                    text-sm
                                    font-medium
                                "
                            >
                                عادي
                            </div>
                        )}
                    </div>
                    {/* ACTIONS */}
                    <div
                        className="
                            flex items-center gap-2
                           
                            
                            transition-all duration-300
                        "
                    >
                        {/* EDIT */}
                        <button
                            onClick={onEdit}
                            className="
                                w-8 h-8
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                                hover:bg-blue-600
                                hover:text-white
                                flex items-center justify-center
                                transition-all
                            "
                        >
                            <FiEdit2 size={17} />
                        </button>

                        {/* DELETE */}
                        <button
                            onClick={onDelete}
                            className="
                                w-8 h-8
                                rounded-xl
                                bg-red-50
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                                flex items-center justify-center
                                transition-all
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
