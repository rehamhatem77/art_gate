import { iconsMap } from "@/Components/IconPicker";
import {
    FiMoon,
    FiCamera,
    FiHeart,
    FiCoffee,
    FiMap,
    FiFeather,
    FiSmile,
    FiBriefcase,
    FiImage,
    FiActivity,
	FiGrid,
} from "react-icons/fi";

export default function Hero({ categories , tags}) {
const items = [
    ...tags.map(tag => ({
        ...tag,
        type: "tag",
    })),
    ...categories.map(category => ({
        ...category,
        type: "category",
    })),
];
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                    alt=""
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-[#243457]/80 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative items-center max-w-7xl mx-auto px-6 py-16 lg:px-8 lg:py-24">
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl md:text-5xl font-bold">
                        المتجر
                    </h1>
                </div>

                <div
    className="
        grid
        grid-cols-3
        sm:grid-cols-4
        md:grid-cols-5
        lg:grid-cols-8
        gap-x-4
        gap-y-8
		justify-items-center

    "
>
    {items.map((item) => {
        const Icon =
            item.type === "category"
                ? iconsMap[item.icon] || FiGrid
                : FiGrid;

        return (
<div className="group flex wrap row wrap items-end justify-center gap-4" key={`${item.type}-${item.id}`}>
{item.type === "category" && (
                <Icon
                    size={27}
                    className="
                        text-white/90
                        mb-3
                        transition-all
                        duration-300
                        group-hover:text-[var(--primary)]
                        group-hover:scale-110
                    "
                />
)}
            <button
                key={`${item.type}-${item.id}`}
                className="
                    group
                    flex
                    flex-col
                    items-center
                    text-center
                    transition-all
                    duration-300
                "
            >

                <h3
                    className="
                        text-white
                        font-bold
                        text-base
                        mb-1
                        transition-colors
                        duration-300
                        group-hover:text-[var(--primary)]
                    "
                >
                    {item.name}
                </h3>

                <span className="text-white/70 text-sm">
                    {item.products_count ?? 0} منتج
                </span>
            </button>
</div>
        );
    })}
</div>
            </div>
        </section>
    );
}
