import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import {
    FiArrowUpRight,
    FiBox,
    FiDollarSign,
    FiGrid,
    FiLayers,
    FiPackage,
    FiShoppingBag,
    FiStar,
    FiTrendingUp,
    FiUsers,
    FiEye,
    FiPlus,
} from "react-icons/fi";

import { IoColorPaletteOutline } from "react-icons/io5";

import Breadcrumb from "@/Components/Breadcrumb";

export default function Dashboard({
    stats = {},
    recentProducts = [],
    recentOrders = [],
    activities = [],
}) {
    const cards = [
        {
            title: "إجمالي اللوحات",
            value: stats.products || 0,
            icon: IoColorPaletteOutline,
            bg: "bg-orange-100",
            color: "text-orange-600",
        },

        {
            title: "إجمالي الطلبات",
            value: stats.orders || 0,
            icon: FiShoppingBag,
            bg: "bg-blue-100",
            color: "text-blue-600",
        },

        {
            title: "إجمالي العملاء",
            value: stats.customers || 0,
            icon: FiUsers,
            bg: "bg-emerald-100",
            color: "text-emerald-600",
        },

        {
            title: "التصنيفات",
            value: stats.categories || 0,
            icon: FiGrid,
            bg: "bg-violet-100",
            color: "text-violet-600",
        },

        {
            title: "المنتجات المميزة",
            value: stats.featured || 0,
            icon: FiStar,
            bg: "bg-yellow-100",
            color: "text-yellow-600",
        },

        {
            title: "الأرباح الشهرية",
            value: `${stats.revenue || 0} ج.م`,
            icon: FiDollarSign,
            bg: "bg-green-100",
            color: "text-green-600",
            trend: "+12%",
        },
    ];

    const chartData = [35, 55, 40, 75, 60, 90];

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
                        rounded-3xl
                        border border-white/40
                        bg-gradient-to-l from-[#8B5E3C] to-[#C08B5C]
                        p-8 lg:p-10
                        text-white
                        shadow-xl
                    "
                >
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-black">
                                مرحباً بك في لوحة التحكم
                            </h1>

                            <p className="mt-3 text-white/80 leading-8 max-w-2xl">
                                متابعة شاملة للإحصائيات والطلبات واللوحات
                                والنشاطات الخاصة بالمتجر الفني الخاص بك.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-6">
                                <button
                                    onClick={() =>
                                        router.get(route("products.create"))
                                    }
                                    className="
                                        h-12 px-6
                                        rounded-2xl
                                        bg-white
                                        text-[#8B5E3C]
                                        font-bold
                                        flex items-center gap-2
                                        hover:scale-105
                                        transition
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
                                        border border-white/30
                                        bg-white/10
                                        backdrop-blur
                                        font-medium
                                        hover:bg-white/20
                                        transition
                                    "
                                >
                                    عرض المنتجات
                                </button>
                            </div>
                        </div>

                        <div
                            className="
                                hidden lg:flex
                                w-40 h-40
                                rounded-full
                                bg-white/10
                                items-center justify-center
                                backdrop-blur-xl
                            "
                        >
                            <IoColorPaletteOutline className="text-7xl text-white" />
                        </div>
                    </div>

                    <div
                        className="
                            absolute -top-10 -left-10
                            w-40 h-40
                            rounded-full
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            absolute bottom-0 right-0
                            w-72 h-72
                            rounded-full
                            bg-white/5
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
                                    rounded-3xl
                                    bg-white/80
                                    backdrop-blur-xl
                                    border border-gray-100
                                    p-6
                                    shadow-sm
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all
                                "
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {card.title}
                                        </p>

                                        <h3 className="mt-3 text-3xl font-black text-gray-800">
                                            {card.value}
                                        </h3>

                                        {card.trend && (
                                            <div
                                                className="
                                                    mt-4 inline-flex
                                                    items-center gap-1
                                                    rounded-full
                                                    bg-green-50
                                                    px-3 py-1
                                                    text-sm
                                                    font-bold
                                                    text-green-600
                                                "
                                            >
                                                <FiTrendingUp />
                                                {card.trend}
                                            </div>
                                        )}
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
                                        absolute -bottom-6 -left-6
                                        w-24 h-24
                                        rounded-full
                                        bg-black/[0.03]
                                    "
                                />
                            </div>
                        );
                    })}
                </section>

                {/* Charts + Activity */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Chart */}
                    <div
                        className="
                            xl:col-span-2
                            rounded-3xl
                            bg-white
                            border border-gray-100
                            p-6
                            shadow-sm
                        "
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800">
                                    إحصائيات المبيعات
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    آخر 6 أشهر
                                </p>
                            </div>

                            <div
                                className="
                                    px-4 py-2
                                    rounded-2xl
                                    bg-green-50
                                    text-green-600
                                    font-bold
                                    flex items-center gap-2
                                "
                            >
                                <FiArrowUpRight />
                                نمو 18%
                            </div>
                        </div>

                        <div className="h-72 flex items-end justify-between gap-4">
                            {chartData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-1 flex flex-col items-center gap-3"
                                >
                                    <div
                                        className="
                                            w-full rounded-t-[24px]
                                            bg-gradient-to-t
                                            from-[#8B5E3C]
                                            to-[#D4A373]
                                            hover:opacity-90
                                            transition-all
                                        "
                                        style={{
                                            height: `${item}%`,
                                            minHeight: "40px",
                                        }}
                                    />

                                    <span className="text-sm text-gray-500">
                                        {
                                            [
                                                "يناير",
                                                "فبراير",
                                                "مارس",
                                                "أبريل",
                                                "مايو",
                                                "يونيو",
                                            ][index]
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity */}
                    <div
                        className="
                            rounded-3xl
                            bg-white
                            border border-gray-100
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
                                    w-10 h-10
                                    rounded-2xl
                                    bg-gray-100
                                    flex items-center justify-center
                                "
                            >
                                <FiLayers className="text-gray-600" />
                            </div>
                        </div>

                        <div className="mt-8 space-y-6">
                            {activities.length ? (
                                activities.map((activity, index) => (
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
                                            <h3 className="font-bold text-gray-800">
                                                {activity.title}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {activity.description}
                                            </p>

                                            <span className="text-xs text-gray-400 mt-2 inline-block">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="
                                        h-72
                                        flex flex-col items-center justify-center
                                        text-center
                                    "
                                >
                                    <FiLayers className="text-5xl text-gray-300" />

                                    <p className="mt-4 text-gray-500">
                                        لا توجد نشاطات حالياً
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section
                    className="
                        rounded-3xl
                        bg-white
                        border border-gray-100
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
                                أحدث المنتجات التي تمت إضافتها
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                router.get(route("products.index"))
                            }
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

                    {recentProducts.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                            {recentProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="
                                        overflow-hidden
                                        rounded-3xl
                                        border border-gray-100
                                        bg-white
                                        group
                                        hover:shadow-xl
                                        transition-all
                                    "
                                >
                                    <div className="h-60 overflow-hidden">
                                        <img
                                            src={
                                                product.main_image_url ||
                                                "/placeholder.png"
                                            }
                                            alt={product.name}
                                            className="
                                                w-full h-full object-cover
                                                group-hover:scale-110
                                                transition duration-500
                                            "
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-black text-lg text-gray-800">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-gray-500">
                                                {product.category?.name ||
                                                    "بدون تصنيف"}
                                            </span>

                                            <span className="font-black text-[var(--primary)]">
                                                {product.price || 0} ج.م
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
                        <div
                            className="
                                h-72
                                flex flex-col items-center justify-center
                                text-center
                            "
                        >
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

                {/* Orders */}
                <section
                    className="
                        rounded-3xl
                        bg-white
                        border border-gray-100
                        p-6
                        shadow-sm
                    "
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-gray-800">
                                أحدث الطلبات
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                آخر الطلبات الموجودة في المتجر
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b border-gray-100 text-right">
                                    <th className="pb-4 text-sm font-medium text-gray-500">
                                        المنتج
                                    </th>

                                    <th className="pb-4 text-sm font-medium text-gray-500">
                                        العميل
                                    </th>

                                    <th className="pb-4 text-sm font-medium text-gray-500">
                                        التاريخ
                                    </th>

                                    <th className="pb-4 text-sm font-medium text-gray-500">
                                        الحالة
                                    </th>

                                    <th className="pb-4 text-sm font-medium text-gray-500">
                                        الإجمالي
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.length ? (
                                    recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="
                                                border-b border-gray-50
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >
                                            <td className="py-5 font-bold">
                                                {order.product_name}
                                            </td>

                                            <td className="py-5 text-gray-600">
                                                {order.customer_name}
                                            </td>

                                            <td className="py-5 text-gray-500">
                                                {order.date}
                                            </td>

                                            <td className="py-5">
                                                <span
                                                    className={`
                                                        px-4 py-2 rounded-full text-sm font-bold
                                                        ${
                                                            order.status ===
                                                            "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-orange-100 text-orange-700"
                                                        }
                                                    `}
                                                >
                                                    {order.status_label}
                                                </span>
                                            </td>

                                            <td className="py-5 font-black text-[var(--primary)]">
                                                {order.total} ج.م
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-20 text-center text-gray-500"
                                        >
                                            لا توجد طلبات حالياً
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}