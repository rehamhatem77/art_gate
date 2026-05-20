import { router } from "@inertiajs/react";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

export default function Breadcrumb({ items }) {
    return (
        <div className="flex items-center gap-1 text-sm">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index !== 0 && <FiChevronLeft />}

                    {item.link ? (
                        <button
                            onClick={() => router.get(item.link)}
                            className="hover:text-[var(--primary)]"
                        >
                            {item.name}
                        </button>
                    ) : (
                        <span className="text-[var(--primary)] font-medium">
                            {item.name}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
