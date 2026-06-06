// Hooks/useRecentlyViewed.js

import { useEffect, useState } from "react";

export default function useRecentlyViewed() {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        const items = JSON.parse(
            localStorage.getItem("recentlyViewed") || "[]"
        );

        setProducts(items);
    };

    useEffect(() => {
        loadProducts();

        window.addEventListener(
            "recentlyViewedUpdated",
            loadProducts
        );

        return () => {
            window.removeEventListener(
                "recentlyViewedUpdated",
                loadProducts
            );
        };
    }, []);

    return products;
}