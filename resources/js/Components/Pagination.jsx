import { router } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
    if (!links?.length) return null;

    const formatLabel = (label) => {
        if (!label) return "";

        // handle weird cases like "pagination.next"
        if (label.toLowerCase().includes("next")) return "Next";
        if (label.toLowerCase().includes("previous")) return "Prev";

        return label;
    };

    return (
        <div className="flex justify-center align-center mt-6">
            <div className="flex gap-2 flex-wrap">
                {links.map((link, idx) => (
                    <button
                        key={idx}
                        disabled={!link.url}
                        onClick={() =>
                            link.url && router.get(link.url, {}, { preserveState: true })
                        }
                        className={`
                            px-3 py-1 border rounded text-sm transition
                            ${
                                link.active
                                    ? "bg-[var(--primary)] text-white "
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }
                            ${!link.url ? "opacity-40 cursor-not-allowed" : ""}
                        `}
                    >
                        {formatLabel(link.label)}
                    </button>
                ))}
            </div>
        </div>
    );
}