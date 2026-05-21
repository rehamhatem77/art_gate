// Trash.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useMemo, useState } from "react";

import {
    FiSearch,
    FiTrash2,
    FiRefreshCw,
    FiPackage,
    FiArrowLeft,
	FiAlertTriangle,
} from "react-icons/fi";

import { IoTrashOutline } from "react-icons/io5";

import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Modal from "@/Components/Modal";

export default function Trash({ products }) {
    const [search, setSearch] = useState("");
const [deleteModal, setDeleteModal] = useState(false);
 const [selected, setSelected] = useState(null);
    const filtered = useMemo(() => {
        return products.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [products, search]);

    const restore = (id) => {
        router.post(route("products.restore", id));
    };
const openDelete = (item) => {
    setSelected(item);
    setDeleteModal(true);
};

const forceDelete = () => {
    router.delete(route("products.forceDelete", selected.id), {
        onSuccess: () => {
            setDeleteModal(false);
            setSelected(null);
        },
    });
};

    return (
        <AuthenticatedLayout>
            <Head title="سلة المحذوفات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        {
                            name: "لوحة التحكم",
                            link: route("dashboard"),
                        },
                        {
                            name: "اللوحات",
                            link: route("products.index"),
                        },
                        {
                            name: "سلة المحذوفات",
                        },
                    ]}
                />

                {/* Header */}
                <AdminPageHeader
                    title="سلة المحذوفات"
                    description="إدارة اللوحات المحذوفة واستعادتها أو حذفها نهائياً"
                    icon={IoTrashOutline}
                    actions={[
                        {
                            label: "العودة للمنتجات",
                            icon: FiArrowLeft,
                            onClick: () =>
                                router.get(route("products.index")),
                            className: `
                                flex items-center justify-center gap-2
                                px-5 py-2
                                rounded-xl
                                border border-[#e7dfd8]
                                bg-white
                                font-medium
                                hover:bg-gray-50
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
                            <div
                                key={item.id}
                                className="
                                    bg-white
                                    rounded-[28px]
                                    border border-[#ece6df]
                                    overflow-hidden
                                    shadow-sm
                                "
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={
                                            item.main_image
                                                ? `/storage/${item.main_image}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={item.name}
                                        className="
                                            w-full h-[260px]
                                            object-cover
                                        "
                                    />

                                    <div
                                        className="
                                            absolute top-3 left-3
                                            px-3 py-1
                                            rounded-full
                                            bg-red-500
                                            text-white
                                            text-xs
                                            font-medium
                                        "
                                    >
                                        محذوف
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="text-lg font-bold line-clamp-1">
                                        {item.name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.code}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-5">
                                        {/* Restore */}
                                        <button
                                            onClick={() =>
                                                restore(item.id)
                                            }
                                            className="
                                                flex-1 h-11
                                                rounded-2xl
                                                bg-green-500
                                                text-white
                                                font-medium
                                                flex items-center
                                                justify-center
                                                gap-2
                                                hover:opacity-90
                                                transition
                                            "
                                        >
                                            <FiRefreshCw />
                                            استعادة
                                        </button>

                                        {/* Force Delete */}
                                        <button
                                            onClick={() =>
                                                openDelete(item)
                                            }
                                            className="
                                                flex-1 h-11
                                                rounded-2xl
                                                bg-red-500
                                                text-white
                                                font-medium
                                                flex items-center
                                                justify-center
                                                gap-2
                                                hover:opacity-90
                                                transition
                                            "
                                        >
                                            <FiTrash2 />
                                            حذف نهائي
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                            لا توجد منتجات محذوفة
                        </h2>

                        <p className="text-gray-500 mt-2">
                            جميع المنتجات تعمل بشكل طبيعي
                        </p>

                        <button
                            onClick={() =>
                                router.get(route("products.index"))
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
                            <FiArrowLeft />
                            العودة للمنتجات
                        </button>
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
                            <br />
                            لا يمكن التراجع عن هذا الإجراء
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
                                onClick={forceDelete}
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