import { useEffect, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";

import {
    FiShoppingCart,
    FiHeart,
    FiUser,
    FiSearch,
    FiMenu,
    FiX,
} from "react-icons/fi";

function NavLink({ active, children, onClick, mobile }) {
    return (
        <div
            onClick={onClick}
            className={`
                relative
                group
                cursor-pointer
                transition-all duration-300
                
                ${
                    mobile
                        ? `
                            w-full
                            px-4 py-3
                            rounded-2xl
                          `
                        : `
                            px-4 py-2
                            flex flex-col items-center
                          `
                }
            `}
        >

        
            <div
                className={`
                    relative
                    inline-flex
                    flex-col
                    ${
                        mobile
                            ? "items-start"
                            : "items-center"
                    }
                `}
            >

          
                <span
                    className={`
                        font-medium
                        transition-all duration-300
                        
                        ${
                            mobile
                                ? "text-base"
                                : "text-lg"
                        }

                        ${
                            active
                                ? "text-[var(--primary)]"
                                : "text-[var(--text-dark)] group-hover:text-[var(--primary)]"
                        }
                    `}
                >
                    {children}
                </span>

                <span
                    className={`
                        h-[2px]
                        w-full
                        bg-[var(--primary)]
                        rounded-full
                        origin-right
                        transition-transform duration-300 ease-out

                        ${
                            active
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                        }
                    `}
                />

            </div>
        </div>
    );
}

function NavigationMenu({ isMobile = false, onClose }) {
    const links = [
        "الرئيسية",
        "المتجر",
        "المدونة",
        "من نحن",
        "اتصل بنا",
    ];

    return (
        <div
            className={`
                flex
                ${isMobile
                    ? "flex-col gap-2 w-full"
                    : "items-center"
                }
            `}
        >
            {links.map((item, i) => (
                <NavLink
                    key={i}
                    active={i === 0}
                    mobile={isMobile}
                    onClick={onClose}
                >
                    {item}
                </NavLink>
            ))}
        </div>
    );
}

function UserIcons({ auth, mobile = false }) {
    const iconClass =
        "cursor-pointer transition-all duration-300 hover:text-[var(--primary)] hover:scale-110 active:scale-95";

    if (mobile) {
        return (
            <div className="flex items-center gap-6">
                <FiHeart size={23} className={iconClass} />

                <div className="relative">
                    <FiShoppingCart size={23} className={iconClass} />

                    <span
                        className="
                            absolute -top-2 -left-2
                            bg-[var(--primary)]
                            text-white
                            text-[10px]
                            w-5 h-5
                            rounded-full
                            flex items-center justify-center
                            animate-floating

                        "
                    >
                        0
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-5 text-gray-700">

            {auth?.user ? (
                <a href="/profile"><FiUser size={22} className={iconClass} /></a>
            ) : (
                <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <a
                        href="/login"
                        className="hover:text-[var(--primary)] transition"
                    >
                        تسجيل الدخول
                    </a>

                    <span>/</span>

                    <a
                        href="/register"
                        className="text-[var(--primary)] hover:underline"
                    >
                        التسجيل
                    </a>
                </div>
            )}

            <FiSearch size={22} className={iconClass} />

            <FiHeart size={22} className={iconClass} />

            <div className="relative">
                <FiShoppingCart size={22} className={iconClass} />

                <span
                    className="
                        absolute -top-2 -left-2
                        bg-[var(--primary)]
                        text-white
                        text-[10px]
                        w-5 h-5
                        rounded-full
                        flex items-center justify-center
                    "
                >
                    0
                </span>
            </div>
        </div>
    );
}

function Logo() {
    return (
        <ApplicationLogo
            className="
                h-16 md:h-20
                w-auto
                transition-all duration-300
            "
        />
    );
}

export default function Navbar({ auth }) {

    const [open, setOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    useEffect(() => {

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [open]);

    return (
        <>
            <header
                className={`
                    sticky top-0 z-50 w-full
                    bg-white/70 backdrop-blur-xl
                    border-b border-white/20
                    transition-all duration-300
                    
                    ${scrolled ? "shadow-lg" : ""}
                `}
                dir="rtl"
            >
                <div
                    className="
                        max-w-7xl mx-auto
                        h-[80px]
                        flex items-center justify-between
                        px-4 md:px-8 lg:px-10
                    "
                >

                    
                    <button
                        onClick={() => setOpen(true)}
                        className="
                            md:hidden
                            text-2xl
                            text-[var(--text-dark)]
                        "
                    >
                        <FiMenu />
                    </button>

                  
                    <div className="flex-1 md:flex-none flex justify-center md:justify-start">
                        <Logo />
                    </div>

                   
                    <div className="hidden md:flex flex-1 justify-center">
                        <NavigationMenu />
                    </div>

                    <div className="hidden md:flex">
                        <UserIcons auth={auth} />
                    </div>

                   
                    <div className="flex md:hidden">
                        <UserIcons mobile />
                    </div>
                </div>
            </header>

       
            <div
                className={`
        fixed inset-0 z-[9999] md:hidden
        smooth-transition

        ${open
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }
    `}
            >

            
                <div
                    onClick={() => setOpen(false)}
                    className={`
            absolute inset-0

            bg-black/35
            backdrop-blur-sm

            animate-backdrop

            transition-all duration-500

            ${open
                            ? "opacity-100"
                            : "opacity-0"
                        }
        `}
                />

           
                <div
                    className={`
            absolute top-0 right-0

            h-screen
            w-[88%]
            max-w-[370px]

            glass

            shadow-[0_10px_60px_rgba(0,0,0,0.20)]

            flex flex-col

            overflow-hidden

            ${open
                            ? "animate-drawer-open"
                            : "animate-drawer-close"
                        }
        `}
                >

               
                    <div
                        className="
                h-[85px]
                px-5

                border-b border-white/50

                flex items-center justify-between
            "
                    >

                        <div className="animate-fade-up">
                            <Logo />
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="
                    w-11 h-11

                    rounded-full

                    flex items-center justify-center

                    bg-white/50

                    hover:bg-white
                    hover:rotate-90
                    hover:scale-110

                    active:scale-95

                    smooth-transition
                "
                        >
                            <FiX size={24} />
                        </button>

                    </div>

                    {/* SEARCH */}
                    <div className="p-5 border-b border-white/50">

                        <div
                            className="
                    flex items-center gap-3

                   

                    rounded-2xl

                    px-4 py-3

                    smooth-transition

                    hover:bg-white/80
                "
                        >

                            <FiSearch className="text-gray-500 text-lg" />

                            <input
                                type="text"
                                placeholder="ابحث هنا..."
                                className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"

                            />

                        </div>

                    </div>

               
                    <div
                        className="
                flex-1
                overflow-y-auto
                no-scrollbar

                px-4 py-6

                space-y-2
            "
                    >
                        <NavigationMenu
                            isMobile
                            onClose={() => setOpen(false)}
                        />
                    </div>

                    {/* AUTH */}
                    <div className="border-t border-white/50 p-5">

                        {auth?.user ? (

                            <div
                                className="
                        flex items-center gap-3
                        animate-fade-up
                    "
                            >

                                <FiUser size={20} />

                                <span className="font-medium">
                                    حسابي
                                </span>

                            </div>

                        ) : (

                            <div className="flex flex-col gap-3">

                                <a
                                    href="/login"
                                    className="
                            w-full
                            py-3

                            rounded-2xl

                            text-center
                            font-medium

                            border border-[var(--primary)]

                            text-[var(--primary)]

                            bg-[var(--bg-light)]

                            
                            hover:shadow-lg
                        
                           

                            smooth-transition
                        "
                                >
                                    تسجيل الدخول
                                </a>

                                <a
                                    href="/register"
                                    className="
                            w-full
                            py-3

                            rounded-2xl

                            text-center
                            font-medium

                            bg-[var(--primary)]
                            text-white

                            hover:shadow-[0_10px_30px_rgba(177,124,86,0.35)]
                            

                          

                            smooth-transition
                        "
                                >
                                    إنشاء حساب
                                </a>

                            </div>

                        )}

                    </div>

                    {/* BOTTOM */}
                    <div
                        className="
                border-t border-white/20

                p-5

                flex items-center justify-center gap-10
            "
                    >

                        <FiHeart
                            size={25}
                            className="
                    cursor-pointer

                    hover:text-[var(--primary)]
                    hover:scale-110

                    active:scale-95

                    smooth-transition
                "
                        />

                        <div className="relative ">

                            <FiShoppingCart
                                size={25}
                                className="
                        cursor-pointer

                        hover:text-[var(--primary)]
                        hover:scale-110

                        active:scale-95

                        smooth-transition
                    "
                            />

                            <span
                                className="
                        absolute -top-2 -left-2
                        animate-floating

                        bg-[var(--primary)]
                        text-white

                        text-[10px]

                        w-5 h-5

                        rounded-full

                        flex items-center justify-center
                    "
                            >
                                0
                            </span>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}