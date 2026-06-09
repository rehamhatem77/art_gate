import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";

import {
    FiArrowRight,
    FiMail,
    FiUser,
    FiPhone,
    FiGlobe,
    FiCalendar,
    FiTrash2,
    FiAlertTriangle
} from "react-icons/fi";

import AdminPageHeader from "@/Components/AdminPageHeader";
import Breadcrumb from "@/Components/Breadcrumb";
import { useState } from "react";

export default function Show({ message }) {
  const [deleteModal, setDeleteModal] = useState(false);

const [deleting, setDeleting] = useState(false);

const destroy = () => {
    setDeleting(true);

    router.delete(
        route("contact-messages.destroy", message.id)
    );
};

    return (
        <AuthenticatedLayout>
            <Head title="عرض الرسالة" />

            <main className="space-y-4">

                {/* BREADCRUMB */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "الرسائل", link: route("contact-messages.index") },
                        { name: "عرض الرسالة" },
                    ]}
                />

                {/* HEADER */}
                <AdminPageHeader
                    title="تفاصيل الرسالة"
                    description="عرض كامل لرسالة العميل"
                    icon={FiMail}
                    actions={[
                        {
                            label: "حذف الرسالة",
                            icon: FiTrash2,
                             onClick: () => setDeleteModal(true),
                            className: `
                                flex items-center gap-2
                                px-5 py-2
                                rounded-xl
                                bg-red-500
                                text-white
                                hover:bg-red-600
                                transition-all
                            `,
                        },
                        {
                            label: "رجوع",
                            icon: FiArrowRight,
                            onClick: () =>
                                router.visit(route("contact-messages.index")),
                            className: `
                                flex items-center gap-2
                                px-5 py-2
                                rounded-xl
                                bg-white
                                border
                                hover:bg-gray-50
                                transition-all
                            `,
                        },
                    ]}
                />

                {/* CONTENT */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* MAIN MESSAGE CARD */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

                        {/* SUBJECT */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {message.subject || "رسالة بدون عنوان"}
                            </h2>

                            <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                    message.is_read
                                        ? "bg-gray-100 text-gray-600"
                                        : "bg-[var(--primary)]/10 text-[var(--primary)]"
                                }`}
                            >
                                {message.is_read ? "مقروءة" : "غير مقروءة"}
                            </span>
                        </div>

                        {/* MESSAGE BODY */}
                        <div className="bg-gray-50 rounded-2xl p-5 text-gray-700 leading-8 whitespace-pre-wrap">
                            {message.message}
                        </div>

                        {/* DATE */}
                        <div className="flex items-center gap-2 mt-6 text-sm text-gray-400">
                            <FiCalendar />
                            <span>
                                {new Date(message.created_at).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* SIDEBAR INFO */}
                    <div className="space-y-4">

                        {/* USER INFO */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4">
                                بيانات العميل
                            </h3>

                            <div className="space-y-3 text-sm">

                                <InfoRow
                                    icon={FiUser}
                                    label="الاسم"
                                    value={message.name}
                                />

                                <InfoRow
                                    icon={FiMail}
                                    label="البريد"
                                    value={message.email}
                                />

                                <InfoRow
                                    icon={FiPhone}
                                    label="الهاتف"
                                    value={message.phone || "غير متوفر"}
                                />

                                <InfoRow
                                    icon={FiGlobe}
                                    label="الشركة"
                                    value={message.company || "غير متوفر"}
                                />
                            </div>
                        </div>

                        {/* QUICK ACTION */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-5">
                            <h3 className="font-bold text-gray-800 mb-4">
                                إجراءات سريعة
                            </h3>

                            <a
                                href={`mailto:${message.email}`}
                                className="block w-full text-center py-3 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition"
                            >
                                الرد على البريد
                            </a>
                        </div>
                    </div>
                </div>
            </main>
<Modal
    show={deleteModal}
    onClose={() => setDeleteModal(false)}
    maxWidth="md"
>
    <div className="p-8 text-center">
        <div
            className="
                w-20 h-20
                rounded-full
                bg-red-100
                flex items-center justify-center
                mx-auto
            "
        >
            <FiAlertTriangle className="text-4xl text-red-500" />
        </div>

        <h2 className="text-2xl font-bold mt-5">
            حذف الرسالة
        </h2>

        <p className="text-gray-500 mt-3 leading-7">
            هل أنت متأكد من حذف رسالة
            <span className="font-semibold text-gray-800">
                {" "}
                {message.name}
            </span>
            ؟
            <br />
            لا يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex gap-3 mt-8">
            <button
                onClick={() => setDeleteModal(false)}
                className="
                    flex-1 h-12
                    rounded-2xl
                    border
                    hover:bg-gray-50
                "
            >
                إلغاء
            </button>

            <button
                onClick={destroy}
                className="
                    flex-1 h-12
                    rounded-2xl
                    bg-red-500
                    text-white
                    hover:bg-red-600
                    transition
                "
            >
                {deleting ? "جاري الحذف..." : "حذف الرسالة"}
            </button>
        </div>
    </div>
</Modal>
        </AuthenticatedLayout>
    );
}

/* ---------------- SMALL COMPONENT ---------------- */
function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
            <div className="flex items-center gap-2 text-gray-500">
                <Icon size={14} />
                <span>{label}</span>
            </div>

            <span className="text-gray-800 font-medium">{value}</span>
        </div>
    );
}