import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import Modal from "@/Components/Modal";

import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiAlertTriangle,
    FiX,
    FiTag,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";

export default function Index({ tags ,filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        _method: "POST",
    });

    // validation
    const validate = () => {
        const e = {};

        if (!data.name?.trim()) {
            e.name = "اسم التصنيف مطلوب";
        }

        setFrontendErrors(e);

        return Object.keys(e).length === 0;
    };

    // filter tags
    useEffect(() => {
    const delay = setTimeout(() => {
        router.get(
            route("tags.index"),
            search ? { search } : {},
            {
                preserveState: true,
                replace: true,
            }
        );
    }, 400);

    return () => clearTimeout(delay);
}, [search]);

    // open create
    const openCreate = () => {
        reset();

        setSelectedTag(null);

        setData({
            name: "",
            _method: "POST",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // open edit
    const openEdit = (tag) => {
        setSelectedTag(tag);

        setData({
            name: tag.name,
            _method: "PUT",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // submit
    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (selectedTag) {
            post(route("tags.update", selectedTag.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route("tags.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    // delete
    const openDelete = (tag) => {
        setSelectedTag(tag);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route("tags.destroy", selectedTag.id), {
            onSuccess: () => {
                setDeleteModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="التصنيفات" />

            <main className="space-y-4">
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "التصنيفات" },
                    ]}
                />

                {/* Header */}

                <AdminPageHeader
                    title="إدارة التصنيفات"
                    description="إدارة جميع تصنيفات اللوحات"
                    icon={FiTag}
                    actions={[
                        {
                            label: "إضافة تصنيف",
                            icon: FiPlus,
                            onClick: openCreate,
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
                        placeholder="ابحث باسم التصنيف..."
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

                {tags.length > 0 ? (
                    <div
                        className="
                        flex flex-wrap gap-4
                        rounded-3xl
                        bg-white
                        border border-gray-100
                        p-6
                        shadow-sm
                    "
                    >
                        {tags.map((tag) => (
                            <div
                                key={tag.id}
                                className="
                                    group
                                    relative
                                    flex items-center gap-3
                                    px-5 py-3
                                    rounded-2xl
                                    bg-gray-50
                                    border border-gray-100
                                    hover:border-[var(--primary)]/20
                                    hover:bg-white
                                    transition-all duration-300
                                "
                            >
                                {/* Icon */}
                                <div
                                    className="
                                    w-9 h-9
                                    rounded-xl
                                    bg-[var(--primary)]/10
                                    flex items-center justify-center
                                    text-[var(--primary)]
                                "
                                >
                                    <FiTag size={16} />
                                </div>

                                {/* Name */}
                                <span
                                    className="
                                    font-medium
                                    text-[var(--text-dark)]
                                "
                                >
                                    {tag.name}
                                </span>

                                {/* Actions */}
                                <div
                                    className="
                                    flex items-center gap-2
                                    opacity-0
                                    group-hover:opacity-100
                                    transition
                                "
                                >
                                    <button
                                        onClick={() => openEdit(tag)}
                                        className="
                                            w-8 h-8
                                            rounded-lg
                                            flex items-center justify-center
                                            text-gray-500
                                            hover:bg-blue-50
                                            hover:text-blue-500
                                            transition
                                        "
                                    >
                                        <FiEdit2 size={15} />
                                    </button>

                                    <button
                                        onClick={() => openDelete(tag)}
                                        className="
                                            w-8 h-8
                                            rounded-lg
                                            flex items-center justify-center
                                            text-gray-500
                                            hover:bg-red-50
                                            hover:text-red-500
                                            transition
                                        "
                                    >
                                        <FiTrash2 size={15} />
                                    </button>
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
                            <FiTag className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد تصنيفات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول تصنيف الآن
                        </p>
                    </div>
                )}

                {/* Create / Edit Modal */}
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="md"
                >
                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selectedTag
                                        ? "تعديل التصنيف"
                                        : "إضافة تصنيف جديد"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    قم بإدخال بيانات التصنيف
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="
                                    w-10 h-10
                                    rounded-full
                                    hover:bg-gray-100
                                    flex items-center justify-center
                                "
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block mb-2 font-medium">
                                اسم التصنيف
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="أدخل اسم التصنيف"
                                className="
                                    w-full h-12
                                    rounded-xl
                                    border border-gray-200
                                    px-4
                                    outline-none
                                    transition-all
                                    focus:ring-1
                                    focus:ring-[var(--primary)]
                                    focus:border-[var(--primary)]
                                "
                            />

                            {(frontendErrors.name || errors.name) && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.name || errors.name}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="
                                    flex-1 h-12
                                    rounded-xl
                                    border
                                    hover:bg-gray-50
                                "
                            >
                                إلغاء
                            </button>

                            <button
                                disabled={processing}
                                className="
                                    flex-1 h-12
                                    rounded-xl
                                    bg-[var(--primary)]
                                    text-white
                                    hover:opacity-90
                                    transition
                                "
                            >
                                {processing
                                    ? "جاري الحفظ..."
                                    : selectedTag
                                      ? "حفظ التعديلات"
                                      : "إضافة التصنيف"}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Delete Modal */}
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

                        <h2 className="text-2xl font-bold mt-5">حذف التصنيف</h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف التصنيف ؟
                            <br />
                            لا يمكن التراجع عن هذا الإجراء
                        </p>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="
                                    flex-1 h-12
                                    rounded-xl
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
                                    rounded-xl
                                    bg-red-500
                                    text-white
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                حذف التصنيف
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
