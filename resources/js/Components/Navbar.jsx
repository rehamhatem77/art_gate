import { useEffect, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";

function Logo() {
    return (


        <ApplicationLogo className=" h-20 w-auto" />

    );
}

function NavLink({ active, children }) {
    return (
        <div className="relative px-4 cursor-pointer group inline-flex flex-col items-center">


            <div
                className={`font-medium transition-all duration-300 ease-out
                ${active
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-dark)] group-hover:text-[var(--primary)]"
                    }`}
            >
                {children}
            </div>
            <div
                className={`
                    h-[2px] bg-[var(--primary)] mt-1 w-full
                    transform scale-x-0 origin-right
                    transition-transform duration-300 ease-out
                    ${active ? "scale-x-100" : "group-hover:scale-x-100"}
                `}
            />
        </div>
    );
}

function NavigationMenu() {
    return (
        <div className="flex items-center">
            <NavLink active>الرئيسية</NavLink>
            <NavLink>المتجر</NavLink>
            <NavLink>المدونة</NavLink>
            <NavLink>من نحن</NavLink>
            <NavLink>اتصل بنا</NavLink>
        </div>
    );
}

function UserIcons({ auth }) {
    const iconClass =
        "cursor-pointer transition-all duration-300 ease-out hover:text-[var(--primary)] hover:scale-110 active:scale-95";
    return (
        <div className="flex items-center gap-4 text-gray-700">
            {auth?.user ? (

                <FiUser size={22} className={iconClass} />
            ) : (
                <div className="flex items-center gap-2 text-sm font-medium">
                    <a
                        href="/login"
                        className="text-[var(--text-dark)] hover:text-[var(--primary)] duration-300 transition"
                    >
                        تسجيل الدخول
                    </a>
                    <span

                        className="text-[var(--text-dark)]"
                    >
                        /
                    </span>

                    <a
                        href="/register"
                        className="text-[var(--primary)] hover:underline duration-300 transition"
                    >
                        التسجيل
                    </a>
                </div>
            )}
            <FiSearch size={22} className={iconClass} />
            <FiHeart size={22} className={iconClass} />
            <div className="relative cursor-pointer">

                <FiShoppingCart className={iconClass} size={22} />
                {/* <span className="absolute -top-2 -left-2 bg-[var(--primary)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                    0
                </span> */}
                <span className="absolute -top-2 -left-2 bg-[var(--primary)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                    0
                </span>
            </div>






        </div>
    );
}

export default function Navbar({ auth }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`
    px-6 md:px-12 py-4 sticky top-0 z-50
    bg-white/80 backdrop-blur-md
    transition-all duration-300
    ${scrolled ? "shadow-md" : "shadow-none"}
`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Logo />
                <NavigationMenu />
                <UserIcons auth={auth} />

            </div>
        </header>
    );
}