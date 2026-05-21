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
import { MdOutlineCategory } from "react-icons/md";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";

export default function Index({ frameTypes ,filters }) {
   const [search, setSearch] = useState(filters?.search || "");
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});

    const { data, setData, post, processing, reset } = useForm({
        type: "",
        colors: [],
        _method: "POST",
    });

    // ---------------- validation ----------------
    const validate = () => {
        const e = {};

        if (!data.type.trim()) {
            e.type = "اسم النوع مطلوب";
        }

        // if (!data.colors.length) {
        //     e.colors = "يجب إضافة لون واحد على الأقل";
        // }

        data.colors.forEach((c, i) => {
            if (!c.name?.trim()) {
                e[`color_${i}_name`] = "اسم اللون مطلوب";
            }
            if (!c.code?.trim()) {
                e[`color_${i}_code`] = "كود اللون مطلوب";
            }
        });

        setFrontendErrors(e);
        return Object.keys(e).length === 0;
    };

    // ---------------- filter ----------------
    useEffect(() => {
    const delay = setTimeout(() => {
        router.get(
            route("frame-types.index"),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, 400);

    return () => clearTimeout(delay);
}, [search]);

    // ---------------- colors helpers ----------------
    const addColor = () => {
        setData("colors", [...data.colors, { name: "", code: "#000000" }]);
    };

    const removeColor = (index) => {
        const updated = [...data.colors];
        updated.splice(index, 1);
        setData("colors", updated);
    };

    const updateColor = (index, key, value) => {
        const updated = [...data.colors];
        updated[index][key] = value;
        setData("colors", updated);
    };

    // ---------------- open create ----------------
    const openCreate = () => {
        reset();
        setData({
            type: "",
            colors: [],
            _method: "POST",
        });
        setSelected(null);
        setFrontendErrors({});
        setShowModal(true);
    };

    // ---------------- open edit ----------------
    const openEdit = (item) => {
        setSelected(item);
        setData({
            type: item.type,
            colors: item.colors || [],
            _method: "PUT",
        });
        setFrontendErrors({});
        setShowModal(true);
    };

    // ---------------- submit ----------------
    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        if (selected) {
            router.post(route("frame-types.update", selected.id), data, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setSelected(null);
                },
            });
        } else {
            router.post(route("frame-types.store"), data, {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    // ---------------- delete ----------------
    const openDelete = (item) => {
        setSelected(item);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route("frame-types.destroy", selected.id), {
            onSuccess: () => {
                setDeleteModal(false);
                setSelected(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="أنواع الإطارات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "أنواع الإطارات" },
                    ]}
                />

                {/* Header */}
<AdminPageHeader 
    title="إدارة نوع الإطار"
    description="إدارة جميع أنواع و ألوان إطارات اللوحات ."
    icon={MdOutlineCategory}
    actions={[
        {
            label: "إضافة إطار",
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
                        placeholder="ابحث بنوع الإطار..."
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

                {/* Grid */}
                {frameTypes.length ? (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-start ">
                        {frameTypes.map((item) => (
                            <div
                                key={item.id}
                                className="
group relative overflow-hidden
rounded-3xl
border border-gray-100
bg-white

flex flex-col
px-3 py-2
shadow-[0_2px_12px_rgba(0,0,0,0.04)]
hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
transition-all duration-300
"
                            >
                                {/* TOP STRIP */}
                                <div
                                    className="
            absolute top-0 inset-x-0 h-1
            bg-gradient-to-r
            from-[var(--primary)]
            via-yellow-400
            to-[var(--primary)]
        "
                                />

                                {/* HEADER */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h2 className="font-bold text-[15px] text-gray-800 truncate">
                                            {item.type}
                                        </h2>

                                        <p className="text-[11px] text-gray-400 mt-1">
                                            {item.colors?.length || 0} لون
                                        </p>
                                    </div>

                                    <div
                                        className="
                w-10 h-10 shrink-0
                rounded-2xl
                bg-gradient-to-br
                from-[var(--hover-accent)]
                to-white
                border border-gray-100
                flex items-center justify-center
            "
                                    >
                                        <MdOutlineCategory className="text-lg text-[var(--primary)]" />
                                    </div>
                                </div>

                                {/* COLORS */}
                                <div
                                    className="
        flex-1
        overflow-y-auto
        flex flex-wrap gap-1
        mt-3
h-[40px] max-h-[90px]
        pr-1
    "
                                >
                                    {item.colors?.map((c, i) => (
                                        <div
                                            key={i}
                                            title={c.name}
                                            className="
                    relative
                    group/color
                "
                                        >
                                            <div
                                                className="
                        w-7 h-7
                        rounded-xl
                        border-2 border-white
                        shadow-md
                       
                    "
                                                style={{
                                                    backgroundColor: c.code,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* ACTIONS */}
                                <div
                                    className="
            mt-2
            flex items-center justify-end gap-2
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all duration-300
        "
                                >
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="
                w-8 h-8
                rounded-full
                bg-blue-50
                text-blue-600
                hover:bg-blue-500
                hover:text-white
                flex items-center justify-center
                transition-all
            "
                                    >
                                        <FiEdit2 size={14} />
                                    </button>

                                    <button
                                        onClick={() => openDelete(item)}
                                        className="
                w-8 h-8
                rounded-full
                bg-red-50
                text-red-500
                hover:bg-red-500
                hover:text-white
                flex items-center justify-center
                transition-all
            "
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>

                                {/* DECOR */}
                                <div
                                    className="
            absolute -bottom-8 -left-8
            w-20 h-20
            rounded-full
            bg-[var(--hover-accent)]
            blur-2xl
            opacity-40
            pointer-events-none
        "
                                />
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
                            <MdOutlineCategory className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد أنواع إطارات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول نوع إطار الآن
                        </p>
                    </div>
                )}

                {/* ---------------- MODERN MODAL ---------------- */}

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="md"
                >
                    <form onSubmit={submit} className="p-6 space-y-4">
                        {/* HEADER */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selected
                                        ? "تعديل نوع الإطار"
                                        : "إضافة نوع إطار جديد"}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    أدخل اسم النوع وألوانه
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

                        {/* BODY */}

                        <div className="space-y-2">
                            {/* TYPE INPUT (UNCHANGED STYLE BUT FIXED STRUCTURE) */}
                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    اسم الاطار
                                </h2>

                                <input
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    placeholder="مثال: خشب فاخر"
                                    className="
                                             w-full h-12
                            rounded-2xl
                            border border-gray-200
                            bg-white
                            pr-10 pl-4
                            text-sm
                            shadow-sm
                            outline-none
                            transition-all
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]
                                        "
                                />

                                {frontendErrors.type && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {frontendErrors.type}
                                    </p>
                                )}
                            </div>

                            {/* COLORS HEADER */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        الألوان
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        أضف اسم اللون واختر اللون المناسب
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addColor}
                                    className="
                px-4 py-1
                text-sm
                rounded-xl
                bg-[var(--primary)]
                text-white
                hover:opacity-90
                transition
            "
                                >
                                    + إضافة لون
                                </button>
                            </div>

                            {/* COLORS LIST (MODERN CARDS) */}
                            <div
                                className="space-y-3 
							 max-h-64 overflow-y-auto
   flex items-center flex-wrap gap-1 mt-4
         overflow-y-auto
        whitespace-nowrap

        scroll-smooth
"
                            >
                                {data.colors.map((c, i) => (
                                    <div key={i}>
                                        {/* CARD */}
                                        <div
                                            className="
                flex items-center gap-3
                p-1
                rounded-2xl
                border
                bg-white
                shadow-sm
                hover:shadow-md
                transition
            "
                                        >
                                            {/* NAME INPUT */}
                                            <div className="flex-1">
                                                <input
                                                    placeholder="اسم اللون"
                                                    value={c.name}
                                                    onChange={(e) =>
                                                        updateColor(
                                                            i,
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="
                        w-full h-7 px-3
                        rounded-xl
                        border border-gray-200
                        focus:border-[var(--primary)]
                        outline-none
                        transition-all
                        focus:ring-1
                        focus:ring-[var(--primary)]
                    "
                                                />
                                            </div>

                                            {/* COLOR PICKER + HEX */}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={c.code}
                                                    onChange={(e) =>
                                                        updateColor(
                                                            i,
                                                            "code",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-6 h-6 rounded-lg cursor-pointer border"
                                                />

                                                <input
                                                    value={c.code}
                                                    onChange={(e) =>
                                                        updateColor(
                                                            i,
                                                            "code",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="
                        w-28 h-7 px-2
                        rounded-xl
                        border border-gray-200
                        text-xs font-mono
                        focus:border-[var(--primary)]
                        outline-none
                        transition-all
                        focus:ring-[var(--primary)]
                    "
                                                />
                                            </div>

                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                onClick={() => removeColor(i)}
                                                className="
                    w-10 h-10
                    rounded-full
                    bg-red-50
                    text-red-500
                    hover:bg-red-100
                    flex items-center justify-center
                    transition
                "
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        </div>

                                        {/* ERROR ROW */}
                                        <div className="mt-1 min-h-[18px] px-2">
                                            {frontendErrors[
                                                `color_${i}_name`
                                            ] && (
                                                <p className="text-red-500 text-xs">
                                                    {
                                                        frontendErrors[
                                                            `color_${i}_name`
                                                        ]
                                                    }
                                                </p>
                                            )}

                                            {frontendErrors[
                                                `color_${i}_code`
                                            ] && (
                                                <p className="text-red-500 text-xs">
                                                    {
                                                        frontendErrors[
                                                            `color_${i}_code`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ERROR */}
                            {frontendErrors.colors && (
                                <p className="text-red-500 text-sm">
                                    {frontendErrors.colors}
                                </p>
                            )}
                        </div>

                        {/* FOOTER (STICKY MODERN ACTION BAR) */}
                        <div className="px-6 py-4 border-t bg-white flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="
                    flex-1 h-10
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
                    flex-1 h-10
                    rounded-2xl
                    bg-[var(--primary)]
                    text-white
                    font-medium
                    shadow-sm
                    hover:opacity-90
                    transition
                "
                            >
                                {selected ? "حفظ التعديلات" : "إضافة النوع"}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* ---------------- DELETE ---------------- */}

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

                        <h2 className="text-2xl font-bold mt-5">حذف الاطار</h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف الاطار ؟
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
                                حذف الاطار
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
