import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Phase 1: Show logo briefly
    const logoTimer = setTimeout(() => {
      setPhase("reveal");
    }, 1200);

    // Phase 2: Complete and unmount
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <>
          {/* Split curtain reveal - Left */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "reveal" ? "-100%" : 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full z-[100] bg-cream"
          >
            {/* Elegant edge line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0 : 0.3 }}
              className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cream/40 to-transparent"
            />
          </motion.div>

          {/* Split curtain reveal - Right */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === "reveal" ? "100%" : 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full z-[100] bg-cream"
          >
            {/* Elegant edge line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0 : 0.3 }}
              className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cream/40 to-transparent"
            />
          </motion.div>

          {/* Centered logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "logo" ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Brand name with elegant typography */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="text-charcoal font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase"
              >
                Serenity
              </motion.div>
              
              {/* Minimal line accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="w-12 h-px bg-charcoal/50"
              />
              
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
                className="text-charcoal/60 text-[10px] tracking-[0.4em] uppercase font-light"
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
