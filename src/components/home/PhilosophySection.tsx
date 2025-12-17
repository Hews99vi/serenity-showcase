const PhilosophySection = () => {
  return <section className="section-light section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-charcoal/60 text-xs tracking-[0.3em] uppercase mb-6 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal leading-tight">
              Capturing timeless moments, one frame at a time.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-6">
              <p className="text-charcoal/80 text-lg leading-relaxed">We believe wedding filmmaking is more than documenting events, it's creating an emotional journey.</p>
              <p className="text-charcoal/80 text-lg leading-relaxed">
                Our goal is to preserve the feelings, the atmosphere, and the unique charm 
                of your union in a film you will cherish for life.
              </p>
            </div>
            
            <div className="space-y-6">
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
    </section>;
};
export default PhilosophySection;