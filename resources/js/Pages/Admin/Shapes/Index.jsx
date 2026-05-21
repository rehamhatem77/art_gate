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
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { RxDimensions } from "react-icons/rx";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";


export default function Index({ shapes , filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedShape, setSelectedShape] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});

    const { data, setData, post, processing, reset, errors } = useForm({
        shape: "",
        _method: "POST",
    });

    // validation
    const validate = () => {
        const e = {};

        if (!data.shape?.trim()) {
            e.shape = "اسم الشكل مطلوب";
        }

        setFrontendErrors(e);

        return Object.keys(e).length === 0;
    };

    // filter
       useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("shapes.index"),
                  { search } ,
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

        setSelectedShape(null);

        setData({
            shape: "",
            _method: "POST",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // open edit
    const openEdit = (shape) => {
        setSelectedShape(shape);

        setData({
            shape: shape.shape,
            _method: "PUT",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // submit
    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (selectedShape) {
            post(route("shapes.update", selectedShape.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route("shapes.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    // delete
    const openDelete = (shape) => {
        setSelectedShape(shape);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route("shapes.destroy", selectedShape.id), {
            onSuccess: () => {
                setDeleteModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="أشكال التابلوهات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <Breadcrumb items={[
                    { name: "لوحة التحكم", link: route("dashboard") },
                    { name: "شكل اللوحة" },
                ]} />

                {/* Header */}
<AdminPageHeader
    title="إدارة أشكال التابلوهات"
    description="التحكم في أشكال التابلوهات المتوفرة في النظام."
    icon={RxDimensions}
    actions={[
        {
            label: "إضافة شكل لوحة",
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
                        placeholder="ابحث عن شكل لوحة ..."
                        className=" w-full h-12
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
                            focus:border-[var(--primary)]"
                    />
                </div>

                {/* Shapes Grid */}
                {shapes.length > 0 ? (
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            gap-5
                        "
                    >
                        {shapes.map((shape) => (
                          <div
    key={shape.id}
    className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        bg-white/50
        max-w-[350px]
   
        
        border-r-4 border-[var(--secondary)]
        px-5 py-3
        shadow-sm
        hover:shadow-lg
        
        transition-all duration-500
    "
>

    {/* Top Design */}
    <div className="relative flex items-start justify-between">
        {/* Shape Preview */}
        <div className="flex items-center gap-4">
            <div
                className="
                    relative
                    w-16 h-16
                    
                    flex items-center justify-center
                    overflow-hidden
                "
            >
                {/* Different visual based on shape */}
                {shape.shape === "طولي" && (
                    <div
                        className="
                            w-7 h-14
                            rounded-xl
                            bg-[var(--primary)]
                            shadow-lg
                        "
                    />
                )}

                {shape.shape === "عرضي" && (
                    <div
                        className="
                            w-14 h-7
                            rounded-xl
                            bg-[var(--primary)]
                            shadow-lg
                        "
                    />
                )}
                 {shape.shape === "دائري" && (
                    <div
                        className="
                            w-12 h-12
                            rounded-full
                            bg-[var(--primary)]
                            shadow-lg
                        "
                    />
                )}

                {shape.shape === "متعدد" && (
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-5 h-5 rounded-md bg-[var(--primary)]" />
                        <div className="w-5 h-5 rounded-md bg-[var(--secondary)]" />
                        <div className="w-5 h-5 rounded-md bg-[var(--secondary)]" />
                        <div className="w-5 h-5 rounded-md bg-[var(--primary)]" />
                    </div>
                )}
                {shape.shape !== "طولي" && shape.shape !== "عرضي" && shape.shape !== "متعدد" && shape.shape !== "دائري" && (
                  
                        <RxDimensions className="text-2xl w-full h-full p-2 text-[var(--primary)]" />
                 

                )}
            </div>

            {/* Content */}
            <div>
                <div className="flex items-center">
                    <span
                        className="
                           
                            text-[var(--primary)]
                            text-xs
                            font-bold
                        "
                    >
                        شكل تابلوه
                    </span>
                </div>

                <h2
                    className="
                        mt-2
                        text-xl
                        font-black
                        text-[var(--text-dark)]
                    "
                >
                    {shape.shape}
                </h2>

                <p className="text-gray-400 text-sm">
                    تصميم للعرض داخل اللوحات
                </p>
            </div>
        </div>

        {/* Actions */}
        <div
            className="
                flex items-center gap-2
                opacity-0
                translate-y-2
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all duration-300
            "
        >
            <button
                onClick={() => openEdit(shape)}
                className="
                    w-8 h-8
                rounded-full
                bg-blue-50
                text-blue-600
                hover:bg-blue-500
                hover:text-white
                flex items-center justify-center
                transition
                "
            >
                <FiEdit2 size={16} />
            </button>

            <button
                onClick={() => openDelete(shape)}
                className="
                   
                     w-8 h-8
                rounded-full
                bg-red-50
                text-red-500
                hover:bg-red-500
                hover:text-white
                flex items-center justify-center
                transition
                "
            >
                <FiTrash2 size={16} />
            </button>
        </div>
    </div>

    {/* Bottom Decoration */}
    <div
        className="
            mt-3
            flex items-center justify-between
            border-t border-dashed border-gray-200
            pt-3
        "
    >
        <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            متاح للاستخدام
        </div>

        <div
            className="
                text-xs font-medium
                text-[var(--primary)]
                bg-[var(--primary)]/5
                px-3 py-1 rounded-full
            "
        >
            #{shape.id}
        </div>
    </div>
</div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                            bg-white
                            border border-dashed border-gray-300
                            rounded-[32px]
                            py-24
                            text-center
                            shadow-sm
                        "
                    >
                        <div
                            className="
                                w-24 h-24
                                rounded-full
                                bg-gray-100
                                mx-auto
                                flex items-center justify-center
                            "
                        >
                            <RxDimensions className="text-4xl text-gray-400" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-700">
                            لا توجد أشكال حالياً
                        </h2>

                        <p className="text-gray-500 mt-3">
                            قم بإضافة أول شكل تابلوه الآن
                        </p>

                        <button
                            onClick={openCreate}
                            className="
                                mt-8
                                h-12 px-6
                                rounded-2xl
                                bg-[var(--primary)]
                                text-white
                                inline-flex items-center gap-2
                                hover:opacity-90
                                transition
                            "
                        >
                            <FiPlus />
                            إضافة شكل جديد
                        </button>
                    </div>
                )}

                {/* Create / Edit Modal */}
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="md"
                >
                    <form onSubmit={submit} className="p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-7">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selectedShape
                                        ? "تعديل الشكل"
                                        : "إضافة شكل جديد"}
                                </h2>

                                <p className="text-gray-500 mt-2 text-sm">
                                    قم بإدخال بيانات شكل التابلوه
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
                                    transition
                                "
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Input */}
                        <div>
                            <label className="block mb-3 font-medium">
                                اسم الشكل
                            </label>

                            <input
                                type="text"
                                value={data.shape}
                                onChange={(e) =>
                                    setData("shape", e.target.value)
                                }
                                placeholder="مثال : طولي - عرضي - دائري - متعدد"
                                className="
                                    w-full h-13
                                    rounded-2xl
                                    border border-gray-200
                                    px-5
                                    outline-none
                                    transition-all
                                    focus:ring-1
                                    focus:ring-[var(--primary)]
                                    focus:border-[var(--primary)]
                                "
                            />

                            {(frontendErrors.shape || errors.shape) && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.shape || errors.shape}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="
                                    flex-1 h-12
                                    rounded-2xl
                                    border border-gray-200
                                    hover:bg-gray-50
                                    transition
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
                                    : selectedShape
                                      ? "حفظ التعديلات"
                                      : "إضافة الشكل"}
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
                                w-24 h-24
                                rounded-full
                                bg-red-100
                                flex items-center justify-center
                                mx-auto
                            "
                        >
                            <FiAlertTriangle className="text-5xl text-red-500" />
                        </div>

                        <h2 className="text-2xl font-bold mt-6">
                            حذف الشكل
                        </h2>

                        <p className="text-gray-500 mt-3 leading-8">
                            هل أنت متأكد من حذف هذا الشكل ؟
                            <br />
                            لن تتمكن من استرجاعه بعد الحذف
                        </p>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="
                                    flex-1 h-12
                                    rounded-2xl
                                    border border-gray-200
                                    hover:bg-gray-50
                                    transition
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
                                حذف الشكل
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}