import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";

import Modal from "@/Components/Modal";

import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiAlertTriangle,
    FiX,
    FiMaximize2,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { SlSizeFullscreen } from "react-icons/sl";

export default function Index({ sizes }) {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");

    const { data, setData, post, processing, reset, errors } = useForm({
        size: "",
        _method: "POST",
    });

    // validation
    const validate = () => {
        const e = {};

        if (!width.toString().trim()) {
            e.width = "العرض مطلوب";
        }

        if (!height.toString().trim()) {
            e.height = "الطول مطلوب";
        }

        if (
            width &&
            height &&
            (isNaN(Number(width)) || isNaN(Number(height)))
        ) {
            e.size = "يجب إدخال أرقام فقط";
        }

        setFrontendErrors(e);

        return Object.keys(e).length === 0;
    };

    // filter
    const filteredSizes = useMemo(() => {
        return sizes.filter((size) =>
            `${size.width} × ${size.height}`
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [sizes, search]);

    // create
    const openCreate = () => {
        reset();

        setSelectedSize(null);

        setWidth("");
        setHeight("");

        setData({
            size: "",
            _method: "POST",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // edit
    const openEdit = (size) => {
        setSelectedSize(size);

        setWidth(size.width);
        setHeight(size.height);

        setFrontendErrors({});
        setShowModal(true);
    };

    // submit
    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (selectedSize) {
            router.post(
                route("sizes.update", selectedSize.id),
                {
                    width: width,
                    height: height,
                    _method: "PUT",
                },
                {
                    onSuccess: () => {
                        setShowModal(false);
                        reset();
                        setWidth("");
                        setHeight("");
                        setSelectedSize(null);
                    },
                },
            );
        } else {
            router.post(
                route("sizes.store"),
                {
                    width: width,
                    height: height,
                },
                {
                    onSuccess: () => {
                        setShowModal(false);
                        reset();
                        setWidth("");
                        setHeight("");
                    },
                },
            );
        }
    };

    // delete
    const openDelete = (size) => {
        setSelectedSize(size);
        setDeleteModal(true);
    };

    const destroy = () => {
        if (!selectedSize) return;

        router.delete(route("sizes.destroy", selectedSize.id), {
            onSuccess: () => {
                setDeleteModal(false);
                setSelectedSize(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="المقاسات" />

            <main className="space-y-4">
                {/* Breadcrumb */}

                <div className="flex items-center gap-1 text-sm">
                    <button
                        onClick={() => router.get(route("dashboard"))}
                        className="hover:text-[var(--primary)] transition"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft />

                    <span className="text-[var(--primary)] font-medium">
                        المقاسات
                    </span>
                </div>

                {/* Header */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                w-14 h-14
                                rounded-2xl
                                bg-[var(--hover-accent)]
                                flex items-center justify-center
                            "
                        >
                            <SlSizeFullscreen className="text-2xl text-[var(--primary)]" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                                إدارة المقاسات
                            </h1>

                            <p className="text-gray-500 mt-1">
                                إدارة جميع مقاسات اللوحات
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openCreate}
                        className="
                            flex items-center justify-center gap-2
                            px-5 py-2
                            rounded-xl
                            bg-[var(--primary)]
                            text-white
                            font-medium
                            shadow-sm
                            hover:opacity-90
                            transition-all
                        "
                    >
                        <FiPlus />
                        إضافة مقاس
                    </button>
                </div>

                {/* Search */}

                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالمقاس..."
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

                {/* Sizes */}

                {filteredSizes.length > 0 ? (
                    <div
                        className="
                            grid
                            grid-cols-3
                            sm:grid-cols-4
                            md:grid-cols-5
                            xl:grid-cols-6
                            gap-3
                        "
                    >
                        {filteredSizes.map((size) => (
                            <div
                                key={size.id}
                                className="
        group
        relative
        w-40
        mx-auto
    "
                            >
                                {/* FRAME = THE ONLY CARD */}
                                <div
                                    className="
            relative
            w-40 h-44
            rounded-3xl
            border-[5px]
            border-[var(--primary)]/20
            bg-white
            flex items-center justify-center
            shadow-sm
            transition-shadow duration-300
            group-hover:shadow-lg
        "
                                >
                                    {/* inner dashed frame */}
                                    <div
                                        className="
                absolute inset-3
                rounded-2xl
                border border-dashed border-gray-200
            "
                                    />

                                    {/* size text */}
                                    <div className="relative z-10 text-center">
                                        <div
                                            className="
            transition-all duration-300
            group-hover:-translate-y-3
        "
                                        >
                                            <h2 className="text-lg font-bold text-[var(--text-dark)]">
                                                {size.height} × {size.width}
                                            </h2>
                                            <span className="text-xs text-gray-500">
                                                سم
                                            </span>
                                        </div>
                                    </div>

                                    {/* ACTIONS (smooth floating hover, no space reserved) */}
                       <div
    className="
        absolute
        bottom-6
        inset-x-0

        flex justify-center items-center gap-2

        opacity-0
        translate-y-3

        group-hover:opacity-100
        group-hover:translate-y-0

        transition-all duration-300

        will-change-transform
    "
>
                                    
                                        {/* edit */}
                                        <button
                                            onClick={() => openEdit(size)}
                                            className="
                    w-8 h-8
                    rounded-full
                    bg-blue-500
                    text-white
                    flex items-center justify-center
                    shadow-sm
                    hover:bg-blue-600
                    
                "
                                        >
                                            <FiEdit2 size={13} />
                                        </button>

                                        {/* delete */}
                                        <button
                                            onClick={() => openDelete(size)}
                                            className="
                    w-8 h-8
                    rounded-full
                    bg-red-500
                    text-white
                    flex items-center justify-center
                    shadow-sm
                    hover:bg-red-600
                 
                "
                                        >
                                            <FiTrash2 size={13} />
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
                            <SlSizeFullscreen className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد مقاسات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول مقاس الآن
                        </p>
                    </div>
                )}

                {/* Create / Edit Modal */}

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="md"
                >
                    <form onSubmit={submit} className="p-6 space-y-4">
                        {/* Header */}

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selectedSize
                                        ? "تعديل المقاس"
                                        : "إضافة مقاس جديد"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    أدخل أبعاد المقاس بالسنتيمتر
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

                        {/* Inputs */}

                        <div className="space-y-4">
                            <div
                                className="
                                    grid grid-cols-[1fr_auto_1fr]
                                    gap-3 items-center
                                "
                            >
                                {/* Height */}

                                <div>
                                    <label className="block mb-2 font-medium">
                                        الطول
                                    </label>

                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) =>
                                            setHeight(e.target.value)
                                        }
                                        placeholder="100"
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

                                    {frontendErrors.height && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {frontendErrors.height}
                                        </p>
                                    )}
                                </div>

                                {/* X */}

                                <div
                                    className="
                                        mt-8
                                        w-12 h-12
                                        rounded-2xl
                                        bg-gray-100
                                        flex items-center justify-center
                                        text-2xl
                                        text-gray-400
                                    "
                                >
                                    ×
                                </div>

                                {/* Width */}

                                <div>
                                    <label className="block mb-2 font-medium">
                                        العرض
                                    </label>

                                    <input
                                        type="number"
                                        value={width}
                                        onChange={(e) =>
                                            setWidth(e.target.value)
                                        }
                                        placeholder="70"
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

                                    {frontendErrors.width && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {frontendErrors.width}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {(frontendErrors.size || errors.size) && (
                                <p className="text-red-500 text-sm">
                                    {frontendErrors.size || errors.size}
                                </p>
                            )}

                            <div
                                className="
                                    rounded-2xl
                                    bg-gray-50
                                    border border-gray-100
                                    p-4
                                    text-center
                                "
                            >
                                <p className="text-sm text-gray-500">
                                    المقاس النهائي
                                </p>

                                <h3
                                    className="
                                        text-2xl
                                        font-black
                                        text-[var(--primary)]
                                        mt-1
                                    "
                                >
                                    {height || 0} × {width || 0}
                                </h3>
                            </div>
                        </div>

                        {/* Actions */}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
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
                                disabled={processing}
                                className="
                                    flex-1 h-12
                                    rounded-2xl
                                    bg-[var(--primary)]
                                    text-white
                                    hover:opacity-90
                                    transition
                                "
                            >
                                {processing
                                    ? "جاري الحفظ..."
                                    : selectedSize
                                      ? "حفظ التعديلات"
                                      : "إضافة المقاس"}
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

                        <h2 className="text-2xl font-bold mt-5">حذف المقاس</h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف المقاس ؟
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
                                حذف المقاس
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
