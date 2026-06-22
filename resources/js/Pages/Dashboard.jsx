import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import {
    FiArrowUpRight,
    FiLayers,
    FiPackage,
    FiShoppingBag,
    FiStar,
    FiTrendingUp,
    FiEye,
    FiPlus,
    FiAlertTriangle,
    FiClock,
} from "react-icons/fi";

import { IoColorPaletteOutline } from "react-icons/io5";

import Breadcrumb from "@/Components/Breadcrumb";
import { LuUngroup } from "react-icons/lu";
import { AiOutlineTags } from "react-icons/ai";

export default function Dashboard({
    stats,
    latestProducts,
    lowStockProducts,
    categoryAnalytics,
    users,
    recentActivities,
}) {
    const cards = [
        {
            title: "إجمالي اللوحات",
            value: stats?.productsCount || 0,
            icon: IoColorPaletteOutline,
            bg: "bg-orange-100",
            color: "text-orange-600",
        },

        {
            title: "اللوحات النشطة",
            value: stats.activeProducts || 0,
            icon: FiShoppingBag,
            bg: "bg-blue-100",
            color: "text-blue-600",
        },

        {
            title: "المنتجات المميزة",
            value: stats.featuredProducts || 0,
            icon: FiStar,
            bg: "bg-yellow-100",
            color: "text-yellow-600",
        },

        {
            title: "المجموعات",
            value: stats.categoriesCount || 0,
            icon: LuUngroup,
            bg: "bg-violet-100",
            color: "text-violet-600",
        },

        {
            title: "التصنيفات",
            value: stats.tagsCount || 0,
            icon: AiOutlineTags,
            bg: "bg-pink-100",
            color: "text-pink-600",
        },

        {
            title: "المتغيرات",
            value: stats.variantsCount || 0,
            icon: FiPackage,
            bg: "bg-green-100",
            color: "text-green-600",
        },
    ];


    return (
        <AuthenticatedLayout>
            <Head title="لوحة التحكم" />

            <main className="space-y-6">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        {
                            name: "لوحة التحكم",
                        },
                    ]}
                />

                {/* Hero */}
                <section
                    className="
                        relative overflow-hidden
                        rounded-[32px]
                        border border-white/20
                        bg-gradient-to-l from-[#7F5539] via-[#9C6644] to-[#D4A373]
                        p-8 lg:p-10
                        text-white
                        shadow-xl
                    "
                >
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                        <div className="max-w-3xl">
                            <div
                                className="
                                    inline-flex items-center gap-2
                                    rounded-full
                                    bg-white/10
                                    backdrop-blur
                                    px-4 py-2
                                    text-sm
                                    border border-white/10
                                "
                            >
                                <FiTrendingUp />
                                لوحة تحكم Art Gate
                            </div>

                            <h1 className="mt-5 text-3xl lg:text-5xl font-black leading-tight">
                                إدارة متكاملة لمعرضك الفني
                            </h1>

                            <p className="mt-5 text-white/80 leading-8 text-lg">
                                متابعة المنتجات والتصنيفات والمخزون والنشاطات
                                الأخيرة من مكان واحد بتصميم عصري وتجربة سلسة.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button
                                    onClick={() =>
                                        router.get(route("products.create"))
                                    }
                                    className="
                                        h-12 px-6
                                        rounded-2xl
                                        bg-white
                                        text-[#8B5E3C]
                                        font-black
                                        flex items-center gap-2
                                        hover:opacity-80
                                        transition-all
                                    "
                                >
                                    <FiPlus />
                                    إضافة لوحة
                                </button>

                                <button
                                    onClick={() =>
                                        router.get(route("products.index"))
                                    }
                                    className="
                                        h-12 px-6
                                        rounded-2xl
                                        border border-white/20
                                        bg-white/10
                                        backdrop-blur-xl
                                        hover:bg-white/20
                                        transition
                                    "
                                >
                                    عرض اللوحات
                                </button>
                            </div>
                        </div>

                        <div
                            className="
                                hidden lg:flex
                                w-48 h-48
                                rounded-full
                                bg-white/10
                                backdrop-blur-xl
                                items-center justify-center
                                border border-white/10
                            "
                        >
                            <IoColorPaletteOutline className="text-8xl text-white" />
                        </div>
                    </div>

                    <div
                        className="
                            absolute top-0 left-0
                            w-72 h-72
                            rounded-full
                            bg-white/10 blur-3xl
                        "
                    />

                    <div
                        className="
                            absolute bottom-0 right-0
                            w-96 h-96
                            rounded-full
                            bg-black/10 blur-3xl
                        "
                    />
                </section>

                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={index}
                                className="
                                    relative overflow-hidden
                                    rounded-[28px]
                                    border border-gray-100
                                    bg-white/80
                                    backdrop-blur-xl
                                    p-6
                                    shadow-sm
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all
duration-300
                                "
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {card.title}
                                        </p>

                                        <h3 className="mt-4 text-4xl font-black text-gray-800">
                                            {card.value}
                                        </h3>
                                    </div>

                                    <div
                                        className={`
                                            w-16 h-16 rounded-2xl
                                            flex items-center justify-center
                                            ${card.bg}
                                        `}
                                    >
                                        <Icon
                                            className={`text-3xl ${card.color}`}
                                        />
                                    </div>
                                </div>

                                <div
                                    className="
                                        absolute -bottom-8 -left-8
                                        w-28 h-28
                                        rounded-full
                                        bg-black/[0.03]
                                    "
                                />
                            </div>
                        );
                    })}
                </section>

                {/* Chart + Activities */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Users */}

                    <div
                        className="
            xl:col-span-2

            rounded-[30px]

            border

            border-gray-100

            bg-white

            p-6

            shadow-sm
        "
                    >
                        <div
                            className="
                mb-8

                flex

                items-center

                justify-between
            "
                        >
                            <div>
                                <h2
                                    className="
                        text-2xl

                        font-black

                        text-gray-800
                    "
                                >
                                    المستخدمين
                                </h2>

                                <p
                                    className="
                        mt-1

                        text-sm

                        text-gray-500
                    "
                                >
                                    إدارة صلاحيات المستخدمين
                                </p>
                            </div>

                            <div
                                className="
                    rounded-2xl

                    bg-gray-100

                    px-4

                    py-2

                    font-bold
                "
                            >
                                {users.length} مستخدم
                            </div>
                        </div>

                        <div
                            className="
                max-h-[500px]

                space-y-4

                overflow-y-auto

                pr-2
            "
                        >
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="
                        flex

                        flex-col

                        gap-4

                        rounded-3xl

                        border

                        border-gray-100

                        p-5

                        md:flex-row

                        md:items-center

                        md:justify-between
                    "
                                >
                                    <div>
                                        <h3
                                            className="
                                text-lg

                                font-black

                                text-gray-800
                            "
                                        >
                                            {user.name}
                                        </h3>

                                        <p
                                            className="
                                mt-1

                                text-sm

                                text-gray-500
                            "
                                        >
                                            {user.email}
                                        </p>

                                      <div
    className="
        mt-3

        flex

        items-center

        gap-2

        text-sm

        text-gray-500
    "
