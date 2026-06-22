import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FiHome, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";

import { RiShoppingBag3Line } from "react-icons/ri";
import AdminPageHeader from "@/Components/AdminPageHeader";
import SecurityEditor from "./SecurityEditor";
import { BiSearch } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { ImPageBreak } from "react-icons/im";

const pagesConfig = [
    {
        key: "shop",
        title: "صفحة المتجر",
        icon: RiShoppingBag3Line,
        fields: [{ key: "bg_image", label: "صورة الخلفية", type: "image" }],
    },
    {
        key: "cart",
        title: "صفحة السلة",
        icon: FiShoppingCart,
        fields: [
            { key: "bg_image", label: "صورة الخلفية", type: "image" },
            { key: "shipping_notice", label: "تنبيه الشحن", type: "text" },
        ],
    },
    {
        key: "wishlist",
        title: "صفحة المفضلة",
        icon: FiHeart,
        fields: [{ key: "bg_image", label: "صورة الخلفية", type: "image" }],
    },
    {
        key: "search",
        title: "صفحة البحث",
        icon: BiSearch,
        fields: [{ key: "bg_image", label: "صورة الخلفية", type: "image" }],
    },
    {
        key: "account",
        title: "صفحة الحساب",
        icon: FiUser,
        fields: [
            { key: "bg_image", label: "صورة الخلفية", type: "image" },
            { key: "security_json", label: "إعدادات الأمان", type: "security" },
        ],
    },
 {
        key: "shipping",
        title: "قيمة الشحن لكل المحافظات",
        icon: FaShippingFast,
        fields: [
          
            { key: "shipping_amount", label: "قيمة الشحن", type: "text" },
        ],
    },
];

export default function Index({ pages }) {
    const [open, setOpen] = useState(null);
    const [formData, setFormData] = useState({});

    const handleOpen = (page) => {
        const isSame = open === page.key;
        setOpen(isSame ? null : page.key);

        if (!isSame) {
            const target = pages.find((p) => p.page_key === page.key);
            setFormData(target?.data || {});
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const updateSecurity = (value) => {
        setFormData((prev) => ({
            ...prev,
            security_json: value,
        }));
    };

    const submit = (key) => {
        const fd = new FormData();

        Object.entries(formData).forEach(([k, v]) => {
            if (v === null || v === undefined) return;

            if (k === "security_json") {
                fd.append(k, JSON.stringify(v));
            } else {
                fd.append(k, v);
            }
        });

        router.post(route("admin.pages.update", key), fd, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setOpen(null),
        });
    };

    const renderField = (field) => {
        const value = formData[field.key];

        switch (field.type) {
            case "image":
                return (
                    <div>
                        {typeof value === "string" && value && (
                            <img
                                src={`/storage/${value}`}
                                className="w-24 h-24 rounded-xl border mb-3 object-cover"
                            />
                        )}

                        {value instanceof File && (
                            <img
                                src={URL.createObjectURL(value)}
                                className="w-24 h-24 rounded-xl border mb-3 object-cover"
                            />
                        )}

                        <input
                            type="file"
                            name={field.key}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 bg-white"
                        />
                    </div>
                );

            case "text":
                return (
                    <input
                        type="text"
                        name={field.key}
                        value={value || ""}
                        onChange={handleChange}
                        placeholder="أدخل القيمة"
                        className="w-full h-12 border rounded-xl px-4 outline-none focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]"
                    />
                );

            case "security":
                return (
                    <SecurityEditor
                        value={value || []}
                        onChange={updateSecurity}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="إعدادات الصفحات" />

            <div className="space-y-6">
                {/* HEADER */}
                <AdminPageHeader
                    title="إعدادات الصفحات"
                    description="إدارة محتوى الصفحات الديناميكي"
                    icon={ImPageBreak}
                    actions={[]}
                />

                {/* CARDS */}
                <div className="space-y-4">
                    {pagesConfig.map((page) => {
                        const data =
                            pages.find((p) => p.page_key === page.key)?.data ||
                            {};

                        return (
                            <div
                                key={page.key}
                                className="bg-white border rounded-2xl overflow-hidden"
                            >
                                {/* CARD HEADER */}
                                <div
                                    onClick={() => handleOpen(page)}
                                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <page.icon className="text-[var(--primary)] text-xl" />
                                    <h2 className="font-bold text-lg">
                                        {page.title}
                                    </h2>
                                </div>

                                {/* CARD CONTENT */}
                                <AnimatePresence>
                                    {open === page.key && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="p-5 border-t bg-gray-50 space-y-4"
                                        >
                                            {page.fields.map((field) => (
                                                <div key={field.key}>
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                                        {field.label}
                                                    </label>

                                                    {renderField(field)}
                                                </div>
                                            ))}

                                            {/* ACTIONS */}
                                            <div className="flex justify-end gap-3 pt-3">
                                                <button
                                                    onClick={() =>
                                                        setOpen(null)
                                                    }
                                                    className="px-5 py-2 border rounded-xl hover:bg-gray-100"
                                                >
                                                    إلغاء
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        submit(page.key)
                                                    }
                                                    className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl hover:opacity-90"
                                                >
                                                    حفظ التغييرات
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
