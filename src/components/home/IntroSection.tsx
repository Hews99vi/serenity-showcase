import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    id: 1,
    label: "About Serenity",
    title: "A New Chapter in Cinematic Storytelling",
    description:
      "We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0",
  },
  {
    id: 2,
    label: "Our Vision",
    title: "Every Love Story Becomes Cinematic",
    description:
      "At Serenity Wedding Films, every love story becomes a cinematic journey filled with emotion and beauty. We believe your wedding film should feel personal, meaningful, and deeply connected to who you are.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0",
  },
  {
    id: 3,
    label: "Our Promise",
    title: "Documenting Every Precious Moment",
    description:
      "From the intimate glances to the joyous celebrations, we're here to document every precious moment of your special day — naturally, artistically, and with intention.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0",
  },
];

const PhoneMockup = ({ videoUrl, index }: { videoUrl: string; index: number }) => {
  return (
    <div 
      className="relative w-[180px] md:w-[220px] lg:w-[260px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(145deg, hsl(var(--charcoal-light)), hsl(var(--charcoal)))",
        border: "3px solid hsl(var(--cream) / 0.2)",
      }}
    >
      {/* Phone notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-charcoal rounded-full z-10" />
      
      {/* Video content */}
      <div className="absolute inset-2 rounded-[1.5rem] overflow-hidden bg-charcoal">
        <iframe
          src={videoUrl}
          className="w-full h-full object-cover scale-150"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={`Reel ${index + 1}`}
        />
      </div>
      
      {/* Phone reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values for the phone stack
  const phone1Y = useTransform(scrollYProgress, [0, 0.33], [0, -100]);
  const phone1Rotate = useTransform(scrollYProgress, [0, 0.33], [-15, -5]);
  const phone1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 1, 0.3]);

  const phone2Y = useTransform(scrollYProgress, [0, 0.33, 0.66], [50, 0, -100]);
  const phone2Rotate = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 0, 5]);
  const phone2Opacity = useTransform(scrollYProgress, [0.2, 0.33, 0.5, 0.7], [0.3, 1, 1, 0.3]);

  const phone3Y = useTransform(scrollYProgress, [0.33, 0.66, 1], [100, 50, 0]);
  const phone3Rotate = useTransform(scrollYProgress, [0.33, 0.66, 1], [15, 10, 5]);
  const phone3Opacity = useTransform(scrollYProgress, [0.5, 0.66, 1], [0.3, 1, 1]);

  // Text section transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.33], [0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.33, 0.5, 0.66], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.2, 0.33, 0.66], [50, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.66, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.5, 0.66], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-charcoal">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Text Content */}
            <div className="relative h-[300px] md:h-[400px]">
              {sections.map((section, index) => {
                const opacities = [text1Opacity, text2Opacity, text3Opacity];
                const yTransforms = [text1Y, text2Y, text3Y];
                
                return (
                  <motion.div
                    key={section.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity: opacities[index],
                      y: yTransforms[index],
                    }}
                  >
                    <span className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-4 block">
                      {section.label}
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-cream leading-tight mb-6 tracking-wide uppercase">
                      {section.title}
                    </h2>
                    <p className="text-cream/80 text-base md:text-lg leading-relaxed font-light max-w-lg">
                      {section.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Phone Mockups Stack */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Phone 1 */}
              <motion.div
                className="absolute"
                style={{
                  y: phone1Y,
                  rotate: phone1Rotate,
                  opacity: phone1Opacity,
                  x: -40,
                  zIndex: 1,
                }}
              >
                <PhoneMockup videoUrl={sections[0].video} index={0} />
              </motion.div>

              {/* Phone 2 */}
              <motion.div
                className="absolute"
                style={{
                  y: phone2Y,
                  rotate: phone2Rotate,
                  opacity: phone2Opacity,
                  x: 0,
                  zIndex: 2,
                }}
              >
                <PhoneMockup videoUrl={sections[1].video} index={1} />
              </motion.div>

              {/* Phone 3 */}
              <motion.div
                className="absolute"
                style={{
                  y: phone3Y,
                  rotate: phone3Rotate,
                  opacity: phone3Opacity,
                  x: 40,
                  zIndex: 3,
                }}
              >
                <PhoneMockup videoUrl={sections[2].video} index={2} />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -z-10 w-[400px] h-[400px] rounded-full bg-cream/5 blur-3xl" />
            </div>
          </div>

          {/* Signature at bottom */}
          <motion.p 
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-script text-cream/80 text-center"
            style={{
              opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
            }}
          >
            Let's create your masterpiece together.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            }}
          >
            <span className="text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section, index) => {
          const opacities = [text1Opacity, text2Opacity, text3Opacity];
          return (
            <motion.div
              key={section.id}
              className="w-2 h-2 rounded-full bg-cream/30"
              style={{
                scale: useTransform(opacities[index], [0.5, 1], [1, 1.5]),
                backgroundColor: useTransform(
                  opacities[index],
                  [0.5, 1],
                  ["hsl(var(--cream) / 0.3)", "hsl(var(--cream))"]
                ),
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default IntroSection;
