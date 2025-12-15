import { Film, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            About Serenity Wedding Films
          </h2>
          <div className="w-24 h-px bg-accent mx-auto" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              We're stepping into a new chapter with a refreshed identity
              crafted with elegance, warmth, and timeless storytelling. At
              Serenity Wedding Films, every love story becomes a cinematic
              journey filled with emotion and beauty.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              We believe your wedding film should feel personal, meaningful, and
              deeply connected to who you are. Our approach combines artistic
              vision with genuine moments to create something truly special.
            </p>
          </div>

          {/* Philosophy Card */}
          <div className="bg-primary text-primary-foreground p-8 md:p-10 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-serif font-medium">
                  Our Philosophy
                </h3>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed italic text-lg">
                "Capturing timeless moments, one frame at a time. We believe
                wedding filmmaking is more than documenting events—it's creating
                an emotional journey. Our goal is to preserve the feelings, the
                atmosphere, and the unique charm of your union in a film you
                will cherish for life."
              </p>
            </div>
          </div>
        </div>

        {/* 4K Quality Feature */}
        <div className="bg-background border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10 grid md:grid-cols-[auto,1fr] gap-8 items-center">
            <div className="flex items-center justify-center w-20 h-20 bg-accent rounded-2xl">
              <Film className="w-10 h-10 text-accent-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold tracking-wider text-accent-foreground bg-accent px-3 py-1 rounded-full">
                  4K QUALITY
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-4">
                Capturing Your Love in 4K
              </h3>
              <p className="text-foreground/80 leading-relaxed max-w-3xl">
                4K filmmaking sets a new standard in preserving memories. With
                four times the resolution of Full HD, every detail—from the
                texture of your dress to the emotions in your loved ones'
                eyes—is captured with breathtaking clarity. Choosing 4K means
                future-proofing your memories for generations to come.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
