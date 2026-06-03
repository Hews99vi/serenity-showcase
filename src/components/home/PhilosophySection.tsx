import type { HomePhilosophySection } from "@/types/content";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

interface PhilosophySectionProps {
  content: HomePhilosophySection;
}

const PhilosophySection = ({ content }: PhilosophySectionProps) => {
  return (
    <section id="philosophy" className="section-light section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Video - Left */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 animate-fade-up">
            <div className="relative">
              {/* Decorative elements - hidden on mobile */}
              <div className="hidden sm:block absolute -top-6 -left-6 w-20 sm:w-24 h-20 sm:h-24 border-t-2 border-l-2 border-charcoal/20" />
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-20 sm:w-24 h-20 sm:h-24 border-b-2 border-r-2 border-charcoal/20" />

              <div className="relative w-[220px] sm:w-[280px] h-[380px] sm:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src={getYoutubeEmbedUrl(content.videoUrl) || content.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  title={content.videoTitle}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Text Content - Right */}
          <div className="max-w-xl mx-auto lg:mx-0 order-1 lg:order-2 text-center lg:text-left">
            <div className="mb-8 sm:mb-12">
              <span className="text-charcoal/60 text-xs tracking-[0.3em] uppercase mb-4 sm:mb-6 block">
                {content.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal leading-tight tracking-wide uppercase">
                {content.title}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                <div className="w-8 sm:w-12 h-px bg-charcoal/30" />
                <span className="text-charcoal/60 text-xs sm:text-sm tracking-wider uppercase">
                  {content.valuesLine}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
