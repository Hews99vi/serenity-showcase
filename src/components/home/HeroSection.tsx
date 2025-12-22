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
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Hero Logo */}
          <img 
            src={heroLogo} 
            alt="Serenity Wedding Films" 
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto animate-fade-up drop-shadow-2xl"
          />
          
          {/* Tagline - positioned lower */}
          <span className="font-script text-cream/80 text-xl md:text-2xl mt-16 md:mt-20 block animate-fade-up animation-delay-200">
            Where Serenity meets Cinema, Love Becomes a MasterPiece
          </span>
          
          {/* CTA Buttons - positioned even lower */}
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <Link to="/portfolio" className="group flex items-center gap-3 bg-cream text-charcoal px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105 shadow-lg">
              <Play className="w-5 h-5" />
              Watch Our Films
            </Link>
            <Link to="/contact" className="group flex items-center gap-3 border border-cream/40 text-cream px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-cream/10 hover:border-cream backdrop-blur-sm">
              <Mail className="w-5 h-5" />
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