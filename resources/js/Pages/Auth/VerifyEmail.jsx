import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { MdMarkEmailUnread } from "react-icons/md";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="تأكيد البريد الإلكتروني" />

            <div className="min-h-[420px] flex flex-col justify-center">

            
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-5">
                    <MdMarkEmailUnread className="w-8 h-8 text-[var(--primary)]" />
                </div>

          
                <div className="mb-5">
                    <h2 className="text-2xl font-bold mb-2">
                        تأكيد البريد الإلكتروني
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        شكرًا لانضمامك إلينا. قبل البدء، يرجى تأكيد
                        بريدك الإلكتروني عبر الرابط الذي قمنا بإرساله
                        إليك.
                    </p>
                </div>

                {status === "verification-link-sent" && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                        تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني.
                    </div>
                )}

            
                <form onSubmit={submit} className="space-y-4">

                    
                    <button
                        disabled={processing}
                        className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
                    >
                        إعادة إرسال رابط التحقق
                        <span>←</span>
                    </button>

                   
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full h-11 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        تسجيل الخروج
                    </Link>
                </form>
            </div>
        </GuestLayout>
    );
}