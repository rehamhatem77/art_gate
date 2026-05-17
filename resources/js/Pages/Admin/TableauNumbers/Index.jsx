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
    FiGrid,
    FiEdit2,
    FiTrash2,
    FiLayers,
    FiBox,
} from "react-icons/fi";
import { GoNumber } from "react-icons/go";

export default function Index({ tableauNumbers }) {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});

    const { data, setData, post, processing, reset, errors } = useForm({
        tableau_number: "",
        _method: "POST",
    });

    // validation
    const validate = () => {
        const e = {};

        if (!data.tableau_number?.trim()) {
            e.tableau_number = "عدد القطع مطلوب";
        }

        setFrontendErrors(e);

        return Object.keys(e).length === 0;
    };

    // filter
    const filteredItems = useMemo(() => {
        return tableauNumbers.filter((item) =>
            item.tableau_number
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [tableauNumbers, search]);

    // open create
    const openCreate = () => {
        reset();

        setSelectedItem(null);

        setData({
            tableau_number: "",
            _method: "POST",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // open edit
    const openEdit = (item) => {
        setSelectedItem(item);

        setData({
            tableau_number: item.tableau_number,
            _method: "PUT",
        });

        setFrontendErrors({});
        setShowModal(true);
    };

    // submit
    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (selectedItem) {
            post(route("tableau-numbers.update", selectedItem.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route("tableau-numbers.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    // delete
    const openDelete = (item) => {
        setSelectedItem(item);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(
            route("tableau-numbers.destroy", selectedItem.id),
            {
                onSuccess: () => {
                    setDeleteModal(false);
                },
            },
        );
    };

    const getPiecesText = (value) => {
        return `تابلوه ${value}`;
    };

    return (
        <AuthenticatedLayout>
            <Head title="أعداد قطع التابلوه" />

            <main className="space-y-4">
                {/* Breadcrumbs */}
                
 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={() => router.get(route("dashboard"))}
                        className="hover:text-[var(--primary)] transition"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft size={15} />

                    <span className="text-[var(--primary)] font-medium">
                        عدد قطع اللوحة
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
                                                         <GoNumber className="text-2xl text-[var(--primary)]" />
                                                     </div>
                             
                                                     <div>
                                                         <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                                                           إدارة أعداد قطع التابلوه
                                                         </h1>
                             
                                                         <p className="text-gray-500 mt-1">
                                                                                         إدارة تقسيمات اللوحات وعدد القطع الخاصة بها

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
                                                     إضافة عدد جديد
                                                 </button>
                                             </div>

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بعدد القطع..."
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

                {/* Cards */}
                {filteredItems.length > 0 ? (
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            gap-5
                        "
                    >
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    bg-white
                                    border border-gray-100
                                    p-5
                                    shadow-sm
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all duration-300
                                "
                            >
                                {/* Background decoration */}
                                <div
                                    className="
                                        absolute
                                        left-0 top-0
                                        w-28 h-28
                                        rounded-full
                                        bg-[var(--primary)]/5
                                        -translate-x-10 -translate-y-10
                                    "
                                />

                                {/* Top */}
                                <div className="relative flex items-start justify-between">
                                    <div
                                        className="
                                            w-14 h-14
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-[var(--primary)]/15
                                            to-[var(--primary)]/5
                                            flex items-center justify-center
                                            text-[var(--primary)]
                                        "
                                    >
                                        <FiLayers size={24} />
                                    </div>

                                    <div
                                        className="
                                            flex items-center gap-2
                                            opacity-0
                                            group-hover:opacity-100
                                            transition
                                        "
                                    >
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="
                                                w-9 h-9
                                                rounded-xl
                                                flex items-center justify-center
                                                bg-blue-50
                                                text-blue-500
                                                hover:scale-105
                                                transition
                                            "
                                        >
                                            <FiEdit2 size={15} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                openDelete(item)
                                            }
                                            className="
                                                w-9 h-9
                                                rounded-xl
                                                flex items-center justify-center
                                                bg-red-50
                                                text-red-500
                                                hover:scale-105
                                                transition
                                            "
                                        >
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative mt-6">
                                    <div
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-3 py-1
                                            rounded-full
                                            bg-[var(--primary)]/10
                                            text-[var(--primary)]
                                            text-xs
                                            font-medium
                                        "
                                    >
                                        تقسيم اللوحة
                                    </div>

                                    <h2
                                        className="
                                            text-2xl
                                            font-black
                                            text-[var(--text-dark)]
                                            mt-4
                                        "
                                    >
                                        {getPiecesText(
                                            item.tableau_number,
                                        )}
                                    </h2>

                                    <p className="text-gray-500 mt-2 leading-7">
                                        هذا النوع يتكون من{" "}
                                        <span className="font-bold text-[var(--primary)]">
                                            {item.tableau_number}
                                        </span>{" "}
                                        قطعة لعرض اللوحة بشكل عصري ومتناسق
                                    </p>
                                </div>

                                {/* Bottom Shapes */}
                                <div className="mt-6 flex items-end gap-2">
                                    {Array.from({
                                        length: Math.min(
                                            parseInt(
                                                item.tableau_number,
                                            ) || 1,
                                            5,
                                        ),
                                    }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="
                                                flex-1
                                                rounded-xl
                                                bg-gradient-to-t
                                                from-[var(--primary)]
                                                to-[var(--primary)]/60
                                                opacity-90
                                            "
                                            style={{
                                                height: `${
                                                    45 +
                                                    (i % 2 === 0
                                                        ? 20
                                                        : 0)
                                                }px`,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Number */}
                                <div
                                    className="
                                        absolute
                                        bottom-4 left-4
                                        text-6xl font-black
                                        text-gray-100
                                        pointer-events-none
                                    "
                                >
                                    {index + 1}
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
                            <FiLayers className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد تقسيمات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول عدد قطع للتابلوه الآن
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
                                    {selectedItem
                                        ? "تعديل عدد القطع"
                                        : "إضافة عدد قطع جديد"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    قم بإدخال عدد قطع التابلوه
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

                        {/* Input */}
                        <div>
                            <label className="block mb-2 font-medium">
                                عدد القطع
                            </label>

                            <input
                                type="text"
                                value={data.tableau_number}
                                onChange={(e) =>
                                    setData(
                                        "tableau_number",
                                        e.target.value,
                                    )
                                }
                                placeholder="مثال : واحد / اثنين / ثلاثة"
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

                            {(frontendErrors.tableau_number ||
                                errors.tableau_number) && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.tableau_number ||
                                        errors.tableau_number}
                                </p>
                            )}
                        </div>

                        {/* Preview */}
                        {data.tableau_number && (
                            <div
                                className="
                                    rounded-2xl
                                    border border-[var(--primary)]/15
                                    bg-[var(--primary)]/5
                                    p-4
                                "
                            >
                                <p className="text-sm text-gray-500 mb-2">
                                    معاينة
                                </p>

                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            w-12 h-12
                                            rounded-2xl
                                            bg-white
                                            flex items-center justify-center
                                            text-[var(--primary)]
                                        "
                                    >
                                        <FiLayers />
                                    </div>

                                    <h3 className="text-xl font-bold">
                                        {getPiecesText(
                                            data.tableau_number,
                                        )}
                                    </h3>
                                </div>
                            </div>
                        )}

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
                                    : selectedItem
                                      ? "حفظ التعديلات"
                                      : "إضافة العدد"}
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

                        <h2 className="text-2xl font-bold mt-5">
                            حذف عدد القطع
                        </h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف هذا التقسيم ؟
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
                                حذف العدد
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}