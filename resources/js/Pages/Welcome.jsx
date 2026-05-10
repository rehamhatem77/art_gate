import SiteLayout from "@/Layouts/SiteLayout";


export default function Welcome({ auth }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
          <SiteLayout title="ArtGate - الصفحة الرئيسية">
            <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">
                  اكتشف الفنية إلى متجر من الفخامة على مساحتك
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  استكشف مجموعة فريدة من اللوحات الفنية المختارة بعناية.
                </p>
                <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-md hover:bg-[var(--primary-dark)] transition">
                  تصفح المتجر
                </button>
              </div>
              <div id="screenshot-container" className="relative">
                <img
                  id="background"
                  src=""
                  alt="Homepage Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <img
                  src=""
                  alt="Homepage Screenshot"
                  className="relative rounded-lg shadow-lg"
                  onError={handleImageError}
                />
              </div>
            </div>
          </SiteLayout>
        </>
    );
}
