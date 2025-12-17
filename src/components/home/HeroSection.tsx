import { Link } from "react-router-dom";
import { Play, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
          src="https://www.youtube.com/embed/lvgxweA0t3U?autoplay=1&mute=1&loop=1&playlist=lvgxweA0t3U&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Background video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      {/* Content */}
      <div className="relative z-10 section-container text-center py-32">
        <div className="max-w-4xl mx-auto">
          <span className="font-script text-cream/80 text-xl md:text-2xl mb-6 block animate-fade-up">
            Cinematic Wedding Films
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-cream leading-tight tracking-wider animate-fade-up animation-delay-200 text-balance uppercase">
            Where Serenity Meets Cinema, Love Becomes a Masterpiece
          </h1>
          <p className="mt-6 text-cream/80 text-lg md:text-xl font-light max-w-2xl mx-auto animate-fade-up animation-delay-400">
            Cinematic wedding films crafted with elegance, emotion, and timeless beauty.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Link
              to="/portfolio"
              className="group flex items-center gap-3 bg-cream text-charcoal px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Watch Our Films
            </Link>
            <Link
              to="/contact"
              className="group flex items-center gap-3 border border-cream/40 text-cream px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/10 hover:border-cream"
            >
              <Mail className="w-5 h-5" />
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
