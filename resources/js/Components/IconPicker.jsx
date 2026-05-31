import Modal from "@/Components/Modal";

import {
    FiSun,
    FiHome,
    FiCoffee,
    FiHeart,
    FiSmile,
    FiImage,
    FiFeather,
    FiCamera,
    FiUser,
    FiMapPin,
    FiCompass,
    FiActivity,
    FiMusic,
    FiGift,
    FiStar,
    FiTrendingUp,
    FiEye,
    FiMoon,
    FiZap,
    FiBriefcase,
    FiBook,
    FiTarget,
    FiGrid,
} from "react-icons/fi";
import {
    FaMosque,
    FaPalette,
    FaLayerGroup,
    FaCrown,
    FaEarthAfrica,
    FaFilm,
    FaCar,
    FaHorse,
    FaUtensils,
    FaTooth,
    FaPaw,
    FaGamepad,
    FaRocket,
    FaLeaf,
  
    FaBuilding,
    FaUserDoctor,
    FaSpa,
    FaKitchenSet,
    FaBed,
    FaDumbbell,
    FaLaptop,
    FaPlane,
    FaCity,
    FaGlobe,
    FaDragon,
} from "react-icons/fa6";
import {
    FaTruckFast,
    FaHeadset,
    FaShieldHeart,
    FaCreditCard,
    FaPaintRoller,
    FaPrint,
    FaRulerCombined,
    FaHammer,
    FaGift,
    FaBoxesPacking,
    FaRotateLeft,
    FaAward,
    FaPhoneVolume,
    FaWhatsapp,
    FaUserGear,
    FaBrush,
    FaWandMagicSparkles,
    FaCameraRetro,
   
    FaHouse,
   
    FaStore,
    FaScrewdriverWrench,
    FaClock,
    FaFire,
    FaMedal,
    FaGem,
    FaCouch,
    FaCartShopping,
} from "react-icons/fa6";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

export const iconsMap = {
    ...HiIcons,
    ...FiIcons,
    ...FaIcons,
    ...Fa6Icons,
};

