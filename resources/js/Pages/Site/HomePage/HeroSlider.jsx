import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { router } from "@inertiajs/react";

const sliders = [
    {
        name: "أقوى التشكيلات الإسلامية",

        price: "250.00 ج.م",
        number: "01",
        roomImage:
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000",
        productImage:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800",
    },
    {
        title: "تابلوهات الطبيعة الحديثة",

        price: "320.00 ج.م",
        number: "02",
        roomImage:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000",
        productImage:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800",
    },
    {
        title: "مجموعة التابلوهات المودرن",

        price: "290.00 ج.م",
        number: "03",
        roomImage:
            "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2000",
        productImage:
            "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=800",
    },
];

export default function HeroSlider({ slides }) {
    const slidesData = slides ? slides : sliders;

    return (
        <section className="relative py-3 lg:py-4">
            <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-18 xl:px-24 2xl:px-32">
                <div className="relative group">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation={{
                            prevEl: ".hero-prev",
                            nextEl: ".hero-next",
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        loop={slidesData.length > 1}
                        className="hero-swiper rounded-3xl overflow-hidden "
                    >
                        {slidesData.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="
                                        grid
                                        grid-cols-[130px_1fr]
sm:grid-cols-[180px_1fr]
lg:grid-cols-[320px_1fr]
xl:grid-cols-[360px_1fr]
                                       h-[320px]
md:h-[450px]
lg:h-[560px]
xl:h-[600px]
                                    "
                                >
                                    {/* Product Panel */}
                                    <div
                                        className="
                                            relative
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            text-center
                                            overflow-hidden
                                            px-4
                                            md:px-8
                                            bg-gradient-to-br
                                            from-slate-50
                                            to-blue-50
                                        "
                                    >
                                        {/* Decorative Number */}
                                        <div
                                            className="
                                                absolute
                                                bottom-[-40px]
                                                left-0
                                                text-[120px]
                                                md:text-[180px]
                                                lg:text-[260px]
                                                font-bold
                                                text-[var(--border)]
                                                opacity-30
                                                leading-none
                                                select-none
                                            "
                                        >
                                            {slide.order
                                                ? slide.order
                                                : slide.number}
                                        </div>

                                        {/* Title */}
                                        <h2
                                            className="
                                                relative z-10
                                               text-base
md:text-2xl
lg:text-4xl
                                                font-semibold
                                                text-[var(--text-dark)]
                                                leading-relaxed
                                                mb-6
                                            "
                                        >
                                            {slide.title
                                                ? slide.title
                                                : slide.name}
                                        </h2>

                                        {/* Product Image */}
                                        <div className="relative z-10 mb-6">
                                            <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full" />

                                            <img
                                                src={
                                                    slide.product?.main_image
                                                        ? `/storage/${slide.product.main_image}`
                                                        : slide.productImage
                                                }
                                                alt={
                                                    slide.product?.name ||
                                                    slide.name
                                                }
                                                className="
                                                    relative
                                                    h-20
md:h-32
lg:h-52
                                                    object-contain
                                                    rounded-lg
                                                    shadow-2xl
                                                "
                                            />
                                        </div>

                                        {/* Price */}
                                        <p
                                            className="
                                                relative z-10
                                                text-base
                                                md:text-xl
                                                lg:text-3xl
                                                font-medium
                                                text-[var(--text-dark)]
                                                mb-6
                                            "
                                        >
                                            {slide.product?.price
                                                ? `${slide.product.price} ج.م`
                                                : slide.price}
                                        </p>

                                        {/* Button */}
                                        <button
                                            onClick={() => {
                                                router.visit(
                                                    route(
                                                        "shop.product.show",
                                                        slide.product.slug,
                                                    ),
                                                );
                                            }}
                                            className="
                                                relative z-10
                                                px-5
                                                md:px-8
                                                py-2.5
                                                rounded-full
                                                bg-[var(--accent)]
                                                text-white
                                                hover:opacity-90
                                                transition
                                            "
                                        >
                                            عرض المنتج
                                        </button>
                                    </div>

                                    {/* Room Image */}
                                    <div className="relative h-full overflow-hidden">
                                        <img
                                            src={
                                                slide.image
                                                    ? `/storage/${slide.image}`
                                                    : slide.roomImage
                                            }
                                            alt={slide.title}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                                object-center
                                                transition-all
                                                duration-700
                                                group-hover:scale-105
                                            "
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Prev */}
                    <button
                        className="
                            hero-prev
                            hidden md:flex
                            absolute
                           left-0 lg:left-0 xl:left-0
                            top-1/2
                            -translate-y-1/2
                            z-20
                           
                            transition-all
                            duration-300
                        "
                    >
                        <FiChevronLeft
                            size={40}
                            className="text-[var(--text-dark)]"
                        />
                    </button>

                    {/* Next */}
                    <button
                        className="
                            hero-next
                            hidden md:flex
                            absolute
                            right-0 lg:right-0 xl:right-0
                            top-1/2
                            -translate-y-1/2
                            z-20
                            transition-all
                            duration-300
                        "
                    >
                        <FiChevronRight
                            size={40}
                            className="text-[var(--text-dark)] "
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
