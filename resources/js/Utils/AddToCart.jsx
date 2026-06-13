import { addGuestCart } from "@/Utils/cart";
import { router } from "@inertiajs/react";

const addToCart = () => {

if (!selectedVariant) {
    toast.error("يرجى اختيار المنتج");
    return;
}

if (qty > selectedVariant.stock) {
    toast.error(
        `المتاح فقط ${selectedVariant.stock} قطعة`
    );
    return;
}

if (auth.user) {

    router.post(
        route("cart.store"),
        {
            product_id: product.id,
            variant_id: selectedVariant.id,
            quantity: qty,
        },
        {
            preserveScroll: true,

            onSuccess: () => {

                window.dispatchEvent(
                    new CustomEvent("cart-updated")
                );

                toast.success(
                    "تمت إضافة المنتج إلى السلة بنجاح"
                );
            },

            onError: (errors) => {

                toast.error(
                    errors.message ||
                    Object.values(errors)[0] ||
                    "حدث خطأ أثناء الإضافة"
                );
            },
        }
    );

    return;
}

addGuestCart({
    product,
    variant: selectedVariant,
    quantity: qty,
    size: selectedSize,
    frame: selectedFrame,
});

};
