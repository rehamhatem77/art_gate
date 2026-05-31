import ApplicationLogo from "./ApplicationLogo";
import {
    FiInstagram,
    FiFacebook,
    FiTwitter,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-[#1d1916] opacity-90 text-white">
            {/* Top */}
            <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-18 xl:px-28 py-12">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <ApplicationLogo className="h-28 w-auto" />

                        <p className="mt-2 text-gray-400 leading-8 max-w-md">
                            نقدم مجموعة مميزة من اللوحات الفنية والتابلوهات
                            العصرية المصممة بعناية لتضيف لمسة من الأناقة
                            والجمال إلى منزلك أو مكان عملك.
                        </p>

                        {/* Social */}
                        <div className="flex gap-4 mt-8">
                            {[FiInstagram, FiFacebook, FiTwitter].map(
                                (Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="
                                            w-11
                                            h-11
                                            rounded-full
                                            border
                                            border-white/10
                                            flex
                                            items-center
                                            justify-center
                                            text-gray-300
                                            hover:bg-[var(--primary)]
                                            hover:text-white
                                            hover:border-[var(--primary)]
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        <Icon size={18} />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            المتجر
                        </h3>

                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    الرئيسية
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    جميع المنتجات
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    المدونة
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    من نحن
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    اتصل بنا
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">
                            الدعم
                        </h3>

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
                        <h3 className="font-bold text-lg mb-4">
                            تواصل معنا
                        </h3>

                        <div className="space-y-3 text-gray-400">

                            <div className="flex items-center gap-3">
                                <FiMail />
                                <span>info@artgate.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiPhone />
                                <span>+20 100 000 0000</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiMapPin />
                                <span>القاهرة، مصر</span>
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

                        <div className="flex w-full lg:w-auto gap-3">
                            <input
                                type="email"
                                placeholder="البريد الإلكتروني"
                                className="
                                    min-w-[280px]
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
                                className="
                                    px-8
                                    py-4
                                    rounded-full
                                    bg-[var(--primary)]
                                    text-white
                                    hover:scale-105
                                    transition
                                "
                            >
                                اشتراك
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-white/10">
                <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-18 xl:px-28 py-6">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Art Gate. جميع الحقوق محفوظة.
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