import {
    FiShoppingBag,
    FiClock,
    FiTruck,
    FiCheckCircle,
    FiDollarSign,
} from "react-icons/fi";

export default function OrdersStatistics({ statistics }) {
    const cards = [
        {
            title: "إجمالي الطلبات",

            value: statistics.total,

            icon: FiShoppingBag,

            color: "text-violet-600",

            bg: "bg-violet-100",
        },

        {
            title: "بانتظار المراجعة",

            value: statistics.pending,

            icon: FiClock,

            color: "text-amber-600",

            bg: "bg-amber-100",
        },

        {
            title: "قيد الشحن",

            value: statistics.shipping,

            icon: FiTruck,

            color: "text-blue-600",

            bg: "bg-blue-100",
        },

        {
            title: "تم التسليم",

            value: statistics.completed,

            icon: FiCheckCircle,

            color: "text-emerald-600",

            bg: "bg-emerald-100",
        },

        {
            title: "إجمالي الإيرادات",

            value: `${statistics.revenue} ج`,

            icon: FiDollarSign,

            featured: true,
        },
    ];

    return (
        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-5
                gap-5
            "
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className={`
                            group
                            relative
                            overflow-hidden
                            rounded-[32px]
                            border
                            transition-all
                            duration-300
                            hover:shadow-sm
                            ${
                                card.featured
                                    ? `
                                    border-transparent
                                    bg-gradient-to-br
                                    from-[var(--primary)]
                                    to-[color-mix(in_srgb,var(--primary)_85%,black)]
                                    text-white
                                `
                                    : `
                                    border-gray-200
                                    bg-white
                                    hover:border-gray-300
                                `
                            }
                        `}
                    >
                        {/* Decorative circle */}

                        <div
                            className={`
                                absolute
                                -top-14
                                -left-14
                                h-40
                                w-40
                                rounded-full
                                blur-3xl
                                opacity-40
                                ${card.featured ? "bg-white" : card.bg}
                            `}
                        />

                        <div className="relative p-7">
                            <div className="flex justify-between items-start">
                                {/* Content */}

                                <div>
                                    <p
                                        className={`
                                            text-sm
                                            font-medium

                                            ${
                                                card.featured
                                                    ? "text-white/80"
                                                    : "text-gray-500"
                                            }
                                        `}
                                    >
                                        {card.title}
                                    </p>

                                    <h3
                                        className="
                                            mt-5
                                            text-2xl
                                            font-black
                                            tracking-tight
                                        "
                                    >
                                        {card.value}
                                    </h3>
                                </div>

                                {/* Icon */}

                                <div
                                    className={`
                                        h-12
                                        w-12
                                        rounded-3xl
                                        flex
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-300
                                        ${
                                            card.featured
                                                ? `
                                                bg-white/15
                                                backdrop-blur
                                            `
                                                : card.bg
                                        }
                                    `}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            card.featured
                                                ? "text-white"
                                                : card.color
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
