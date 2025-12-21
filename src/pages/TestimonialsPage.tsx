import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Quote, Film, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Testimonial {
  id: number;
  coupleName: string;
  quote: string;
  fullQuote: string;
  eventDate: string;
  eventType: string;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    coupleName: "Sahan & Nethmi",
    quote:
      "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day...",
    fullQuote:
      "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day. The team was incredibly professional and made us feel so comfortable throughout the entire process. From the initial consultation to the final delivery, everything was seamless. We couldn't have asked for a better experience. The cinematography was absolutely stunning, and the way they told our story was beyond anything we could have imagined. We've watched our wedding film countless times and it still gives us goosebumps. Thank you, Serenity Wedding Films, for capturing the most important day of our lives so beautifully!",
    eventDate: "March 2024",
    eventType: "Wedding",
  },
  {
    id: 2,
    coupleName: "Kasun & Dilini",
    quote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable...",
    fullQuote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable. Their attention to detail was remarkable, and they captured moments we didn't even know happened. The pre-wedding shoot was an incredible experience - they knew exactly how to guide us to get the most natural and beautiful shots. The final film exceeded all our expectations. It's not just a video; it's a piece of art that we'll treasure forever. We highly recommend Serenity Wedding Films to anyone looking for exceptional wedding cinematography.",
    eventDate: "February 2024",
    eventType: "Pre-Wedding",
  },
  {
    id: 3,
    coupleName: "Ravindu & Sachini",
    quote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning and exceeded our expectations...",
    fullQuote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning and exceeded our expectations. They have an incredible ability to capture raw emotions and genuine moments. Every time we watch our wedding film, we're transported back to that magical day. The editing, the music selection, the color grading - everything was perfect. They truly are artists in their craft. We've recommended them to all our friends and family, and everyone who has worked with them has had the same amazing experience. Thank you for giving us the most precious gift!",
    eventDate: "January 2024",
    eventType: "Wedding",
  },
  {
    id: 4,
    coupleName: "Dinesh & Malsha",
    quote:
      "Our families still talk about how beautiful the film was. Every detail of our traditional homecoming was captured with such care and artistry...",
    fullQuote:
      "Our families still talk about how beautiful the film was. Every detail of our traditional homecoming was captured with such care and artistry. The team was respectful of our traditions and customs while still creating a modern, cinematic masterpiece. They managed to capture the essence of our Sri Lankan heritage beautifully. The drone shots, the intimate moments, the joyful celebrations - everything was documented perfectly. We're so grateful to have these memories preserved in such a beautiful way. Serenity Wedding Films truly understands the importance of cultural traditions in wedding cinematography.",
    eventDate: "December 2023",
    eventType: "Homecoming",
  },
  {
    id: 5,
    coupleName: "Tharindu & Ishara",
    quote:
      "The 4K quality is incredible—you can see every detail. But more than that, they captured the FEELING of our day perfectly...",
    fullQuote:
      "The 4K quality is incredible—you can see every detail. But more than that, they captured the FEELING of our day perfectly. The technical quality combined with their storytelling ability is unmatched. We were hesitant about having cameras around all day, but the team was so discreet that we often forgot they were there. This allowed them to capture the most genuine and candid moments. The final product was worth every penny. We've shown our film to so many people, and everyone is always amazed by the quality. If you're looking for wedding cinematography, look no further than Serenity Wedding Films!",
    eventDate: "November 2023",
    eventType: "Wedding",
  },
  {
    id: 6,
    coupleName: "Nuwan & Sanduni",
    quote:
      "Every frame tells our story. The attention to detail and the creative vision exceeded everything we hoped for...",
    fullQuote:
      "Every frame tells our story. The attention to detail and the creative vision exceeded everything we hoped for. From the first consultation to the final delivery, the experience was nothing short of magical. They understood our vision perfectly and translated it into a cinematic masterpiece. The way they captured the light, the emotions, and the small intimate moments was incredible. We've recommended them to everyone we know, and we'll forever be grateful for the beautiful memories they've preserved for us.",
    eventDate: "October 2023",
    eventType: "Wedding",
  },
  {
    id: 7,
    coupleName: "Chamara & Hiruni",
    quote:
      "Working with Serenity was an absolute pleasure. They made our engagement shoot feel natural and effortless...",
    fullQuote:
      "Working with Serenity was an absolute pleasure. They made our engagement shoot feel natural and effortless. We were nervous at first, but the team put us at ease immediately. The final film was breathtaking - every shot was perfectly composed and the storytelling was seamless. They have a unique ability to capture genuine emotions and turn them into art. We can't wait to work with them again for our wedding!",
    eventDate: "September 2023",
    eventType: "Engagement",
  },
  {
    id: 8,
    coupleName: "Lahiru & Kavindi",
    quote:
      "The documentary-style approach was exactly what we wanted. Our wedding film feels like a movie...",
    fullQuote:
      "The documentary-style approach was exactly what we wanted. Our wedding film feels like a movie about our love story. The team captured moments we didn't even know were happening - the tearful eyes of my father, the joyful laughter of our friends, the tender moments between us. Every time we watch it, we discover something new. The quality is outstanding and the emotional impact is undeniable. Thank you for creating something we'll treasure forever.",
    eventDate: "August 2023",
    eventType: "Wedding",
  },
];

