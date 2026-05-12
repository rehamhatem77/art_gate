import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiSearch,
    FiChevronLeft,
    FiMapPin,
    FiStar,
    FiAlertTriangle,
    FiMessageSquare,
} from "react-icons/fi";
import { MdOutlineHotel } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { LuUngroup } from "react-icons/lu";
import CategoryCard from "./Components/CategoryCard";

export default function Index() {
    const [search, setSearch] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
   const categories = [
    {
        id: 1,
        name: "Modern Art",
        image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Classic Art",
        image:
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Islamic Art",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&q=80&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Nature",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Calligraphy",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "Kids Collection",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80&auto=format&fit=crop",
    },
];

    const handleSearch = (e) => {
        setSearch(e.target.value);

        router.get(
            // route('hotels.index'),
            { search: e.target.value },
            { preserveState: true, replace: true },
        );
    };

    const viewHotel = async (id) => {
        // const response = await fetch(route('hotels.show', id));
        const data = await response.json();
        setSelectedHotel(data);
        setShowModal(true);
    };

    const openDelete = (hotel) => {
        setSelectedHotel(hotel);
        setDeleteModal(true);
    };

    const destroy = () => {
        if (selectedHotel.offers_count > 0) {
            toast.error("لا يمكن حذف فندق مرتبط بعروض");
            return;
        }
        // router.delete(route('hotels.destroy', selectedHotel.id), {
        //     onSuccess: () => {
        //         // toast.success('تم نقل الفندق إلى سلة المحذوفات');
        //         setDeleteModal(false);
        //     },
        // });
    };
    return (
        <AuthenticatedLayout>
            <Head title="المجموعات" />
            <main className=" px-2 sm:px-2 space-y-2">
                <div className="flex items-center gap-1 text-sm ">
                    <button
                        onClick={() => router.get(route("dashboard"))}
                        className="hover:underline"
                    >
                        لوحة التحكم
                    </button>

                    <FiChevronLeft />

                    <span className="text-[var(--primary)] font-medium">
                        المجموعات
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <LuUngroup className="text-2xl text-[var(--primary)]" />

                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                                إدارة المجموعات
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                إدارة جميع مجموعات اللوحات والتصنيفات
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2 justify-between flex-col sm:flex-row gap-3">
                        <button
                            // onClick={() => router.get(route('hotels.create'))}
                            className="flex items-center justify-center gap-2
            px-4 py-2 rounded-lg
            bg-[var(--primary)]
            text-white font-medium
            shadow-sm
            hover:opacity-90
            transition-all gap-2"
                        >
                            <FiPlus /> إضافة مجموعة
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="ابحث باسم المجموعة..."
                        className="
                w-full h-12 rounded-xl
                border border-gray-200
                bg-white
                pr-12 pl-4
                text-sm
                shadow-sm
border-none 
                outline-none
                transition-all
focus:ring-offset-1
                focus:ring-1 focus:ring-[var(--primary)]
                focus:border-[var(--primary)]
            "
                    />
                </div>

                {/* Categories Grid */}
                <div
                    className="
        grid grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-8
pt-4
    "
                >
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={(category) => console.log(category)}
                            onDelete={(category) => console.log(category)}
                        />
                    ))}
                </div>

                {/* {hotels.links && (
                    <div className="flex justify-center gap-1 flex-wrap text-sm">
                        {hotels.links.map((link, idx) => {
                            let label = '';
                            const toArabicNumbers = (num) => {
                                const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
                                return num.toString().split('').map(d => arabicNumbers[d] || d).join('');
                            };
                            if (link.label.includes('Previous')) label = '«';
                            else if (link.label.includes('Next')) label = '»';
                            else label = toArabicNumbers(link.label.replace(/&laquo;|&raquo;/g, ''));
                            return (
                                <button
                                    key={idx}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, replace: true })}
                                    className={`px-2 py-1 rounded border ${link.active
                                        ? 'bg-[var(--app-primary)] text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                />
                            );
                        })}
                    </div>
                )} */}

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="تفاصيل الفندق"
                    className="max-w-4xl w-full"
                    contentClassName="max-h-[80vh] overflow-y-auto p-6 space-y-4"
                >
                    {selectedHotel && (
                        <div className="grid gap-4 sm:grid-cols-2 text-sm">
                            {selectedHotel.image_path && (
                                <div className="col-span-full flex justify-center">
                                    <img
                                        src={`/storage/${selectedHotel.image_path}`}
                                        alt={selectedHotel.name}
                                        className="w-32 h-20 object-cover rounded-lg border shadow-sm"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <MdOutlineHotel className="text-[var(--app-primary)] w-6 h-6" />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        اسم الفندق
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {selectedHotel.name}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <FiMapPin className="text-green-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        المدينة
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {selectedHotel.city}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                <FiMessageSquare className="text-purple-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        وصف الفندق
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {selectedHotel.desc}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                <FaStar className="text-yellow-400 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        عدد النجوم
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {selectedHotel.stars}
                                    </div>
                                </div>
                            </div>

                            {selectedHotel.city === "مكة" && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                    <FiMapPin className="text-blue-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">
                                            المسافة من الكعبة
                                        </div>
                                        <div className="font-medium text-gray-800">
                                            {selectedHotel.distance_from_kaaba}{" "}
                                            م
                                        </div>
                                    </div>
                                </div>
                            )}
                            {selectedHotel.city === "المدينة المنورة" && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 shadow-sm hover:shadow transition">
                                    <FiMapPin className="text-blue-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">
                                            المسافة من النبوي
                                        </div>
                                        <div className="font-medium text-gray-800">
                                            {selectedHotel.distance_from_nabawi}{" "}
                                            م
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                <FiMapPin className="text-purple-500 w-5 h-5" />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        العنوان
                                    </div>
                                    <div className="font-medium text-gray-800">
                                        {selectedHotel.address_location}
                                    </div>
                                </div>
                            </div>

                            {selectedHotel.features && (
                                <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                    <FiStar className="text-orange-500 w-5 h-5" />
                                    <div>
                                        <div className="text-gray-500 text-xs">
                                            المميزات
                                        </div>
                                        <div className="font-medium text-gray-800">
                                            {selectedHotel.features}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 col-span-full shadow-sm hover:shadow transition">
                                <FiEye
                                    className={`w-5 h-5 ${selectedHotel.is_active ? "text-green-500" : "text-red-500"}`}
                                />
                                <div>
                                    <div className="text-gray-500 text-xs">
                                        الحالة
                                    </div>
                                    <div
                                        className={`font-medium ${selectedHotel.is_active ? "text-green-600" : "text-red-600"}`}
                                    >
                                        {selectedHotel.is_active
                                            ? "مفعل"
                                            : "غير مفعل"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
                <Modal
                    show={deleteModal}
                    title="تأكيد الحذف"
                    onClose={() => setDeleteModal(false)}
                >
                    <div className="text-center space-y-3">
                        <FiAlertTriangle className="text-3xl mx-auto text-red-500" />
                        <p>هل أنت متأكد من حذف هذا الفندق؟</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="btn-secondary flex-1"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={destroy}
                                className="btn-danger flex-1"
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </AuthenticatedLayout>
    );
}
