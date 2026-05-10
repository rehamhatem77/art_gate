import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { MdEmail } from "react-icons/md";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="نسيت كلمة المرور" />

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-2">
                    نسيت كلمة المرور؟
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                    لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رابط
                    لإعادة تعيين كلمة المرور الخاصة بك.
                </p>
            </div>

            {/* Status */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-8">

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        البريد الإلكتروني
                    </label>

                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData("email", e.target.value)
                            }
                            placeholder="example@artgate.com"
                            className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                        />

                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <MdEmail className="h-5 w-5" />
                        </span>
                    </div>

                    {errors.email && (
                        <p className="text-red-500 text-xs">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    disabled={processing}
                    className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
                >
                    إرسال رابط إعادة التعيين
                    <span>←</span>
                </button>
            </form>
        </GuestLayout>
    );
}