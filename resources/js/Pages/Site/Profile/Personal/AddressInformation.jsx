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
            name: "area",
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
            {/* HEADER */}
            <div className="border-b px-6 md:px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center text-[var(--primary)]">
                        <FiMapPin size={22} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 tracking-[2px] uppercase">
                            Address Information
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                            عنوان التوصيل
                        </h2>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map((field) => {
                        const Icon = field.icon;

                        return (
                            <div
                                key={field.name}
                                className={
                                    field.full ? "md:col-span-2" : ""
                                }
                            >
                                <label className="text-sm font-semibold block mb-3">
                                    {field.label}
                                </label>

                                <div className="relative">
                                    <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400">
                                        <Icon size={18} />
                                    </div>

                                    <input
                                        value={data[field.name]}
                                        onChange={(e) =>
                                            setData(field.name, e.target.value)
                                        }
                                        placeholder={field.placeholder}
                                        className="
                                            h-14
                                            w-full
                                            pr-14
                                            pl-5
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-gray-50
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
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                    تأكد من كتابة عنوان دقيق لتسهيل عملية التوصيل بدون تأخير.
                </p>

                <button
                    onClick={onSubmit}
                    disabled={processing}
                    className="
                        h-14
                        px-8
                        rounded-2xl
                        bg-[var(--primary)]
                        text-white
                        font-medium
                        flex
                        items-center
                        gap-3
                        transition-all
                        hover:scale-[1.02]
                        disabled:opacity-60
                    "
                >
                    <FiSave />
                    {processing ? "جارِ الحفظ..." : "حفظ التعديلات"}
                </button>
            </div>
        </motion.div>
    );
}