import { Film, Sparkles, Eye } from "lucide-react";

const QualitySection = () => {
  const features = [
    {
      icon: Eye,
      title: "Breathtaking Clarity",
      description: "Every detail — from the texture of your dress to the emotions in your loved ones' eyes — captured with stunning precision."
    },
    {
      icon: Sparkles,
      title: "Future-Proof Memories",
      description: "Your film will remain vivid, timeless, and ready for any screen in the years ahead."
    },
    {
      icon: Film,
      title: "Pure Emotion",
      description: "We don't just capture moments — we preserve emotions in their purest form."
    }
  ];

  return (
    <section className="section-dark section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cream blur-3xl" />
      </div>
      
      <div className="section-container relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-cream/10 border border-cream/20 rounded-full px-6 py-2 mb-8">
              <span className="text-cream text-sm font-medium tracking-wider">4K CINEMATIC QUALITY</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight mb-6">
              Capturing Your Love in 4K
            </h2>
            
            <p className="text-cream/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              4K filmmaking sets a new standard in preserving memories. With four times the 
              resolution of Full HD, every precious detail is captured with breathtaking clarity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 border border-cream/10 rounded-2xl bg-cream/5 hover:bg-cream/10 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-cream/10 flex items-center justify-center mb-6 group-hover:bg-cream/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-cream" />
                </div>
                <h3 className="text-xl font-serif text-cream mb-3">{feature.title}</h3>
                <p className="text-cream/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-2xl md:text-3xl font-script text-cream/80">
              At Serenity Wedding Films, we don't just capture moments —
            </p>
            <p className="text-2xl md:text-3xl font-script text-cream mt-2">
              We preserve emotions in their purest form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
