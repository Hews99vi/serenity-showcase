import { useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
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
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  return (
    <section id="testimonials" className="section-padding bg-charcoal">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side - Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6 leading-tight">
              Wedding
              <br />
              <span className="font-script italic">testimonials</span>
            </h2>
            <p className="text-cream/60 text-sm md:text-base mb-8 max-w-sm">
              Check out what our clients have to say about their experience with
              us
            </p>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream text-sm tracking-wide hover:bg-cream hover:text-charcoal transition-all duration-300 group"
            >
              View More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                {testimonials
                  .filter((_, i) => i % 2 === 0)
                  .map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      onClick={() => setSelectedTestimonial(testimonial)}
                      index={index}
                    />
                  ))}
              </div>

              {/* Right Column - Offset */}
              <div className="flex flex-col gap-6 md:mt-12">
                {testimonials
                  .filter((_, i) => i % 2 === 1)
                  .map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      onClick={() => setSelectedTestimonial(testimonial)}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: () => void;
  index: number;
}

const TestimonialCard = ({
  testimonial,
  onClick,
  index,
}: TestimonialCardProps) => {
  return (
    <div
      className="group relative bg-cream/5 backdrop-blur-sm rounded-sm p-6 hover:bg-cream/10 transition-all duration-300 cursor-pointer"
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-cream/20 mb-4 rotate-180" />

      {/* Couple Name */}
      <h3 className="text-cream font-serif text-lg mb-3">
        {testimonial.coupleName}
      </h3>

      {/* Quote Preview */}
      <p className="text-cream/60 text-sm leading-relaxed mb-6 line-clamp-4">
        {testimonial.quote}
      </p>

      {/* Read More */}
      <button className="inline-flex items-center gap-2 text-cream/80 text-sm hover:text-cream transition-colors group/btn">
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        Read More...
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

export default Testimonials;
