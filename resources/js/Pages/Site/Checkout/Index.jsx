import SiteLayout from "@/Layouts/SiteLayout";

import CartHeader from "../Cart/CartHeader";

import OrderSummary from "./OrderSummary";

import CheckoutForm from "./CheckoutForm";

import { motion } from "framer-motion";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 25,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.55,
            ease: "easeOut",
        },
    },
};

export default function Checkout({
    announcement,
    user,
    cartItems,
    subtotal,
    shipping,
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || "",

        email: user?.email || "",

        phone: user?.phone || "",

        second_phone: "",

        country: "مصر",

        governorate: "",

        area: "",

        address: "",

        notes: "",

        payment: "cod",
    });
    const [frontendErrors, setFrontendErrors] = useState({});
    const validate = () => {
        let errors = {};

        if (!data.name.trim()) {
            errors.name = "الاسم بالكامل مطلوب";
        }

        if (!data.phone.trim()) {
            errors.phone = "رقم الهاتف مطلوب";
        } else if (!/^01[0125][0-9]{8}$/.test(data.phone)) {
            errors.phone = "رقم الهاتف غير صحيح";
        }

        if (
            data.second_phone &&
            !/^01[0125][0-9]{8}$/.test(data.second_phone)
        ) {
            errors.second_phone = "رقم الهاتف الإضافي غير صحيح";
        }

        if (!data.email.trim()) {
            errors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "البريد الإلكتروني غير صحيح";
        }

        if (!data.governorate) {
            errors.governorate = "اختر المحافظة";
        }

        if (!data.area.trim()) {
            errors.area = "المنطقة مطلوبة";
        }

        if (!data.address.trim()) {
            errors.address = "العنوان مطلوب";
        }

        return errors;
    };

    const submitOrder = () => {
        const validationErrors = validate();

        setFrontendErrors(validationErrors);

        if (Object.keys(validationErrors).length) {
            return;
        }

        post(route("checkout.store"), {

    onSuccess: () => {

        localStorage.removeItem("cart");

        localStorage.removeItem("checkout_items");

    },

});
    };
    return (
        <SiteLayout title="اتمام الطلب" announcement={announcement}>
            <CartHeader currentStep={2} />

            <section
                className="
                py-2
                sm:py-4
                md:py-6
                lg:py-8
                "
            >
                <div
                    className="
                    max-w-8xl

                    mx-auto

                    px-6

                    sm:px-8

                    lg:px-12
                    "
                >
                    <div
                        className="
                        grid

                        gap-5

                        lg:gap-8

                        lg:grid-cols-2
                        "
                    >
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}
                            className="
                            order-2

                            lg:order-2
                            "
                        >
                            <OrderSummary
                                items={cartItems}
                                subtotal={subtotal}
                                shipping={shipping}
                                submitOrder={submitOrder}
                                processing={processing}
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}
                            transition={{
                                delay: 0.15,
                            }}
                            className="
                            order-1

                            lg:order-1
                            "
                        >
                            <CheckoutForm
                                user={user}
                                data={data}
                                setData={setData}
                                frontendErrors={frontendErrors}
                                errors={errors}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
}
