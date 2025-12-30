import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serenityLogo from "@/assets/serenity-logo-icon.png";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");

  const dark = "#303030";
  const cream = "#FFEFC2";

  useEffect(() => {
    // Show logo, then exit
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
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
        >
          {/* Full dark background */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ backgroundColor: dark }}
          />

          {/* Elegant curtain wipe from center */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 origin-top"
            style={{ backgroundColor: dark }}
          />

          {/* Centered logo container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ 
              opacity: { duration: phase === "exit" ? 0.4 : 0.6, delay: phase === "exit" ? 0 : 0.2 }
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              {/* Logo */}
              <motion.img
                src={serenityLogo}
                alt="Serenity"
                className="w-14 h-14 sm:w-16 sm:h-16 mb-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              />
              
              {/* Brand name */}
              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                className="font-serif text-xl sm:text-2xl tracking-[0.3em] uppercase mb-2"
                style={{ color: cream }}
              >
                Serenity
              </motion.h1>
              
              {/* Thin line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="w-12 h-px mb-3"
                style={{ backgroundColor: cream, opacity: 0.5 }}
              />
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
                className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase"
                style={{ color: cream }}
              >
                Wedding Films
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
