import { useState } from "react";
import { BiCart, BiCartAdd } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import {
    FiX,
    FiMinus,
    FiPlus,
    FiHeart,
    FiLinkedin,
    FiTwitter,
    FiFacebook,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { getImage } from "@/Utils/GetImage";

import { useEffect } from "react";
export default function QuickViewModal({
    product,
    onClose,
}) {
  
    const [qty, setQty] = useState(1);


    const images =
        product.images?.length
            ? product.images.map(img => img.image)
            : product.main_image
                ? [product.main_image]
                : [];

    const [selectedImage, setSelectedImage] = useState(
        images[0] || null
    );
    const firstVariant = product?.variants?.[0];

    const [selectedSize, setSelectedSize] = useState(
        firstVariant?.size?.label || ""
    );

    const [selectedFrame, setSelectedFrame] = useState(
        firstVariant?.frame?.type || ""
    );

    const sizes = [
        ...new Set(
            product?.variants?.map(v => v.size?.label)
        ),
    ];

    const availableFrames =
        product?.variants
            ?.filter(
                v =>
                    v.size?.label === selectedSize
            )
            .map(v => v.frame?.type) || [];

    useEffect(() => {
        const firstFrameForSize =
            product?.variants?.find(
                v =>
                    v.size?.label === selectedSize
            );

        if (firstFrameForSize) {
            setSelectedFrame(
                firstFrameForSize.frame?.type
            );
        }
    }, [selectedSize]);

    const selectedVariant =
        product?.variants?.find(
            variant =>
                variant.size?.label === selectedSize &&
                variant.frame?.type === selectedFrame
        );
       useEffect(() => {
    if (
        selectedVariant &&
        qty > selectedVariant.stock
    ) {
        setQty(
            selectedVariant.stock > 0
                ? selectedVariant.stock
                : 1
        );
    }
}, [selectedVariant]); 
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
max-w-4xl
h-[85vh]
overflow-hidden
bg-white
rounded-[28px]
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
p-4
h-full
"
                    >
                        <div className="grid grid-cols-[60px_1fr] gap-4">
                            {/* Thumbs */}
                            <div className="space-y-3 overflow-y-auto pr-1">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className="w-14 h-14 overflow-hidden rounded-2xl border"
                                    >
                                        <img
                                            src={getImage(image)}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
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
                                    src={getImage(selectedImage)}
                                    alt={product.name}
                                    className="
                                        w-full
                                        h-[360px]
lg:h-[520px]
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
h-full
overflow-hidden
"
                    >
                        <div
                            className="
        flex-1
        overflow-y-auto
        p-5
        lg:p-7
    "
                        >


                            {/* Title */}
                            <h2
                                className="
                                    text-xl
                                    lg:text-2xl
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
                                    mt-1
                                    text-xl lg:text-2xl
                                    font-bold
                                    text-[var(--secondary)]
                                "
                            >
                                {selectedVariant?.price || product.price}
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
                                {product.description || "لا يوجد وصف متاح لهذا المنتج."}
                            </p>

                            {/* Size */}
                            <div className="mt-4">
                                <h3 className="font-medium text-[var(--text-dark)] mb-1">
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
                                                h-8
px-3
text-sm
                                                rounded-full
                                                border-1
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
                                <h3 className="font-medium text-[var(--text-dark)] mb-1">
                                    الإطار
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {availableFrames.map((frame) => (
                                        <button
                                            key={frame}
                                            onClick={() =>
                                                setSelectedFrame(
                                                    frame
                                                )
                                            }
                                            className={`
                                                h-8
px-3
text-sm
                                                rounded-full
                                                border-1
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
                                <h3 className="font-medium text-[var(--text-dark)] mb-2">
                                    الكمية
                                </h3>

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between

                                        w-24
                                        h-8

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

                                    <span className="font-meduim text-[var(--text-dark)]">
                                        {qty}
                                    </span>

                                    <button
    disabled={
        qty >= (selectedVariant?.stock || 0)
    }
    onClick={() =>
        setQty((prev) =>
            Math.min(
                prev + 1,
                selectedVariant?.stock || 1
            )
        )
    }
    className={`
        transition
        ${
            qty >= (selectedVariant?.stock || 0)
                ? "opacity-40 cursor-not-allowed"
                : ""
        }
    `}
>
    <FiPlus />
</button>
                                </div>
                            </div>

                            {/* Product Meta */}
                            <div className="mt-6 pt-5 border-t border-gray-200">
                                {/* SKU */}
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="font-semibold text-gray-600">
                                        رمز المنتج :
                                    </span>

                                    <span className="text-gray-500">
                                        {product.code}
                                    </span>
                                </div>

                                {/* Categories */}
                                <div className="mt-2 flex items-center gap-3 text-sm">
                                    <span className="font-semibold text-gray-600 whitespace-nowrap">
                                        التصنيفات :
                                    </span>

                                    <span className="text-gray-500 text-left leading-6">
                                        {product.category?.name}
                                        {product.tags?.length
                                            ? `، ${product.tags.map((tag) => tag.name).join("، ")}`
                                            : ""}
                                    </span>
                                </div>


                            </div>


                        </div>

                        {/* Sticky Footer */}
                        <div
                            className="
shrink-0
border-t
p-5
bg-white

"
                        >
                            <div className="flex gap-3">
                                <button
                                    className="
                                        w-10
                                        h-10
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
    disabled={
        !selectedVariant ||
        selectedVariant.stock <= 0
    }
    className={`
        flex-1
        h-10
        rounded-full
        text-white
        font-medium
        text-md
        transition

        ${
            selectedVariant?.stock > 0
                ? "bg-[var(--primary)] hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
        }
    `}
>
    <BiCartAdd
        size={22}
        className="inline-block ml-5"
    />

    {selectedVariant?.stock > 0
        ? "أضف إلى السلة"
        : "نفدت الكمية"}
</button>
                                <button
                                    className="
                                        h-10
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