import { motion } from "framer-motion";

import {
    FiPhone,
    FiMessageSquare,
    FiMail,
    FiSave,
} from "react-icons/fi";

export default function ContactInformation({
    data,
    setData,
    errors = {},
    processing = false,
    onSubmit,
}) {
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
                        <FiPhone size={22} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 tracking-[2px] uppercase">
                            Contact Information
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                            معلومات التواصل
                        </h2>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="رقم الهاتف"
                    icon={FiPhone}
                    placeholder="01000000000"
                    value={data.phone}
                    error={errors.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                />

                <InputField
                    label="رقم هاتف إضافي"
                    icon={FiPhone}
                    placeholder="اختياري"
                    value={data.second_phone}
                    error={errors.second_phone}
                    onChange={(e) =>
                        setData("second_phone", e.target.value)
                    }
                />

                <div className="md:col-span-2">
                    <InputField
                        label="واتساب"
                        icon={FiMessageSquare}
                        placeholder="01xxxxxxxxx"
                        value={data.whatsapp}
                        error={errors.whatsapp}
                        onChange={(e) =>
                            setData("whatsapp", e.target.value)
                        }
                    />
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                    تأكد من صحة بيانات التواصل ليتمكن فريق الدعم من الوصول إليك بسهولة.
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

/* ================= INPUT (MATCHED WITH PERSONAL DETAILS) ================= */

function InputField({ label, icon: Icon, error, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold block mb-3">
                {label}
            </label>

            <div className="relative">
                <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400">
                    <Icon size={18} />
                </div>

                <input
                    {...props}
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

            {error && (
                <p className="text-red-500 text-sm mt-2">
                    {error}
                </p>
            )}
        </div>
    );
}