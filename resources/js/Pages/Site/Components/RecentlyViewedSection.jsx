import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { button } from "framer-motion/client";

export default function RecentlyViewedSection({ recentProducts = [] }) {
    return (
        <section className="pt-18 pb-20 lg:pt-22 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <p className="text-[#9f9f9f] text-sm md:text-base mb-2">
                        منتجات أعجبت بها
                    </p>

                    <h2
                        className="
                            text-3xl
                            md:text-4xl
                            font-normal
                            text-[var(--primary)]
                        "
                    >
                        منتجات شاهدتها مؤخراً
                    </h2>

                    <div className="w-[200px] max-w-full h-px bg-[#d8d8d8] mx-auto mt-2" />
                </motion.div>

                {/* Products */}
                {recentProducts?.length > 0 ? (

                    <div

                        className="
        flex
        flex-col
        lg:flex-row
        justify-center
        items-stretch
        gap-6
        lg:gap-12
        px-0
        sm:px-4
        lg:px-8
    "
                    >

                        {recentProducts?.map((product, index) => (
                            <button

                                onClick={() => {
                                    router.visit(
                                        route(
                                            "shop.product.show",
                                            product.slug
                                        )
                                    )
                                }}
                            >
                                <motion.div
                                    key={product.id}

                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.15,
                                    }}
                                    className="
                                 flex
    flex-row-reverse
    items-center
    gap-4
    sm:gap-5
    group
    cursor-pointer
    w-full
    max-w-full
    lg:max-w-[360px]
                            "
                                >


                                    {/* TEXT LEFT */}
                                    <div className="text-right flex-1 min-w-0">
                                        <h3
                                            className="
        text-[16px]
        sm:text-[18px]
        leading-7
        sm:leading-9
        font-normal
        text-[#1d1d1d]
        transition-colors
        duration-300
        line-clamp-2
    "
                                        >
                                            {product.name}
                                        </h3>

                                        <div
                                            className="
                                        mt-3

                                        text-[18px]
                                        font-semibold

                                        text-[var(--primary)]
                                    "
                                        >
                                            {product.price} جنيه
                                        </div>
                                    </div>
                                    {/* IMAGE RIGHT */}
                                    <div className="relative shrink-0">
                                        <img
                                            src={`/storage/${product.image}`}

                                            alt={product.name}
                                            className="
    w-[100px]
    h-[100px]
    sm:w-[120px]
    sm:h-[120px]
    lg:w-[140px]
    lg:h-[140px]
    object-cover
    rounded-md
    transition-transform
    duration-500
    group-hover:scale-105
"
                                        />

                                        <div
                                            className="
                                        absolute
                                        top-2
                                        right-2

                                        bg-[var(--primary)]
                                        opacity-90
                                        text-white

                                        text-xs

                                        px-2
                                        py-1

                                        rounded-md
                                    "
                                        >
                                            كود المنتج: {product.code}
                                        </div>
                                    </div>
                                </motion.div></button>
                        ))}
                    </div>
                ) : (
                    <p className=" text-gray-500 text-center">
                        لا يوجد منتجات تم عرضها بعد
                    </p>
                )}
            </div>
        </section>
    );
}