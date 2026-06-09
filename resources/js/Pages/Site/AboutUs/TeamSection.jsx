import { motion } from "framer-motion";

const founders = [
  {
    name: "صوفيا روسي",
    role: "المؤسِّسة والمديرة الإبداعية",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrYVHqc9boTpFDfNG0QhVWkbbAwmRlIXELLOzZjp7CjzNv4hOhlHKZbLy-vSMhUd2JSe91yOJAOl-EOiX83idYUIqplX3qALgjwSZ0j2WSYSHhQHvYW44QFTwrVsr9yJU6fKLt57hrRa-qdia79ct4qxifPWwxk1sHuVbNnH-CP1r5KUMYJ0Q0IX7CvIuX2SPIIGQe17_bbYcK-5maW8arF3rrmZKLa0ImbGxTJBntSuUNNbn1riFp5_6ofuJ-t6ds3xKDjOc",
  },
  {
    name: "ماتيو ريتشي",
    role: "الشريك المؤسِّس والرئيس التنفيذي",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0D91-yqersCPvZaCZ2gc7PGO8xinFgyn5T464fGq_j2WTv1fWOXzUQPhtuXWIHDdMf8r3floT083Bmp5r2WmtFRWoCF9XwuU5hBjsg62bUzUUKFkAhOKUFL4B9eEeKVulR_YvecQxT5LpXQ6TsMNUk-V1JTnI_Mp33Q9Jrsu2SvjdKpoigqe6b3qx6k-5RUkvZnCUH4pKbMbscI0q475-TcUIGXXAsS-7rd7mpOQBeqcUJUM0ph0a9KP9o1vVDJqP-Q7iYK8",
  },
  {
    name: "إيلينا كوستا",
    role: "رئيسة قسم التنسيق الفني",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvtSyYZF01VctMdoeQsCeO4NT3tpKP2C4RU_3y4koQH9nwCZV8qx6wYxmBNhYzyoNh0Xx0TLJGKytMgQ93J_53zQcXw8F4R9Ianhy2RvvDB6syofNR8EuTZBXCuHGPQoYVtHUWL3dfwtvPKDJn_sH7gIpUyBtrPsQpq8Pi05rfFKjhDPSv2mHnj7jbVjf8yQWE2VBs-aQtpT4FGlV90l2ki5yHMuwwClVC9NeZsLVeoEwUFJPCxUNxcIRFau0I6q-HAwqJwrY",
  },
  {
    name: "لوكا برونو",
    role: "مدير التسويق",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWEVGjqRJDxGxxh7Hbx07hv8KAvZKlD0BLrNrJHgCgTAOcbVuGVTDUhXG4kiK5LgHf42aCicJdOcVb-V_QuJcEHdSZRJ3A1STstmyfLZ6JD1QAW1wwdIcepIrRP8bZYAPjP3r0PUFtVW1N4bIzMKS2aWlJsxtH9tnU9umbSAxz2oCrXQeSN_Tm7gvyqviYcpCtAaklvFI1H557a4ZKZl4R3kzXYKb-E-eTBwZKOZnoQTvFkNCTYJc4EMSOfOP0_iQulDH3mHs",
  },
];

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

export default function TeamSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* HEADER */}
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

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
        >
          {founders.map((p) => (
            <motion.div
              key={p.name}
              variants={item}
              className="text-center"
            >
              {/* IMAGE */}
              <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-sm border border-[#ece4d8]">
                <img
                  src={p.img}
                  alt={p.name}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700 ease-out
                    hover:scale-110
                  "
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition" />
              </div>

              {/* TEXT */}
              <h4 className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-[var(--text-dark)]">
                {p.name}
              </h4>

              <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1 leading-relaxed">
                {p.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}