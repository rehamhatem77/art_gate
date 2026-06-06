import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DESIGN_PALETTES } from "@/Constants/DesignPalletes";

export default function AdditionalInfo({
    product,
}) {
    const [activeTab, setActiveTab] =
        useState("description");
const designColorLabel =
    product.design_colors
        ?.map(
            (value) =>
                DESIGN_PALETTES.find(
                    (palette) =>
                        palette.value === value
                )?.label
        )
        .filter(Boolean)
        .join(" ، ") || "-";
    const tabs = [
        {
            id: "description",
            label: "الوصف",
        },
        {
            id: "additional",
            label: "معلومات إضافية",
        },
        {
            id: "shipping",
            label: "الشحن و التسليم",
        },
    ];

    const specs = [
        
        {
            label: "مقاس التابلوه",
            value: [
    ...new Set(
        product?.variants?.map(
            (v) =>
                `${v.size.width}×${v.size.height}`
        )
    ),
].join(" ، "),
                    
        },
        {
            label: "لون التصميم",
           value: designColorLabel,
        },
        {
            label: "شكل التابلوه",
            value:
                product?.shape
                    ?.shape || "-",
        },
        {
            label: "نوع الفن",
            value:
                product?.artistic_type ||
                "-",
        },
        {
            label: "مكان التابلوه",
            value: product?.place?.join(" ، ") || "-",
        },
        {
            label: "عدد التابلوهات",
            value:
                product?.pieces_count ||
                "-",
        },
    ];

    return (
        <section
           
        >
            {/* Tabs */}

            <div
                className="
                    flex
                    justify-center
                    overflow-x-auto
                    gap-8
                    sm:gap-12
                "
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() =>
                            setActiveTab(
                                tab.id
                            )
                        }
                        className="
                            relative
                            pt-4
                            pb-2
                            text-lg
                            font-medium
                            whitespace-nowrap
                            text-gray-600
                        "
                    >
                        {tab.label}

                        {activeTab ===
                            tab.id && (
                            <motion.div
                                layoutId="tabLine"
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    h-[2px]
                                    bg-[var(--primary)]
                                "
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}

            <AnimatePresence
                mode="wait"
            >
                <motion.div
                    key={activeTab}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -20,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="
                        py-10
                    "
                >
                    {/* DESCRIPTION */}

                    {activeTab ===
                        "description" && (
                        <div
                            className="
                                max-w-6xl
                                mx-auto
                                text-start
                                leading-[2.5]
                                text-lg
                                text-gray-800
                                
                                px-4
                            "
                        >
                            <p>
                                {
                                    product.description
                                }
                            </p>
                        </div>
                    )}

                    {/* ADDITIONAL */}

                    {activeTab ===
                        "additional" && (
                        <div
                            className="
                                max-w-2xl
                                mx-auto
                                px-6
                                items-center
                                justify-center
                            "
                        >
                            <div className="divide-y divide-gray-200">
                                {specs.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            className="
                                                grid
                                                grid-cols-2
                                                gap-6
                                                py-4
                                                
                                            "
                                        >
                                            <div
                                                className="
                                                    text-[var(--primary)]
                                                    font-semibold
                                                    text-md
                                                "
                                            >
                                                {
                                                    item.label
                                                }
                                            </div>

                                            <div
                                                className="
                                                    text-gray-800
                                                    text-md
                                                    text-end
                                                "
                                            >
                                                {
                                                    item.value
                                                }
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* SHIPPING */}

{activeTab === "shipping" && (
    <div
        className="
            max-w-6xl
            mx-auto
            px-4
            lg:px-8
        "
    >
        <div
            className="
                grid
                lg:grid-cols-2
                gap-10
                items-start
            "
        >
           

            {/* Image */}
            <div>
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
                    alt="Shipping"
                    className="
                        w-full
                        
                        rounded-3xl
                        object-cover
                        shadow-md
                    "
                />
            </div>
             {/* Content */}
            <div
                className="
                    text-right
                    space-y-2
                    leading-9
                    text-gray-800
                "
            >
                <p className="text-lg">
                    نحن نسعى لتوفير تجربة تسوق مريحة
                    وشفافة لعملائنا. إليكم سياسة الشحن
                    والتسليم لدينا:
                </p>

                {/* Shipping */}
                <div>
                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-[var(--primary)]
                            mb-1
                        "
                    >
                        الشحن:
                    </h3>

                    <ul className="space-y-1 list-disc pr-4">
                        <li>
                            <strong>
                                تكلفة الشحن:
                            </strong>{" "}
                            تعتمد على موقع التوصيل
                            ويمكن حسابها أثناء
                            إتمام الطلب.
                        </li>

                        <li>
                            <strong>
                                فترة المعالجة:
                            </strong>{" "}
                            من 1 إلى 2 يوم عمل،
                            وقد تزيد خلال فترات
                            العروض أو المواسم.
                        </li>
                    </ul>
                </div>

                {/* Delivery */}
                <div>
                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-[var(--primary)]
                            mb-1
                        "
                    >
                        التسليم:
                    </h3>

                    <ul className="space-y-1 list-disc pr-4">
                        <li>
                            <strong>
                                تتبع الطلب:
                            </strong>{" "}
                            سيتم إرسال رقم التتبع
                            عبر البريد الإلكتروني
                            بعد الشحن مباشرة.
                        </li>

                        <li>
                            <strong>
                                موقع التسليم:
                            </strong>{" "}
                            نوفر خدمة التوصيل
                            لجميع مناطق مصر.
                        </li>
                    </ul>
                </div>

                {/* Notes */}
                <div>
                    <h3
                        className="
                            text-2xl
                            font-bold
                            text-[var(--primary)]
                            mb-1
                        "
                    >
                        ملاحظات هامة:
                    </h3>

                    <p>
                        يرجى التأكد من صحة بيانات
                        وعنوان الشحن (اسم الشارع،
                        المنطقة، المحافظة، وعلامة
                        مميزة) لضمان وصول الطلب
                        دون تأخير.
                    </p>
                </div>
            </div>
        </div>
    </div>
)}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}