import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const sections = [
  {
    id: 1,
    label: "About Serenity",
    title: "A New Chapter in Cinematic Storytelling",
    description:
      "We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.",
    videoId: "DLhYYb76hJw",
  },
  {
    id: 2,
    label: "Our Vision",
    title: "Every Love Story Becomes Cinematic",
    description:
      "At Serenity Wedding Films, every love story becomes a cinematic journey filled with emotion and beauty. We believe your wedding film should feel personal, meaningful, and deeply connected to who you are.",
    videoId: "7lJUUoLLG1g",
  },
  {
    id: 3,
    label: "Our Promise",
    title: "Documenting Every Precious Moment",
    description:
      "From the intimate glances to the joyous celebrations, we're here to document every precious moment of your special day — naturally, artistically, and with intention.",
    videoId: "vY0qjnKNh-A",
  },
] as const;

function DesktopReelStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelViewportRef = useRef<HTMLDivElement>(null);
  const [frameHeight, setFrameHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = reelViewportRef.current;
    if (!el) return;

    const update = () => {
      setFrameHeight(el.getBoundingClientRect().height);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active section for video autoplay
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  // Smoother reel motion with extended transition zones
  const reelY = useTransform(
    scrollYProgress,
    [0, 0.28, 0.38, 0.58, 0.72, 1],
    [0, 0, -frameHeight, -frameHeight, -frameHeight * 2, -frameHeight * 2]
  );

  // Smoother text transitions with longer crossfade
  const t1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.38], [0, -40]);

  const t2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.58, 0.72], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.28, 0.38, 0.72], [40, 0, -40]);

  const t3Opacity = useTransform(scrollYProgress, [0.58, 0.72, 1], [0, 1, 1]);
  const t3Y = useTransform(scrollYProgress, [0.58, 0.72], [40, 0]);

  const textOpacities = [t1Opacity, t2Opacity, t3Opacity];
  const textYs = [t1Y, t2Y, t3Y];

  // Debug overlay (enable with ?debugScroll=1)
  const showDebug =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("debugScroll") === "1";
  const debugWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Progress indicator transforms - moved outside JSX to fix hooks violation
  const p1Scale = useTransform(t1Opacity, [0, 1], [0.35, 1]);
  const p1Opacity = useTransform(t1Opacity, [0, 1], [0.35, 1]);
  const p2Scale = useTransform(t2Opacity, [0, 1], [0.35, 1]);
  const p2Opacity = useTransform(t2Opacity, [0, 1], [0.35, 1]);
  const p3Scale = useTransform(t3Opacity, [0, 1], [0.35, 1]);
  const p3Opacity = useTransform(t3Opacity, [0, 1], [0.35, 1]);

  const progressScales = [p1Scale, p2Scale, p3Scale];
  const progressOpacities = [p1Opacity, p2Opacity, p3Opacity];

  return (
    // This tall "track" is what makes the main page scroll feel "locked" here
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        {showDebug && (
          <div className="pointer-events-none absolute left-4 top-4 z-50 rounded-md border border-cream/10 bg-charcoal/70 px-3 py-2 text-xs text-cream backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="tracking-[0.3em] uppercase text-cream/60">Scroll</span>
              <div className="h-1 w-32 overflow-hidden rounded bg-cream/15">
                <motion.div className="h-full bg-cream" style={{ width: debugWidth }} />
              </div>
            </div>
          </div>
        )}

        <div className="h-full w-full flex flex-col lg:flex-row">
          {/* Left: Reel window */}
          <aside className="relative flex items-center justify-center h-[56vh] lg:h-full lg:w-1/2 px-6 sm:px-10 lg:px-0">
            <div
              ref={reelViewportRef}
              className="relative w-auto h-[70vh] lg:h-[80vh] aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-cream/15 bg-charcoal shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-charcoal to-transparent z-10" />

              <motion.div
                className="absolute top-0 left-0 right-0 will-change-transform"
                style={{ 
                  y: reelY, 
                  height: `${sections.length * 100}%`,
                }}
                transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.6 }}
              >
                {sections.map((s, idx) => (
                  <div key={s.id} className="relative" style={{ height: `${100 / sections.length}%` }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${s.videoId}?autoplay=${activeIndex === idx ? 1 : 0}&mute=1&loop=1&playlist=${s.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title={`${s.title} — cinematic wedding storytelling`}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                      style={{ border: 'none' }}
                      allow="autoplay; encrypted-media"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-charcoal/60 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--charcoal)/0)_0%,hsl(var(--charcoal)/0.4)_100%)] pointer-events-none" />
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
                    scaleX: progressScales[idx],
                    opacity: progressOpacities[idx],
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


