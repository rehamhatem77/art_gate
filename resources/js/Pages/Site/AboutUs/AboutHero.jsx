import { motion } from "framer-motion";

export default function AboutHero() {
    return (
        <section
            dir="rtl"
            className="relative  overflow-hidden "
        >
         
            <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4 }}
                    className="relative  lg:h-screen overflow-hidden"
                >
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQr0W8VsfMUJ8Euj0ApeM9A7PfaVEutdczkRiG2kFvBZmppYutaC15aSfUG_DJSQ_KQneWppB4dtf8-jvJh7JPgwZseq2lRZmhDyDb3EmDsbUoNblADCi0quPxjBjVCpuslcirKzXOKyAPWl557ss1gVujwCHNr0XPRdn-nX09XdDpe1SSS22mafRxE0rYpyh3OwUs9zcREp6yW-T2iAvfCtHCiCDntglROmFdhdeki9o7GaTMGp-_HHM1RRlgG1Lv5QBBCQI"
                        alt="Premium interior with abstract art"
                        className="w-full h-full object-cover"
                    />


                    
                </motion.div>



                {/* Content Side */}
                <div className="flex items-center justify-center px-8 lg:px-20 py-8 lg:py-0 relative">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-[2px]  mb-8"
                        />

                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="block text-[#b89b72] tracking-[0.25em] text-sm mb-4"
                        >
                            بوابة الفن
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                            }}
                            className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#1f1f1f] leading-[1.3] mb-8"
                        >
                            رحلة في عالم
                            <span className="block text-[#b89b72] mt-2">
                                الإبداع الفني الفاخر
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-600 text-lg leading-loose mb-6"
                        >
                            مرحبًا بكم في بوابة الفن، وجهتكم الحصرية للوحات
                            الفنية الراقية. نؤمن بأن الفن ليس مجرد عنصر
                            ديكوري، بل تجربة بصرية تُثري المساحات وتمنحها
                            شخصية استثنائية تعكس الذوق الرفيع.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="text-gray-600 text-lg leading-loose"
                        >
                            نختار أعمالنا بعناية فائقة لنقدم لكم مجموعة فريدة
                            تجمع بين الجودة العالية، والحرفية المتقنة، والرؤية
                            الفنية الملهمة التي تحول كل مساحة إلى معرض ينبض
                            بالجمال.
                        </motion.p>

                        {/* <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                            className="mt-10 flex items-center gap-6"
                        >
                            <div>
                                <h3 className="text-3xl font-bold text-[#b89b72]">
                                    +500
                                </h3>
                                <p className="text-sm text-gray-500">
                                    عمل فني مميز
                                </p>
                            </div>

                            <div className="w-px h-12 bg-gray-300" />

                            <div>
                                <h3 className="text-3xl font-bold text-[#b89b72]">
                                    +100
                                </h3>
                                <p className="text-sm text-gray-500">
                                    فنان ومصمم
                                </p>
                            </div>
                        </motion.div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}