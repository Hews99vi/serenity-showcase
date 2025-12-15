import BookingForm from "./BookingForm";

const QuoteSection = () => {
  return (
    <section id="quote" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text */}
          <div className="lg:sticky lg:top-32">
            <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-8">
              Reserve Your Date
            </h2>
            <div className="w-20 h-px bg-cream/30 mb-8" />
            <p className="text-lg text-cream/70 leading-relaxed mb-8">
              We're honoured to be part of your special day. Share your details
              below, and we'll get back to you with availability, pricing, and
              next steps.
            </p>
            <p className="font-script text-2xl text-cream/60 italic">
              "Every love story deserves to be told beautifully."
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 p-8 md:p-12">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
