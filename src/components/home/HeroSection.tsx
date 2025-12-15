import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
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
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 section-container pb-24 md:pb-32">
        <div className="max-w-2xl">
          <span className="text-cream/70 text-xs tracking-[0.4em] uppercase mb-4 block animate-fade-up">
            Cinematic Wedding Films
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-cream leading-[0.9] tracking-tight animate-fade-up animation-delay-200">
            SERENITY
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-cream/30" />
      </div>
    </section>
  );
};

export default HeroSection;
