export default function DisplayField({ label, value }) {
    return (
        <div>
            <label className="text-sm font-medium mb-2 block">
                {label}
            </label>

            <div
                className="
                    min-h-[48px]
                    w-full
                    rounded-2xl
                    border border-[#e8dfd7]
                    bg-[#fcfbfa]
                    px-4 py-3
                    flex items-center
                    text-sm
                "
            >
                {value || "-"}
            </div>
        </div>
    );
}