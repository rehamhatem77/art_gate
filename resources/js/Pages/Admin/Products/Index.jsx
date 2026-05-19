import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useMemo, useState } from "react";

import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiEdit2,
    FiTrash2,
    FiPackage,
    FiGrid,
    FiLayers,
} from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";
import ProductCard from "./Components/ProductCard";

export default function Index({  }) {
    const [search, setSearch] = useState("");
const products = [
    {
        id: 1,
        name: "تابلوهات مودرن - صفاء الروح",
        code: "is81",
        featured: true,

        category: {
            name: "تابلوهات اسلامية",
        },

        artistic_type: "مودرن",

        pieces_count: "3 تابلوه",

        main_image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2I2vwX_IxrHEolCxTYut6Ga5VhAo7qys5GfWVqlAxu-eFZw4VQWTfHzADIRXDntE27-F7VANHgROZQcFqm1yhgOaZjKJATKc22SI6kDX23zVzzinxz2S_BOnHL_a7QYUS5-TYuGwyhzH472o1ZWnNYA5q-TlmyUCpiAynZvxbD5MHlE70eYKs7Ga3iOJoPVpLHU6rzTZSwu_8FPgWCVk_p9o3BruwCJlf_fCwRE4IkPIE4GB7Kx3PMLlc5cOGciAPisjeDc",

        design_colors: [
            "#d8c3a5",
            "#c8b6a6",
            "#8b7355",
            "#f3ece4",
        ],

        variants: [
            {
                price: 390,
            },
            {
                price: 450,
            },
        ],
    },

    {
        id: 2,
        name: "تابلوهات كلاسيك - سكينة المنزل",
        code: "is82",
        featured: false,

        category: {
            name: "تابلوهات كلاسيك",
        },

        artistic_type: "كلاسيك",

        pieces_count: "2 تابلوه",

        main_image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",

        design_colors: [
            "#6f4e37",
            "#c19a6b",
            "#ede0d4",
        ],

        variants: [
            {
                price: 520,
            },
        ],
    },

    {
        id: 3,
        name: "تابلوهات اسلامية - نور اليقين",
        code: "is83",
        featured: true,

        category: {
            name: "تابلوهات اسلامية",
        },

        artistic_type: "إسلامي",

        pieces_count: "5 تابلوه",

        main_image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",

        design_colors: [
            "#c2a878",
            "#ffffff",
            "#1e1e1e",
        ],

        variants: [
            {
                price: 890,
            },
        ],
    },

    {
        id: 4,
        name: "تابلوهات فاخر - أناقة الذهب",
        code: "is84",
        featured: false,

        category: {
            name: "تابلوهات فاخرة",
        },

        artistic_type: "فاخر",

        pieces_count: "4 تابلوه",

        main_image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

        design_colors: [
            "#d4af37",
            "#f5e6ca",
            "#5c4033",
        ],

        variants: [
            {
                price: 1200,
            },
        ],
    },

    {
        id: 5,
        name: "تابلوهات مينيمال - هدوء المساحات",
        code: "is85",
        featured: false,

        category: {
            name: "تابلوهات مودرن",
        },

        artistic_type: "مينيمال",

        pieces_count: "تابلوه واحد",

        main_image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

        design_colors: [
            "#f8f5f2",
            "#d6ccc2",
            "#a68a64",
        ],

        variants: [
            {
                price: 260,
            },
        ],
    },

    {
        id: 6,
        name: "تابلوهات تجريدي - إيقاع الفن",
        code: "is86",
        featured: true,

        category: {
            name: "تابلوهات تجريدية",
        },

        artistic_type: "تجريدي",

        pieces_count: "3 تابلوه",

        main_image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",

        design_colors: [
            "#2f4858",
            "#33658a",
            "#86bbd8",
            "#f6ae2d",
        ],

        variants: [
            {
                price: 760,
            },
        ],
    },
];

    const filtered = useMemo(() => {
        return products.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [products, search]);


    const destroy = (id) => {
        if (!confirm("هل أنت متأكد من حذف اللوحة ؟")) return;

        router.delete(route("admin.products.destroy", id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="اللوحات" />

            <main className="space-y-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm">
                    <button
                        onClick={() => router.get(route("dashboard"))}
                        className="hover:text-[var(--primary)]"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft />

                    <span className="text-[var(--primary)] font-medium">
                        اللوحات
                    </span>
                </div>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                            w-14 h-14
                            rounded-2xl
                            bg-[var(--hover-accent)]
                            flex items-center justify-center
                        "
                        >
                            <IoColorPaletteOutline className="text-2xl text-[var(--primary)]" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                                إدارة اللوحات
                            </h1>

                            <p className="text-gray-500 mt-1">
                                إدارة جميع اللوحات والتصاميم والمتغيرات الخاصة
                                بها
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                            router.get(route("products.create"))
                        }
                        className="
                        flex items-center justify-center gap-2
                        px-5 py-2
                        rounded-xl
                        bg-[var(--primary)]
                        text-white
                        font-medium
                        shadow-sm
                        hover:opacity-90
                        transition-all
                    "
                    >
                        <FiPlus />
                        إضافة لوحة
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث باسم اللوحة..."
                        className="
                            w-full h-12
                            rounded-2xl
                            border border-gray-200
                            bg-white
                            pr-12 pl-4
                            text-sm
                            shadow-sm
                            outline-none
                            transition-all
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]
                        "
                    />
                </div>

                {/* Grid */}
                {filtered.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map((item) => (
                            <ProductCard
								key={item.id}
								product={item}
/>
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                        bg-white
                        rounded-3xl
                        border border-dashed border-gray-300
                        py-20
                        text-center
                    "
                    >
                        <div
                            className="
                            w-20 h-20
                            rounded-full
                            bg-gray-100
                            mx-auto
                            flex items-center justify-center
                        "
                        >
                            <FiPackage className="text-3xl text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold">
                            لا توجد منتجات
                        </h2>

                        <p className="text-gray-500 mt-2">
                            قم بإضافة أول منتج الآن
                        </p>

                        <button
                            onClick={() =>
                                router.get(route("admin.products.create"))
                            }
                            className="
                            mt-6
                            inline-flex items-center gap-2
                            px-5 py-3
                            rounded-2xl
                            bg-[var(--primary)]
                            text-white
                            font-medium
                            hover:opacity-90
                            transition
                        "
                        >
                            <FiPlus />
                            إضافة منتج
                        </button>
                    </div>
                )}
            </main>
        </AuthenticatedLayout>
    );
}