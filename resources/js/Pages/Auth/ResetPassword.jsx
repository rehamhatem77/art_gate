import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="إعادة تعيين كلمة المرور" />

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-2">
                    إعادة تعيين كلمة المرور
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                    قم بإنشاء كلمة مرور جديدة لحماية حسابك
                    واستكمال رحلتك الفنية.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-3">

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

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Password */}
                    <div>
                        <label className="block my-2 font-medium text-gray-700">
                            كلمة المرور الجديدة
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={data.password}
                                placeholder="••••••••"
                                onChange={(e) =>
                                    setData(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className="text-sm focus:border-none transition duration-200 w-full h-10 px-4 bg-[var(--bg-light)] border border-gray-300 rounded-2xl focus:ring-1 focus:ring-[var(--primary)] outline-none"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
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
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
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
                                value={
                                    data.password_confirmation
                                }
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
                            <p className="text-red-500 text-sm">
                                {
                                    errors.password_confirmation
                                }
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <button
                    disabled={processing}
                    className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md mt-2"
                >
                    حفظ كلمة المرور <span>←</span>
                </button>
            </form>
        </GuestLayout>
    );
}