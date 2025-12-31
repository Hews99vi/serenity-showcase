import { Link } from "react-router-dom";
import { Play, Mail } from "lucide-react";
import heroLogo from "@/assets/serenity-hero-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with poster fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster image as fallback background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://meta.vidflow.co/studio/83b2c580/media/1bam7wvl/Still2025-11-25211622181.png?width=2400&height=2400&optimize=image')",
          }}
          aria-hidden="true"
        />

        {/* Video overlay - Vidflow for high quality background video */}
        <iframe
          className="absolute inset-0 w-full h-full scale-150 pointer-events-none"
          src="https://galleries.vidflow.co/videos/3e84bcb0?autoplay=1&muted=1&loop=1&controls=0"
          title="Hero Background Video"
          allow="autoplay; fullscreen"
          allowFullScreen
          aria-hidden="true"
          loading="eager"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 sm:gap-6">
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

          {/* Tagline - balanced with logo */}
          <span className="text-cream/80 text-sm sm:text-base md:text-lg block opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.6s_forwards] font-sans font-extralight tracking-wide text-center px-4 max-w-xs sm:max-w-none">
            Where Serenity Meets Cinema, Love Becomes a Masterpiece
          </span>

          {/* CTA Buttons - positioned with balanced gap */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            <Link
              to="/portfolio"
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-cream text-charcoal px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105 shadow-lg opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1s_forwards] w-full sm:w-auto text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              Watch Our Films
            </Link>
            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2 sm:gap-3 border border-cream/40 text-cream px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/10 hover:border-cream backdrop-blur-sm opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1.3s_forwards] w-full sm:w-auto text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              Request a Quote
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