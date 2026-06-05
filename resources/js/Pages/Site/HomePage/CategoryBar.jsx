import {
    FiHome,
    FiMoon,
    FiImage,
    FiFeather,
    FiHeart,
} from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import { iconsMap } from "@/Components/IconPicker";
import { getImage } from "@/Utils/GetImage";


export default function CategoryBar({ categories }) {
    return (
        <div className="py-4 group relative">
            <div className="container mx-auto px-8 sm:px-12 md:px-12 lg:px-18 xl:px-28">

                {/* Previous */}
                <button
                    className="
        category-prev
        hidden md:flex
        absolute left-2 lg:left-8 xl:left-12
        top-1/2 -translate-y-1/2 z-20
        items-center justify-center
        w-10 h-10 rounded-full
      
        opacity-0 -translate-x-3
        group-hover:opacity-100
        group-hover:translate-x-0
        transition-all duration-300
    "
                >
                    <FiChevronLeft size={34} className="text-[var(--accent)] hover:text-[var(--text-dark)]" />
                </button>

                {/* Next */}
                <button
                    className="
        category-next
        hidden md:flex
        absolute right-2 lg:right-8 xl:right-12
        top-1/2 -translate-y-1/2 z-20
        items-center justify-center
        w-10 h-10 rounded-full
        
        opacity-0 translate-x-3
        group-hover:opacity-100
        group-hover:translate-x-0
        transition-all duration-300
    "
                >
                    <FiChevronRight size={34} className="text-[var(--accent)] hover:text-[var(--text-dark)]" />
                </button>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={{
                        prevEl: ".category-prev",
                        nextEl: ".category-next",
                    }}
                    loop
                    grabCursor
                    dir="rtl"
                    autoplay={{
                        delay: 2500,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 12,
                        },
                        480: {
                            slidesPerView: 2.2,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {categories.map((category) => {
                        const isImageIcon =
                            category.icon &&
                            (
                                category.icon.includes("category-icons/") ||
                                category.icon.endsWith(".png") ||
                                category.icon.endsWith(".jpg") ||
                                category.icon.endsWith(".jpeg") ||
                                category.icon.endsWith(".webp") ||
                                category.icon.endsWith(".svg")
                            );

                        const Icon =
                            !isImageIcon
                                ? iconsMap[category.icon]
                                : null;

                        return (
                            <SwiperSlide key={category.name}>
                                <button
                                onClick={() => {
                                    window.location.href = `/shop?category=${category.id}`;
                                }}
                                    className="
        w-full
        flex items-center justify-center
        gap-2 md:gap-3
        py-2
        text-[var(--text-dark)]
        
       
        transition
    "
                                >
                                    <div className="border-2 border-[var(--border)] p-2 md:p-3 rounded-md">
                                        {isImageIcon ? (
                                            <img
                                                src={getImage(category.icon)}
                                                alt={category.name}
                                                className="w-5 h-5 md:w-7 md:h-7 object-contain"
                                            />
                                        ) : Icon ? (
                                            <Icon className="w-5 h-5 md:w-7 md:h-7" />
                                        ) : (
                                            <FiImage className="w-7 h-7 md:w-9 md:h-9" />
                                        )}
                                    </div>

                                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                                        {category.name}
                                    </span>
                                </button>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}