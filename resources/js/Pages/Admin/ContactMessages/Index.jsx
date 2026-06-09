import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import {
    FiSearch,
    FiTrash2,
    FiMail,
    FiEye,
    FiAlertTriangle,
} from "react-icons/fi";


import AdminPageHeader from "@/Components/AdminPageHeader";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Index({ messages, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    // ---------------- SEARCH ----------------
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("contact-messages.index"),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    // ---------------- DELETE ----------------
    const openDelete = (message) => {
        setSelectedMessage(message);
        setDeleteModal(true);
    };

    const destroy = () => {
        router.delete(
            route("contact-messages.destroy", selectedMessage.id),
            {
                onSuccess: () => {
                    setDeleteModal(false);
                    setSelectedMessage(null);
                },
            }
        );
    };

    const openMessage = (id) => {
        router.visit(route("contact-messages.show", id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="الرسائل" />

            <main className="space-y-4">

                {/* BREADCRUMB */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "الرسائل" },
                    ]}
                />

                {/* HEADER */}
                <AdminPageHeader
                    title="رسائل العملاء"
                    description="إدارة جميع الرسائل الواردة من نموذج التواصل"
                    icon={FiMail}
                    actions={[]}
                />

                {/* SEARCH */}
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالاسم أو البريد..."
                        className="
                            w-full h-12
                            rounded-2xl
                            border border-gray-200
                            bg-white
                            pr-12 pl-4
                            text-sm
                            shadow-sm
                            outline-none
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]
                        "
                    />
                </div>

                {/* GRID */}
                {messages?.data?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                        {messages.data.map((msg) => (
                            <div
                                key={msg.id}
                                className="
                                    group relative
                                    bg-white
                                    rounded-3xl
                                    border border-gray-100
                                    p-5
                                    shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                                    transition-all duration-300
                                    overflow-hidden
                                "
                            >

                                {/* TOP STRIP */}
                                <div
                                    className={`
                                        absolute top-0 inset-x-0 h-1
                                        ${msg.is_read
                                            ? "bg-gray-200"
                                            : "bg-gradient-to-r from-[var(--primary)] to-yellow-400"}
                                    `}
                                />

                                {/* HEADER */}
                                <div className="flex items-start justify-between">

                                    <div>
                                        <h2 className="font-bold text-gray-800">
                                            {msg.name}
                                        </h2>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {msg.email}
                                        </p>
                                    </div>

                                    {/* ICON */}
                                    <div
                                        className="
                                            w-10 h-10
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-[var(--hover-accent)]
                                            to-white
                                            border border-gray-100
                                            flex items-center justify-center
                                        "
                                    >
                                        <FiMail className="text-[var(--primary)]" />
                                    </div>
                                </div>

                                {/* MESSAGE PREVIEW */}
                                <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-6">
                                    {msg.message}
                                </p>

                                {/* STATUS */}
                                <div className="mt-3 flex items-center gap-2">
                                    <span
                                        className={`
                                            w-2 h-2 rounded-full
                                            ${msg.is_read ? "bg-gray-300" : "bg-[var(--primary)]"}
                                        `}
                                    />
                                    <span className="text-xs text-gray-400">
                                        {msg.is_read ? "مقروءة" : "غير مقروءة"}
                                    </span>
                                </div>

                                {/* ACTIONS */}
                                <div
                                    className="
                                        mt-4
                                        flex items-center justify-end gap-2
                                        opacity-0
                                        translate-y-2
                                        group-hover:opacity-100
                                        group-hover:translate-y-0
                                        transition-all duration-300
                                    "
                                >
                                    <button
                                        onClick={() => openMessage(msg.id)}
                                        className="
                                            w-8 h-8
                                            rounded-full
                                            bg-blue-50
                                            text-blue-600
                                            hover:bg-blue-500
                                            hover:text-white
                                            flex items-center justify-center
                                            transition
                                        "
                                    >
                                        <FiEye size={14} />
                                    </button>

                                    <button
                                        onClick={() => openDelete(msg)}
                                        className="
        w-8 h-8
        rounded-full
        bg-red-50
        text-red-500
        hover:bg-red-500
        hover:text-white
        flex items-center justify-center
        transition
    "
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>

                                {/* DECOR */}
                                <div className="
                                    absolute -bottom-10 -left-10
                                    w-24 h-24
                                    rounded-full
                                    bg-[var(--hover-accent)]
                                    blur-2xl
                                    opacity-40
                                " />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-dashed py-20 text-center">
                        <FiMail className="mx-auto text-4xl text-gray-300" />
                        <h3 className="mt-4 text-lg font-bold">
                            لا توجد رسائل
                        </h3>
                        <p className="text-gray-500 mt-2">
                            لم يتم استقبال أي رسائل بعد
                        </p>
                    </div>
                )}
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
                        هل أنت متأكد من حذف هذه الرسالة؟
                        <br />
                        لا يمكن التراجع عن هذا الإجراء.
                    </p>

                    {selectedMessage && (
                        <div className="mt-4 p-4 rounded-2xl bg-gray-50 border">
                            <p className="font-semibold">
                                {selectedMessage.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {selectedMessage.email}
                            </p>
                        </div>
                    )}

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
                            حذف الرسالة
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}