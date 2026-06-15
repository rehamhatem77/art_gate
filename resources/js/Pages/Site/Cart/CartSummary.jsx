import { FiArrowLeft } from "react-icons/fi";
import { router, usePage } from "@inertiajs/react";

export default function CartSummary({ subtotal, shipping, total }) {
    const { auth } = usePage().props;
    const goToCheckout = () => {
        if (auth.user) {
            router.visit(route("checkout.index"));

            return;
        }

        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

        router.post(
            route("checkout.sync"),

            {
                items: guestCart,
            },

            {
                onSuccess: () => {
                    router.visit(route("checkout.index"));
                },
            },
        );
    };
    return (
        <div
            className="
        sticky
        top-28
        self-start
        h-fit

        bg-white
        rounded-[28px]
        border
        shadow-sm
        p-6
    "
        >
            <h3
                className="
                    text-xl
                    font-bold
                    text-[var(--primary)]
                    mb-6
                "
            >
                ملخص الطلب
            </h3>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-500">المجموع الفرعي</span>

                    <span>{subtotal.toLocaleString()} جنيه</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">الشحن</span>

                    <span>{shipping === 0 ? "مجاني" : `${shipping} جنيه`}</span>
                </div>

                <div
                    className="
                        border-t
                        pt-4
                        flex
                        justify-between
                        font-bold
                        text-lg
                    "
                >
                    <span>الإجمالي</span>

                    <span className="text-[var(--secondary)]">
                        {total.toLocaleString()} جنيه
                    </span>
                </div>
            </div>

            <button
                onClick={goToCheckout}
                className="
                    w-full
                    h-14
                    mt-6
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                    font-semibold
                "
            >
                متابعة إلى الدفع
            </button>

            <button
                onClick={() => router.visit("/shop")}
                className="
                    w-full
                    h-12
                    mt-3
                    rounded-full
                    border
                "
            >
                <FiArrowLeft className="inline ml-2" />
                متابعة التسوق
            </button>
        </div>
    );
}
