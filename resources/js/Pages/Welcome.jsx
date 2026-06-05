import SiteLayout from "@/Layouts/SiteLayout";
import HeroSection from "./Site/HomePage/Hero";
import AboutSection from "./Site/HomePage/About";
import SpecialProducts from "./Site/HomePage/SpecialProducts";
import CategoriesSection from "./Site/HomePage/CategoriesSection";
import FeaturesSection from "./Site/Components/FeaturesSection";
import RecentlyViewedSection from "./Site/Components/RecentlyViewedSection";
import { usePage } from "@inertiajs/react";


export default function Welcome({ auth , categories,featuredServices ,homePageData , latestProducts ,topCategories ,categoryProducts }) {
    const { services } = usePage().props;
    const {announcement} = usePage().props;
    return (
        <>
          <SiteLayout title="الصفحة الرئيسية" announcement={announcement}>
            <HeroSection categories={categories} slides={homePageData.slider}/>
            <AboutSection services={featuredServices } aboutSection={homePageData.aboutSection}/>
            <SpecialProducts specialSection={homePageData.specialSection} latestProducts={latestProducts} topCategories={topCategories} categoryProducts={categoryProducts}/>
            <CategoriesSection categories={categories} categoriesSection={homePageData.categorySection}/>
            <FeaturesSection services={services}/>
            <RecentlyViewedSection/>
            
          </SiteLayout>
        </>
    );
}
