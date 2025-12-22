const IntroSection = () => {
  return <section className="section-dark section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <div className="max-w-xl">
            <span className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-8 block animate-fade-up">
              About Serenity
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight mb-8 animate-fade-up animation-delay-200 tracking-wide uppercase">A NEW CHAPTER IN SERENITY</h2>
            
            <div className="space-y-6 text-cream/80 text-lg leading-relaxed font-light animate-fade-up animation-delay-400">
              <p>We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.</p>
              <p>
                At Serenity Wedding Films, every love story becomes a cinematic journey filled with 
                emotion and beauty. We believe your wedding film should feel personal, meaningful, 
                and deeply connected to who you are.
              </p>
            </div>
            
            <p className="mt-10 text-2xl md:text-3xl font-script text-cream/90 animate-fade-up animation-delay-600">
              Let's create your masterpiece together.
            </p>
          </div>
          
          {/* Video - Right */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up animation-delay-400">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-cream/20 rounded-2xl" />
              <div className="absolute -inset-8 border border-cream/10 rounded-3xl" />
              
              <div className="relative w-[280px] h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <iframe src="https://www.youtube.com/embed/y9bfEwjzwUA?autoplay=0&mute=1&loop=1&playlist=y9bfEwjzwUA&controls=0&showinfo=0&rel=0" title="Serenity Wedding Films Reel" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-cream rounded-full scale-150" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default IntroSection;