import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="إنشاء حساب" />

            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-2">
                    إنشاء حساب
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                    ابدأ رحلتك الفنية الآن وانضم إلى عالم الإبداع
                    والجمال.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-3">


                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        الاسم الكامل
                    </label>

                    <div className="relative">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                            placeholder="أدخل اسمك الكامل"
                            className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                        />

                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaUser className="h-4 w-4" />
                        </span>
                    </div>

                    {errors.name && (
                        <p className="text-red-500 text-xs">
                            {errors.name}
                        </p>
                    )}
                </div>


                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        البريد الإلكتروني
                    </label>

                    <div className="relative">
                        <input
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
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


                    <div>
                        <label className="block my-2 font-medium text-gray-700">
                            تأكيد كلمة المرور
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={data.password_confirmation}
                                placeholder="••••••••"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] transition"
                            >
                                {showConfirmPassword ? (
                                    <BsEyeSlash className="h-5 w-5" />
                                ) : (
                                    <BsEye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    disabled={processing}
                    className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
                >
                    إنشاء الحساب <span>←</span>
                </button>


                <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex-1 border-t"></div>
                    أو عبر
                    <div className="flex-1 border-t"></div>
                </div>


                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="button"
                        className="h-12 border rounded-xl text-sm text-white bg-red-700 font-bold hover:opacity-90 transition duration-300 shadow-sm"
                    >
                        Google
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                    لديك حساب بالفعل؟{" "}
                    <Link
                        href={route("login")}
                        className="text-[var(--primary)] font-bold"
                    >
                        تسجيل الدخول
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}