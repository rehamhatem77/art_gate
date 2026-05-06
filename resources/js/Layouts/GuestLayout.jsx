import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { MdFormatQuote } from "react-icons/md";

export default function GuestLayout({ children }) {
    return (
        <div
            dir="rtl"
            className="min-h-screen flex items-center justify-center p-4 md:p-4"
        >
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 bg-[var(--bg-light)] border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="hidden lg:block lg:col-span-7 relative overflow-hidden order-2">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZsHU7Zga5rau5iKfgJXqA3nu2I5IAZHst-CcXVqUYdqJMaq_wmE7i2Pe7tY5Idan7I97ds0sgEgKTqctpfiON06h2k5_nCZ1vR-vVimg699YJx_4axjO_Bnl0KVBjBIoHpopzmLfBJnm1Rb1AfMK4Iub3emTkM1o9Rhbl8aHQo7owH5bjY2ysEF2wqRuSnCAj8Rsl3WKzgMhR-1eFN49lVaGtwOchctdasaaWu2XAD4vVJZ_Dono5rnC6d1TPFhwevgMMVHQ"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-black/30 to-black/60" />

                    <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
                        <div className="max-w-xl">
                            {/* <span className="text-5xl opacity-80">“</span> */}
                            <MdFormatQuote className="text-6xl mb-4 opacity-80" />

                            <p className="text-5xl leading-tight font-serif mb-6 font-bold ">
                                "إن الفن يغسل عن الروح غبار الحياة اليومية"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-px w-10 bg-white/50"></div>
                                <span className="text-lg opacity-80">
                                    — بابلو بيكاسو
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Logo */}
                    {/* <div className="absolute top-2 right-2 flex items-center gap-3 text-white">
                        <Link href="/"> <ApplicationLogo className=" mx-auto " /> </Link>
                    </div> */}
                </div>

                <div className="relative lg:col-span-5 flex items-center justify-center px-6 py-12 lg:px-16 bg-[var(--bg-light)] order-1">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 ">
                        <Link href="/">
                            <ApplicationLogo className="h-28 w-28" />
                        </Link>
                    </div>
                    <div className="w-full max-w-md mt-16">{children}</div>
                </div>
            </div>
        </div>
    );
}
