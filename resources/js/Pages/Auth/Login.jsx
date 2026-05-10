import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />
            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-2">تسجيل الدخول</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                    مرحباً بك مجدداً. استكمل رحلتك في عالم الإبداع
                    والجمال.
                </p>
            </div>

            {status && (
                <div className="mb-1 text-green-600 text-sm">{status}</div>
            )}

            <form onSubmit={submit} className="space-y-3">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        البريد الإلكتروني
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="example@artgate.com"
                            className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <MdEmail className="h-5 w-5" />
                        </span>
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block my-2 font-medium text-gray-700">
                        كلمة المرور
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            placeholder="••••••••"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] transition"
                        >
                            {showPassword ? (
                                <BsEyeSlash className="h-5 w-5" />
                            ) : (
                                <BsEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="flex justify-between text-sm items-center">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="w-4 h-4 border-gray-300 rounded"
                        />
                        تذكرني دائمًا
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-[var(--primary)]  font-medium hover:text-[var(--primary)]/20 hover:underline transition"
                        >
                            {" "}
                            نسيت كلمة المرور؟{" "}
                        </Link>
                    )}{" "}
                </div>

                <button
                    disabled={processing}
                    className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
                >
                    تسجيل الدخول <span>←</span>
                </button>

                <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex-1 border-t"></div>
                    أو عبر
                    <div className="flex-1 border-t"></div>
                </div>

                {/* Social */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="button"
                        className="h-12 border rounded-xl text-sm text-white bg-red-700 font-bold hover:opacity-90 transitions duration-300 shadow-sm"
                    >
                        Google
                    </button>
                    {/* <button
                        type="button"
                        className="h-12 border rounded-xl text-sm"
                    >
                        Apple
                    </button> */}
                </div>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    ليس لديك حساب؟{" "}
                    <Link
                        href={route("register")}
                        className="text-[var(--primary)] font-bold"
                    >
                        إنشاء حساب
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
