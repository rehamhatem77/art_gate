import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useMemo } from "react";

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

export default function Create({ categories, shapes, sizes, frameTypes ,tags }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        code: "",
        description: "",

        category_id: "",
tag_id: "",
        shape_id: "",

        artistic_type: "",
        place: "",
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

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.products.store"));
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
                            onClick={() =>
                                router.get(route("admin.products.index"))
                            }
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
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="
                                            w-full h-12
                                            rounded-2xl
                                            border border-[#e8dfd7]
                                            bg-[#fcfbfa]
                                            px-4
                                            outline-none
                                        "
                                    />
                                </div>

                                {/* CODE */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        كود المنتج
                                    </label>

                                    <input
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        className="
                                            w-full h-12
                                            rounded-2xl
                                            border border-[#e8dfd7]
                                            bg-[#fcfbfa]
                                            px-4
                                            outline-none
                                        "
                                    />
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-5">
                                <label className="text-sm font-medium mb-2 block">
                                    الوصف
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="
                                        w-full min-h-[140px]
                                        rounded-2xl
                                        border border-[#e8dfd7]
                                        bg-[#fcfbfa]
                                        p-4
                                        resize-none
                                        outline-none
                                    "
                                />
                            </div>
                        </div>

                        {/* IMAGES */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">الصور</h2>

                            {/* MAIN IMAGE */}
                            <label
                                className="
                                    border-2 border-dashed
                                    border-[#e6ddd4]
                                    rounded-[28px]
                                    bg-[#fcfbfa]
                                    p-10
                                    text-center
                                    flex flex-col items-center justify-center
                                    cursor-pointer
                                "
                            >
                                <FiUploadCloud className="text-4xl text-[var(--primary)]" />

                                <p className="mt-4 font-medium">
                                    رفع الصورة الرئيسية
                                </p>

                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        setData("main_image", e.target.files[0])
                                    }
                                />
                            </label>

                            {/* GALLERY */}
                            <div className="mt-5">
                                <label className="text-sm font-medium block mb-3">
                                    صور إضافية
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) =>
                                        setData(
                                            "images",
                                            Array.from(e.target.files),
                                        )
                                    }
                                />
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
                                                onChange={(e) =>
                                                    updateVariant(
                                                        index,
                                                        "size_id",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full h-11 rounded-xl border border-[#e7dfd8] px-3"
                                            >
                                                <option>المقاس</option>

                                                {sizes.map((size) => (
                                                    <option
                                                        key={size.id}
                                                        value={size.id}
                                                    >
                                                        {size.width}x{size.height}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* FRAME */}
                                        <div className="col-span-3">
                                            <select
                                                value={variant.frame_type_id}
                                                onChange={(e) =>
                                                    updateVariant(
                                                        index,
                                                        "frame_type_id",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full h-11 rounded-xl border border-[#e7dfd8] px-3"
                                            >
                                                <option>الإطار</option>

                                                {frameTypes.map((frame) => (
                                                    <option
                                                        key={frame.id}
                                                        value={frame.id}
                                                    >
                                                        {frame.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* PRICE */}
                                        <div className="col-span-2">
                                            <input
                                                placeholder="السعر"
                                                value={variant.price}
                                                onChange={(e) =>
                                                    updateVariant(
                                                        index,
                                                        "price",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full h-11 rounded-xl border border-[#e7dfd8] px-3"
                                            />
                                        </div>

                                        {/* STOCK */}
                                        <div className="col-span-2">
                                            <input
                                                placeholder="المخزون"
                                                value={variant.stock}
                                                onChange={(e) =>
                                                    updateVariant(
                                                        index,
                                                        "stock",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full h-11 rounded-xl border border-[#e7dfd8] px-3"
                                            />
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
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* CLASSIFICATION */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">التصنيف</h2>

                            <div className="space-y-4">
                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className="w-full h-12 rounded-2xl border border-[#e7dfd8] px-4"
                                >
                                    <option>اختر  المجموعة</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
 <select
                                    value={data.tags}
                                    onChange={(e) =>
                                        setData("tag_id", e.target.value)
                                    }
                                    className="w-full h-12 rounded-2xl border border-[#e7dfd8] px-4"
                                >
                                    <option>اختر  التصنيفات</option>

                                    {tags.map((tag) => (
                                        <option
                                            key={tag.id}
                                            value={tag.id}
                                        >
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={data.shape_id}
                                    onChange={(e) =>
                                        setData("shape_id", e.target.value)
                                    }
                                    className="w-full h-12 rounded-2xl border border-[#e7dfd8] px-4"
                                >
                                    <option>اختر الشكل</option>

                                    {shapes.map((shape) => (
                                        <option key={shape.id} value={shape.id}>
                                            {shape.shape}
                                        </option>
                                    ))}
                                </select>
<div className="space-y-4 mt-4">
    {/* ARTISTIC TYPE */}
    <select
        value={data.artistic_type}
        onChange={(e) =>
            setData("artistic_type", e.target.value)
        }
        className="
            w-full h-12
            rounded-2xl
            border border-[#e7dfd8]
            bg-[#fcfbfa]
            px-4
            outline-none
        "
    >
        <option value="">النوع الفني</option>

        <option value="مودرن">مودرن</option>
        <option value="كلاسيك">كلاسيك</option>
        <option value="إسلامي">إسلامي</option>
        <option value="فاخر">فاخر</option>
        <option value="مينيمال">مينيمال</option>
        <option value="تجريدي">تجريدي</option>
    </select>

    {/* PLACE */}
    <select
        value={data.place}
        onChange={(e) =>
            setData("place", e.target.value)
        }
        className="
            w-full h-12
            rounded-2xl
            border border-[#e7dfd8]
            bg-[#fcfbfa]
            px-4
            outline-none
        "
    >
        <option value="">مكان الاستخدام</option>

        <option value="غرفة نوم">غرفة نوم</option>
        <option value="غرفة معيشة">غرفة معيشة</option>
        <option value="مكتب">مكتب</option>
        <option value="ممر">ممر</option>
        <option value="مطعم">مطعم</option>
        <option value="فندق">فندق</option>
        <option value="مجلس">مجلس</option>
    </select>

    {/* PIECES */}
    <select
        value={data.pieces_count}
        onChange={(e) =>
            setData("pieces_count", e.target.value)
        }
        className="
            w-full h-12
            rounded-2xl
            border border-[#e7dfd8]
            bg-[#fcfbfa]
            px-4
            outline-none
        "
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
</div>
                            </div>
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
