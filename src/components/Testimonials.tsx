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
    coupleName: "Sahan & Nethmi",
    shortQuote: "Every emotion, every laugh, every tear—perfectly captured.",
    fullQuote:
      "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day. The team was incredibly professional and made us feel so comfortable throughout the entire process. From the initial consultation to the final delivery, everything was seamless. We couldn't have asked for a better experience. The cinematography was absolutely stunning, and the way they told our story was beyond anything we could have imagined. We've watched our wedding film countless times and it still gives us goosebumps. Thank you, Serenity Wedding Films, for capturing the most important day of our lives so beautifully!",
    eventDate: "March 2024",
    eventType: "Wedding",
    youtubeId: "EfD3jBkdvZs",
  },
  {
    id: 2,
    coupleName: "Kasun & Dilini",
    shortQuote: "Professional, creative, and made us feel so comfortable.",
    fullQuote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable. Their attention to detail was remarkable, and they captured moments we didn't even know happened. The pre-wedding shoot was an incredible experience - they knew exactly how to guide us to get the most natural and beautiful shots. The final film exceeded all our expectations. It's not just a video; it's a piece of art that we'll treasure forever. We highly recommend Serenity Wedding Films to anyone looking for exceptional wedding cinematography.",
    eventDate: "February 2024",
    eventType: "Pre-Wedding",
    youtubeId: "JxeMUuvda9A",
  },
  {
    id: 3,
    coupleName: "Ravindu & Sachini",
    shortQuote: "A film that felt like US—stunning cinematography.",
    fullQuote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning and exceeded our expectations. They have an incredible ability to capture raw emotions and genuine moments. Every time we watch our wedding film, we're transported back to that magical day. The editing, the music selection, the color grading - everything was perfect. They truly are artists in their craft. We've recommended them to all our friends and family, and everyone who has worked with them has had the same amazing experience. Thank you for giving us the most precious gift!",
    eventDate: "January 2024",
    eventType: "Wedding",
    youtubeId: "co_WYnhlhi0",
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
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group flex-1 max-w-[280px] mx-auto md:mx-0"
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
