import { getImage } from "@/Utils/GetImage";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCalendar, FiSave, FiCamera } from "react-icons/fi";

export default function PersonalDetails({
    data,
    setData,
    errors = {},
    processing = false,
    onSubmit,
}) {
const avatarPreview =
    data.avatar instanceof File
        ? URL.createObjectURL(data.avatar)
        : data.avatar
        ? getImage(data.avatar)
        : null;
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
                    <FiUser size={20} />
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-gray-500 tracking-[2px] uppercase">
                        Personal Details
                    </p>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">
                        المعلومات الشخصية
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
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-5
                md:gap-6
            "
        >
            {/* Avatar */}
            <div className="lg:col-span-2 flex flex-col items-center">
                <label className="text-sm font-semibold mb-4">
                    الصورة الشخصية
                </label>

                <label className="relative cursor-pointer group">
                    <div
                        className="
                            h-24
                            w-24
                            sm:h-28
                            sm:w-28
                            md:h-32
                            md:w-32
                            rounded-full
                            overflow-hidden
                            bg-gray-100
                            border
                            border-gray-200
                            flex
                            items-center
                            justify-center
                            transition
                        "
                    >
                        {data.avatar ? (
                            <img
                                src={avatarPreview}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUser
                                size={34}
                                className="text-gray-400"
                            />
                        )}
                    </div>

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            bg-black/0
                            group-hover:bg-black/20
                            flex
                            items-center
                            justify-center
                            transition
                        "
                    >
                        <FiCamera
                            className="
                                text-white
                                opacity-0
                                group-hover:opacity-100
                                transition
                            "
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            setData("avatar", e.target.files[0])
                        }
                    />
                </label>

                {errors.avatar && (
                    <p className="text-red-500 text-sm mt-3">
                        {errors.avatar}
                    </p>
                )}
            </div>

            <InputField
                label="الاسم الكامل"
                icon={FiUser}
                value={data.name}
                error={errors.name}
                onChange={(e) => setData("name", e.target.value)}
            />

            <InputField
                label="البريد الإلكتروني"
                icon={FiMail}
                value={data.email}
                error={errors.email}
                onChange={(e) => setData("email", e.target.value)}
            />

            <InputField
                label="تاريخ الميلاد"
                icon={FiCalendar}
                type="date"
                value={data.birth_date}
                error={errors.birth_date}
                onChange={(e) =>
                    setData("birth_date", e.target.value)
                }
            />

            <div>
                <label className="text-sm font-semibold block mb-3">
                    النوع
                </label>

                <select
                    value={data.gender}
                    onChange={(e) =>
                        setData("gender", e.target.value)
                    }
                    className="
                        h-13
                        sm:h-14
                        w-full
                        px-8
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        outline-none
                        transition-all
                        focus:bg-white
                        focus:ring-1
                        focus:ring-[var(--primary)]
                        focus:border-[var(--primary)]
                    "
                >
                    <option value="">اختر النوع</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                </select>

                {errors.gender && (
                    <p className="text-red-500 text-sm mt-2">
                        {errors.gender}
                    </p>
                )}
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
                قم بحفظ التعديلات بعد الانتهاء.
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

function InputField({ label, icon: Icon, error, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold">
                {label}
            </label>

            <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon size={18} />
                </div>

                <input
                    {...props}
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

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
