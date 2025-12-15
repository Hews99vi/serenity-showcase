import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  coupleName: string;
  quote: string;
  rating: number;
  eventDate: string;
  eventType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    coupleName: "Sahan & Nethmi",
    quote:
      "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day.",
    rating: 5,
    eventDate: "March 2024",
    eventType: "Wedding",
  },
  {
    id: 2,
    coupleName: "Kasun & Dilini",
    quote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable.",
    rating: 5,
    eventDate: "February 2024",
    eventType: "Pre-Wedding",
  },
  {
    id: 3,
    coupleName: "Ravindu & Sachini",
    quote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning.",
    rating: 5,
    eventDate: "January 2024",
    eventType: "Wedding",
  },
  {
    id: 4,
    coupleName: "Dinesh & Malsha",
    quote:
      "Our families still talk about how beautiful the film was. Every detail of our traditional homecoming was captured with such care.",
    rating: 5,
    eventDate: "December 2023",
    eventType: "Homecoming",
  },
  {
    id: 5,
    coupleName: "Tharindu & Ishara",
    quote:
      "The 4K quality is incredible—you can see every detail. But more than that, they captured the FEELING of our day.",
    rating: 5,
    eventDate: "November 2023",
    eventType: "Wedding",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-cream">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
            Kind Words
          </h2>
          <div className="w-20 h-px bg-charcoal/30 mx-auto" />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-10">
              {Array.from({ length: testimonials[currentIndex].rating }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-charcoal text-charcoal"
                  />
                )
              )}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-script text-charcoal leading-relaxed mb-12 min-h-[150px] flex items-center justify-center">
              <span>"{testimonials[currentIndex].quote}"</span>
            </blockquote>

            {/* Couple Info */}
            <div className="mb-12">
              <p className="text-xl font-serif font-medium text-charcoal mb-2">
                {testimonials[currentIndex].coupleName}
              </p>
              <p className="text-sm text-charcoal/60 tracking-widest uppercase">
                {testimonials[currentIndex].eventType} •{" "}
                {testimonials[currentIndex].eventDate}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={goToPrevious}
                className="w-14 h-14 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-charcoal w-8"
                        : "bg-charcoal/20 hover:bg-charcoal/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNext}
                className="w-14 h-14 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
