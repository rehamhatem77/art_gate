import { useState } from "react";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import {
    FiChevronLeft,
    FiChevronRight,
    FiMaximize2,
    FiX,
} from "react-icons/fi";
import { getImage } from "@/Utils/GetImage";

export default function ProductGallery({
    product,
}) {
    const images = [
        product.main_image,
        ...(product.images || []).map(
            (img) => img.image
        ),
    ].filter(Boolean);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [isFullscreen, setIsFullscreen] =
        useState(false);

    const selectedImage =
        images[currentIndex];

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? images.length - 1
                : prev - 1
        );
    };

    const handleDragEnd = (
        _,
        info
    ) => {
        if (info.offset.x < -80) {
            nextImage();
        }

        if (info.offset.x > 80) {
            prevImage();
        }
    };

    return (
        <>
            <div
                className="
                    flex
                    flex-col-reverse
                    lg:flex-row
                    gap-4
                "
            >
                {/* Thumbnails */}

                <div
                    className="
                        flex
                        lg:flex-col
                        gap-3
                        overflow-x-auto
                        lg:overflow-visible
                        pb-2
                    "
                >
                    {images.map(
                        (
                            image,
                            index
                        ) => (
                            <button
                                key={
                                    index
                                }
                                onClick={() =>
                                    setCurrentIndex(
                                        index
                                    )
                                }
                                className={`
                                    relative
                                    shrink-0
                                    w-20
                                    h-20
                                    lg:w-24
                                    lg:h-24
                                    rounded-2xl
                                    overflow-hidden
                                    border-2
                                    transition-all

                                    ${currentIndex ===
                                        index
                                        ? "border-[var(--primary)]"
                                        : "border-gray-200"
                                    }
                                `}
                            >
                                <img
                                    src={getImage(
                                        image
                                    )}
                                    alt=""
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />
                            </button>
                        )
                    )}
                </div>

                {/* Main Image */}

                <div className="flex-1">
                    <div
                        className="
                            relative
                            bg-[#f7f5f2]
                            rounded-[28px]
                            overflow-hidden
                            group
                            
                     
                            
                        "
                    >
                        {/* Product Code */}

                        {product.code && (
                            <div
                                className="
                                    absolute
                                    top-5
                                    left-5
                                    z-20
                                    bg-[var(--primary)]
                                    opacity-85
                                    text-white
                                    px-4
                                    py-2
                                    rounded-xl
                                    text-sm
                                    font-medium
                                "
                            >
                                كود المنتج:
                                {" "}
                                {
                                    product.code
                                }
                            </div>
                        )}

                        {/* Arrows */}

                        {images.length >
                            1 && (
                                <>
                                    <button
                                        onClick={
                                            prevImage
                                        }
                                        className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    z-20

    w-11
    h-11

    bg-white/55
    rounded-full
    shadow-lg

    flex
    items-center
    justify-center

    opacity-100

    lg:opacity-0
    lg:translate-x-2
    lg:group-hover:translate-x-0
    lg:group-hover:opacity-100

    transition-all
    duration-300
"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>

                                    <button
                                        onClick={
                                            nextImage
                                        }
                                        className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    z-20

    w-11
    h-11

    bg-white/55
    rounded-full
    shadow-lg

    flex
    items-center
    justify-center

    opacity-100

    lg:opacity-0
    lg:-translate-x-2
    lg:group-hover:translate-x-0
    lg:group-hover:opacity-100

    transition-all
    duration-300
"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                </>
                            )}

                        {/* Fullscreen */}

                        <button
                            onClick={() => setIsFullscreen(true)}
                            className="
        absolute
        bottom-4
        right-4
        z-20

        h-10
        w-10
        hover:w-32

        rounded-full
        bg-white/90
        backdrop-blur-sm
        shadow-xl

        flex
        items-center
        justify-start

        overflow-hidden

        transition-[width]
        duration-300
        ease-out

        group/zoom
    "
                        >
                            <div
                                className="
            w-10
            h-10
            flex
            items-center
            justify-center
            shrink-0
        "
                            >
                                <FiMaximize2 size={20} />
                            </div>

                            <span
                                className="
            whitespace-nowrap
            text-sm
            font-medium

            opacity-0
            translate-x-2

            group-hover/zoom:opacity-100
group-hover/zoom:translate-x-0

            transition-all
            duration-300
        "
                            >
                                اضغط للتكبير
                            </span>
                        </button>
                        {/* Image */}

                        <AnimatePresence mode="wait">
                            <motion.img
                                key={
                                    selectedImage
                                }
                                drag="x"
                                dragConstraints={{
                                    left: 0,
                                    right: 0,
                                }}
                                onDragEnd={
                                    handleDragEnd
                                }
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                src={getImage(
                                    selectedImage
                                )}
                                alt={
                                    product.name
                                }
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    cursor-grab
                                "
                            />
                        </AnimatePresence>

                        {/* Dots */}

                        {images.length >
                            1 && (
                                <div
                                    className="
                                    absolute
                                    bottom-6
                                    left-1/2
                                    -translate-x-1/2
                                    flex
                                    gap-2
                                "
                                >
                                    {images.map(
                                        (
                                            _,
                                            index
                                        ) => (
                                            <button
                                                key={
                                                    index
                                                }
                                                onClick={() =>
                                                    setCurrentIndex(
                                                        index
                                                    )
                                                }
                                                className={`
                                               h-2.5 rounded-full transition-all
                                               
                                                 
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

                                                ${currentIndex ===
                                                        index
                                                        ? "w-6 bg-[var(--primary)]"
                                                        : "w-2.5 bg-gray-300"
                                                    }
                                            `}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}

            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="
                            fixed
                            inset-0
                            z-[999]
                            bg-black/90
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                    >
                        <button

                            onClick={() =>
                                setIsFullscreen(
                                    false
                                )
                            }
                            className="
                                absolute
                                top-6
                                right-6
                                text-white
                            "
                        >
                            <FiX
                                size={34}
                            />
                        </button>

                        <img
                            src={getImage(
                                selectedImage
                            )}
                            alt=""
                            className="
                                max-w-full
                                max-h-full
                                object-contain
                            "
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}