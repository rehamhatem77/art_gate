import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

export default function ProductCard({ product ,onQuickView}) {
    return (
        <div
            className="
                group
                rounded-2xl
                transition-all
                duration-300
            "
        >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white">
                {/* Product Code */}
                <div
                    className="
                        absolute
                        top-3
                        left-3
                        z-30
                        bg-[var(--primary)]
                        opacity-90
                        text-white
                        text-xs
                        sm:text-sm
                        px-3
                        py-2
                        rounded-xl
                        font-semibold
                        shadow-lg
                    "
                >
                    كود المنتج: is{product.id}
                </div>

                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="
                        w-full
                        h-[180px]
                        sm:h-[220px]
                        md:h-[250px]
                        lg:h-[280px]
                        object-cover
                        transition-all
                        duration-500

                        lg:group-hover:h-[240px]
                        lg:group-hover:scale-105
                    "
                />

                {/* Overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-black/10
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                    "
                />

                {/* Arrows - Desktop Only */}
                <button
                    className="
                        hidden lg:flex
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        z-20
                        w-9 h-9
                        rounded-full
                        bg-white/90
                        items-center
                        justify-center
                        shadow-md
                        opacity-0
                        -translate-x-3
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                        duration-300
                    "
                >
                    <FiChevronLeft size={18} />
                </button>

                <button
                    className="
                        hidden lg:flex
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        z-20
                        w-9 h-9
                        rounded-full
                        bg-white/90
                        items-center
                        justify-center
                        shadow-md
                        opacity-0
                        translate-x-3
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                        duration-300
                    "
                >
                    <FiChevronRight size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="pt-3 text-right">
                <h3
                    className="
                        text-base
                        md:text-lg
                        font-bold
                        text-[var(--text-dark)]
                        line-clamp-2
                        mb-2
                        leading-7
                    "
                >
                    {product.name}
                </h3>

                <p
                    className="
                        text-sm
                        text-[var(--accent)]
                        line-clamp-1
                        mb-2
                    "
                >
                    {product.category}
                </p>

                <div
                    className="
                        text-lg
                        md:text-xl
                        font-bold
                        text-[var(--secondary)]
                    "
                >
                    {product.price}
                    <span className="mr-1 text-base">
                        جنيه
                    </span>
                </div>

                {/* Fixed Button Area */}
                <div className="h-14 mt-3 overflow-hidden">
                    <button
                    onClick={() => onQuickView(product)}
                        className="
                            w-full
                            h-11
                            rounded-full
                            bg-[var(--primary)]
                            text-white
                            font-semibold
                            text-sm
                            transition-all
                            duration-300

                            lg:opacity-0
                            lg:translate-y-5

                            lg:group-hover:opacity-100
                            lg:group-hover:translate-y-0

                            opacity-100
                            translate-y-0

                            hover:opacity-90
                        "
                    >
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        </div>
    );
}