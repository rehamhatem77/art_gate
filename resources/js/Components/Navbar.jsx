import { useEffect, useRef, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";

import {
    FiShoppingCart,
    FiHeart,
    FiUser,
    FiSearch,
    FiMenu,
    FiX,
    FiLogOut,
    FiSettings,
    FiChevronDown,
} from "react-icons/fi";
import { router, usePage } from "@inertiajs/react";
import { getImage } from "@/Utils/GetImage";
import axios from "axios";

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
                    ${mobile ? "items-start" : "items-center"}
                `}
            >
                <span
                    className={`
                        font-medium
                        transition-all duration-300
                        
                        ${mobile ? "text-base" : "text-lg"}

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
    const { url } = usePage();
    const links = [
        { href: "/", label: "الرئيسية", routeName: "home" },
        { href: "/shop", label: "المتجر", routeName: "shop" },
        // { href: "/blog", label: "المدونة" , routeName: "blog"},
        { href: "/about-us", label: "من نحن", routeName: "about-us" },
        { href: "/contact-us", label: "اتصل بنا", routeName: "contact-us" },
    ];

    return (
        <div
            className={`
                flex
                ${isMobile ? "flex-col gap-2 w-full" : "items-center"}
            `}
        >
            {links.map((item, i) => (
                <NavLink
                    key={i}
                    active={route().current(`${item.routeName}*`)}
                    mobile={isMobile}
                    onClick={() => {
                        onClose?.();
                        router.get(item.href);
                    }}
                >
                    {item.label}
                </NavLink>
            ))}
        </div>
    );
}

