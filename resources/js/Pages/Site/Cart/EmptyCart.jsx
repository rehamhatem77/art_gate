import { FiShoppingCart } from "react-icons/fi";
import { router } from "@inertiajs/react";

export default function EmptyCart() {
    return (
        <div
            className="
                relative
                text-center
                py-24
                px-6
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                overflow-hidden
            "
        >
            {/* soft background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--primary)]/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[var(--primary)]/5 rounded-full blur-[80px]" />
            </div>

            {/* ICON */}
            <div
                className="
                    relative
                    w-24
                    h-24
                    mx-auto
                    rounded-full
                    bg-[var(--primary)]/10
                    border
                    border-[var(--primary)]/10
                    flex
                    items-center
                    justify-center
                    mb-8
                "
            >
                <FiShoppingCart
                    size={34}
                    className="text-[var(--primary)]"
                />
            </div>

            {/* TITLE */}
            <h2
                className="
                    text-3xl
                    md:text-4xl
                    font-semibold
                    text-gray-900
                "
            >
                سلة التسوق فارغة
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-4 max-w-md mx-auto leading-7">
                لم تقم بإضافة أي منتجات بعد. استكشف مجموعتنا الفنية
                واكتشف القطع التي تعجبك.
            </p>

            {/* BUTTON */}
            <button
                onClick={() => router.visit("/shop")}
                className="
                    relative
                    mt-8
                    px-8
                    py-3
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                    font-medium
                    shadow-sm
                    transition-all
                    duration-200
                    hover:shadow-md
                    hover:scale-[1.02]
                    active:scale-[0.98]
                "
            >
                تصفح المنتجات
            </button>
        </div>
    );
}