import { motion } from "framer-motion";

export default function OurStory({ aboutSection }) {
    return (
        <section
            dir="rtl"
            className="relative py-16 sm:py-20 lg:py-28 bg-[#fbfaf8]"
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">

                {/* HEADER */}
                <div className="text-right mb-14 lg:mb-18">

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5 }}
                        className="text-[var(--primary)] opacity-50 text-sm sm:text-base tracking-[0.25em] uppercase"
                    >
                        {aboutSection?.about_section_subtitle ||
                            "رحلتنا مع الفن والإبداع"}
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.6 }}
                        className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-dark)]  leading-[1.2]"
                    >
                        {aboutSection?.about_section_title ||
                            "نحوّل الجدران إلى مساحات تنبض بالحياة والمعنى"}
                    </motion.h2>

                    {/* accent line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.6 }}
                        className="h-[2px] bg-[var(--primary)] opacity-50  mt-6 rounded-full"
                    />
                </div>

                {/* CONTENT */}
                <div className="space-y-10 text-right">

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-[var(--accent)] text-sm sm:text-base lg:text-lg leading-[2.2] max-w-5xl"
                    >
                        {aboutSection?.about_section_description ||
                            `بدأت رحلتنا من شغف عميق بالفن، وإيمان بأن الجدران ليست مجرد حدود للمكان،
                            بل مساحة قادرة على التعبير عن الهوية والمشاعر. هذا الإيمان كان البداية الحقيقية
                            لكل ما وصلنا إليه اليوم.`}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[var(--accent)] text-sm sm:text-base lg:text-lg leading-[2.2] max-w-5xl"
                    >
                        مع الوقت، لم نعد نرى الفن كقطعة تُعلّق فقط، بل كتجربة متكاملة تُعيد تشكيل
                        الإحساس بالمكان. كل لوحة نختارها تمر بعملية دقيقة من الانتقاء،
                        ليس فقط لجمالها، بل لما تحمله من روح ورسالة.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[var(--accent)] text-sm sm:text-base lg:text-lg leading-[2.2] max-w-5xl"
                    >
                        اليوم، أصبح هدفنا أوسع من مجرد تقديم أعمال فنية…
                        نحن نبني هوية بصرية للمساحات، ونساعد عملاءنا على تحويل منازلهم
                        ومكاتبهم إلى أماكن تعكس شخصيتهم الفريدة.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[var(--accent)] text-sm sm:text-base lg:text-lg leading-[2.2] max-w-5xl"
                    >
                        نحن نؤمن أن الفن الحقيقي لا يُشاهد فقط…
                        بل يُحَس، ويُعاش، ويبقى في الذاكرة.
                        وهذا هو ما نسعى لتقديمه في كل تجربة نخلقها.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}