import { useState } from "react";

import SiteLayout from "@/Layouts/SiteLayout";

import { motion } from "framer-motion";

import ProfileHero from "./ProfileHero";

import ProfileSidebar from "./ProfileSidebar";



import {
    FiPackage,
    FiDollarSign,
    FiClock,
    FiCheckCircle,
} from "react-icons/fi";
import AccountOverview from "./Personal/AccountOverview";
import PersonalDetails from "./Personal/PersonalDetails";
import ContactInformation from "./Personal/ContactInformation";
import AddressInformation from "./Personal/AddressInformation";
import SecuritySettings from "./Personal/SecuritySettings";
import { router, useForm } from "@inertiajs/react";
import MyOrders from "./MyOrders";

export default function Profile({
    user,

    orders,
    profile,

    announcement,
profilePage
}) {
    const [activeTab, setActiveTab] = useState("personal");
    const { data, setData, errors, processing } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: profile?.phone || "",
        second_phone: profile?.second_phone || "",
        birth_date: profile?.birth_date || "",
        gender: profile?.gender || "",
        avatar: profile?.avatar || null,
        country: profile?.country || "",
        governorate: profile?.governorate || "",
        city: profile?.city || "",
        address: profile?.address || "",
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [clientErrors, setClientErrors] = useState({});

    const renderContent = () => {
        switch (activeTab) {
            // case "overview":
            //     return <AccountOverview user={user} orders={orders} />;

            case "personal":
                return (
                    <PersonalDetails
                        data={data}
                        setData={setData}
                        errors={{ ...errors, ...clientErrors }}
                        processing={processing}
                        onSubmit={() => handleSubmit("personal")}
                    />
                );

            case "contact":
                return (
                    <ContactInformation
                        data={data}
                        setData={setData}
                        errors={{ ...errors, ...clientErrors }}
                        processing={processing}
                        onSubmit={() => handleSubmit("contact")}
                    />
                );

            case "addresses":
                return (
                    <AddressInformation
                        data={data}
                        setData={setData}
                        errors={{ ...errors, ...clientErrors }}
                        processing={processing}
                        onSubmit={() => handleSubmit("addresses")}
                    />
                );

            case "security":
                return (
                    <SecuritySettings
                        data={data}
                        setData={setData}
                        errors={{ ...errors, ...clientErrors }}
                        processing={processing}
                        onSubmit={() => handleSubmit("security")}
                    />
                );

            case "orders":
                return <MyOrders orders={orders} />;

            default:
                return (
                    <PersonalDetails
                        data={data}
                        setData={setData}
                        errors={{ ...errors, ...clientErrors }}
                        processing={processing}
                        onSubmit={() => handleSubmit("personal")}
                    />
                );
        }
    };
    const validateSection = (section, data) => {
        const errors = {};

        if (section === "personal") {
            if (!data.name?.trim()) {
                errors.name = "الاسم مطلوب";
            }

            if (data.birth_date && isNaN(Date.parse(data.birth_date))) {
                errors.birth_date = "تاريخ غير صالح";
            }

            if (data.gender && !["male", "female"].includes(data.gender)) {
                errors.gender = "النوع غير صحيح";
            }
        }

        if (section === "contact") {
            if (!data.phone?.trim()) {
                errors.phone = "رقم الهاتف مطلوب";
            }

            if (data.second_phone && data.second_phone.length < 10) {
                errors.second_phone = "رقم غير صالح";
            }
        }

        if (section === "addresses") {
            if (!data.country?.trim()) {
                errors.country = "الدولة مطلوبة";
            }

            if (!data.address?.trim()) {
                errors.address = "العنوان مطلوب";
            }
        }

        if (section === "security") {
            if (!data.current_password) {
                errors.current_password = "كلمة المرور الحالية مطلوبة";
            }

            if (data.password && data.password.length < 8) {
                errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
            }

            if (data.password !== data.password_confirmation) {
                errors.password_confirmation = "كلمات المرور غير متطابقة";
            }
        }

        return errors;
    };
    const submitSection = (section) => {
        switch (section) {
            case "personal":
                return {
                    section: "personal",
                    name: data.name,
                    birth_date: data.birth_date,
                    gender: data.gender,
                    avatar: data.avatar,
                };

            case "contact":
                return {
                    section: "contact",
                    phone: data.phone,
                    second_phone: data.second_phone,
                };

            case "addresses":
                return {
                    section: "address",
                    country: data.country,
                    governorate: data.governorate,
                    city: data.city,
                    address: data.address,
                };

            case "security":
                return {
                    section: "security",
                    current_password: data.current_password,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                };

            default:
                return {};
        }
    };
    const handleSubmit = (section) => {
        const errors = validateSection(section, data);

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            return;
        }

        setClientErrors({});
        router.post(
            "/profile/update-section",
            {
                ...submitSection(section),
                _method: "patch",
            },
            {
                preserveScroll: true,
                forceFormData: true,
            },
        );
    };

    return (
        <SiteLayout title="حسابي" announcement={announcement}>
            <div dir="rtl" className="relative min-h-screen overflow-hidden">
                {/* HERO */}
                <ProfileHero image={profilePage.bg_image} />
                {/* CONTAINER */}
                <div className="relative max-w-8xl mx-auto px-6 py-16">
                    {/* MAIN CONTENT */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-4">
                            <ProfileSidebar
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                user={user}
                                orders={orders}
                            />
                        </div>

                        <div className="lg:col-span-8">
                            <motion.div
                                key={activeTab}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                }}
                                className="
                                bg-white
                                rounded-[40px]
                                border
                                border-gray-200
                                shadow-[0_25px_80px_rgba(0,0,0,0.05)]
                                overflow-hidden
                            "
                            >
                                <div className="p-5 md:p-8">
                                    {renderContent()}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
