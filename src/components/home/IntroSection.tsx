const IntroSection = () => {
  return <section className="section-dark section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-8 block animate-fade-up">
            About Serenity
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight mb-8 animate-fade-up animation-delay-200">
            A New Chapter in Cinematic Storytelling
          </h2>
          
          <div className="space-y-6 text-cream/80 text-lg md:text-xl leading-relaxed font-light animate-fade-up animation-delay-400">
            <p>We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.</p>
            <p>
              At Serenity Wedding Films, every love story becomes a cinematic journey filled with 
              emotion and beauty. We believe your wedding film should feel personal, meaningful, 
              and deeply connected to who you are.
            </p>
            <p>From the intimate glances to the joyous celebrations, we're here to document every precious moment of your special day  naturally, artistically, and with intention.</p>
          </div>
          
          <p className="mt-10 text-2xl md:text-3xl font-script text-cream/90 animate-fade-up animation-delay-600">
            Let's create your masterpiece together.
          </p>
        </div>
      </div>
    </section>;
};
export default IntroSection;