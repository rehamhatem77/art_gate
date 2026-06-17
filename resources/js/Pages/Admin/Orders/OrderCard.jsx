import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getImage } from "@/Utils/GetImage";
import {
    FiChevronDown,
    FiUser,
    FiUserX,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCheckCircle,
    FiTruck,
    FiClock,
    FiAlertCircle,
    FiFileText,
} from "react-icons/fi";
import { router } from "@inertiajs/react";

export default function OrderCard({ order }) {
    const [open, setOpen] = useState(false);

    const getStatus = (status) => {
        switch (status) {
            case "completed":
                return {
                    title: "تم التسليم",
                    color: "bg-emerald-100 text-emerald-700",
                    icon: FiCheckCircle,
                    step: 4,
                };
            case "shipping":
                return {
                    title: "قيد الشحن",
                    color: "bg-blue-100 text-blue-700",
                    icon: FiTruck,
                    step: 3,
                };
            case "processing":
                return {
                    title: "قيد التجهيز",
                    color: "bg-amber-100 text-amber-700",
                    icon: FiClock,
                    step: 2,
                };
            case "confirmed":
                return {
                    title: "تم التأكيد",
                    color: "bg-indigo-100 text-indigo-700",
                    icon: FiCheckCircle,
                    step: 1,
                };
            case "cancelled":
                return {
                    title: "ملغي",
                    color: "bg-red-100 text-red-700",
                    icon: FiAlertCircle,
                    step: 0,
                };
            default:
                return {
                    title: "بانتظار المراجعة",
                    color: "bg-gray-100 text-gray-700",
                    icon: FiAlertCircle,
                    step: 0,
                };
        }
    };

    const status = getStatus(order.status);
    const StatusIcon = status.icon;

    const steps = ["مراجعة", "تأكيد", "تجهيز", "شحن", "تسليم"];

    const isCancelled = order.status === "cancelled";

    return (
        <motion.div
            layout
            className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
            {/* HEADER */}
            <div
                onClick={() => setOpen(!open)}
                className="p-5 cursor-pointer hover:bg-gray-50 transition"
            >
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div className="h-14 w-14 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 ring-1 ring-gray-100">
                            {!order.customer?.authenticated ? (
                                <FiUserX size={22} className="text-gray-500" />
                            ) : order.customer?.avatar ? (
                                <img
                                    src={getImage(order.customer.avatar)}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="font-bold text-lg text-[var(--primary)]">
                                    {order.customer?.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* INFO */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-lg font-bold tracking-tight">
                                    الطلب #{order.id}
                                </h2>

                                <div
                                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-sm ${status.color}`}
                                >
                                    <StatusIcon size={12} />
                                    {status.title}
                                </div>

                                {!order.customer?.authenticated && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-600">
                                        زائر
                                    </span>
                                )}
                            </div>

                            <p className="font-semibold text-sm text-gray-900">
                                {order.customer?.name || "مستخدم"}
                            </p>

                            <p className="text-[11px] text-gray-500">
                                {order.customer?.email ||
                                    "لا يوجد بريد إلكتروني"}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6">
                        {/* TOTAL */}
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400">
                                الإجمالي
                            </p>
                            <p className="text-lg font-bold text-[var(--primary)]">
                                {order.total} ج
                            </p>
                        </div>

                        {/* DATE */}
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400">تم الطلب في تاريخ</p>
                            <p className="text-sm font-medium text-gray-700">
                                {order.created_at}
                            </p>
                        </div>

                        {/* STATUS SELECT (FIXED CLICK ISSUE) */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center"
                        >
                            <select
                                value={order.status}
                                onChange={(e) =>
                                    router.patch(
                                        route("orders.status", order.id),
                                        { status: e.target.value },
                                    )
                                }
                                className="
                        h-9
                        px-6
                        rounded-xl
                        border
                        bg-white
                        text-xs
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:border-gray-400
                        focus:border-[var(--primary)]
                                    focus:ring-4
                                    focus:ring-[color-mix(in_srgb,var(--primary)_12%,white)]
                        transition
                    "
                            >
                                <option value="pending">مراجعة</option>
                                <option value="confirmed">تأكيد</option>
                                <option value="processing">تجهيز</option>
                                <option value="shipping">شحن</option>
                                <option value="completed">تم التسليم</option>
                                <option value="cancelled">الغاء</option>
                            </select>
                        </div>

                        {/* CHEVRON */}
                        <div className="ml-1">
                            <FiChevronDown
                                size={18}
                                className={`text-gray-500 transition-transform duration-300 ${
                                    open ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t bg-gray-50 p-5 space-y-5">
                            {/* TIMELINE OR CANCEL INFO */}
                            {!isCancelled ? (
                                <div className="flex gap-2">
                                    {steps.map((step, index) => (
                                        <div key={step} className="flex-1">
                                            <div
                                                className={`h-1.5 rounded-full ${
                                                    index <= status.step
                                                        ? "bg-black"
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                            <p className="text-[11px] text-center text-gray-500 mt-1">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border rounded-xl p-3 text-sm text-red-600 flex items-center gap-2">
                                    <FiAlertCircle size={14} />
                                    تم إلغاء الطلب في:{" "}
                                    {order.cancelled_at || order.updated_at}
                                </div>
                            )}

                            {/* INFO GRID */}
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                                <Section title="بيانات العميل">
                                    <InfoRow
                                        icon={FiUser}
                                        value={order.customer?.name}
                                    />
                                    <InfoRow
                                        icon={FiMail}
                                        value={order.customer?.email}
                                    />
                                    <InfoRow
                                        icon={FiPhone}
                                        value={order.customer?.phone}
                                    />
                                </Section>

                                <Section title="العنوان">
                                    <InfoRow
                                        icon={FiMapPin}
                                        value={order.customer?.country}
                                    />
                                    <InfoRow
                                        icon={FiMapPin}
                                        value={order.customer?.city}
                                    />
                                    <InfoRow
                                        icon={FiMapPin}
                                        value={order.customer?.address}
                                    />
                                </Section>

                                <Section title="ملخص الطلب">
                                    <SummaryRow
                                        title="عدد المنتجات"
                                        value={order.items.length}
                                    />
                                    <SummaryRow
                                        title="المجموع"
                                        value={`${order.subtotal} ج`}
                                    />
                                    <SummaryRow
                                        title="الشحن"
                                        value={`${order.shipping} ج`}
                                    />
                                    <SummaryRow
                                        title="الدفع"
                                        value={order.payment_method}
                                    />
                                    <SummaryRow
                                        title="الإجمالي"
                                        value={`${order.total} ج`}
                                        bold
                                    />
                                </Section>
                            </div>

                            {/* PRODUCTS (MINIMIZED MORE) */}
                            <div>
                                <h3 className="font-bold text-sm mb-3">
                                    المنتجات
                                </h3>

                                <div className="space-y-2">
                                    {order.items?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border rounded-lg p-2.5 flex items-center justify-between gap-3"
                                        >
                                            {/* LEFT */}
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={getImage(item.image)}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />

                                                <div className="space-y-1">
                                                    <h4 className="font-medium text-xs leading-tight">
                                                        {item.name}
                                                    </h4>

                                                    {item.variant && (
                                                        <div className="text-[10px] text-gray-500 leading-tight space-y-1">
                                                            <p>
                                                                {
                                                                    item.variant
                                                                        .size
                                                                        ?.width
                                                                }
                                                                ×
                                                                {
                                                                    item.variant
                                                                        .size
                                                                        ?.height
                                                                }{" "}
                                                                سم ·{" "}
                                                                {
                                                                    item.variant
                                                                        .frame_type
                                                                }
                                                            </p>

                                                            {item.frame_color_code && (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <div
                                                                        className="h-3 w-3 rounded-full border shadow"
                                                                        style={{
                                                                            background:
                                                                                item.frame_color_code,
                                                                        }}
                                                                    />

                                                                    <span className="text-[10px] text-gray-500">
                                                                        لون
                                                                        الإطار:{" "}
                                                                        {
                                                                            item.frame_color_name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* RIGHT */}
                                            <div className="text-left text-[11px] leading-tight">
                                                <p className="text-gray-500">
                                                    ×{item.quantity}
                                                </p>
                                                <p className="font-bold">
                                                    {item.total} ج
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* NOTES */}
                            {order.notes && (
                                <div className="bg-white border rounded-xl p-4 flex gap-2">
                                    <FiFileText size={14} />
                                    <div>
                                        <h3 className="font-bold text-sm">
                                            ملاحظات العميل
                                        </h3>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {order.notes}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* =========================
   SECTION
========================= */

function Section({ title, children }) {
    return (
        <div className="bg-white border border-gray-100 rounded-xl p-3">
            <h3 className="text-[11px] font-bold mb-2 text-gray-700">
                {title}
            </h3>
            <div className="space-y-1.5">{children}</div>
        </div>
    );
}

/* =========================
   INFO ROW
========================= */

function InfoRow({ icon: Icon, value }) {
    return (
        <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <Icon size={11} />
            <span>{value || "-"}</span>
        </div>
    );
}

/* =========================
   SUMMARY ROW
========================= */

function SummaryRow({ title, value, bold = false }) {
    return (
        <div
            className={`flex justify-between text-[11px] ${bold ? "font-bold text-xs" : ""}`}
        >
            <span className="text-gray-500">{title}</span>
            <span>{value}</span>
        </div>
    );
}
