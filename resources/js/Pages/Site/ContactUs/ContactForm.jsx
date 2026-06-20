import { motion } from "framer-motion";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const { data, setData, post, processing, reset, errors: serverErrors } =
        useForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            subject: "",
            message: "",
        });

    const [errors, setErrors] = useState({});

    // ---------------- VALIDATION ----------------
    const validate = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = "الاسم مطلوب";
        } else if (data.name.trim().length < 3) {
            newErrors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
        }

        if (!data.email.trim()) {
            newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = "البريد الإلكتروني غير صحيح";
        }

        if (data.phone && data.phone.length < 8) {
            newErrors.phone = "رقم الهاتف غير صحيح";
        }

        if (!data.message.trim()) {
            newErrors.message = "الرسالة مطلوبة";
        } else if (data.message.trim().length < 10) {
            newErrors.message = "الرسالة قصيرة جدًا";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // ---------------- SUBMIT ----------------
    const submit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        post(route("contact.store"), {
            onSuccess: () => {
                reset();
                setErrors({});

                toast.success("تم إرسال رسالتك بنجاح 💌", {
                    style: {
                        background: "#1f1f1f",
                        color: "#fff",
                        borderRadius: "12px",
                    },
                    iconTheme: {
                        primary: "#b89b72",
                        secondary: "#fff",
                    },
                });
            },

            onError: () => {
                toast.error("حدث خطأ أثناء الإرسال ❌");
            },
        });
    };

    // ---------------- INPUT STYLE HELPER ----------------
    const inputClass = (field) => `
        w-full h-12 rounded-xl px-4 outline-none transition-all border
        ${
            errors[field] || serverErrors?.[field]
                ? "border-red-400 focus:ring-red-400"
                : "border-[#e6dfd7] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
        }
        bg-[#fcfbf9]
    `;

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="bg-white/20 rounded-[32px] border border-[#ece5dc] p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,.04)]"
        >
             <h3 className="mt-3 text-2xl
sm:text-3xl font-bold leading-tight">
                أرسل رسالتك
            </h3>

            <p className="mt-4 text-[var(--accent)] leading-8">
                املأ النموذج التالي وسيتواصل معك فريقنا في أقرب وقت.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-6">

                {/* NAME + EMAIL */}
                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <input
                            type="text"
                            placeholder="الاسم الكامل"
                            value={data.name}
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                            className={inputClass("name")}
                        />
                        {(errors.name || serverErrors?.name) && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name || serverErrors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            value={data.email}
                            onChange={(e) =>
                                setData("email", e.target.value)
                            }
                            className={inputClass("email")}
                        />
                        {(errors.email || serverErrors?.email) && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email || serverErrors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* PHONE + COMPANY */}
                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <input
                            type="text"
                            placeholder="رقم الهاتف"
                            value={data.phone}
                            onChange={(e) =>
                                setData("phone", e.target.value)
                            }
                            className={inputClass("phone")}
                        />
                        {(errors.phone || serverErrors?.phone) && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone || serverErrors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="الشركة (اختياري)"
                            value={data.company}
                            onChange={(e) =>
                                setData("company", e.target.value)
                            }
                            className={inputClass("company")}
                        />
                    </div>
                </div>

                {/* MESSAGE */}
                <div>
                    <textarea
                        placeholder="اكتب رسالتك هنا..."
                        value={data.message}
                        onChange={(e) =>
                            setData("message", e.target.value)
                        }
                        className={`w-full min-h-[220px] rounded-2xl p-5 outline-none resize-none border transition-all ${
                            errors.message || serverErrors?.message
                                ? "border-red-400 focus:ring-red-400"
                                : "border-[#e6dfd7] focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                        } bg-[#fcfbf9]`}
                    />

                    {(errors.message || serverErrors?.message) && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message || serverErrors.message}
                        </p>
                    )}
                </div>

                {/* SUBMIT */}
                <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={processing}
                    type="submit"
                    className="h-14 px-10 rounded-full bg-[var(--primary)] text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                >
                    {processing ? "جارٍ الإرسال..." : "إرسال الرسالة"}
                </motion.button>
            </form>
        </motion.div>
    );
}