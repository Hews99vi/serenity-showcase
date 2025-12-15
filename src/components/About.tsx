import { Film } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-charcoal">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6">
            Serenity Wedding Films
          </h2>
          <div className="w-20 h-px bg-cream/30 mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Cinematic wedding moment"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-cream/20 -z-10" />
          </div>

          {/* Right Column - Text */}
          <div className="space-y-8">
            <div>
              <h3 className="font-script text-3xl md:text-4xl text-cream/90 mb-6">
                Our Story
              </h3>
              <p className="text-cream/70 text-lg leading-relaxed mb-6">
                We're stepping into a new chapter with a refreshed identity
                crafted with elegance, warmth, and timeless storytelling. At
                Serenity Wedding Films, every love story becomes a cinematic
                journey filled with emotion and beauty.
              </p>
              <p className="text-cream/70 text-lg leading-relaxed">
                We believe your wedding film should feel personal, meaningful, and
                deeply connected to who you are. Our approach combines artistic
                vision with genuine moments to create something truly special.
              </p>
            </div>

            {/* Philosophy Quote */}
            <blockquote className="border-l-2 border-cream/30 pl-6 py-4">
              <p className="font-script text-2xl text-cream/80 italic leading-relaxed">
                "Capturing timeless moments, one frame at a time."
              </p>
            </blockquote>
          </div>
        </div>

        {/* 4K Quality Feature */}
        <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 p-10 md:p-16">
          <div className="grid md:grid-cols-[auto,1fr] gap-10 items-center">
            <div className="flex items-center justify-center w-24 h-24 bg-cream text-charcoal">
              <Film className="w-12 h-12" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-medium tracking-[0.2em] text-charcoal bg-cream px-4 py-2 uppercase">
                  4K Quality
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-cream mb-4">
                Capturing Your Love in 4K
              </h3>
              <p className="text-cream/70 leading-relaxed max-w-3xl text-lg">
                4K filmmaking sets a new standard in preserving memories. With
                four times the resolution of Full HD, every detail—from the
                texture of your dress to the emotions in your loved ones'
                eyes—is captured with breathtaking clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
