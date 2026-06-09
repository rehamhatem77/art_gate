import { FiEdit, FiPlus, FiImage, FiLayers } from "react-icons/fi";

const fieldLabels = {
    announcement: "الإعلان",

    about_section_title: "العنوان",
    about_section_subtitle: "العنوان الفرعي",
    about_section_description: "الوصف",
    about_section_image: "الصورة",
    about_section_video: "الفيديو",

    special_section_title: "العنوان",
    special_section_subtitle: "العنوان الفرعي",
    special_section_description: "الوصف",
    special_section_button_text: "نص الزر",

    category_section_title: "العنوان",
    category_section_subtitle: "العنوان الفرعي",
    category_section_description: "الوصف",


    hero_title: "عنوان الهيرو",
    hero_subtitle: "العنوان الفرعي",
    hero_description: "الوصف",
    hero_image: "صورة الهيرو",
    footer: "نص الفوتر",

    // VISION & MISSION
    vision_mission_section_title: "عنوان قسم الرؤية والرسالة",
    vision_title: "عنوان الرؤية",
    vision_description: "وصف الرؤية",
    mission_title: "عنوان الرسالة",
    mission_description: "وصف الرسالة",

    // STORY
    story_title: "عنوان القصة",
    story_subtitle: "العنوان الفرعي للقصة",
    story_description: "تفاصيل القصة",

    // VIDEO
    video_title: "عنوان الفيديو",
    video_subtitle: "العنوان الفرعي للفيديو",
    video_cover: "صورة الغلاف",
    video_url: "رابط الفيديو",

    // TEAM
    team: "الفريق",
    "team.name": "اسم العضو",
    "team.role": "المسمى الوظيفي",
    "team.img": "صورة العضو",
};

export default function SectionCard({
    title,
    fieldsData,
    onOpen,
}) {
    const isSlider =
        Object.prototype.hasOwnProperty.call(
            fieldsData,
            "slider"
        );

    // const hasData = isSlider
    //     ? fieldsData.slider?.length > 0
    //     : Object.values(fieldsData).some(
    //         (value) =>
    //             value !== null &&
    //             value !== "" &&
    //             value !== undefined
    //     );
    const hasData = isSlider
    ? fieldsData.slider?.length > 0
    : Object.entries(fieldsData).some(([key, value]) => {
          if (key === "team") return value?.length > 0;

          if (typeof value === "object" && value !== null) return false;

          return value !== null && value !== "" && value !== undefined;
      });
      

    // const imageField = Object.keys(
    //     fieldsData
    // ).find(
    //     (key) =>
    //         key.includes("image") &&
    //         fieldsData[key]
    // );
    const imageField = Object.entries(fieldsData).find(
    ([key, value]) =>
        key.includes("image") &&
        value &&
        typeof value === "string"
)?.[0];

    // const previewFields = Object.entries(
    //     fieldsData
    // )
    //     .filter(
    //         ([key, value]) =>
    //             value &&
    //             !key.includes("image") &&
    //             key !== "slider" &&
    //             key !== "team"

    //     )
    //     .slice(0, 3);
    const previewFields = Object.entries(fieldsData)
    .filter(([key, value]) => {
        if (!value) return false;
        if (key === "slider" || key === "team") return false;
        if (typeof value === "object") return false;
        if (key.includes("image")) return false;

        return true;
    })
    .slice(0, 3);

    return (
        <div
            className="
                group
                bg-white
                border border-[#ece6df]
                rounded-[28px]
                p-6
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {hasData
                            ? "تمت إضافة بيانات لهذا القسم"
                            : "لا توجد بيانات بعد"}
                    </p>
                </div>

                <button
                    onClick={onOpen}
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-[var(--primary)]
                        text-white
                        text-sm
                        font-medium
                        hover:opacity-90
                        transition
                    "
                >
                    {hasData ? (
                        <FiEdit />
                    ) : (
                        <FiPlus />
                    )}

                    {hasData
                        ? "تعديل"
                        : "إضافة"}
                </button>
            </div>

            {/* Slider Preview */}
            {isSlider ? (
                <div
                    className="
                        flex items-center gap-4
                        p-4
                        rounded-2xl
                        bg-gray-50
                        border
                    "
                >
                    <div
                        className="
                            w-14 h-14
                            rounded-2xl
                            bg-[var(--primary)]
                            text-white
                            flex items-center justify-center
                        "
                    >
                        <FiLayers size={24} />
                    </div>

                    <div>
                        <p className="font-semibold">
                            السلايدر الرئيسي
                        </p>

                        <p className="text-sm text-gray-500">
                            عدد الشرائح:
                            {" "}
                            {fieldsData.slider?.length || 0}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-4">
                    {/* Image */}
                    {imageField && (
                        <div
                            className="
                                w-36
                                h-28
                                rounded-2xl
                                overflow-hidden
                                border
                                shrink-0
                            "
                        >
                            <img
                                src={`/storage/${fieldsData[imageField]}`}
                                alt=""
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "
                            />
                        </div>
                    )}
                    {fieldsData.team?.length > 0 && (
                        <div className="text-sm text-gray-600">
                            👥 عدد الفريق: {fieldsData.team.length}
                        </div>
                    )}

                    {/* Text Preview */}
                    <div className="flex-1 space-y-3">
                        {previewFields.length ? (
                            previewFields.map(
                                ([key, value]) => (
                                    <div
                                        key={key}
                                        className="text-sm"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            {fieldLabels[
                                                key
                                            ] ||
                                                key}
                                            :
                                        </span>

                                        <span className="text-gray-600 mr-2">
                                            {String(
                                                value
                                            ).length >
                                                70
                                                ? `${String(
                                                    value
                                                ).slice(
                                                    0,
                                                    70
                                                )}...`
                                                : value}
                                        </span>
                                    </div>
                                )
                            )
                        ) : (
                            <div
                                className="
                                    flex items-center
                                    gap-2
                                    text-gray-400
                                    text-sm
                                "
                            >
                                <FiImage />
                                لا توجد بيانات لعرضها
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}