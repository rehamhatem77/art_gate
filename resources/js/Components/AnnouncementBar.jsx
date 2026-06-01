export default function AnnouncementBar({announcement}) {
    return (
        <div className="bg-[var(--primary)] flex justify-center py-2 text-white text-sm font-medium text-center">
           {announcement || "اكتشف الفنية إلى متجر من الفخامة على مساحتك"}
        </div>
    );
}