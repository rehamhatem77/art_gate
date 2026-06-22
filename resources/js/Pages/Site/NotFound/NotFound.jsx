import SiteLayout from "@/Layouts/SiteLayout";
import { motion } from "framer-motion";
import { router } from "@inertiajs/react";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound({ announcement }) {
    return (
        <SiteLayout title="404" announcement={announcement}>
            <section
                dir="rtl"
                className="
        relative
        overflow-hidden
        flex
        items-center
        justify-center
       min-h-[750px]
       h-[80vh]
    "
            >
                {/* Background */}
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                    }}
                    className="
        absolute
        inset-0
        h-full
        w-full
    "
                >
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQr0W8VsfMUJ8Euj0ApeM9A7PfaVEutdczkRiG2kFvBZmppYutaC15aSfUG_DJSQ_KQneWppB4dtf8-jvJh7JPgwZseq2lRZmhDyDb3EmDsbUoNblADCi0quPxjBjVCpuslcirKzXOKyAPWl557ss1gVujwCHNr0XPRdn-nX09XdDpe1SSS22mafRxE0rYpyh3OwUs9zcREp6yW-T2iAvfCtHCiCDntglROmFdhdeki9o7GaTMGp-_HHM1RRlgG1Lv5QBBCQI"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                    {/* Gold glow */}
                    <div className="absolute bottom-0 left-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-[#b89b72]/20 blur-[120px] rounded-full" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="
                            text-5xl
                            sm:text-6xl
                            md:text-8xl
                            font-bold
                            text-white
                            mb-4
                        "
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="
                            text-2xl
                            sm:text-3xl
                            md:text-5xl
                            font-bold
                            text-white
                            mb-5
                        "
                    >
                        الصفحة غير موجودة
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="
                            text-white/80
                            text-sm
                            sm:text-base
                            md:text-lg
                            leading-8
                            md:leading-9
                            max-w-2xl
                            mx-auto
                            mb-10
                        "
                    >
                        الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها،
                        لكن ما زال بإمكانك استكشاف مجموعتنا الفنية المميزة.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="
                            flex
                            flex-col
                            sm:flex-row
                            justify-center
                            gap-4
                        "
                    >
                        <button
                            onClick={() => router.get("/")}
                            className="
                                w-full
                                sm:w-auto
                                px-8
                                py-4
                                rounded-full
                                bg-white
                                text-black
                                font-semibold
                                transition
                                hover:opacity-80
                            "
                        >
                            العودة للرئيسية
                        </button>

                        <button
                            onClick={() => router.get("/shop")}
                            className="
                                w-full
                                sm:w-auto
                                px-8
                                py-4
                                rounded-full
                                border
                                border-white/30
                                text-white
                                backdrop-blur-sm
                                flex
                                items-center
                                justify-center
                                gap-3
                                transition
                                hover:bg-white/10
                            "
                        >
                            استكشف المعرض
                            <FiArrowLeft />
                        </button>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
}
