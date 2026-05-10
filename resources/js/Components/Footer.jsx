import ApplicationLogo from "./ApplicationLogo";

export default function Footer() {
    return (
        <footer className="bg-brand-bg pt-16 pb-8 border-t border-gray-200">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-right">

                <div>
                    <ApplicationLogo className="h-32 w-auto mb-4" />
                    <p className="text-sm text-gray-600 mt-4">
                        اكتشف مجموعة فريدة من اللوحات الفنية.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">روابط</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>الرئيسية</li>
                        <li>المتجر</li>
                        <li>المدونة</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">الدعم</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>سياسة الخصوصية</li>
                        <li>الشروط</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">تواصل</h4>
                    <p className="text-sm text-gray-600">info@artgate.com</p>
                </div>

            </div>

            <div className="text-center text-xs text-gray-400 mt-10">
                © 2026 Art Gate
            </div>
        </footer>
    );
}