export const artworkIcons = [
    // Islamic
    { icon: FaMosque, label: "تابلوهات إسلامية" },
    { icon: FiBook, label: "آيات قرآنية" },
    { icon: FiStar, label: "أذكار وأدعية" },

    // Nature
    { icon: FiSun, label: "طبيعة ومناظر" },
    { icon: FaLeaf, label: "أشجار وغابات" },
    { icon: FiMoon, label: "تصاميم هادئة" },
    { icon: FaEarthAfrica, label: "معالم عالمية" },

    // Home
    { icon: FiHome, label: "غرف المعيشة" },
    { icon: FiHeart, label: "غرف النوم" },
    { icon: FiSmile, label: "غرف الأطفال" },
    { icon: FaKitchenSet, label: "المطبخ" },
    { icon: FaBed, label: "ديكور منزلي" },

    // Art
    { icon: FiImage, label: "فن تجريدي" },
    { icon: FiFeather, label: "فن كلاسيكي" },
    { icon: FaPalette, label: "تصميمات إبداعية" },
    // { icon: FaPaintBrush, label: "رسم وفنون" },
    { icon: FaLayerGroup, label: "تصميمات مودرن" },
    { icon: FaCrown, label: "تصميمات فاخرة" },

    // Photography
    { icon: FiCamera, label: "تصوير فوتوغرافي" },
    { icon: FiUser, label: "شخصيات وبورتريه" },

    // Travel
    { icon: FiMapPin, label: "سفر ومدن" },
    { icon: FiCompass, label: "مغامرات واستكشاف" },
    { icon: FaPlane, label: "وجهات سياحية" },
    { icon: FaCity, label: "مدن عالمية" },
    { icon: FaGlobe, label: "خرائط العالم" },

    // Food
    { icon: FiCoffee, label: "مقاهي وكافيهات" },
    { icon: FaUtensils, label: "مأكولات ومشروبات" },

    // Business
    { icon: FiBriefcase, label: "مكاتب وشركات" },
    { icon: FaLaptop, label: "ريادة أعمال" },

    // Sports
    { icon: FiActivity, label: "رياضة ولياقة" },
    { icon: FaDumbbell, label: "جيم وكمال أجسام" },

    // Music & Entertainment
    { icon: FiMusic, label: "موسيقى وفنون" },
    { icon: FaFilm, label: "سينما وترفيه" },
    { icon: FaGamepad, label: "ألعاب فيديو" },

    // Animals
    { icon: FaHorse, label: "خيول" },
    { icon: FaPaw, label: "حيوانات" },

    // Modern Styles
    { icon: FiGrid, label: "تابلوهات متعددة" },
    { icon: FiTrendingUp, label: "الأكثر رواجاً" },
    { icon: FiEye, label: "تصاميم مميزة" },
    { icon: FiZap, label: "تصاميم جريئة" },

    // Abstract Styles
    { icon: FaSpa, label: "بوهيمي" },
    { icon: FiTarget, label: "مينيمال" },
    { icon: FiStar, label: "الأكثر مبيعاً" },

    // Vehicles
    { icon: FaCar, label: "سيارات" },

    // Space
    { icon: FaRocket, label: "فضاء وكواكب" },
    { icon: FaDragon, label: "فانتازي" },

    // Clinics
    { icon: FaUserDoctor, label: "عيادات طبية" },
    { icon: FaTooth, label: "عيادات أسنان" },
    { icon: FaPaw, label: "عيادات بيطرية" },

    // Gifts
    { icon: FiGift, label: "مناسب للهدايا" },

// ======================
// Services
// ======================

{ icon: FaTruckFast, label: "شحن سريع" },
{ icon: FaBoxesPacking, label: "تغليف احترافي" },
{ icon: FaHeadset, label: "دعم العملاء" },
{ icon: FaPhoneVolume, label: "خدمة العملاء" },
{ icon: FaWhatsapp, label: "دعم واتساب" },

{ icon: FaCreditCard, label: "دفع إلكتروني" },
{ icon: FaShieldHeart, label: "ضمان الجودة" },
{ icon: FaRotateLeft, label: "استبدال واسترجاع" },

{ icon: FaAward, label: "جودة عالية" },
{ icon: FaMedal, label: "خدمة مميزة" },
{ icon: FaGem, label: "خدمة VIP" },

{ icon: FaClock, label: "تنفيذ سريع" },
{ icon: FaFire, label: "عروض خاصة" },

{ icon: FaPrint, label: "طباعة احترافية" },
{ icon: FaPaintRoller, label: "تشطيبات مميزة" },
{ icon: FaBrush, label: "تصميم إبداعي" },
{ icon: FaWandMagicSparkles, label: "تصميم مخصص" },

{ icon: FaCameraRetro, label: "تحويل الصور إلى لوحات" },

{ icon: FaRulerCombined, label: "مقاسات مخصصة" },
{ icon: FaHammer, label: "تركيب اللوحات" },
{ icon: FaScrewdriverWrench, label: "خدمات الصيانة" },

{ icon: FaHouse, label: "ديكور المنازل" },
{ icon: FaBuilding, label: "ديكور الشركات" },
{ icon: FaStore, label: "ديكور المحلات" },

{ icon: FaCouch, label: "استشارات الديكور" },

{ icon: FaCartShopping, label: "طلب وتنفيذ" },

{ icon: FaGift, label: "تغليف الهدايا" },
{ icon: FaUserGear, label: "خدمة مخصصة" },
{ icon: FiIcons.FiSliders, label: "بحث متقدم" }
];

export default function IconPicker({ show, onClose, onSelect }) {
    return (
        <Modal show={show} title="اختر أيقونة" onClose={onClose}>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-[60vh] overflow-y-auto">
                {artworkIcons.map(({ icon: Icon, label }) => {
                    if (!Icon) return null;

                    return (
                        <button
                            key={label}
                            onClick={() => {
                                const iconName =
                                    Object.keys(iconsMap).find(
                                        (k) => iconsMap[k] === Icon
                                    ) ||
                                    Icon.name ||
                                    null;

                                onSelect({
                                    icon: iconName,
                                    label,
                                });
                            }}
                            className="
                                border
                                rounded-lg
                                p-3

                                hover:border-[var(--primary)]
                                hover:bg-[var(--primary)]/5

                                flex
                                flex-col
                                items-center
                                gap-2

                                transition
                            "
                        >
                            <Icon className="text-xl text-[var(--primary)]" />

                            <span className="text-xs text-center text-gray-600">
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </Modal>
    );
}