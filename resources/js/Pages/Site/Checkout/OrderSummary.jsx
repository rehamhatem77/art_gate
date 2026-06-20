import { getImage } from "@/Utils/GetImage";

import {
    FiCheckCircle,
    FiCreditCard,
    FiTruck,
    FiShield,
} from "react-icons/fi";

export default function OrderSummary({
    items = [],
    subtotal = 0,
    shipping = 0,
    submitOrder,
    processing,
}) {
    const total = subtotal + shipping;

    return (
        <div
            className="
                order-summary-shell

                
            "
        >
            <div
                className="
                    w-full

                    overflow-hidden

                    rounded-[24px]
                    sm:rounded-[28px]

                    bg-[#f3f0ee]

                    border

                    border-gray-100
                "
            >
                {/* HEADER */}

                <div
                    className="
                        px-4
                        sm:px-6
                        md:px-8

                        pt-5
                        md:pt-7
                    "
                >
                    <div className="flex justify-center">
                        <div>
                            <h2
                                className="
                                    text-2xl
                                    md:text-3xl

                                    font-bold
                                "
                            >
                                طلبك
                            </h2>
                        </div>
                    </div>
                </div>

                {/* BODY */}

                <div
                    className="
                        bg-white

                        p-3

                        mx-3
                        my-5

                        sm:mx-5

                        md:mx-8

                        rounded-3xl

                        border

                        border-gray-100
                    "
                >
                    {/* PRODUCTS */}

                    <div
                        className="
                            px-1

                            sm:px-3

                            md:px-6

                            py-4

                            space-y-3
                        "
                    >
                        {items.map((item, index) => (
                            <div
                                key={
                                    item.id ??
                                    `${item.variant_id}-${index}`
                                }
                                className="
                                    flex

                                    items-start

                                    gap-3

                                    p-3

                                    rounded-2xl

                                    bg-[#fafafa]

                                    border

                                    border-gray-100

                                    overflow-hidden
                                "
                            >
                                {/* IMAGE */}

                                <img
                                    src={getImage(item.image)}
                                    alt={item.name}
                                    className="
                                        w-14
                                        h-14

                                        sm:w-16
                                        sm:h-16

                                        md:w-20
                                        md:h-20

                                        rounded-xl

                                        object-cover

                                        shrink-0
                                    "
                                />

                                {/* INFO */}

                                <div className="flex-1 min-w-0">
                                    <div
                                        className="
                                            flex

                                            justify-between

                                            items-start

                                            gap-3
                                        "
                                    >
                                        <h3
                                            className="
                                                flex-1

                                                min-w-0

                                                text-sm

                                                md:text-base

                                                font-semibold

                                                truncate
                                            "
                                        >
                                            {item.name}
                                        </h3>

                                        <span
                                            className="
                                                shrink-0

                                                text-sm

                                                md:text-base

                                                font-bold

                                                text-[var(--primary)]

                                                whitespace-nowrap
                                            "
                                        >
                                            {item.quantity *
                                                item.price}{" "}
                                            ج
                                        </span>
                                    </div>

                                    {/* OPTIONS */}

                                    <div
                                        className="
                                            flex

                                            flex-wrap

                                            gap-2

                                            mt-2
                                        "
                                    >
                                        {item.size && (
                                            <span
                                                className="
                                                    text-[10px]

                                                    md:text-[11px]

                                                    px-2

                                                    py-1

                                                    rounded-full

                                                    bg-white

                                                    border
                                                "
                                            >
                                                {item.size}
                                            </span>
                                        )}

                                        {item.frame && (
                                            <span
                                                className="
                                                    text-[10px]

                                                    md:text-[11px]

                                                    px-2

                                                    py-1

                                                    rounded-full

                                                    bg-white

                                                    border
                                                "
                                            >
                                                {item.frame}
                                            </span>
                                        )}

                                        {item.frame_color_name && (
                                            <span
                                                className="
                                                    text-[10px]

                                                    md:text-[11px]

                                                    px-2

                                                    py-1

                                                    rounded-full

                                                    bg-white

                                                    border
                                                "
                                            >
                                                {
                                                    item.frame_color_name
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <p
                                        className="
                                            mt-2

                                            text-xs

                                            text-gray-500
                                        "
                                    >
                                        {item.quantity} ×{" "}
                                        {item.price} ج
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TOTALS */}

                    <div
                        className="
                            mx-2

                            sm:mx-4

                            md:mx-8

                            border-t

                            border-dashed

                            pt-5

                            space-y-4
                        "
                    >
                        <div
                            className="
                                flex

                                justify-between

                                text-sm

                                md:text-base
                            "
                        >
                            <span className="text-gray-500">
                                المجموع الفرعي
                            </span>

                            <span className="font-semibold">
                                {subtotal} جنيه
                            </span>
                        </div>

                        <div
                            className="
                                flex

                                justify-between

                                text-sm

                                md:text-base
                            "
                        >
                            <div
                                className="
                                    flex

                                    items-center

                                    gap-2

                                    text-gray-500
                                "
                            >
                                <FiTruck />

                                <span>الشحن</span>
                            </div>

                            <span className="font-semibold">
                                {shipping === 0
                                    ? "مجاني"
                                    : `${shipping} جنيه`}
                            </span>
                        </div>
                    </div>

                    {/* TOTAL CARD */}

                    <div
                        className="
                            p-4

                            sm:p-5

                            md:p-8
                        "
                    >
                        <div
                            className="
                                flex

                                flex-col
                                sm:flex-row

                                items-start
                                sm:items-center

                                justify-between

                                gap-4

                                bg-[#fafafa]

                                border

                                rounded-2xl

                                px-5

                                py-4

                                mb-5
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-xs

                                        md:text-sm

                                        text-gray-500
                                    "
                                >
                                    الإجمالي
                                </p>

                                <h3
                                    className="
                                        text-2xl

                                        md:text-3xl

                                        font-bold

                                        text-[var(--primary)]
                                    "
                                >
                                    {total} جنيه
                                </h3>
                            </div>

                            <FiCheckCircle
                                size={32}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        {/* PAYMENT */}

                        <div
                            className="
                                flex

                                items-start

                                gap-3

                                p-4

                                rounded-2xl

                                bg-[#fafafa]

                                border

                                mb-5

                                overflow-hidden
                            "
                        >
                            <div
                                className="
                                    w-10

                                    h-10

                                    rounded-full

                                    bg-green-100

                                    text-green-700

                                    flex

                                    items-center

                                    justify-center

                                    shrink-0
                                "
                            >
                                <FiCreditCard size={18} />
                            </div>

                            <div className="min-w-0">
                                <h4
                                    className="
                                        font-semibold

                                        text-sm

                                        md:text-base
                                    "
                                >
                                    الدفع عند الاستلام
                                </h4>

                                <p
                                    className="
                                        text-xs

                                        md:text-sm

                                        text-gray-500

                                        mt-1
                                    "
                                >
                                    يمكنك الدفع نقداً عند استلام الطلب.
                                </p>
                            </div>
                        </div>

                        {/* GUARANTEE */}

                        <div
                            className="
                                flex

                                items-center

                                gap-2

                                text-xs

                                md:text-sm

                                text-gray-500

                                mb-5
                            "
                        >
                            <FiShield />

                            <span>
                                يتم مراجعة جميع الطلبات قبل الشحن.
                            </span>
                        </div>

                        {/* BUTTON */}

                        <button
                            onClick={submitOrder}
                            disabled={processing}
                            className="
                                w-full

                                h-12
                                sm:h-14

                                rounded-full

                                bg-[var(--primary)]

                                text-white

                                text-sm
                                sm:text-base

                                font-bold

                                shadow-md

                                hover:opacity-90

                                transition
                            "
                        >
                            {processing
                                ? "جاري تأكيد الطلب..."
                                : "تأكيد الطلب"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}