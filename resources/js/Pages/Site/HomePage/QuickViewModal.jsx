import { useState } from "react";
import { BiCart, BiCartAdd } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import {
    FiX,
    FiMinus,
    FiPlus,
    FiHeart,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";


export default function QuickViewModal({
    product,
    onClose,
}) {
    const [qty, setQty] = useState(1);

    const [selectedImage, setSelectedImage] = useState(
        product.image
    );

    const [selectedSize, setSelectedSize] =
        useState("50 × 70");

    const [selectedFrame, setSelectedFrame] =
        useState("أسود");

    const images = [
        product.image,
        product.image,
        product.image,
        product.image,
    ];

    const sizes = [
        "30 × 40",
        "40 × 60",
        "50 × 70",
        "70 × 100",
    ];

    const frames = [
        "أسود",
        "أبيض",
        "ذهبي",
        "بدون إطار",
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
        fixed inset-0
        z-[9999]
        flex items-center justify-center
        p-4
        bg-black/50
        backdrop-blur-sm
    "
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{
                    opacity: 0,
                    scale: 0.96,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.96,
                    y: 15,
                }}
                transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
        relative
        w-full
        max-w-5xl
        max-h-[90vh]
        overflow-hidden
        bg-white
        rounded-[32px]
        shadow-[0_25px_80px_rgba(0,0,0,.18)]
    "
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="
    absolute
    top-4
    left-4
    z-50
    w-10
    h-10
    rounded-full
    bg-white/90
    backdrop-blur-sm
    shadow-md
    flex
    items-center
    justify-center
    hover:scale-110
    transition-all
    duration-300
"
                >
                    <FiX size={22} />
                </button>

                <div
                    className="
                        grid
                        lg:grid-cols-2
                        h-full
                        max-h-[92vh]
                    "
                >
                    {/* LEFT SIDE */}
                    <div
                        className="
                            bg-[#faf8f5]
                            p-5
                            overflow-y-auto
                        "
                    >
                        <div className="grid grid-cols-[60px_1fr] gap-4">
                            {/* Thumbs */}
                            <div className="space-y-3">
                                {images.map(
                                    (image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImage(
                                                    image
                                                )
                                            }
                                            className="
                                                w-14
                                                h-14
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                            "
                                        >
                                            <img
                                                src={image}
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
                            <div
                                className="
                                    overflow-hidden
                                    rounded-3xl
                                    bg-white
                                "
                            >
                                <motion.img
                                    key={selectedImage}
                                    initial={{
                                        opacity: 0,
                                        scale: 1.03,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    src={selectedImage}
                                    alt={product.name}
                                    className="
                                        w-full
                                        h-[260px]
lg:h-[480px]
                                        object-cover

                                        transition-all
                                        duration-700
                                        hover:scale-105
                                    "
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        className="
                            flex
                            flex-col
                            overflow-y-auto
                        "
                    >
                        <div className="p-5 lg:p-7">
                            {/* Badge */}
                            <div
                                className="
                                    inline-flex
                                    px-4
                                    py-1
                                    rounded-full
                                    bg-[var(--accent)]
                                    text-white
                                    text-sm
                                    mb-2
                                "
                            >
                                كود المنتج #{product.id}
                            </div>

                            {/* Title */}
                            <h2
                                className="
                                    text-xl
                                    lg:text-3xl
                                    font-bold
                                    text-[var(--primary)]
                                    leading-relaxed
                                "
                            >
                                {product.name}
                            </h2>

                            {/* Price */}
                            <div
                                className="
                                    mt-4
                                    text-xl lg:text-3xl
                                    font-bold
                                    text-[var(--secondary)]
                                "
                            >
                                {product.price}
                                <span className="mr-2 text-xl">
                                    جنيه
                                </span>
                            </div>

                            {/* Description */}
                            <p
                                className="
                                    mt-4
                                    text-gray-600
                                    text-sm
leading-7
                                "
                            >
                                تصميم فني مميز بجودة طباعة
                                عالية وخامات فاخرة تناسب
                                جميع المساحات الداخلية.
                            </p>

                            {/* Size */}
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">
                                    المقاس
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() =>
                                                setSelectedSize(
                                                    size
                                                )
                                            }
                                            className={`
                                                h-10
px-4
text-sm
                                                rounded-full
                                                border-2
                                                transition

                                                ${selectedSize ===
                                                    size
                                                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                                    : "border-gray-200"
                                                }
                                            `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Frame */}
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">
                                    الإطار
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {frames.map((frame) => (
                                        <button
                                            key={frame}
                                            onClick={() =>
                                                setSelectedFrame(
                                                    frame
                                                )
                                            }
                                            className={`
                                                h-10
px-4
text-sm
                                                rounded-full
                                                border-2
                                                transition

                                                ${selectedFrame ===
                                                    frame
                                                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                                    : "border-gray-200"
                                                }
                                            `}
                                        >
                                            {frame}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">
                                    الكمية
                                </h3>

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between

                                        w-32
                                        h-10

                                        border
                                        rounded-full
                                        px-3
                                    "
                                >
                                    <button
                                        onClick={() =>
                                            setQty(
                                                Math.max(
                                                    1,
                                                    qty - 1
                                                )
                                            )
                                        }
                                    >
                                        <FiMinus />
                                    </button>

                                    <span className="font-bold">
                                        {qty}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setQty(qty + 1)
                                        }
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div
                            className="
                                mt-auto
                                border-t
                                p-6
                                bg-white
                            "
                        >
                            <div className="flex gap-3">
                                <button
                                    className="
                                        w-14
                                        h-14
                                        rounded-full
                                        border
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FiHeart size={20} className="hover:text-[var(--primary)]" />
                                </button>

                                <button
                                    className="
                                        flex-1
                                        h-14
                                        rounded-full
                                        bg-[var(--primary)]
                                        text-white

                                        font-semibold
                                        text-lg

                                        hover:opacity-90
                                        transition
                                    "
                                >
                                    <BiCartAdd size={22} className="inline-block ml-5" />
                                    أضف إلى السلة
                                </button>
                                <button
                                    className="
                                        h-14
                                        rounded-full
                                        text-[var(--primary)]
                                            border-2 border-[var(--border)]
                                            px-6
                                    font-medium
                                      transition
                                      hover:opacity-80
                                    "
                                >
                                    <BsEyeFill size={18} className="inline-block ml-3" />
                                    عرض المنتج
                                </button>

                            </div>


                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}