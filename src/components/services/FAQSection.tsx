import { useState, useRef } from "react";
import { Film, Calendar, Clock, Palette, ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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

const WHATSAPP_NUMBER = "94771234567"; // Replace with actual WhatsApp number

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("style");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const faqContainerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenItems([]); // Reset open items when changing category
    
    // Smooth scroll to FAQ container
    if (faqContainerRef.current) {
      faqContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const currentCategory = categories.find((cat) => cat.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15 }
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.15 }
    },
  };

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
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div 
          ref={faqContainerRef}
          className="scroll-mt-32" 
          role="region" 
          aria-label="Frequently Asked Questions"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-3"
            >
              {currentCategory?.faqs.map((faq, index) => {
                const itemId = `${activeCategory}-${index}`;
                const isOpen = openItems.includes(itemId);
                
                return (
                  <motion.div
                    key={itemId}
                    variants={itemVariants}
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
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
                          isOpen
                            ? "bg-cream/10 border-cream/30"
                            : "bg-transparent border-cream/20 group-hover:border-cream/30"
                        )}
                      >
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-colors duration-300",
                          isOpen ? "text-cream" : "text-cream/50"
                        )} />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${itemId}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6">
                            <div className="w-full h-px bg-cream/10 mb-4" />
                            <p className="text-cream/60 text-sm md:text-[15px] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-cream text-charcoal hover:bg-cream/90 px-8 py-3 text-sm tracking-wide font-medium rounded-none"
              >
                <a href="/contact">Request a Quote</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] px-6 py-3 text-sm tracking-wide font-medium rounded-none gap-2"
              >
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm interested in your wedding videography services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm interested in your wedding videography services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 text-white fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </section>
  );
};

export default FAQSection;
