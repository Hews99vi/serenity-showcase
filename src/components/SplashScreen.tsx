import { motion } from "framer-motion";
import heroLogo from "@/assets/serenity-hero-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
  tagline: string;
}

const SplashScreen = ({ onComplete, tagline }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#303030" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
      <motion.img
        src={heroLogo}
        alt="Serenity Wedding Films"
        className="w-32 sm:w-40 md:w-48 h-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.p
        className="text-cream/70 text-[10px] sm:text-xs tracking-[0.12em] uppercase mt-4 font-sans font-light text-center max-w-[260px] sm:max-w-none px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        {tagline}
      </motion.p>

      <motion.div
        className="mt-8 h-px bg-cream/30 overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default SplashScreen;
