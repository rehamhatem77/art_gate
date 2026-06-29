import { getImage } from "@/Utils/GetImage";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FiUser,
    FiPackage,
    FiMapPin,
    FiLock,
    FiPhone,
    FiShield,
    FiLogOut,
} from "react-icons/fi";

export default function ProfileSidebar({
    activeTab,
    setActiveTab,
    user,
    orders = [],
}) {
    const completion = (() => {
        let score = 0;

        if (user?.name) score += 15;
        if (user?.email) score += 15;
        if (user?.profile?.phone) score += 15;
        if (user?.profile?.address) score += 20;
        if (user?.profile?.governorate) score += 20;
        if (user?.profile?.city) score += 15;

        return Math.min(score, 100);
    })();

    const menu = [
        // {
        //     id: "overview",
        //     title: "نظرة عامة",
        //     icon: FiUser,
        // },
        {
            id: "personal",
            title: "البيانات الشخصية",
            icon: FiUser,
        },
        {
            id: "contact",
            title: "التواصل",
            icon: FiPhone,
        },
        {
            id: "addresses",
            title: "العناوين",
            icon: FiMapPin,
        },
        {
            id: "security",
            title: "الأمان",
            icon: FiLock,
        },
        {
            id: "orders",
            title: "طلباتي",
            icon: FiPackage,
        },
    ];

    return (
        <div dir="rtl" className="h-full flex flex-col space-y-3">
               <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
                rounded-[28px]
                border
                border-gray-200
                bg-white
                shadow-[0_10px_35px_rgba(0,0,0,.04)]
                overflow-hidden
            "
        >
            {/* Top */}
            <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4">
                    <div
                        className="
                            w-16 h-16
                            sm:w-20 sm:h-20
                            rounded-full
                            overflow-hidden
                            bg-gray-100
                            shrink-0
                            flex
                            items-center
                            justify-center
                        "
                    >
                        {user.profile.avatar ? (
                            <img
                                src={getImage(user.profile.avatar)}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUser
                                size={26}
                                className="text-[var(--primary)]"
                            />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg truncate">
                            {user?.name}
                        </h3>

                        <p className="text-sm text-gray-500 truncate">
                            {user?.email}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                            <FiShield
                                className="text-green-600"
                                size={15}
                            />

                            <span className="text-xs text-green-700 font-medium">
                                حساب موثق
                            </span>
                        </div>
                    </div>
                </div>

                {/* Completion */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                            اكتمال الملف الشخصي
                        </span>

                        <span className="font-bold text-[var(--primary)]">
                            {completion}%
                        </span>
                    </div>

                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completion}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full bg-[var(--primary)]"
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="border-t bg-gray-50 p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3">
                    <div
                        className="
                            rounded-2xl
                            bg-white
                            border
                            border-gray-200
                            p-4
                            text-center
                        "
                    >
                        <div className="text-2xl font-bold text-[var(--primary)]">
                            {orders.length}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                            إجمالي الطلبات
                        </div>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            bg-white
                            border
                            border-gray-200
                            p-4
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >
                        <FiShield
                            className="text-green-600 mb-2"
                            size={18}
                        />

                        <div className="font-semibold text-sm">
                            حساب موثوق
                        </div>

                        <span className="text-xs text-gray-500 mt-1">
                            محمي وآمن
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>

            {/* DESKTOP MENU */}
                    {/* DESKTOP MENU */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
                hidden
                lg:block
                rounded-[28px]
                border
                border-gray-200
                bg-white
                shadow-[0_10px_35px_rgba(0,0,0,.04)]
                overflow-hidden
            "
        >
            <div className="p-3">
                <div className="space-y-2">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const active = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    group
                                    w-full
                                    min-h-[56px]
                                    px-5
                                    rounded-2xl
                                    flex
                                    items-center
                                    gap-4
                                    transition-all
                                    duration-300
                                    ${
                                        active
                                            ? "bg-[var(--primary)] text-white shadow-lg"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                            >
                                <Icon
                                    size={18}
                                    className={
                                        active
                                            ? ""
                                            : "text-gray-500 group-hover:text-[var(--primary)]"
                                    }
                                />

                                <span className="font-medium">
                                    {item.title}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="border-t mt-5 pt-5">
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="
                            w-full
                            min-h-[56px]
                            rounded-2xl
                            border
                            border-red-100
                            text-red-600
                            hover:bg-red-50
                            flex
                            items-center
                            justify-center
                            gap-3
                            transition
                        "
                    >
                        <FiLogOut size={18} />

                        <span className="font-medium">
                            تسجيل الخروج
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>

        {/* MOBILE MENU */}
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="
                lg:hidden
                rounded-[28px]
                border
                border-gray-200
                bg-white
                shadow-[0_10px_35px_rgba(0,0,0,.04)]
                overflow-hidden
            "
        >
            <div className="p-4 space-y-3">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                w-full
                                min-h-[54px]
                                px-4
                                rounded-2xl
                                flex
                                items-center
                                justify-between
                                transition-all
                                ${
                                    active
                                        ? "bg-[var(--primary)] text-white"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={18} />

                                <span className="font-medium text-sm">
                                    {item.title}
                                </span>
                            </div>

                            {active && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                        </button>
                    );
                })}

                <div className="border-t pt-3 mt-2">
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="
                            w-full
                            min-h-[54px]
                            rounded-2xl
                            bg-red-50
                            text-red-600
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:bg-red-100
                            transition
                        "
                    >
                        <FiLogOut size={18} />

                        <span className="font-medium">
                            تسجيل الخروج
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
);

   
}
