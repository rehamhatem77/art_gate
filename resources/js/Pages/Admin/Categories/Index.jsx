import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { getImage } from "@/Utils/GetImage";
import Modal from "@/Components/Modal";
import CategoryCard from "./Components/CategoryCard";
import { Listbox, Transition } from "@headlessui/react";

import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiAlertTriangle,
    FiUploadCloud,
    FiX,
} from "react-icons/fi";

import { LuUngroup } from "react-icons/lu";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Select from "react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { artworkIcons, iconsMap } from "@/Components/IconPicker";


export default function Index({ categories, filters }) {
    const [search, setSearch] = useState(filters?.search || "");

    const [showModal, setShowModal] = useState(false);


    const [deleteModal, setDeleteModal] = useState(false);


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [frontendErrors, setFrontendErrors] = useState({});

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        image: null,
        icon: "",
        icon_file: null,
        _method: "POST",
    });

    const iconOptions = artworkIcons.map(({ icon: Icon, label }) => {
        const iconName =
            Object.keys(iconsMap).find(
                (k) => iconsMap[k] === Icon
            ) || "";

        return {
            value: iconName,
            label,
            Icon,
        };
    });
    const isStoredImageIcon =
        selectedCategory?.icon &&
        !iconsMap[selectedCategory.icon];

    const SelectedIcon =
        data.icon && iconsMap[data.icon]
            ? iconsMap[data.icon]
            : null;
    const validate = () => {
        const errors = {};

        if (!data.name || data.name.trim() === "") {
            errors.name = "اسم المجموعة مطلوب";
        }

        // الصورة مطلوبة فقط في حالة الإنشاء
        if (!selectedCategory && !data.image) {
            errors.image = "صورة المجموعة مطلوبة";
        }
        const hasExistingIcon =
            selectedCategory?.icon;

        if (
            !data.icon &&
            !data.icon_file &&
            !hasExistingIcon
        ) {
            errors.icon = "يرجى اختيار أيقونة أو رفع صورة";
        }

        setFrontendErrors(errors);

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("categories.index"),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    const openCreate = () => {
        reset();

        setSelectedCategory(null);

        setData({
            name: "",
            image: null,
            icon: "",
            icon_file: null,
            _method: "POST",
        });

        setShowModal(true);
    };

    const openEdit = (category) => {
        setSelectedCategory(category);

        setData({
            name: category.name,
            image: null,
            icon: iconsMap[category.icon] ? category.icon : "",
            icon_file: null,
            _method: "PUT",
        });

        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (selectedCategory) {
            post(route("categories.update", selectedCategory.id), {
                forceFormData: true,
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setFrontendErrors({});
                },
            });
        } else {
            post(route("categories.store"), {
                forceFormData: true,
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                    setFrontendErrors({});
                },
            });
        }
    };

    const openDelete = (category) => {
        setSelectedCategory(category);

        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(route("categories.destroy", selectedCategory.id), {
            onSuccess: () => {
                setDeleteModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="المجموعات" />

            <main className="space-y-4">
                {/* Breadcrumb */}

                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "المجموعات" },
                    ]}
                />

                {/* Header */}

                <AdminPageHeader
                    title="إدارة المجموعات"
                    description="إدارة جميع مجموعات اللوحات"
                    icon={LuUngroup}
                    actions={[
                        {
                            label: "إضافة مجموعة",
                            onClick: openCreate,
                            icon: FiPlus,
                            className: `flex items-center justify-center gap-2
            px-5 py-2 rounded-xl
            bg-[var(--primary)]
            text-white font-medium
            shadow-sm
            hover:opacity-90
            transition-all gap-2`,
                        },
                    ]}
                />

                {/* Search */}

                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم المجموعة..."
                        className="
                w-full h-12 rounded-2xl
                border border-gray-200
                bg-white
                pr-12 pl-4
                text-sm
                shadow-sm
border-none 
                outline-none
                transition-all
focus:ring-offset-1
                focus:ring-1 focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
            "
                    />
                </div>

                {/* Grid */}

                {categories.length > 0 ? (
                    <div
                        className="
                            grid
                            grid-cols-2
                            sm:grid-cols-3
                            md:grid-cols-4
                            xl:grid-cols-5
                            gap-6
                        "
                    >
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onEdit={openEdit}
                                onDelete={openDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                            bg-white
                            rounded-3xl
                            border border-dashed
                            border-gray-300
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
                            <LuUngroup className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد مجموعات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول مجموعة الآن
                        </p>
                    </div>
                )}

                {/* Create / Edit Modal */}

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="lg"
                >
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selectedCategory
                                        ? "تعديل المجموعة"
                                        : "إضافة مجموعة جديدة"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    قم بإدخال بيانات المجموعة
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
                                اسم المجموعة
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="
                                    w-full h-12
                                    rounded-xl
                                    border border-gray-200
                                    px-4
                                    outline-none
                                    
                                    transition-all
                                    focus:ring-1 focus:ring-[var(--primary)]
                                    focus:border-[var(--primary)]
                                "
                                placeholder="أدخل اسم المجموعة"
                            />

                            {frontendErrors.name && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.name}
                                </p>
                            )}
                        </div>

                        {/* Image */}

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <label className="block font-medium">
                                    صورة المجموعة
                                </label>
                                <span className="text-sm text-gray-500">
                                    (PNG - JPG - WEBP - JPEG)
                                </span>
                            </div>

                            <div
                                className="
            flex items-center gap-4
            rounded-2xl
            border border-gray-200
            bg-gray-50
            p-3
        "
                            >
                                {/* Preview */}

                                <div
                                    className="
                w-20 h-20
                rounded-xl
                overflow-hidden
                border
                bg-white
                flex items-center justify-center
                flex-shrink-0
            "
                                >
                                    {data.image || selectedCategory?.image ? (
                                        <img
                                            src={
                                                data.image
                                                    ? URL.createObjectURL(
                                                        data.image,
                                                    )
                                                    : getImage(
                                                        selectedCategory.image,
                                                    )
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FiUploadCloud className="text-2xl text-gray-400" />
                                    )}
                                </div>

                                {/* Upload Content */}

                                <label
                                    className="
                    mt-3 inline-flex
                    items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-[var(--primary)]
                    text-white
                    text-sm
                    cursor-pointer
                    hover:opacity-90
                    transition
                "
                                >
                                    <FiUploadCloud />
                                    رفع صورة
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        hidden
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                </label>
                            </div>

                            {frontendErrors.image && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.image}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                اختر أو ارفع صورة لأيقونة المجموعة
                            </label>

                            <Select
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                menuPlacement="top"
                                value={
                                    iconOptions.find(
                                        (option) => option.value === data.icon
                                    ) || null
                                }
                                onChange={(option) => {
                                    setData((prev) => ({
                                        ...prev,
                                        icon: option?.value || "",
                                        icon_file: null,
                                    }));
                                }}
                                options={iconOptions}
                                placeholder="اختر أيقونة المجموعة"
                                isSearchable
                                formatOptionLabel={(option) => (
                                    <div className="flex items-center gap-3">
                                        <option.Icon
                                            className="text-[var(--primary)]"
                                        />
                                        <span>{option.label}</span>
                                    </div>
                                )}
                                styles={{
                                    menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 99999,
                                    }),
                                    control: (base, state) => ({
                                        ...base,
                                        minHeight: 48,
                                        borderRadius: 12,
                                        borderColor: state.isFocused
                                            ? "var(--primary)"
                                            : "#e5e7eb",
                                        boxShadow: "none",

                                        "&:hover": {
                                            borderColor: "var(--primary)",
                                        },
                                    }),
                                }}
                            />
                            <div>

                                <div
                                    className="
            flex items-center gap-4
            rounded-xl
            border border-gray-200
            p-3
            bg-gray-50
        "
                                >
                                    <div
                                        className="
                w-14 h-14
                rounded-lg
                overflow-hidden
                bg-white
                border
                flex items-center justify-center
            "
                                    >
                                        {data.icon_file ? (
                                            <img
                                                src={URL.createObjectURL(data.icon_file)}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : SelectedIcon ? (
                                            <SelectedIcon
                                                size={24}
                                                className="text-[var(--primary)]"
                                            />
                                        ) : isStoredImageIcon ? (
                                            <img
                                                src={getImage(selectedCategory.icon)}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FiUploadCloud className="text-gray-400 text-xl" />
                                        )}
                                    </div>

                                    <label
                                        className="
                px-4 py-2
                rounded-lg
                bg-[var(--primary)]
                text-white
                text-sm
                cursor-pointer
            "
                                    >
                                        رفع أيقونة

                                        <input
                                            hidden
                                            type="file"
                                            accept="image/png,image/svg+xml,image/webp,image/jpeg"
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                setData((prev) => ({
                                                    ...prev,
                                                    icon_file: file,
                                                    icon: "",
                                                }));
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            {frontendErrors.icon && (
                                <p className="text-red-500 text-sm mt-2">
                                    {frontendErrors.icon}
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
                                    : selectedCategory
                                        ? "حفظ التعديلات"
                                        : "إضافة المجموعة"}
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
                            حذف المجموعة
                        </h2>

                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف المجموعة ؟
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
                                حذف المجموعة
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
