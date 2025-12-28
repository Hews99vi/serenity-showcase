import { useState } from "react";
import { Film, Calendar, Clock, Palette, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "style",
    label: "Style & Services",
    icon: Film,
    faqs: [
      {
        question: "How would you describe your filming style?",
        answer: "Our style is cinematic, natural, and emotion-driven. We focus on capturing couples and people in their real moments as they naturally unfold — without staging or interrupting the flow of your day. The result is a film that feels honest, timeless, and deeply personal.",
      },
      {
        question: "Do you offer 4K wedding films?",
        answer: "Yes. We exclusively film and deliver in 4K. Full HD is becoming outdated, and 4K ensures superior clarity, richer detail, and long-lasting quality for years to come.",
      },
      {
        question: "How many videographers will be present?",
        answer: "We provide a minimum of two professional videographers. Relying on a single videographer carries the risk of missing real moments, so we ensure multiple angles and complete coverage throughout your day.",
      },
      {
        question: "Do you record sound during the wedding?",
        answer: "Yes. We professionally record audio using dedicated sound-recording technology to capture vows, speeches, and important moments clearly.",
      },
    ],
  },
  {
    id: "booking",
    label: "Booking & Coverage",
    icon: Calendar,
    faqs: [
      {
        question: "How do we book Serenity Wedding Films?",
        answer: "Simply submit the Request a Quote form on our website. We will respond within 24 hours with availability and next steps.",
      },
      {
        question: "Do you cover events outside Colombo?",
        answer: "Yes, we cover weddings across Sri Lanka. Travel arrangements and related costs will be clearly discussed during the booking process.",
      },
      {
        question: "Do you cover more than one wedding per day?",
        answer: "No. We strictly cover only one wedding per day to ensure full attention, creativity, and quality for every couple.",
      },
      {
        question: "Do you offer pre-wedding shoots and homecoming coverage?",
        answer: "Yes. Pre-wedding films, engagements, and homecomings are available as add-on services or included in selected packages.",
      },
    ],
  },
  {
    id: "deliverables",
    label: "Deliverables & Timeline",
    icon: Clock,
    faqs: [
      {
        question: "How long will our wedding film be?",
        answer: "Film length depends entirely on the event and package selected. Highlight films usually range from 3–8 minutes, while full cinematic wedding films can be 40–90 minutes or longer, based on coverage and traditions.",
      },
      {
        question: "How long does it take to receive the final film?",
        answer: "Wedding reels: Delivered within 1–2 weeks. Full wedding films: Delivered within 8–12 weeks. Delivery time may vary depending on season and editing complexity, but quality and storytelling are always our priority.",
      },
      {
        question: "How will our final film be delivered?",
        answer: "Your wedding film will be delivered digitally via a secure online link, allowing easy viewing, downloading, and sharing.",
      },
      {
        question: "Will we receive raw footage?",
        answer: "No. We deliver only the final, professionally edited film that represents our creative vision and quality standards.",
      },
    ],
  },
  {
    id: "policies",
    label: "Creative & Policies",
    icon: Palette,
    faqs: [
      {
        question: "Do you provide photography services?",
        answer: "No. We specialize exclusively in wedding videography. Videography requires different techniques, equipment, and creative focus than photography.",
      },
      {
        question: "Can we request music changes in the final edit?",
        answer: "Please note that music selection cannot be changed. Our editors carefully choose and sync music to match the mood, pacing, and emotional flow of your film.",
      },
      {
        question: "Do you publish every wedding video on social media?",
        answer: "Absolutely not. We respect your privacy. Wedding films are shared publicly only with your permission.",
      },
    ],
  },
];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("style");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentCategory = categories.find((cat) => cat.id === activeCategory);

  return (
    <section id="faq" className="py-20 md:py-28 bg-charcoal scroll-mt-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/30 via-transparent to-charcoal-light/20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-cream/40 text-xs tracking-[0.4em] uppercase font-light mb-4 block">
            Everything You Need to Know
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-5">
            We've Got Answers
          </h2>
          <div className="w-16 h-px bg-cream/20 mx-auto mb-5" />
          <p className="text-cream/50 text-base md:text-lg max-w-xl mx-auto font-light">
            Your questions about Serenity Wedding Films, answered with care
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "group flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full border transition-all duration-300",
                  isActive
                    ? "bg-cream/10 border-cream/30 text-cream"
                    : "bg-transparent border-cream/10 text-cream/50 hover:border-cream/20 hover:text-cream/70"
                )}
                aria-pressed={isActive}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-colors duration-300",
                  isActive ? "text-cream" : "text-cream/40 group-hover:text-cream/60"
                )} />
                <span className="text-sm font-medium tracking-wide">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
          {currentCategory?.faqs.map((faq, index) => {
            const itemId = `${activeCategory}-${index}`;
            const isOpen = openItems.includes(itemId);
            
            return (
              <div
                key={itemId}
                className={cn(
                  "group border transition-all duration-300 rounded-sm overflow-hidden",
                  isOpen
                    ? "bg-charcoal-light/60 border-cream/20"
                    : "bg-charcoal-light/30 border-cream/10 hover:border-cream/15 hover:bg-charcoal-light/40"
                )}
              >
                <button
                  onClick={() => toggleItem(itemId)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${itemId}`}
                >
                  <h3 className={cn(
                    "text-base md:text-lg font-serif font-medium transition-colors duration-300 pr-4",
                    isOpen ? "text-cream" : "text-cream/80 group-hover:text-cream"
                  )}>
                    {faq.question}
                  </h3>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
                    isOpen
                      ? "bg-cream/10 border-cream/30 rotate-180"
                      : "bg-transparent border-cream/20 group-hover:border-cream/30"
                  )}>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      isOpen ? "text-cream" : "text-cream/50"
                    )} />
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${itemId}`}
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="w-full h-px bg-cream/10 mb-4" />
                    <p className="text-cream/60 text-sm md:text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-14 md:mt-20 text-center">
          <div className="inline-flex flex-col items-center p-8 md:p-10 border border-cream/10 bg-charcoal-light/30 rounded-sm">
            <p className="text-cream/70 text-base md:text-lg font-light mb-2">
              Still have questions?
            </p>
            <p className="text-cream/50 text-sm mb-6 max-w-md">
              We'd love to hear from you and discuss your wedding vision
            </p>
            <Button
              asChild
              className="bg-cream text-charcoal hover:bg-cream/90 px-8 py-3 text-sm tracking-wide font-medium rounded-none"
            >
              <a href="/contact">Request a Quote</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
