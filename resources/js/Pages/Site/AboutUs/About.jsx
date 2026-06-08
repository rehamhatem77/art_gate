import SiteLayout from "@/Layouts/SiteLayout";
import AboutHero from "./AboutHero";
import VisionMission from "./VisionMission";
import  TeamSection from "./TeamSection";
import AboutVideoSection from "./AboutVideoSection";
import FeaturesSection from "../Components/FeaturesSection";
import OurStory from "./OurStory";




export default function About({
    announcement,
   
    services,
}) {

const aboutData = {
    hero_image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000",

    hero_title: "بوابتك نحو عالم الفن والإبداع",

    hero_description:
        "نحن في معرض الفنون نؤمن بأن كل مساحة تستحق لمسة فنية مميزة. نسعى إلى تقديم مجموعة مختارة بعناية من اللوحات والتابلوهات العصرية والإسلامية والكلاسيكية التي تضيف الجمال والدفء إلى منزلك أو مكان عملك. منذ انطلاقنا ونحن نركز على الجودة والتفاصيل الدقيقة لنمنح عملاءنا تجربة فريدة تجمع بين الذوق الرفيع والخدمة المتميزة.",

    vision:
        "أن نصبح الوجهة الأولى لعشاق الفن والديكور في العالم العربي، من خلال تقديم أعمال فنية ملهمة تجمع بين الأصالة والحداثة، وتساهم في تحويل المساحات اليومية إلى أماكن تنبض بالإبداع والجمال.",

    mission:
        "توفير أعمال فنية عالية الجودة تلبي مختلف الأذواق والاحتياجات، مع الالتزام بأفضل معايير الخدمة والتصميم، ودعم الفنانين والمبدعين لإيصال أعمالهم إلى جمهور أوسع.",

    video_cover:     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

    team: [
        {
            id: 1,
            name: "أحمد خالد",
            position: "المؤسس والمدير التنفيذي",
             image: "https://i.pravatar.cc/400?img=1",
        },
        {
            id: 2,
            name: "سارة محمد",
            position: "مديرة التصميم والإبداع",
             image: "https://i.pravatar.cc/400?img=2",
        },
        {
            id: 3,
            name: "محمد علي",
            position: "مدير التسويق",
             image: "https://i.pravatar.cc/400?img=3",
        },
        {
            id: 4,
            name: "ريم حسن",
            position: "مسؤولة خدمة العملاء",
            image: "https://i.pravatar.cc/400?img=4",
        },
    ],
};
    return (
        <SiteLayout
            title="من نحن"
            announcement={announcement}
        >
            <AboutHero aboutData={aboutData} />



            <VisionMission aboutData={aboutData} />
<OurStory/>

            <TeamSection />

            <AboutVideoSection aboutData={aboutData} />

            <FeaturesSection services={services} />
        </SiteLayout>
    );
}