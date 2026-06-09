import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import SectionCard from "@/Components/SectionCard";
import AdminPageHeader from "@/Components/AdminPageHeader";
import Breadcrumb from "@/Components/Breadcrumb";
import { FiHome } from "react-icons/fi";

const fieldLabels = {
    // HERO
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

export default function Index({ about }) {
    const [openSection, setOpenSection] = useState(null);
    const [formData, setFormData] = useState({});

    const sections = [
        {
            key: "hero",
            title: "قسم الهيرو",
            fields: [
                "hero_title",
                "hero_subtitle",
                "hero_description",
                "hero_image",
                "footer",
            ],
        },
        {
            key: "vision_mission",
            title: "الرؤية والرسالة",
            fields: [
                "vision_mission_section_title",
                "vision_title",
                "vision_description",
                "mission_title",
                "mission_description",
            ],
        },
        {
            key: "story",
            title: "القصة",
            fields: ["story_title", "story_subtitle", "story_description"],
        },
        {
            key: "video",
            title: "الفيديو التعريفي",
            fields: ["video_title", "video_subtitle", "video_cover", "video_url"],
        },
        {
            key: "team",
            title: "الفريق",
            fields: ["team"],
        },
    ];

    const routeMap = {
        hero: route("about.hero.update"),
        vision_mission: route("about.vision-mission.update"),
        story: route("about.story.update"),
        video: route("about.video.update"),
        team: route("about.team.update"),
    };

    const handleOpen = (section) => {
        if (openSection === section.key) {
            setOpenSection(null);
            return;
        }

        setOpenSection(section.key);

        const initial = {};

        section.fields.forEach((f) => {
            initial[f] = about?.[f] || "";
        });

        if (section.key === "team") {
            initial.team = about?.team || [];
        }

        setFormData(initial);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const submitSection = (key) => {
        const data = new FormData();

        Object.entries(formData).forEach(([k, v]) => {
            if (k === "team") {
                const cleanedTeam = v.map((member) => {
                    return {
                        name: member.name,
                        role: member.role,
                        img:
                            member.img instanceof File || member.img instanceof Blob
                                ? member.img.name
                                : member.img,
                    };
                });

                data.append("team", JSON.stringify(cleanedTeam));

                // attach real files separately
                v.forEach((member, index) => {
                    if (member.img instanceof File) {
                        data.append(`team_images_${index}`, member.img);
                    }
                });
            } else if (v !== null && v !== "") {
                data.append(k, v);
            }
        });

        router.post(routeMap[key], data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setOpenSection(null),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="إدارة صفحة من نحن" />

            <main className="space-y-4">
                <Breadcrumb
                    items={[
                        { name: "لوحة التحكم", link: route("dashboard") },
                        { name: "من نحن" },
                    ]}
                />

                <AdminPageHeader
                    title="إدارة صفحة من نحن"
                    description="تحكم كامل في محتوى صفحة من نحن"
                    icon={FiHome}
                    actions={[]}
                />

                <div className="space-y-4">
                    {sections.map((section) => {
                        const fieldsData = {};

                        section.fields.forEach((f) => {
                            fieldsData[f] = about?.[f] || "";
                        });

                        if (section.key === "team") {
                            fieldsData.team = about?.team || [];
                        }

                        return (
                            <div key={section.key}>
                                <SectionCard
                                    title={section.title}
                                    fieldsData={fieldsData}
                                    onOpen={() => handleOpen(section)}
                                />

                                {openSection === section.key && (
                                    <div className="bg-gray-50 border-l-4 border-[var(--primary)] p-6 mt-2 rounded-b-2xl">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                submitSection(section.key);
                                            }}
                                            className="space-y-4"
                                        >
                                            {/* ================= TEAM ================= */}
                                            {section.key === "team" ? (
                                                <div className="space-y-6">
                                                    {(formData.team || []).map((member, index) => (
                                                        <div
                                                            key={index}
                                                            className="border p-4 rounded-xl space-y-4 bg-white"
                                                        >
                                                            {/* NAME */}
                                                            <div>
                                                                <label className="block mb-1 text-sm font-medium">
                                                                    {fieldLabels["team.name"]}
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    value={member.name || ""}
                                                                    onChange={(e) => {
                                                                        const updated = [...formData.team];
                                                                        updated[index].name = e.target.value;
                                                                        setFormData({
                                                                            ...formData,
                                                                            team: updated,
                                                                        });
                                                                    }}
                                                                    className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                                                />
                                                            </div>

                                                            {/* ROLE */}
                                                            <div>
                                                                <label className="block mb-1 text-sm font-medium">
                                                                    {fieldLabels["team.role"]}
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    value={member.role || ""}
                                                                    onChange={(e) => {
                                                                        const updated = [...formData.team];
                                                                        updated[index].role = e.target.value;
                                                                        setFormData({
                                                                            ...formData,
                                                                            team: updated,
                                                                        });
                                                                    }}
                                                                    className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                                                                />
                                                            </div>

                                                            {/* IMAGE UPLOAD */}
                                                            <div>
                                                                <label className="block mb-1 text-sm font-medium">
                                                                    {fieldLabels["team.img"]}
                                                                </label>

                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="w-full rounded-xl border p-3 bg-white"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (!file) return;

                                                                        const updated = [...formData.team];
                                                                        updated[index].img = file;

                                                                        setFormData({
                                                                            ...formData,
                                                                            team: updated,
                                                                        });
                                                                    }}
                                                                />

                                                                {/* PREVIEW */}
                                                                {member.img && (
                                                                    <img
                                                                        src={
                                                                            member.img instanceof File
                                                                                ? URL.createObjectURL(member.img)
                                                                                : `/storage/${member.img}`
                                                                        }
                                                                        className="w-16 h-16 mt-2 rounded-full object-cover border"
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* DELETE */}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = formData.team.filter(
                                                                        (_, i) => i !== index
                                                                    );

                                                                    setFormData({
                                                                        ...formData,
                                                                        team: updated,
                                                                    });
                                                                }}
                                                                className="text-red-500 text-sm"
                                                            >
                                                                حذف العضو
                                                            </button>
                                                        </div>
                                                    ))}

                                                    {/* ADD MEMBER */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                team: [
                                                                    ...(formData.team || []),
                                                                    { name: "", role: "", img: "" },
                                                                ],
                                                            })
                                                        }
                                                        className="px-4 py-2 bg-green-500 text-white rounded-xl"
                                                    >
                                                        + إضافة عضو
                                                    </button>
                                                </div>
                                            ) : (
                                                /* ================= NORMAL FIELDS ================= */
                                                section.fields.map((field) => (
                                                    <div key={field}>
                                                        <label className="block mb-2 text-sm font-medium">
                                                            {fieldLabels[field] ||
                                                                field}
                                                        </label>

                                                        {field.includes(
                                                            "image"
                                                        ) ||
                                                            field.includes(
                                                                "cover"
                                                            ) ? (
                                                            <input
                                                                type="file"
                                                                name={field}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="w-full
                                                                            h-12
                                                                            rounded-xl
                                                                            border
                                                                            px-4
                                                                            outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]"
                                                            />
                                                        ) : field.includes(
                                                            "description"
                                                        ) ? (
                                                            <textarea
                                                                name={field}
                                                                value={
                                                                    formData[
                                                                    field
                                                                    ] || ""
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="  w-full
                                                                            rounded-xl
                                                                            border
                                                                            p-3
                                                                            outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]"
                                                                rows={4}
                                                            />
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                name={field}
                                                                value={
                                                                    formData[
                                                                    field
                                                                    ] || ""
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="w-full
                                                                            h-12
                                                                            rounded-xl
                                                                            border
                                                                            px-4
                                                                            outline-none
                                                                            focus:ring-1
                                                                            focus:ring-[var(--primary)]
                                                                            focus:border-[var(--primary)]"
                                                            />
                                                        )}
                                                    </div>
                                                ))
                                            )}

                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenSection(null)
                                                    }
                                                    className="px-4 py-2 border rounded-xl"
                                                >
                                                    إلغاء
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="px-5 py-2 bg-[var(--primary)] text-white rounded-xl"
                                                >
                                                    حفظ
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}