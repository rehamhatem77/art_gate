
export const getGuestCart = () => {
    return JSON.parse(
        localStorage.getItem("cart") || "[]"
    );
};

export const saveGuestCart = (cart) => {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.dispatchEvent(
        new CustomEvent("cart-updated")
    );
};

export const updateGuestCartItem = (
    cartId,
    quantity
) => {
    const cart = getGuestCart();

    const item = cart.find(
        x => x.id === cartId
    );

    if (item) {
        item.quantity = quantity;
    }

    saveGuestCart(cart);
};

export const removeGuestCartItem = (
    cartId
) => {
    const cart = getGuestCart().filter(
        x => x.id !== cartId
    );

    saveGuestCart(cart);
};