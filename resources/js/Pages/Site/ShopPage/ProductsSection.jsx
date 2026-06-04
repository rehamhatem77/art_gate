import { useState } from "react";
import ProductCard from "../HomePage/ProductCard";
import Modal from "@/Components/Modal";
import { LuArrowUpDown } from "react-icons/lu";

export default function ProductsSection({
    products,
    total = 580,
    filters,
    setFilters,
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

    const removeFilter = (filter) => {
        setFilters((prev) => ({
            ...prev,
            [filter.type]: prev[filter.type].filter((v) => v !== filter.value),
        }));
    };
    const clearAllFilters = () => {
        setFilters({
            place: [],
            shape: [],
            pieces: [],
        });
    };

    return (
        <div className="w-full">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex  md:flex-row items-center md:items-center justify-between gap-4">
                    <div className="text-sm text-[#666] font-medium">
                        عرض 1–24 من أصل {total} نتيجة
                    </div>
                    <div className="flex  items-center">
                        <div className="hidden md:block">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
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
        rounded-xl
        border
        border-[#d8d8d8]
        bg-white
        flex
        items-center
        justify-center
        hover:bg-gray-50
        transition
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
            </div>

            {/* Products */}
            {products.length ? (
                <div
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-x-6
            gap-y-8
        "
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
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
                        <span className="text-4xl">🎨</span>
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
