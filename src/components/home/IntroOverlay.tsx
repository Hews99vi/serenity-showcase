import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serenityLogo from "@/assets/serenity-logo-icon.png";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"initial" | "curtain" | "hold" | "reveal" | "done">("initial");

  const dark = "#303030";
  const light = "#FFEFC2";

  useEffect(() => {
    // Phase 1: Initial logo reveal (0-400ms)
    const curtainTimer = setTimeout(() => {
      setPhase("curtain");
    }, 400);

    // Phase 2: Curtain rises (400-900ms), then hold
    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 900);

    // Phase 3: Brief hold (900-1050ms), then reveal
    const revealTimer = setTimeout(() => {
      setPhase("reveal");
    }, 1050);

    // Phase 4: Complete (1550ms)
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1550);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(holdTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Dark background layer - slides up on reveal */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ 
              y: phase === "reveal" ? "-100%" : 0 
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: dark }}
          />

          {/* Light curtain - rises from bottom, then slides down on reveal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ 
              y: phase === "initial" ? "100%" : 
                 phase === "curtain" || phase === "hold" ? "35%" : 
                 "100%"
            }}
            transition={{ 
              duration: phase === "reveal" ? 0.5 : 0.5, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-0 z-[101]"
            style={{ backgroundColor: light }}
          />

          {/* Centered logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ 
              opacity: phase === "reveal" ? 0 : 1,
              scale: phase === "initial" ? 0.96 : 1,
              y: phase === "reveal" ? -20 : 0
            }}
            transition={{ 
              opacity: { duration: phase === "reveal" ? 0.3 : 0.35 },
              scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              y: { duration: 0.3 }
            }}
            className="fixed inset-0 z-[102] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Logo icon with subtle glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="relative"
              >
                <img
                  src={serenityLogo}
                  alt="Serenity"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                  style={{ 
                    filter: "brightness(0) invert(1)",
                    opacity: 0.95
                  }}
                />
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 blur-xl opacity-30"
                  style={{ backgroundColor: light }}
                />
              </motion.div>
              
              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                className="font-serif text-xl sm:text-2xl tracking-[0.3em] uppercase"
                style={{ color: light }}
              >
                Serenity
              </motion.div>
              
              {/* Subtle divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.4 }}
                transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
                className="w-12 h-px"
                style={{ backgroundColor: light }}
              />
              
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.25, delay: 0.35, ease: "easeOut" }}
                className="text-[9px] sm:text-[10px] tracking-[0.5em] uppercase font-light"
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
