import SiteLayout from "@/Layouts/SiteLayout";
import CartHeader from "../Cart/CartHeader";
import { motion } from "framer-motion";
import {
    FiCheckCircle,
    FiPackage,
    FiHome,
    FiShoppingBag,
    FiMessageCircle,
    FiClock,
    FiTruck,
} from "react-icons/fi";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Success({ order, announcement, footer }) {
useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout_items");
}, []);
    return (
        <SiteLayout title="تم تأكيد الطلب" announcement={announcement}>
            <CartHeader currentStep={3} />

            <section className="bg-[#f6f3f1] min-h-screen py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
                    {/* ================= LEFT: MAIN CARD ================= */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2"
                    >
                        <div className="relative overflow-hidden bg-white rounded-[28px] border shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                            {/* subtle background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-transparent opacity-70" />

                            <div className="relative p-8 md:p-12 text-center">
                                {/* ICON */}
                                <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <FiCheckCircle
                                        className="text-green-600"
                                        size={40}
                                    />
                                </div>

                                {/* TITLE */}
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    تم تأكيد طلبك بنجاح
                                </h1>

                                <p className="text-gray-500 mb-6 max-w-xl mx-auto">
                                    شكراً لك! تم استلام طلبك وسيتم معالجته فوراً
                                    من فريقنا.
                                </p>

                                {/* ORDER BADGE */}
                                <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full text-sm mb-8">
                                    <FiPackage />
                                    رقم الطلب:
                                    <span className="font-bold">
                                        #{order.id}
                                    </span>
                                </div>

                                {/* ================= ORDER META ================= */}
                                <div className="grid sm:grid-cols-2 gap-4 text-right mb-8">
                                    <div className="p-4 rounded-2xl bg-[#fafafa] border">
                                        <p className="text-xs text-gray-500">
                                            الإجمالي
                                        </p>
                                        <p className="text-lg font-bold text-[var(--primary)]">
                                            {order.total} جنيه
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#fafafa] border">
                                        <p className="text-xs text-gray-500">
                                            طريقة الدفع
                                        </p>
                                        <p className="font-semibold">
                                            الدفع عند الاستلام
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#fafafa] border sm:col-span-2">
                                        <p className="text-xs text-gray-500">
                                            عنوان التوصيل
                                        </p>
                                        <p className="font-medium leading-relaxed">
                                            {order.address}
                                        </p>
                                    </div>
                                </div>

                                {/* ================= ACTIONS ================= */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={() => router.visit("/")}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition"
                                    >
                                        <FiHome />
                                        الرئيسية
                                    </button>

                                    <button
                                        onClick={() => router.visit("/shop")}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[var(--primary)] text-white hover:opacity-90 transition"
                                    >
                                        <FiShoppingBag />
                                        متابعة التسوق
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ================= RIGHT: STATUS SIDEBAR ================= */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* ORDER STATUS */}
                        <div className="bg-white rounded-[24px] border p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <FiClock className="text-[var(--primary)]" />
                                <h3 className="font-bold">حالة الطلب</h3>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    تم استلام الطلب
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                    قيد التجهيز
                                </div>

                                <div className="flex items-center gap-2 opacity-40">
                                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                                    في انتظار الشحن
                                </div>
                            </div>
                        </div>

                        {/* DELIVERY */}
                        <div className="bg-white rounded-[24px] border p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <FiTruck className="text-[var(--primary)]" />
                                <h3 className="font-bold">التوصيل</h3>
                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب
                                وتحديد موعد التسليم.
                            </p>
                        </div>

                        {/* SUPPORT */}
                        <div className="bg-white rounded-[24px] border p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <FiMessageCircle className="text-[var(--primary)]" />
                                <h3 className="font-bold">الدعم</h3>
                            </div>

                            <p className="text-sm text-gray-500 mb-4">
                                تحتاج مساعدة؟ نحن هنا دائماً.
                            </p>

                            <a
                                href={`https://wa.me/${footer?.whatsapp}?text=مرحبا، عندي استفسار بخصوص الطلب رقم #${order.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                            >
                                <FiMessageCircle />
                                تواصل عبر واتساب
                            </a>
                        </div>

                        {/* TRUST */}
                        <div className="bg-gradient-to-br from-[var(--primary)] to-black text-white rounded-[24px] p-6">
                            <h3 className="font-bold mb-2">
                                تجربة شراء آمنة 100%
                            </h3>
                            <p className="text-sm text-white/80 leading-relaxed">
                                جميع الطلبات يتم مراجعتها وتأكيدها قبل الشحن
                                لضمان الجودة وسرعة التنفيذ.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
}
