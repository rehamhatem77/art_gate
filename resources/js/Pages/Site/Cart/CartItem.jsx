import { motion } from "framer-motion";
import {
    FiMinus,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";
import { getImage } from "@/Utils/GetImage";
import { router } from "@inertiajs/react";

export default function CartItem({
    item,
    updateQuantity,
    removeItem,
}) {
    
    return (
        <motion.div
            onClick={() =>
                router.visit(route("shop.product.show", item.product?.slug || item.slug))
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}

            className="
                bg-white
                rounded-[28px]
                border
                shadow-sm
                p-5
            "
        >
            <div className="flex flex-col md:flex-row gap-5">

                <img
                    src={getImage(
                        item.product?.image || item.image
                    )}
                    alt={item.product?.name || item.name}
                    className="
                        w-full
                        md:w-32
                        h-32
                        rounded-3xl
                        object-cover
                    "
                />

                <div className="flex-1">

                    <h3
                        className="
                            text-lg
                            font-bold
                            text-[var(--primary)]
                        "
                    >
                        {item.product?.name || item.name}
                    </h3>

                    <div
                        className="
                            mt-2
                            text-sm
                            text-gray-500
                            space-y-1
                        "
                    >
                        <p>
                            المقاس : {item.variant?.size?.label ||
                                item.size}
                        </p>

                        <p>
                            الإطار : {item.variant?.frame?.type ||
                                item.frame}
                        </p>
                        {(
                            item.frame_color?.code ||
                            item.frame_color_code
                        ) && (
                                <div className="flex items-center gap-2">
                                    <span>لون الإطار :</span>

                                    <div
                                        className="w-4 h-4 rounded-full border"
                                        style={{
                                            backgroundColor:
                                                item.frame_color?.code ||
                                                item.frame_color_code,
                                        }}
                                    />

                                    <span>
                                        {item.frame_color?.name ||
                                            item.frame_color_name}
                                    </span>
                                </div>
                            )}

                        {/* <p>
                            المتاح : item.variant?.stock ||
item.stock
                        </p> */}
                    </div>

                    <div
                        className="
                            mt-4
                            flex
                            flex-wrap
                            gap-4
                            items-center
                            justify-between
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                w-32
                                h-11
                                border
                                rounded-full
                                px-3
                            "
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(
                                        item,
                                        item.quantity - 1
                                    );
                                }}
                                disabled={
                                    item.quantity <= 1
                                }
                            >
                                <FiMinus />
                            </button>

                            <span>
                                {item.quantity}
                            </span>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(
                                        item,
                                        item.quantity + 1
                                    );
                                }}
                                disabled={item.quantity >= (item.variant?.stock || item.stock || 999)}
                            >
                                <FiPlus />
                            </button>
                        </div>

                        <div className="flex items-center gap-5">
                            <div
                                className="
                                    font-bold
                                    text-lg
                                    text-[var(--secondary)]
                                "
                            >
                                {(
                                    (
                                        item.variant?.price ||
                                        item.price
                                    ) * item.quantity
                                ).toLocaleString()}
                                {" "}
                                جنيه
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(item.id);
                                }}
                                className="
                                    text-red-500
                                    hover:text-red-700
                                "
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}