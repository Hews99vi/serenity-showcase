import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream leading-tight mb-8">
            Let Us Capture Your{" "}
            <span className="font-script text-cream/90 block mt-2">
              Wedding Journey
            </span>
          </h2>

          {/* Description */}
          <p className="text-cream/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Connect with us to discuss your wedding film needs, wherever in Sri
            Lanka your celebration awaits. Let's create something beautiful
            together.
          </p>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-cream text-charcoal px-10 py-5 text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-cream/90 hover:scale-105"
          >
            Reserve Your Date
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
    </section>
  );
};

export default CTASection;
