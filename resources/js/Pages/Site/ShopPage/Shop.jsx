import SiteLayout from "@/Layouts/SiteLayout";
import Hero from "./Hero";

export default function Shop({categories,tags}) {

return(
<SiteLayout title="المتجر">
	<Hero categories={categories} tags={tags} />
</SiteLayout>

);
}