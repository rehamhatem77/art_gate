import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useMemo, useState } from "react";

import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiEdit2,
    FiTrash2,
    FiPackage,
    FiGrid,
    FiLayers,
} from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";
import ProductCard from "./Components/ProductCard";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";

export default function Index({ products }) {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return products.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [products, search]);

    const destroy = (id) => {
        if (!confirm("هل أنت متأكد من حذف اللوحة ؟")) return;

        router.delete(route("admin.products.destroy", id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="اللوحات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <Breadcrumb items={[
                    { name: "لوحة التحكم", link: route("dashboard") },
                    { name: "اللوحات" }
                ]} />

                {/* Header */}
                
<AdminPageHeader
    title="إدارة اللوحات"
    description="إدارة جميع اللوحات والتصاميم والمتغيرات الخاصة بها"
    icon={IoColorPaletteOutline}
    actions={[
        {
            label: "إضافة لوحة",
            icon: FiPlus,
            onClick: () => router.get(route("products.create")),
            className: `
                flex items-center justify-center gap-2
                px-5 py-2
                rounded-xl
                bg-[var(--primary)]
                text-white
                font-medium
                shadow-sm
                hover:opacity-90
                transition-all
            `,
        },
    ]}
/>

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم اللوحة..."
                        className="
                            w-full h-12
                            rounded-2xl
                            border border-gray-200
                            bg-white
                            pr-12 pl-4
                            text-sm
                            shadow-sm
                            outline-none
                            transition-all
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]
                        "
                    />
                </div>

                {/* Grid */}
                {filtered.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={item}
                                onEdit={() =>
                                    router.get(
                                        route("products.edit", item.id),
                                    )
                                }
                                onDelete={() => destroy(item.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                        bg-white
                        rounded-3xl
                        border border-dashed border-gray-300
                        py-20
                        text-center
                    "
                    >
                        <div
                            className="
                            w-20 h-20
                            rounded-full
                            bg-gray-100
                            mx-auto
                            flex items-center justify-center
                        "
                        >
                            <FiPackage className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد منتجات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول منتج الآن
                        </p>

                        <button
                            onClick={() =>
                                router.get(route("admin.products.create"))
                            }
                            className="
                            mt-6
                            inline-flex items-center gap-2
                            px-5 py-3
                            rounded-2xl
                            bg-[var(--primary)]
                            text-white
                            font-medium
                            hover:opacity-90
                            transition
                        "
                        >
                            <FiPlus />
                            إضافة منتج
                        </button>
                    </div>
                )}
            </main>
        </AuthenticatedLayout>
    );
}
