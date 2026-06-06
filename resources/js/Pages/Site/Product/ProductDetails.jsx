import SiteLayout from "@/Layouts/SiteLayout";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductCard from "../HomePage/ProductCard";
import AdditionalInfo from "./AdditionalInfo";
import { usePage } from "@inertiajs/react";
import FeaturesSection from "../Components/FeaturesSection";
import RecentlyViewedSection from "../Components/RecentlyViewedSection";

export default function ProductDetails({
    product,
    relatedProducts,
}) {
    const { services } = usePage().props;
        const { announcement } = usePage().props;
    return (
        <SiteLayout title={product.name} announcement={announcement}>
            <div className="px-4 py-8">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>

                <div  className="
                mt-20
                border-t
                border-gray-200
                
            "/>
            <div className="max-w-7xl mx-auto ">

                <AdditionalInfo product={product} />
</div>
                {relatedProducts?.length > 0 && (
                    <>
                     <div  className="
                mt-10
                border-t
                border-gray-200
                
            "/>
                    <section className="max-w-7xl mx-auto  mt-10  ">
                        <h2 className="text-3xl font-bold text-start mb-10 ">
                            منتجات ذات صلة
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </section></>
                )}

            <FeaturesSection services={services} />
            <RecentlyViewedSection />

            </div>
        </SiteLayout>
    );
}