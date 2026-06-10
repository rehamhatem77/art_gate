import { motion } from "framer-motion";
import { router } from "@inertiajs/react";
import { FiHeart } from "react-icons/fi";
import { getImage } from "@/Utils/GetImage";

export default function WishlistCard({ product }) {
    const removeFromWishlist = (e) => {
        e.stopPropagation();

        router.delete(route("wishlist.destroy", product.id), {
            preserveScroll: true,
        });
    };

    const openProduct = () => {
        router.visit(route("shop.product.show", product.slug));
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0 },
            }}
            onClick={openProduct}
            className="
                group
                cursor-pointer
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-gray-100
                shadow-sm
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                hover:-translate-y-1
                transition-all
                duration-500
            "
        >
            {/* Image */}
            <div className="relative h-[240px] overflow-hidden">
                <img
                    src={getImage(product.main_image)}
                    alt={product.name}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                    "
                />

                {/* Overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/25
                        via-black/5
                        to-transparent
                    "
                />

                {/* Category */}
                {product.category && (
                    <div
                        className="
                            absolute
                            top-4
                            right-4
                            px-3
                            py-1.5
                            rounded-full
                            bg-white/90
                            backdrop-blur-md
                            text-xs
                            font-medium
                            text-[var(--primary)]
                            shadow-md
                        "
                    >
                        {product.category.name}
                    </div>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 left-4">
                    <div className="relative group/heart ">
                        <button
                            onClick={removeFromWishlist}
                            className="
                                w-9
                                h-9
                                rounded-full
                                bg-white/90
                                backdrop-blur-md
                                flex
                                items-center
                                justify-center
                                shadow-md
                                
                               
                            "
                        >
                            <FiHeart
                                size={18}
                                className="
                                    text-[var(--primary)]
                                    fill-[var(--primary)]
                                     hover:scale-105
                                     transition-all
                                duration-300
                                "
                            />
                        </button>

                        {/* Tooltip */}
                        <div
                            className="
                                absolute
                                top-full
                                left-1/2
                                -translate-x-1/4
                                mt-2
                                whitespace-nowrap
                                px-3
                                py-1.5
                                rounded-full
                                bg-[var(--primary)]
                                text-white
                                text-xs
                                opacity-0
                                pointer-events-none
                                group-hover/heart:opacity-100
                                transition-all
                                duration-300
                            "
                        >
                            إزالة من قائمة الأمنيات
                        </div>
                    </div>
                </div>

                {/* Hover Hint */}
                {/* <div
                    className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        px-5
                        py-2.5
                        rounded-full
                        bg-white/90
                        backdrop-blur-md
                        text-sm
                        font-medium
                        text-[var(--primary)]
                        shadow-lg
                        opacity-0
                        translate-y-5
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        transition-all
                        duration-300
                    "
                >
                    عرض التفاصيل
                </div> */}
            </div>

            {/* Content */}
            <div className="px-6 py-4">
                <h3
                    className="
                        text-lg
                        font-bold
                        text-[var(--primary)]
                        leading-relaxed
                        line-clamp-2
                        min-h-[64px]
                    "
                >
                    {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                   كود المنتج : {product.code}
                </p>

                <div
                    className="
                        mt-3
                        pt-3
                        border-t
                        border-gray-100
                        flex
                        items-end
                        justify-between
                    "
                >
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">
                         السعر يبدأ من
                        </span>

                        <div className="flex items-end gap-1">
                            <span
                                className="
                                    text-xl
                                    font-bold
                                    text-[var(--secondary)]
                                "
                            >
                                {product.price}
                            </span>

                            <span className="text-gray-500 text-sm mb-1">
                                ج.م
                            </span>
                        </div>
                    </div>

                    <span
                        className="
                            text-sm
                            font-medium
                            text-[var(--primary)]
                            group-hover:translate-x-[-4px]
                            transition-transform
                        "
                    >
                        استكشف القطعة ←
                    </span>
                </div>
            </div>
        </motion.div>
    );
}