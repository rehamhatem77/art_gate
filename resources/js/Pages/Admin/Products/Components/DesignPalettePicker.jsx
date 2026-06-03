import { DESIGN_PALETTES } from "@/Constants/DesignPalletes";

export default function DesignPalettePicker({
    value = [],
    onChange,
    error,
}) {
    const togglePalette = (paletteValue) => {
        if (value.includes(paletteValue)) {
            onChange(value.filter((v) => v !== paletteValue));
        } else {
            onChange([...value, paletteValue]);
        }
    };

    return (
        <div className="bg-white rounded-[28px] border border-[#ece6df] p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-[var(--text-dark)]">
                    ألوان اللوحة
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    اختر الألوان المناسبة للتصميم
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DESIGN_PALETTES.map((palette) => {
                    const selected = value.includes(palette.value);

                    return (
                        <button
                            key={palette.value}
                            type="button"
                            onClick={() => togglePalette(palette.value)}
                            className={`
                                p-4
                                rounded-2xl
                                border
                                transition-all
                                text-right

                                ${
                                    selected
                                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                                        : "border-[#ece6df]"
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">
                                    {palette.label}
                                </span>

                                {selected && (
                                    <span className="text-[var(--primary)] text-lg">
                                        ✓
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center mt-4">
                                {palette.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className="
                                            w-6 h-6
                                            rotate-45
                                            border border-white
                                            -ml-1
                                            first:ml-0
                                        "
                                        style={{
                                            backgroundColor: color,
                                            zIndex:
                                                palette.colors.length - i,
                                        }}
                                    />
                                ))}
                            </div>
                        </button>
                    );
                })}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-3">
                    {error}
                </p>
            )}
        </div>
    );
}