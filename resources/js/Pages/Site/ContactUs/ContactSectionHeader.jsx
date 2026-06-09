import { motion } from "framer-motion";

export default function ContactSectionHeader() {
    return (
        <div className="relative text-center mb-14 lg:mb-16">

            {/* Decorative Glow */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full pointer-events-none" />

            {/* Small Label */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="
                    text-[var(--primary)]
                    text-sm
                    tracking-[0.35em]
                    uppercase
                    opacity-70
                "
            >
                Art Gate
            </motion.p>

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="
                    mt-4
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-bold
                    text-[var(--text-dark)]
                    leading-[1.2]
                "
            >
                تواصل معنا
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="
                    mt-5
                    max-w-3xl
                    mx-auto
                    text-[var(--accent)]
                    text-sm
                    sm:text-base
                    leading-[2]
                "
            >
                نسعد بالإجابة على استفساراتكم ومساعدتكم في كل ما يتعلق
                بالأعمال الفنية والطلبات الخاصة والتعاونات الإبداعية.
                فريقنا جاهز للتواصل معكم وتقديم أفضل تجربة ممكنة.
            </motion.p>

            {/* Animated Divider */}
            <div className="flex justify-center mt-8">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 90 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                    className="
                        h-[2px]
                        bg-[var(--primary)]
                        opacity-70
                        rounded-full
                    "
                />
            </div>

            {/* Bottom Accent */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-3
                "
            >
                <div className="w-8 h-[1px] bg-[var(--primary)] opacity-50" />

                <span className="text-xs text-gray-400 tracking-[0.2em]">
                    WE'D LOVE TO HEAR FROM YOU
                </span>

                <div className="w-8 h-[1px] bg-[var(--primary)] opacity-50" />
            </motion.div>
        </div>
    );
}