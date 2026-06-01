import AnnouncementBar from "@/Components/AnnouncementBar";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";

export default function SiteLayout({ children, title ,announcement }) {
    const auth=usePage().props.auth; 

  return (
    <>
      <Head title={title || "ArtGate"} />

      <div
        dir="rtl"
      >
        <AnnouncementBar announcement={announcement} />
        
        <Navbar auth={auth}/>

        <main className="flex-grow">
          {children}
        </main>

         <Footer />
          {/* <WhatsAppButton /> */}
      </div>
    </>
  );
}
