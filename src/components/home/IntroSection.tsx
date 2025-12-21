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

function MobileIntroFallback() {
  return (
    <div className="lg:hidden section-container section-padding">
      <div className="max-w-5xl mx-auto space-y-14">
        {sections.map((s) => (
          <article key={s.id} className="grid gap-8">
            <div className="relative overflow-hidden rounded-2xl border border-cream/15 bg-charcoal">
              <img
                src={s.image}
                alt={`${s.title} — Serenity Wedding Films`}
                loading="lazy"
                decoding="async"
                className="h-[52vh] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/25 via-transparent to-charcoal" />
            </div>

            <header>
              <span className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-4 block">
                {s.label}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-cream leading-tight mb-4 tracking-wide italic">
                {s.title}
              </h2>
              <p className="text-cream/70 text-base sm:text-lg leading-relaxed font-light">
                {s.description}
              </p>
            </header>
          </article>
        ))}
      </div>
    </div>
  );
}

function DesktopReelStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Reel motion with snap-like easing at each section
  // Creates 3 "zones" that snap: 0-33% = slide 1, 33-66% = slide 2, 66-100% = slide 3
  const reelY = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["0%", "-100%", "-200%", "-200%"]);

  // Text motion: snaps in sync with reel
  const t1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.33], [0, -20]);

  const t2Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.28, 0.33, 0.66], [20, 0, -20]);

  const t3Opacity = useTransform(scrollYProgress, [0.61, 0.66, 1], [0, 1, 1]);
  const t3Y = useTransform(scrollYProgress, [0.61, 0.66], [20, 0]);

  const textOpacities = [t1Opacity, t2Opacity, t3Opacity];
  const textYs = [t1Y, t2Y, t3Y];

  return (
    <div ref={containerRef} className="hidden lg:block relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        <div className="h-full w-full grid grid-cols-2">
          {/* Left: Reel window */}
          <aside className="relative h-full flex items-center justify-center">
            <div className="relative w-[min(44vw,560px)] h-[78vh] rounded-[2.5rem] overflow-hidden border border-cream/15 bg-charcoal shadow-2xl">
              {/* subtle top bar like a reel */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-charcoal to-transparent z-10" />

              <motion.div
                className="absolute inset-0 grid"
                style={{ y: reelY, height: `${sections.length * 100}%` }}
              >
                {sections.map((s) => (
                  <div key={s.id} className="relative" style={{ height: `${100 / sections.length}%` }}>
                    <img
                      src={s.image}
                      alt={`${s.title} — cinematic wedding storytelling`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    {/* vignette + edge fade */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 via-transparent to-charcoal" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--charcoal)/0)_0%,hsl(var(--charcoal)/0.35)_100%)]" />
                  </div>
                ))}
              </motion.div>
            </div>
          </aside>

          {/* Right: Copy (fixed in place, swaps on scroll) */}
          <main className="relative h-full flex items-center">
            <div className="relative w-full px-16 xl:px-24">
              {sections.map((s, idx) => (
                <motion.article
                  key={s.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ opacity: textOpacities[idx], y: textYs[idx] }}
                >
                  <span className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-6 block">
                    {s.label}
                  </span>
                  <h2 className="text-5xl xl:text-6xl font-serif text-cream leading-[1.05] mb-8 tracking-wide">
                    {s.title}
                  </h2>
                  <p className="text-cream/70 text-lg xl:text-xl leading-relaxed font-light max-w-xl">
                    {s.description}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* Minimal progress marks */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5">
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
      <MobileIntroFallback />
    </section>
  );
};

export default IntroSection;

