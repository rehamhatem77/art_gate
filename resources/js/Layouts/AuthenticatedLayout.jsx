import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    FiGrid,
    FiGift,
    FiStar,
    FiTrendingUp,
    FiMenu,
    FiLogOut,
    FiSettings,
    FiUsers,
    FiGlobe,
    FiHome,
    FiBriefcase,
    FiMail,
} from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";

import { MdOutlineHotel, MdOutlineCategory } from "react-icons/md";
import { FaRegBuilding, FaMapLocationDot } from "react-icons/fa6";
import { FaHandsHelping, FaRegCommentDots } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import { LuUngroup } from "react-icons/lu";
import { AiOutlineTags } from "react-icons/ai";
import { SlSizeFullscreen } from "react-icons/sl";
import { RxDimensions } from "react-icons/rx";
import { GoNumber } from "react-icons/go";
import { TbHomeLink } from "react-icons/tb";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import { BsStars } from "react-icons/bs";
import SidebarContent from "@/Components/Sidebar";
import FlashToast from "@/Components/FlashToast";
import Header from "@/Components/Header";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth > 1024) setSidebarOpen(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dashboardLinks = [
        { name: "لوحة التحكم", icon: <FiGrid />, path: "/admin/dashboard" },
        {
            name: "اللوحات",
            icon: <IoColorPaletteOutline />,
            path: "/admin/products",
        },
        { name: "المجموعات", icon: <LuUngroup />, path: "/admin/categories" },
        { name: "التصنيفات", icon: <AiOutlineTags />, path: "/admin/tags" },
        {
            name: "المقاسات",
            icon: <SlSizeFullscreen />,
            path: "/admin/sizes",
        },
        {
            name: "أنواع الاطار",
            icon: <MdOutlineCategory />,
            path: "/admin/frame-types",
        },
        {
            name: "شكل اللوحة",
            icon: <RxDimensions />,
            path: "/admin/shapes",
        },
        // { name: "عدد قطع اللوحة", icon: <GoNumber />, path: "/admin/tableau-numbers" },
        // { name: "الأماكن ", icon: <TbHomeLink />, path: "/admin/trip-types" },

        { name: "الخدمات", icon: <FaHandsHelping />, path: "/admin/services" },
        // { name: 'الإعدادات', icon: <FiSettings />, path: '/users' },
        {
            name: "الطلبات ",
            icon: <FaMoneyBillTrendUp />,
            path: "/admin/trip-types",
        },
    ];

    const sitePages = [
        { name: "الصفحة الرئيسية", icon: <FiHome />, path: "/admin/homepage" },
        { name: "من نحن", icon: <FiBriefcase />, path: "/admin/about-page" },
        { name: "تواصل معنا", icon: <FiGlobe />, path: "/admin/contact-page" },
        {
            name: "رسائل العملاء",
            icon: <FiMail />,
            path: "/admin/contact-messages",
        },
    ];

    const renderLinks = (links, expanded) =>
        links.map((link) => {
            const isActive = url.includes(link.path);
            return (
                <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-2 mx-2 transition
                        ${
                            isActive
                                ? " text-[var(--primary)] border-r-2 border-[var(--primary)] font-bold bg-[var(--bg-light)]"
                                : "hover:bg-[var(--hover-accent)]  text-gray-700 transition duration-200 ease-in-out"
                        }`}
                >
                    <span
                        className={`text-lg ${isActive ? "text-[var(--primary)]" : "text-[var(--app-primary)]"}`}
                    >
                        {link.icon}
                    </span>
                    {expanded && link.name}
                </Link>
            );
        });

    return (
        <div
            className="h-screen flex bg-[var(--bg-light)] overflow-hidden"
            dir="rtl"
        >
            {/* {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-30 bg-black/30"
                    onClick={() => setSidebarOpen(false)}
                />
            )} */}

            <aside
                className={`
        bg-[var(--bg-lighter)]
        border-l
        flex-shrink-0
        transition-all duration-300 ease-in-out
        overflow-hidden


        ${
            isMobile
                ? sidebarOpen
                    ? "w-64"
                    : "w-20"
                : sidebarCollapsed
                  ? "w-20"
                  : "w-64"
        }

        h-screen
        flex flex-col
    `}
            >
                <SidebarContent
                    user={user}
                    sidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed}
                    setSidebarOpen={setSidebarOpen}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    renderLinks={renderLinks}
                    dashboardLinks={dashboardLinks}
                    sitePages={sitePages}
                    isMobile={isMobile}
                />
            </aside>

            <div className="flex-1 flex flex-col lg:ml-0">
                <Header
                    user={user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isMobile={isMobile}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {" "}
                    <FlashToast />
                    {children}
                </main>
            </div>
        </div>
    );
}
