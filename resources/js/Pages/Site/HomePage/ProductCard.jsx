import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";

export default function ProductCard({ product, onQuickView }) {
    const allImages = [
        product.main_image,
        ...(product.images || []).map((img) => img.image),
    ].filter(Boolean);

    const [currentImage, setCurrentImage] = useState(0);

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

    return (
        <div className="group">
            <div
                className="
      relative overflow-hidden hover:border-b border-[var(--border)]
    "
            >
                {/* IMAGE AREA */}
                <div className="relative overflow-hidden">
                    {/* Product Code */}
                    <div
                        className="
                            absolute
                            top-3
                            left-3
                            z-30
                            bg-[var(--primary)]
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
                        كود المنتج: IS{product.id}
                    </div>

                    {/* Wishlist */}
                    <button
                        className="
                            absolute
                            top-3
                            right-3
                            z-30
                            text-[var(--secondary)]
                            transition-all
                            duration-300
bg-white
h-10
w-10
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
                        <FiHeart size={24} />
                    </button>

                    {/* Product Image */}
                    <img
                        src={`/storage/${allImages[currentImage]}`}
                        alt={product.name}
                        className="
        w-full
        h-[400px]
        object-cover
       
     
    "
                    />

                    {/* Overlay */}
                    {/* <div
                        className="
                            absolute
                            inset-0

                            bg-black/20

                            opacity-0
                            group-hover:opacity-100

                            transition-all
                            duration-500
                        "
                    /> */}

                    {/* Gradient for content overlay */}
                    <div
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            h-40

                            bg-gradient-to-t
                            from-black/70
                            via-black/30
                            to-transparent

                            opacity-0
                            group-hover:opacity-100

                            transition-all
                            duration-500
                        "
                    />

                    {/* Arrows */}
                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="
                                    absolute
                                    left-3
                                    top-1/3
                                    -translate-y-1/2

                                    z-30

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
                                    top-1/3
                                    -translate-y-1/2
                                    z-30
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

                    {/* Dots */}
                    {/* {allImages.length > 1 && (
                        <div
                            className="
                                absolute
                                bottom-3
                                left-1/2
                                -translate-x-1/2

                                flex
                                gap-1

                                z-30

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
                                    className={`h-1.5 rounded-full transition-all ${
                                        currentImage === index
                                            ? "w-5 bg-white"
                                            : "w-1.5 bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                    )} */}
                </div>

                {/* CONTENT SECTION */}
                <div
                    className="
        absolute
        bottom-0
        left-0
        right-0
        bg-[var(--bg-light)]
        px-5
        pt-3
        pb-4
        z-40
    "
                >
                    <div
    className="
        overflow-hidden

        max-h-[180px]

        lg:max-h-[120px]
        lg:group-hover:max-h-[180px]

        lg:transition-all
        lg:duration-500
    "
>
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
            mb-2
            line-clamp-1
        "
                        >
                            {[
                                product.category?.name,
                                ...(product.tags
                                    ?.slice(0, 2)
                                    .map((tag) => tag.name) || []),
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

                        {/* Button Container */}
                        <div
    className="
        overflow-hidden

        max-h-20
        opacity-100
        mt-4

        lg:max-h-0
        lg:opacity-0
        lg:mt-0

        lg:group-hover:max-h-20
        lg:group-hover:opacity-100
        lg:group-hover:mt-4

        lg:transition-all
        lg:duration-500
    "
>
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

        hover:opacity-90
    "
>
    أضف إلى السلة
</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
