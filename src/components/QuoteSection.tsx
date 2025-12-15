import BookingForm from "./BookingForm";

const QuoteSection = () => {
  return (
    <section id="quote" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            Request a Quote
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're honoured to be part of your special day. Share your details
            below, and we'll get back to you with availability, pricing, and
            next steps.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12">
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
