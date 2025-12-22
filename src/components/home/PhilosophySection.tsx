const PhilosophySection = () => {
  return (
    <section id="philosophy" className="section-light section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video - Left */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 animate-fade-up">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-charcoal/20" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-charcoal/20" />
              
              <div className="relative w-[280px] h-[500px] rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/Ycc-1d4hfEc?autoplay=0&mute=1&loop=1&playlist=Ycc-1d4hfEc&controls=0&showinfo=0&rel=0"
                  title="Serenity Wedding Films Philosophy"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          
          {/* Text Content - Right */}
          <div className="max-w-xl order-1 lg:order-2">
            <div className="mb-12">
              <span className="text-charcoal/60 text-xs tracking-[0.3em] uppercase mb-6 block">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal leading-tight tracking-wide uppercase">
                Capturing timeless moments, one frame at a time.
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-charcoal/80 text-lg leading-relaxed">
                We believe wedding filmmaking is more than documenting events, it's creating an emotional journey.
              </p>
              <p className="text-charcoal/80 text-lg leading-relaxed">
                Our goal is to preserve the feelings, the atmosphere, and the unique charm 
                of your union in a film you will cherish for life.
              </p>
              <p className="text-charcoal/80 text-lg leading-relaxed">
                With a cinematic eye and a calm, unobtrusive approach, we focus on the real 
                moments — the laughter, the quiet pauses, the energy around you.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-px bg-charcoal/30" />
                <span className="text-charcoal/60 text-sm tracking-wider uppercase">
                  Natural • Artistic • Intentional
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
