import { getImage } from "@/Utils/GetImage";
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
            {/* ACCOUNT CARD */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="
                rounded-[28px]
                border
                border-gray-200
                bg-white
                p-5
                shadow-[0_10px_35px_rgba(0,0,0,.04)]
            "
            >
                {/* User */}
                <div className="flex items-center gap-4">
                    <div
                        className="
                        w-14 h-14
                        rounded-full
                        bg-gray-100
                        flex items-center justify-center
                    "
                    >
                        {user.profile.avatar ? (
                            <img
                                src={getImage(user.profile.avatar)}
                                className=" object-cover rounded-full"
                            />
                        ) : (
                            <FiUser
                                size={22}
                                className="text-[var(--primary)]"
                            />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold truncate">{user?.name}</h3>

                        <p className="text-sm text-gray-500 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* Completion */}
                <div className="mt-3">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">
                            اكتمال الملف الشخصي
                        </span>

                        <span className="font-semibold text-[var(--primary)]">
                            {completion}%
                        </span>
                    </div>

                    <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completion}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full bg-[var(--primary)]"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-5 mx-5">
                    <div
                        className="
                        rounded-2xl
                        border
                        border-gray-200
                        p-2
                        text-center
                    "
                    >
                        <div className="text-xl font-bold">
                            {orders.length}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                            إجمالي الطلبات
                        </div>
                    </div>

                    <div
                        className="
                        rounded-2xl
                        border
                        border-gray-200
                        p-2
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                    >
                        <FiShield size={16} className="text-green-600 mb-2" />

                        <div className="text-sm font-medium">حساب موثوق</div>
                    </div>
                </div>
            </motion.div>

            {/* DESKTOP MENU */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="
                hidden lg:block
                rounded-[28px]
                border
                border-gray-200
                bg-white
                p-3
                shadow-[0_10px_35px_rgba(0,0,0,.04)]
            "
            >
                <div className="space-y-1">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const active = activeTab === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                w-full
                                h-14
                                px-4
                                rounded-2xl
                                flex items-center gap-4
                                transition-all duration-300
                                ${
                                    active
                                        ? "bg-[var(--primary)] text-white"
                                        : "hover:bg-gray-50 text-gray-700"
                                }
                            `}
                            >
                                <Icon size={18} />

                                <span className="font-medium">
                                    {item.title}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="border-t mt-4 pt-4">
                    <button
                        className="
                        w-full
                        h-14
                        rounded-2xl
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
                        تسجيل الخروج
                    </button>
                </div>
            </motion.div>

            {/* MOBILE MENU */}
            <div className="lg:hidden">
                <div
                    className="
                    flex
                    gap-2
                    overflow-x-auto
                    scrollbar-none
                "
                >
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                shrink-0
                                h-12
                                px-5
                                rounded-full
                                border
                                flex
                                items-center
                                gap-2
                                transition-all
                                ${
                                    activeTab === item.id
                                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                                        : "bg-white border-gray-200"
                                }
                            `}
                            >
                                <Icon size={15} />

                                <span className="text-sm">{item.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
