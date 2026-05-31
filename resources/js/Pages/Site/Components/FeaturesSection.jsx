import { iconsMap } from "@/Components/IconPicker";
import { getImage } from "@/Utils/GetImage";
import { motion } from "framer-motion";
import {
    FiTruck,
    FiShield,
    FiRefreshCw,
    FiThumbsUp,
} from "react-icons/fi";



export default function FeaturesSection({ services }) {
    return (
        <section className=" py-16 lg:py-20">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 md:px-12 lg:px-18 xl:px-28">

                <div className="border-y border-[#e5ddd4] py-16 lg:py-20">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">



                        {services.map((service, index) => {
                            const Icon = iconsMap[service.icon];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="text-center group"
                                >
                                    {/* Icon */}
                                    <div className="relative inline-flex mb-5">
                                        <div className="
                    absolute w-14 h-14 rounded-full
                    bg-[var(--primary)]/10
                    -bottom-2 -left-2
                    transition-all duration-300
                    group-hover:scale-110
                " />

                                        <div className="relative z-10 w-14 h-14 flex items-center justify-center">


                                            {Icon ? (
                                                <Icon
                                                    size={38}
                                                    className="text-[var(--primary)]"
                                                />
                                            ) : (

                                                <img
                                                    src={getImage(service.icon)}
                                                    alt={service.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mb-2">
                                        {service.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-7 text-gray-600 max-w-[220px] mx-auto">
                                        {service.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}