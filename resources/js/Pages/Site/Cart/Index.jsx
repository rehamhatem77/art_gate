import SiteLayout from "@/Layouts/SiteLayout";
import { router, usePage } from "@inertiajs/react";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { motion } from "framer-motion";
import { FiShoppingBag, FiTruck } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Index({ cartItems = [], announcement }) {

    const { auth } = usePage().props;

    const [guestCartItems, setGuestCartItems] = useState([]);
    const [loading, setLoading] = useState(!auth.user);

    /* ================= LOAD GUEST CART ================= */
    useEffect(() => {
        if (!auth.user) {
            const loadCart = () => {
                const cart =
                    JSON.parse(localStorage.getItem("cart")) || [];

                setGuestCartItems(cart);
                setLoading(false);
            };

            loadCart();

            window.addEventListener("cart-updated", loadCart);

            return () =>
                window.removeEventListener("cart-updated", loadCart);
        }
    }, [auth.user]);

    const items = auth.user ? cartItems : guestCartItems;

    /* ================= PRICING ================= */
    const subtotal = items.reduce((sum, item) => {
        const price = auth.user ? item.variant.price : item.price;
        return sum + item.quantity * price;
    }, 0);

    const shipping = subtotal >= 2000 ? 0 : 100;
    const total = subtotal + shipping;

    /* ================= AUTH CART ================= */
    const updateQuantity = (item, quantity) => {
        if (quantity < 1) return;

        router.patch(
            route("cart.update", item.id),
            { quantity },
            { preserveScroll: true }
        );
    };

    const removeItem = (id) => {
        router.delete(route("cart.destroy", id), {
            preserveScroll: true,
        });
    };

    /* ================= GUEST CART ================= */
    const updateGuestQuantity = (item, quantity) => {
        if (quantity < 1) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updated = cart.map((c) =>
            c.id === item.id ? { ...c, quantity } : c
        );

        localStorage.setItem("cart", JSON.stringify(updated));
        setGuestCartItems(updated);

        window.dispatchEvent(new Event("cart-updated"));
    };

    const removeGuestItem = (key) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const updated = cart.filter((c) => c.id !== key);

        localStorage.setItem("cart", JSON.stringify(updated));
        setGuestCartItems(updated);

        window.dispatchEvent(new Event("cart-updated"));
    };

    /* ================= MOTION ================= */
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const leftSide = {
        hidden: { opacity: 0, x: -30 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    const rightSide = {
        hidden: { opacity: 0, x: 30 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
    };

    /* ================= LOADING GUARD ================= */
    if (loading) {
        return (
            <SiteLayout title="سلة التسوق">
                <CartHeader />
                <div className="h-[50vh] flex items-center justify-center text-gray-400">
                    جاري تحميل السلة...
                </div>
            </SiteLayout>
        );
    }
    return (
        <SiteLayout title="سلة التسوق" announcement={announcement}>
            <CartHeader />

            <section className="min-h-screen ">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

                    {items.length ? (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.2 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >

                            {/* ================= LEFT SIDE ================= */}
                            <motion.div
                                variants={leftSide}
                                className="lg:col-span-2 space-y-4"
                            >

                                {/* HEADER */}
                                <motion.div
                                    variants={item}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-7"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                                <FiShoppingBag
                                                    size={22}
                                                    className="text-[var(--primary)]"
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                                    المنتجات المختارة
                                                </h2>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    مراجعة العناصر داخل السلة
                                                </p>
                                            </div>
                                        </div>

                                        <div className="px-4 py-2 rounded-full bg-gray-50 border text-sm font-medium text-gray-700">
                                            {items.length} منتج
                                        </div>
                                    </div>
                                </motion.div>

                                {/* SHIPPING */}
                                <motion.div
                                    variants={item}
                                    className="
                                        relative
                                        overflow-hidden
                                        bg-gradient-to-r
                                        from-[#f9f4ec]
                                        via-[#fcfaf7]
                                        to-[#f7f2ec]
                                        border
                                        border-[#eadfce]
                                        p-7
                                        rounded-2xl
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >
                                    <div className="absolute top-0 left-0 h-full w-2 bg-[var(--primary)]" />

                                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                        <FiTruck
                                            size={22}
                                            className="text-[var(--primary)]"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            شحن مجاني
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            للطلبات التي تتجاوز
                                            <span className="font-semibold text-[var(--primary)] mx-2">
                                                2000 جنيه
                                            </span>
                                        </p>
                                    </div>
                                </motion.div>

                                {/* PRODUCTS */}
                                <motion.div
                                    variants={container}
                                    className="space-y-5"
                                >
                                    {items.map((itemData, index) => {
                                        const key =
                                            auth.user
                                                ? itemData.id
                                                : itemData.id ||
                                                `${itemData.product_id}-${itemData.variant_id}-${index}`;
                                        return (
                                            <motion.div
                                                key={key}

                                                variants={item}

                                            >
                                                <CartItem
                                                    item={itemData}
                                                    auth={auth}
                                                    updateQuantity={
                                                        auth.user
                                                            ? updateQuantity
                                                            : updateGuestQuantity
                                                    }
                                                    removeItem={
                                                        auth.user
                                                            ? removeItem
                                                            : removeGuestItem
                                                    }
                                                />
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            </motion.div>

                            {/* ================= RIGHT SIDE ================= */}
                            <motion.div
                                variants={rightSide}
                                className="lg:sticky lg:top-28 h-fit"
                            >
                                <CartSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    total={total}
                                />
                            </motion.div>

                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <EmptyCart />
                        </motion.div>
                    )}

                </div>
            </section>
        </SiteLayout>
    );
}