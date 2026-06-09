import SiteLayout from "@/Layouts/SiteLayout";
import AboutHero from "./AboutHero";
import VisionMission from "./VisionMission";
import TeamSection from "./TeamSection";
import AboutVideoSection from "./AboutVideoSection";
import FeaturesSection from "../Components/FeaturesSection";
import OurStory from "./OurStory";
import RecentlyViewedSection from "../Components/RecentlyViewedSection";
import useRecentlyViewed from "@/Hooks/useRecentlyViewed";




export default function About({
    announcement, services, aboutPage
}) {


    const recentProducts =
        useRecentlyViewed();
    return (
        <SiteLayout
            title="من نحن"
            announcement={announcement}
        >
            <AboutHero hero={aboutPage.hero} />



            <VisionMission section={aboutPage.visionMission} />
            <OurStory section={aboutPage.story} />

            {aboutPage?.team.length>0 && (<TeamSection team={aboutPage.team} />)}

           {aboutPage?.video && ( <AboutVideoSection section={aboutPage.video} />)}

            <FeaturesSection services={services} />
            <RecentlyViewedSection recentProducts={recentProducts} />

        </SiteLayout>
    );
}