import { Link, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { BiNotification } from "react-icons/bi";
import {
    FiSearch,
    FiBell,
    FiChevronDown,
    FiUser,
    FiLogOut,
    FiSettings,
} from "react-icons/fi";
import { MdOutlineNotificationsNone } from "react-icons/md";

export default function Header() {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            fetch(route("admin.offers.search", { q: query }))
                .then((res) => res.json())
                .then((data) => {
                    setResults(data);
                    setOpen(true);
                });
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        // { label: 'الملف الشخصي', icon: <FiUser />, href: '#' },
        { label: "الإعدادات", icon: <FiSettings />, href: "/users" },
        {
            label: "تسجيل الخروج",
            icon: <FiLogOut />,
            href: route("logout"),
            method: "post",
            isButton: true,
        },
    ];

    return (
        <header
            className="p-5 h-20 border-b border-gray-200  sm:px-8 flex items-center justify-between
                           bg-[var(--bg-lighter)] backdrop-blur-md sticky top-0 z-20 "
        >
            <div className="flex items-center gap-3 w-full max-w-lg">
                <div className="relative w-full">
                    <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary)] text-lg" />
                    <input
                        type="text"
                        placeholder="ابحث عن لوحات ، مجموعات ، أقسام . . ."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 bg-[var(--hover-accent)] border-none rounded-lg
                                   focus:ring-1 focus:ring-[var(--primary)] focus:ring-offset-1
                                   focus:bg-white/30 text-sm transition-all outline-none shadow-sm hover:bg-white/30 h-12"
                    />

                    {open && query.length > 0 && (
                        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                            {results.length > 0 ? (
                                results.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.url}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={() => {
                                            setOpen(false);
                                            setQuery("");
                                        }}
                                    >
                                        <span className="text-xs text-gray-400 mr-2">
                                            {item.type === "offer"
                                                ? "🎁  باقة "
                                                : "📍 محافظة"}
                                        </span>
                                        {item.label}
                                    </Link>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    لا توجد نتائج
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 relative">
                {/* <button
                    className="relative flex items-center justify-center w-12 h-12 rounded-lg
                               bg-gray-100 text-gray-600 hover:bg-gray-200 transition-transform duration-150
                               active:scale-95"
                    title="الإشعارات"
                >
                    <FiBell size={22} />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button> */}
                <button
                    className="relative flex items-center justify-center
                       w-11 h-11 rounded-2xl bg-[var(--bg-lighter)] shadow-sm
                       text-[var(--secondary)] transition-all duration-300
                      "
                >
                    <FiBell size={22} className="animate-bell" />

                    <span
                        className="absolute top-2 right-2 w-2.5 h-2.5
                           rounded-full bg-red-500 border-2 border-white"
                    ></span>
                </button>
                <div className="h-6 w-px bg-gray-200 mx-1"></div>

                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 group"
                        title={user.name}
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center
                                        bg-[var(--primary)] text-white font-bold text-lg shadow-md"
                        >
                            {user.name.charAt(0)}
                        </div>
                        <FiChevronDown
                            className={`text-gray-600 transition-transform duration-200
                            ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    <div
                        className={`absolute left-0 mt-2 w-48 max-w-[90vw] bg-white rounded-lg shadow-lg 
                                    transition-all duration-300 origin-top-right z-50
                                    ${dropdownOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}
                    >
                        <div
                            className={`absolute left-0 mt-3 w-64 transition-all duration-200 z-50
                ${
                    dropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                }`}
                        >
                            <div
                                className="overflow-hidden rounded-xl border border-gray-100
               bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]
               will-change-transform"
                            >
                                <div
                                    className="relative p-5 border-b border-gray-100
                                   bg-gradient-to-br
                                   from-[var(--primary)]/10
                                   via-white
                                   to-[var(--secondary)]/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center
                                           rounded-full bg-[var(--primary)]
                                           text-lg font-bold text-white shadow-md"
                                        >
                                            {user.name.charAt(0)}
                                        </div>

                                        <div className="flex-1 overflow-hidden">
                                            <h3 className="truncate text-sm font-bold text-[var(--text-dark)]">
                                                {user.name}
                                            </h3>

                                            <p className="truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>

                                            <div
                                                className="mt-2 inline-flex items-center gap-1
                                               rounded-full bg-emerald-100
                                               px-2 py-1 text-[10px]
                                               font-medium text-emerald-600"
                                            >
                                                <span
                                                    className="h-2 w-2 rounded-full
                                                   bg-emerald-500 animate-pulse"
                                                ></span>
                                                متصل الآن
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 space-y-1">
                                    {menuItems.map((item, idx) =>
                                        item.isButton ? (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                method={item.method}
                                                as="button"
                                                className="flex items-center justify-between
                                               w-full rounded-2xl px-4 py-3
                                               text-sm font-medium text-red-500
                                               transition-all duration-200
                                               hover:bg-red-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base">
                                                        {item.icon}
                                                    </span>

                                                    {item.label}
                                                </div>
                                            </Link>
                                        ) : (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className="flex items-center justify-between
                                               rounded-2xl px-4 py-3
                                               text-sm font-medium text-gray-700
                                               transition-all duration-200
                                               hover:bg-[var(--hover-accent)]
                                               hover:text-[var(--primary)]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base">
                                                        {item.icon}
                                                    </span>

                                                    {item.label}
                                                </div>
                                            </Link>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
