import { motion } from "framer-motion";
import { FiEye, FiTarget } from "react-icons/fi";

export default function VisionMission() {
    return (
        <section
            dir="rtl"
            className="relative min-h-[80vh] py-28 overflow-hidden bg-[#faf8f5]"
        >
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#b89b72]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#b89b72]/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-[#b89b72] tracking-[0.3em] text-sm">
                        ART GATE
                    </span>

                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f1f1f]">
                        رؤيتنا ورسالتنا
                    </h2>

                    <div className="w-24 h-[3px] bg-[#b89b72] mx-auto mt-8 rounded-full" />
                </motion.div>

                {/* Cards */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="
                            bg-white
                            rounded-[32px]
                            p-10 lg:p-14
                            border border-[#ece4d8]
                            shadow-[0_20px_60px_rgba(0,0,0,0.05)]
                            relative
                            overflow-hidden
                        "
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#b89b72]/5 rounded-full translate-x-1/3 -translate-y-1/3" />

                        <div className="w-16 h-16 rounded-2xl bg-[#b89b72]/10 flex items-center justify-center mb-8">
                            <FiEye className="text-[#b89b72] text-3xl" />
                        </div>

                        <h3 className="text-3xl font-bold text-[#1f1f1f] mb-6">
                            رؤيتنا
                        </h3>

                        <p className="text-lg leading-loose text-gray-600">
                            أن نصبح المصدر الأكثر ثقةً وإلهامًا للوحات الفنية
                            الفاخرة، وأن نعيد تعريف مفهوم الفخامة الفنية من خلال
                            تقديم أعمال استثنائية تجمع بين الإبداع والجودة
                            والهوية البصرية الراقية. نطمح لأن نكون الجسر الذي
                            يربط الفنانين المبدعين بعشاق الفن حول العالم.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="
                            bg-[#1f1f1f]
                            rounded-[32px]
                            p-10 lg:p-14
                            text-white
                            relative
                            overflow-hidden
                        "
                    >
                        <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />

                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                            <FiTarget className="text-[#d4b489] text-3xl" />
                        </div>

                        <h3 className="text-3xl font-bold mb-6">
                            رسالتنا
                        </h3>

                        <p className="text-lg leading-loose text-gray-300">
                            اكتشاف وعرض المواهب الفنية المميزة، وتوفير مجموعة
                            مختارة بعناية من الأعمال الراقية التي تثري المساحات
                            وتلهم المشاعر. نلتزم بتقديم تجربة فنية متكاملة
                            تجمع بين الجودة الاستثنائية والخدمة الراقية والذوق
                            الرفيع.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}