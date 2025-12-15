import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none scale-110"
          src="https://stream.vidflow.co/89710a190/studio/83b2c580/videos/c6b98410-d0860afb/u/Final_main.mp4"
          poster="https://meta.vidflow.co/studio/83b2c580/media/1bam7wvl/Still2025-11-25211622181.png?width=2400&height=2400&optimize=image"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className="animate-fade-up mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-cream leading-tight tracking-wide">
              Celebrate Your Love with{" "}
              <span className="block mt-2">Cinematic Films</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-up animation-delay-200 mb-12">
            <p className="text-base sm:text-lg md:text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed font-light">
              At Serenity Wedding Films, we specialize in capturing the magical
              moments of your Sri Lankan wedding journey. From romantic pre-wedding
              sessions to grand celebrations, we bring artistry and heart to every
              frame.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-cream text-charcoal px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-cream/90 hover:scale-105"
            >
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 bg-transparent text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-cream/10 border border-cream/40 hover:border-cream"
            >
              <Play className="w-4 h-4" />
              Our Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-cream/50 text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
