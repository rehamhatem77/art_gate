// Show.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { IoColorPaletteOutline } from "react-icons/io5";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";
import DisplayField from "./Components/DisplyField";
import { BsBackpack, BsBackpack2 } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { DESIGN_PALETTES } from "@/Constants/DesignPalletes";

export default function Show({ product }) {
    return (
        <AuthenticatedLayout>
            <Head title="عرض لوحة" />

            <div className="space-y-6">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "اللوحات", link: route("products.index") },
                        { name: "عرض لوحة" },
                    ]}
                />

                {/* Header */}

                <AdminPageHeader
                    title="عرض لوحة"
                    description="بيانات اللوحة والمتغيرات"
                    icon={IoColorPaletteOutline}
                    actions={[
                        {
                            label: "العودة",
                            icon: BiArrowBack,
                            onClick: () => router.get(route("products.index")),
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
                                    <DisplayField
                                        label="اسم اللوحة"
                                        value={product.name}
                                    />
                                </div>

                                {/* CODE */}
                                <div>
                                    <DisplayField
                                        label="اسم اللوحة"
                                        value={product.code}
                                    />
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm font-medium my-2 block">
                                    الوصف
                                </label>

                                <div
                                    className="
            rounded-2xl
            border border-[#e8dfd7]
            bg-[#fcfbfa]
            p-4
            min-h-[140px]
            whitespace-pre-wrap
        "
                                >
                                    {product.description || "-"}
                                </div>
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
				
				transition-all
				
			"
                                >
                                    {product.main_image && (
                                        <div className="items-center justify-center relative ">
                                            <img
                                                src={`/storage/${product.main_image}`}
                                                alt={product.name}
                                                className="
							w-70 h-[320px]
							object-cover
							rounded-2xl

						"
                                            />
                                        </div>
                                    )}
                                </label>
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
                                    ></label>
                                </div>

                                {product.images.length ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {product.images.map((image, index) => (
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
                                                    src={`/storage/${image.image}`}
                                                    alt=""
                                                    className="
								w-full h-40
								object-cover
							"
                                                />
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
                            </div>
                        </div>
                        {/* VARIANTS */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">المتغيرات</h2>
                            </div>

                            <div className="space-y-4">
                                {product.variants.map((variant, index) => (
                                    <div
                                        key={index}
                                        className="
               
  grid grid-cols-2
                    md:grid-cols-4
                    xl:grid-cols-4
gap-2
                p-4 rounded-2xl
                bg-[#faf8f6]
                border border-[#eee7e1]
            "
                                    >
                                        <DisplayField
                                            label="المقاس"
                                            value={`${variant.size?.width}x${variant.size?.height}`}
                                        />

                                        <DisplayField
                                            label="الإطار"
                                            value={variant.frame_type?.type}
                                        />

                                        <DisplayField
                                            label="السعر"
                                            value={variant.price}
                                        />

                                        <DisplayField
                                            label="المخزون"
                                            value={variant.stock}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* CLASSIFICATION */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">
                                التصنيف والتفاصيل
                            </h2>

                            <div className="space-y-6">
                                {/* CATEGORY + SHAPE */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DisplayField
                                        label="المجموعة"
                                        value={
                                            product.category?.name || "لا يوجد"
                                        }
                                    />

                                    <DisplayField
                                        label="الشكل"
                                        value={
                                            product.shape?.shape || "لا يوجد"
                                        }
                                    />
                                </div>

                                {/* TAGS */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="text-sm font-medium">
                                        التصنيفات
                                    </label>

                                    {product.tag_objects?.length ? (
                                        product.tag_objects.map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="
                    h-9 px-4
                    rounded-full
                    bg-[var(--hover-accent)]
                    border border-[rgba(0,0,0,0.05)]
                    text-[var(--primary)]
                    text-sm font-medium
                    flex items-center
                "
                                            >
                                                {tag.name}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400">
                                            لا توجد تصنيفات
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* ARTISTIC TYPE */}
                                    <DisplayField
                                        label="نوع الفن"
                                        value={
                                            product.artistic_type || "لا يوجد"
                                        }
                                    />
                                    <DisplayField
                                        label="عدد قطع اللوحة"
                                        value={
                                            product.pieces_count || "لا يوجد"
                                        }
                                    />
                                </div>

                                {/* PLACES */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="text-sm font-medium  ">
                                        أماكن الاستخدام
                                    </label>

                                    {product.place?.length ? (
                                        product.place.map((place) => (
                                            <div
                                                key={place}
                                                className="
                                    h-9 px-4
                                    rounded-full
                                    bg-[#f7f4f1]
                                    border border-[#e7dfd8]
                                    text-sm font-medium
                                    text-[#5f5147]
                                    flex items-center
                                "
                                            >
                                                {place}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-400">
                                            لا توجد أماكن استخدام
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* DESIGN COLORS */}

<div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
    <h2 className="text-lg font-bold mb-6">ألوان اللوحة</h2>

    {!product.design_colors?.length ? (
        <div
            className="
                border border-dashed border-[#e6ddd4]
                rounded-2xl
                p-6
                text-center
                bg-[#fcfbfa]
                text-gray-400
            "
        >
            لا توجد ألوان مضافة
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.design_colors.map((paletteKey) => {
                const palette = DESIGN_PALETTES.find(
                    (p) => p.value === paletteKey,
                );

                if (!palette) return null;

                return (
                    <div
                        key={palette.value}
                        className="
                            rounded-2xl
                            border border-[#ebe4dd]
                            bg-[#fcfbfa]
                            p-4
                        "
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-[#2d2926]">
                                {palette.label}
                            </span>

                            <span className="text-xs text-gray-500">
                                {palette.colors.length} ألوان
                            </span>
                        </div>

                        <div className="flex items-center gap-0 mt-4">
                            {palette.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="
                                        h-8 flex-1
                                        first:rounded-r-xl
                                        last:rounded-l-xl
                                    "
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )}
</div>

                        {/* STATUS */}
                        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-6">الحالة</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        منتج مميز
                                    </span>

                                    <span
                                        className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${
                            product.featured
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                        }
                    `}
                                    >
                                        {product.featured ? "نعم" : "لا"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        الحالة
                                    </span>

                                    <span
                                        className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${
                            product.is_active
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-600"
                        }
                    `}
                                    >
                                        {product.is_active ? "نشط" : "غير نشط"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
