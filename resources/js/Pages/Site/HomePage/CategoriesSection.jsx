import { motion } from "framer-motion";



const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function CategoriesSection({ categories }) {
    return (
        <section className="py-8 lg:py-12 bg-[#faf8f5] overflow-hidden">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 md:px-12 lg:px-18 xl:px-28">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="block text-[#b4a79a] text-sm md:text-lg font-medium mb-3">
                        استمتع بتصفح مرن لاستكشاف أقسام موقعنا بسهولة
                    </span>

                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-5">
                        استعرض فهرس معرضنا
                    </h2>

                    <p className="text-[var(--text-dark)] max-w-3xl mx-auto leading-8">
                        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
                        لصفحة ما سيلهي القارئ.
                    </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: false,
                        amount: 0.15,
                    }}
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-y-8
                        lg:gap-y-10
                        gap-x-4
                        lg:gap-x-6
                    "
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}

                            className="
                                group
                                flex
                                justify-center
                            "
                        >
                            <button
                                className="
                                    relative

                                    w-[190px]
                                    h-[190px]

                                    sm:w-[200px]
                                    sm:h-[200px]

                                    lg:w-[240px]
                                    lg:h-[240px]

                                    rounded-full
                                    overflow-hidden

                                    cursor-pointer
                                "
                            >
                                {/* Image Wrapper */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        rounded-full
                                        overflow-hidden
                                    "
                                >
                                    <img
                                        src={`storage/${category.image}`}
                                        alt={category.name}
                                        className="
                                            w-full
                                            h-full
                                            object-cover

                                            transition-transform
                                            duration-700

                                            group-hover:scale-110
                                        "
                                    />
                                </div>

                                {/* Overlay */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        rounded-full

                                        bg-black/55

                                        opacity-0
                                        group-hover:opacity-100

                                        transition-all
                                        duration-500
                                    "
                                />

                                {/* Content */}
                                <div
                                    className="
        absolute
        inset-0
        z-20
        flex
        px-4
        items-center
        justify-center
    "
                                >
                                    {/* Title */}
                                    <div
                                        className="
            bg-white/95
            backdrop-blur-md
            rounded-full
            px-5 py-2
            shadow-xl
            text-xl
            font-meduim
           

            transition-all
            duration-500

            group-hover:-translate-y-3
        "
                                    >
                                        {category.name}
                                    </div>

                                    {/* Count */}
                                    <div
                                        className="
            absolute

            left-1/2
            top-1/2

            -translate-x-1/2
            translate-y-12

            text-white
            text-md
            font-medium

            opacity-0

            group-hover:opacity-100
            group-hover:translate-y-8

            transition-all
            duration-500
        "
                                    >
                                        {category.products_count} منتج
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}