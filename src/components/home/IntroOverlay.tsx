import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serenityLogo from "@/assets/serenity-logo-icon.png";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  // Colors as specified
  const dark = "#303030";
  const light = "#FFEFC2";

  useEffect(() => {
    // Phase 1: Show logo (800ms)
    const logoTimer = setTimeout(() => {
      setPhase("reveal");
    }, 900);

    // Phase 2: Complete reveal (1.5s total)
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Dark panel - slides up */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase === "reveal" ? "-100%" : 0 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.4, 0, 0.2, 1],
              delay: phase === "reveal" ? 0.05 : 0
            }}
            className="fixed top-0 left-0 w-full h-1/2 z-[100]"
            style={{ backgroundColor: dark }}
          />

          {/* Light panel - slides down */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: phase === "reveal" ? "100%" : 0 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.4, 0, 0.2, 1],
              delay: phase === "reveal" ? 0.05 : 0
            }}
            className="fixed bottom-0 left-0 w-full h-1/2 z-[100]"
            style={{ backgroundColor: light }}
          />

          {/* Center divider line */}
          <motion.div
            initial={{ scaleX: 1, opacity: 1 }}
            animate={{ 
              scaleX: phase === "reveal" ? 0 : 1,
              opacity: phase === "reveal" ? 0 : 1
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-1/2 left-0 w-full h-px z-[101]"
            style={{ backgroundColor: light, transform: 'translateY(-50%)' }}
          />

          {/* Centered logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: phase === "logo" ? 1 : 0, 
              scale: phase === "logo" ? 1 : 1.05 
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-0 z-[102] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Logo icon */}
              <motion.img
                src={serenityLogo}
                alt="Serenity"
                className="w-16 h-16 sm:w-20 sm:h-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              />
              
              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
                className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase"
                style={{ color: light }}
              >
                Serenity
              </motion.div>
              
              {/* Subtle tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-light"
                style={{ color: light }}
              >
                Wedding Films
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
