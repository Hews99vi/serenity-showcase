import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
      "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day. Thank you for creating such a beautiful masterpiece!",
    rating: 5,
    eventDate: "March 2024",
    eventType: "Wedding",
  },
  {
    id: 2,
    coupleName: "Kasun & Dilini",
    quote:
      "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable. Our pre-wedding film exceeded all expectations!",
    rating: 5,
    eventDate: "February 2024",
    eventType: "Pre-Wedding",
  },
  {
    id: 3,
    coupleName: "Ravindu & Sachini",
    quote:
      "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning, and the editing was flawless. We've watched it at least 20 times!",
    rating: 5,
    eventDate: "January 2024",
    eventType: "Wedding",
  },
  {
    id: 4,
    coupleName: "Dinesh & Malsha",
    quote:
      "Our families still talk about how beautiful the film was. Every detail of our traditional homecoming was captured with such care and artistry. Highly recommend!",
    rating: 5,
    eventDate: "December 2023",
    eventType: "Homecoming",
  },
  {
    id: 5,
    coupleName: "Tharindu & Ishara",
    quote:
      "The 4K quality is incredible—you can see every detail. But more than that, they captured the FEELING of our day. It's not just a video, it's a treasure we'll keep forever.",
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
    }, 5000);

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
    <section id="testimonials" className="section-padding bg-muted">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            Testimonials & Reviews
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most meaningful part of our work isn't the cameras or the
            editing—it's the way couples feel when they watch their wedding
            film.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="bg-background border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-accent/20" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  )
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-serif text-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Couple Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {testimonials[currentIndex].coupleName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].eventType} •{" "}
                    {testimonials[currentIndex].eventDate}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPrevious}
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-accent w-6"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
