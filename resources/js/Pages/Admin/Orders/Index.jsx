import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, router } from "@inertiajs/react";

import { useState } from "react";

import { FiSearch, FiShoppingBag, FiFilter } from "react-icons/fi";

import Breadcrumb from "@/Components/Breadcrumb";

import AdminPageHeader from "@/Components/AdminPageHeader";

import Pagination from "@/Components/Pagination";

import OrderCard from "./OrderCard";

import OrdersStatistics from "./OrdersStatistics";

export default function Index({
    orders,

    statistics,

    filters,
}) {
    const [search, setSearch] = useState(filters.search || "");

    const [status, setStatus] = useState(filters.status || "all");

    const apply = (
        newSearch = search,

        newStatus = status,
    ) => {
        router.get(
            route("orders.index"),
            {
                search: newSearch,
                status: newStatus,
            },
            {
                replace: true,
                preserveState: true,
            },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="الطلبات" />
            <div className="space-y-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        {
                            name: "لوحة التحكم",
                            link: route("dashboard"),
                        },
                        {
                            name: "الطلبات",
                        },
                    ]}
                />

                {/* Header */}
                <AdminPageHeader
                    title="إدارة الطلبات"
                    description="متابعة جميع طلبات العملاء وإدارة حالة الطلبات"
                    icon={FiShoppingBag}
                    actions={[]}
                />
                {/* STATISTICS */}
                <OrdersStatistics statistics={statistics} />
                {/* FILTERS */}
                <div
                    className="
                    sticky
                    top-4
                    z-20
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white/95
                    backdrop-blur-xl
                    p-5
                    shadow-sm
                "
                >
                    <div
                        className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                    "
                    >
                        {/* Search */}
                        <div
                            className="
                            relative
                            flex-1
                        "
                        >
                            <FiSearch
                                className="
                                absolute
                                right-5
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                            />

                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    apply(e.target.value);
                                }}
                                placeholder="ابحث باسم العميل أو رقم الطلب أو الهاتف..."
                                className="
                                    h-14
                                    w-full
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    pr-14
                                    pl-5
                                    outline-none
                                    transition
                                    focus:border-[var(--primary)]
                                    focus:ring-4
                                    focus:ring-[color-mix(in_srgb,var(--primary)_12%,white)]
                                "
                            />
                        </div>

                        {/* Status */}
                        <div
                            className="
                            flex
                            items-center
                            gap-3
                        "
                        >
                            <div
                                className="
                                hidden
                                md:flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[var(--bg-light)]
                            "
                            >
                                <FiFilter />
                            </div>

                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                    apply(
                                        search,
                                        e.target.value,
                                    );
                                }}
                                className="
                                    h-14
                                    min-w-[220px]
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                    px-7
                                    outline-none
                                    transition
                                    focus:border-[var(--primary)]
                                    focus:ring-4
                                    focus:ring-[color-mix(in_srgb,var(--primary)_12%,white)]
                                "
                            >
                                <option value="all">كل الطلبات</option>
                                <option value="pending">قيد المراجعة</option>
                                <option value="confirmed">تم التأكيد</option>
                                <option value="processing">قيد التجهيز</option>
                                <option value="shipping">قيد الشحن</option>
                                <option value="completed">تم التسليم</option>
                                <option value="cancelled">ملغي</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* ORDERS */}
                <div
                    className="space-y-5"
                >
                    {orders.data.length ? (
                        orders.data.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <div
                            className="
                            rounded-[32px]
                            border
                            border-dashed
                            border-gray-300
                            bg-white
                            py-24
                            text-center
                        "
                        >
                            <div
                                className="
                                mx-auto
                                flex
                                h-24
                                w-24
                                items-center
                                justify-center
                                rounded-full
                                bg-gray-100
                            "
                            >
                                <FiShoppingBag size={36} className="text-gray-400"/>
                            </div>

                            <h2
                                className="
                                mt-6
                                text-2xl
                                font-bold
                            "
                            >
                                لا توجد طلبات
                            </h2>

                            <p
                                className="
                                mt-3
                                text-gray-500
                            "
                            >
                                لم يتم العثور على أي طلبات حالياً
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}

                <Pagination links={orders.links} />
            </div>
        </AuthenticatedLayout>
    );
}
