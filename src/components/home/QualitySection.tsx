import { Film, Sparkles, Eye, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const QualitySection = () => {
  const features = [{
    icon: Eye,
    title: "Breathtaking Clarity",
    description: "Every detail — from the texture of your dress to the emotions in your loved ones' eyes — captured with stunning precision."
  }, {
    icon: Sparkles,
    title: "Future-Proof Memories",
    description: "Your film will remain vivid, timeless, and ready for any screen in the years ahead."
  }, {
    icon: Film,
    title: "Pure Emotion",
    description: "We don't just capture moments — we preserve emotions in their purest form."
  }];

  const scrollToFeatured = () => {
    const element = document.getElementById("featured");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return <section className="section-dark section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cream blur-3xl" />
      </div>
      
      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-3xl">
          {/* Text Content - Left */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 bg-cream/10 border border-cream/20 rounded-full px-6 py-2 mb-8">
              <span className="text-cream text-sm font-medium tracking-wider">4K CINEMATIC QUALITY</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-cream leading-tight mb-6 tracking-wide uppercase lg:text-4xl text-left">CAPTURING YOUR LOVE IN 4K</h2>
            
            <p className="text-cream/70 text-lg md:text-xl leading-relaxed mb-10">
              4K filmmaking sets a new standard in preserving memories. With four times the 
              resolution of Full HD, every precious detail is captured with breathtaking clarity.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => <div key={index} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-cream/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cream/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-cream mb-1">{feature.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
          
          {/* Video - Right */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative glow ring */}
              <div className="absolute inset-0 -m-8 rounded-full border border-cream/10 animate-pulse" style={{
              animationDuration: '3s'
            }} />
              <div className="absolute inset-0 -m-16 rounded-full border border-cream/5" />
              
              <div className="relative w-[280px] h-[500px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-cream/20">
                <iframe src="https://www.youtube.com/embed/DLhYYb76hJw?autoplay=1&mute=1&loop=1&playlist=DLhYYb76hJw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" title="Serenity 4K Quality Showcase" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              
              {/* Ambient glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-cream rounded-full scale-125" />
            </div>
          </div>
        </div>
        
        {/* Quote Section */}
        <div className="text-center mt-20">
          <p className="text-2xl md:text-3xl font-script text-cream/80">
            At Serenity Wedding Films, we don't just capture moments —
          </p>
          <p className="text-2xl md:text-3xl font-script text-cream mt-2">
            We preserve emotions in their purest form.
          </p>
        </div>

        {/* Decorative Scroll Element */}
        <div className="flex flex-col items-center mt-10 md:mt-12 pb-4">
          {/* Decorative Lines */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-cream/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-cream/40" />
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-cream/30" />
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToFeatured}
            className="group flex flex-col items-center gap-2 text-cream/40 hover:text-cream/70 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase font-light">
              Explore Our Films
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream/40 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {/* Bottom decorative line */}
          <div className="w-px h-6 bg-gradient-to-b from-cream/20 to-transparent mt-2" />
        </div>
      </div>
    </section>;
};
export default QualitySection;