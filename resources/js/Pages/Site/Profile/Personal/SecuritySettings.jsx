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
            {/* HEADER */}
            <div className="border-b px-6 md:px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center text-[var(--primary)]">
                        <FiShield size={22} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 tracking-[2px] uppercase">
                            Security Settings
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                            الأمان وكلمة المرور
                        </h2>
                    </div>
                </div>

                <div className="px-5 py-3 rounded-2xl bg-green-50 flex items-center gap-3 w-fit">
                    <FiCheckCircle className="text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                        حسابك مؤمن
                    </span>
                </div>
            </div>

            {/* BODY */}
            <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-semibold block mb-3">
                            كلمة المرور الحالية
                        </label>

                        <div className="relative">
                            <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400">
                                <FiLock size={18} />
                            </div>

                            <input
                                type="password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
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

                        {errors.current_password && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-semibold block mb-3">
                            كلمة المرور الجديدة
                        </label>

                        <div className="relative">
                            <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400">
                                <FiKey size={18} />
                            </div>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
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

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-semibold block mb-3">
                            تأكيد كلمة المرور
                        </label>

                        <div className="relative">
                            <div className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-400">
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

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                {/* SECURITY INFO */}
                <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-100 p-6">
                    <h4 className="font-bold mb-3">نصائح الأمان</h4>

                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>• استخدم كلمة مرور لا تقل عن 8 أحرف.</li>
                        <li>• اجمع بين الأحرف والأرقام والرموز.</li>
                        <li>• لا تشارك بيانات الدخول مع أي شخص.</li>
                    </ul>
                </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                    قم بتحديث كلمة المرور بشكل دوري للحفاظ على أمان حسابك.
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