import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";

export default function ContactMap({map}) {
    return (
        <section
            dir="rtl"
            className="py-8 lg:py-12 "
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                <div className="text-center mb-12">

                    {/* <p className="text-[var(--primary)] tracking-[0.3em] text-sm uppercase">
                        Location
                    </p> */}

                    <h2 className="mt-3 text-4xl font-bold text-[var(--text-dark)]">
                        موقعنا
                    </h2>

                    <div className="w-20 h-[2px] bg-[var(--primary)] mx-auto mt-5" />
                </div>

                <motion.a
                    href={map?.link || "https://maps.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                        y: -4,
                    }}
                    className="
                        relative
                        block
                        overflow-hidden
                        rounded-[48px]
                        group
                    "
                >
                    <img
                        src={map?.image || "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop"}
                        alt=""
                        className="
                            w-full
                            h-[500px]
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-105
                        "
                    />

                    <div className="absolute inset-0 bg-black/35" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="
                                bg-white
                                rounded-full
                                px-8
                                h-14
                                flex
                                items-center
                                gap-3
                                shadow-xl
                            "
                        >
                            <FiMapPin />

                            <span>
                                عرض الموقع على الخريطة
                            </span>
                        </div>
                    </div>
                </motion.a>
            </div>
        </section>
        
    );
}