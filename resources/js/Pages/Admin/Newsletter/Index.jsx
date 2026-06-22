import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { FiMail, FiTrash2, FiSearch, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import Breadcrumb from "@/Components/Breadcrumb";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Modal from "@/Components/Modal";

export default function Index({ subscribers }) {
    const [search, setSearch] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);

    const filtered = subscribers.filter((item) =>
        item.email.toLowerCase().includes(search.toLowerCase()),
    );

    const destroy = () => {
        router.delete(route("newsletter.destroy", selectedSubscriber.id), {
            onSuccess: () => {
                setDeleteModal(false);
                setSelectedSubscriber(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="النشرة البريدية" />

            <main className="space-y-5">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "النشرة البريدية" },
                    ]}
                />

                {/* Header */}
                <AdminPageHeader
                    title="المشتركين في النشرة البريدية"
                    description="إدارة جميع الإيميلات المشتركة"
                    icon={FiMail}
                    actions={[]}
                />

                {/* Search */}
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث بالبريد الإلكتروني..."
                        className="
                            w-full h-12
                            rounded-2xl
                            border border-gray-200
                            bg-white
                            pr-12 pl-4
                            text-sm
                            shadow-sm
                            outline-none
                            transition-all
                            focus:ring-1
                            focus:ring-[var(--primary)]
                            focus:border-[var(--primary)]
                        "
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Header row */}
                    <div className="grid grid-cols-12 bg-gray-50 p-4 font-bold text-gray-600 text-sm">
                        <div className="col-span-1">#</div>
                        <div className="col-span-8">البريد الإلكتروني</div>
                        <div className="col-span-3 text-center">الإجراء</div>
                    </div>

                    {/* Rows */}
                    {filtered.length > 0 ? (
                        filtered.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="
                                    grid grid-cols-12 items-center
                                    p-4 border-t border-gray-100
                                    hover:bg-gray-50 transition
                                "
                            >
                                <div className="col-span-1 text-gray-500">
                                    {index + 1}
                                </div>

                                <div className="col-span-8 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#F4ECE5] flex items-center justify-center">
                                        <FiMail className="text-[#7F5539]" />
                                    </div>

                                    <span className="font-medium text-gray-800">
                                        {item.email}
                                    </span>
                                </div>

                                <div className="col-span-3 flex justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedSubscriber(item);
                                            setDeleteModal(true);
                                        }}
                                        className="
                                            flex items-center gap-2
                                            px-4 py-2 rounded-xl
                                            bg-red-50 text-red-600
                                            hover:bg-red-100
                                            transition
                                        "
                                    >
                                        <FiTrash2 />
                                        حذف
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-500">
                            لا يوجد مشتركين
                        </div>
                    )}
                </div>

                <Modal
                    show={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    maxWidth="md"
                >
                    <div className="p-8 text-center">
                        {/* ICON */}
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

                        {/* TITLE */}
                        <h2 className="text-2xl font-bold mt-5">حذف المشترك</h2>

                        {/* DESCRIPTION */}
                        <p className="text-gray-500 mt-3 leading-7">
                            هل أنت متأكد من حذف هذا البريد الإلكتروني؟
                            <br />
                            <span className="font-bold text-gray-700">
                                {selectedSubscriber?.email}
                            </span>
                        </p>

                        {/* ACTIONS */}
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
                                حذف المشترك
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
