import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Breadcrumb from "@/Components/Breadcrumb";

import { FiHome, FiPlus, FiTrash2 } from "react-icons/fi";
import SectionCard from "@/Components/SectionCard";
import AdminPageHeader from "@/Components/AdminPageHeader";

const fieldLabels = {
    announcement: "نص الإعلان",

    about_section_title: "العنوان",
    about_section_subtitle: "العنوان الفرعي",
    about_section_description: "الوصف",
    about_section_image: "الصورة",
    about_section_video: "رابط الفيديو",

    special_section_title: "العنوان",
    special_section_subtitle: "العنوان الفرعي",
    special_section_description: "الوصف",
    special_section_button_text: "نص الزر",

    category_section_title: "العنوان",
    category_section_subtitle: "العنوان الفرعي",
    category_section_description: "الوصف",
};

export default function Index({ homepage, products = [] }) {
    const [openSection, setOpenSection] = useState(null);

    const [formData, setFormData] = useState({});
    const [frontendErrors, setFrontendErrors] = useState({});

    const sections = [
        {
            key: "announcement",
            title: "الإعلان العلوي",
            fields: ["announcement"],
        },
        {
            key: "slider",
            title: "السلايدر الرئيسي",
            fields: [],
        },

        {
            key: "about",
            title: "قسم من نحن",
            fields: [
                "about_section_title",
                "about_section_subtitle",
                "about_section_description",
                "about_section_image",
                "about_section_video",
            ],
        },

        {
            key: "special",
            title: "القسم المميز",
            fields: [
                "special_section_title",
                "special_section_subtitle",
                "special_section_description",
                "special_section_button_text",
            ],
        },

        {
            key: "category",
            title: "قسم التصنيفات",
            fields: [
                "category_section_title",
                "category_section_subtitle",
                "category_section_description",
            ],
        },
    ];

    const routeMap = {
        announcement: route("homepage.announcement.update"),

        about: route("homepage.about.update"),

        special: route("homepage.special.update"),

        category: route("homepage.category.update"),

        slider: route("homepage.slider.update"),
    };

    const handleOpen = (section) => {
        if (openSection === section.key) {
            setOpenSection(null);
            return;
        }

        setOpenSection(section.key);

        const initialData = {};

        section.fields.forEach((field) => {
            initialData[field] = homepage?.[field] || "";
        });

        if (section.key === "slider") {
            initialData.slider = homepage?.slider || [];
        }

        setFormData(initialData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const submitSection = (sectionKey) => {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                data.append(key, value);
            }
        });

        router.post(routeMap[sectionKey], data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setOpenSection(null);
            },
        });
    };
    const validateSlider = () => {
        const errors = {};

        (formData.slider || []).forEach((slide, index) => {
            if (!slide.title?.trim()) {
                errors[`title_${index}`] = "عنوان الشريحة مطلوب";
            }

            if (!slide.product_id) {
                errors[`product_${index}`] = "يجب اختيار منتج";
            }

            if (!slide.image && !slide.existing_image) {
                errors[`image_${index}`] = "صورة الشريحة مطلوبة";
            }
        });

        setFrontendErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const addSlide = () => {
        const slides = formData.slider || [];

        const incompleteSlide = slides.find(
            (slide) =>
                !slide.title?.trim() ||
                !slide.product_id ||
                (!slide.image && !slide.existing_image),
        );

        if (incompleteSlide) {
            setFrontendErrors({
                slider: "يجب استكمال بيانات الشريحة الحالية قبل إضافة شريحة جديدة",
            });

            return;
        }

        setFrontendErrors((prev) => ({
            ...prev,
            slider: "",
        }));

        setFormData((prev) => ({
            ...prev,
            slider: [
                ...slides,
                {
                    title: "",
                    image: null,
                    product_id: "",
                    order: slides.length + 1,
                },
            ],
        }));
    };

    const removeSlide = (index) => {
        const slides = [...(formData.slider || [])];

        slides.splice(index, 1);

        setFormData((prev) => ({
            ...prev,
            slider: slides,
        }));
    };

 const updateSlide = (index, key, value) => {
    const slides = [...(formData.slider || [])];

    slides[index][key] = value;

    setFormData((prev) => ({
        ...prev,
        slider: slides,
    }));

    setFrontendErrors((prev) => {
        const next = { ...prev };

        if (key === "title") {
            delete next[`title_${index}`];
        }

        if (key === "product_id") {
            delete next[`product_${index}`];
        }

        if (key === "image") {
            delete next[`image_${index}`];
        }

        return next;
    });
};

    return (
        <AuthenticatedLayout>
            <Head title="إدارة الصفحة الرئيسية" />

            <main className="space-y-4">
                <Breadcrumb
                    items={[
                        {
                            name: "لوحة التحكم",
                            link: route("dashboard"),
                        },
                        {
                            name: "الصفحة الرئيسية",
                        },
                    ]}
                />

                <AdminPageHeader
                    title="إدارة الصفحة الرئيسية"
                    description="إدارة جميع أقسام الصفحة الرئيسية والمحتوى الظاهر للزوار"
                    icon={FiHome}
                    actions={[]}
                />

                <div className="space-y-4">
                    {sections.map((section) => {
                        const fieldsData = {};

                        section.fields.forEach((field) => {
                            fieldsData[field] = homepage?.[field] || "";
                        });

                        if (section.key === "slider") {
                            fieldsData.slider = homepage?.slider || [];
                        }

                        return (
                            <div key={section.key} className="relative">
                                <SectionCard
                                    title={section.title}
                                    fieldsData={fieldsData}
                                    onOpen={() => handleOpen(section)}
                                />

                                <AnimatePresence>
                                    {openSection === section.key && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className="
                                                bg-gray-50
                                                border-l-4
                                                border-[var(--primary)]
                                                rounded-b-2xl
                                                p-6
                                                mt-2
                                                overflow-hidden
                                                shadow-inner
                                            "
                                        >
                                            {/* NON SLIDER SECTIONS */}
                                            {section.key !== "slider" && (
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();

                                                        submitSection(
                                                            section.key,
                                                        );
                                                    }}
                                                    className="space-y-4"
                                                >
                                                    {section.fields.map(
                                                        (field) => (
                                                            <div key={field}>
                                                                <label
                                                                    className="
                                                                    block
                                                                    mb-2
                                                                    text-sm
                                                                    font-medium
                                                                    text-gray-700
                                                                "
                                                                >
                                                                    {fieldLabels[
                                                                        field
                                                                    ] || field}
                                                                </label>

                                                                {field.includes(
                                                                    "image",
                                                                ) ? (
                                                                    <>
                                                                        {homepage?.[
                                                                            field
                                                                        ] && (
                                                                            <img
                                                                                src={`/storage/${homepage[field]}`}
                                                                                alt=""
                                                                                className="
                                                                                    w-20
                                                                                    h-20
                                                                                    object-cover
                                                                                    rounded-xl
                                                                                    border
                                                                                    mb-3
                                                                                "
                                                                            />
                                                                        )}

                                                                        <input
                                                                            type="file"
                                                                            name={
                                                                                field
                                                                            }
                                                                            onChange={
                                                                                handleChange
                                                                            }
                                                                            className="
                                                                                w-full
                                                                                rounded-xl
                                                                                border
                                                                                p-3
                                                                                bg-white
                                                                            "
                                                                        />
                                                                    </>
                                                                ) : field.includes(
                                                                      "description",
                                                                  ) ? (
                                                                    <textarea
                                                                        rows={5}
                                                                        name={
                                                                            field
                                                                        }
                                                                        value={
                                                                            formData[
                                                                                field
                                                                            ] ||
                                                                            ""
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className="
                                                                            w-full
                                                                            rounded-xl
                                                                            border
                                                                            p-3
                                                                            outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]
                                                                        "
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        name={
                                                                            field
                                                                        }
                                                                        value={
                                                                            formData[
                                                                                field
                                                                            ] ||
                                                                            ""
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className="
                                                                            w-full
                                                                            h-12
                                                                            rounded-xl
                                                                            border
                                                                            px-4
                                                                            outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]
                                                                        "
                                                                    />
                                                                )}
                                                            </div>
                                                        ),
                                                    )}

                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setOpenSection(
                                                                    null,
                                                                )
                                                            }
                                                            className="
                                                                px-5
                                                                py-2
                                                                rounded-xl
                                                                border
                                                            "
                                                        >
                                                            إلغاء
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            className="
                                                                px-5
                                                                py-2
                                                                rounded-xl
                                                                bg-[var(--primary)]
                                                                text-white
                                                            "
                                                        >
                                                            حفظ البيانات
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {/* SLIDER SECTION STARTS IN PART 3 */}
                                            {section.key === "slider" && (
                                                <div>
                                                    {" "}
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-bold text-lg">
                                                                شرائح السلايدر
                                                            </h3>

                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    addSlide
                                                                }
                                                                className="
                                                                    flex items-center gap-2
                                                                    px-4 py-2
                                                                    rounded-xl
                                                                    bg-[var(--primary)]
                                                                    text-white
                                                                "
                                                            >
                                                                <FiPlus />
                                                                إضافة شريحة
                                                            </button>
                                                            {frontendErrors.slider && (
                                                                <p className="text-sm text-red-500 mt-2">
                                                                    {
                                                                        frontendErrors.slider
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {(
                                                            formData.slider ||
                                                            []
                                                        ).map(
                                                            (slide, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="
                                                                        bg-white
                                                                        border
                                                                        rounded-2xl
                                                                        p-4
                                                                        space-y-4
                                                                    "
                                                                >
                                                                    <div className="flex justify-between items-center">
                                                                        <h4 className="font-semibold">
                                                                            شريحة
                                                                            #
                                                                            {index +
                                                                                1}
                                                                        </h4>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                removeSlide(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-10 h-10
                                                                                rounded-full
                                                                                bg-red-50
                                                                                text-red-500
                                                                                flex items-center justify-center
                                                                            "
                                                                        >
                                                                            <FiTrash2 />
                                                                        </button>
                                                                    </div>

                                                                    {/* title */}
                                                                    <div>
                                                                        <label className="block mb-2 text-sm font-medium">
                                                                            عنوان
                                                                            الشريحة
                                                                        </label>

                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                slide.title ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateSlide(
                                                                                    index,
                                                                                    "title",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-full
                                                                                h-12
                                                                                rounded-xl
                                                                                border
                                                                                px-4
outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]

                                                                            "
                                                                        />
{frontendErrors[`title_${index}`] && (
    <p className="text-red-500 text-xs mt-1">
        {frontendErrors[`title_${index}`]}
    </p>
)}
                                                                    </div>


                                                                    {/* order */}
                                                                    <div>
                                                                        <label className="block mb-2 text-sm font-medium">
                                                                            الترتيب
                                                                        </label>

                                                                        <input
                                                                            type="number"
                                                                            value={
                                                                                slide.order ||
                                                                                0
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateSlide(
                                                                                    index,
                                                                                    "order",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-full
                                                                                h-12
                                                                                rounded-xl
                                                                                border
                                                                                px-4
outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]
                                                                            "
                                                                        />
                                                                    </div>

                                                                    {/* image */}
                                                                    <div>
                                                                        <label className="block mb-2 text-sm font-medium">
                                                                            صورة
                                                                            الشريحة
                                                                        </label>

                                                                        {(slide.image ||
                                                                            slide.preview) && (
                                                                            <img
                                                                                src={
                                                                                    slide.image instanceof
                                                                                    File
                                                                                        ? URL.createObjectURL(
                                                                                              slide.image,
                                                                                          )
                                                                                        : `/storage/${slide.image}`
                                                                                }
                                                                                alt=""
                                                                                className="
                                                                                    w-20
                                                                                    h-20
                                                                                    object-cover
                                                                                    rounded-xl
                                                                                    border
                                                                                    mb-3
                                                                                "
                                                                            />
                                                                        )}

                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateSlide(
                                                                                    index,
                                                                                    "image",
                                                                                    e
                                                                                        .target
                                                                                        .files[0],
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-full
                                                                                rounded-xl
                                                                                border
                                                                                p-3
outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]
                                                                            "
                                                                        />
{frontendErrors[`image_${index}`] && (
    <p className="text-red-500 text-xs mt-1">
        {frontendErrors[`image_${index}`]}
    </p>
)}
                                                                    </div>

                                                                    {/* product */}
                                                                    <div>
                                                                        <label className="block mb-2 text-sm font-medium">
                                                                            المنتج
                                                                            المرتبط
                                                                        </label>

                                                                        <select
                                                                            value={
                                                                                slide.product_id ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                updateSlide(
                                                                                    index,
                                                                                    "product_id",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-full
                                                                                h-12
                                                                                rounded-xl
                                                                                border
                                                                                px-4
                                                                            "
                                                                        >
                                                                            <option value="">
                                                                                اختر
                                                                                منتج
                                                                            </option>

                                                                            {products.map(
                                                                                (
                                                                                    product,
                                                                                ) => (
                                                                                    <option
                                                                                        key={
                                                                                            product.id
                                                                                        }
                                                                                        value={
                                                                                            product.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            product.name
                                                                                        }
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
{frontendErrors[`product_${index}`] && (
    <p className="text-red-500 text-xs mt-1">
        {frontendErrors[`product_${index}`]}
    </p>
)}
                                                                    </div>

                                                                    {/* selected product preview */}
                                                                    {slide.product_id && (
                                                                        <div
                                                                            className="
                                                                                border
                                                                                rounded-xl
                                                                                p-3
                                                                                bg-gray-50
                                                                            "
                                                                        >
                                                                            {(() => {
                                                                                const selected =
                                                                                    products.find(
                                                                                        (
                                                                                            p,
                                                                                        ) =>
                                                                                            String(
                                                                                                p.id,
                                                                                            ) ===
                                                                                            String(
                                                                                                slide.product_id,
                                                                                            ),
                                                                                    );

                                                                                if (
                                                                                    !selected
                                                                                )
                                                                                    return null;

                                                                                return (
                                                                                    <div className="flex items-center gap-3">
                                                                                        <img
                                                                                            src={`/storage/${selected.image}`}
                                                                                            alt={
                                                                                                selected.name
                                                                                            }
                                                                                            className="
                                                                                                w-16
                                                                                                h-16
                                                                                                rounded-xl
                                                                                                object-cover
                                                                                            "
                                                                                        />

                                                                                        <div>
                                                                                            <h5 className="font-semibold">
                                                                                                {
                                                                                                    selected.name
                                                                                                }
                                                                                            </h5>

                                                                                            {selected.price && (
                                                                                                <p className="text-xs text-gray-500">
                                                                                                    يبدأ
                                                                                                    من{" "}
                                                                                                    {
                                                                                                        selected.price
                                                                                                    }{" "}
                                                                                                    ج.م
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })()}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}

                                                        <div className="flex justify-end gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setOpenSection(
                                                                        null,
                                                                    )
                                                                }
                                                                className="
                                                                    px-5 py-2
                                                                    rounded-xl
                                                                    border
                                                                "
                                                            >
                                                                إلغاء
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (
                                                                        !validateSlider()
                                                                    ) {
                                                                        return;
                                                                    }

                                                                    const fd =
                                                                        new FormData();

                                                                    (
                                                                        formData.slider ||
                                                                        []
                                                                    ).forEach(
                                                                        (
                                                                            slide,
                                                                            i,
                                                                        ) => {
                                                                            fd.append(
                                                                                `slider[${i}][title]`,
                                                                                slide.title ||
                                                                                    "",
                                                                            );

                                                                            fd.append(
                                                                                `slider[${i}][order]`,
                                                                                slide.order ||
                                                                                    0,
                                                                            );

                                                                            fd.append(
                                                                                `slider[${i}][product_id]`,
                                                                                slide.product_id ||
                                                                                    "",
                                                                            );

                                                                            if (
                                                                                slide.image instanceof
                                                                                File
                                                                            ) {
                                                                                fd.append(
                                                                                    `slider[${i}][image]`,
                                                                                    slide.image,
                                                                                );
                                                                            } else {
                                                                                fd.append(
                                                                                    `slider[${i}][existing_image]`,
                                                                                    slide.image ||
                                                                                        "",
                                                                                );
                                                                            }
                                                                        },
                                                                    );

                                                                    router.post(
                                                                        route(
                                                                            "homepage.slider.update",
                                                                        ),
                                                                        fd,
                                                                        {
                                                                            forceFormData: true,
                                                                            preserveScroll: true,
                                                                            onSuccess:
                                                                                () => {
                                                                                    setOpenSection(
                                                                                        null,
                                                                                    );
                                                                                    setFrontendErrors(
                                                                                        {},
                                                                                    );
                                                                                },
                                                                        },
                                                                    );
                                                                }}
                                                                className="
                                                                    px-5 py-2
                                                                    rounded-xl
                                                                    bg-[var(--primary)]
                                                                    text-white
                                                                "
                                                            >
                                                                حفظ السلايدر
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
