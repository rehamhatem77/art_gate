
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import SectionCard from "@/Components/SectionCard";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Breadcrumb from "@/Components/Breadcrumb";

import {
    FiMail,
} from "react-icons/fi";

const fieldLabels = {
    // HERO
    hero_title: "عنوان الهيرو",
    hero_subtitle: "العنوان الفرعي",
    hero_description: "الوصف",
    hero_image: "صورة الهيرو",

    // CONTACT INFO
    contact_title: "عنوان التواصل",
    contact_description: "وصف التواصل",

    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    address: "العنوان",

    // SOCIAL
    facebook: "فيسبوك",
    instagram: "انستجرام",
    pinterest: "بينتريست",
    tiktok: "تيك توك",
    x: "تويتر",

    // MAP
    map_url: "رابط الخريطة",
    map_image: "صورة الخريطة",

    // FOOTER
    footer_description: "وصف الفوتر",
};

export default function Index({ contact }) {
    const [openSection, setOpenSection] = useState(null);
    const [formData, setFormData] = useState({});

    const sections = [
        {
            key: "hero",
            title: "قسم الهيرو",
            fields: [
                "hero_title",
                "hero_subtitle",
                "hero_description",
                "hero_image",
            ],
        },

        {
            key: "contact_info",
            title: "بيانات التواصل",
            fields: [
                "contact_title",
                "contact_description",
                "phone",
                "email",
                "whatsapp",
                "address",
            ],
        },

        {
            key: "social",
            title: "روابط التواصل الاجتماعي",
            fields: [
                "facebook",
                "instagram",
                "pinterest",
                "tiktok",
                "x"
            ],
        },

        {
            key: "map",
            title: "الخريطة",
            fields: [
                "map_url",
                "map_image",
            ],
        },

        {
            key: "footer",
            title: "الفوتر",
            fields: [
                "footer_description",
            ],
        },
    ];

    const routeMap = {
        hero: route("contact-page.hero.update"),
        contact_info: route("contact-page.info.update"),
        social: route("contact-page.social.update"),
        map: route("contact-page.map.update"),
        footer: route("contact-page.footer.update"),
    };

    const handleOpen = (section) => {
        if (openSection === section.key) {
            setOpenSection(null);
            return;
        }

        setOpenSection(section.key);

        const initial = {};

        section.fields.forEach((f) => {
            initial[f] = contact?.[f] || "";
        });

        setFormData(initial);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const submitSection = (key) => {
        const data = new FormData();

        Object.entries(formData).forEach(([k, v]) => {
            if (v !== null && v !== "") {
                data.append(k, v);
            }
        });

        router.post(routeMap[key], data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setOpenSection(null),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="إدارة صفحة التواصل" />

            <main className="space-y-4">
                <Breadcrumb
                    items={[
                        {
                            name: "لوحة التحكم",
                            link: route("dashboard"),
                        },
                        {
                            name: "صفحة التواصل",
                        },
                    ]}
                />

                <AdminPageHeader
                    title="إدارة صفحة التواصل"
                    description="تحكم كامل في محتوى صفحة التواصل"
                    icon={FiMail}
                    actions={[]}
                />

                <div className="space-y-4">
                    {sections.map((section) => {
                        const fieldsData = {};

                        section.fields.forEach((f) => {
                            fieldsData[f] = contact?.[f] || "";
                        });

                        return (
                            <div key={section.key}>
                                <SectionCard
                                    title={section.title}
                                    fieldsData={fieldsData}
                                    onOpen={() => handleOpen(section)}
                                />

                                {openSection === section.key && (
                                    <div className="bg-gray-50 border-l-4 border-[var(--primary)] p-6 mt-2 rounded-b-2xl">

                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                submitSection(section.key);
                                            }}
                                            className="space-y-4"
                                        >
                                            {section.fields.map((field) => (
                                                <div key={field}>
                                                    <label className="block mb-2 text-sm font-medium">
                                                        {fieldLabels[field]}
                                                    </label>

                                                    {field.includes("image") ? (
                                                        <input
                                                            type="file"
                                                            name={field}
                                                            onChange={handleChange}
                                                            className="w-full h-12 rounded-xl border px-4"
                                                        />
                                                    ) : field.includes("description") ? (
                                                        <textarea
                                                            rows={4}
                                                            name={field}
                                                            value={formData[field] || ""}
                                                            onChange={handleChange}
                                                            className="w-full rounded-xl border p-3"
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={field}
                                                            value={formData[field] || ""}
                                                            onChange={handleChange}
                                                            className="w-full h-12 rounded-xl border px-4"
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenSection(null)
                                                    }
                                                    className="px-4 py-2 border rounded-xl"
                                                >
                                                    إلغاء
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl"
                                                >
                                                    حفظ
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
