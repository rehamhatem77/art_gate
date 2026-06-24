import { useEffect, useState } from "react";
import { FiCheck, FiHeart, FiMinus, FiPlus } from "react-icons/fi";

import { BiCartAdd } from "react-icons/bi";

import { FaWhatsapp } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { getGuestCartItemQuantity } from "@/Utils/Cart";
import { router, usePage } from "@inertiajs/react";
import { FaHeart } from "react-icons/fa6";
import { addToAuthCart, addToGuestCart } from "@/Utils/Cart";
import toast from "react-hot-toast";
export default function ProductInfo({ product }) {
    const firstVariant = product?.variants?.[0];

    const [qty, setQty] = useState(1);

    const [selectedSize, setSelectedSize] = useState(
        firstVariant?.size?.label || "",
    );
    const { auth, footer } = usePage().props;

    const [isWishlisted, setIsWishlisted] = useState(
        product.isWishlisted || false,
    );

    const [selectedFrame, setSelectedFrame] = useState(
        firstVariant?.frame?.type || "",
    );

    const sizes = [...new Set(product?.variants?.map((v) => v.size?.label))];

    const frameOptions =
        product?.variants?.filter((v) => v.size?.label === selectedSize) || [];
    const [selectedFrameColor, setSelectedFrameColor] = useState(null);
    const [cartError, setCartError] = useState("");

    useEffect(() => {
        if (frameOptions.length) {
            setSelectedFrame(frameOptions[0]?.frame?.type);
        }
    }, [selectedSize]);

    const selectedVariant = product?.variants?.find(
        (variant) =>
            variant.size?.label === selectedSize &&
            variant.frame?.type === selectedFrame,
    );
    //         useEffect(() => {
    //     if (selectedVariant?.frame?.colors?.length > 0) {
    //         setSelectedFrameColor(
    //             selectedVariant.frame.colors[0]
    //         );
    //     } else {
    //         setSelectedFrameColor("");
    //     }
    // }, [selectedVariant]);

    const total = (selectedVariant?.price || 0) * qty;

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
            },
        },
    };

    const toggleWishlist = () => {
        if (!auth.user) {
            router.visit(route("login"));
            return;
        }

        if (isWishlisted) {
            router.delete(route("wishlist.destroy", product.id), {
                preserveScroll: true,
                with: ["wishlistCount"],

                onSuccess: () => {
                    setIsWishlisted(false);
                },
            });
        } else {
            router.post(
                route("wishlist.store", product.id),
                {},
                {
                    preserveScroll: true,
                    with: ["wishlistCount"],

                    onSuccess: () => {
                        setIsWishlisted(true);
                    },
                },
            );
        }
    };

    const alreadyInCart = getGuestCartItemQuantity({
        product_id: product.id,
        variant_id: selectedVariant?.id,
        frame_color_code: selectedFrameColor?.code || null,
    });

    const availableQuantity = (selectedVariant?.stock || 0) - alreadyInCart;

    useEffect(() => {
        if (!selectedVariant?.frame?.colors?.length) {
            setSelectedFrameColor(null);
        }
    }, [selectedVariant]);
    const addToCart = () => {
        setCartError("");

        if (!selectedVariant) {
            setCartError("يرجى اختيار المقاس والإطار");
            return toast.error("يرجى اختيار المقاس والإطار");
        }

        if (selectedVariant.stock <= 0) {
            return toast.error("المنتج غير متوفر حالياً");
        }

        if (qty > selectedVariant.stock) {
            return toast.error(`المتاح فقط ${selectedVariant.stock}`);
        }

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
    const orderViaWhatsapp = () => {
        const phone = footer?.whatsapp?.replace(/\D/g, "") || "201000000000";

        const message = `
مرحباً، أريد طلب هذا المنتج:

📌 الاسم: ${product.name}
🔢 الكود: ${product.code}
📏 المقاس: ${selectedSize}
🖼️ نوع الإطار: ${selectedFrame}
${selectedFrameColor ? `🎨 لون الإطار: ${selectedFrameColor.name}` : ""}
🔢 الكمية: ${qty}
💰 السعر الإجمالي: ${total} جنيه

🔗 المنتج:
${window.location.href}
`;

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank",
        );
    };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.15,
            }}
            className="
        lg:sticky
        lg:top-24
        h-fit
        rtl
    "
        >
            {/* Breadcrumb */}

            <motion.div
                variants={itemVariants}
                className="
                    text-md
                    text-gray-400
                    mb-5
                    flex
                    flex-wrap
                    gap-2
                "
            >
                <button
                    onClick={() => router.visit(route("home"))}
                    className="hover:text-gray-600 transition"
                >
                    الرئيسية
                </button>
                <span>/</span>

                <button
                    className="hover:text-gray-600 transition"
                    onClick={() =>
                        router.visit(
                            route("shop", { category: product?.category?.id }),
                        )
                    }
                >
                    {product?.category?.name}
                </button>

                <span>/</span>

                <span className="text-gray-600">{product.name}</span>
            </motion.div>

            {/* Title */}

            <motion.h1
                variants={itemVariants}
                className="
                    text-3xl
                    lg:text-4xl
                    font-bold
                    text-black/80
                    leading-relaxed
                "
            >
                {product.name}
            </motion.h1>

            {/* Price */}

            <motion.div
                variants={itemVariants}
                className="
                    mt-4
                    text-2xl
                    lg:text-3xl
                    font-bold
                    text-[var(--primary)]
                "
            >
                {selectedVariant?.price}

                <span
                    className="
                        mr-2
                        text-lg
                        font-bold
                    "
                >
                    جنيه
                </span>
            </motion.div>

            {/* Description */}

            <motion.div
                variants={itemVariants}
                className="
                    mt-4
                    text-md
                    leading-8

                    text-[var(--text-dark)]
                "
            >
                {product.description}
            </motion.div>

            {/* Notes Box */}

            <motion.div
                variants={itemVariants}
                className="
                    mt-6
                    bg-[#edf2f7]
                    border
                    border-[#dbe3ea]
                    rounded-2xl
                    p-5
                    text-sm
                    text-gray-700
                    leading-8
                "
            >
                <div className="flex gap-3 align-center justify-center ">
                    <p>
                        الصور المعروضة (صور توضيحية) أختر مقاسات وألوان البراويز
                        حسب إختيارك.
                    </p>
                </div>

                {/* <div className="flex gap-3 mt-4">
                    <FiShield
                        className="
                            shrink-0
                            mt-1
                        "
                    />

                    <p>
                        خامات
                        عالية
                        الجودة
                        مع ضمان
                        سلامة
                        المنتج
                        أثناء
                        الشحن.
                    </p>
                </div> */}
            </motion.div>

            {/* Size */}

            <motion.div variants={itemVariants} className="mt-6">
                <h3
                    className="
                        font-bold
                        text-2xl
                        mb-2
                        text-[var(--primary)]
                    "
                >
                    اختر مقاس البرواز *
                </h3>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`
                                   min-w-[70px]
sm:min-w-[85px]

h-9
sm:h-10

px-2
sm:px-3
                                    px-3
                                    rounded-md
                                    border
                                    text-sm
                                    transition-all

                                    ${
                                        selectedSize === size
                                            ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                                            : "bg-[var(bg-lighter)] border-[var(--border)]"
                                    }
                                `}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Frame */}

            <motion.div variants={itemVariants} className="mt-6">
                <h3
                    className="
                        font-bold
                        text-2xl
                        mb-2
                        text-[var(--primary)]
                    "
                >
                    اختر نوع الإطار
                </h3>

                <div
                    className="
                        grid
                        grid-cols-5
                        gap-3
                       items-center
                       

                    "
                >
                    {frameOptions.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => setSelectedFrame(variant.frame.type)}
                        >
                            <img
                                src={
                                    variant.frame.type.trim() === "بدون اطار" ||
                                    variant.frame.type.trim() === "بدون إطار"
                                        ? "/storage/noframe.jpg"
                                        : variant.frame.type.trim() ===
                                                "باطار" ||
                                            variant.frame.type.trim() ===
                                                "بإطار" ||
                                            variant.frame.type.trim() ===
                                                "إطار" ||
                                            variant.frame.type.trim() === "اطار"
                                          ? "/storage/frame.jpg"
                                          : "/storage/acrylic-frame-139x150.jpg"
                                }
                                alt={variant.frame.type}
                                className={`
                                    
                                    rounded-xl
                                   
                                   w-full
                                    border-2
                                    items-center
                                    justify-center
                                    transition

                                    ${
                                        selectedFrame === variant.frame.type
                                            ? "border-[var(--primary)] shadow-lg"
                                            : "border-gray-200"
                                    }
                                `}
                            />

                            <div
                                className="
                                        text-md
                                         mt-2
                                         text-center
                                        font-medium
                                        text-gray-700
                                    "
                            >
                                {variant.frame.type}
                            </div>
                        </button>
                    ))}
                </div>

                {selectedVariant?.frame?.colors?.length > 0 && (
                    <div className="mt-8">
                        <h3
                            className="
                font-bold
                text-2xl
                mb-4
                text-[var(--primary)]
            "
                        >
                            اختر لون الإطار المناسب لك *
                        </h3>

                        {selectedVariant?.frame?.colors?.length > 0 && (
                            <div className="flex flex-wrap gap-5">
                                {selectedVariant.frame.colors.map((color) => {
                                    const isSelected =
                                        selectedFrameColor?.code === color.code;

                                    return (
                                        <motion.button
                                            key={color.code}
                                            type="button"
                                            whileTap={{
                                                scale: 0.95,
                                            }}
                                            onClick={() => {
                                                setSelectedFrameColor(
                                                    selectedFrameColor?.code ===
                                                        color.code
                                                        ? null
                                                        : color,
                                                );

                                                setCartError("");
                                            }}
                                            className="
                                flex
                                flex-col
                                items-center
                                gap-2
                            "
                                        >
                                            <div
                                                className={`
                                    relative
                                    w-12
                                    h-12
                                    rounded-full
                                    transition-all
                                    duration-300

                                    ${
                                        isSelected
                                            ? "ring-4 ring-[var(--primary)] ring-offset-2"
                                            : ""
                                    }
                                `}
                                            >
                                                {/* Color Circle */}

                                                <div
                                                    className="
                                        absolute
                                        inset-0
                                        rounded-full
                                        border
                                        border-gray-300
                                    "
                                                    style={{
                                                        backgroundColor:
                                                            color.code,
                                                    }}
                                                />

                                                {/* Selected Icon */}

                                                <AnimatePresence>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{
                                                                scale: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                scale: 1,
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                scale: 0,
                                                                opacity: 0,
                                                            }}
                                                            className="
                                                absolute
                                                inset-0
                                                flex
                                                items-center
                                                justify-center
                                            "
                                                        >
                                                            <div
                                                                className="
                                                    w-6
                                                    h-6
                                                    rounded-full
                                                    bg-white
                                                    shadow-md
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                                            >
                                                                <FiCheck
                                                                    size={14}
                                                                    className="
                                                        text-[var(--primary)]
                                                    "
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <span
                                                className={`
                                    text-sm
                                    font-medium
                                    transition

                                    ${
                                        isSelected
                                            ? "text-[var(--primary)]"
                                            : "text-gray-600"
                                    }
                                `}
                                            >
                                                {color.name}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Total */}

            <motion.div
                variants={itemVariants}
                className="
                    mt-10
                    py-5
                    border-t
                    border-gray-200
                "
            >
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-2xl">المجموع</span>

                    <span
                        className="
                            text-2xl
                            font-bold
                            
                        "
                    >
                        {total} جنيه
                    </span>
                </div>
            </motion.div>

            {/* Quantity */}

            <motion.div
                variants={itemVariants}
                className="
        mt-6

        flex
        flex-row
        row-wrap
       items-center
        gap-4
        lg:gap-6
        sm:gap-2
        md:gap-2
    "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-4
                        border
                        rounded-full
                        px-3
                        py-2
                    "
                >
                    <button
                        disabled={qty <= 1}
                        onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                        className={
                            qty <= 1 ? "opacity-40 cursor-not-allowed" : ""
                        }
                    >
                        <FiMinus />
                    </button>

                    <span className="font-bold">{qty}</span>

                    <button
                        disabled={qty >= availableQuantity}
                        onClick={() =>
                            setQty((prev) =>
                                Math.min(prev + 1, availableQuantity),
                            )
                        }
                        className={
                            qty >= availableQuantity
                                ? "opacity-40 cursor-not-allowed"
                                : ""
                        }
                    >
                        <FiPlus />
                    </button>
                </div>

                <button
                    onClick={addToCart}
                    className="
                        flex-1
                        h-12
                        rounded-full
                        bg-[var(--primary)]
                        text-white
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <BiCartAdd />
                    <span className="hidden sm:inline">أضف للسلة</span>
                </button>
                <button
                    onClick={orderViaWhatsapp}
                    className="
                        flex-1
                        h-12
                        rounded-full
                        bg-green-600
                        text-white
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <FaWhatsapp />

                    <span className="hidden sm:inline">اطلب عبر واتساب</span>
                </button>
                <button
                    onClick={toggleWishlist}
                    className="
                        w-12
                        h-12
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                    "
                >
                    {isWishlisted ? (
                        <FaHeart size={22} className="text-[var(--primary)]" />
                    ) : (
                        <FiHeart size={22} />
                    )}
                </button>
            </motion.div>

            {/* Meta */}

            {cartError && (
                <div
                    className="
            mt-4
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

            <motion.div
                variants={itemVariants}
                className="
                    mt-10
                    border-t
                    pt-6
                    text-md
                    text-gray-600
                    space-y-2
                "
            >
                <div>
                    <strong> رمز المنتج : </strong>

                    <span>{product.code}</span>
                </div>

                <div>
                    <strong>التصنيفات : </strong>
                    <span>
                        {product?.category?.name}
                        {product?.tags?.length > 0 && "  ,  "}
                        {product?.tags?.map((tag) => tag.name).join(" , ")}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}
