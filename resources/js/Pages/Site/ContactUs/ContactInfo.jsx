import {
    FiMail,
    FiMapPin,
    FiPhone,
} from "react-icons/fi";

import {
    FaWhatsapp,
    FaInstagram,
    FaFacebookF,
    FaPinterestP,
    FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function ContactInfo({ contactInfo }) {
    const socialConfig = {
        instagram: FaInstagram,
        facebook: FaFacebookF,
        pinterest: FaPinterestP,
        tiktok: FaTiktok,
        x: FaXTwitter, 
    };

    const socialLinks = Object.entries(socialConfig)
        .map(([key, Icon]) => ({
            icon: Icon,
            link: contactInfo?.[key],
        }))
        .filter(item => item.link);
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-gradient-to-br
                from-[#1f1f1f]
                via-[#242424]
                to-[#2b2b2b]
                p-8
                lg:p-10
                text-white
                shadow-[0_20px_60px_rgba(0,0,0,.25)]
            "
        >
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[var(--primary)]/5 rounded-full blur-3xl" />

            <div className="relative z-10">

                {/* Header */}
                {/* <span className="text-[var(--primary)] text-sm tracking-[0.3em] uppercase">
                    Contact
                </span> */}

                <h3 className="mt-3 text-3xl font-bold leading-tight">
                    {contactInfo?.title || " دعنا نتواصل"}
                </h3>

                <p className="mt-4 text-white/70 leading-8 text-sm">
                    {contactInfo?.description || ` يمكنك التواصل معنا عبر أي من القنوات التالية،
                    وسنكون سعداء بالإجابة على استفساراتك ومساعدتك
                    في اختيار العمل الفني المناسب لمساحتك.`}
                </p>

                {/* Divider */}
                <div className="w-16 h-[2px] bg-[var(--primary)] mt-8 rounded-full" />

                {/* Contact Items */}
                <div className="space-y-4 mt-8">

                    <ContactInfoItem
                        icon={FiPhone}
                        title="الهاتف"
                        value={contactInfo?.phone || "+20 100 000 0000"}
                        href={`tel:${contactInfo?.phone || "+201000000000"}`}
                    />

                    <ContactInfoItem
                        icon={FiMail}
                        title="البريد الإلكتروني"
                        value={contactInfo?.email || "info@artgate.com"}
                        href={`mailto:${contactInfo?.email || "info@artgate.com"}`}
                    />

                    <ContactInfoItem
                        icon={FaWhatsapp}
                        title="واتساب"
                        value={contactInfo?.whatsapp || "+20 100 000 0000"}
                        href={`https://wa.me/${contactInfo?.whatsapp?.replace(/\D/g, "") || "201000000000"}`}
                    />

                    <ContactInfoItem
                        icon={FiMapPin}
                        title="العنوان"
                        value={contactInfo?.address || "القاهرة، مصر"}
                    />
                </div>

                {/* Social */}
                <div className="mt-10 pt-8 border-t border-white/10">

                    <p className="text-white/60 text-sm mb-5">
                        تابعنا على منصات التواصل
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;

                            return (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="
                    w-11 h-11 rounded-full
                    bg-white/10 border border-white/10
                    flex items-center justify-center
                    hover:bg-[var(--primary)]
                    hover:border-[var(--primary)]
                    transition-all duration-300
                "
                                >
                                    <Icon className="text-sm" />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Quote */}
                <div className="mt-10">
                    <p className="text-white/40 text-xs tracking-wider">
                        الفن يبدأ بحوار، ونحن هنا للاستماع.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}


import { FiArrowUpLeft } from "react-icons/fi";

function ContactInfoItem({
    icon: Icon,
    title,
    value,
    href = null,
}) {
    const ItemContent = (
        <motion.div
            whileHover={{
                x: -4,
            }}
            transition={{
                duration: 0.25,
            }}
            className="
                group
                flex
                items-start
                gap-4
                p-5
                rounded-2xl
                bg-white/5
                border
                border-white/10
                hover:border-[var(--primary)]/40
                hover:bg-white/[0.07]
                transition-all
                duration-300
            "
        >
            {/* Icon */}
            <div
                className="
                    w-12
                    h-12
                    rounded-xl
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition-all
                    duration-300
                    group-hover:bg-[var(--primary)]/15
                "
            >
                <Icon
                    className="
                        text-[var(--primary)]
                        text-xl
                    "
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p
                    className="
                        text-xs
                        text-white/50
                        mb-1
                        tracking-wide
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        text-white
                        leading-relaxed
                        text-sm
                        md:text-base
                        break-words
                    "
                >
                    {value}
                </p>
            </div>

            {href && (
                <div
                    className="
                        opacity-0
                        translate-x-2
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                        duration-300
                    "
                >
                    <FiArrowUpLeft
                        className="
                            text-[var(--primary)]
                            text-lg
                        "
                    />
                </div>
            )}
        </motion.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {ItemContent}
            </a>
        );
    }

    return ItemContent;
}