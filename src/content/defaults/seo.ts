import type { PageSeo } from "@/types/content";
import { siteSettings } from "./site";

const baseUrl = "https://serenityweddingfilms.com/";

export const pageSeo: Record<
  "home" | "portfolio" | "services" | "contact" | "testimonials",
  PageSeo
> = {
  home: {
    title: "Serenity Wedding Films | Cinematic Wedding Experience",
    description:
      "Serenity Wedding Films creates timeless wedding films in Sri Lanka. Where Serenity Meets Cinema, Love Becomes a Masterpiece.",
    keywords:
      "wedding videography, wedding films, Sri Lanka, cinematic wedding, 4K wedding video, wedding cinematography, Serenity Wedding Films",
    ogTitle: "Serenity Wedding Films",
    ogDescription: `${siteSettings.tagline}. Timeless wedding films in Sri Lanka.`,
    ogUrl: baseUrl,
    ogImage: siteSettings.defaultOgImageUrl,
    canonical: baseUrl,
  },
  portfolio: {
    title: "Our Work | Serenity Wedding Films",
    description:
      "Explore our collection of cinematic wedding films. Watch beautiful wedding stories from couples across Sri Lanka.",
  },
  services: {
    title: "Services | Serenity Wedding Films",
    description:
      "Discover our wedding videography services - cinematic wedding films, pre-wedding shoots, homecoming films, and more in Sri Lanka.",
  },
  contact: {
    title: "Contact Us | Serenity Wedding Films",
    description:
      "Get in touch with Serenity Wedding Films. Book your wedding videography consultation today.",
  },
  testimonials: {
    title: "Client Testimonials | Serenity Wedding Films",
    description:
      "Watch heartfelt testimonials from our couples. Real stories, real emotions captured in cinematic reels.",
  },
};
