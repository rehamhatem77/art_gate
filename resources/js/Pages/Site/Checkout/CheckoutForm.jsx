import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function CheckoutForm({
    user,
    data,

    setData,

    frontendErrors,

    errors,
}) {
    // const { data, setData, post, processing, errors } = useForm({
    //     name: user?.name || "",
    //     email: user?.email || "",
    //     phone: user?.phone || "",
    //     second_phone: "",
    //     country: "مصر",
    //     governorate: "",
    //     area: "",
    //     address: "",
    //     notes: "",
    //     payment: "cod",
    // });
    // const [frontendErrors, setFrontendErrors] = useState({});
    // const validate = () => {
    //     let errors = {};

    //     if (!data.name.trim()) {
    //         errors.name = "الاسم بالكامل مطلوب";
    //     }

    //     if (!data.phone.trim()) {
    //         errors.phone = "رقم الهاتف مطلوب";
    //     } else if (!/^01[0125][0-9]{8}$/.test(data.phone)) {
    //         errors.phone = "رقم هاتف غير صحيح";
    //     }

    //     if (
    //         data.second_phone &&
    //         !/^01[0125][0-9]{8}$/.test(data.second_phone)
    //     ) {
    //         errors.second_phone = "رقم الهاتف الإضافي غير صحيح";
    //     }

    //     if (!data.email.trim()) {
    //         errors.email = "البريد الإلكتروني مطلوب";
    //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    //         errors.email = "البريد الإلكتروني غير صحيح";
    //     }

    //     if (!data.governorate) {
    //         errors.governorate = "اختر المحافظة";
    //     }

    //     if (!data.area.trim()) {
    //         errors.area = "المنطقة مطلوبة";
    //     }

    //     if (!data.address.trim()) {
    //         errors.address = "العنوان مطلوب";
    //     }

    //     setFrontendErrors(errors);

    //     return Object.keys(errors).length === 0;
    // };
    // const submit = (e) => {
    //     e.preventDefault();

    //     if (!validate()) {
    //         return;
    //     }

    //     post(route("checkout.store"));
    // };

    const inputStyle = `
w-full
h-12
rounded-xl
border
border-gray-300
px-6
outline-none
text-sm
transition
border border-[#e8dfd7]
                                            
                                           
                                         
                                            focus:ring-0
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]
`;

    const labelStyle = `
text-sm
font-medium
text-[var(--primary)]
mb-2
block
`;

    return (
        // <form onSubmit={submit}>
        <div>
            <div
                className="
bg-white/40

rounded-[28px]

border

border-gray-100

shadow-sm

p-4

sm:p-6

md:p-8

space-y-6

md:space-y-7
"
            >
                {/* TITLE */}

                <h2
                    className="
text-2xl
sm:text-3xl
font-bold
text-[var(--primary)]
text-start
"
                >
                    تفاصيل الفاتورة
                </h2>

                {/* NAME */}

                <div>
                    <label className={labelStyle}>الاسم بالكامل *</label>

                    <input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="اسمك بالكامل"
                        className={inputStyle}
                    />
                    {frontendErrors.name && (
                        <p className="mt-2 text-xs text-red-500">
                            {frontendErrors.name}
                        </p>
                    )}
                </div>

                {/* PHONES */}

                <div
                    className="
grid

grid-cols-1

sm:grid-cols-2

gap-4

md:gap-5
"
                >
                    <div>
                        <label className={labelStyle}>رقم الهاتف *</label>

                        <input
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            placeholder="رقم الهاتف للتواصل"
                            className={inputStyle}
                        />
                        {frontendErrors.phone && (
                            <p className="mt-2 text-xs text-red-500">
                                {frontendErrors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>رقم هاتف إضافي</label>

                        <input
                            value={data.second_phone}
                            onChange={(e) =>
                                setData("second_phone", e.target.value)
                            }
                            placeholder="رقم هاتف احتياطي"
                            className={inputStyle}
                        />
                        {frontendErrors.second_phone && (
                            <p className="mt-2 text-xs text-red-500">
                                {frontendErrors.second_phone}
                            </p>
                        )}
                    </div>
                </div>

                {/* EMAIL */}

                <div>
                    <label className={labelStyle}>البريد الإلكتروني *</label>

                    <input
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="البريد الإلكتروني"
                        className={inputStyle}
                    />
                    {frontendErrors.email && (
                        <p className="mt-2 text-xs text-red-500">
                            {frontendErrors.email}
                        </p>
                    )}
                </div>

                {/* COUNTRY + GOVERNORATE */}

                <div
                    className="
grid

grid-cols-1

sm:grid-cols-2

gap-4

md:gap-5
"
                >
                    <div>
                        <label className={labelStyle}>الدولة / المنطقة *</label>

                        <div className="relative">
                            <select
                                value={data.country}
                                onChange={(e) =>
                                    setData("country", e.target.value)
                                }
                                className={inputStyle}
                            >
                                <option>مصر</option>
                            </select>

                            <FiChevronDown
                                className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
pointer-events-none
"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyle}>المحافظة *</label>

                        <select
                            value={data.governorate}
                            onChange={(e) =>
                                setData("governorate", e.target.value)
                            }
                            className={inputStyle}
                        >
                            <option value="">حدد المحافظة</option>

                            <option>القاهرة</option>

                            <option>الجيزة</option>

                            <option>الإسكندرية</option>
                        </select>
                        {frontendErrors.governorate && (
                            <p className="mt-2 text-xs text-red-500">
                                {frontendErrors.governorate}
                            </p>
                        )}
                    </div>
                </div>

                {/* AREA */}

                <div>
                    <label className={labelStyle}>المنطقة *</label>

                    <input
                        value={data.area}
                        onChange={(e) => setData("area", e.target.value)}
                        placeholder="المنطقة"
                        className={inputStyle}
                    />
                    {frontendErrors.area && (
                        <p className="mt-2 text-xs text-red-500">
                            {frontendErrors.area}
                        </p>
                    )}
                </div>

                {/* ADDRESS */}

                <div>
                    <label className={labelStyle}>العنوان *</label>

                    <input
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        placeholder="العنوان بالتفصيل (اسم الشارع ورقم العقار وأي علامات مميزة لتسهيل التوصيل)"
                        className={inputStyle}
                    />
                    {frontendErrors.address && (
                        <p className="mt-2 text-xs text-red-500">
                            {frontendErrors.address}
                        </p>
                    )}
                </div>

                {/* ACCOUNT */}

                {/* <div className="space-y-4">
                    <div
                        className="
flex
items-center
gap-3
"
                    >
                        <input
                            type="checkbox"
                            checked={data.create_account}
                            onChange={(e) =>
                                setData("create_account", e.target.checked)
                            }
                        />

                        <span>هل تريد إنشاء حساب جديد ؟</span>
                    </div>

                    <div
                        className="
flex
items-center
gap-3
"
                    >
                        <input
                            type="checkbox"
                            checked={data.coupon}
                            onChange={(e) =>
                                setData("coupon", e.target.checked)
                            }
                        />

                        <span>هل يوجد كود خصم للمنتج ؟</span>
                    </div>
                </div> */}

                {/* NOTES */}

                <div>
                    <label className={labelStyle}>
                        ملاحظات الطلب (اختياري)
                    </label>

                    <textarea
                        rows={4}
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        placeholder="ملاحظات حول الطلب، مثل ملاحظات خاصة بالتسليم."
                        className="
w-full
rounded-md
border
border-gray-300
p-4
outline-none
focus:ring-0
                                            focus:ring-[var(--primary)]
                                            focus:border-[var(--primary)]

"
                    />
                </div>
            </div>

            {/* PAYMENT */}

            {/* <div
                className="
mt-8
bg-white
rounded-3xl
border
p-8
"
            >

                <h3
                    className="
text-2xl
font-bold
mb-6
"
                >

                    طريقة الدفع

                </h3>

                <div
                    className="
border
rounded-xl
bg-gray-50
p-5
"
                >

                    الدفع عند الاستلام مباشرة.

                </div>

                <button
                    disabled={processing}
                    className="
mt-8

w-full

h-14

rounded-full

bg-[var(--primary)]

text-white

font-bold

text-lg

hover:opacity-90

transition
"
                >

                    تأكيد الطلب

                </button>

            </div> */}
            {/* </form> */}
        </div>
    );
}