function UserIcons({ auth, mobile = false, cartCount = 0 }) {
    const { url, props } = usePage();
    const wishlistCount = props.wishlistCount || 0;

    const [openMenu, setOpenMenu] = useState(false);
    const dropdownRef = useRef(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const isWishlist = url.startsWith("/wishlist");
    const isCart = url.startsWith("/cart") || url.startsWith("/checkout");
    const iconClass =
        "cursor-pointer transition-all duration-300 hover:text-[var(--primary)] hover:scale-110 active:scale-95";

    if (mobile) {
        return (
            <div className="flex items-center gap-6">
                <button
                    onClick={() => router.get("/wishlist")}
                    className="relative"
                >
                    <FiHeart
                        size={22}
                        className={`${iconClass} ${
                            isWishlist ? "text-[var(--primary)]" : ""
                        }`}
                    />

                    {wishlistCount > 0 && (
                        <span
                            className="
                absolute
                -top-2
                -left-2
                bg-[var(--primary)]
                text-white
                text-[10px]
                w-4
                h-4
                rounded-full
                flex
                items-center
                justify-center
                font-medium
            "
                        >
                            {wishlistCount}
                        </span>
                    )}
                </button>

                <button
                    className="relative"
                    onClick={() => router.get("/cart")}
                >
                    <FiShoppingCart
                        size={23}
                        className={`${iconClass} ${
                            isCart ? "text-[var(--primary)]" : ""
                        }`}
                    />

                    {/* <span
                        className="
                            absolute -top-2 -left-2
                            bg-[var(--primary)]
                            text-white
                            text-[10px]
                            w-4 h-4
                            rounded-full
                            flex items-center justify-center
                            animate-floating

                        "
                    >
                        0
                    </span> */}
                    {cartCount > 0 && (
                        <span
                            className="
            absolute -top-2 -left-2
            bg-[var(--primary)]
            text-white
            text-[10px]
            min-w-[16px]
            h-4
            px-1
            rounded-full
            flex
            items-center
            justify-center
            font-medium
        "
                        >
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    )}
                </button>
            </div>
        );
    }
    /* close dropdown outside click */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (search.length < 2) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(true);

            axios
                .get("/search/products", {
                    params: { search },
                })
                .then((res) => {
                    setResults(res.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <div className="flex items-center gap-5 text-gray-700">
            {/* USER DROPDOWN (NEW PREMIUM UI) */}
            {auth?.user ? (
                <div ref={dropdownRef} className="relative">
                    {/* TRIGGER */}
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="flex items-center gap-2"
                    >
                        {auth.user.profile?.avatar ? (
                            <img
                                src={getImage(auth.user.profile.avatar)}
                                className="h-9 w-9 rounded-full object-cover border shadow-sm"
                            />
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                                {auth.user.name?.charAt(0)}
                            </div>
                        )}

                        <FiChevronDown
                            className={`transition-transform duration-200 ${
                                openMenu ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* DROPDOWN */}
                    <div
                        className={`absolute left-0 mt-3 w-64 z-50 transition-all duration-200
                        ${openMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                    >
                        <div className="overflow-hidden rounded-xl border bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                            {/* HEADER */}
                            <div className="p-4 border-b bg-gradient-to-br from-[var(--primary)]/10 to-white">
                                <div className="flex items-center gap-3">
                                    {auth.user.profile?.avatar ? (
                                        <img
                                            src={getImage(
                                                auth.user.profile.avatar,
                                            )}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                                            {auth.user.name?.charAt(0)}
                                        </div>
                                    )}

                                    <div className="overflow-hidden">
                                        <p className="font-semibold text-sm truncate">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* MENU */}
                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        router.get(
                                            auth.user.role === "admin"
                                                ? "/admin/profile"
                                                : "/profile",
                                        );
                                    }}
                                    className="w-full text-right px-4 py-3 text-sm rounded-xl hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <FiSettings /> الإعدادات
                                </button>

                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        router.post("/logout");
                                    }}
                                    className="w-full text-right px-4 py-3 text-sm rounded-xl hover:bg-red-50 text-red-600 flex items-center gap-2"
                                >
                                    <FiLogOut /> تسجيل الخروج
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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

            <div
                ref={searchRef}
                className={`
        relative overflow-visible transition-all duration-300
        ${searchOpen ? "w-80" : "w-[22px]"}
    `}
            >
                {searchOpen ? (
                    <div className="relative flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                autoFocus
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="ابحث عن منتج..."
                                className="
                                    h-10
                                    w-full
                                    rounded-2xl
                                    outline-none
                                    transition
                                    focus:border-[var(--primary)]
                                    focus:ring-4
                                    focus:ring-transparent
                "
                            />

                            {(loading || results.length > 0) && (
                                <div
                                    className="
                        absolute top-12 right-0
                        w-[380px]
                        bg-white
                        rounded-3xl
                        shadow-2xl
                        border
                        overflow-hidden
                        z-50
                    "
                                >
                                    {loading && (
                                        <div className="p-5 text-center text-gray-400">
                                            جاري البحث...
                                        </div>
                                    )}

                                    {results.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => {
                                                setSearch("");
                                                setResults([]);
                                                setSearchOpen(false);

                                                 router.visit(route("shop.product.show", product.slug))
                                            }}
                                            className="
                                w-full
                                p-3
                                flex
                                items-center
                                gap-4
                                hover:bg-gray-50
                                transition
                            "
                                        >
                                            <img
                                                src={getImage(
                                                    product.main_image,
                                                )}
                                                className="
                                    w-16 h-16
                                    rounded-2xl
                                    object-cover
                                "
                                            />

                                            <div className="flex-1 text-right">
                                                <p className="font-medium line-clamp-1">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </button>
                                    ))}

                                    {!loading &&
                                        search.length > 1 &&
                                        results.length === 0 && (
                                            <div className="p-5 text-center text-gray-400">
                                                لا توجد نتائج
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>

                        <FiX
                            size={20}
                            className="cursor-pointer text-gray-500"
                            onClick={() => {
                                setSearchOpen(false);
                                setSearch("");
                                setResults([]);
                            }}
                        />
                    </div>
                ) : (
                    <FiSearch
                        size={22}
                        className={iconClass}
                        onClick={() => setSearchOpen(true)}
                    />
                )}
            </div>

            <button
                onClick={() => router.get("/wishlist")}
                className="relative"
            >
                <FiHeart
                    size={22}
                    className={`${iconClass} ${
                        isWishlist ? "text-[var(--primary)]" : ""
                    }`}
                />

                {wishlistCount > 0 && (
                    <span
                        className="
                absolute
                -top-2
                -left-2
                bg-[var(--primary)]
                text-white
                text-[10px]
                w-4
                h-4
                rounded-full
                flex
                items-center
                justify-center
                font-medium
            "
                    >
                        {wishlistCount}
                    </span>
                )}
            </button>

            <button className="relative" onClick={() => router.get("/cart")}>
                <FiShoppingCart
                    size={22}
                    className={`${iconClass} ${
                        isCart ? "text-[var(--primary)]" : ""
                    }`}
                />

                {/* <span
                    className="
                        absolute -top-2 -left-2
                        bg-[var(--primary)]
                        text-white
                        text-[10px]
                        w-4 h-4
                        rounded-full
                        flex items-center justify-center
                    "
                >
                    0
                </span> */}
                {cartCount > 0 && (
                    <span
                        className="
            absolute -top-2 -left-2
            bg-[var(--primary)]
            text-white
            text-[10px]
            min-w-[16px]
            h-4
            px-1
            rounded-full
            flex
            items-center
            justify-center
            font-medium
        "
                    >
                        {cartCount > 99 ? "99+" : cartCount}
                    </span>
                )}
            </button>
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

    const { url, props } = usePage();
    const wishlistCount = props.wishlistCount || 0;
    const isWishlist = url.startsWith("/wishlist");
    const isCart = url.startsWith("/cart") || url.startsWith("/checkout");
    const serverCartCount = props.cartCount || 0;

    const [cartCount, setCartCount] = useState(
        auth?.user
            ? serverCartCount
            : JSON.parse(localStorage.getItem("cart") || "[]").reduce(
                  (sum, item) => sum + item.quantity,
                  0,
              ),
    );

    useEffect(() => {
        const updateCartCount = () => {
            if (auth?.user) {
                router.reload({
                    only: ["cartCount"],
                    preserveScroll: true,
                    preserveState: true,
                });
            } else {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                const total = cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                );

                setCartCount(total);
            }
        };

        window.addEventListener("cart-updated", updateCartCount);

        return () => {
            window.removeEventListener("cart-updated", updateCartCount);
        };
    }, [auth]);

    useEffect(() => {
        if (auth?.user) {
            setCartCount(serverCartCount);
        }
    }, [serverCartCount]);

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
                        <UserIcons auth={auth} cartCount={cartCount} />
                    </div>

                    <div className="flex md:hidden">
                        <UserIcons mobile auth={auth} cartCount={cartCount} />
                    </div>
                </div>
            </header>

            <div
                className={`
        fixed inset-0 z-[9999] md:hidden
        smooth-transition

        ${open ? "visible opacity-100" : "invisible opacity-0"}
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

            ${open ? "opacity-100" : "opacity-0"}
        `}
                />

                <div
                    className={`
            absolute top-0 right-0

            h-[100%]
            w-[88%]
            max-w-[370px]

            glass

            shadow-[0_10px_60px_rgba(0,0,0,0.20)]

            flex flex-col

            overflow-hidden

            ${open ? "animate-drawer-open" : "animate-drawer-close"}
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

                                <span className="font-medium">حسابي</span>
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
                        <div className="relative">
                            <FiHeart
                                onClick={() => router.get("/wishlist")}
                                size={25}
                                className={`
            cursor-pointer
            hover:text-[var(--primary)]
            hover:scale-110
            active:scale-95
            smooth-transition
            ${isWishlist ? "text-[var(--primary)]" : "text-gray-700"}
        `}
                            />

                            {wishlistCount > 0 && (
                                <span
                                    className="
                absolute
                -top-2
                -left-3
                min-w-[18px]
                h-[18px]
                px-1
                rounded-full
                bg-[var(--primary)]
                text-white
                text-[10px]
                font-semibold
                flex
                items-center
                justify-center
                shadow-md
                animate-floating
            "
                                >
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </div>

                        <button
                            className="relative "
                            onClick={() => router.get("/cart")}
                        >
                            <FiShoppingCart
                                size={25}
                                className={`
                        cursor-pointer

                        hover:text-[var(--primary)]
                        hover:scale-110

                        active:scale-95

                        smooth-transition
                         ${isCart ? "text-[var(--primary)]" : "text-gray-700"}
                    `}
                            />

                            {/* <span
                                className="
                        absolute -top-2 -left-3
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
                            </span> */}
                            {cartCount > 0 && (
                                <span
                                    className="
            absolute -top-2 -left-2
            bg-[var(--primary)]
            text-white
            text-[10px]
            min-w-[16px]
            h-4
            px-1
            rounded-full
            flex
            items-center
            justify-center
            font-medium
        "
                                >
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
