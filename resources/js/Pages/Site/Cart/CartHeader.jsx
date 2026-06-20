import { motion } from "framer-motion";
import { FiShoppingCart, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { router } from "@inertiajs/react";

export default function CartHeader({ currentStep}) {

    const steps = [
        {
            title: "السلة",
            icon: FiShoppingCart,
            active: currentStep === 1,
            route: "cart.index",
        },
        {
            title: "الطلب",
            icon: FiCreditCard,
            active: currentStep === 2,
            route: "checkout.index",
        },
        {
            title: "التأكيد",
            icon: FiCheckCircle,
            active: currentStep === 3,
            route: null,
        },
    ];

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative h-[420px] overflow-hidden">
                {/* IMAGE */}
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkuqPNq5vPIIH2Xr3V8WH1R6XrAX4goXHenpY4XLZUOCWMfSdMp-eH8eq9lHJdCkF3JlA6_03XCKSrl8CfvfET6c7RtYWwjnqbwHJn6Ul_nI2rQX-MSOApLfeT5DpQ2qoJICCK5fEcuz6XilxoWLU8ORJ3nfL6J55I2oJ-vhFAyztUkxAadCHKGP48-flmoBj_rbhgoyro8dpahHl724Bb8XvBdR_B5dhJiloVQ2l_42D91Ruxcpn9YBzGxIynlH7aiaFtjZk"
                    alt="Cart"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                />

                {/* OVERLAY */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-black/55"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"
                />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1
                            className="
                                text-white
                                text-4xl
                                md:text-7xl
                                font-light
                                tracking-wide
                                mb-5
                            "
                        >
                            سلة التسوق
                        </h1>

                        <p
                            className="
                                text-white/80
                                max-w-2xl
                                mx-auto
                                text-sm
                                md:text-lg
                                mb-6
                            "
                        >
                            راجع المنتجات المختارة قبل إتمام عملية الشراء
                        </p>

                        {/* BREADCRUMB */}
                        <div className="flex items-center justify-center gap-3 text-white/90 text-sm md:text-base">
                            <span
                                onClick={() => router.visit("/")}
                                className="cursor-pointer text-white/70 hover:text-white transition"
                            >
                                الرئيسية
                            </span>

                            <span>/</span>

                            <span className="font-medium text-[var(--primary)]">
                                سلة التسوق
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= STEPS CARD ================= */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, amount: 0.2 }}
                className="relative z-20 -mt-14 md:-mt-16 mb-14 px-4"
            >
                <div
                    className="
                        max-w-5xl
                        mx-auto
                        bg-white
                        rounded-[30px]
                        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                        border
                        border-gray-100
                        p-6
                        md:p-8
                    "
                >
                    <div className="flex justify-center">
                        <div className="flex
    flex-wrap

    justify-center

    items-center

    gap-4

    md:gap-8

    w-full
    ">
                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className="flex items-center min-w-0"
                                    >
                                        <motion.button
                                            onClick={() => {
                                                if (step.route==='cart.index') {
                                                    router.visit(
                                                        route(step.route),
                                                    );
                                                }
                                            }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.5 + index * 0.1,
                                            }}
                                            className="flex flex-col items-center"
                                        >
                                            <div
                                                className={`
                                                    w-14 h-14
                                                    md:w-16 md:h-16
                                                    rounded-2xl
                                                    flex items-center justify-center
                                                    transition-all
                                                    ${
                                                        step.active
                                                            ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                                                            : "bg-gray-100 text-gray-400"
                                                    }
                                                `}
                                            >
                                                <Icon size={24} />
                                            </div>

                                            <span
                                                className={`
                                                    mt-3
                                                    text-sm
                                                    md:text-base
                                                    font-medium
                                                    ${
                                                        step.active
                                                            ? "text-[var(--primary)]"
                                                            : "text-gray-500"
                                                    }
                                                `}
                                            >
                                                {step.title}
                                            </span>
                                        </motion.button>

                                        {/* connector */}
                                        {index < steps.length - 1 && (
                                            <div className=" w-6 sm:w-10 md:w-24 h-[2px] bg-gray-200 mx-1 sm:mx-3 md:mx-6">
                                                <div className="h-full w-full bg-[var(--primary)]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
