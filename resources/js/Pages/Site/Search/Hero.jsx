import { Link, router } from "@inertiajs/react";

import { motion } from "framer-motion";

import {
    FiSearch,
    FiArrowRight,
} from "react-icons/fi";

import { useState } from "react";
import { getImage } from "@/Utils/GetImage";

export default function Hero({
    search,
    total,
image
}) {
    const [value, setValue] =
        useState(search);

    const submit = (e) => {
        e.preventDefault();

        if (!value.trim()) return;

        router.get(
            route("search.page"),
            {
                search: value,
            }
        );
    };

    return (
        <section
            className="
                relative

                min-h-[420px]

                overflow-hidden

                flex

                items-center
            "
        >
            {/* Background */}

            <div className="absolute inset-0">

                <img
                    src={image? getImage(image):"https://images.unsplash.com/photo-1513694203232-719a280e022f"}

                    alt=""

                    className="
                        h-full

                        w-full

                        object-cover
                    "
                />

                 {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      {/* Gold glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b89b72]/20 blur-[120px] rounded-full" />

            </div>

           

           

            <div
                className="
                    relative

                    max-w-7xl

                    mx-auto

                    px-6

                    w-full
                "
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        duration: 0.35,
                    }}

                    className="
                        max-w-4xl

                        mx-auto

                        text-center
                    "
                >
                    {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-center justify-center gap-2 text-sm text-white/70"
          >
            <button
              onClick={() => router.visit(route("home"))}
              className="hover:text-[var(--primary)] transition"
            >
              الرئيسية
            </button>

            <span>/</span>

            <span className="text-[var(--primary)]">
             نتائج البحث
            </span>
          </motion.div>

                    {/* Title */}

                    <h1
                        className="
                            text-3xl

                            md:text-4xl

                            font-black

                            text-white

                            leading-tight
                        "
                    >
                        نتائج البحث عن

                        <span
                            className="
                                mt-4
text-2xl

                            md:text-3xl
                                block

                                text-[var(--primary)]
                            "
                        >
                            "{search}"
                        </span>
                    </h1>

                    {/* Subtitle */}

                    <p
                        className="
                            mt-5

                            text-lg

                            text-white/80
                        "
                    >
                        تم العثور على

                        <span
                            className="
                                mx-2

                                font-bold

                                text-[var(--primary)]
                            "
                        >
                            {total}
                        </span>

                        منتج مطابق لبحثك
                    </p>

                    {/* Search Box */}

                    <form
                        onSubmit={submit}

                        className="
                            mt-10

                            max-w-3xl

                            mx-auto
                        "
                    >
                       <div
    className="
        group
        flex
        h-16
        items-center
        overflow-hidden
        rounded-full
        border
        border-white/20
        bg-green
        backdrop-blur-xl
        transition-all
        duration-300

        

         focus:border-[var(--primary)]
                                    focus:ring-4
                                    focus:ring-transparent
    "
>
    <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) =>
            setValue(e.target.value)
        }
        placeholder="ابحث عن لوحة، فئة أو منتج..."

        className="
            h-full
            w-full
            flex-1

            border-none

            bg-red

            px-7

            text-base
            font-medium

            text-black

            outline-none

            caret-[var(--primary)]

            placeholder:text-white/60
            placeholder:font-normal
        "
    />

    <button
        type="submit"

        className="
            mx-2



            flex

            h-12
            w-12

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[var(--primary)]

            text-white

            transition-all
            duration-300

            hover:scale-105
            hover:brightness-110

            active:scale-95
        "
    >
        <FiSearch size={20} />
    </button>
</div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}