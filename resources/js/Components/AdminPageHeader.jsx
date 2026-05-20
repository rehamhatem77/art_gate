export default function AdminPageHeader({
    title,
    description,
    icon: Icon,
    actions,
}) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-center gap-4">
                <div
                    className="
									w-14 h-14
									rounded-2xl
									bg-[var(--hover-accent)]
									flex items-center justify-center
								"
                >
                    <Icon className="text-2xl text-[var(--primary)]" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-dark)]">
                        {title}
                    </h1>

                    <p className="text-gray-500 mt-1">{description}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        type={action.type}
                        onClick={action.onClick}
                        className={action.className}
                    >
                        {action.icon && <action.icon className="text-lg" />}
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
