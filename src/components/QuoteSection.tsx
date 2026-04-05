import BookingForm from "./BookingForm";
import type { ContactQuoteSection as ContactQuoteSectionContent } from "@/types/content";

interface QuoteSectionProps {
  content: ContactQuoteSectionContent;
}

const QuoteSection = ({ content }: QuoteSectionProps) => {
  return (
    <section id="quote" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              {content.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-8">
              {content.title}
            </h2>
            <div className="w-20 h-px bg-cream/30 mb-8" />
            <p className="text-lg text-cream/70 leading-relaxed mb-8">
              {content.description}
            </p>
            <p className="font-script text-2xl text-cream/60 italic">
              {content.quoteText}
            </p>
          </div>

          <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 p-8 md:p-12">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
