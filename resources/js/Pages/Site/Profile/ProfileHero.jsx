import { getImage } from "@/Utils/GetImage";
import { motion } from "framer-motion";

import {
    FiUser,
    FiPackage,
    FiShield,
    FiTruck,
    FiArrowUpLeft,
    FiCheckCircle,
} from "react-icons/fi";

const container = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

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

export default function ProfileHero({ user, orders , image }) {
    return (
        <section
            dir="rtl"
            className="relative h-[70vh] min-h-[550px] overflow-hidden bg-black"
        >
            {/* Background */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
            >
                <img
                    src={image? getImage(image):
                        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt="ArtGateContact"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

            {/* Gold glow */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b89b72]/20 blur-[120px] rounded-full" />

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center">
                <div className="w-full">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 flex items-center gap-2 text-sm text-white/70"
                    >
                        <button
                            onClick={() => router.visit(route("home"))}
                            className="hover:text-[var(--primary)] transition"
                        >
                            الرئيسية
                        </button>

                        <span>/</span>

                        <span className="text-[var(--primary)]">حسابي</span>
                    </motion.div>

                    {/* Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="
                                    max-w-4xl
                                   
                                   
                                 
                                    p-4
                                    md:p-8
                                    
                                "
                    >
                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="
                                        text-white
                                        text-4xl
                                        md:text-6xl
                                        xl:text-7xl
                                        font-bold
                                        leading-[1.1]
                                    "
                        >
                            حسابي
                        </motion.h1>
                        {/* Accent */}
                        <motion.div
                            variants={fadeUp}
                            className="
                            mt-7
                            flex
                            items-center
                            gap-4
                        "
                        >
                            <div className="w-24 h-[2px] bg-[var(--primary)]" />

                            <span className="text-sm text-white/50">
                                إدارة الحساب والطلبات
                            </span>
                        </motion.div>

                        {/* Description */}
                        <p
                            className="
                                        mt-8
                                        text-white/75
                                        text-base
                                        md:text-lg
                                        leading-[2]
                                        max-w-2xl
                                    "
                        >
                            قم بإدارة بياناتك الشخصية وعناوين التوصيل ومتابعة
                            طلباتك وحالة الشحن بكل سهولة من لوحة تحكم مصممة
                            لتوفر لك تجربة تسوق احترافية.
                        </p>
                        {/* Trust chips */}
                        <motion.div
                            variants={fadeUp}
                            className="
                            mt-10
                            flex
                            flex-wrap
                            gap-4
                        "
                        >
                            <div
                                className="
                                h-12
                                px-5
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                backdrop-blur-xl
                                flex
                                items-center
                                gap-3
                            "
                            >
                                <FiShield className="text-green-400" />

                                <span className="text-white/80 text-sm">
                                    بياناتك محمية وآمنة
                                </span>
                            </div>

                            <div
                                className="
                                h-12
                                px-5
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                backdrop-blur-xl
                                flex
                                items-center
                                gap-3
                            "
                            >
                                <FiPackage className="text-[var(--primary)]" />

                                <span className="text-white/80 text-sm">
                                    متابعة الطلبات بسهولة
                                </span>
                            </div>

                            <div
                                className="
                                h-12
                                px-5
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                backdrop-blur-xl
                                flex
                                items-center
                                gap-3
                            "
                            >
                                <FiCheckCircle className="text-emerald-400" />

                                <span className="text-white/80 text-sm">
                                    تجربة تسوق موثوقة
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fbfaf8] to-transparent" />
        </section>
    );
}
