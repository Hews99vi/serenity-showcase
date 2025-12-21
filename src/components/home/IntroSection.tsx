import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    id: 1,
    label: "About Serenity",
    title: "A New Chapter in Cinematic Storytelling",
    description:
      "We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    id: 2,
    label: "Our Vision",
    title: "Every Love Story Becomes Cinematic",
    description:
      "At Serenity Wedding Films, every love story becomes a cinematic journey filled with emotion and beauty. We believe your wedding film should feel personal, meaningful, and deeply connected to who you are.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  },
  {
    id: 3,
    label: "Our Promise",
    title: "Documenting Every Precious Moment",
    description:
      "From the intimate glances to the joyous celebrations, we're here to document every precious moment of your special day — naturally, artistically, and with intention.",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
  },
];

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Image transforms
  const image1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const image2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const image3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 1], [0, 1, 1]);

  // Text transforms  
  const text1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.33], [0, -30]);

  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.33, 0.58, 0.66], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.25, 0.33, 0.66], [30, 0, -30]);

  const text3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 1], [0, 1, 1]);
  const text3Y = useTransform(scrollYProgress, [0.58, 0.66], [30, 0]);

  const textOpacities = [text1Opacity, text2Opacity, text3Opacity];
  const textYs = [text1Y, text2Y, text3Y];
  const imageOpacities = [image1Opacity, image2Opacity, image3Opacity];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-charcoal">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full h-full flex">
          
          {/* Left: Image/Reel */}
          <div className="relative w-1/2 h-full">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className="absolute inset-0"
                style={{ opacity: imageOpacities[index] }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on right edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal" />
              </motion.div>
            ))}
          </div>

          {/* Right: Text Content */}
          <div className="relative w-1/2 h-full flex items-center">
            <div className="relative w-full px-12 lg:px-20">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="absolute inset-0 flex flex-col justify-center px-12 lg:px-20"
                  style={{
                    opacity: textOpacities[index],
                    y: textYs[index],
                  }}
                >
                  <span className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-6 block">
                    {section.label}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight mb-8 tracking-wide italic">
                    {section.title}
                  </h2>
                  <p className="text-cream/70 text-base md:text-lg leading-relaxed font-light max-w-lg">
                    {section.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Section indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="flex items-center gap-3"
              style={{ opacity: textOpacities[index] }}
            >
              <span className="text-cream/40 text-xs tracking-widest uppercase hidden lg:block">
                0{index + 1}
              </span>
              <motion.div
                className="w-8 h-px bg-cream/30"
                style={{
                  scaleX: useTransform(textOpacities[index], [0.5, 1], [0.5, 1]),
                  backgroundColor: useTransform(
                    textOpacities[index],
                    [0.5, 1],
                    ["hsl(47, 100%, 88%, 0.3)", "hsl(47, 100%, 88%, 1)"]
                  ),
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll hint at bottom */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
          }}
        >
          <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
