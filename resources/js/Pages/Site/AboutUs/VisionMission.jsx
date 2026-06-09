import { motion } from "framer-motion";
import { FiEye, FiTarget } from "react-icons/fi";

export default function VisionMission({section}) {
    return (
        <section
            dir="rtl"
            className="relative py-16 sm:py-20 lg:py-28 overflow-hidden
                       bg-gradient-to-b from-[#fcfbf9] to-[#f6f3ee]"
        >
            {/* soft ambient background */}
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_right,rgba(184,155,114,0.10),transparent_55%)]" />

            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14 lg:mb-16"
                >
                    <span className="text-[var(--primary)] text-xs sm:text-sm tracking-[0.4em] uppercase">
                        Art Gate
                    </span>

                    <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-dark)]">
                      {section?.section_title? section.section_title : "رؤيتنا ورسالتنا"}
                    </h2>

                    <div className="w-20 h-[2px] bg-[var(--primary)] opacity-70 mx-auto mt-5 rounded-full" />
                </motion.div>

                {/* GRID */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">

                    {/* VISION */}
                    <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="
                            relative
                            rounded-3xl
                            p-6 sm:p-8 lg:p-10
                            bg-white/70 backdrop-blur-md
                            border border-[#ece4d8]
                            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                            hover:shadow-[0_18px_60px_rgba(0,0,0,0.07)]
                            transition-all duration-300
                        "
                    >
                        {/* soft glow accent */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary)] opacity-20 rounded-full blur-2xl" />

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-xl bg-[#b89b72]/10 flex items-center justify-center">
                                <FiEye className="text-[var(--primary)] text-xl" />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-dark)]">
                               {section?.vision.title? section.vision.title : "رؤيتنا"}
                            </h3>
                        </div>

                        <p className="text-[var(--accent)] text-sm sm:text-base leading-[1.9]">
                         {section?.vision.description? section.vision.description : `  أن نصبح المصدر الأكثر ثقةً وإلهامًا للوحات الفنية الفاخرة،
                            وأن نعيد تعريف مفهوم الفخامة الفنية من خلال تقديم أعمال
                            تجمع بين الإبداع والجودة والهوية البصرية الراقية.
                            نطمح لأن نكون الجسر الذي يربط الفنانين بعشاق الفن حول العالم.`}
                        </p>
                    </motion.div>

                    {/* MISSION */}
                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="
                            relative
                            rounded-3xl
                            p-6 sm:p-8 lg:p-10
                            bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a]
                            text-white
                            shadow-[0_15px_50px_rgba(0,0,0,0.2)]
                            hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)]
                            transition-all duration-300
                        "
                    >
                        {/* subtle gold glow */}
                        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[#b89b72]/10 rounded-full blur-3xl" />

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <FiTarget className="text-[var(--primary)] text-xl" />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold">
                               {section?.mission.title?section.mission.title : "رسالتنا"}
                            </h3>
                        </div>

                        <p className="text-gray-300 text-sm sm:text-base leading-[1.9]">
                            {section?.mission.description? section.mission.description:`
                            اكتشاف وعرض المواهب الفنية المميزة، وتوفير مجموعة مختارة
                            بعناية من الأعمال الراقية التي تثري المساحات وتلهم المشاعر.
                            نلتزم بتقديم تجربة فنية متكاملة تجمع بين الجودة والخدمة الراقية
                            والذوق الرفيع.`}
                        </p>
                    </motion.div>
                </div>

                {/* bottom accent line */}
                <div className="mt-20 flex justify-center">
                    <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#b89b72] to-transparent" />
                </div>
            </div>
        </section>
    );
}