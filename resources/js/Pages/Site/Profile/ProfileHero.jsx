import { getImage } from "@/Utils/GetImage";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

import {
    FiUser,
    FiPackage,
    FiShield,
    FiTruck,
    FiCheckCircle,
    FiKey,
    FiLock,
    FiEye,
} from "react-icons/fi";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 35,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const securityIcons = {
    FiShield,
    FiLock,
    FiCheckCircle,
    FiKey,
    FiEye,
    FiTruck,
    FiPackage,
    FiUser,
};

export default function ProfileHero({ user, orders, image, security }) {
    const securityItems = Array.isArray(security)
        ? security
        : typeof security === "string"
          ? JSON.parse(security || "[]")
          : [];

    const securityIconColors = {
        FiShield: "text-green-400",
        FiLock: "text-sky-400",
        FiCheckCircle: "text-emerald-400",
        FiKey: "text-amber-400",
        FiEye: "text-violet-400",
        FiTruck: "text-blue-400",
        FiUser: "text-pink-400",
    };

    return (
        <section
            dir="rtl"
            className="
                relative
                min-h-[500px]
                md:min-h-[650px]
                overflow-hidden
                bg-black
            "
        >
            {/* Background */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
            >
                <img
                    src={
                        image
                            ? getImage(image)
                            : "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt="Profile Hero"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            {/* Glow */}
            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    w-[220px]
                    h-[220px]
                    md:w-[500px]
                    md:h-[500px]
                    bg-[#b89b72]/20
                    blur-[100px]
                    rounded-full
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    flex
                    items-center
                    min-h-[500px]
                    md:min-h-[650px]
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-10
                    py-16
                "
            >
                <div className="w-full">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="
                            mb-6
                            md:mb-10
                            flex
                            items-center
                            gap-2
                            text-xs
                            sm:text-sm
                            text-white/70
                        "
                    >
                        <button
                            onClick={() => router.visit(route("home"))}
                            className="hover:text-[var(--primary)] transition"
                        >
                            الرئيسية
                        </button>

                        <span>/</span>

                        <span className="text-[var(--primary)]">
                            حسابي
                        </span>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="
                                text-white
                                font-bold
                                leading-tight
                                text-3xl
                                sm:text-5xl
                                lg:text-6xl
                                xl:text-7xl
                            "
                        >
                            حسابي
                        </motion.h1>

                        {/* Accent */}
                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-5
                                md:mt-7
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <div className="w-12 sm:w-20 md:w-24 h-[2px] bg-[var(--primary)]" />

                            <span className="text-xs sm:text-sm text-white/50">
                                إدارة الحساب والطلبات
                            </span>
                        </motion.div>

                        {/* Description */}
                        <p
                            className="
                                mt-6
                                md:mt-8
                                text-white/75
                                text-sm
                                sm:text-base
                                md:text-lg
                                leading-7
                                md:leading-8
                                max-w-2xl
                            "
                        >
                            قم بإدارة بياناتك الشخصية وعناوين التوصيل ومتابعة
                            طلباتك وحالة الشحن بكل سهولة من لوحة تحكم مصممة
                            لتوفر لك تجربة تسوق احترافية.
                        </p>

                        {/* Security Items */}
                        {!!securityItems?.length ? (
                            <motion.div
                                variants={fadeUp}
                                className="
                                    mt-8
                                    md:mt-10
                                    flex
                                    flex-wrap
                                    gap-3
                                "
                            >
                                {securityItems.map((item, index) => {
                                    const iconName = item.icon;
                                    const Icon =
                                        securityIcons[item.icon] || FiShield;

                                    const iconColor =
                                        securityIconColors[iconName] ||
                                        "text-[var(--primary)]";

                                    return (
                                        <div
                                            key={index}
                                            className="
                                                w-full
                                                sm:w-auto
                                                min-h-[48px]
                                                px-4
                                                rounded-full
                                                border
                                                border-white/10
                                                bg-white/10
                                                backdrop-blur-xl
                                                flex
                                                items-center
                                                justify-center
                                                sm:justify-start
                                                gap-3
                                                hover:bg-white/15
                                                transition
                                            "
                                        >
                                            <Icon
                                                className={`${iconColor} text-lg`}
                                            />

                                            <span className="text-white/80 text-sm">
                                                {item.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={fadeUp}
                                className="
                                    mt-8
                                    md:mt-10
                                    flex
                                    flex-wrap
                                    gap-3
                                "
                            >
                                {[
                                    {
                                        icon: (
                                            <FiShield className="text-green-400" />
                                        ),
                                        text: "بياناتك محمية وآمنة",
                                    },
                                    {
                                        icon: (
                                            <FiPackage className="text-[var(--primary)]" />
                                        ),
                                        text: "متابعة الطلبات بسهولة",
                                    },
                                    {
                                        icon: (
                                            <FiCheckCircle className="text-emerald-400" />
                                        ),
                                        text: "تجربة تسوق موثوقة",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="
                                            w-full
                                            sm:w-auto
                                            min-h-[48px]
                                            px-4
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-white/10
                                            backdrop-blur-xl
                                            flex
                                            items-center
                                            justify-center
                                            sm:justify-start
                                            gap-3
                                        "
                                    >
                                        {item.icon}

                                        <span className="text-white/80 text-sm">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-[#fbfaf8] to-transparent" />
        </section>
    );
}