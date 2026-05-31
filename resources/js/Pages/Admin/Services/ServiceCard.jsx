import { FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import { iconsMap } from "@/Components/IconPicker";
import { getImage } from "@/Utils/GetImage";
import { PiNeedle } from "react-icons/pi";
import { TbPinned } from "react-icons/tb";

export default function ServiceCard({
    service,
    onEdit,
    onDelete,
}) {
    const isImageIcon =
        service.icon &&
        !iconsMap[service.icon];

    const IconComponent =
        !isImageIcon
            ? iconsMap[service.icon]
            : null;

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-white
                border border-gray-100
                shadow-sm
               
                transition-all
                duration-500
                
            "
        >
            {/* Top Gradient */}
            <div
                className="
                    h-24
                    bg-gradient-to-r
                    from-[var(--primary)]
                    via-[var(--secondary)]
                    to-[var(--primary)]
                    opacity-90
                "
            />

            {/* Icon */}
            <div
                className="
                    absolute
                    top-12
                    left-1/2
                    -translate-x-1/2

                    w-20 h-20
                    rounded-3xl
                    bg-white
                    shadow-lg
                    border-4 border-white

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-500

                    group-hover:scale-110
                    group-hover:rotate-3
                "
            >
                {isImageIcon ? (
                    <img
                        src={getImage(service.icon)}
                        alt={service.name}
                        className="w-10 h-10 object-contain"
                    />
                ) : IconComponent ? (
                    <IconComponent
                        size={34}
                        className="text-[var(--primary)]"
                    />
                ) : (
                    <FiImage
                        size={34}
                        className="text-[var(--primary)]"
                    />
                )}
            </div>

            {/* Content */}
            <div className="pt-16 pb-6 px-4">
                {service.flag==true && (
                    <div
                        className="absolute top-0 left-0 right-0  text-white text-center py-1"
                    >
                       <TbPinned size={18} className="inline-block mr-1" />
                       
                    </div>
                )}
                   
                
                
                <h3
                    className="
                        text-xl
                        font-bold
                        text-center
                        text-[var(--text-dark)]
                    "
                >
                    {service.name}
                </h3>

               
               {service.description && (
                    <p
                        className="
                            mt-4
                            text-sm
                            text-gray-500
                            text-center
                        leading-7
                       
                        overflow-hidden
                    "
                >
                    {service.description}
                </p>
                )}

                {/* Divider */}
                <div className="my-5 border-t border-gray-100" />

                {/* Actions */}
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                >
                    <button
                        onClick={() => onEdit(service)}
                        className="
                            flex
                            items-center
                            justify-center

                            w-9 h-9
                            rounded-full

                            bg-blue-50
                            text-blue-600

                            hover:bg-blue-600
                            hover:text-white

                            transition-all
                            duration-300

                            hover:scale-105
                        "
                    >
                        <FiEdit2 size={14} />
                    </button>

                    <button
                        onClick={() => onDelete(service)}
                        className="
                            flex
                            items-center
                            justify-center

                            w-9 h-9
                            rounded-full

                            bg-red-50
                            text-red-600

                            hover:bg-red-600
                            hover:text-white

                            transition-all
                            duration-300

                            hover:scale-105
                        "
                    >
                        <FiTrash2 size={14} />
                    </button>
                </div>
            </div>

          
        </div>
    );
}