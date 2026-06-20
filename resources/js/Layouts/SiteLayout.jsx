import AnnouncementBar from "@/Components/AnnouncementBar";
import FlashToast from "@/Components/FlashToast";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

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

        <main className="flex-grow  overflow-hidden">
          <FlashToast />
          {children}
        </main>
       

         <Footer />
          {/* <WhatsAppButton /> */}
      </div>
    </>
  );
}
