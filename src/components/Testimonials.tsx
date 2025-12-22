import { useState } from "react";
import { Play, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  coupleName: string;
  shortQuote: string;
  fullQuote: string;
  eventDate: string;
  eventType: string;
  videoUrl?: string;
  videoPoster?: string;
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
  },
  {
    id: 2,
    coupleName: "Kasun & Dilini",
    shortQuote: "Professional, creative, and made us feel so comfortable.",
    fullQuote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable. Their attention to detail was remarkable, and they captured moments we didn't even know happened. The pre-wedding shoot was an incredible experience - they knew exactly how to guide us to get the most natural and beautiful shots. The final film exceeded all our expectations. It's not just a video; it's a piece of art that we'll treasure forever. We highly recommend Serenity Wedding Films to anyone looking for exceptional wedding cinematography.",
    eventDate: "February 2024",
    eventType: "Pre-Wedding",
  },
  {
    id: 3,
    coupleName: "Ravindu & Sachini",
    shortQuote: "A film that felt like US—stunning cinematography.",
    fullQuote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning and exceeded our expectations. They have an incredible ability to capture raw emotions and genuine moments. Every time we watch our wedding film, we're transported back to that magical day. The editing, the music selection, the color grading - everything was perfect. They truly are artists in their craft. We've recommended them to all our friends and family, and everyone who has worked with them has had the same amazing experience. Thank you for giving us the most precious gift!",
    eventDate: "January 2024",
    eventType: "Wedding",
  },
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="testimonials" className="section-padding bg-charcoal overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-4"
          >
            Love <span className="font-script italic">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-cream/50 text-sm md:text-base max-w-md mx-auto"
          >
            Hear from couples who trusted us with their most precious moments
          </motion.p>
        </div>

        {/* Reel Cards Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              {/* Reel Card */}
              <div className="relative w-[280px] md:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-b from-cream/10 to-cream/5 border border-cream/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cream/20">
                {/* Video/Placeholder Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/90">
                  {testimonial.videoUrl ? (
                    <video
                      src={testimonial.videoUrl}
                      poster={testimonial.videoPoster}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay={hoveredId === testimonial.id}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cream/8 via-cream/4 to-charcoal flex items-center justify-center">
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border border-cream/30" />
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-cream/20" />
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border border-cream/10" />
                      </div>
                      
                      {/* Play Button */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 flex items-center justify-center group-hover:bg-cream/20 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 text-cream fill-cream/50" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-80" />

                {/* Quote Icon - Top */}
                <div className="absolute top-6 left-6">
                  <Quote className="w-8 h-8 text-cream/30 rotate-180" />
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                  {/* Short Quote */}
                  <p className="text-cream/90 text-sm md:text-base leading-relaxed font-light italic">
                    "{testimonial.shortQuote}"
                  </p>

                  {/* Couple Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-cream font-serif text-lg">
                        {testimonial.coupleName}
                      </h3>
                      <p className="text-cream/40 text-xs tracking-widest uppercase">
                        {testimonial.eventType} • {testimonial.eventDate}
                      </p>
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                      <span className="text-cream/60 text-xs font-medium">
                        {testimonial.coupleName
                          .split(" & ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  {/* Read More Indicator */}
                  <div className="flex items-center gap-2 text-cream/50 text-xs group-hover:text-cream/80 transition-colors">
                    <span className="w-8 h-px bg-cream/30 group-hover:w-12 transition-all duration-300" />
                    <span className="tracking-wider uppercase">Read Story</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
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
              className="relative max-w-2xl w-full bg-gradient-to-b from-cream/8 to-cream/4 border border-cream/10 rounded-2xl p-8 md:p-12 max-h-[80vh] overflow-y-auto"
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
              <Quote className="w-12 h-12 text-cream/20 rotate-180 mb-6" />

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

              {/* Decorative Line */}
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
                  <p className="text-cream font-serif">{selectedTestimonial.coupleName}</p>
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
