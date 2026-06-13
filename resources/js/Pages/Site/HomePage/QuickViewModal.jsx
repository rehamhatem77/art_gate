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
import { router, usePage } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
export default function QuickViewModal({
    product,
    onClose,
}) {

    const [qty, setQty] = useState(1);
    const { auth } = usePage().props;


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
    const [selectedFrameColor, setSelectedFrameColor] =
        useState(null);

    const [cartError, setCartError] =
        useState("");

    const [addingToCart, setAddingToCart] = useState(false);
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

    useEffect(() => {
        setSelectedFrameColor(null);
    }, [selectedFrame]);
    const [isWishlisted, setIsWishlisted] = useState(
        product.isWishlisted
    );
    useEffect(() => {
        setIsWishlisted(product.isWishlisted);
    }, [product]);

    const toggleWishlist = () => {
        if (!auth.user) {
            router.visit(route("login"));
            return;
        }

        setIsWishlisted(prev => !prev);

        if (isWishlisted) {
            router.delete(
                route("wishlist.destroy", product.id),
                {
                    preserveScroll: true,
                    preserveState: true,
                    with: ["wishlistCount"],

                    onError: () => {
                        setIsWishlisted(true);
                    },
                }
            );
        } else {
            router.post(
                route("wishlist.store", product.id),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                    with: ["wishlistCount"],

                    onError: () => {
                        setIsWishlisted(false);
                    },
                }
            );
        }
    };


    const addToCart = () => {


        if (!selectedVariant) {
            toast.error("يرجى اختيار المقاس والإطار");
            return;
        }

        if (selectedVariant.stock <= 0) {
            toast.error("هذا المنتج غير متوفر حالياً");
            return;
        }

        if (qty > selectedVariant.stock) {
            toast.error(
                `المتاح فقط ${selectedVariant.stock} قطعة`
            );
            return;
        }
        if (
            selectedVariant?.frame?.colors?.length > 0 &&
            !selectedFrameColor
        ) {
            toast.error(
                "يرجى اختيار لون الإطار"
            );

            return;
        }

        // Logged User
        if (auth.user) {

            router.post(
                route("cart.store"),
                {
                    product_id: product.id,
                    variant_id: selectedVariant.id,
                    quantity: qty,
                    frame_color_name:
                        selectedFrameColor?.name,

                    frame_color_code:
                        selectedFrameColor?.code,
                },
                {
                    preserveScroll: true,
                    preserveState: true,

                    onSuccess: () => {

                        window.dispatchEvent(
                            new CustomEvent("cart-updated")
                        );


                    },

                    onError: (errors) => {

                        const message =
                            errors.message ||
                            Object.values(errors)[0];

                    },
                }
            );

            return;
        }

        // Guest User
        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

       const existingItem = cart.find(
    item =>
        item.product_id === product.id &&
        item.variant_id === selectedVariant.id &&
        item.frame_color_code ===
            selectedFrameColor?.code
);

        if (existingItem) {

            const newQty =
                existingItem.quantity + qty;

            if (newQty > selectedVariant.stock) {

                toast.error(
                    `المتاح فقط ${selectedVariant.stock} قطعة`
                );

                return;
            }

            existingItem.quantity = newQty;

        } else {

           cart.push({
    id: crypto.randomUUID(),

    product_id: product.id,
    variant_id: selectedVariant.id,

    name: product.name,
    image:
        product.main_image ||
        product.images?.[0]?.image,

    slug: product.slug,

    price: selectedVariant.price,

    size: selectedSize,

    frame: selectedFrame,

    frame_color_name:
        selectedFrameColor?.name || null,

    frame_color_code:
        selectedFrameColor?.code || null,

    quantity: qty,

    stock: selectedVariant.stock,
});
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new CustomEvent("cart-updated")
        );

        toast.success(
            "تمت إضافة المنتج إلى السلة بنجاح"
        );


    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
        fixed inset-0
        z-[99]
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
                                {images?.map((image, index) => (
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
                            {selectedVariant?.frame?.colors?.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="font-medium text-[var(--text-dark)] mb-3">
                                        لون الإطار
                                    </h3>

                                    <div className="flex flex-wrap gap-4">
                                        {selectedVariant.frame.colors.map(
                                            (color) => {
                                                const isSelected =
                                                    selectedFrameColor?.code ===
                                                    color.code;

                                                return (
                                                    <button
                                                        key={color.code}
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedFrameColor(
                                                                color
                                                            )
                                                        }
                                                        className="
                                flex
                                flex-col
                                items-center
                                gap-2
                            "
                                                    >
                                                        <div
                                                            className={`
                                    w-10
                                    h-10
                                    rounded-full
                                    border-2
                                    transition

                                    ${isSelected
                                                                    ? "border-[var(--primary)] ring-2 ring-[var(--primary)]"
                                                                    : "border-gray-300"
                                                                }
                                `}
                                                            style={{
                                                                backgroundColor:
                                                                    color.code,
                                                            }}
                                                        />

                                                        <span
                                                            className={`
                                    text-xs
                                    ${isSelected
                                                                    ? "text-[var(--primary)] font-medium"
                                                                    : "text-gray-500"
                                                                }
                                `}
                                                        >
                                                            {color.name}
                                                        </span>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}

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
        ${qty >= (selectedVariant?.stock || 0)
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
                                    onClick={(e) => {

                                        toggleWishlist(product);
                                    }}

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

                                    {isWishlisted ? (
                                        <FaHeart
                                            size={20}
                                            className=" text-[var(--primary)]"
                                        />
                                    ) : (
                                        <FiHeart size={20} className="hover:text-[var(--primary)]" />
                                    )}
                                </button>

                                <button
                                    onClick={addToCart}
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

        ${selectedVariant?.stock > 0
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
                                    onClick={() => {
                                        router.visit(
                                            route(
                                                "shop.product.show",
                                                product.slug
                                            )
                                        )
                                    }}
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