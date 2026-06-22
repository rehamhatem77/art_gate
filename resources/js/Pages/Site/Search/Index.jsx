import SiteLayout from "@/Layouts/SiteLayout";

import { router } from "@inertiajs/react";

import { getImage } from "@/Utils/GetImage";
import Hero from "./Hero";

export default function Index({ products, search, total, searchPage }) {
    return (
        <SiteLayout title="نتائج البحث">
            <Hero image={searchPage.bg_image} search={search} total={total} />

            <div className="max-w-7xl mx-auto py-10 px-5">
                {products.length ? (
                    <div
                        className="
                            grid

                            md:grid-cols-3

                            lg:grid-cols-4

                            gap-6
                        "
                    >
                        {products.map((product) => (
                            <button
                                key={product.id}
                                onClick={() =>
                                    router.visit(
                                        route(
                                            "shop.product.show",
                                            product.slug,
                                        ),
                                    )
                                }
                                className="
                                    bg-white

                                    rounded-3xl

                                    border

                                    p-4

                                    text-right

                                    hover:shadow-lg

                                    transition
                                "
                            >
                                <img
                                    src={getImage(product.main_image)}
                                    className="
                                        h-60

                                        w-full

                                        rounded-2xl

                                        object-cover
                                    "
                                />

                                <h3
                                    className="
                                        font-semibold

                                        mt-4
                                    "
                                >
                                    {product.name}
                                </h3>

                                <p
                                    className="
                                        text-sm

                                        text-gray-500
                                    "
                                >
                                    {product.category?.name}
                                </p>

                                <p
                                    className="
                                        font-bold

                                        text-[var(--primary)]

                                        mt-3
                                    "
                                >
                                    {product.price} ج.م
                                </p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div
                        className="
                            py-20

                            text-center

                            text-gray-400
                        "
                    >
                        لا توجد نتائج
                    </div>
                )}
            </div>
        </SiteLayout>
    );
}
