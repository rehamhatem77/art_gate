import { useEffect, useState } from "react";
import ProductCard from "../HomePage/ProductCard";
import Modal from "@/Components/Modal";
import { LuArrowUpDown } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import QuickViewModal from "../HomePage/QuickViewModal";
import { FaPalette, FaPallet } from "react-icons/fa6";
import { MdPallet } from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";

export default function ProductsSection({
    products,
    total,
    filters,
    setFilters,
    setShowFilters,
}) {
    const [sortModal, setSortModal] = useState(false);
    const [sort, setSort] = useState("default");
    const activeFilters = [
        ...(filters.place || []).map((item) => ({
            type: "place",
            value: item,
            label: item,
        })),

        ...(filters.shape || []).map((item) => ({
            type: "shape",
            value: item,
            label: item,
        })),

        ...(filters.pieces || []).map((item) => ({
            type: "pieces",
            value: item,
            label: item,
        })),
    ];
    const [items, setItems] = useState(products || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        const nextPage = page + 1;

        const res = await fetch(
            route("shop", {
                ...filters,
                page: nextPage,
            }),
            {
                method: "GET",
                headers: {
                    "X-Load-More": "true",
                    Accept: "application/json",
                },
            },
        );

        const data = await res.json();

        setItems((prev) => [...prev, ...data.products]);

        setPage(nextPage);
        setHasMore(data.pagination.has_more);

        setLoading(false);
    };

    const removeFilter = (filter) => {
        const updated = {
            ...filters,
            [filter.type]: (filters[filter.type] || []).filter(
                (v) => v !== filter.value,
            ),
        };

        setFilters(updated);
    };
    const clearAllFilters = () => {
        setFilters({
            place: [],
            shape: [],
            pieces: [],
        });
    };
    useEffect(() => {
        setItems(products || []);
        setPage(1);
        setHasMore(true);
    }, [products]);
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showQuickView, setShowQuickView] = useState(false);

    const openQuickView = (product) => {
        setSelectedProduct(product);
        setShowQuickView(true);
    };

    const closeQuickView = () => {
        setShowQuickView(false);
        setSelectedProduct(null);
    };
    return (
        <div className="w-full ">
            {/* Toolbar */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.3,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="flex flex-col gap-4 mb-6"
            >
                <div className="flex  md:flex-row items-center md:items-center justify-between gap-4">
                    <button
                        onClick={() => setShowFilters(true)}
                        className="
                                   flex items-center gap-2
                                   px-4 py-3
                                   text-sm font-medium
                                   lg:hidden 
                                   bg-white
                                      border border-gray-200
                                      rounded-xl
                                      hover:shadow-sm
                                 
                                  
                                   
                               "
                    >
                        <FiFilter size={18} />
                        الفلاتر
                    </button>

                    <div className="hidden md:block text-md  text-[#666] font-medium">
                        عرض 1- {items.length} من أصل {total || 0} نتيجة{" "}
                    </div>
                    <div className="flex  items-center">
                        <div className="hidden md:block">
                            <select
                                value={sort}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSort(value);

                                    setFilters({
                                        ...filters,
                                        sort: value,
                                    });
                                }}
                                className="
           
            min-w-[180px]
          
            border
            border-[#d8d8d8]
            bg-white
            px-8
            text-sm
            text-[#555]
h-11 rounded-xl focus:ring-1
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)] border border-[#e7dfd8]
        "
                            >
                                <option value="default">
                                    الترتيب الافتراضي
                                </option>
                                <option value="latest">الأحدث</option>
                                <option value="high">الأعلى سعراً</option>
                                <option value="low">الأقل سعراً</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setSortModal(true)}
                            className="
        md:hidden
        w-11
        h-11
        flex
        items-center
        justify-center
    "
                        >
                            <LuArrowUpDown size={18} />
                        </button>
                    </div>
                </div>

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={clearAllFilters}
                            className="
        text-md
        font-semibold
        text-[var(--primary)]
        underline-offset-4
        hover:underline
    "
                        >
                            مسح الكل
                        </button>
                        {activeFilters.map((filter) => (
                            <button
                                key={`${filter.type}-${filter.value}`}
                                onClick={() => removeFilter(filter)}
                                className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    text-[#555]
                    hover:text-[var(--primary)]
                    transition
                "
                            >
                                <span>{filter.label}</span>
                                <span>✕</span>
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Products */}
            {items.length ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    animate="visible"
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-x-6
            gap-y-8
        "
                >
                    {items.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard
                                key={product.id}
                                product={product}
                                onQuickView={openQuickView}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div
                    className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            py-24
            px-6
            rounded-3xl
            border
            border-dashed
            border-[#d9c8b7]
            bg-gradient-to-b
            from-[#fffaf5]
            to-white
        "
                >
                    <div
                        className="
                w-20
                h-20
                rounded-full
                bg-[var(--bg-lighter)]
                flex
                items-center
                justify-center
                mb-5
            "
                    >
                        <span>
                            <IoColorPaletteOutline size={38} />
                        </span>
                    </div>

                    <h3
                        className="
                text-2xl
                font-bold
                text-[var(--primary)]
                mb-2
            "
                    >
                        لا توجد منتجات مطابقة
                    </h3>

                    <p
                        className="
                text-[#777]
                max-w-md
                leading-7
                mb-6
            "
                    >
                        لم نعثر على منتجات تطابق الفلاتر الحالية. جرّب إزالة بعض
                        الفلاتر أو تغيير خيارات البحث.
                    </p>

                    <button
                        onClick={clearAllFilters}
                        className="
                px-6
                py-3
                rounded-xl
                bg-[var(--primary)]
                text-white
                font-medium
                hover:scale-105
                transition
            "
                    >
                        إعادة ضبط الفلاتر
                    </button>
                </div>
            )}

            {showQuickView && selectedProduct && (
                <QuickViewModal
                    product={selectedProduct}
                    onClose={closeQuickView}
                />
            )}

            {hasMore && items.length !== total && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="
                px-6 py-3
                rounded-xl
                bg-[var(--primary)]
                text-white
                disabled:opacity-50
            "
                    >
                        {loading
                            ? "جاري التحميل..."
                            : " تحميل المزيد من المنتجات"}
                    </button>
                </div>
            )}

            <Modal show={sortModal} onClose={() => setSortModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-bold mb-5">ترتيب المنتجات</h3>

                    <div className="space-y-2">
                        {[
                            {
                                label: "الترتيب الافتراضي",
                                value: "default",
                            },
                            {
                                label: "الأحدث",
                                value: "latest",
                            },
                            {
                                label: "الأعلى سعراً",
                                value: "high",
                            },
                            {
                                label: "الأقل سعراً",
                                value: "low",
                            },
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() => {
                                    setSort(item.value);

                                    setFilters({
                                        ...filters,
                                        sort: item.value,
                                    });

                                    setSortModal(false);
                                }}
                                className={`
                        w-full
                        text-right
                        px-4
                        py-3
                        rounded-xl
                        transition
                        ${
                            sort === item.value
                                ? "bg-[var(--primary)] text-white"
                                : "bg-gray-50 hover:bg-gray-100"
                        }
                    `}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.label}</span>

                                    {sort === item.value && (
                                        <span className="text-lg">✓</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
