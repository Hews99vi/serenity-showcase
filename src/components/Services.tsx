import { Calendar, ChevronDown, Clock, Eye, Film, Heart, MapPin, Palette, Plane, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FAQSection from "@/components/services/FAQSection";
import type {
  FaqCallToActionSection,
  FaqGroup,
  FaqIntroSection,
  FaqItem,
  ServiceItem,
  ServicesHeroSection,
  SiteSettings,
} from "@/types/content";

interface ServicesProps {
  hero: ServicesHeroSection;
  services: ServiceItem[];
  faqIntro: FaqIntroSection;
  faqCta: FaqCallToActionSection;
  faqGroups: FaqGroup[];
  faqItems: FaqItem[];
  siteSettings: SiteSettings;
}

const serviceIconMap = {
  film: Film,
  sparkles: Sparkles,
  heart: Heart,
  eye: Eye,
  "map-pin": MapPin,
  plane: Plane,
  calendar: Calendar,
  clock: Clock,
  palette: Palette,
} as const;

const Services = ({
  hero,
  services,
  faqIntro,
  faqCta,
  faqGroups,
  faqItems,
  siteSettings,
}: ServicesProps) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#faq") {
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

  const scrollToFAQ = () => {
    const faqElement = document.getElementById("faq");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sortedServices = [...services].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section id="services" className="min-h-[100svh] bg-charcoal flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-3 block">
              {hero.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-4">
              {hero.title}
            </h2>
            <div className="w-16 h-px bg-cream/30 mx-auto mb-5" />
            <p className="text-base md:text-lg text-cream/70 max-w-2xl mx-auto font-light">
              {hero.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sortedServices.map((service, index) => {
              const Icon = serviceIconMap[service.iconName as keyof typeof serviceIconMap] || Sparkles;

              return (
                <div
                  key={service.id}
                  className="group relative bg-charcoal-light/50 p-8 md:p-10 transition-all duration-500 border border-cream/10 hover:border-cream/30 hover:bg-charcoal-light"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-cream/60 group-hover:w-full transition-all duration-500" />

                  <div className="mb-6">
                    <div className="w-14 h-14 border border-cream/20 flex items-center justify-center group-hover:border-cream/40 transition-colors duration-500">
                      <Icon className="w-7 h-7 text-cream/70 group-hover:text-cream transition-colors duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-medium text-cream mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-cream/60 leading-relaxed group-hover:text-cream/80 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center mt-12 md:mt-16">
            <motion.button
              onClick={scrollToFAQ}
              className="group flex flex-col items-center gap-2 text-cream/50 hover:text-cream/80 transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase font-light">
                {hero.faqPromptEyebrow}
              </span>
              <span className="text-sm font-light text-cream/70 group-hover:text-cream transition-colors">
                {hero.faqPromptText}
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="mt-1"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </section>

      <FAQSection
        intro={faqIntro}
        cta={faqCta}
        groups={faqGroups}
        items={faqItems}
        siteSettings={siteSettings}
      />
    </>
  );
};

export default Services;
