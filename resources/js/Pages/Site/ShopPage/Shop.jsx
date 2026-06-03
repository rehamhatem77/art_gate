import SiteLayout from "@/Layouts/SiteLayout";
import Hero from "./Hero";
import FilterSidebar from "./FilterSideBar";
import { useState } from "react";
import ProductsSection from "./ProductsSection";

export default function Shop({ categories, tags }) {
 const [filters, setFilters] = useState({
        palettes: [],
        places: [],
        artistic_types: [],
        pieces_count: [],
    });

    const counts = {
        palettes: {},
        places: {},
        artistic_types: {},
        pieces_count: {},
    };
    const products = [
        {
            id: 1,
            code: "is290",
            name: "لوحات زخرفية إسلامية",
            category: "تابلوهات إسلامية",
            price: 260,
            image: "/images/p1.jpg",
        },
        {
            id: 2,
            code: "is44",
            name: "آية قرآنية بإطار خشبي",
            category: "تابلوهات إسلامية",
            price: 180,
            image: "/images/p2.jpg",
        },
        {
            id: 3,
            code: "sun30",
            name: "غروب فني حديث",
            category: "مناظر طبيعية",
            price: 130,
            image: "/images/p3.jpg",
        },
 {
            id: 4,
            code: "is290",
            name: "لوحات زخرفية إسلامية",
            category: "تابلوهات إسلامية",
            price: 260,
            image: "/images/p1.jpg",
        },
        {
            id: 5,
            code: "is44",
            name: "آية قرآنية بإطار خشبي",
            category: "تابلوهات إسلامية",
            price: 180,
            image: "/images/p2.jpg",
        },
        {
            id: 6,
            code: "sun30",
            name: "غروب فني حديث",
            category: "مناظر طبيعية",
            price: 130,
            image: "/images/p3.jpg",
        },
    ];

    return (
        <SiteLayout title="المتجر">
            <Hero categories={categories} tags={tags} />

            <div className=" max-w-7xl mx-auto px-4 py-8">
                <div className=" flex flex-col lg:flex-row gap-8 ">
                    {/* SIDEBAR */}
                    <aside className=" w-full lg:w-[280px] shrink-0 ">
                        <div className="sticky top-6 bg-[#f3f3f3]
        border
        border-[#e1e1e1]
        rounded-lg
        p-4
        w-full">
                            <FilterSidebar
                                filters={filters}
                                setFilters={setFilters}
                                counts={counts}
                            />
                        </div>
                    </aside>

                    {/* PRODUCTS */}
                    <main className="flex-1">
                         <ProductsSection products={products} filters={filters}
    setFilters={setFilters}/>
                    </main>
                </div>
            </div>
        </SiteLayout>
    );
}
