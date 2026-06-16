import { motion, AnimatePresence } from "framer-motion";
import {
    FiTruck,
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiCalendar,
    FiMapPin,
    FiPhone,
    FiCreditCard,
    FiChevronDown,
    FiDownload,
    FiMessageCircle,
} from "react-icons/fi";
import { useState } from "react";
import { getImage } from "@/Utils/GetImage";

export default function MyOrders({ orders = [] }) {
    const [openOrder, setOpenOrder] = useState(null);

    const getStatus = (status) => {
        switch (status) {
            case "completed":
                return {
                    title: "تم التسليم",
                    icon: FiCheckCircle,
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                    step: 3,
                };
            case "shipping":
                return {
                    title: "قيد الشحن",
                    icon: FiTruck,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                    step: 2,
                };
            case "processing":
                return {
                    title: "قيد التجهيز",
                    icon: FiClock,
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                    step: 1,
                };
            default:
                return {
                    title: "بانتظار المراجعة",
                    icon: FiAlertCircle,
                    color: "text-gray-600",
                    bg: "bg-gray-50",
                    step: 0,
                };
        }
    };

    return (
        <div dir="rtl" className="space-y-6">

            {/* HEADER */}
            <div className="bg-white border rounded-3xl p-6 flex justify-between items-center shadow-sm">
                <div>
                    <h2 className="text-3xl font-bold">طلباتي</h2>
                    <p className="text-gray-500 text-sm">
                        متابعة الطلبات والشحن والفواتير
                    </p>
                </div>
            </div>

            {/* ORDERS */}
            {orders.map((order) => {
                const status = getStatus(order.status);
                const StatusIcon = status.icon;
                const isOpen = openOrder === order.id;

                return (
                    <motion.div
                        key={order.id}
                        layout
                        className="bg-white border rounded-3xl overflow-hidden shadow-sm"
                    >

                        {/* ORDER HEADER */}
                        <div
                            onClick={() =>
                                setOpenOrder(isOpen ? null : order.id)
                            }
                            className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center gap-4">

                                <div className={`p-3 rounded-2xl ${status.bg}`}>
                                    <StatusIcon className={status.color} />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Order #{order.id}
                                    </p>
                                    <p className="font-bold">
                                        {status.title}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className="text-left">
                                    <p className="font-bold">
                                        {order.total} ج
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {order.created_at}
                                    </p>
                                </div>

                                <FiChevronDown
                                    className={`transition ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </div>

                        {/* EXPAND CONTENT */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >

                                    <div className="p-6 border-t bg-gray-50 space-y-6">

                                        {/* QUICK ACTIONS */}
                                        <div className="flex gap-3 flex-wrap">
                                            <button className="px-4 py-2 bg-black text-white rounded-xl text-sm">
                                                تتبع الشحنة
                                            </button>

                                            <button className="px-4 py-2 bg-white border rounded-xl text-sm flex items-center gap-2">
                                                <FiDownload />
                                                فاتورة
                                            </button>

                                            <button className="px-4 py-2 bg-white border rounded-xl text-sm flex items-center gap-2">
                                                <FiMessageCircle />
                                                دعم
                                            </button>
                                        </div>

                                        {/* STATUS STEPPER */}
                                        <div className="grid grid-cols-4 text-center text-xs">
                                            {[
                                                "تم الاستلام",
                                                "قيد التجهيز",
                                                "تم الشحن",
                                                "تم التسليم",
                                            ].map((step, i) => (
                                                <div key={i}>
                                                    <div
                                                        className={`h-2 mx-1 rounded-full mb-2 ${
                                                            i <= status.step
                                                                ? "bg-black"
                                                                : "bg-gray-200"
                                                        }`}
                                                    />
                                                    {step}
                                                </div>
                                            ))}
                                        </div>

                                        {/* INFO */}
                                        <div className="grid md:grid-cols-3 gap-4">

                                            <Box title="العميل">
                                                <Info icon={FiPhone} value={order.phone} />
                                                <Info icon={FiMapPin} value={order.address} />
                                            </Box>

                                            <Box title="الدفع">
                                                <Info icon={FiCreditCard} value={order.payment_method} />
                                            </Box>

                                            <Box title="الملخص">
                                                <p>المنتجات: {order.items?.length}</p>
                                                <p>الإجمالي: {order.total} ج</p>
                                            </Box>

                                        </div>

                                        {/* PRODUCTS */}
                                        <div className="space-y-3">
                                            {order.items?.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between bg-white p-3 rounded-2xl border"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={getImage(item.product?.images?.[0]?.image)}
                                                            className="h-14 w-14 rounded-xl object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                Qty: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="font-bold">
                                                        {item.price} ج
                                                    </p>
                                                </div>
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
    );
}

/* UI HELPERS */

function Box({ title, children }) {
    return (
        <div className="bg-white border rounded-2xl p-4 space-y-2">
            <p className="text-sm font-bold mb-2">{title}</p>
            {children}
        </div>
    );
}

function Info({ icon: Icon, value }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon size={14} />
            <span>{value || "-"}</span>
        </div>
    );
}