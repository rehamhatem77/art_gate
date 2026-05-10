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

function NavLink({ active, children, onClick }) {
    return (
        <div
            onClick={onClick}
            className="relative px-4 py-2 cursor-pointer group flex flex-col items-center"
        >
            <span
                className={`font-medium text-lg transition-all duration-300
                ${active
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-dark)] group-hover:text-[var(--primary)]"
                    }`}
            >
                {children}
            </span>

        
            <span
                className={`
                    h-[2px] bg-[var(--primary)] rounded-full
                    origin-right transition-transform duration-300 ease-out
                    ${active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}
                `}
            />
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
                flex ${isMobile ? "flex-col items-start gap-4" : "items-center"}
            `}
        >
            {links.map((item, i) => (
                <NavLink key={i} active={i === 0} onClick={onClose}>
                    {item}
                </NavLink>
            ))}
        </div>
    );
}

function UserIcons({ auth, mobile = false, onClose }) {
    const iconClass =
        "cursor-pointer transition-all duration-300 hover:text-[var(--primary)] hover:scale-110 active:scale-95";

    // MOBILE → only icons (no login/search here anymore)
    if (mobile) {
        return (
            <div className="flex items-center gap-5 text-gray-700">
                <FiHeart size={22} className={iconClass} />
                <div className="relative">
                    <FiShoppingCart size={22} className={iconClass} />
                    <span className="absolute -top-2 -left-2 bg-[var(--primary)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        0
                    </span>
                </div>
            </div>
        );
    }

    // DESKTOP (unchanged except small cleanup)
    return (
        <div className="flex items-center gap-4 text-gray-700">

            {auth?.user ? (
                <FiUser size={22} className={iconClass} />
            ) : (
                <div className="flex items-center gap-2 text-md font-medium">
                    <a href="/login" className="hover:text-[var(--primary)] transition">
                        تسجيل الدخول
                    </a>
                    <span>/</span>
                    <a href="/register" className="text-[var(--primary)] hover:underline transition">
                        التسجيل
                    </a>
                </div>
            )}

            <FiSearch size={22} className={iconClass} />
            <FiHeart size={22} className={iconClass} />

            <div className="relative">
                <FiShoppingCart size={22} className={iconClass} />
                <span className="absolute -top-2 -left-2 bg-[var(--primary)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    0
                </span>
            </div>
        </div>
    );
}

function Logo() {
    return <ApplicationLogo className="h-16 w-auto" />;
}

export default function Navbar({ auth }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`
                sticky top-0 z-50 w-full
                bg-white/80 backdrop-blur-md
                transition-all duration-300
                ${scrolled ? "shadow-md" : ""}
                rtl
            `}
            dir="rtl"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-4">

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-2xl"
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>

                {/* Logo (center in mobile, right in desktop RTL) */}
                <div className="flex-1 md:flex-none flex justify-center md:justify-start">
                    <Logo />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu />
                </div>

                {/* User Icons */}
                {/* Desktop Icons */}
<div className="hidden md:flex">
    <UserIcons auth={auth} />
</div>

{/* Mobile Icons (only heart + cart) */}
<div className="flex md:hidden items-center gap-4">
    <UserIcons auth={auth} mobile />
</div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t px-6 py-4 animate-fade-in">
                    <NavigationMenu isMobile onClose={() => setOpen(false)} />
                </div>
            )}
        </header>
    );
}