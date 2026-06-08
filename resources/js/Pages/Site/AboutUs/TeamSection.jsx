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

export default function TeamSection() {
  return (
    <section className="bg-art-beige-light py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-art-dark text-center mb-16">
          مؤسسونا وفريقنا
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {founders.map((p) => (
            <div key={p.name} className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-lg">
                <img alt={p.name} className="w-full h-full object-cover" src={p.img} />
              </div>
              <h4 className="text-lg font-bold text-art-dark">{p.name}</h4>
              <p className="text-sm">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
