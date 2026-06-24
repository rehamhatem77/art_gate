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
import { getGuestCartItemQuantity } from "@/Utils/Cart";
import { useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import { addToAuthCart, addToGuestCart } from "@/Utils/Cart";
export default function QuickViewModal({ product, onClose }) {
    const [qty, setQty] = useState(1);
    const { auth } = usePage().props;

    const images = product.images?.length
        ? product.images.map((img) => img.image)
        : product.main_image
          ? [product.main_image]
          : [];

    const [selectedImage, setSelectedImage] = useState(images[0] || null);
    const firstVariant = product?.variants?.[0];

    const [selectedSize, setSelectedSize] = useState(
        firstVariant?.size?.label || "",
    );

    const [selectedFrame, setSelectedFrame] = useState(
        firstVariant?.frame?.type || "",
    );
    const [selectedFrameColor, setSelectedFrameColor] = useState(null);

    const [cartError, setCartError] = useState("");

    const [addingToCart, setAddingToCart] = useState(false);
    const sizes = [...new Set(product?.variants?.map((v) => v.size?.label))];

    const availableFrames =
        product?.variants
            ?.filter((v) => v.size?.label === selectedSize)
            .map((v) => v.frame?.type) || [];

    useEffect(() => {
        const firstFrameForSize = product?.variants?.find(
            (v) => v.size?.label === selectedSize,
        );

        if (firstFrameForSize) {
            setSelectedFrame(firstFrameForSize.frame?.type);
        }
    }, [selectedSize]);

    const selectedVariant = product?.variants?.find(
        (variant) =>
            variant.size?.label === selectedSize &&
            variant.frame?.type === selectedFrame,
    );
    const alreadyInCart = getGuestCartItemQuantity({
        product_id: product.id,
        variant_id: selectedVariant?.id,
        frame_color_code: selectedFrameColor?.code || null,
    });

    const availableQuantity = (selectedVariant?.stock || 0) - alreadyInCart;

    useEffect(() => {
        if (selectedVariant && qty > selectedVariant.stock) {
            setQty(selectedVariant.stock > 0 ? selectedVariant.stock : 1);
        }
    }, [selectedVariant]);

    useEffect(() => {
        setSelectedFrameColor(null);
    }, [selectedFrame]);
    const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
    useEffect(() => {
        setIsWishlisted(product.isWishlisted);
    }, [product]);

    const toggleWishlist = () => {
        if (!auth.user) {
            router.visit(route("login"));
            return;
        }

        setIsWishlisted((prev) => !prev);

        if (isWishlisted) {
            router.delete(route("wishlist.destroy", product.id), {
                preserveScroll: true,
                preserveState: true,
                with: ["wishlistCount"],

                onError: () => {
                    setIsWishlisted(true);
                },
            });
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
                },
            );
        }
    };

    const addToCart = () => {
        if (!selectedVariant) return toast.error("اختر المقاس والإطار");

        if (selectedVariant.stock <= 0) return toast.error("غير متوفر");

        if (qty > selectedVariant.stock)
            return toast.error(`المتاح فقط ${selectedVariant.stock}`);
        // FRAME COLOR VALIDATION
        if (selectedVariant?.frame?.colors?.length > 0 && !selectedFrameColor) {
            setCartError("يرجى اختيار لون الإطار");
            return toast.error("يرجى اختيار لون الإطار");
        }

        const payload = {
            product_id: product.id,
            variant_id: selectedVariant.id,
            quantity: qty,
            frame_color_name: selectedFrameColor?.name || null,
            frame_color_code: selectedFrameColor?.code || null,
            price: selectedVariant.price,
            name: product.name,
            image: product.main_image || product.images?.[0]?.image,
            slug: product.slug,
            size: selectedSize,
            frame: selectedFrame,
            stock: selectedVariant.stock,
        };

        if (auth.user) {
            addToAuthCart({
                ...payload,

                onSuccess: () => {
                    window.dispatchEvent(new CustomEvent("cart-updated"));
                },
            });
        } else {
            const result = addToGuestCart(payload);

            if (!result.success) {
                return toast.error(result.message);
            }

            toast.success("تم إضافة المنتج إلى السلة");
        }
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

max-w-[95vw]
sm:max-w-[90vw]
lg:max-w-4xl

h-[95vh]
sm:h-[90vh]
lg:h-[85vh]

overflow-hidden

bg-white

rounded-2xl
lg:rounded-[28px]

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

grid-cols-1

lg:grid-cols-2

h-full

max-h-[92vh]
                    "
                >
                    {/* LEFT SIDE */}
                    <div
                        className="
bg-[#faf8f5]

p-3
sm:p-4

h-auto
lg:h-full
"
                    >
                        <div
                            className="
grid

grid-cols-1

sm:grid-cols-[60px_1fr]

gap-3
sm:gap-4
"
                        >
                            {/* Thumbs */}
                            <div
                                className="
flex

sm:block

gap-2

sm:space-y-3

overflow-x-auto

sm:overflow-y-auto

pb-2

sm:pb-0

pr-0

sm:pr-1
"
                            >
                                {images?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className="
w-12
h-12

sm:w-14
sm:h-14

shrink-0

overflow-hidden

rounded-xl

sm:rounded-2xl

border
"
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

h-[220px]

sm:h-[300px]

md:h-[380px]

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

p-4

sm:p-5

lg:p-7
"
                        >
                            {/* Title */}
                            <h2
                                className="
                                    text-lg

sm:text-xl

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
                                <span className="mr-2 text-xl">جنيه</span>
                            </div>

                            {/* Description */}
                            <p
                                className="
                                    mt-3

text-xs

sm:text-sm

leading-6

sm:leading-7
                                    text-gray-600
                                  

                                "
                            >
                                {product.description ||
                                    "لا يوجد وصف متاح لهذا المنتج."}
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
                                                setSelectedSize(size)
                                            }
                                            className={`
                                               h-7

sm:h-8

px-2.5

sm:px-3

text-xs

sm:text-sm
                                                rounded-full
                                                border-1
                                                transition

                                                ${
                                                    selectedSize === size
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
                                                setSelectedFrame(frame)
                                            }
                                            className={`
                                               h-7

sm:h-8

px-2.5

sm:px-3

text-xs

sm:text-sm
                                                rounded-full
                                                border-1
                                                transition

                                                ${
                                                    selectedFrame === frame
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
                                                                color,
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

                                    ${
                                        isSelected
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
                                    ${
                                        isSelected
                                            ? "text-[var(--primary)] font-medium"
                                            : "text-gray-500"
                                    }
                                `}
                                                        >
                                                            {color.name}
                                                        </span>
                                                    </button>
                                                );
                                            },
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

                                        w-20

sm:w-24

h-8

                                        border
                                        rounded-full
                                        px-3
                                    "
                                >
                                    <button
                                        onClick={() =>
                                            setQty(Math.max(1, qty - 1))
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
                                                    selectedVariant?.stock || 1,
                                                ),
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
                        {cartError && (
                            <div
                                className="
            mt-3
            p-3
            rounded-xl
            bg-red-50
            border
            border-red-200
            text-red-600
            text-sm
            font-medium
        "
                            >
                                {cartError}
                            </div>
                        )}

                        {/* Sticky Footer */}
                        <div
                            className="
        shrink-0
        border-t
        p-3 sm:p-5
        bg-white
    "
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Wishlist */}
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="
                w-10 h-10
                sm:w-11 sm:h-11

                rounded-full
                border

                flex
                items-center
                justify-center

                shrink-0

                transition
            "
                                >
                                    {isWishlisted ? (
                                        <FaHeart
                                            size={18}
                                            className="text-[var(--primary)]"
                                        />
                                    ) : (
                                        <FiHeart
                                            size={18}
                                            className="hover:text-[var(--primary)]"
                                        />
                                    )}
                                </button>

                                {/* Add To Cart */}
                                <button
                                    onClick={addToCart}
                                    disabled={
                                        !selectedVariant ||
                                        selectedVariant.stock <= 0
                                    }
                                    className={`
                flex-1

                h-10
                sm:h-11

                rounded-full

                flex
                items-center
                justify-center

                gap-2

                text-white
                font-medium

                transition

                ${
                    selectedVariant?.stock > 0
                        ? "bg-[var(--primary)] hover:opacity-90"
                        : "bg-gray-400 cursor-not-allowed"
                }
            `}
                                >
                                    <BiCartAdd size={20} />

                                    {/* Desktop text only */}
                                    <span className="hidden sm:inline">
                                        {selectedVariant?.stock > 0
                                            ? "أضف إلى السلة"
                                            : "نفدت الكمية"}
                                    </span>
                                </button>

                                {/* View Product */}
                                <button
                                    onClick={() =>
                                        router.visit(
                                            route(
                                                "shop.product.show",
                                                product.slug,
                                            ),
                                        )
                                    }
                                    className="
                h-10
                sm:h-11

                px-3
                sm:px-6

                rounded-full

                border-2
                border-[var(--border)]

                text-[var(--primary)]

                font-medium

                flex
                items-center
                justify-center

                gap-2

                shrink-0

                transition

                hover:opacity-80
            "
                                >
                                    <BsEyeFill size={18} />

                                    {/* Desktop text only */}
                                    <span className="hidden sm:inline">
                                        عرض المنتج
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
