import SiteLayout from "@/Layouts/SiteLayout";
import { motion } from "framer-motion";
import WishlistCard from "./WishlistCard";
import { router, usePage } from "@inertiajs/react";
import { FiHeart, FiArrowLeft } from "react-icons/fi";
import FeaturesSection from "../Components/FeaturesSection";
import RecentlyViewedSection from "../Components/RecentlyViewedSection";
import useRecentlyViewed from "@/Hooks/useRecentlyViewed";
import { useState } from "react";

export default function Wishlist({ products ,announcement }) {
       const { services } = usePage().props;
      
        const recentProducts =
            useRecentlyViewed();
        const normalizeArray = (value) =>
            Array.isArray(value) ? value : [];
      
    return (
        <SiteLayout title="قائمة الأمنيات" announcement={announcement}>
            <div className=" min-h-screen">

                {/* ================= HERO ================= */}
                <section className="relative h-[420px] overflow-hidden">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCvauYajkBJ8x9Mh1sKxwJUTnWwSds_mnlN2ZsQJbEH25b4-ga-cb08MZOEoWImzMFFrVP-97f_dwKzg7Dxn19lk33Ii2y4E7DSiAcrbF5slrtClBORcObvhC5N-pCrmEejxex6VZSPdF3m0L1G4hpbKCraN-7M7XvfWiKjk5faiTmeZaW37gYO_NsG4xN_JCSNNuGSV0sWQs08Ej0FJs4SN_ZxptwZ7pLYpAKVCyaRePSHbg5rhG5LdCXBnLyuGdh0rCf0UA"
                        alt="Wishlist"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            scale-105
                        "
                    />

                    {/* Overlay */}
                  
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />


                    <div
                        className="
                            relative
                            z-10
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            px-6
                        "
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1
                                className="
                                    text-white
                                    text-5xl
                                    md:text-7xl
                                    font-light
                                    tracking-wide
                                    mb-6
                                "
                            >
                                قائمة الأمنيات
                            </h1>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    text-white/90
                                    text-sm
                                    md:text-base
                                "
                            >
                                <span
                                    onClick={() => router.visit("/")}
                                    className="
                                        cursor-pointer
                                        text-white/70
                                        hover:text-white/50
                                        transition
                                    "
                                >
                                    الرئيسية
                                </span>

                                <span>/</span>

                                <span className="font-medium text-[var(--primary)]">
                                    قائمة الأمنيات
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ================= CONTENT ================= */}
                <section className="relative -mt-16 z-20 pb-24">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="
                               bg-[#faf8f5]
                                rounded-[30px]
                                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                                border
                                border-gray-100
                                p-8
                                mb-14
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    items-center
                                    justify-between
                                    gap-8
                                "
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-[var(--primary)]/10
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        <FiHeart
                                            size={28}
                                            className="text-[var(--primary)]"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900">
                                            منتجاتك المفضلة
                                        </h2>

                                        <p className="text-gray-500 mt-1">
                                            لديك {products.length} منتج محفوظ
                                            في قائمة الأمنيات
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.visit("/shop")}
                                    className="
                                        group
                                        px-8
                                        py-4
                                        rounded-full
                                        bg-[var(--primary)]
                                        text-white
                                        flex
                                        items-center
                                        gap-3
                                        hover:opacity-90
                                        transition-all
                                    "
                                >
                                    استكشاف المزيد

                                    <FiArrowLeft
                                        className="
                                            transition-transform
                                            group-hover:-translate-x-1
                                        "
                                    />
                                </button>
                            </div>
                        </motion.div>

                        {/* Products */}
                        {products.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: {
                                            staggerChildren: 0.08,
                                        },
                                    },
                                }}
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                    xl:grid-cols-4
                                    gap-8
                                "
                            >
                                {products.map((product) => (
                                    <WishlistCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <EmptyState />
                        )}
                    </div>
                </section>
            </div>

            <FeaturesSection services={services} />
            <RecentlyViewedSection recentProducts={recentProducts} />
        </SiteLayout>
    );
}

function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
                bg-white
                rounded-[32px]
                p-20
                text-center
                shadow-sm
                border
                border-gray-100
            "
        >
            <div
                className="
                    w-24
                    h-24
                    mx-auto
                    rounded-full
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    mb-8
                "
            >
                <FiHeart size={34} className="text-gray-400" />
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">
                لا توجد عناصر في قائمة الأمنيات
            </h2>

            <p className="text-gray-500 mt-4 max-w-md mx-auto leading-8">
                لم تقم بإضافة أي منتجات بعد. استكشف مجموعتنا الفنية
                وأضف القطع التي تعجبك للعودة إليها لاحقًا.
            </p>

            <button
                onClick={() => router.visit("/shop")}
                className="
                    mt-8
                    px-8
                    py-4
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                    hover:opacity-90
                    transition
                "
            >
                تصفح المنتجات
            </button>
        </motion.div>
    );
}