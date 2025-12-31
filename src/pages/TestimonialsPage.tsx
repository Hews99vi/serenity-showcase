import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Quote, Play, X, Heart, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Testimonial {
  id: number;
  coupleName: string;
  shortQuote: string;
  fullQuote: string;
  eventDate: string;
  eventType: string;
  youtubeId: string;
  location?: string;
}

// Custom hook for scroll-based autoplay
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
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Individual Reel Component with autoplay
const TestimonialReel = ({ 
  testimonial, 
  onReadMore 
}: { 
  testimonial: Testimonial; 
  onReadMore: () => void;
}) => {
  const { ref, isVisible } = useIntersectionAutoplay(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Preload iframe when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[280px] md:max-w-[320px] flex-shrink-0 group">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal/80 border border-cream/10 shadow-2xl transition-all duration-500 group-hover:border-cream/30 group-hover:shadow-cream/10">
        {/* Always render iframe for smooth autoplay */}
        {isLoaded && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=${isVisible ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${testimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${testimonial.coupleName} testimonial`}
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30 pointer-events-none opacity-60" />
        
        {/* Loading state / thumbnail fallback */}
        {!isLoaded && (
          <img
            src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
            alt={testimonial.coupleName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Event Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-charcoal/70 backdrop-blur-sm rounded-full text-cream/80 text-[10px] tracking-widest uppercase font-medium">
            {testimonial.eventType}
          </span>
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal/60 backdrop-blur-sm border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-charcoal/80 hover:text-cream transition-all duration-300"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Playing Indicator */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-4 left-4 z-10 flex items-center gap-2"
          >
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                className="w-0.5 h-3 bg-cream/80 rounded-full"
              />
              <motion.div
                animate={{ scaleY: [0.5, 0.3, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }}
                className="w-0.5 h-3 bg-cream/80 rounded-full"
              />
              <motion.div
                animate={{ scaleY: [1, 0.5, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                className="w-0.5 h-3 bg-cream/80 rounded-full"
              />
              <motion.div
                animate={{ scaleY: [0.3, 1, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}
                className="w-0.5 h-3 bg-cream/80 rounded-full"
              />
            </div>
            <span className="text-cream/60 text-[10px] uppercase tracking-wider">Playing</span>
          </motion.div>
        )}

        {/* Couple Name Overlay */}
        <div className="absolute bottom-4 right-4 z-10 text-right">
          <p className="text-cream font-script text-lg">{testimonial.coupleName}</p>
          <p className="text-cream/50 text-[10px] tracking-wider uppercase">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};
const testimonials: Testimonial[] = [{
  id: 1,
  coupleName: "Udaraka & Uma",
  shortQuote: "The video was absolutely beautiful. Thank you for your amazing work!",
  fullQuote: "A huge thank you for Serenity Wedding Films for the incredible job you did capturing our wedding day! The video was absolutely beautiful. Thank you so much Ishara malli for your amazing work and dedication.",
  eventDate: "2024",
  eventType: "Wedding",
  youtubeId: "GUipYDqu72k",
  location: "Sri Lanka"
}, {
  id: 2,
  coupleName: "Bashi & Dehemi",
  shortQuote: "My work was beautifully done. Everyone said it was beautiful.",
  fullQuote: "My work was beautifully done. Everyone said it was beautiful. It was beautiful than I expected. Good job. Thank you malli.",
  eventDate: "2024",
  eventType: "Wedding",
  youtubeId: "pxaBIOkCW1M",
  location: "Sri Lanka"
}, {
  id: 3,
  coupleName: "Nilmi & Tharindu",
  shortQuote: "Thank you for finishing our video so lovely. We truly appreciate it.",
  fullQuote: "Thank you so much for all the hard work you put into our wedding day video. We truly appreciate it. It meant so much to us that you finished our video so lovely. Thank you again @ishara malli.",
  eventDate: "2024",
  eventType: "Wedding",
  youtubeId: "fSSQLuejmzg",
  location: "Sri Lanka"
}];
const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  return <>
      <Helmet>
        <title>Client Testimonials | Serenity Wedding Films</title>
        <meta name="description" content="Watch heartfelt testimonials from our couples. Real stories, real emotions captured in cinematic reels." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-charcoal scroll-smooth">
        {/* Full Viewport Hero with First Testimonial */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-24 md:pt-16 md:pb-16">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/5 via-charcoal to-charcoal" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cream/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cream/2 rounded-full blur-3xl" />
          </div>

          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }} />

          {/* Hero Content + First Testimonial */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
            {/* Left: Hero Text */}
            <div className="flex-1 text-center lg:text-left max-w-xl">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.2 }} 
                className="w-20 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent mx-auto lg:mx-0 mb-6" />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} 
                className="flex justify-center lg:justify-start mb-4">
                <Heart className="w-5 h-5 text-cream/40" />
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} 
                className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-3">
                Words from Our Couples
              </motion.p>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} 
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-4">
                Love Stories
                <span className="block font-script text-3xl md:text-4xl lg:text-5xl text-cream/70 mt-2">
                  Told by You
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} 
                className="text-cream/50 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed mb-6">
                Real moments, genuine emotions, and heartfelt words from the couples 
                who trusted us to capture their most precious day
              </motion.p>

              {/* First Testimonial Quote */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
                className="hidden lg:block">
                <Quote className="w-8 h-8 text-cream/15 rotate-180 mb-3" />
                <p className="text-cream/70 text-base font-serif italic leading-relaxed mb-4">
                  "{testimonials[0].shortQuote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-cream/30" />
                  <span className="text-cream font-script text-xl">{testimonials[0].coupleName}</span>
                </div>
                <button onClick={() => setSelectedTestimonial(testimonials[0])} 
                  className="mt-4 inline-flex items-center gap-2 text-cream/60 text-sm hover:text-cream transition-colors group/btn">
                  <span className="tracking-wide">Read Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Right: First Testimonial Video - Full Height */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-shrink-0">
              <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal/80 border border-cream/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${testimonials[0].youtubeId}?autoplay=1&mute=1&loop=1&playlist=${testimonials[0].youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
                  className="absolute inset-0 w-full h-full object-contain"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${testimonials[0].coupleName} testimonial`}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20 pointer-events-none" />
                
                {/* Event Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-charcoal/70 backdrop-blur-sm rounded-full text-cream/80 text-[10px] tracking-widest uppercase font-medium">
                    {testimonials[0].eventType}
                  </span>
                </div>

                {/* Couple Name Overlay */}
                <div className="absolute bottom-4 right-4 z-10 text-right">
                  <p className="text-cream font-script text-lg">{testimonials[0].coupleName}</p>
                  <p className="text-cream/50 text-[10px] tracking-wider uppercase">{testimonials[0].location}</p>
                </div>
              </div>
              
              {/* Mobile Quote - Moved below with proper spacing */}
              <div className="lg:hidden mt-8 text-center px-4">
                <p className="text-cream/70 text-sm font-serif italic mb-3 leading-relaxed">
                  "{testimonials[0].shortQuote}"
                </p>
                <p className="text-cream font-script text-lg mb-4">{testimonials[0].coupleName}</p>
                <button onClick={() => setSelectedTestimonial(testimonials[0])} 
                  className="inline-flex items-center gap-2 text-cream/60 text-xs hover:text-cream transition-colors group/btn">
                  <span className="tracking-wide">Read Full Story</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.a 
            href="#more-stories"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 0.8 }} 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-cream/40 text-[10px] tracking-widest uppercase">More Stories</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5 text-cream/30" />
            </motion.div>
          </motion.a>
        </section>

        {/* Testimonials Zigzag Layout - Rest of testimonials */}
        <section id="more-stories" className="py-16 md:py-24 scroll-mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-20">
              
              
            </motion.div>

            {/* Alternating Testimonials - Skip first one since it's in hero */}
            <div className="space-y-24 md:space-y-32">
              {testimonials.slice(1).map((testimonial, index) => {
              const isEven = index % 2 === 0;
              return <motion.div key={testimonial.id} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true,
                margin: "-100px"
              }} transition={{
                duration: 0.7,
                delay: 0.1
              }} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 lg:gap-24`}>
                    {/* Reel Video with Autoplay */}
                    <TestimonialReel 
                      testimonial={testimonial} 
                      onReadMore={() => setSelectedTestimonial(testimonial)} 
                    />

                    {/* Story Content */}
                    <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
                      {/* Quote Icon */}
                      <Quote className={`w-10 h-10 text-cream/15 rotate-180 mb-6 ${isEven ? 'md:mx-0' : 'md:ml-auto'} mx-auto`} />
                      
                      {/* Short Quote */}
                      <p className="text-cream/80 text-lg md:text-xl lg:text-2xl font-serif italic leading-relaxed mb-6">
                        "{testimonial.shortQuote}"
                      </p>

                      {/* Full Quote Preview */}
                      <p className="text-cream/50 text-sm md:text-base leading-relaxed mb-8 line-clamp-3">
                        {testimonial.fullQuote.substring(0, 200)}...
                      </p>

                      {/* Couple Info */}
                      <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} items-center gap-3`}>
                        <div className="w-16 h-px bg-gradient-to-r from-cream/30 via-cream/20 to-transparent" />
                        
                        <h3 className="text-cream font-script text-2xl md:text-3xl">
                          {testimonial.coupleName}
                        </h3>
                        
                        <div className="flex items-center gap-3 text-cream/40 text-xs tracking-wider uppercase">
                          <span>{testimonial.location}</span>
                          <span className="w-1 h-1 rounded-full bg-cream/30" />
                          <span>{testimonial.eventDate}</span>
                        </div>

                        {/* Read More Button */}
                        <button onClick={() => setSelectedTestimonial(testimonial)} className="mt-4 inline-flex items-center gap-2 text-cream/60 text-sm hover:text-cream transition-colors group/btn">
                          <span className="tracking-wide">Read Full Story</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>;
            })}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-cream/5 to-charcoal" />
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <Quote className="w-12 h-12 text-cream/20 rotate-180 mx-auto mb-8" />
            <p className="text-cream/70 text-lg md:text-xl lg:text-2xl font-serif leading-relaxed italic">
              "Every love story is beautiful, but yours should be told in a way 
              that makes you feel every moment again and again."
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-cream/20" />
              <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                Serenity Films
              </span>
              <div className="w-12 h-px bg-cream/20" />
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">
              Share Your Story
            </h2>
            <p className="text-cream/50 text-sm md:text-base mb-8 max-w-lg mx-auto">
              Let us capture the beautiful moments of your special day and create 
              a film you'll treasure forever
            </p>
            <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group rounded-sm">
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Full Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-md" onClick={() => setSelectedTestimonial(null)}>
            <motion.div initial={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }} transition={{
          duration: 0.3
        }} className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl" onClick={e => e.stopPropagation()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-gradient-to-br from-cream/8 to-cream/4 border border-cream/10">
                {/* Video Side */}
                <div className="relative aspect-[9/16] md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] bg-charcoal">
                  <iframe src={`https://www.youtube.com/embed/${selectedTestimonial.youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`${selectedTestimonial.coupleName} testimonial`} />
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-10 flex flex-col justify-center max-h-[50vh] md:max-h-none overflow-y-auto">
                  {/* Close Button */}
                  <button onClick={() => setSelectedTestimonial(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/80 border border-cream/20 flex items-center justify-center hover:bg-charcoal transition-colors z-10">
                    <X className="w-5 h-5 text-cream" />
                  </button>

                  <Quote className="w-8 h-8 text-cream/20 rotate-180 mb-4" />

                  <h3 className="text-2xl md:text-3xl font-script text-cream mb-2">
                    {selectedTestimonial.coupleName}
                  </h3>

                  <p className="text-cream/40 text-xs tracking-widest uppercase mb-6">
                    {selectedTestimonial.eventType} • {selectedTestimonial.eventDate}
                    {selectedTestimonial.location && ` • ${selectedTestimonial.location}`}
                  </p>

                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                    {selectedTestimonial.fullQuote}
                  </p>

                  <div className="mt-8 pt-6 border-t border-cream/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-cream/50" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-xs">With love,</p>
                      <p className="text-cream font-serif text-sm">
                        {selectedTestimonial.coupleName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default TestimonialsPage;