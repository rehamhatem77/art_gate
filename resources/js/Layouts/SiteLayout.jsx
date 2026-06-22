import AnnouncementBar from "@/Components/AnnouncementBar";
import FlashToast from "@/Components/FlashToast";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { mergeGuestCart } from "@/Utils/MergeCart";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({ children, title, announcement }) {
    const auth = usePage().props.auth;
    useEffect(() => {
        if (!auth.user) return;

        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!guestCart.length) return;

        const merge = async () => {
            await mergeGuestCart();

            router.reload();
        };

        merge();
    }, [auth.user]);

    return (
        <>
            <Head title={title || "ArtGate"} />

            <div dir="rtl">
                <AnnouncementBar announcement={announcement} />

                <Navbar auth={auth} />

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
