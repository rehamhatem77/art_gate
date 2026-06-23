import { iconsMap } from "@/Components/IconPicker";
import { motion } from "framer-motion";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { FiPlay, FiX } from "react-icons/fi";
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
function getYouTubeId(url) {
    if (!url) return "";

    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/
    );

    return match ? match[1] : "";
}
export default function AboutSection({ services, aboutSection }) {
const [openVideo, setOpenVideo] = useState(false);

const videoId = getYouTubeId(
    aboutSection?.about_section_video
);
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
    <div
        className="
            relative
            h-[280px]
            sm:h-[320px]
            md:h-[380px]
            lg:h-[420px]
            overflow-hidden
            rounded-[24px]
            shadow-lg
            group
        "
    >
        {/* IMAGE */}

        <img
            src={
                aboutSection?.about_section_image
                    ? `/storage/${aboutSection.about_section_image}`
                    : "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000"
            }
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

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/30" />

        {/* PLAY BUTTON */}

        {videoId && (
            <motion.button
                onClick={() => setOpenVideo(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="
                    absolute
                    inset-0
                    m-auto

                    w-20
                    h-20

                    rounded-full

                    bg-white/20

                    backdrop-blur-md

                    border

                    border-white/50

                    flex

                    items-center

                    justify-center

                    shadow-xl
                "
            >
                <FiPlay
                    size={34}
                    className="text-white ml-1"
                />
            </motion.button>
        )}
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
                            {aboutSection?.about_section_subtitle ||
                                "فن ينبض على جدرانك"}
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
                            {aboutSection?.about_section_title ||
                                "مرحباً بكم في أرض الإبداع!"}
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
                            {aboutSection?.about_section_description ||
                                `مرحباً بكم في عالم الإبداع والتميز، نحن نفخر بتقديم
                            مجموعة فريدة من الأعمال الفنية والتصميمات الراقية
                            التي ستجعل منزلك أكثر جمالاً وأناقة. سواء كنت تبحث
                            عن تحفة فنية لتزيين جدران منزلك أو تصميمات تابلوهات
                            مميزة، فإننا هنا لتحقيق طموحاتك. استمتع بتجربة تسوق
                            فريدة واستمتع بجمال الفن في كل قطعة نقدمها.`}
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
                                const isImageIcon =
                                    service.icon && !iconsMap[service.icon];

                                const IconComponent = !isImageIcon
                                    ? iconsMap[service.icon]
                                    : null;

                                return (
                                    <motion.div
                                        key={service.id || index}
                                        variants={itemVariants}
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <motion.div>
                                                {/* ICON RENDER FIX */}
                                                {IconComponent ? (
                                                    <IconComponent
                                                        size={52}
                                                        className="text-[var(--secondary)]"
                                                    />
                                                ) : isImageIcon ? (
                                                    <img
                                                        src={getImage(
                                                            service.icon,
                                                        )}
                                                        alt={service.name}
                                                        className="w-14 h-14 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-full bg-gray-200" />
                                                )}
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
                                            {service.name}
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
<AnimatePresence>
    {openVideo && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenVideo(false)}
            className="
                fixed
                inset-0
                z-[9999]

                bg-black/95

                flex

                items-center

                justify-center

                p-4
            "
        >
            <button
                onClick={() => setOpenVideo(false)}
                className="
                    absolute

                    top-6

                    right-6

                    text-white

                    text-4xl
                "
            >
                <FiX />
            </button>

            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full

                    max-w-5xl

                    aspect-video
                "
            >
                <iframe
                    className="
                        w-full

                        h-full

                        rounded-2xl
                    "
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="About Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </motion.div>
        </motion.div>
    )}
</AnimatePresence>
        </section>
    );
}
