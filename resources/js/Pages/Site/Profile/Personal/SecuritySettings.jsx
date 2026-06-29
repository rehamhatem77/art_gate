import { motion } from "framer-motion";

import {
    FiLock,
    FiShield,
    FiKey,
    FiCheckCircle,
    FiSave,
} from "react-icons/fi";

export default function SecuritySettings({
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
        {/* Header */}
        <div
            className="
                border-b
                px-4
                sm:px-6
                md:px-8
                py-5
                md:py-6
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
            "
        >
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
                    <FiShield size={20} />
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-gray-500 tracking-[2px] uppercase">
                        Security Settings
                    </p>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">
                        الأمان وكلمة المرور
                    </h2>
                </div>
            </div>

            <div
                className="
                    w-full
                    sm:w-fit
                    px-4
                    py-3
                    rounded-2xl
                    bg-green-50
                    flex
                    items-center
                    justify-center
                    gap-3
                "
            >
                <FiCheckCircle className="text-green-600" />

                <span className="text-sm font-semibold text-green-700">
                    حسابك مؤمن
                </span>
            </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 md:p-8">
            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-5
                    md:gap-6
                "
            >
                {/* Current Password */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        كلمة المرور الحالية
                    </label>

                    <div className="relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiLock size={18} />
                        </div>

                        <input
                            type="password"
                            value={data.current_password}
                            onChange={(e) =>
                                setData(
                                    "current_password",
                                    e.target.value
                                )
                            }
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

                    {errors.current_password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                {/* New Password */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        كلمة المرور الجديدة
                    </label>

                    <div className="relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiKey size={18} />
                        </div>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
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

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block mb-2 text-sm font-semibold">
                        تأكيد كلمة المرور
                    </label>

                    <div className="relative">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiShield size={18} />
                        </div>

                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
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

                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>
            </div>

            {/* Security Tips */}
            <div
                className="
                    mt-6
                    md:mt-8
                    rounded-2xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-5
                    md:p-6
                "
            >
                <h4 className="font-bold mb-3">
                    نصائح الأمان
                </h4>

                <ul className="space-y-2 text-sm text-gray-500 leading-7">
                    <li>• استخدم كلمة مرور لا تقل عن 8 أحرف.</li>
                    <li>• اجمع بين الأحرف والأرقام والرموز.</li>
                    <li>• لا تشارك بيانات الدخول مع أي شخص.</li>
                </ul>
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
                قم بتحديث كلمة المرور بشكل دوري للحفاظ على أمان
                حسابك.
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