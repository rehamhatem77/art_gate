import { motion } from "framer-motion";
import {
    FiCalendar,
    FiCheckCircle,
    FiPackage,
    FiDollarSign,
    FiClock,
    FiTrendingUp,
    FiUser,
    FiMapPin,
} from "react-icons/fi";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export default function AccountOverview({
    user,
    orders = [],
}) {
    const completion = (() => {
        let score = 0;

        if (user?.name) score += 15;
        if (user?.email) score += 15;
        if (user?.phone) score += 15;
        if (user?.country) score += 15;
        if (user?.governorate) score += 15;
        if (user?.area) score += 15;
        if (user?.address) score += 10;

        return score;
    })();

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.total),
        0
    );

    const processingOrders = orders.filter(
        (order) => order.status === "processing"
    ).length;

    const completedOrders = orders.filter(
        (order) => order.status === "completed"
    ).length;

    const memberSince = user?.created_at
        ? new Date(user.created_at).toLocaleDateString("ar-EG")
        : "--";

    const lastOrder =
        orders.length > 0
            ? orders[0]?.created_at
                ? new Date(orders[0].created_at).toLocaleDateString("ar-EG")
                : "—"
            : "لا توجد طلبات";

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            dir="rtl"
            className="
                bg-white
                border
                border-gray-200
                rounded-[32px]
                overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,.05)]
            "
        >
            {/* Header */}
            <motion.div
                variants={item}
                className="
                    relative
                    p-6
                    md:p-8
                    border-b
                    border-gray-100
                "
            >
                <div className="absolute left-0 top-0 w-60 h-60 rounded-full bg-[var(--primary)]/5 blur-[100px]" />

                <div className="relative flex flex-col xl:flex-row gap-8 justify-between">
                    <div className="flex gap-4 items-start">
                        <div
                            className="
                                h-16 w-16 md:h-20 md:w-20
                                rounded-3xl
                                bg-[var(--primary)]
                                text-white
                                flex items-center justify-center
                                text-3xl
                                font-bold
                            "
                        >
                            {user?.name?.charAt(0)}
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                مرحباً بعودتك
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold mt-1">
                                {user?.name}
                            </h2>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="h-10 px-4 rounded-2xl bg-green-50 text-green-700 flex items-center gap-2 text-sm">
                                    <FiCheckCircle />
                                    حساب موثق
                                </div>

                                <div className="h-10 px-4 rounded-2xl bg-gray-100 text-gray-600 flex items-center gap-2 text-sm">
                                    <FiCalendar />
                                    عضو منذ {memberSince}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completion */}
                    <div className="w-full xl:w-[320px]">
                        <div className="flex justify-between mb-3">
                            <span className="font-medium">
                                اكتمال الحساب
                            </span>

                            <span className="font-bold text-[var(--primary)]">
                                {completion}%
                            </span>
                        </div>

                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${completion}%`,
                                }}
                                transition={{
                                    duration: 1,
                                }}
                                className="h-full rounded-full bg-[var(--primary)]"
                            />
                        </div>

                        <p className="mt-3 text-sm text-gray-500 leading-7">
                            اكتمال بيانات الحساب يساعد على تسريع الشحن وتحسين تجربة التسوق.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
                variants={item}
                className="
                    p-6 md:p-8
                    grid
                    grid-cols-2
                    lg:grid-cols-4
                    gap-4
                "
            >
                <StatCard
                    icon={FiPackage}
                    title="إجمالي الطلبات"
                    value={totalOrders}
                />

                <StatCard
                    icon={FiDollarSign}
                    title="إجمالي المشتريات"
                    value={`${totalSpent} ج`}
                />

                <StatCard
                    icon={FiClock}
                    title="قيد التنفيذ"
                    value={processingOrders}
                />

                <StatCard
                    icon={FiTrendingUp}
                    title="تم التسليم"
                    value={completedOrders}
                />
            </motion.div>

            {/* Insights */}
            <motion.div
                variants={item}
                className="
                    border-t
                    border-gray-100
                    p-6 md:p-8
                    grid
                    md:grid-cols-3
                    gap-4
                "
            >
                <Insight
                    icon={FiUser}
                    title="جاهزية الحساب"
                    value={`${completion}%`}
                />

                <Insight
                    icon={FiCalendar}
                    title="آخر طلب"
                    value={lastOrder}
                />

                <Insight
                    icon={FiMapPin}
                    title="منطقة الشحن"
                    value={user?.governorate || "غير محددة"}
                />
            </motion.div>
        </motion.div>
    );
}

function StatCard({
    icon: Icon,
    title,
    value,
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
            }}
            className="
                bg-gray-50
                border
                border-gray-100
                rounded-3xl
                p-5
            "
        >
            <div className="w-12 h-12 rounded-2xl bg-white border flex items-center justify-center text-[var(--primary)] mb-5">
                <Icon size={20} />
            </div>

            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold">
                {value}
            </h3>
        </motion.div>
    );
}

function Insight({
    icon: Icon,
    title,
    value,
}) {
    return (
        <div className="rounded-3xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[var(--primary)]">
                <Icon size={20} />
            </div>

            <div>
                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <h4 className="font-semibold mt-1">
                    {value}
                </h4>
            </div>
        </div>
    );
}