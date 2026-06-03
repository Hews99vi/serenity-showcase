import type { HomeIntroSection } from "@/types/content";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

interface IntroSectionProps {
  content: HomeIntroSection;
}

const IntroSection = ({ content }: IntroSectionProps) => {
  return (
    <section className="section-dark section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-6 sm:mb-8 block animate-fade-up">
              {content.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-cream leading-tight mb-6 sm:mb-8 animate-fade-up animation-delay-200 tracking-wide uppercase lg:text-3xl">
              {content.title}
            </h2>

            <div className="space-y-4 sm:space-y-6 text-cream/80 text-base sm:text-lg leading-relaxed font-light animate-fade-up animation-delay-400">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-3xl font-script text-cream/90 animate-fade-up animation-delay-600">
              {content.signatureText}
            </p>
          </div>

          {/* Video - Right */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up animation-delay-400 mt-8 lg:mt-0">
            <div className="relative">
              {/* Decorative frame - hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -inset-4 border border-cream/20 rounded-2xl" />
              <div className="hidden sm:block absolute -inset-8 border border-cream/10 rounded-3xl" />

              <div className="relative w-[240px] sm:w-[280px] h-[420px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={getYoutubeEmbedUrl(content.videoUrl) || content.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  title={content.videoTitle}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-cream rounded-full scale-150" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
