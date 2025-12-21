import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  {
    id: 1,
    label: "About Serenity",
    title: "A New Chapter in Cinematic Storytelling",
    description:
      "We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    label: "Our Vision",
    title: "Every Love Story Becomes Cinematic",
    description:
      "At Serenity Wedding Films, every love story becomes a cinematic journey filled with emotion and beauty. We believe your wedding film should feel personal, meaningful, and deeply connected to who you are.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    label: "Our Promise",
    title: "Documenting Every Precious Moment",
    description:
      "From the intimate glances to the joyous celebrations, we're here to document every precious moment of your special day — naturally, artistically, and with intention.",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600&q=80&auto=format&fit=crop",
  },
] as const;

function DesktopReelStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animation begins when section top hits viewport top, ends after the scroll "track" finishes
    offset: ["start start", "end end"],
  });

  // Snap-like reel motion (holds each slide, then jumps to next zone)
  const reelY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.63, 0.68, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"]
  );

  // Text motion synced with reel
  const t1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.35], [0, -30]);

  const t2Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.63, 0.68], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.3, 0.35, 0.68], [30, 0, -30]);

  const t3Opacity = useTransform(scrollYProgress, [0.63, 0.68, 1], [0, 1, 1]);
  const t3Y = useTransform(scrollYProgress, [0.63, 0.68], [30, 0]);

  const textOpacities = [t1Opacity, t2Opacity, t3Opacity];
  const textYs = [t1Y, t2Y, t3Y];

  return (
    // This tall "track" is what makes the main page scroll feel "locked" here
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        <div className="h-full w-full flex flex-col lg:flex-row">
          {/* Left: Reel window */}
          <aside className="relative flex items-center justify-center h-[56vh] lg:h-full lg:w-1/2 px-6 sm:px-10 lg:px-0">
            <div className="relative w-[min(92vw,560px)] lg:w-[min(44vw,560px)] h-full lg:h-[78vh] rounded-[2.5rem] overflow-hidden border border-cream/15 bg-charcoal shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-charcoal to-transparent z-10" />

              <motion.div className="absolute inset-0" style={{ y: reelY, height: `${sections.length * 100}%` }}>
                {sections.map((s) => (
                  <div key={s.id} className="relative" style={{ height: `${100 / sections.length}%` }}>
                    <img
                      src={s.image}
                      alt={`${s.title} — cinematic wedding storytelling`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 via-transparent to-charcoal" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--charcoal)/0)_0%,hsl(var(--charcoal)/0.35)_100%)]" />
                  </div>
                ))}
              </motion.div>
            </div>
          </aside>

          {/* Right: Copy (swaps as you keep scrolling) */}
          <main className="relative flex-1 lg:w-1/2 flex items-center px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="relative w-full min-h-[38vh] lg:min-h-0">
              {sections.map((s, idx) => (
                <motion.article
                  key={s.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ opacity: textOpacities[idx], y: textYs[idx] }}
                >
                  <span className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-5 block">
                    {s.label}
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-cream leading-[1.05] mb-6 sm:mb-8 tracking-wide">
                    {s.title}
                  </h2>
                  <p className="text-cream/70 text-base sm:text-lg xl:text-xl leading-relaxed font-light max-w-xl">
                    {s.description}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* Minimal progress marks (desktop only) */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5">
              {sections.map((s, idx) => (
                <motion.div
                  key={s.id}
                  className="h-px w-10 bg-cream/25 origin-left"
                  style={{
                    scaleX: useTransform(textOpacities[idx], [0, 1], [0.35, 1]),
                    opacity: useTransform(textOpacities[idx], [0, 1], [0.35, 1]),
                  }}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const IntroSection = () => {
  return (
    <section className="bg-charcoal">
      <DesktopReelStory />
    </section>
  );
};

export default IntroSection;


