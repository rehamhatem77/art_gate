import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } =
        useForm({
            password: "",
        });

    const [showPassword, setShowPassword] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="تأكيد كلمة المرور" />

            <div className="min-h-[420px] flex flex-col justify-center">

                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-5">
                    <RiShieldKeyholeLine className="w-8 h-8 text-[var(--primary)]" />
                </div>

       
                <div className="mb-5">
                    <h2 className="text-2xl font-bold mb-2">
                        تأكيد كلمة المرور
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        هذه منطقة آمنة داخل المنصة. يرجى تأكيد
                        كلمة المرور الخاصة بك للمتابعة.
                    </p>
                </div>

       
                <form
                    onSubmit={submit}
                    className="space-y-4"
                >

                    <div>
                        <label className="block my-2 font-medium text-gray-700">
                            كلمة المرور
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

             
                    <button
                        disabled={processing}
                        className="w-full h-12 bg-[var(--primary)] text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
                    >
                        تأكيد المتابعة
                        <span>←</span>
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}