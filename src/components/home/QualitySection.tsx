import { Film, Sparkles, Eye, ChevronDown, Heart, MapPin, Plane, Calendar, Clock, Palette } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeQualitySection, IconName } from "@/types/content";

const iconMap: Record<IconName, typeof Eye> = {
  eye: Eye,
  sparkles: Sparkles,
  film: Film,
  heart: Heart,
  "map-pin": MapPin,
  plane: Plane,
  calendar: Calendar,
  clock: Clock,
  palette: Palette,
};

interface QualitySectionProps {
  content: HomeQualitySection;
}

const QualitySection = ({ content }: QualitySectionProps) => {
  const scrollToFeatured = () => {
    const element = document.getElementById("featured");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section-dark section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-cream blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-1 lg:order-1">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-cream/10 border border-cream/20 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <span className="text-cream text-xs sm:text-sm font-medium tracking-wider">
                {content.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-cream leading-tight mb-4 sm:mb-6 tracking-wide uppercase lg:text-4xl">
              {content.title}
            </h2>

            <p className="text-cream/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
              {content.intro}
            </p>

            <div className="space-y-4 sm:space-y-6">
              {content.features.map((feature) => {
                const Icon = iconMap[feature.iconName] || Sparkles;

                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 sm:gap-4 group text-left"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cream/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cream/20 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cream" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif text-cream mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-cream/60 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video - Right */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-2">
            <div className="relative">
              {/* Decorative glow ring - hidden on mobile */}
              <div
                className="hidden sm:block absolute inset-0 -m-8 rounded-full border border-cream/10 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div className="hidden sm:block absolute inset-0 -m-16 rounded-full border border-cream/5" />

              <div className="relative w-[220px] sm:w-[280px] h-[380px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-cream/20">
                <iframe
                  src={content.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  title={content.videoTitle}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-cream rounded-full scale-125" />
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-script text-cream/80">
            {content.quoteLines[0]}
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-script text-cream mt-2">
            {content.quoteLines[1]}
          </p>
        </div>

        {/* Decorative Scroll Element */}
        <div className="flex flex-col items-center mt-6 sm:mt-8 md:mt-10">
          {/* Decorative Lines */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 sm:w-10 md:w-14 h-px bg-gradient-to-r from-transparent to-cream/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-cream/40" />
            <div className="w-8 sm:w-10 md:w-14 h-px bg-gradient-to-l from-transparent to-cream/30" />
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToFeatured}
            className="group flex flex-col items-center gap-2 text-cream/40 hover:text-cream/70 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light">
              {content.scrollLabel}
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream/40 transition-colors"
            >
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
