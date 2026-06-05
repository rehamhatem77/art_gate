import { useEffect, useState } from "react";
import { iconsMap } from "@/Components/IconPicker";
import { FiGrid, FiX } from "react-icons/fi";

export default function Hero({ categories, tags, onSelect }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({
        type: null,
        id: null,
    });
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get("category");
    const initialTag = urlParams.get("tag");

    useEffect(() => {
        if (initialCategory) {
            setSelected({ type: "category", id: Number(initialCategory) });
        } else if (initialTag) {
            setSelected({ type: "tag", id: Number(initialTag) });
        }
    }, [initialCategory, initialTag]);

    const items = [
        ...tags.map((tag) => ({ ...tag, type: "tag" })),
        ...categories.map((category) => ({ ...category, type: "category" })),
    ];

    const handleSelect = (item) => {
        setSelected({ type: item.type, id: item.id });
        setOpen(false);
        onSelect?.(item);
    };
    const selectedItem =
    items.find(
        (item) =>
            item.id === selected?.id &&
            item.type === selected?.type
    );
    
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#243457]/80" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                {/* TITLE */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl md:text-5xl font-bold">
                        {selectedItem?.name || "المتجر"}
                    </h1>
                </div>

                {/* MOBILE BUTTON */}
                <div className="md:hidden flex justify-center mb-6">
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-6 py-3 text-white text-lg shadow font-bold flex items-center gap-2"
                    >
                        {open ? <FiX /> : <FiGrid />}
                        الأقسام
                    </button>
                </div>

                {/* GRID */}
                <div
                    className={`
                        grid
                        grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7
                        gap-6
                        justify-items-center
                        
                        transition-all duration-300
                        ${open ? "block" : "hidden md:grid"}
                    `}
                >
                    {items.map((item) => {
                        const Icon =
                            item.type === "category"
                                ? iconsMap[item.icon] || FiGrid
                                : FiGrid;
                        const isActive =
                            selected.type === item.type &&
                            selected.id === item.id;



                        return (
                            <button
                                key={`${item.type}-${item.id}`}
                                onClick={() => handleSelect(item)}
                                className="
                                    flex flex-col items-center text-center justify-end
                                    group transition
                                "
                            >
                                {item.type === "category" && (
                                    <Icon
                                        size={26}
                                        className={`
                                            mb-2 transition
                                            group-hover:scale-110
                                            ${isActive
                                                ? "text-[var(--primary)]"
                                                : "text-white/90 group-hover:text-[var(--primary)]"
                                            }
                                        `}
                                    />
                                )}

                                <h3 className={`
                                        font-bold transition
                                        ${isActive
                                            ? "text-[var(--primary)]"
                                            : "text-white group-hover:text-[var(--primary)]"
                                        }
                                    `}>
                                    {item.name}
                                </h3>

                                <span className="text-white/70 text-sm">
                                    {item.products_count ?? 0} منتج
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}