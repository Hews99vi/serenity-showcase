import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CallToActionSection } from "@/types/content";

interface ContactCTAProps {
  content: CallToActionSection;
}

const ContactCTA = ({ content }: ContactCTAProps) => {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-charcoal border-t border-cream/10">
      <div className="section-container text-center px-4 sm:px-6">
        {content.eyebrow && (
          <span className="font-script text-cream/60 text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 block">
            {content.eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-cream leading-tight mb-6 sm:mb-8 max-w-3xl mx-auto tracking-wide uppercase">
          {content.title}
        </h2>
        <p className="text-cream/50 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          {content.description}
        </p>
        <Link
          to={content.buttonHref}
          className="group inline-flex items-center gap-2 sm:gap-3 bg-cream text-charcoal px-6 sm:px-8 py-3 sm:py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-cream/90"
        >
          {content.buttonLabel}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
