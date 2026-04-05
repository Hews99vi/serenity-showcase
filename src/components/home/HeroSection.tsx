import { Link } from "react-router-dom";
import { Play, Mail } from "lucide-react";
import heroLogo from "@/assets/serenity-hero-logo.png";
import VideoBackground from "@/components/ui/VideoBackground";
import type { HomeHeroSection } from "@/types/content";

interface HeroSectionProps {
  content: HomeHeroSection;
}

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with smooth loading */}
      <VideoBackground 
        src={content.backgroundVideoPath}
        className="md:scale-100 scale-110"
        overlayClassName="bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30"
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center justify-end min-h-screen px-4 sm:px-6 pb-24 sm:pb-32">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Hero Logo with fade effect */}
          <div className="relative animate-fade-up">
            <div className="relative">
              <img
                src={heroLogo}
                alt="Serenity Wedding Films"
                className="w-40 xs:w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-2xl"
              />
              {/* Soft glow behind logo */}
              <div className="absolute inset-0 -z-10 blur-2xl opacity-30">
                <img src={heroLogo} alt="" className="w-full h-full" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Tagline - small, refined, centered */}
          <span className="text-cream/60 text-[10px] sm:text-xs tracking-[0.15em] uppercase mt-3 sm:mt-4 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.6s_forwards] font-sans font-light text-center max-w-[280px] sm:max-w-none">
            {content.tagline}
          </span>

          {/* CTA Buttons */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full px-4 sm:px-0">
            <Link
              to={content.primaryCtaHref}
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-cream text-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105 shadow-lg opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1s_forwards] w-full sm:w-auto text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              {content.primaryCtaLabel}
            </Link>
            <Link
              to={content.secondaryCtaHref}
              className="group flex items-center justify-center gap-2 sm:gap-3 border border-cream/40 text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/10 hover:border-cream backdrop-blur-sm opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1.3s_forwards] w-full sm:w-auto text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              {content.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-cream/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-6 sm:h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
