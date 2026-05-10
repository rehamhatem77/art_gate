import AnnouncementBar from "@/Components/AnnouncementBar";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

export default function SiteLayout({ children, title }) {

  return (
    <>
      <Head title={title || "ArtGate"} />

      <div
        dir="rtl"
      >
        <AnnouncementBar />
        
        <Navbar/>

        <main className="flex-grow">
          {children}
        </main>

         <Footer />
          {/* <WhatsAppButton /> */}
      </div>
    </>
  );
}
