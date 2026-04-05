import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Heart, Quote, Volume2, VolumeX, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoTags from "@/components/SeoTags";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useTestimonialsPageContent } from "@/hooks/useTestimonialsPageContent";
import type { Testimonial } from "@/types/content";

const useIntersectionAutoplay = (threshold = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const TestimonialReel = ({ testimonial }: { testimonial: Testimonial }) => {
  const { ref, isVisible } = useIntersectionAutoplay(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0 group">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal/80 border border-cream/10 shadow-2xl transition-all duration-500 group-hover:border-cream/30 group-hover:shadow-cream/10">
        {isLoaded && (
          <iframe            src={`https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}?autoplay=${isVisible ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${testimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            title={`${testimonial.coupleName} testimonial`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30 pointer-events-none opacity-60" />

        {!isLoaded && (
          <img
            src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
            alt={testimonial.coupleName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-charcoal/70 backdrop-blur-sm rounded-full text-cream/80 text-[10px] tracking-widest uppercase font-medium">
            {testimonial.eventType}
          </span>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal/60 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-charcoal/80 hover:text-cream transition-all duration-300"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-4 left-4 z-10 flex items-center gap-2"
          >
            <div className="flex items-center gap-1">
              <motion.div animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-0.5 h-3 bg-cream/80 rounded-full" />
              <motion.div animate={{ scaleY: [0.5, 0.3, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }} className="w-0.5 h-3 bg-cream/80 rounded-full" />
              <motion.div animate={{ scaleY: [1, 0.5, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-0.5 h-3 bg-cream/80 rounded-full" />
              <motion.div animate={{ scaleY: [0.3, 1, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-0.5 h-3 bg-cream/80 rounded-full" />
            </div>
            <span className="text-cream/60 text-[10px] uppercase tracking-wider">Playing</span>
          </motion.div>
        )}

        <div className="absolute bottom-4 right-4 z-10 text-right">
          <p className="text-cream font-script text-lg">{testimonial.coupleName}</p>
          <p className="text-cream/50 text-[10px] tracking-wider uppercase">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsPage = () => {
  const { data: content } = useTestimonialsPageContent();
  const { data: seo } = usePageMeta("testimonials");
  const sortedTestimonials = useMemo(
    () => [...content.testimonials].sort((a, b) => a.pageSortOrder - b.pageSortOrder),
    [content.testimonials],
  );
  const heroTestimonial = sortedTestimonials[0] ?? null;
  const secondaryTestimonials = heroTestimonial ? sortedTestimonials.slice(1) : [];
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  if (!heroTestimonial) {
    return (
      <>
        <SeoTags seo={seo} />
        <Navbar />
        <main className="min-h-screen bg-charcoal pt-32 pb-24">
          <section className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-3">{content.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-4">
              {content.hero.titleLine1}
              <span className="block font-script text-3xl md:text-4xl lg:text-5xl text-cream/70 mt-2">{content.hero.titleLine2}</span>
            </h1>
            <p className="text-cream/60 text-base md:text-lg mb-6 max-w-2xl mx-auto">{content.hero.description}</p>
            <p className="text-cream/40 text-sm">No live testimonials have been published yet.</p>
          </section>
        </main>
        <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />
      </>
    );
  }

  return (
    <>
      <SeoTags seo={seo} />

      <Navbar />

      <main className="min-h-screen bg-charcoal scroll-smooth">
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-24 md:pt-16 md:pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-cream/5 via-charcoal to-charcoal" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cream/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cream/2 rounded-full blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
            <div className="flex-1 text-center lg:text-left max-w-xl">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.2 }} className="w-20 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent mx-auto lg:mx-0 mb-6" />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-start mb-4">
                <Heart className="w-5 h-5 text-cream/40" />
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-3">
                {content.hero.eyebrow}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-4">
                {content.hero.titleLine1}
                <span className="block font-script text-3xl md:text-4xl lg:text-5xl text-cream/70 mt-2">{content.hero.titleLine2}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-cream/50 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed mb-6">
                {content.hero.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="hidden lg:block">
                <Quote className="w-8 h-8 text-cream/15 rotate-180 mb-3" />
                <p className="text-cream/70 text-base font-serif italic leading-relaxed mb-4">"{heroTestimonial.shortQuote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-cream/30" />
                  <span className="text-cream font-script text-xl">{heroTestimonial.coupleName}</span>
                </div>
                <button onClick={() => setSelectedTestimonial(heroTestimonial)} className="mt-4 inline-flex items-center gap-2 text-cream/60 text-sm hover:text-cream transition-colors group/btn">
                  <span className="tracking-wide">{content.hero.readMoreLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex-shrink-0">
              <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal/80 border border-cream/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${heroTestimonial.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${heroTestimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
                  className="absolute inset-0 w-full h-full object-contain"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  title={`${heroTestimonial.coupleName} testimonial`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20 pointer-events-none" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-charcoal/70 backdrop-blur-sm rounded-full text-cream/80 text-[10px] tracking-widest uppercase font-medium">{heroTestimonial.eventType}</span>
                </div>
                <div className="absolute bottom-4 right-4 z-10 text-right">
                  <p className="text-cream font-script text-lg">{heroTestimonial.coupleName}</p>
                  <p className="text-cream/50 text-[10px] tracking-wider uppercase">{heroTestimonial.location}</p>
                </div>
              </div>

              <div className="lg:hidden mt-8 text-center px-4">
                <p className="text-cream/70 text-sm font-serif italic mb-3 leading-relaxed">"{heroTestimonial.shortQuote}"</p>
                <p className="text-cream font-script text-lg mb-4">{heroTestimonial.coupleName}</p>
                <button onClick={() => setSelectedTestimonial(heroTestimonial)} className="inline-flex items-center gap-2 text-cream/60 text-xs hover:text-cream transition-colors group/btn">
                  <span className="tracking-wide">{content.hero.readMoreLabel}</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          <motion.a
            href="#more-stories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-cream/40 text-[10px] tracking-widest uppercase">{content.hero.moreStoriesLabel}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5 text-cream/30" />
            </motion.div>
          </motion.a>
        </section>

        <section id="more-stories" className="py-16 md:py-24 scroll-mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24 md:space-y-32">
              {secondaryTestimonials.map((testimonial, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16 lg:gap-24`}
                  >
                    <TestimonialReel testimonial={testimonial} />

                    <div className={`flex-1 ${isEven ? "md:text-left" : "md:text-right"} text-center`}>
                      <Quote className={`w-10 h-10 text-cream/15 rotate-180 mb-6 ${isEven ? "md:mx-0" : "md:ml-auto"} mx-auto`} />
                      <p className="text-cream/80 text-lg md:text-xl lg:text-2xl font-serif italic leading-relaxed mb-6">"{testimonial.shortQuote}"</p>
                      <p className="text-cream/50 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">{testimonial.fullQuote.substring(0, 200)}...</p>

                      <div className={`flex flex-col ${isEven ? "md:items-start" : "md:items-end"} items-center gap-3`}>
                        <div className="w-16 h-px bg-gradient-to-r from-cream/30 via-cream/20 to-transparent" />
                        <h3 className="text-cream font-script text-2xl md:text-3xl">{testimonial.coupleName}</h3>
                        <div className="flex items-center gap-3 text-cream/40 text-xs tracking-wider uppercase">
                          <span>{testimonial.location}</span>
                          <span className="w-1 h-1 rounded-full bg-cream/30" />
                          <span>{testimonial.eventYear}</span>
                        </div>
                        <button onClick={() => setSelectedTestimonial(testimonial)} className="mt-4 inline-flex items-center gap-2 text-cream/60 text-sm hover:text-cream transition-colors group/btn">
                          <span className="tracking-wide">{content.hero.readMoreLabel}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-cream/5 to-charcoal" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <Quote className="w-12 h-12 text-cream/20 rotate-180 mx-auto mb-8" />
            <p className="text-cream/70 text-lg md:text-xl lg:text-2xl font-serif leading-relaxed italic">{content.quote.quoteText}</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-cream/20" />
              <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">{content.quote.attribution}</span>
              <div className="w-12 h-px bg-cream/20" />
            </div>
          </motion.div>
        </section>

        <section className="section-padding">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">{content.cta.title}</h2>
            <p className="text-cream/50 text-sm md:text-base mb-8 max-w-lg mx-auto">{content.cta.description}</p>
            <a href={content.cta.buttonHref} className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group rounded-sm">
              {content.cta.buttonLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />

      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-md"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-gradient-to-br from-cream/8 to-cream/4 border border-cream/10">
                <div className="relative aspect-[9/16] md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] bg-charcoal">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedTestimonial.youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0&playsinline=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    title={`${selectedTestimonial.coupleName} testimonial`}
                  />
                </div>

                <div className="p-6 md:p-10 flex flex-col justify-center max-h-[50vh] md:max-h-none overflow-y-auto">
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/80 border border-cream/20 flex items-center justify-center hover:bg-charcoal transition-colors z-10"
                  >
                    <X className="w-5 h-5 text-cream" />
                  </button>

                  <Quote className="w-8 h-8 text-cream/20 rotate-180 mb-4" />
                  <h3 className="text-2xl md:text-3xl font-script text-cream mb-2">{selectedTestimonial.coupleName}</h3>
                  <p className="text-cream/40 text-xs tracking-widest uppercase mb-6">{selectedTestimonial.eventType} • {selectedTestimonial.eventYear} • {selectedTestimonial.location}</p>
                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">{selectedTestimonial.fullQuote}</p>

                  <div className="mt-8 pt-6 border-t border-cream/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-cream/50" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-xs">With love,</p>
                      <p className="text-cream font-serif text-sm">{selectedTestimonial.coupleName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialsPage;

