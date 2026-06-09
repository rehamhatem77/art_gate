import SiteLayout from "@/Layouts/SiteLayout";

import FeaturesSection from "../Components/FeaturesSection";

import RecentlyViewedSection from "../Components/RecentlyViewedSection";
import useRecentlyViewed from "@/Hooks/useRecentlyViewed";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap ";




export default function Contact({
    announcement, services
}) {


    const recentProducts =
        useRecentlyViewed();
    return (
        <SiteLayout
            title="اتصل بنا"
            announcement={announcement}
        >
      <div className=" min-h-screen">

      {/* HERO */}
      <ContactHero />

      {/* CONTENT */}
      <section className="max-w-8xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-[1fr_1fr] items-start gap-10">

        {/* FORM */}
        <ContactForm />

        {/* INFO */}
        <ContactInfo />

      </section>
    </div>
    <ContactMap />
            

            <FeaturesSection services={services} />
            <RecentlyViewedSection recentProducts={recentProducts} />

        </SiteLayout>
    );
}