const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  return (
    <>
      <Helmet>
        <title>Client Testimonials | Serenity Wedding Films</title>
        <meta
          name="description"
          content="Read what our couples say about their experience with Serenity Wedding Films. Real stories from real weddings."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-charcoal">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-charcoal/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

          {/* Film Grain Texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-24 h-px bg-cream/40 mx-auto mb-8"
            />

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <Film className="w-8 h-8 text-cream/60" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-4"
            >
              Testimonials
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl font-script text-cream/70 mb-4"
            >
              Words from Our Couples
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-cream/50 text-sm tracking-[0.2em] uppercase"
            >
              Real Stories, Real Emotions
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="w-24 h-px bg-cream/40 mx-auto mt-8"
            />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-cream/40 text-xs tracking-widest uppercase">
                Scroll
              </span>
              <ChevronDown className="w-5 h-5 text-cream/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Grid */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    onClick={() => setSelectedTestimonial(testimonial)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-cream/5">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-cream/60 mb-8 max-w-lg mx-auto">
              Let us capture the beautiful moments of your special day
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Testimonial Modal */}
      <Dialog
        open={!!selectedTestimonial}
        onOpenChange={() => setSelectedTestimonial(null)}
      >
        <DialogContent className="max-w-4xl bg-charcoal border-cream/10 p-0 overflow-hidden">
          {selectedTestimonial && (
            <>
              {/* Hero Background */}
              <div className="relative h-48 md:h-64 bg-gradient-to-b from-cream/10 to-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFhMWExYSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMyYTJhMmEiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <DialogHeader>
                    <DialogTitle className="text-3xl md:text-4xl lg:text-5xl font-script text-cream text-center">
                      {selectedTestimonial.coupleName}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Quote */}
                  <div>
                    <Quote className="w-10 h-10 text-cream/20 mb-4 rotate-180" />
                    <p className="text-cream/80 text-sm md:text-base leading-relaxed">
                      {selectedTestimonial.fullQuote}
                    </p>
                    <div className="mt-6 pt-4 border-t border-cream/10">
                      <p className="text-cream/40 text-xs tracking-widest uppercase">
                        {selectedTestimonial.eventType} •{" "}
                        {selectedTestimonial.eventDate}
                      </p>
                    </div>
                  </div>

                  {/* Video/Image Placeholder */}
                  <div className="relative aspect-[3/4] bg-cream/5 rounded-sm overflow-hidden">
                    {selectedTestimonial.videoUrl ? (
                      <video
                        src={selectedTestimonial.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream/10 flex items-center justify-center">
                            <Quote className="w-6 h-6 text-cream/40" />
                          </div>
                          <p className="text-cream/30 text-xs tracking-widest uppercase">
                            Video Coming Soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: () => void;
}

const TestimonialCard = ({ testimonial, onClick }: TestimonialCardProps) => {
  return (
    <div
      className="group relative bg-cream/5 backdrop-blur-sm rounded-sm p-6 hover:bg-cream/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-cream/20 mb-4 rotate-180" />

      {/* Couple Name */}
      <h3 className="text-cream font-serif text-lg mb-3">
        {testimonial.coupleName}
      </h3>

      {/* Event Type Badge */}
      <span className="inline-block text-cream/40 text-xs tracking-widest uppercase mb-3">
        {testimonial.eventType} • {testimonial.eventDate}
      </span>

      {/* Quote Preview */}
      <p className="text-cream/60 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
        {testimonial.quote}
      </p>

      {/* Read More */}
      <button className="inline-flex items-center gap-2 text-cream/80 text-sm hover:text-cream transition-colors group/btn">
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        Read Full Story
      </button>

      {/* Avatar Placeholder */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center overflow-hidden">
        <span className="text-cream/40 text-xs font-medium">
          {testimonial.coupleName
            .split(" & ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
    </div>
  );
};

export default TestimonialsPage;
