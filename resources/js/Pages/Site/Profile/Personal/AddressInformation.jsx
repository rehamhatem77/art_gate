import { motion } from "framer-motion";

import {
    FiMapPin,
    FiGlobe,
    FiMap,
    FiHome,
    FiSave,
} from "react-icons/fi";

export default function AddressInformation({
    data,
    setData,
    errors = {},
    processing = false,
    onSubmit,
}) {
    const fields = [
        {
            name: "country",
            label: "الدولة",
            placeholder: "مصر",
            icon: FiGlobe,
        },
        {
            name: "governorate",
            label: "المحافظة",
            placeholder: "القاهرة",
            icon: FiMap,
        },
        {
            name: "city",
            label: "المنطقة",
            placeholder: "مدينة نصر",
            icon: FiMapPin,
        },
        {
            name: "address",
            label: "العنوان التفصيلي",
            placeholder: "الحي - الشارع - رقم المبنى - الدور",
            icon: FiHome,
            full: true,
        },
    ];

  return (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        dir="rtl"
        className="overflow-hidden"
    >
        {/* Header */}
        <div className="border-b px-4 sm:px-6 md:px-8 py-5 md:py-6">
            <div className="flex items-center gap-3 sm:gap-4">
                <div
                    className="
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        rounded-2xl
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-[var(--primary)]
                        shrink-0
                    "
                >
                    <FiMapPin size={20} />
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-gray-500 tracking-[2px] uppercase">
                        Address Information
                    </p>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">
                        عنوان التوصيل
                    </h2>
                </div>
            </div>
        </div>

        {/* Body */}
        <div
            className="
                p-4
                sm:p-6
                md:p-8
            "
        >
            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-5
                    md:gap-6
                "
            >
                {fields.map((field) => {
                    const Icon = field.icon;

                    return (
                        <div
                            key={field.name}
                            className={field.full ? "lg:col-span-2" : ""}
                        >
                            <label className="block mb-2 text-sm font-semibold">
                                {field.label}
                            </label>

                            <div className="relative">
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Icon size={18} />
                                </div>

                                <input
                                    value={data[field.name]}
                                    onChange={(e) =>
                                        setData(field.name, e.target.value)
                                    }
                                    placeholder={field.placeholder}
                                    className="
                                        w-full
                                        h-12
                                        sm:h-14
                                        pr-12
                                        sm:pr-14
                                        pl-4
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        text-sm
                                        sm:text-base
                                        outline-none
                                        transition-all
                                        duration-300
                                        focus:bg-white
                                        focus:ring-1
                                        focus:ring-[var(--primary)]
                                        focus:border-[var(--primary)]
                                    "
                                />
                            </div>

                            {errors[field.name] && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer */}
        <div
            className="
                border-t
                px-4
                sm:px-6
                md:px-8
                py-5
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                justify-between
                gap-4
                bg-gray-50/50
            "
        >
            <p
                className="
                    text-sm
                    text-gray-500
                    text-center
                    sm:text-right
                    leading-6
                "
            >
                تأكد من كتابة عنوان دقيق لتسهيل عملية التوصيل بدون تأخير.
            </p>

            <button
                onClick={onSubmit}
                disabled={processing}
                className="
                    w-full
                    sm:w-auto
                    h-12
                    sm:h-14
                    px-6
                    sm:px-8
                    rounded-2xl
                    bg-[var(--primary)]
                    text-white
                    font-medium
                    flex
                    items-center
                    justify-center
                    gap-3
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:shadow-lg
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                "
            >
                <FiSave size={18} />

                <span>
                    {processing
                        ? "جارِ الحفظ..."
                        : "حفظ التعديلات"}
                </span>
            </button>
        </div>
    </motion.div>
);
}