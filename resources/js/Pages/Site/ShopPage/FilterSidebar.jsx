import { DESIGN_PALETTES } from "@/Constants/DesignPalletes";
import {
    PLACE_OPTIONS,
    SHAPE_OPTIONS,
    PIECES_OPTIONS,
} from "@/Constants/filterOptions";
import FilterButton from "./FilterButton";

export default function FilterSidebar({ filters, setFilters, counts = {} }) {
    const toggleArrayFilter = (field, value) => {
        const current = filters[field] || [];

        if (current.includes(value)) {
            setFilters({
                ...filters,
                [field]: current.filter((v) => v !== value),
            });
        } else {
            setFilters({
                ...filters,
                [field]: [...current, value],
            });
        }
    };

    return (
        <>
            {/* COLORS */}
            <section>
                <h3 className="text-sm font-bold text-[#7b5b3e] mb-4">
                    تصفية حسب اللون
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    {DESIGN_PALETTES.map((palette) => (
                        <button
                            key={palette.value}
                            type="button"
                            onClick={() =>
                                toggleArrayFilter(
                                    "design_colors",
                                    palette.value,
                                )
                            }
                            className={`
                relative
                group
                p-2
                rounded-xl
                transition-all
                duration-300
                border
                ${
                    filters.design_colors?.includes(palette.value)
                        ? "border-[var(--primary)] bg-[var(--bg-lighter)] shadow-sm"
                        : "border-transparent hover:border-[#ddd]"
                }
            `}
                        >
                            {/* TOOLTIP */}
                            <div
                                className="
                    absolute
                    bottom-full
                    left-1/2
                    -translate-x-1/2
                    mb-2
                    px-3
                    py-1.5
                    rounded-lg
                    bg-[#1f2937]
                    text-white
                    text-xs
                    whitespace-nowrap
                    opacity-0
                    invisible
                    group-hover:opacity-100
                    group-hover:visible
                    transition-all
                    duration-200
                    pointer-events-none
                    z-50
                    shadow-lg
                "
                            >
                                {palette.label}

                                {/* Arrow */}
                                <div
                                    className="
                        absolute
                        top-full
                        left-1/2
                        -translate-x-1/2
                        w-2
                        h-2
                        bg-[#1f2937]
                        rotate-45
                        -mt-1
                    "
                                />
                            </div>

                            {/* Palette Colors */}
                            <div className="flex justify-center">
                                {palette.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="
                            w-4
                            h-4
                            rotate-45
                            -ml-1
                            first:ml-0
                            transition-transform
                            duration-300
                            
                        "
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Selected Dot */}
                            {filters.design_colors?.includes(palette.value) && (
                                <div
                                    className="
                        absolute
                        top-1
                        right-1
                        w-2
                        h-2
                        rounded-full
                        bg-[var(--primary)]
                    "
                                />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <div className="border-t my-6" />

            {/* PLACE */}
            <section>
                <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2">
                    المكان
                </h3>

                <div
                    className="
            max-h-[220px]
            overflow-y-auto
            pr-1
            custom-scroll
        "
                >
                    {PLACE_OPTIONS.map((place) => (
                        <FilterButton
                            key={place}
                            label={place}
                            count={counts.place?.[place] || 0}
                            active={filters.place?.includes(place)}
                            onClick={() => toggleArrayFilter("place", place)}
                        />
                    ))}
                </div>
            </section>

            <div className="border-t my-6" />

            {/* SHAPE */}
            <section>
                <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2">
                    شكل اللوحة
                </h3>
                <div
                    className="
            max-h-[220px]
            overflow-y-auto
            pr-1
            custom-scroll
        "
                >
                    {SHAPE_OPTIONS.map((shape) => (
                        <FilterButton
                            key={shape}
                            label={shape}
                            count={counts.shape?.[shape] || 0}
                            active={filters.shape?.includes(shape)}
                            onClick={() => toggleArrayFilter("shape", shape)}
                        />
                    ))}
                </div>
            </section>

            <div className="border-t my-6" />

            {/* PIECES */}
            <section>
                <h3 className="text-lg font-bold text-[var(--text-dark)] mb-2">
                    عدد القطع
                </h3>
                <div
                    className="
            max-h-[220px]
            overflow-y-auto
            pr-1
            custom-scroll
        "
                >
                    {PIECES_OPTIONS.map((piece) => (
                        <FilterButton
                            key={piece}
                            label={piece}
                            count={counts.pieces?.[piece] || 0}
                            active={filters.pieces?.includes(piece)}
                            onClick={() => toggleArrayFilter("pieces", piece)}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
