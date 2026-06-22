import axios from "axios";

export async function mergeGuestCart() {

    const guestCart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    if (!guestCart.length) {
        return;
    }

    try {

        await axios.post(
            route("cart.merge"), {
                cart: guestCart,
            }
        );

        localStorage.removeItem("cart");

        window.dispatchEvent(
            new Event("cart-updated")
        );

    } catch (error) {

        console.log(error);

    }
}