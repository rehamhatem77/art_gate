import { getImage } from "@/Utils/GetImage";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function AboutHero({hero}) {
    return (
        <section
            dir="rtl"
            className="relative w-full lg:h-[85vh] h-auto overflow-hidden"
        >
            <div className="grid lg:grid-cols-2 h-full">

                {/* IMAGE SIDE */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1.2 }}
                    className="relative w-full h-[42vh] sm:h-[50vh] lg:h-full overflow-hidden"
                >
                    <img
                        src={hero?.image? getImage(hero.image):"https://lh3.googleusercontent.com/aida-public/AB6AXuCQr0W8VsfMUJ8Euj0ApeM9A7PfaVEutdczkRiG2kFvBZmppYutaC15aSfUG_DJSQ_KQneWppB4dtf8-jvJh7JPgwZseq2lRZmhDyDb3EmDsbUoNblADCi0quPxjBjVCpuslcirKzXOKyAPWl557ss1gVujwCHNr0XPRdn-nX09XdDpe1SSS22mafRxE0rYpyh3OwUs9zcREp6yW-T2iAvfCtHCiCDntglROmFdhdeki9o7GaTMGp-_HHM1RRlgG1Lv5QBBCQI"}
                        alt={hero?.title? hero.title :"Premium interior with abstract art"}
                        className="w-full h-full object-cover scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/65 via-black/25 to-transparent" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#b89b72]/20 blur-3xl rounded-full" />
                </motion.div>

                {/* CONTENT SIDE */}
                <div className="flex items-center justify-center px-6 sm:px-10 lg:px-24 py-10 lg:py-0 relative">

                    <div className="max-w-2xl w-full">

                        {/* BREADCRUMB */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between mb-5"
                        >
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                                <button
                                    onClick={() => router.visit(route("home"))}
                                    className="hover:text-[#b89b72] transition"
                                >
                                    الرئيسية
                                </button>

                                <span className="text-gray-300">/</span>

                                <span className="text-[var(--primary)] font-medium">
                                    من نحن
                                </span>
                            </div>
                        </motion.div>

                        {/* DIVIDER */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.7 }}
                            className="h-[2px] bg-[var(--primary)] opacity-70 mb-10 rounded-full"
                        />

                        {/* TITLE */}
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-[var(--text-dark)] leading-[1.15] mb-6"
                        >
                          { hero?.title? hero.title:"رحلة في عالم"}
                            <span className="block text-[var(--primary)] mt-2">
                              {hero?.subtitle?hero.subtitle: "الإبداع الفني الفاخر"}
                            </span>
                        </motion.h1>

                        {hero?.description?(
                              <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.6 }}
                            className="text-gray-600 text-sm sm:text-base leading-[1.9] mb-5"
                        >
                        {hero.description}
                        </motion.p>

                        ):
                        (

                        <>

                        {/* PARAGRAPH 1 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.6 }}
                            className="text-gray-600 text-sm sm:text-base leading-[1.9] mb-5"
                        >
                            نحن أكثر من مجرد متجر للوحات الفنية — نحن منصة تُعيد تعريف العلاقة بين الإنسان والمساحة من حوله.
                            نؤمن أن كل جدار يحمل فرصة ليصبح لوحة تعبّر عن الذوق، الهوية، والمشاعر.
                        </motion.p>

                        {/* PARAGRAPH 2 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-600 text-sm sm:text-base leading-[1.9] mb-5"
                        >
                            نختار أعمالنا الفنية بعناية شديدة، ليس فقط لجمالها البصري،
                            ولكن لقيمتها الإبداعية وقدرتها على تحويل أي مساحة إلى تجربة بصرية متكاملة.
                        </motion.p>

                        {/* PARAGRAPH 3 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-600 text-sm sm:text-base leading-[1.9] mb-5"
                        >
                            من اللوحات الحديثة إلى التصاميم الكلاسيكية، ومن الفن التجريدي إلى الإسلامي —
                            نقدم مجموعة متنوعة تناسب مختلف الأذواق والمساحات، مع الحفاظ على مستوى عالٍ من الجودة.
                        </motion.p>

                        {/* PARAGRAPH 4 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-600 text-sm sm:text-base leading-[1.9]"
                        >
                            هدفنا ليس البيع فقط، بل خلق تجربة فنية تعيش داخل كل منزل،
                            وتبقى جزءًا من يوميات الناس، تعكس ذوقهم وتضيف لمسة من الجمال لكل لحظة.
                        </motion.p>
</>
)}
                        {/* FOOTER ACCENT */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false, amount: 0.6 }}
                            transition={{ duration: 0.8 }}
                            className="mt-8 flex items-center gap-3"
                        >
                            <div className="w-10 h-[2px] bg-[var(--primary)] opacity-70" />
                            <p className="text-xs text-gray-400 tracking-wider">
                               {hero?.footer? hero.footer:"فن يُصنع ليعيش معك — وليس ليُعلّق فقط"}
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}