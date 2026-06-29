import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    FiPackage,
    FiTruck,
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiCalendar,
    FiMapPin,
    FiCreditCard,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import { router } from "@inertiajs/react";

import Modal from "@/Components/Modal";

import { FiAlertTriangle } from "react-icons/fi";
import { getImage } from "@/Utils/GetImage";

export default function MyOrders({ orders = [] }) {
    const [openOrderId, setOpenOrderId] = useState(null);
    const [cancelModal, setCancelModal] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [processing, setProcessing] = useState(false);

    const toggleOrder = (id) => {
        setOpenOrderId((prev) => (prev === id ? null : id));
    };

    const getStatus = (status) => {
        switch (status) {
            case "completed":
                return {
                    title: "تم التسليم",
                    icon: FiCheckCircle,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                };
            case "shipping":
                return {
                    title: "قيد الشحن",
                    icon: FiTruck,
                    color: "text-[var(--primary)]",
                    bg: "bg-[color-mix(in_srgb,var(--primary)_10%,white)]",
                };
            case "cancelled":
                return {
                    title: "تم إلغاء الطلب",

                    icon: FiAlertCircle,

                    color: "text-red-600",

                    bg: "bg-red-50",
                };
            case "processing":
                return {
                    title: "قيد التجهيز",
                    icon: FiClock,
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                };
            case "confirmed":
                return {
                    title: "تم تأكيد الطلب",

                    icon: FiCheckCircle,

                    color: "text-blue-600",

                    bg: "bg-blue-50",
                };

            default:
                return {
                    title: "قيد المراجعة",
                    icon: FiAlertCircle,
                    color: "text-gray-600",
                    bg: "bg-gray-100",
                };
        }
    };
    const openCancelModal = (id) => {
        setSelectedOrderId(id);

        setCancelModal(true);
    };

    const cancelOrder = () => {
        if (!selectedOrderId) return;

        setProcessing(true);

        router.patch(
            route("profile.orders.cancel", selectedOrderId),

            {},

            {
                preserveScroll: true,

                onFinish: () => {
                    setProcessing(false);

                    setCancelModal(false);

                    setSelectedOrderId(null);
                },
            },
        );
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            dir="rtl"
            className="w-full"
        >
            {/* HEADER */}
            <div
                className="
                sticky
                top-0
                z-10
                bg-white/90
                backdrop-blur-xl
                border-b
                px-2
                sm:px-4
                py-5
            "
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="
                            sm:h-12

                            sm:w-12
h-9
w-9
                            sm:rounded-2xl
rounded-xl
                            bg-[color-mix(in_srgb,var(--primary)_12%,white)]
                            flex
                            items-center
                            justify-center
                            text-[var(--primary)]
                            shrink-0
                        "
                        >
                            <FiPackage size={22} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs sm:text-sm tracking-[2px] uppercase text-gray-400">
                                Orders
                            </p>

                            <h2 className="font-bold text-xl sm:text-2xl truncate">
                                طلباتي
                            </h2>
                        </div>
                    </div>

                    <div
                        className="
                        shrink-0
                        rounded-2xl
                        bg-[var(--primary)]
                        sm:px-4
px-3
                        sm:py-2.5
py-1.5
                        text-white
                        font-bold
                        shadow-lg
                    "
                    >
                        {orders.length}
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="py-3 sm:py-5 space-y-4">
                {!orders.length && (
                    <div className="py-24 text-center">
                        <div
                            className="
                            mx-auto
                            mb-5
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-100
                        "
                        >
                            <FiPackage className="text-gray-400" size={38} />
                        </div>

                        <h3 className="font-bold text-xl">
                            لا توجد طلبات حتى الآن
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            ستظهر جميع طلباتك هنا بعد أول عملية شراء.
                        </p>
                    </div>
                )}

                {orders.map((order, index) => {
                    const status = getStatus(order.status);
                    const StatusIcon = status.icon;
                    const isOpen = openOrderId === order.id;

                    return (
                        <motion.div
                            key={order.id}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                delay: index * 0.05,
                            }}
                            className="
                            overflow-hidden
                            rounded-3xl
                            border
                            border-gray-100
                            bg-white
                            shadow-sm
                        "
                        >
                            {/* ORDER HEADER */}
                            <div
                                onClick={() => toggleOrder(order.id)}
                                className="cursor-pointer flex justify-between items-center  bg-gray-50 border-b  w-full
                                text-right
                                py-3
px-1
sm:p-4
                                active:bg-gray-50
                                transition"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div
                                        className={`
                                        h-8
                                        w-8
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                        ${status.bg}
                                    `}
                                    >
                                        <StatusIcon
                                            className={status.color}
                                            size={16}
                                        />
                                    </div>

                                    <div>
                                        <p className="sm:text-xs text-[9px] text-gray-400">
                                            طلب رقم #{order.id}
                                        </p>
                                        <h3 className="font-bold text-base ">
                                            {status.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <div className="text-left">
                                        <p className="font-bold sm:text-md md:text-sm text-xs text-[var(--primary)]">
                                            {order.total} ج
                                        </p>
                                        <p className="sm:text-md md:text-sm text-[9px] text-gray-400">
                                            {order.created_at}
                                        </p>
                                    </div>

                                    {isOpen ? (
                                        <FiChevronUp
                                            className="text-gray-500"
                                            size={20}
                                        />
                                    ) : (
                                        <FiChevronDown
                                            className="text-gray-500"
                                            size={20}
                                        />
                                    )}
                                </div>
                            </div>
                            {/* <button
                                onClick={() => toggleOrder(order.id)}
                                className="
                                w-full
                                text-right
                                p-2
sm:p-4
                                active:bg-gray-50
                                transition
                            "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`
                                        h-8
                                        w-8
                                        rounded-2xl
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                        ${status.bg}
                                    `}
                                    >
                                        <StatusIcon
                                            className={status.color}
                                            size={16}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400">
                                                    طلب رقم #{order.id}
                                                </p>

                                                <div className="mt-1 flex items-center justify-between ">
                                                    <h3 className="font-bold text-base ">
                                                        {status.title}
                                                    </h3>
                                                    <span
                                                        className="text-xs px-3
                                                 text-gray-500"
                                                    >
                                                        {order.created_at}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="shrink-0">
                                                {isOpen ? (
                                                    <FiChevronUp
                                                        className="text-gray-500"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <FiChevronDown
                                                        className="text-gray-500"
                                                        size={20}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-2 grid grid-cols-2 gap-1 sm:gap-3">
                                            <div
                                                className="
                                                rounded-xl
                                                bg-gray-50
items-center
                                                px-2
py-1
                                            "
                                            >
                                                <p className="text-xs text-gray-400">
                                                    الإجمالي
                                                </p>

                                                <p className="font-bold text-xs md:text-sm lg:text-lg sm:text-xl text-[var(--primary)]">
                                                    {order.total}ج
                                                </p>
                                            </div>

                                            <div
                                                className="
                                                rounded-xl
                                                bg-gray-50
items-center
                                                   px-2
py-1
                                            "
                                            >
                                                <p className="text-xs text-gray-400">
                                                    المنتجات
                                                </p>

                                                <p className="font-bold text-xs md:text-sm lg:text-lg sm:text-xl">
                                                    {order.items?.length || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button> */}

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                        }}
                                        className="overflow-hidden border-t"
                                    >
                                        {" "}
                                        <div className="sm:p-4 p-2 space-y-4">
                                            {order.status === "pending" && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openCancelModal(
                                                            order.id,
                                                        );
                                                    }}
                                                    className="
                                                    w-full
                                                    h-12
                                                    rounded-2xl
                                                    bg-red-500
                                                    text-white
                                                    font-semibold
                                                    active:scale-[.98]
                                                    transition
                                                "
                                                >
                                                    إلغاء الطلب
                                                </button>
                                            )}

                                            {/* INFO CARDS */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div
                                                    className="
                                                    rounded-2xl
                                                    border
                                                    bg-gray-50
                                                    py-2
px-3
                                                "
                                                >
                                                    <h4 className="font-bold text-sm sm:text-md mb-1">
                                                        معلومات التوصيل
                                                    </h4>

                                                    <div className="space-y-1">
                                                        <Info
                                                            icon={FiMapPin}
                                                            value={
                                                                order.address
                                                            }
                                                        />

                                                        <Info
                                                            icon={FiCalendar}
                                                            value={
                                                                order.created_at
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="
                                                    rounded-2xl
                                                    border
                                                    bg-gray-50
px-3
                                                    py-2
                                                "
                                                >
                                                    <h4 className="font-bold text-sm sm:text-md mb-1">
                                                        الدفع والشحن
                                                    </h4>

                                                    <div className="space-y-1">
                                                        <Info
                                                            icon={FiCreditCard}
                                                            value={
                                                                order.payment_method
                                                            }
                                                        />

                                                        <Info
                                                            icon={FiTruck}
                                                            value={`الشحن : ${order.shipping} ج`}
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="
                                                    rounded-2xl
                                                    bg-[color-mix(in_srgb,var(--primary)_8%,white)]
                                                    border
                                                    border-[color-mix(in_srgb,var(--primary)_15%,white)]
                                                    py-2 px-3
                                                "
                                                >
                                                    <h4
                                                        className="
                                                        font-bold
                                                        text-[var(--primary)]
                                                        text-sm sm:text-md mb-1
                                                    "
                                                    >
                                                        ملخص الطلب
                                                    </h4>

                                                    <div className="space-y-1 text-xs sm:text-sm">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-500">
                                                                عدد المنتجات
                                                            </span>

                                                            <span className="font-bold">
                                                                {
                                                                    order.items
                                                                        ?.length
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-500">
                                                                رسوم الشحن
                                                            </span>

                                                            <span className="font-semibold">
                                                                {order.shipping}{" "}
                                                                ج
                                                            </span>
                                                        </div>

                                                        <div className="border-t pt-3 flex items-center justify-between">
                                                            <span className="font-bold">
                                                                الإجمالي
                                                            </span>

                                                            <span
                                                                className="
                                                                text-sm sm:text-md
                                                                font-extrabold
                                                                text-[var(--primary)]
                                                            "
                                                            >
                                                                {order.total} ج
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* PRODUCTS */}

                                            <div className="space-y-2">
                                                <h4 className="font-bold text-md">
                                                    المنتجات
                                                </h4>

                                                {order.items?.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: i * 0.05,
                                                        }}
                                                        className="
                                                        rounded-3xl
                                                        border
                                                        bg-white
                                                        overflow-hidden
                                                        shadow-sm 

                                                    "
                                                    >
                                                        <div className="p-2 ">
                                                            <div className="flex gap-2 items-center">
                                                                <img
                                                                    src={getImage(
                                                                        item.image,
                                                                    )}
                                                                    className="
                                                                    sm:h-20
                                                                    sm:w-20
h-16
                                                                    w-16
                                                                    rounded-2xl
                                                                    object-cover
                                                                    border
                                                                    shrink-0
                                                                "
                                                                />

                                                                <div className="flex-1 min-w-0">
                                                                    <h5
                                                                        className="
                                                                        font-bold
                                                                        leading-6
sm:text-md
lg:text-sm
text-xs
                                                                    "
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </h5>

                                                                    {item.variant && (
                                                                        <p
                                                                            className="sm:text-sm
lg:text-xs
text-[9px] text-gray-500"
                                                                        >
                                                                            {item
                                                                                .variant
                                                                                .size &&
                                                                                `${item.variant.size.height} × ${item.variant.size.width}`}

                                                                            {item
                                                                                .variant
                                                                                .frame_type &&
                                                                                ` • ${item.variant.frame_type}`}
                                                                        </p>
                                                                    )}

                                                                    {item.frame_color_name && (
                                                                        <div className="flex items-center gap-1">
                                                                            <span
                                                                                className="h-2 w-2 rounded-full border"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        item.frame_color_code,
                                                                                }}
                                                                            />

                                                                            <span className="sm:text-sm
lg:text-xs
text-[9px] text-gray-600">
                                                                                {
                                                                                    item.frame_color_name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="
                                                                mt-2
                                                                grid
                                                                grid-cols-3
grid-cols-2
                                                                gap-1
sm:gap-3
                                                            "
                                                            >
                                                                <div className="rounded-2xl bg-gray-50 p-1 text-center">
                                                                    <p className="sm:text-sm
lg:text-xs
text-[9px]  text-gray-400">
                                                                        الكمية
                                                                    </p>

                                                                    <p className="font-bold sm:text-sm
lg:text-xs
text-[9px] mt-1">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-2xl bg-gray-50 p-1 text-center">
                                                                    <p className="sm:text-sm
lg:text-xs
text-[9px] sm:text-md text-gray-400">
                                                                        السعر
                                                                    </p>

                                                                    <p className="font-bold sm:text-sm
lg:text-xs
text-[9px] sm:text-md mt-1 text-[var(--primary)]">
                                                                        {
                                                                            item.price
                                                                        }{" "}
                                                                        ج
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-2xl bg-gray-50 p-1 text-center">
                                                                    <p className="sm:text-sm
lg:text-xs
text-[9px] sm:text-md text-gray-400">
                                                                        الإجمالي
                                                                    </p>

                                                                    <p className="font-bold sm:text-sm
lg:text-xs
text-[9px] sm:text-md mt-1">
                                                                        {item.price *
                                                                            item.quantity}{" "}
                                                                        ج
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
            <Modal
                show={cancelModal}
                onClose={() => {
                    setCancelModal(false);
                    setSelectedOrderId(null);
                }}
                maxWidth="md"
            >
                <div className="p-6 sm:p-8">
                    <div
                        className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-red-100
                        "
                    >
                        <FiAlertTriangle className="text-red-500" size={38} />
                    </div>

                    <h2
                        className="
                            mt-6
                            text-center
                            text-2xl
                            font-bold
                        "
                    >
                        إلغاء الطلب
                    </h2>

                    <p
                        className="
                            mt-3
                            text-center
                            leading-7
                            text-gray-500
                        "
                    >
                        هل أنت متأكد من إلغاء هذا الطلب؟
                        <br />
                        لا يمكن التراجع عن هذه العملية بعد تنفيذها.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                        <button
                            onClick={() => {
                                setCancelModal(false);
                                setSelectedOrderId(null);
                            }}
                            className="
                                h-12
                                rounded-2xl
                                border
                                font-semibold
                                transition
                                hover:bg-gray-50
                                active:scale-[.98]
                            "
                        >
                            رجوع
                        </button>

                        <button
                            disabled={processing}
                            onClick={cancelOrder}
                            className="
                                h-12
                                rounded-2xl
                                bg-red-500
                                text-white
                                font-semibold
                                transition
                                hover:bg-red-600
                                disabled:opacity-50
                                active:scale-[.98]
                            "
                        >
                            {processing ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
                        </button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
}

/* ============================= */
/* HELPERS */
/* ============================= */

function InfoBox({ title, children }) {
    return (
        <div
            className="
                rounded-3xl
                border
                bg-gray-50
                p-4
            "
        >
            <h4
                className="
                    mb-4
                    font-bold
                    text-gray-700
                "
            >
                {title}
            </h4>

            <div className="space-y-3">{children}</div>
        </div>
    );
}

function Info({ icon: Icon, value }) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
            "
        >
            <div
                className="
                    mt-0.5
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    border
                "
            >
                <Icon size={13} className="text-gray-500" />
            </div>

            <span
                className="
                    flex-1
                    break-words
                    text-xs
                    leading-6
                    text-gray-600
                "
            >
                {value || "-"}
            </span>
        </div>
    );
}
