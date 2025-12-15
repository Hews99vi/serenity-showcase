import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

const Hero = ({ onOpenBooking }: HeroProps) => {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="gradient-overlay-dark" />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Brand Text */}
          <div className="animate-fade-up mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-medium text-cream tracking-wide leading-none">
              SERENITY
            </h1>
          </div>
          
          {/* Script Subtitle */}
          <div className="animate-fade-up animation-delay-200 mb-8">
            <span className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream/90 tracking-wide">
              wedding films
            </span>
          </div>

          {/* Tagline */}
          <div className="animate-fade-up animation-delay-400 mb-12">
            <p className="text-sm sm:text-base text-cream/70 tracking-[0.25em] uppercase font-light max-w-2xl mx-auto">
              Cinematic Wedding Films, Wherever Love Takes You
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up animation-delay-600">
            <button
              onClick={scrollToPortfolio}
              className="group inline-flex items-center gap-3 bg-charcoal/80 backdrop-blur-sm text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-cream hover:text-charcoal border border-cream/20 hover:border-cream"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-cream/0 via-cream/50 to-cream/0" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-cream/10 hidden lg:block" />
      <div className="absolute top-1/4 right-10 w-px h-32 bg-cream/10 hidden lg:block" />
    </section>
  );
};

export default Hero;
