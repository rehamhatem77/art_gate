import { motion } from "framer-motion";
import {
    FiTruck,
    FiPhoneCall,
    FiCreditCard,
    FiPlay,
} from "react-icons/fi";

const services = [
    {
        title: "شحن مجاني",
        description: "شحن مجاني للطلبات فوق 999 جنيه. احصل على خصمك الآن",
        icon: FiTruck,
    },
    {
        title: "خدمة 24 ساعة",
        description: "خدمة عملاء 24 ساعة. تواصل معنا في أي وقت",
        icon: FiPhoneCall,
    },
    {
        title: "سهولة الدفع",
        description: "دفع آمن وخيارات دفع متعددة لسهولة الشراء",
        icon: FiCreditCard,
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function AboutSection() {
    return (
        <section className="py-12 lg:py-20 overflow-hidden">
            <div className="max-w-8xl mx-auto px-8 sm:px-12 md:px-12 lg:px-18 xl:px-28">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Image / Video */}
                    <motion.div
                        className="order-1"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-[24px] shadow-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000"
                                alt="Art Collection"
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    group-hover:scale-105
                                "
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Play Button */}
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="
                                    absolute
                                    inset-0
                                    m-auto
                                    w-20
                                    h-20
                                    rounded-full
                                    bg-white/20
                                    backdrop-blur-sm
                                    border
                                    border-white/50
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <FiPlay
                                    size={34}
                                    className="text-white ml-1"
                                />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="order-2 flex flex-col justify-center"
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-[var(--text-dark)] text-2xl font-medium mb-3"
                        >
                            فن ينبض على جدرانك
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                            }}
                            className="
                                text-3xl
                                md:text-4xl
                                lg:text-5xl
                                font-bold
                                text-[var(--primary)]
                                leading-tight
                                mb-6
                            "
                        >
                            مرحباً بكم في أرض الإبداع!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                            className="
                                text-[var(--text-dark)]
                                text-base
                                md:text-lg
                                leading-9
                                mb-10
                            "
                        >
                            مرحباً بكم في عالم الإبداع والتميز، نحن نفخر بتقديم
                            مجموعة فريدة من الأعمال الفنية والتصميمات الراقية
                            التي ستجعل منزلك أكثر جمالاً وأناقة. سواء كنت تبحث
                            عن تحفة فنية لتزيين جدران منزلك أو تصميمات تابلوهات
                            مميزة، فإننا هنا لتحقيق طموحاتك. استمتع بتجربة تسوق
                            فريدة واستمتع بجمال الفن في كل قطعة نقدمها.
                        </motion.p>

                        {/* Services */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{
                                once: false,
                                amount: 0.2,
                            }}
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-3
                                gap-6
                                lg:gap-8
                            "
                        >
                            {services.map((service, index) => {
                                const Icon = service.icon;

                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                       
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <motion.div
                                              
                                            >
                                                <Icon
                                                    size={52}
                                                    className="text-[var(--secondary)]"
                                                />
                                            </motion.div>
                                        </div>

                                        <h3
                                            className="
                                                text-xl
                                                font-semibold
                                                text-[var(--secondary)]
                                                mb-3
                                            "
                                        >
                                            {service.title}
                                        </h3>

                                        <p
                                            className="
                                                text-[var(--text-dark)]
                                                leading-7
                                                text-sm
                                                md:text-base
                                            "
                                        >
                                            {service.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}