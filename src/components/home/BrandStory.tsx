import { Film } from "lucide-react";

const BrandStory = () => {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
      
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-cream/30" />
              <span className="text-cream/50 text-xs tracking-[0.3em] uppercase">
                Our Story
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-cream leading-tight mb-8">
              Filmmaking Inspired by{" "}
              <span className="font-script text-cream/90 block mt-2">
                Sri Lankan Beauty
              </span>{" "}
              and Tradition
            </h2>

            {/* Description */}
            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              Serenity Wedding Films is dedicated to capturing the vibrant essence
              of Sri Lankan love stories. With a deep understanding of cultural
              nuances and a passion for cinematic storytelling, we transform your
              special moments into timeless memories.
            </p>
            <p className="text-cream/70 text-lg leading-relaxed mb-10">
              From scenic beaches to heritage sites, from intimate tea estates to
              grand hotel ballrooms — we know the perfect settings to make your
              wedding film truly magical.
            </p>

            {/* 4K Badge */}
            <div className="inline-flex items-center gap-4 bg-cream/5 border border-cream/10 px-6 py-4">
              <Film className="w-8 h-8 text-cream" />
              <div>
                <span className="text-xs font-medium text-cream/60 tracking-[0.2em] uppercase block">
                  Shot in
                </span>
                <span className="text-2xl font-serif font-medium text-cream">
                  4K Ultra HD
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Cinematic wedding moment"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -left-6 w-full h-full border border-cream/20 -z-10" />
            {/* Floating Quote */}
            <div className="absolute -bottom-4 right-8 bg-charcoal px-6 py-4 border border-cream/10 max-w-xs hidden md:block">
              <p className="font-script text-xl text-cream/80 italic">
                "Capturing timeless moments, one frame at a time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
