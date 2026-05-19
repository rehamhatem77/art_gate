import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";

import {
    FiChevronLeft,
    FiPlus,
    FiTrash2,
    FiUploadCloud,
    FiSave,
    FiX,
} from "react-icons/fi";

import { IoColorPaletteOutline } from "react-icons/io5";

import ProductCard from "./Components/ProductCard";

export default function Create({
    categories,
    shapes,
    sizes,
    frameTypes,
    tags,
}) {
    const [frontendErrors, setFrontendErrors] = useState({});
    const {
        data,
        setData,
        post,
        processing,
        errors: backendErrors,
    } = useForm({
        name: "",
        code: "",
        description: "",

        category_id: "",

        shape_id: "",

        artistic_type: "",
        place: [],
        pieces_count: "",

        featured: false,
        is_active: true,

        tags: [],
        design_colors: [],

        main_image: null,
        images: [],

        variants: [
            {
                size_id: "",
                frame_type_id: "",
                price: "",
                stock: "",
            },
        ],
    });
    const errors = {
        ...backendErrors,
        ...frontendErrors,
    };

    const validateForm = () => {
        const newErrors = {};

        /*
    |--------------------------------------------------------------------------
    | Basic Info
    |--------------------------------------------------------------------------
    */

        if (!data.name.trim()) {
            newErrors.name = "اسم اللوحة مطلوب";
        }

        if (!data.code.trim()) {
            newErrors.code = "كود المنتج مطلوب";
        }
        if (!data.description.trim()) {
            newErrors.description = "وصف اللوحة مطلوب";
        }

        /*
    |--------------------------------------------------------------------------
    | Category / Shape
    |--------------------------------------------------------------------------
    */

        if (!data.category_id) {
            newErrors.category_id = "اختر المجموعة";
        }

        if (!data.shape_id) {
            newErrors.shape_id = "اختر الشكل";
        }

        /*
    |--------------------------------------------------------------------------
    | Main Image
    |--------------------------------------------------------------------------
    */

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ];

        if (!data.main_image) {
            newErrors.main_image = "الصورة الرئيسية مطلوبة";
        } else {
            if (!allowedTypes.includes(data.main_image.type)) {
                newErrors.main_image =
                    "الصورة الرئيسية يجب أن تكون PNG أو JPG أو JPEG أو WEBP";
            }

            if (data.main_image.size > 5 * 1024 * 1024) {
                newErrors.main_image = "الصورة الرئيسية يجب ألا تتجاوز 5MB";
            }
        }

        /*
    |--------------------------------------------------------------------------
    | Gallery Images
    |--------------------------------------------------------------------------
    */

        if (data.images.length) {
            data.images.forEach((image, index) => {
                const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/webp",
                ];

                if (!allowedTypes.includes(image.type)) {
                    newErrors[`images.${index}`] =
                        `الصورة رقم ${index + 1} غير مدعومة`;
                }

                if (image.size > 5 * 1024 * 1024) {
                    newErrors[`images.${index}`] =
                        `الصورة رقم ${index + 1} أكبر من 5MB`;
                }
            });
        }

        /*
    |--------------------------------------------------------------------------
    | Variants
    |--------------------------------------------------------------------------
    */

        if (!data.variants.length) {
            newErrors.variants = "يجب إضافة متغير واحد على الأقل";
        }

        data.variants.forEach((variant, index) => {
            if (!variant.size_id) {
                newErrors[`variants.${index}.size_id`] = "اختر المقاس";
            }

            if (!variant.frame_type_id) {
                newErrors[`variants.${index}.frame_type_id`] = "اختر الإطار";
            }

            if (!variant.price) {
                newErrors[`variants.${index}.price`] = "السعر مطلوب";
            } else if (Number(variant.price) < 0) {
                newErrors[`variants.${index}.price`] = "السعر غير صحيح";
            }

            if (variant.stock !== "" && Number(variant.stock) < 0) {
                newErrors[`variants.${index}.stock`] = "المخزون غير صحيح";
            }
        });
        /*
|--------------------------------------------------------------------------
| Design Colors Validation
|--------------------------------------------------------------------------
*/

        if (data.design_colors.length) {
            data.design_colors.forEach((color, index) => {
                /*
        HEX Required
        */
                if (!color.hex?.trim()) {
                    newErrors[`design_colors.${index}.hex`] = "كود اللون مطلوب";
                }

                /*
        HEX Format
        */
                const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

                if (color.hex && !hexRegex.test(color.hex)) {
                    newErrors[`design_colors.${index}.hex`] =
                        "كود HEX غير صحيح";
                }

                /*
        Name Required
        */
                if (!color.name?.trim()) {
                    newErrors[`design_colors.${index}.name`] =
                        "اسم اللون مطلوب";
                }

                /*
        Name Length
        */
                if (color.name && color.name.length > 30) {
                    newErrors[`design_colors.${index}.name`] =
                        "اسم اللون طويل جدًا";
                }
            });
        }
        /*|--------------------------------------------------------------------------
| Pieces count Validation
|--------------------------------------------------------------------------
*/
        if (!data.pieces_count) {
            newErrors.pieces_count = "عدد القطع مطلوب";
        }

        return newErrors;
    };
    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        setFrontendErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        post(route("products.store"));
    };

    /*
    |--------------------------------------------------------------------------
    | Add Variant
    |--------------------------------------------------------------------------
    */

    const addVariant = () => {
        setData("variants", [
            ...data.variants,
            {
                size_id: "",
                frame_type_id: "",
                price: "",
                stock: "",
            },
        ]);
    };

    /*
    |--------------------------------------------------------------------------
    | Remove Variant
    |--------------------------------------------------------------------------
    */

    const removeVariant = (index) => {
        setData(
            "variants",
            data.variants.filter((_, i) => i !== index),
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Update Variant
    |--------------------------------------------------------------------------
    */

    const updateVariant = (index, field, value) => {
        const updated = [...data.variants];

        updated[index][field] = value;

        setData("variants", updated);
    };

    /*
    |--------------------------------------------------------------------------
    | Add Color
    |--------------------------------------------------------------------------
    */

    const addColor = () => {
        setData("design_colors", [...data.design_colors, "#d4af37"]);
    };

    /*
    |--------------------------------------------------------------------------
    | Preview
    |--------------------------------------------------------------------------
    */

    const previewProduct = useMemo(() => {
        return {
            ...data,

            main_image:
                data.main_image instanceof File
                    ? URL.createObjectURL(data.main_image)
                    : null,

            category: categories.find((c) => c.id == data.category_id),

            variants: data.variants,
        };
    }, [data]);
    const isSizeDisabled = (sizeId, currentFrameTypeId, currentIndex) => {
        return data.variants.some((variant, index) => {
            if (index === currentIndex) return false;

            return (
                String(variant.size_id) === String(sizeId) &&
                String(variant.frame_type_id) === String(currentFrameTypeId)
            );
        });
    };

    const isFrameDisabled = (frameTypeId, currentSizeId, currentIndex) => {
        return data.variants.some((variant, index) => {
            if (index === currentIndex) return false;

            return (
                String(variant.frame_type_id) === String(frameTypeId) &&
                String(variant.size_id) === String(currentSizeId)
            );
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="إضافة لوحة" />

            <form onSubmit={submit} className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm">
                    <button
                        type="button"
                        onClick={() => router.get(route("dashboard"))}
                        className="hover:text-[var(--primary)]"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft />

                    <button
                        type="button"
                        onClick={() => router.get(route("products.index"))}
                        className="hover:text-[var(--primary)]"
                    >
                        اللوحات
                    </button>

                    <FiChevronLeft />

                    <span className="text-[var(--primary)] font-medium">
                        إضافة لوحة
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
                            <IoColorPaletteOutline className="text-2xl text-[var(--primary)]" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                                إضافة لوحة جديدة
                            </h1>

                            <p className="text-gray-500 mt-1">
                                إضافة لوحة جديدة مع المتغيرات والصور الخاصة بها
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.get(route("products.index"))}
                            className="
                                h-11 px-5
                                rounded-2xl
                                border border-[#e7dfd8]
                                bg-white
                                font-medium
                            "
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                h-11 px-6
                                rounded-2xl
                                bg-[var(--primary)]
                                text-white
                                font-medium
                                flex items-center gap-2
                            "
                        >
                            <FiSave />
                            حفظ اللوحة
                        </button>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* LEFT */}
                    <div className="xl:col-span-8 space-y-6">
                        {/* BASIC INFO */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">
                                المعلومات الأساسية
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* NAME */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        اسم اللوحة
                                    </label>

                                    <input
                                        value={data.name}
                                        placeholder="مثال : أناقة الباليه - لوحة فنية تجريدية"
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                name: null,
                                            }));
                                        }}
                                        className="
                                            w-full h-12
                                            rounded-2xl
                                            border border-[#e8dfd7]
                                            bg-[#fcfbfa]
                                            px-4
                                            outline-none
                                            focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]
                                               "
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* CODE */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        كود المنتج
                                    </label>

                                    <input
                                        value={data.code}
                                        placeholder="مثال : bal50"
                                        onChange={(e) => {
                                            setData("code", e.target.value);
                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                code: null,
                                            }));
                                        }}
                                        className="
                                            w-full h-12
                                            rounded-2xl
                                            border border-[#e8dfd7]
                                            bg-[#fcfbfa]
                                            px-4
                                            outline-none
                                            focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]
                                        "
                                    />
                                    {errors.code && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.code}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-5">
                                <label className="text-sm font-medium mb-2 block">
                                    الوصف
                                </label>

                                <textarea
                                    value={data.description}
                                    placeholder="وصف اللوحة..."
                                    onChange={(e) => {
                                        setData("description", e.target.value);
                                        setFrontendErrors((prev) => ({
                                            ...prev,
                                            description: null,
                                        }));
                                    }}
                                    className="
                                        w-full min-h-[140px]
                                        rounded-2xl
                                        border border-[#e8dfd7]
                                        bg-[#fcfbfa]
                                        p-4
                                        resize-none
                                        outline-none
                                        focus:ring-1
                                        focus:ring-[var(--primary)]
                                        focus:border-[var(--primary)]
                                    "
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* IMAGES */}

                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">الصور</h2>

                            {/* MAIN IMAGE */}
                            <div>
                                <label className="text-sm font-medium block mb-3">
                                    الصورة الرئيسية
                                </label>

                                <label
                                    className="
                border-2 border-dashed
                border-[#e6ddd4]
                rounded-[28px]
                bg-[#fcfbfa]
                p-8
                text-center
                flex flex-col items-center justify-center
                cursor-pointer
                transition-all
                hover:border-[var(--primary)]
            "
                                >
                                    {data.main_image ? (
                                        <div className="relative w-full">
                                            <img
                                                src={URL.createObjectURL(
                                                    data.main_image,
                                                )}
                                                alt="preview"
                                                className="
                            w-full h-[320px]
                            object-cover
                            rounded-2xl
                        "
                                            />

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setData("main_image", null);
                                                }}
                                                className="
                            absolute top-3 left-3
                            w-9 h-9
                            rounded-full
                            bg-white
                            shadow
                            flex items-center justify-center
                            text-red-500
                        "
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <FiUploadCloud className="text-5xl text-[var(--primary)]" />

                                            <p className="mt-4 text-md font-medium text-gray-700">
                                                رفع الصورة الرئيسية
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, WEBP, JPEG - لا يزيد
                                                عن 5 ميجابايت
                                            </p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        hidden
                                        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                                        onChange={(e) => {
                                            setData(
                                                "main_image",
                                                e.target.files[0],
                                            );
                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                main_image: null,
                                            }));
                                        }}
                                    />
                                </label>
                                {errors.main_image && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.main_image}
                                    </p>
                                )}
                            </div>

                            {/* GALLERY */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-medium">
                                        صور إضافية
                                    </label>

                                    <label
                                        className="
                    h-10 px-4
                    rounded-xl
                    bg-[var(--hover-accent)]
                    text-[var(--primary)]
                    flex items-center gap-2
                    cursor-pointer
                    text-sm font-medium
                "
                                    >
                                        <FiPlus />
                                        إضافة صور
                                        <input
                                            type="file"
                                            hidden
                                            multiple
                                            accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                                            onChange={(e) => {
                                                setData("images", [
                                                    ...data.images,
                                                    ...Array.from(
                                                        e.target.files,
                                                    ),
                                                ]);
                                                setFrontendErrors((prev) => ({
                                                    ...prev,
                                                    images: null,
                                                }));
                                            }}
                                        />
                                    </label>
                                </div>

                                {data.images.length ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {data.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="
                            relative
                            rounded-2xl
                            overflow-hidden
                            border border-[#ebe4dd]
                            bg-[#faf8f6]
                        "
                                            >
                                                <img
                                                    src={URL.createObjectURL(
                                                        image,
                                                    )}
                                                    alt=""
                                                    className="
                                w-full h-40
                                object-cover
                            "
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "images",
                                                            data.images.filter(
                                                                (_, i) =>
                                                                    i !== index,
                                                            ),
                                                        )
                                                    }
                                                    className="
                                absolute top-2 left-2
                                w-8 h-8
                                rounded-full
                                bg-white
                                shadow
                                flex items-center justify-center
                                text-red-500
                            "
                                                >
                                                    <FiTrash2 size={15} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className="
                    border border-dashed border-[#e6ddd4]
                    rounded-2xl
                    p-10
                    text-center
                    text-gray-400
                    bg-[#fcfbfa]
                "
                                    >
                                        لا توجد صور إضافية
                                    </div>
                                )}
                                {Object.keys(errors).some((key) =>
                                    key.startsWith("images."),
                                ) && (
                                    <div className="mt-2 space-y-1">
                                        {Object.keys(errors).map((key) =>
                                            key.startsWith("images.") ? (
                                                <p
                                                    key={key}
                                                    className="text-red-500 text-sm"
                                                >
                                                    {errors[key]}
                                                </p>
                                            ) : null,
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* VARIANTS */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">المتغيرات</h2>

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="
                                        h-10 px-4
                                        rounded-xl
                                        bg-[var(--hover-accent)]
                                        text-[var(--primary)]
                                        flex items-center gap-2
                                    "
                                >
                                    <FiPlus />
                                    إضافة متغير
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.variants.map((variant, index) => (
                                    <div
                                        key={index}
                                        className="
                                                grid grid-cols-12 gap-3
                                                p-4
                                                rounded-2xl
                                                bg-[#faf8f6]
                                                border border-[#eee7e1]
                                            "
                                    >
                                        {/* SIZE */}
                                        <div className="col-span-3">
                                            <select
                                                value={variant.size_id}
                                                onChange={(e) => {
                                                    updateVariant(
                                                        index,
                                                        "size_id",
                                                        e.target.value,
                                                    );
                                                    setFrontendErrors(
                                                        (prev) => ({
                                                            ...prev,
                                                            [`variants.${index}.size_id`]:
                                                                null,
                                                        }),
                                                    );
                                                }}
                                                className="w-full h-11 rounded-xl focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border border-[#e7dfd8]"
                                            >
                                                <option>المقاس</option>

                                                {sizes.map((size) => (
                                                    <option
                                                        key={size.id}
                                                        value={size.id}
                                                        disabled={isSizeDisabled(
                                                            size.id,
                                                            variant.frame_type_id,
                                                            index,
                                                        )}
                                                    >
                                                        {size.width}x
                                                        {size.height}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors[
                                                `variants.${index}.size_id`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `variants.${index}.size_id`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* FRAME */}
                                        <div className="col-span-3">
                                            <select
                                                value={variant.frame_type_id}
                                                onChange={(e) => {
                                                    updateVariant(
                                                        index,
                                                        "frame_type_id",
                                                        e.target.value,
                                                    );
                                                    setFrontendErrors(
                                                        (prev) => ({
                                                            ...prev,
                                                            [`variants.${index}.frame_type_id`]:
                                                                null,
                                                        }),
                                                    );
                                                }}
                                                className="w-full h-11 rounded-xl focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border border-[#e7dfd8]"
                                            >
                                                <option>الإطار</option>

                                                {frameTypes.map((frame) => (
                                                    <option
                                                        key={frame.id}
                                                        value={frame.id}
                                                        disabled={isFrameDisabled(
                                                            frame.id,
                                                            variant.size_id,
                                                            index,
                                                        )}
                                                    >
                                                        {frame.type}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors[
                                                `variants.${index}.frame_type_id`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `variants.${index}.frame_type_id`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* PRICE */}
                                        <div className="col-span-2">
                                            <input
                                                placeholder="السعر"
                                                value={variant.price}
                                                onChange={(e) => {
                                                    updateVariant(
                                                        index,
                                                        "price",
                                                        e.target.value,
                                                    );
                                                    setFrontendErrors(
                                                        (prev) => ({
                                                            ...prev,
                                                            [`variants.${index}.price`]:
                                                                null,
                                                        }),
                                                    );
                                                }}
                                                className="w-full h-11 focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] rounded-xl border border-[#e7dfd8] px-3"
                                            />
                                            {errors[
                                                `variants.${index}.price`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `variants.${index}.price`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* STOCK */}
                                        <div className="col-span-2">
                                            <input
                                                placeholder="المخزون"
                                                value={variant.stock}
                                                onChange={(e) => {
                                                    updateVariant(
                                                        index,
                                                        "stock",
                                                        e.target.value,
                                                    );
                                                    setFrontendErrors(
                                                        (prev) => ({
                                                            ...prev,
                                                            [`variants.${index}.stock`]:
                                                                null,
                                                        }),
                                                    );
                                                }}
                                                className="w-full h-11 focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] rounded-xl border border-[#e7dfd8] px-3"
                                            />
                                            {errors[
                                                `variants.${index}.stock`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `variants.${index}.stock`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* DELETE */}
                                        <div className="col-span-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeVariant(index)
                                                }
                                                className="
                                                        w-full h-11
                                                        rounded-xl
                                                        bg-red-50
                                                        text-red-500
                                                        flex items-center justify-center
                                                    "
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {errors.variants && (
                                    <div className="col-span-12">
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.variants}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="xl:col-span-4 space-y-4">
                        {/* CLASSIFICATION */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4">التصنيف</h2>

                            <div className="space-y-2">
                                <select
                                    value={data.category_id}
                                    onChange={(e) => {
                                        setData("category_id", e.target.value);
                                        setFrontendErrors((prev) => ({
                                            ...prev,
                                            category_id: null,
                                        }));
                                    }}
                                    className="w-full h-12 rounded-2xl border focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border-[#e7dfd8]"
                                >
                                    <option>اختر المجموعة</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.category_id}
                                    </p>
                                )}

                                {/* Select */}

                                <select
                                    defaultValue=""
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (
                                            value &&
                                            !data.tags.includes(value)
                                        ) {
                                            setData("tags", [
                                                ...data.tags,
                                                value,
                                            ]);
                                        }

                                        setFrontendErrors((prev) => ({
                                            ...prev,
                                            tags: null,
                                        }));

                                        e.target.value = "";
                                    }}
                                    className="w-full h-12 rounded-2xl border focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border-[#e7dfd8]"
                                >
                                    <option value="">اختر تصنيف</option>

                                    {tags
                                        .filter(
                                            (tag) =>
                                                !data.tags.includes(
                                                    String(tag.id),
                                                ),
                                        )
                                        .map((tag) => (
                                            <option key={tag.id} value={tag.id}>
                                                {tag.name}
                                            </option>
                                        ))}
                                </select>

                                {/* Selected Tags Preview */}
                                {data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tagId) => {
                                            const selectedTag = tags.find(
                                                (tag) =>
                                                    String(tag.id) ===
                                                    String(tagId),
                                            );

                                            return (
                                                <div
                                                    key={tagId}
                                                    className="
                            h-9 px-4
                            rounded-full
                            bg-[var(--hover-accent)]
                            border border-[rgba(0,0,0,0.05)]
                            text-[var(--primary)]
                            text-sm font-medium
                            flex items-center gap-2
                            shadow-sm
                        "
                                                >
                                                    {selectedTag?.name}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setData(
                                                                "tags",
                                                                data.tags.filter(
                                                                    (id) =>
                                                                        String(
                                                                            id,
                                                                        ) !==
                                                                        String(
                                                                            tagId,
                                                                        ),
                                                                ),
                                                            );
                                                        }}
                                                        className="
                                w-5 h-5
                                rounded-full
                                bg-white
                                text-gray-500
                                flex items-center justify-center
                                hover:text-red-500
                                transition-all
                            "
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {errors.tags && (
                                    <p className="text-red-500 text-sm">
                                        {errors.tags}
                                    </p>
                                )}

                                <select
                                    value={data.shape_id}
                                    onChange={(e) => {
                                        setData("shape_id", e.target.value);
                                        setFrontendErrors((prev) => ({
                                            ...prev,
                                            shape_id: null,
                                        }));
                                    }}
                                    className="w-full h-12 rounded-2xl border focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border-[#e7dfd8]"
                                >
                                    <option>اختر الشكل</option>

                                    {shapes.map((shape) => (
                                        <option key={shape.id} value={shape.id}>
                                            {shape.shape}
                                        </option>
                                    ))}
                                </select>
                                {errors.shape_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.shape_id}
                                    </p>
                                )}
                                <div className="space-y-4 mt-4">
                                    {/* ARTISTIC TYPE */}
                                    <select
                                        value={data.artistic_type}
                                        onChange={(e) => {
                                            setData(
                                                "artistic_type",
                                                e.target.value,
                                            );
                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                artistic_type: null,
                                            }));
                                        }}
                                        className="w-full h-12 rounded-2xl border focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border-[#e7dfd8]"
                                    >
                                        <option value="">النوع الفني</option>

                                        <option value="مودرن">مودرن</option>
                                        <option value="كلاسيك">كلاسيك</option>
                                        <option value="إسلامي">إسلامي</option>
                                        <option value="فاخر">فاخر</option>
                                        <option value="مينيمال">مينيمال</option>
                                        <option value="تجريدي">تجريدي</option>
                                    </select>
                                    {errors.artistic_type && (
                                        <p className="text-red-500 text-sm ">
                                            {errors.artistic_type}
                                        </p>
                                    )}

                                    {/* PLACE */}
                                    <select
                                        defaultValue=""
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (
                                                value &&
                                                !data.place.includes(value)
                                            ) {
                                                setData("place", [
                                                    ...data.place,
                                                    value,
                                                ]);
                                            }

                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                place: null,
                                            }));

                                            e.target.value = "";
                                        }}
                                        className="w-full h-12 rounded-2xl border focus:ring-1
        focus:ring-[var(--primary)]
        focus:border-[var(--primary)] border-[#e7dfd8]"
                                    >
                                        <option value="">مكان الاستخدام</option>

                                        {[
                                            "غرفة نوم",
                                            "غرفة معيشة",
                                            "مكتب",
                                            "ممر",
                                            "مطعم",
                                            "فندق",
                                            "مجلس",
                                        ]
                                            .filter(
                                                (p) => !data.place.includes(p),
                                            )
                                            .map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                    </select>
                                    {data.place.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {data.place.map((place) => (
                                                <div
                                                    key={place}
                                                    className="
                    h-9 px-4
                    rounded-full
                    bg-[var(--hover-accent)]
                    border border-[rgba(0,0,0,0.05)]
                    text-[var(--primary)]
                    text-sm font-medium
                    flex items-center gap-2
                    shadow-sm
                "
                                                >
                                                    {place}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setData(
                                                                "place",
                                                                data.place.filter(
                                                                    (p) =>
                                                                        p !==
                                                                        place,
                                                                ),
                                                            );
                                                        }}
                                                        className="
                        w-5 h-5
                        rounded-full
                        bg-white
                        text-gray-500
                        flex items-center justify-center
                        hover:text-red-500
                        transition-all
                    "
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errors.place && (
                                        <p className="text-red-500 text-sm ">
                                            {errors.place}
                                        </p>
                                    )}

                                    {/* PIECES */}
                                    <select
                                        value={data.pieces_count}
                                        onChange={(e) => {
                                            setData(
                                                "pieces_count",
                                                e.target.value,
                                            );
                                            setFrontendErrors((prev) => ({
                                                ...prev,
                                                pieces_count: null,
                                            }));
                                        }}
                                        className="w-full h-12 rounded-2xl border focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border-[#e7dfd8]"
                                    >
                                        <option value="">عدد القطع</option>

                                        <option value="تابلوه واحد">
                                            تابلوه واحد
                                        </option>

                                        <option value="2 تابلوه">
                                            2 تابلوه
                                        </option>

                                        <option value="3 تابلوه">
                                            3 تابلوه
                                        </option>

                                        <option value="4 تابلوه">
                                            4 تابلوه
                                        </option>

                                        <option value="5 تابلوه">
                                            5 تابلوه
                                        </option>
                                    </select>
                                    {errors.pieces_count && (
                                        <p className="text-red-500 text-sm">
                                            {errors.pieces_count}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* DESIGN COLORS */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-[var(--text-dark)]">
                                        ألوان اللوحة
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        اختر الألوان أو أضف كود واسم اللون
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setData("design_colors", [
                                            ...data.design_colors,
                                            {
                                                hex: "#d4af37",
                                                name: "",
                                            },
                                        ])
                                    }
                                    className="
                h-8 px-3
                rounded-xl
                bg-[var(--hover-accent)]
                text-[var(--primary)]
                flex items-center gap-2
                text-sm font-medium
                hover:opacity-90
                transition
            "
                                >
                                    <FiPlus />
                                    إضافة لون
                                </button>
                            </div>

                            {!data.design_colors.length ? (
                                <div
                                    className="
                border border-dashed border-[#e6ddd4]
                rounded-2xl
                p-5
                text-center
                bg-[#fcfbfa]
                text-gray-400
            "
                                >
                                    لا توجد ألوان مضافة
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data.design_colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="
                        rounded-2xl
                        border border-[#ebe4dd]
                        bg-[#fcfbfa]
                        p-4
                    "
                                        >
                                            <div className="flex items-end gap-2">
                                                {/* COLOR PICKER */}
                                                <div className="relative">
                                                    <input
                                                        type="color"
                                                        value={
                                                            /^#[0-9A-Fa-f]{6}$/.test(
                                                                color.hex,
                                                            )
                                                                ? color.hex
                                                                : "#d4af37"
                                                        }
                                                        onChange={(e) => {
                                                            const updated = [
                                                                ...data.design_colors,
                                                            ];

                                                            updated[index].hex =
                                                                e.target.value;

                                                            setData(
                                                                "design_colors",
                                                                updated,
                                                            );
                                                        }}
                                                        className="
                                    w-9 h-9
                                    rounded-2xl
                                    overflow-hidden
                                    border-0
                                    cursor-pointer
                                    bg-transparent
                                "
                                                    />

                                                    <div
                                                        className="
                                    absolute inset-0
                                    rounded-2xl
                                    border border-[#e7dfd8]
                                    pointer-events-none
                                "
                                                    />
                                                </div>

                                                {/* INPUTS */}
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                                                    <div>
                                                        <label className="text-xs text-gray-500 mb-1 block">
                                                            كود اللون
                                                        </label>

                                                        <input
                                                            value={color.hex}
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...data.design_colors,
                                                                    ];

                                                                let value =
                                                                    e.target.value
                                                                        .replace(
                                                                            /[^a-fA-F0-9]/g,
                                                                            "",
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            6,
                                                                        );

                                                                updated[
                                                                    index
                                                                ].hex = value
                                                                    ? `#${value}`
                                                                    : "";

                                                                setData(
                                                                    "design_colors",
                                                                    updated,
                                                                );
                                                            }}
                                                            placeholder="#D4AF37"
                                                            className="
                                        w-full h-8
                                        rounded-xl
                                        border border-[#e7dfd8]
                                        bg-white
                                        px-2
                                        text-xs
                                        outline-none
                                        focus:ring-1
                                        focus:ring-[var(--primary)]
                                        focus:border-[var(--primary)]
                                    "
                                                        />
                                                    </div>

                                                    {/* NAME */}
                                                    <div>
                                                        <label className="text-xs text-gray-500 mb-1 block">
                                                            اسم اللون
                                                        </label>

                                                        <input
                                                            value={color.name}
                                                            onChange={(e) => {
                                                                const updated =
                                                                    [
                                                                        ...data.design_colors,
                                                                    ];

                                                                updated[
                                                                    index
                                                                ].name =
                                                                    e.target.value;

                                                                setData(
                                                                    "design_colors",
                                                                    updated,
                                                                );
                                                            }}
                                                            placeholder="ذهبي"
                                                            className="
                                        w-full h-8
                                        rounded-xl
                                        border border-[#e7dfd8]
                                        bg-white
                                        px-2
                                        text-xs
                                        outline-none
                                        focus:ring-1
                                        focus:ring-[var(--primary)]
                                        focus:border-[var(--primary)]
                                    "
                                                        />
                                                    </div>
                                                </div>

                                                {/* DELETE */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData(
                                                            "design_colors",
                                                            data.design_colors.filter(
                                                                (_, i) =>
                                                                    i !== index,
                                                            ),
                                                        );
                                                    }}
                                                    className="
                                w-11 h-8
                                rounded-xl
                                bg-red-50
                                text-red-500
                                flex items-center justify-center
                                hover:bg-red-100
                                transition
                            "
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>

                                            {/* PREVIEW */}
                                            {/* <div className="mt-4 flex items-center gap-3">
                                                <div
                                                    className="
                                w-10 h-10
                                rounded-full
                                border border-[#e7dfd8]
                                shadow-sm
                            "
                                                    style={{
                                                        background: color.hex,
                                                    }}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-[var(--text-dark)]">
                                                        {color.name ||
                                                            "بدون اسم"}
                                                    </p>

                                                    <p className="text-xs text-gray-500 uppercase">
                                                        {color.hex}
                                                    </p>
                                                </div>
                                            </div> */}
                                            {errors[
                                                `design_colors.${index}.name`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `design_colors.${index}.name`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                            {errors[
                                                `design_colors.${index}.hex`
                                            ] && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {
                                                        errors[
                                                            `design_colors.${index}.hex`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {errors.design_colors && (
                                <p className="text-red-500 text-sm mt-3">
                                    {errors.design_colors}
                                </p>
                            )}
                        </div>

                        {/* STATUS */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">الحالة</h2>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span>منتج مميز</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData("featured", !data.featured)
                                        }
                                        className={`
                                            relative w-14 h-8 rounded-full transition-all
                                            ${
                                                data.featured
                                                    ? "bg-[var(--primary)]"
                                                    : "bg-gray-300"
                                            }
                                        `}
                                    >
                                        <div
                                            className={`
                                                absolute top-1 w-6 h-6 rounded-full bg-white transition-all
                                                ${
                                                    data.featured
                                                        ? "right-1"
                                                        : "right-7"
                                                }
                                            `}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>نشط</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                "is_active",
                                                !data.is_active,
                                            )
                                        }
                                        className={`
                                            relative w-14 h-8 rounded-full transition-all
                                            ${
                                                data.is_active
                                                    ? "bg-[var(--primary)]"
                                                    : "bg-gray-300"
                                            }
                                        `}
                                    >
                                        <div
                                            className={`
                                                absolute top-1 w-6 h-6 rounded-full bg-white transition-all
                                                ${
                                                    data.is_active
                                                        ? "right-1"
                                                        : "right-7"
                                                }
                                            `}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PREVIEW */}
                        {/* <div className="sticky top-6">
                            <ProductCard product={previewProduct} />
                        </div> */}
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
