import SiteLayout from "@/Layouts/SiteLayout";
import Hero from "./Hero";
import FilterSidebar from "./FilterSideBar";
import { useState } from "react";
import ProductsSection from "./ProductsSection";
import { FiFilter, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import RecentlyViewedSection from "../Components/RecentlyViewedSection";
import FeaturesSection from "../Components/FeaturesSection";
import useRecentlyViewed from "@/Hooks/useRecentlyViewed";

export default function Shop({ categories, tags, products, counts, shapes,
    filters: initialFilters,
    total
}) {
    const [showFilters, setShowFilters] = useState(false);
    const { services } = usePage().props;
    const { announcement } = usePage().props;
    const recentProducts =
        useRecentlyViewed();
    const normalizeArray = (value) =>
        Array.isArray(value) ? value : [];
    const [filters, setFilters] = useState({
        design_colors: normalizeArray(initialFilters?.design_colors),
        place: normalizeArray(initialFilters?.place),
        shape: normalizeArray(initialFilters?.shape),
        pieces: normalizeArray(initialFilters?.pieces),
        category: initialFilters?.category || null,
        tag: initialFilters?.tag || null,
    });
    const updateFilters = (newFilters) => {

        setFilters(newFilters);


        router.get(
            route("shop"),
            {
                place: [...newFilters.place],
                shape: newFilters.shape,
                pieces: newFilters.pieces,
                design_colors: newFilters.design_colors,
                category: newFilters.category || null,
                tag: newFilters.tag || null,
                sort: newFilters.sort || null,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }

    return (
        <SiteLayout title="المتجر" announcement={announcement}>
            <Hero categories={categories} tags={tags}
                onSelect={(item) => {
                    updateFilters({
                        ...filters,
                        category: item.type === "category" ? item.id : null,
                        tag: item.type === "tag" ? item.id : null,
                    });
                }} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Mobile Filter Button */}
                {/* <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="
                flex items-center gap-2
                px-4 py-3
                bg-white
                border border-gray-200
                rounded-xl
                shadow-sm
                text-sm font-medium
            "
                    >
                        <FiFilter />
                        الفلاتر
                    </button>
                </div> */}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="hidden lg:block w-[280px] shrink-0">
                        <div
                            className="
                     top-6
                    bg-[#f3f3f3]
                    border border-[#e1e1e1]
                    rounded-lg
                    p-4
                 
                "
                        >
                            <FilterSidebar
                                filters={filters}
                                setFilters={updateFilters}
                                counts={counts}
                                shapes={shapes}
                            />
                        </div>
                    </motion.aside>

                    {/* Products */}
                    <main className="flex-1">
                        <ProductsSection
                            products={products}
                            filters={filters}
                            setFilters={updateFilters}
                            setShowFilters={setShowFilters}
                            total={total}
                        />
                    </main>
                </div>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowFilters(false)}
                            className="fixed inset-0 bg-black/50 z-50"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                    fixed
                    top-0
                    right-0
                    h-screen
                    w-[85%]
                    max-w-[320px]
                    bg-white
                    z-[60]
                    overflow-y-auto
                    shadow-2xl
                "
                        >
                            {/* Header */}
                            <div
                                className="
                        sticky top-0
                        bg-white
                        border-b
                        z-50
                        px-4 py-5
                        flex items-center justify-between
                    "
                            >
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="
                            flex items-center gap-1
                            text-sm
                            text-gray-700
                        "
                                >
                                    <FiX />
                                    إغلاق
                                </button>

                                <h3 className="font-bold text-[#7b5b3e]">
                                    الفلاتر
                                </h3>
                            </div>

                            {/* Filters */}
                            <div className="p-4">
                                <FilterSidebar
                                    filters={filters}
                                    setFilters={updateFilters}
                                    counts={counts}
                                    shapes={shapes}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>



            <FeaturesSection services={services} />
            <RecentlyViewedSection recentProducts={recentProducts} />
        </SiteLayout>
    );
}
