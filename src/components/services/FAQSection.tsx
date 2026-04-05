import { useMemo, useRef, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Clock,
  Film,
  MessageCircle,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type {
  FaqCallToActionSection,
  FaqGroup,
  FaqIntroSection,
  FaqItem,
  SiteSettings,
} from "@/types/content";

interface FAQSectionProps {
  intro: FaqIntroSection;
  cta: FaqCallToActionSection;
  groups: FaqGroup[];
  items: FaqItem[];
  siteSettings: SiteSettings;
}

const faqIconMap = {
  film: Film,
  calendar: Calendar,
  clock: Clock,
  palette: Palette,
} as const;

const FAQSection = ({ intro, cta, groups, items, siteSettings }: FAQSectionProps) => {
  const sortedGroups = useMemo(
    () => [...groups].sort((a, b) => a.sortOrder - b.sortOrder),
    [groups]
  );
  const [activeCategory, setActiveCategory] = useState(sortedGroups[0]?.id ?? "");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const faqContainerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenItems([]);

    if (faqContainerRef.current) {
      faqContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentFaqs = useMemo(
    () => items
      .filter((item) => item.groupId === activeCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    [activeCategory, items]
  );

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
      transition: { duration: 0.15 },
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
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 },
    },
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-charcoal scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light/30 via-transparent to-charcoal-light/20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-cream/40 text-xs tracking-[0.4em] uppercase font-light mb-4 block">
            {intro.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-5">
            {intro.title}
          </h2>
          <div className="w-16 h-px bg-cream/20 mx-auto mb-5" />
          <p className="text-cream/50 text-base md:text-lg max-w-xl mx-auto font-light">
            {intro.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {sortedGroups.map((category) => {
            const Icon = faqIconMap[category.iconName as keyof typeof faqIconMap];
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
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isActive ? "text-cream" : "text-cream/40 group-hover:text-cream/60"
                  )}
                />
                <span className="text-sm font-medium tracking-wide">{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div ref={faqContainerRef} className="scroll-mt-32" role="region" aria-label="Frequently Asked Questions">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-3"
            >
              {currentFaqs.map((faq) => {
                const itemId = faq.id;
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
                      <h3
                        className={cn(
                          "text-base md:text-lg font-serif font-medium transition-colors duration-300 pr-4",
                          isOpen ? "text-cream" : "text-cream/80 group-hover:text-cream"
                        )}
                      >
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
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-colors duration-300",
                            isOpen ? "text-cream" : "text-cream/50"
                          )}
                        />
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

        <div className="mt-14 md:mt-20 text-center">
          <div className="inline-flex flex-col items-center p-8 md:p-10 border border-cream/10 bg-charcoal-light/30 rounded-sm">
            <p className="text-cream/70 text-base md:text-lg font-light mb-2">
              {cta.title}
            </p>
            <p className="text-cream/50 text-sm mb-6 max-w-md">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-cream text-charcoal hover:bg-cream/90 px-8 py-3 text-sm tracking-wide font-medium rounded-none"
              >
                <a href={cta.primaryButtonHref}>{cta.primaryButtonLabel}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] px-6 py-3 text-sm tracking-wide font-medium rounded-none gap-2"
              >
                <a href={siteSettings.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  {cta.secondaryButtonLabel}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <motion.a
        href={siteSettings.whatsappUrl}
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
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </section>
  );
};

export default FAQSection;
