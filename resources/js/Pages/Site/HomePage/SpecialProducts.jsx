import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { AnimatePresence, motion } from "framer-motion";
import { router } from "@inertiajs/react";
const tabs = ["تابلوهات إسلامية", "تابلوهات الرقمي", "آخر طقم إضافة"];

// const products = [
//     {
//         id: 80,
//         name: "تابلوهات مودرن - أفكار الوان عصرية",
//         category: "تابلوهات إسلامية, تابلوه عام ثلاثة",
//         price: "130.00",
//         image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200",
//     },
//     {
//         id: 79,
//         name: "تابلوهات مودرن - دعاء الصبر",
//         category: "تابلوهات إسلامية, تابلوه عام ثلاثة",
//         price: "130.00",
//         image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200",
//     },
//     {
//         id: 78,
//         name: "تابلوه كلاسيك - فاتحة الكتاب",
//         category: "تابلوهات إسلامية, تابلوه عام واحد",
//         price: "130.00",
//         image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200",
//     },
//     {
//         id: 77,
//         name: "تابلوه اسم الله كلاسيك",
//         category: "تابلوهات إسلامية, تابلوه عام واحد",
//         price: "130.00",
//         image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200",
//     },
// ];

export default function SpecialProducts({
    specialSection,
    latestProducts = [],
    topCategories = [],
    categoryProducts = [],
}) {
    const [activeTab, setActiveTab] = useState("latest");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const tabs = [
        { key: "latest", name: "أخر ماتم اضافته" },
        ...categoryProducts.map((cat) => ({
            key: cat.key,
            name: ` تابلوهات ${cat.name}`,
        })),

    ];
    const getProducts = () => {
        if (activeTab === "latest") {
            return latestProducts;
        }

        const category = categoryProducts.find((cat) => cat.key === activeTab);

        return category?.products || [];
    };

    const products = getProducts();
    useEffect(() => {
    if (selectedProduct) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return () => {
        document.body.style.overflow = "auto";
    };
}, [selectedProduct]);
    return (
        <section className="py-16 lg:py-24 bg-[#faf8f5]">
            <div className="max-w-8xl mx-auto px-8 sm:px-12 md:px-12 lg:px-18 xl:px-28">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <span className="text-[#b4a79a] text-xl font-medium block mb-2">
                        {specialSection?.special_section_subtitle
                            ? specialSection.special_section_subtitle
                            : " تشكيل حصري"}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4">
                        {specialSection?.special_section_title
                            ? specialSection.special_section_title
                            : " تابلوهات مميزة"}
                    </h2>

                    <p className="text-[var(--text-dark)] text-lg">
                        {specialSection?.special_section_description
                            ? specialSection.special_section_description
                            : " تجربة تمنح مساحة ومرونة لا مثيل لها"}
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center gap-10 mb-14 flex-wrap"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative text-xl transition pb-3 ${activeTab === tab.key
                                    ? "text-[var(--secondary)] font-semibold"
                                    : "text-[var(--accent)]"
                                }`}
                        >
                            {tab.name}

                            {activeTab === tab.key && (
                                <span className="absolute bottom-0 right-0 left-0 h-[3px] bg-[var(--secondary)] rounded-full" />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Products */}
                <div
                    className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
        lg:gap-8
    "
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={setSelectedProduct}
                        />
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    {selectedProduct && (
                        <QuickViewModal
                            product={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mt-12"
                >
                    <button
                        onClick={() => router.get('/shop')}
                        className="
            px-8
            py-3
            rounded-full
            bg-[var(--primary)]
            text-white
            font-semibold
            hover:opacity-90
            transition-all
        "
                    >
                        عرض الكل
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
