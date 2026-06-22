import {
    FiShield,
    FiLock,
    FiUser,
    FiKey,
    FiCheckCircle,
    FiPackage,
} from "react-icons/fi";

const icons = {
    FiShield,
    FiLock,
    FiUser,
    FiKey,
    FiPackage,
    FiCheckCircle,
};

export default function SecurityEditor({ value = [], onChange }) {
    const addItem = () => {
        onChange([...value, { title: "", icon: "" }]);
    };

    const updateItem = (index, key, val) => {
        const updated = [...value];
        updated[index][key] = val;
        onChange(updated);
    };

    const removeItem = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {value.map((item, index) => {
                const Icon = icons[item.icon];

                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 border rounded-xl p-3"
                    >
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                            {Icon ? <Icon /> : "?"}
                        </div>

                        <input
                            value={item.title}
                            onChange={(e) =>
                                updateItem(index, "title", e.target.value)
                            }
                            className="flex-1 h-10 border rounded-lg px-3"
                            placeholder="العنوان"
                        />

                        <select
                            value={item.icon}
                            onChange={(e) =>
                                updateItem(index, "icon", e.target.value)
                            }
                            className="h-10 border rounded-lg px-2"
                        >
                            <option value="">Icon</option>
                            {Object.keys(icons).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500"
                        >
                            حذف
                        </button>
                    </div>
                );
            })}

            <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-xl"
            >
                إضافة عنصر
            </button>
        </div>
    );
}
