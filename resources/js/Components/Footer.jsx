import {
    FaFacebookF,
    FaInstagram,
    FaPinterestP,
    FaTiktok,
    FaXTwitter,
} from "react-icons/fa6";
import ApplicationLogo from "./ApplicationLogo";
import {
    FiInstagram,
    FiFacebook,
    FiTwitter,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Footer() {
    const { footer } = usePage().props;
    const socialConfig = {
        instagram: FaInstagram,
        facebook: FaFacebookF,
        pinterest: FaPinterestP,
        tiktok: FaTiktok,
        x: FaXTwitter, //
    };
    const socialLinks = Object.entries(socialConfig)
        .map(([key, Icon]) => ({
            key,
            icon: Icon,
            link: footer?.[key],
        }))
        .filter((item) => item.link && item.link.trim() !== "");

    const { errors: serverErrors } = usePage().props;

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const validate = () => {
        let err = "";

        if (!email.trim()) {
            err = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            err = "البريد الإلكتروني غير صحيح";
        }

        setError(err);

        return !err;
    };

    const subscribe = () => {
        if (!validate()) return;

        setLoading(true);
        setError("");

        router.post(
            route("newsletter.subscribe"),
            {
                email,
            },
            {
                onSuccess: () => {
                    setEmail("");

                    toast.success("تم الاشتراك بنجاح 💌", {
                        style: {
                            background: "#1f1f1f",
                            color: "#fff",
                            borderRadius: "12px",
                        },
                    });
                },

                onError: (errors) => {
                    if (errors.email) {
                        setError(errors.email);
                    } else {
                        setError("حدث خطأ غير متوقع");
                    }

                    toast.error("فشل الاشتراك ❌");
                },

                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };
    return (
        <footer className="bg-[#1d1916] opacity-90 text-white">
            {/* Top */}
            <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-18 xl:px-28 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <ApplicationLogo className="h-28 w-auto" />

                        <p className="mt-2 text-gray-400 leading-8 max-w-md">
                            {footer?.description ||
                                `  نقدم مجموعة مميزة من اللوحات الفنية والتابلوهات
                            العصرية المصممة بعناية لتضيف لمسة من الأناقة
                            والجمال إلى منزلك أو مكان عملك.`}
                        </p>

                        {/* Social */}
                        <div className="flex gap-4 mt-8">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                    w-11 h-11 rounded-full
                    border border-white/10
                    flex items-center justify-center
                    text-gray-300
                    hover:bg-[var(--primary)]
                    hover:text-white
                    hover:border-[var(--primary)]
                    transition-all duration-300
                "
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">المتجر</h3>

                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-white transition"
                                >
                                    الرئيسية
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/shop"
                                    className="hover:text-white transition"
                                >
                                    جميع المنتجات
                                </a>
                            </li>

                            {/* <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    المدونة
                                </a>
                            </li> */}

                            <li>
                                <a
                                    href="/about-us"
                                    className="hover:text-white transition"
                                >
                                    من نحن
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact-us"
                                    className="hover:text-white transition"
                                >
                                    اتصل بنا
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">الدعم</h3>

                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    سياسة الخصوصية
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    الشروط والأحكام
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    الشحن والتوصيل
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    الأسئلة الشائعة
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>

                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-center gap-3">
                                <FiMail />
                                <span>
                                    {footer?.email || "info@artgate.com"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiPhone />
                                <span>
                                    {footer?.phone || "+20 100 000 0000"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiMapPin />
                                <span>{footer?.address || "القاهرة، مصر"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div
                    className="
                        mt-12
                        p-6
                        rounded-3xl
                        bg-white/5
                        border
                        border-white/10
                    "
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                اشترك في نشرتنا البريدية
                            </h3>

                            <p className="text-gray-400">
                                احصل على أحدث العروض والتصاميم الجديدة أولاً.
                            </p>
                        </div>

                        <div
                            className=" flex
    flex-col
    sm:flex-row

    w-full
    lg:w-auto

    gap-3"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="البريد الإلكتروني"
                                className="
                                    w-full

                                  sm:min-w-[280px]
                                    px-5
                                    py-4
                                    rounded-full
                                    bg-white/10
                                    border
                                    border-white/10
                                    text-white
                                    placeholder:text-gray-500
                                    border-none 
                outline-none
                transition-all

                focus:ring-1 focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
                                    transition
                                "
                            />

                            <button
                                onClick={subscribe}
                                disabled={loading}
                                className="
        px-8 py-4 rounded-full
        bg-[var(--primary)]
        text-white
        hover:scale-105 transition
        disabled:opacity-50
    "
                            >
                                {loading ? "جارٍ الاشتراك..." : "اشتراك"}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}

                    {serverErrors?.email && (
                        <p className="text-red-400 text-sm mt-2">
                            {serverErrors.email}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10">
                <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-18 xl:px-28 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Art Gate. جميع الحقوق
                            محفوظة.
                        </p>

                        <div className="flex gap-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-white">
                                الخصوصية
                            </a>

                            <a href="#" className="hover:text-white">
                                الشروط
                            </a>

                            <a href="#" className="hover:text-white">
                                ملفات الارتباط
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
