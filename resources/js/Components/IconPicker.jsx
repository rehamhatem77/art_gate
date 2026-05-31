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
    { icon: FiSun, label: "طبيعة ومناظر" },
    { icon: FiHome, label: "غرف المعيشة" },
    { icon: Fa6Icons.FaMosque, label: "تابلوهات إسلامية" },

    { icon: FiCoffee, label: "مقاهي ومطاعم" },
    { icon: FiBriefcase, label: "مكاتب وشركات" },
    { icon: FiHeart, label: "غرف النوم" },

    { icon: FiSmile, label: "غرف الأطفال" },
    { icon: FiImage, label: "فن تجريدي" },
    { icon: FiFeather, label: "فن كلاسيكي" },

    { icon: FiCamera, label: "تصوير فوتوغرافي" },
    { icon: FiUser, label: "شخصيات وبورتريه" },
    { icon: FiStar, label: "اقتباسات وتحفيز" },

    { icon: FiGrid, label: "تابلوهات متعددة" },
    { icon: Fa6Icons.FaLayerGroup, label: "تصميمات مودرن" },
    { icon: Fa6Icons.FaCrown, label: "تصميمات فاخرة" },

    { icon: FiMapPin, label: "سفر ومدن" },
    { icon: FiCompass, label: "مغامرات واستكشاف" },
    { icon: Fa6Icons.FaEarthAfrica, label: "معالم عالمية" },

    { icon: FiActivity, label: "رياضة ولياقة" },
    { icon: FiMusic, label: "موسيقى وفنون" },
    { icon: Fa6Icons.FaFilm, label: "سينما وترفيه" },

    { icon: FiBook, label: "ثقافة ومعرفة" },
    { icon: FiTarget, label: "هوايات واهتمامات" },
    { icon: FiGift, label: "مناسب للهدايا" },

    { icon: Fa6Icons.FaPalette, label: "تصميمات إبداعية" },
    { icon: FiStar, label: "الأكثر مبيعاً" },
    { icon: FiTrendingUp, label: "الأكثر رواجاً" },

    { icon: FiEye, label: "تصاميم مميزة" },
    { icon: FiMoon, label: "تصاميم هادئة" },
    { icon: FiZap, label: "تصاميم جريئة" },
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