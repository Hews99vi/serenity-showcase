import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serenityLogo from "@/assets/serenity-logo-icon.png";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");

  const dark = "#303030";
  const cream = "#FFEFC2";

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 1200);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Left panel - slides left */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "exit" ? "-100%" : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full z-[100]"
            style={{ backgroundColor: dark }}
          />

          {/* Right panel - slides right */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "exit" ? "100%" : 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full z-[100]"
            style={{ backgroundColor: dark }}
          />

          {/* Center vertical line accent */}
          <motion.div
            initial={{ scaleY: 1, opacity: 0.3 }}
            animate={{ scaleY: phase === "exit" ? 0 : 1, opacity: phase === "exit" ? 0 : 0.3 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-1/2 w-px h-full z-[101] -translate-x-1/2"
            style={{ backgroundColor: cream }}
          />

          {/* Centered logo container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: phase === "exit" ? 0.3 : 0.5, delay: phase === "exit" ? 0 : 0.2 }}
            className="fixed inset-0 z-[102] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <motion.img
                src={serenityLogo}
                alt="Serenity"
                className="w-14 h-14 sm:w-16 sm:h-16 mb-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              />
              
              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                className="font-serif text-xl sm:text-2xl tracking-[0.3em] uppercase mb-3"
                style={{ color: cream }}
              >
                Serenity
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase"
                style={{ color: cream }}
              >
                Wedding Films
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
