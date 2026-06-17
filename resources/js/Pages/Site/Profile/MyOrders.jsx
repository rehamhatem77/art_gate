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
            transition={{ duration: 0.4 }}
            dir="rtl"
            className="overflow-hidden"
        >
            {/* HEADER */}
            <div className="border-b px-6 md:px-8 py-6 bg-gradient-to-l from-white to-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_12%,white)] flex items-center justify-center text-[var(--primary)]">
                        <FiPackage size={22} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 tracking-[2px] uppercase">
                            Orders Center
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                            طلباتي
                        </h2>
                    </div>
                </div>

                <div className="px-5 py-2 rounded-full bg-[var(--primary)] text-white font-semibold shadow">
                    {orders.length} طلب
                </div>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8 space-y-6">
                {!orders.length && (
                    <div className="text-center py-24">
                        <FiPackage
                            size={70}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-bold">لا توجد طلبات بعد</h3>
                        <p className="text-gray-500 mt-2">
                            ستظهر جميع طلباتك هنا بمجرد الشراء
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
                            className="bg-white border rounded-2xl shadow-sm overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {/* ORDER HEADER (CLICKABLE) */}
                            <div
                                onClick={() => toggleOrder(order.id)}
                                className="cursor-pointer flex justify-between items-center p-5 bg-gray-50 border-b"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`h-11 w-11 rounded-xl flex items-center justify-center ${status.bg}`}
                                    >
                                        <StatusIcon className={status.color} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            طلب رقم #{order.id}
                                        </p>
                                        <p className="font-bold">
                                            {status.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-left">
                                        <p className="font-bold text-[var(--primary)]">
                                            {order.total} ج
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {order.created_at}
                                        </p>
                                    </div>

                                    {isOpen ? (
                                        <FiChevronUp />
                                    ) : (
                                        <FiChevronDown />
                                    )}
                                </div>
                            </div>

                            {/* COLLAPSIBLE CONTENT */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        {/* INFO GRID */}
                                        <div className="p-5 grid md:grid-cols-3 gap-5">
                                            {order.status === "pending" && (
                                                <div className="md:col-span-3 flex justify-end">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            openCancelModal(
                                                                order.id,
                                                            );
                                                        }}
                                                        className="
                h-12
                px-6

                rounded-2xl

                bg-red-500

                text-white

                font-semibold

                hover:bg-red-600

                transition
            "
                                                    >
                                                        إلغاء الطلب
                                                    </button>
                                                </div>
                                            )}

                                            <InfoBox title="التوصيل">
                                                <Info
                                                    icon={FiMapPin}
                                                    value={order.address}
                                                />
                                                <Info
                                                    icon={FiCalendar}
                                                    value={order.created_at}
                                                />
                                            </InfoBox>

                                            <InfoBox title="الدفع">
                                                <Info
                                                    icon={FiCreditCard}
                                                    value={order.payment_method}
                                                />
                                                <Info
                                                    icon={FiTruck}
                                                    value={`الشحن: ${order.shipping} ج`}
                                                />
                                            </InfoBox>

                                            <div className="bg-[color-mix(in_srgb,var(--primary)_6%,white)] border rounded-2xl p-4">
                                                <p className="font-bold text-[var(--primary)] mb-3">
                                                    ملخص الطلب
                                                </p>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>
                                                            عدد المنتجات
                                                        </span>
                                                        <span className="font-semibold">
                                                            {
                                                                order.items
                                                                    ?.length
                                                            }
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span>الإجمالي</span>
                                                        <span className="font-bold text-[var(--primary)]">
                                                            {order.total} ج
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ITEMS (FULL DATA PRESERVED) */}
                                        <div className="px-5 pb-5 space-y-3">
                                            {order.items?.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center bg-gray-50 border rounded-xl p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={getImage(
                                                                item.image,
                                                            )}
                                                            className="h-14 w-14 rounded-lg object-cover border"
                                                        />

                                                        <div>
                                                            <p className="font-medium text-sm">
                                                                {item.name}
                                                            </p>

                                                            {item.variant && (
                                                                <p className="text-xs text-gray-500">
                                                                    {item
                                                                        .variant
                                                                        .size &&
                                                                        `${item.variant.size.height}x${item.variant.size.width}`}
                                                                    {item
                                                                        .variant
                                                                        .frame_type &&
                                                                        ` / ${item.variant.frame_type}`}
                                                                </p>
                                                            )}

                                                            {item.frame_color_name && (
                                                                <p className="text-xs flex items-center gap-2">
                                                                    <span
                                                                        className="h-2 w-2 rounded-full"
                                                                        style={{
                                                                            backgroundColor:
                                                                                item.frame_color_code,
                                                                        }}
                                                                    />
                                                                    {
                                                                        item.frame_color_name
                                                                    }
                                                                </p>
                                                            )}

                                                            <p className="text-xs text-gray-500">
                                                                الكمية:{" "}
                                                                {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-left">
                                                        <p className="font-bold text-[var(--primary)]">
                                                            {item.price} ج
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            الإجمالي:{" "}
                                                            {item.price *
                                                                item.quantity}{" "}
                                                            ج
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
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
                <div className="p-8 text-center">
                    <div
                        className="
                w-20
                h-20

                rounded-full

                bg-red-100

                flex

                items-center

                justify-center

                mx-auto
            "
                    >
                        <FiAlertTriangle
                            className="
                    text-4xl

                    text-red-500
                "
                        />
                    </div>

                    <h2 className="text-2xl font-bold mt-5">إلغاء الطلب</h2>

                    <p className="text-gray-500 mt-3 leading-7">
                        هل أنت متأكد من إلغاء هذا الطلب ؟
                        <br />
                        لا يمكن التراجع بعد تنفيذ العملية.
                    </p>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={() => {
                                setCancelModal(false);

                                setSelectedOrderId(null);
                            }}
                            className="
                    flex-1

                    h-12

                    rounded-2xl

                    border

                    hover:bg-gray-50
                "
                        >
                            رجوع
                        </button>

                        <button
                            disabled={processing}
                            onClick={cancelOrder}
                            className="
                    flex-1

                    h-12

                    rounded-2xl

                    bg-red-500

                    text-white

                    hover:bg-red-600

                    transition

                    disabled:opacity-50
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

/* HELPERS */
function InfoBox({ title, children }) {
    return (
        <div className="bg-gray-50 border rounded-2xl p-4 space-y-2">
            <p className="font-bold text-gray-700 mb-2">{title}</p>
            {children}
        </div>
    );
}

function Info({ icon: Icon, value }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon size={14} className="text-gray-400" />
            <span>{value || "-"}</span>
        </div>
    );
}
