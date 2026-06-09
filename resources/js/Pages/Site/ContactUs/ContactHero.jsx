import { motion } from "framer-motion";
import { router } from "@inertiajs/react";
import {
    FiArrowUpLeft,
    FiMail,
    FiPhoneCall,
} from "react-icons/fi";

export default function ContactHero() {
    return (
        <section
            dir="rtl"
            className="relative h-[85vh] min-h-[750px] overflow-hidden bg-black"
        >
            {/* Background */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop"
                    alt=""
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

                        <span className="text-[var(--primary)]">
                            اتصل بنا
                        </span>
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
                        {/* Label */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-[2px] bg-[var(--primary)]" />

                            <span className="text-white/80 tracking-[0.25em] text-sm uppercase">
                            تواصل مع فريق ARTGATE
                            </span>
                        </div>

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
                            لنبـدأ
                            <span className="block text-[var(--primary)] mt-3">
                                حديثاً عن الفن
                            </span>
                        </motion.h1>

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
                            سواء كنت تبحث عن لوحة فريدة لمساحتك،
                            أو ترغب في تنفيذ مشروع فني متكامل،
                            فإن فريقنا مستعد لمساعدتك وتقديم
                            الاستشارة المناسبة.
                        </p>

                      

                        {/* CTA */}
                        <div className="mt-10">
                            <button
                                className="
                                    h-14
                                    px-8
                                    rounded-full
                                    bg-[var(--primary)]
                                    text-white
                                    font-medium
                                    flex
                                    items-center
                                    gap-3
                                    hover:translate-y-[-2px]
                                    transition-all
                                "
                            >
                                تواصل معنا الآن

                                <FiArrowUpLeft />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fbfaf8] to-transparent" />
        </section>
    );
}