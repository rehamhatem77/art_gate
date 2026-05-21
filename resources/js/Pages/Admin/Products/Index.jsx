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
    FiAlertTriangle,
} from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";
import ProductCard from "./Components/ProductCard";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import FilterPill from "@/Components/FilterPill";

export default function Index({ products, filters, categories }) {
    const [search, setSearch] = useState(filters.search || "");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const statusOptions = [
        { label: "كل اللوحات", value: "all" },
        { label: "النشطة", value: "active" },
    ];

    const featuredOptions = [
        { label: "المميزة", value: "1" },
        { label: "الغير مميزة", value: "0" },
    ];
    const [filterState, setFiltersState] = useState({
        status: filters.status || "all",
        featured: filters.featured || "all",
        category_id: filters.category_id || "",
    });

    const handleSearch = (value) => {
        setSearch(value);

        router.get(
            route("products.index"),
            {
                search: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };
    const applyFilters = (newFilters) => {
        const merged = {
            search,
            ...filterState,
            ...newFilters,
        };

        setFiltersState(merged);

        router.get(route("products.index"), merged, {
            preserveState: true,
            replace: true,
        });
    };

    const openDelete = (item) => {
        setSelected(item);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route("products.destroy", selected.id), {
            onSuccess: () => {
                setDeleteModal(false);
                setSelected(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="اللوحات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "اللوحات" },
                    ]}
                />

                {/* Header */}

                <AdminPageHeader
                    title="إدارة اللوحات"
                    description="إدارة جميع اللوحات والتصاميم والمتغيرات الخاصة بها"
                    icon={IoColorPaletteOutline}
                    actions={[
                        {
                            label: "سلة المحذوفات",
                            type: "button",
                            icon: FiTrash2,
                            onClick: () => router.get(route("products.trash")),
                            className: `
                flex items-center justify-center gap-2
                px-5 py-2
                rounded-xl
                bg-red-700
                text-white
                font-medium
                shadow-sm
                hover:opacity-90
                transition-all
            `,
                        },
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
                        onChange={(e) => handleSearch(e.target.value)}
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
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {statusOptions.map((opt) => (
                        <FilterPill
                            key={opt.value}
                            label={opt.label}
                            active={filterState.status === opt.value}
                            onClick={() => {
                                const newValue =
                                    filterState.status === opt.value
                                        ? "all"
                                        : opt.value;

                                applyFilters({ status: newValue });
                            }}
                        />
                    ))}

                    {featuredOptions.map((opt) => (
                        <FilterPill
                            key={opt.value}
                            label={opt.label}
                            active={filterState.featured === opt.value}
                            onClick={() => {
                                const newValue =
                                    filterState.featured === opt.value
                                        ? "all"
                                        : opt.value;

                                applyFilters({ featured: newValue });
                            }}
                        />
                    ))}

                    <select
                        value={filterState.category_id}
                        onChange={(e) => {
                            const value = e.target.value;

                            applyFilters({
                                category_id:
                                    value === filterState.category_id
                                        ? ""
                                        : value,
                            });
                        }}
                        className="h-10 rounded-2xl border border-[var(--primary)]outline-none
                           
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)] "
                    >
                        <option value="">كل المجموعات </option>

                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                {products.data.length ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {products.data.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    onEdit={() =>
                                        router.get(
                                            route("products.edit", item.id),
                                        )
                                    }
                                    onDelete={() => openDelete(item)}
                                    onShow={() =>
                                        router.get(
                                            route("products.show", item.id),
                                        )
                                    }
                                />
                            ))}
                        </div>
                        <Pagination links={products?.links} />
                    </>
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
                    </div>
                )}

                <Modal
                    show={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    maxWidth="md"
                >
                    <div className="p-8 text-center">
                        <div
                            className="
                                w-20 h-20
                                rounded-full
                                bg-red-100
                                flex items-center justify-center
                                mx-auto
                            "
                        >
                            <FiAlertTriangle className="text-4xl text-red-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-5">حذف اللوحة</h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف اللوحة ؟
                        </p>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="
                                    flex-1 h-12
                                    rounded-2xl
                                    border
                                    hover:bg-gray-50
                                "
                            >
                                إلغاء
                            </button>

                            <button
                                onClick={destroy}
                                className="
                                    flex-1 h-12
                                    rounded-2xl
                                    bg-red-500
                                    text-white
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                حذف اللوحة
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
