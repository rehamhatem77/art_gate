import { motion } from "framer-motion";

const viewedProducts = [
    {
        id: 1,
        name: "تابلوه كلاسيك - فاتحة الكتاب",
        price: 130,
        code: "is78",
        image:
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200",
    },
    {
        id: 2,
        name: "أضف جمالية لمكانك مع تابلوه عيادة الطبيب البيطري",
        price: 615,
        code: "vet42",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
    },
];

export default function RecentlyViewedSection() {
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
                <div
                    className="
                        flex
                        flex-col
                        lg:flex-row
                        justify-start
                        items-start
                        gap-16
                        px-8
                        lg:gap-28
                    "
                >
                    {viewedProducts.map((product, index) => (
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
                                gap-5
                                group
                                cursor-pointer
                                max-w-[360px]
                            "
                        >
                            

                            {/* TEXT LEFT */}
                            <div className="text-right">
                                <h3
                                    className="
                                        text-[18px]
                                        leading-9
                                        font-normal
                                        text-[#1d1d1d]

                                        transition-colors
                                        duration-300

                                        
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
                                    src={product.image}
                                    alt={product.name}
                                    className="
                                        w-[140px]
                                        h-[140px]
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}