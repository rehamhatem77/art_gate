import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function TeamSection({ team = [] }) {
  const count = team.length;

  const getGridClass = () => {
    if (count === 1) return "grid-cols-1 justify-items-center";
    if (count === 2) return "grid-cols-2 max-w-2xl mx-auto";
    if (count === 3) return "grid-cols-3 max-w-4xl mx-auto";
    if (count === 4) return "grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* HEADER (KEEP ANIMATION) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-14 lg:mb-16"
        >
          <motion.h2
            variants={titleVariant}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-dark)]"
          >
            مؤسسونا وفريقنا
          </motion.h2>

          <motion.div
            variants={titleVariant}
            className="w-16 h-[2px] bg-[var(--primary)] mx-auto mt-5 rounded-full opacity-80"
          />
        </motion.div>

        {/* GRID (KEEP ANIMATION) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className={`grid gap-6 sm:gap-8 lg:gap-10 ${getGridClass()}`}
        >
          {team?.length > 0 ? (
            team.map((p, index) => (
              <motion.div
                key={index}
                variants={item}
                className="text-center flex flex-col items-center"
              >
                {/* IMAGE */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-sm border border-[#ece4d8]">
                  <img
                    src={
                      p.img?.startsWith("http")
                        ? p.img
                        : `/storage/${p.img}`
                    }
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                {/* TEXT */}
                <h4 className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-[var(--text-dark)]">
                  {p.name}
                </h4>

                <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1">
                  {p.role}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              لا يوجد فريق حالياً
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}