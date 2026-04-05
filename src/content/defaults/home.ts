import type {
  CallToActionSection,
  HomeHeroSection,
  HomeIntroSection,
  HomePhilosophySection,
  HomeQualitySection,
  HomeTestimonialsIntroSection,
  SectionIntro,
} from "@/types/content";
import { siteSettings } from "./site";

export const homeHero: HomeHeroSection = {
  tagline: siteSettings.tagline,
  primaryCtaLabel: "Watch Our Films",
  primaryCtaHref: "/portfolio",
  secondaryCtaLabel: "Request a Quote",
  secondaryCtaHref: "/contact",
  backgroundVideoPath: "/videos/hero-background.mp4",
};

export const homeIntro: HomeIntroSection = {
  eyebrow: "About Serenity",
  title: "A NEW CHAPTER IN SERENITY",
  paragraphs: [
    "We're stepping into a new chapter with a refreshed identity crafted with elegance, warmth, and timeless storytelling.",
    "At Serenity Wedding Films, every love story becomes a cinematic journey filled with emotion and beauty. We believe your wedding film should feel personal, meaningful, and deeply connected to who you are.",
  ],
  signatureText: "Let's create your masterpiece together.",
  videoUrl:
    "https://www.youtube-nocookie.com/embed/HErj8tqko3M?autoplay=1&mute=1&loop=1&playlist=HErj8tqko3M&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1",
  videoTitle: "Serenity Wedding Films Reel",
};

export const homePhilosophy: HomePhilosophySection = {
  eyebrow: "Our Philosophy",
  title: "Capturing timeless moments, one frame at a time.",
  paragraphs: [
    "We believe wedding filmmaking is more than documenting events, it's creating an emotional journey.",
    "Our goal is to preserve the feelings, the atmosphere, and the unique charm of your union in a film you will cherish for life.",
    "With a cinematic eye and a calm, unobtrusive approach, we focus on the real moments - the laughter, the quiet pauses, the energy around you.",
  ],
  valuesLine: "Natural • Artistic • Intentional",
  videoUrl:
    "https://www.youtube-nocookie.com/embed/Ycc-1d4hfEc?autoplay=1&mute=1&loop=1&playlist=Ycc-1d4hfEc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1",
  videoTitle: "Serenity Wedding Films Philosophy",
};

export const homeQuality: HomeQualitySection = {
  badge: "4K CINEMATIC QUALITY",
  title: "CAPTURING YOUR LOVE IN 4K",
  intro:
    "4K filmmaking sets a new standard in preserving memories. With four times the resolution of Full HD, every precious detail is captured with breathtaking clarity.",
  features: [
    {
      iconName: "eye",
      title: "Breathtaking Clarity",
      description:
        "Every detail - from the texture of your dress to the emotions in your loved ones' eyes - captured with stunning precision.",
    },
    {
      iconName: "sparkles",
      title: "Future-Proof Memories",
      description:
        "Your film will remain vivid, timeless, and ready for any screen in the years ahead.",
    },
    {
      iconName: "film",
      title: "Pure Emotion",
      description: "We don't just capture moments - we preserve emotions in their purest form.",
    },
  ],
  quoteLines: [
    "At Serenity Wedding Films, we don't just capture moments -",
    "We preserve emotions in their purest form.",
  ],
  videoUrl:
    "https://www.youtube-nocookie.com/embed/eQEpKw-RVJ0?autoplay=1&mute=1&loop=1&playlist=eQEpKw-RVJ0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1",
  videoTitle: "Serenity 4K Quality Showcase",
  scrollLabel: "Explore Our Films",
};

export const homeFeaturedIntro: SectionIntro = {
  eyebrow: "Cinematic Stories",
  title: "Our Work",
  description:
    "Every love story is unique. We capture the emotions, the laughter, and the tears that make your day unforgettable.",
};

export const homeTestimonialsIntro: HomeTestimonialsIntroSection = {
  titleLine1: "Wedding",
  titleLine2: "testimonials",
  description:
    "Watch real stories from couples who trusted us with their most precious moments",
  buttonLabel: "View All Stories",
  buttonHref: "/testimonials",
};

export const homeContactCta: CallToActionSection = {
  eyebrow: "Let's Create Together",
  title: "Ready to tell your love story?",
  description:
    "Connect with us to discuss your wedding film needs, wherever in Sri Lanka your celebration awaits.",
  buttonLabel: "Get in Touch",
  buttonHref: "/contact",
};
