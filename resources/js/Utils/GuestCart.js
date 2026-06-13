import toast from "react-hot-toast";

export const addGuestCart = ({
product,
variant,
quantity = 1,
size,
frame,
}) => {

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

const existingItem = cart.find(
    item =>
        item.product_id === product.id &&
        item.variant_id === selectedVariant.id &&
        item.frame_color_code ===
            selectedFrameColor?.code
);

if (existingItem) {

    const newQuantity =
        existingItem.quantity + quantity;

    if (newQuantity > variant.stock) {

        toast.error(
            `المتاح فقط ${variant.stock} قطعة`
        );

        return false;
    }

    existingItem.quantity = newQuantity;

} else {

    if (quantity > variant.stock) {

        toast.error(
            `المتاح فقط ${variant.stock} قطعة`
        );

        return false;
    }

  cart.push({
    id: crypto.randomUUID(),

    product_id: product.id,
    variant_id: selectedVariant.id,

    name: product.name,
    image:
        product.main_image ||
        product.images?.[0]?.image,

    slug: product.slug,

    price: selectedVariant.price,

    size: selectedSize,

    frame: selectedFrame,

    frame_color_name:
        selectedFrameColor?.name || null,

    frame_color_code:
        selectedFrameColor?.code || null,

    quantity: qty,

    stock: selectedVariant.stock,
});
}

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

window.dispatchEvent(
    new CustomEvent("cart-updated")
);

toast.success(
    "تمت إضافة المنتج إلى السلة بنجاح"
);

return true;


};
