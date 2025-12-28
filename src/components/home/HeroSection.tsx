import { Link } from "react-router-dom";
import { Play, Mail } from "lucide-react";
import heroLogo from "@/assets/serenity-hero-logo.png";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with poster fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster image as fallback background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: "url('https://meta.vidflow.co/studio/83b2c580/media/1bam7wvl/Still2025-11-25211622181.png?width=2400&height=2400&optimize=image')"
      }} aria-hidden="true" />
        
        {/* Video overlay - will play if browser allows, otherwise poster shows through */}
        <video className="absolute inset-0 h-full w-full object-cover pointer-events-none" src="https://stream.vidflow.co/89710a190/studio/83b2c580/videos/c6b98410-d0860afb/u/Final_main.mp4" autoPlay muted loop playsInline preload="auto" disablePictureInPicture disableRemotePlayback aria-hidden="true" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center justify-center min-h-screen py-20">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-6">
          {/* Hero Logo with fade effect */}
          <div className="relative animate-fade-up">
            <div className="relative">
              <img 
                src={heroLogo} 
                alt="Serenity Wedding Films" 
                className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-2xl" 
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
              {/* Soft glow behind logo */}
              <div className="absolute inset-0 -z-10 blur-2xl opacity-30">
                <img src={heroLogo} alt="" className="w-full h-full" aria-hidden="true" />
              </div>
            </div>
          </div>
          
          {/* Tagline - balanced with logo */}
          <span className="text-cream/80 text-lg md:text-xl block opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.6s_forwards] font-sans font-extralight tracking-wide text-center max-w-md">
            Where Serenity Meets Cinema, Love Becomes a Masterpiece
          </span>
          
          {/* CTA Buttons - positioned even lower with staggered animations */}
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/portfolio" className="group flex items-center gap-3 bg-cream text-charcoal px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105 shadow-lg opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1s_forwards]">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              Watch Our Films
            </Link>
            <Link to="/contact" className="group flex items-center gap-3 border border-cream/40 text-cream px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/10 hover:border-cream backdrop-blur-sm opacity-0 animate-[fadeSlideUp_0.8s_ease-out_1.3s_forwards]">
              <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>;
};
export default HeroSection;