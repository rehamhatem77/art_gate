import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section dir="rtl" className={className}>
            <header dir="rtl">
                <h2 className="text-2xl font-bold text-gray-900">
                    المعلومات الشخصية
                </h2>

                <p className="mt-2 text-gray-500 leading-relaxed">
                    قم بتحديث بيانات حسابك الشخصية والبريد الإلكتروني.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="الاسم بالكامل" />

                    <TextInput
                        id="name"
                        className="
        mt-2
        block
        w-full

        rounded-2xl

        border border-[#e8dfd7]
outline-none
        focus:ring-0

                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]
    "
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="البريد الإلكتروني" />

                    <TextInput
                        id="email"
                        type="email"
                          className="
        mt-2
        block
        w-full

        rounded-2xl

        border border-[#e8dfd7]
outline-none
        focus:ring-0

                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]
    "
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm text-orange-600">
                            البريد الإلكتروني غير مفعل.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="
            mr-2

            underline

            hover:text-[var(--primary)]
        "
                            >
                                إعادة إرسال رابط التفعيل
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div
                                className="
            mt-4

            rounded-xl

            bg-green-50

            p-4

            text-green-700
        "
                            >
                                تم إرسال رابط تفعيل جديد إلى بريدك الإلكتروني.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="
        rounded-2xl

        px-8

        py-3

        text-base
    "
                    >
                        حفظ التعديلات
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition duration-300"
                        leave="transition duration-300"
                    >
                        <p className="text-green-600 font-medium">
                            تم الحفظ بنجاح
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
