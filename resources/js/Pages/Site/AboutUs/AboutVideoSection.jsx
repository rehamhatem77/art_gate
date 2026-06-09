import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import { getImage } from "@/Utils/GetImage";
function getYouTubeId(url) {
  if (!url) return "";

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?/]+)/
  );

  return match ? match[1] : "";
}
export default function AboutVideoSection({section}) {
  const [open, setOpen] = useState(false);
  const videoId = getYouTubeId(section?.url);

  return (
    <>
      {/* HERO CARD */}
      <section className="py-20 flex justify-center ">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-[92%] max-w-6xl"
        >
          {/* PILL CONTAINER */}
          <div className="relative h-[320px] sm:h-[400px] md:h-[460px] rounded-[999px] overflow-hidden shadow-xl">

            {/* BACKGROUND IMAGE */}
            <img
              src={section.cover?getImage(section.cover) :"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000"}
              className="w-full h-full object-cover scale-110"
              alt="luxury interior"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* CONTENT (NO MOTION HERE) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">

              <p className="text-sm md:text-base text-white/80 mb-2">
              { section.subtitle ||" أين تجد؟"}
              </p>

              <h2 className="text-lg sm:text-2xl md:text-3xl font-medium max-w-2xl">
              { section.title || "هناك العديد من الأنواع المتوفرة من الأعمال الفنية"}
              </h2>

              {/* BUTTON (optional small motion only) */}
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  mt-6
                  w-14 h-14 sm:w-16 sm:h-16
                  rounded-full
                  bg-white/10 backdrop-blur-md
                  border border-white/40
                  flex items-center justify-center
                "
              >
                <FiPlay className="text-white text-xl ml-0.5" />
              </motion.button>

            </div>
          </div>
        </motion.div>
      </section>

      {/* VIDEO MODAL */}
       <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              <FiX />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {videoId ? (
                <iframe
                  className="w-full h-full rounded-2xl"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="About Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <p className="text-white text-center">
                  Invalid video URL
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}