import CategoryBar from "./CategoryBar";
import HeroSlider from "./HeroSlider";

export default function HeroSection({ categories }) {
    return (
        <>
            <CategoryBar categories={categories} />
            <HeroSlider />
        </>
    );
}



