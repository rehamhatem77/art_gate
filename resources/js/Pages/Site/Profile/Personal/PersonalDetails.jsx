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
            initial={{
                opacity: 0,
                y: 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.4,
            }}
            dir="rtl"
            className="
               
                overflow-hidden
            "
        >
            {/* Header */}
            <div className="border-b px-6 md:px-8 py-6">
                <div className="flex items-center gap-4">
                    <div
                        className="
                        h-14
                        w-14
                        rounded-2xl
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-[var(--primary)]
                    "
                    >
                        <FiUser size={22} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 tracking-[2px] uppercase">
                            Personal Details
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                            المعلومات الشخصية
                        </h2>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div
                className="
                p-6
                md:p-8
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
            "
            >
                {/* AVATAR INPUT */}
                <div className="md:col-span-2 flex flex-col items-center justify-center">
                    <label className="text-sm font-semibold block mb-3">
                        الصورة الشخصية
                    </label>

                    <label className="relative cursor-pointer group">
                        {/* Avatar Circle */}
                        <div className="h-28 w-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200  transition-all duration-300">
                            {data.avatar ? (
                                <img
                                    src={avatarPreview}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FiUser className="text-gray-400" size={28} />
                            )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                            <FiCamera className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                        </div>

                        {/* Hidden Input */}
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
                        <p className="text-red-500 text-sm mt-2">
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
                    onChange={(e) => setData("birth_date", e.target.value)}
                />

                <div>
                    <label className="text-sm font-semibold block mb-3">
                        النوع
                    </label>

                    <select
                        value={data.gender}
                        onChange={(e) => setData("gender", e.target.value)}
                        className="
                            h-14
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
                px-6
                md:px-8
                py-5
                flex
                flex-col
                sm:flex-row
                items-center
                justify-between
                gap-4
            "
            >
                <p className="text-sm text-gray-500">
                    قم بحفظ التعديلات بعد الانتهاء.
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

function InputField({ label, icon: Icon, error, ...props }) {
    return (
        <div>
            <label className="text-sm font-semibold block mb-3">{label}</label>

            <div className="relative">
                <div
                    className="
                    absolute
                    top-1/2
                    right-5
                    -translate-y-1/2
                    text-gray-400
                "
                >
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

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
