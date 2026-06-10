import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";

import { FaHeart } from "react-icons/fa";

export default function ProductCard({ product, onQuickView }) {
    const allImages = [
        product.main_image,
        ...(product.images || []).map((img) => img.image),
    ].filter(Boolean);

    const [currentImage, setCurrentImage] = useState(0);
    const { auth } = usePage().props;

    const nextImage = (e) => {
        e.stopPropagation();

        setCurrentImage((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1,
        );
    };

    const prevImage = (e) => {
        e.stopPropagation();

        setCurrentImage((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1,
        );
    };


   const toggleWishlist = (product) => {
    if (!auth.user) {
        router.visit(route("login"));
        return;
    }

    if (product.isWishlisted) {
        router.delete(
            route("wishlist.destroy", product.id),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    } else {
        router.post(
            route("wishlist.store", product.id),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }
};
    return (
        <div
            className="
    group
    rounded-2xl
    transition-all
    duration-500
    ease-out
"
        >
            <div
                onClick={() =>
                    router.visit(route("shop.product.show", product.slug))
                }
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
                        كود المنتج: {product.code}
                    </div>
                    <button

                        onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}

                        className="
                            absolute
                            top-3
                            right-3
                            z-30
                            text-[var(--secondary)]
                            transition-all
                            duration-300
bg-white
h-8
w-8
rounded-full
flex
items-center
justify-center
shadow-md


                            opacity-100
                            lg:opacity-0
                            lg:group-hover:opacity-100
                        "
                    >
                        {product.isWishlisted ? (
                            <FaHeart
                                size={20}
                                className="text-[var(--primary)]"
                            />
                        ) : (
                            <FiHeart size={20} />
                        )}
                    </button>

                    {/* Product Image */}
                    <img
                        src={`/storage/${allImages[currentImage]}`}
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
                    {product.images?.length > 0 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        z-20

        w-9
        h-9
        rounded-full
        bg-white/90

        flex
        items-center
        justify-center

        shadow-md

        opacity-100
        lg:opacity-0

        lg:-translate-x-3
        lg:group-hover:translate-x-0

        lg:group-hover:opacity-100

        transition-all
        duration-300
    "
                            >
                                <FiChevronLeft size={18} />
                            </button>

                            <button
                                onClick={nextImage}
                                className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        z-20

        w-9
        h-9
        rounded-full
        bg-white/90

        flex
        items-center
        justify-center

        shadow-md

        opacity-100
        lg:opacity-0

        lg:translate-x-3
        lg:group-hover:translate-x-0

        lg:group-hover:opacity-100

        transition-all
        duration-300
    "
                            >
                                <FiChevronRight size={18} />
                            </button>
                        </>
                    )}

                    {allImages.length > 1 && (
                        <div
                            className="
        absolute
        bottom-3
        left-1/2
        -translate-x-1/2

        flex
        gap-1

        z-20

        opacity-100
        lg:opacity-0
        lg:group-hover:opacity-100

        transition-all
        duration-300
    "
                        >
                            {allImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 rounded-full transition-all ${currentImage === index
                                        ? "w-5 bg-white"
                                        : "w-1.5 bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="pt-3 px-2 text-right">
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

                    <p className="text-sm text-[var(--accent)] mb-2 px-2 line-clamp-1">
                        {[
                            product.category?.name,
                            ...(product.tags?.slice(0, 2).map((tag) => tag.name) ||
                                []),
                        ]
                            .filter(Boolean)
                            .join(" , ")}
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
                        <span className="mr-1 text-base">جنيه</span>
                    </div>

                    {/* Fixed Button Area */}
                    <div className="h-14 mt-3 overflow-hidden">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onQuickView(product);
                            }}
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
                </div></div>
        </div>
    );
}
