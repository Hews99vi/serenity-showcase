import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroLogo from "@/assets/serenity-hero-logo.png";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out after logo animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    // Call onComplete when animation is done
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal"
        >
          {/* Subtle grain texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Cinematic bars */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 h-16 bg-charcoal origin-top z-10"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 h-16 bg-charcoal origin-bottom z-10"
          />

          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            {/* Soft glow behind logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.2 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 blur-3xl"
            >
              <img 
                src={heroLogo} 
                alt="" 
                className="w-56 sm:w-72 md:w-80 h-auto opacity-30" 
                aria-hidden="true" 
              />
            </motion.div>

            {/* Main logo */}
            <motion.img
              src={heroLogo}
              alt="Serenity Wedding Films"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="w-48 sm:w-64 md:w-72 h-auto relative z-10 drop-shadow-2xl"
            />

            {/* Elegant line underneath */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-cream/60 to-transparent mt-6"
            />

            {/* Subtle tagline */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
              className="text-cream/50 text-xs tracking-[0.3em] uppercase mt-4 font-light"
            >
              Cinematic Wedding Films
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
