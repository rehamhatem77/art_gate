// utils/cart.js

import { router } from "@inertiajs/react";

/* ================= AUTH CART ================= */
export const addToAuthCart = ({
    product_id,
    variant_id,
    quantity,
    frame_color_name,
    frame_color_code,
    onSuccess,
    onError,
}) => {
    router.post(
        route("cart.store"),
        {
            product_id,
            variant_id,
            quantity,
            frame_color_name,
            frame_color_code,
        },
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess,
            onError,
        }
    );
};

export const updateAuthCartItem = (id, quantity) => {
    if (quantity < 1) return;

    router.patch(route("cart.update", id), { quantity }, {
        preserveScroll: true,
    });
};

export const removeAuthCartItem = (id) => {
    router.delete(route("cart.destroy", id), {
        preserveScroll: true,
    });
};

/* ================= GUEST CART ================= */
export const getGuestCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveGuestCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToGuestCart = (item) => {
    const cart = getGuestCart();

    const existing = cart.find(
        (c) =>
            c.product_id === item.product_id &&
            c.variant_id === item.variant_id &&
            c.frame_color_code === item.frame_color_code
    );

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push({
            id: crypto.randomUUID(),
            ...item,
        });
    }

    saveGuestCart(cart);

    window.dispatchEvent(new CustomEvent("cart-updated"));
};

export const updateGuestCartItem = (id, quantity) => {
    if (quantity < 1) return;

    const cart = getGuestCart();

    const updated = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
    );

    saveGuestCart(updated);
    window.dispatchEvent(new CustomEvent("cart-updated"));
};

export const removeGuestCartItem = (id) => {
    const cart = getGuestCart();

    const updated = cart.filter((item) => item.id !== id);

    saveGuestCart(updated);
    window.dispatchEvent(new CustomEvent("cart-updated"));
};