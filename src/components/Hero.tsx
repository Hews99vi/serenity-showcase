import { Button } from "@/components/ui/button";
import { Play, FileText } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

const Hero = ({ onOpenBooking }: HeroProps) => {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 section-container text-center max-w-5xl">
        <div className="animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-cream leading-tight mb-6">
            Where Serenity Meets Cinema,
            <br />
            <span className="italic">Love Becomes a Masterpiece</span>
          </h1>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-lg md:text-xl text-cream/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Cinematic wedding films crafted with elegance, emotion, and timeless
            beauty
          </p>
        </div>

        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            onClick={scrollToPortfolio}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Our Films
          </Button>

          <Button
            onClick={onOpenBooking}
            variant="outline"
            size="lg"
            className="border-2 border-cream bg-transparent text-cream hover:bg-cream hover:text-primary px-8 py-6 text-base font-medium tracking-wide rounded-full transition-all duration-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            Request a Quote
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-cream/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