>
    <FiClock />

    <span>
        انضم في {user.joined_at}
    </span>

    <span className="text-[var(--primary)]">
        ({user.joined_since})
    </span>
</div>
                                    </div>

                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            router.patch(
                                                route(
                                                    "users.change-role",

                                                    user.id,
                                                ),

                                                {
                                                    role: e.target.value,
                                                },
                                            )
                                        }
                                        className="
                            h-12

                            rounded-2xl

                            border

                            border-gray-200

                            px-8

                            font-medium

                            outline-none

                            focus:border-[var(--primary)]

                            focus:ring-1

                            focus:ring-[var(--primary)]
                        "
                                    >
                                        <option value="user">مستخدم</option>

                                        <option value="admin">مدير</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity */}
                    <div
                        className="
                            rounded-[30px]
                            border border-gray-100
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-800">
                                النشاطات الأخيرة
                            </h2>

                            <div
                                className="
                                    w-11 h-11
                                    rounded-2xl
                                    bg-gray-100
                                    flex items-center justify-center
                                "
                            >
                                <FiLayers className="text-gray-600" />
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            {recentActivities?.length ? (
                                recentActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4"
                                    >
                                        <div
                                            className="
                                                w-12 h-12
                                                rounded-2xl
                                                bg-[#F4ECE5]
                                                flex items-center justify-center
                                                text-[#8B5E3C]
                                            "
                                        >
                                            <FiPackage />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-black text-gray-800">
                                                {activity.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {activity.description}
                                            </p>

                                            <span className="text-xs text-gray-400 mt-2 inline-block">
                                                {activity.date}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-72 flex flex-col items-center justify-center text-center">
                                    <FiLayers className="text-5xl text-gray-300" />

                                    <p className="mt-4 text-gray-500">
                                        لا توجد نشاطات حالياً
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Latest Products */}
                <section
                    className="
                        rounded-[30px]
                        border border-gray-100
                        bg-white
                        p-6
                        shadow-sm
                    "
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-gray-800">
                                أحدث اللوحات
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                أحدث المنتجات المضافة
                            </p>
                        </div>

                        <button
                            onClick={() => router.get(route("products.index"))}
                            className="
                                h-11 px-5
                                rounded-2xl
                                bg-[var(--primary)]
                                text-white
                                font-medium
                                hover:opacity-90
                                transition
                            "
                        >
                            عرض الكل
                        </button>
                    </div>

                    {latestProducts?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                            {latestProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="
                                        overflow-hidden
                                        rounded-[28px]
                                        border border-gray-100
                                        bg-white
                                        group
                                        hover:shadow-xl
                                        transition-all
                                    "
                                >
                                    <div className="h-64 overflow-hidden bg-gray-100">
                                        <img
                                            src={
                                                product.main_image
                                                    ? `/storage/${product.main_image}`
                                                    : "/placeholder.png"
                                            }
                                            alt={product.name}
                                            className="
                                                w-full h-full object-cover
                                                group-hover:scale-105
                                                transition duration-500
                                            "
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-black text-lg text-gray-800 line-clamp-1">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-gray-500">
                                                {product.category?.name ||
                                                    "بدون مجموعة"}
                                            </span>

                                            <span className="font-black text-[var(--primary)]">
                                                #{product.code}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "products.show",
                                                        product.id,
                                                    ),
                                                )
                                            }
                                            className="
                                                mt-5
                                                w-full h-11
                                                rounded-2xl
                                                border
                                                flex items-center justify-center gap-2
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >
                                            <FiEye />
                                            عرض التفاصيل
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-72 flex flex-col items-center justify-center text-center">
                            <FiPackage className="text-6xl text-gray-300" />

                            <h3 className="mt-5 text-xl font-black">
                                لا توجد منتجات حالياً
                            </h3>

                            <p className="text-gray-500 mt-2">
                                قم بإضافة أول لوحة فنية الآن
                            </p>
                        </div>
                    )}
                </section>

                {/* Analytics + Low stock */}
                <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {/* Categories */}
                    <div
                        className="
                            rounded-[30px]
                            border border-gray-100
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <h2 className="text-2xl font-black text-gray-800 mb-8">
                            أكثر المجموعات استخداماً
                        </h2>

                        <div className="space-y-5">
                            {categoryAnalytics?.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-gray-700">
                                            {item.name}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            {item.count} لوحة
                                        </span>
                                    </div>

                                    <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                                        <div
                                            className="
                                                h-full rounded-full
                                                bg-gradient-to-r
                                                from-[#7F5539]
                                                to-[#D4A373]
                                            "
                                            style={{
                                                width: `${Math.min(
                                                    item.count * 10,
                                                    100,
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low stock */}
                    <div
                        className="
                            rounded-[30px]
                            border border-gray-100
                            bg-white
                            p-6
                            shadow-sm
                        "
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-800">
                                المنتجات قليلة المخزون
                            </h2>

                            <div
                                className="
                                    w-11 h-11
                                    rounded-2xl
                                    bg-red-100
                                    text-red-600
                                    flex items-center justify-center
                                "
                            >
                                <FiAlertTriangle />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {lowStockProducts?.length ? (
                                lowStockProducts.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="
                                            flex items-center justify-between
                                            rounded-2xl
                                            border border-gray-100
                                            p-4
                                        "
                                    >
                                        <div>
                                            <h3 className="font-black text-gray-800">
                                                {variant.product?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {variant.size?.height}x
                                                {variant.size?.width} /{" "}
                                                {variant.frame_type?.type}
                                            </p>
                                        </div>

                                        <div
                                            className="
                                                px-4 py-2
                                                rounded-full
                                                bg-red-100
                                                text-red-700
                                                font-black
                                            "
                                        >
                                            {variant.stock} متبقي
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-64 flex items-center justify-center text-gray-500">
                                    لا توجد منتجات منخفضة المخزون
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
