import { useState } from "react";
import { ArrowRight, Quote, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  coupleName: string;
  shortQuote: string;
  fullQuote: string;
  eventDate: string;
  eventType: string;
  youtubeId: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    coupleName: "Udaraka & Uma",
    shortQuote: "The video was absolutely beautiful. Thank you for your amazing work!",
    fullQuote:
      "A huge thank you for Serenity Wedding Films for the incredible job you did capturing our wedding day! The video was absolutely beautiful. Thank you so much Ishara malli for your amazing work and dedication.",
    eventDate: "2024",
    eventType: "Wedding",
    youtubeId: "GUipYDqu72k",
  },
  {
    id: 2,
    coupleName: "Bashi & Dehemi",
    shortQuote: "My work was beautifully done. Everyone said it was beautiful.",
    fullQuote:
      "My work was beautifully done. Everyone said it was beautiful. It was beautiful than I expected. Good job. Thank you malli.",
    eventDate: "2024",
    eventType: "Wedding",
    youtubeId: "pxaBIOkCW1M",
  },
  {
    id: 3,
    coupleName: "Nilmi & Tharindu",
    shortQuote: "Thank you for finishing our video so lovely. We truly appreciate it.",
    fullQuote:
      "Thank you so much for all the hard work you put into our wedding day video. We truly appreciate it. It meant so much to us that you finished our video so lovely. Thank you again @ishara malli.",
    eventDate: "2024",
    eventType: "Wedding",
    youtubeId: "fSSQLuejmzg",
  },
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section id="testimonials" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side - Sticky Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6 leading-tight">
                Wedding
                <br />
                <span className="font-script italic">testimonials</span>
              </h2>
              <p className="text-cream/60 text-sm md:text-base mb-8 max-w-sm">
                Watch real stories from couples who trusted us with their most
                precious moments
              </p>
              <a
                href="/testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream text-sm tracking-wide hover:bg-cream hover:text-charcoal transition-all duration-300 group"
              >
                View All Stories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Side - Reel Cards */}
          <div className="lg:col-span-8">
            {/* Mobile: Horizontal scroll layout */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group flex-shrink-0 w-[200px] snap-center"
                >
                  {/* Reel Card - Smaller on mobile */}
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-charcoal border border-cream/10 shadow-xl">
                    {/* YouTube Embed */}
                    {playingId === testimonial.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&loop=1&playlist=${testimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${testimonial.coupleName} testimonial`}
                      />
                    ) : (
                      <>
                        {/* Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
                          alt={testimonial.coupleName}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Play Button Overlay */}
                        <button
                          onClick={() => setPlayingId(testimonial.id)}
                          className="absolute inset-0 flex items-center justify-center bg-charcoal/30 hover:bg-charcoal/20 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center">
                            <Play className="w-5 h-5 text-cream fill-cream/60 ml-0.5" />
                          </div>
                        </button>
                      </>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent pointer-events-none" />

                    {/* Content Overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 cursor-pointer"
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      <p className="text-cream/90 text-[11px] leading-relaxed mb-2 line-clamp-2 italic">
                        "{testimonial.shortQuote}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-cream font-serif text-xs">
                            {testimonial.coupleName}
                          </h3>
                          <p className="text-cream/40 text-[9px] tracking-widest uppercase">
                            {testimonial.eventType}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-cream/50" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Row layout */}
            <div className="hidden md:flex flex-row justify-center items-stretch gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group flex-1 max-w-[280px]"
                >
                  {/* Reel Card */}
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-charcoal border border-cream/10 shadow-2xl transition-all duration-500 group-hover:border-cream/25 group-hover:shadow-cream/5">
                    {/* YouTube Embed */}
                    {playingId === testimonial.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&loop=1&playlist=${testimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${testimonial.coupleName} testimonial`}
                      />
                    ) : (
                      <>
                        {/* Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
                          alt={testimonial.coupleName}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Play Button Overlay */}
                        <button
                          onClick={() => setPlayingId(testimonial.id)}
                          className="absolute inset-0 flex items-center justify-center bg-charcoal/30 hover:bg-charcoal/20 transition-colors"
                        >
                          <div className="w-14 h-14 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-cream/30 transition-all duration-300">
                            <Play className="w-6 h-6 text-cream fill-cream/60 ml-1" />
                          </div>
                        </button>
                      </>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent pointer-events-none" />

                    {/* Quote Icon */}
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <Quote className="w-6 h-6 text-cream/40 rotate-180" />
                    </div>

                    {/* Content Overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5 cursor-pointer"
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      {/* Short Quote */}
                      <p className="text-cream/90 text-xs leading-relaxed mb-3 line-clamp-2 italic">
                        "{testimonial.shortQuote}"
                      </p>

                      {/* Couple Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-cream font-serif text-sm">
                            {testimonial.coupleName}
                          </h3>
                          <p className="text-cream/40 text-[10px] tracking-widest uppercase">
                            {testimonial.eventType}
                          </p>
                        </div>

                        {/* Read More */}
                        <div className="flex items-center gap-1.5 text-cream/50 text-[10px] hover:text-cream/80 transition-colors group/btn">
                          <span className="tracking-wider uppercase">Read</span>
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Testimonial Modal */}
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
              className="relative max-w-2xl w-full bg-gradient-to-b from-cream/8 to-cream/4 border border-cream/10 rounded-2xl p-8 md:p-12 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center hover:bg-cream/20 transition-colors"
              >
                <X className="w-5 h-5 text-cream" />
              </button>

              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-cream/20 rotate-180 mb-6" />

              {/* Couple Name */}
              <h3 className="text-3xl md:text-4xl font-script text-cream mb-2">
                {selectedTestimonial.coupleName}
              </h3>

              {/* Event Info */}
              <p className="text-cream/40 text-xs tracking-widest uppercase mb-8">
                {selectedTestimonial.eventType} • {selectedTestimonial.eventDate}
              </p>

              {/* Full Quote */}
              <p className="text-cream/80 text-base md:text-lg leading-relaxed">
                {selectedTestimonial.fullQuote}
              </p>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-cream/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                  <span className="text-cream/60 text-xs font-medium">
                    {selectedTestimonial.coupleName
                      .split(" & ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-cream/60 text-sm">With love,</p>
                  <p className="text-cream font-serif">
                    {selectedTestimonial.coupleName}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
