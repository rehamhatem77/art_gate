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
        route("cart.store"), {
            product_id,
            variant_id,
            quantity,
            frame_color_name,
            frame_color_code,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess,
            onError,
        },
    );
};

export const updateAuthCartItem = (id, quantity) => {
    if (quantity < 1) return;

    router.patch(
        route("cart.update", id), { quantity }, {
            preserveScroll: true,
        },
    );
};

export const removeAuthCartItem = (id) => {
    router.delete(route("cart.destroy", id), {
        preserveScroll: true,
    });
};

/* ================= GUEST CART ================= */

export const getGuestCartItemQuantity = ({
    product_id,
    variant_id,
    frame_color_code,
}) => {
    const cart = getGuestCart();

    const item = cart.find(
        (c) =>
        c.product_id === product_id &&
        c.variant_id === variant_id &&
        (c.frame_color_code || null) === (frame_color_code || null)
    );

    return item ? item.quantity : 0;
};
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


        (c.frame_color_code || null) === (item.frame_color_code || null)
    );

    const alreadyInCart = existing ? existing.quantity : 0;
    const totalQuantity = alreadyInCart + item.quantity;

    if (totalQuantity > item.stock) {
        return {
            success: false,
            message: alreadyInCart >= item.stock ?
                "تم إضافة كامل الكمية المتاحة للسلة" : `المتاح فقط ${item.stock - alreadyInCart} قطعة`,
        };
    }

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

    return {
        success: true,
    };
};

export const updateGuestCartItem = (id, quantity) => {
    if (quantity < 1) return;

    const cart = getGuestCart();

    const updated = cart.map((item) =>
        item.id === id ? {...item, quantity } : item,
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