import type { SiteSettings, SocialLink } from "@/types/content";

export const siteSettings: SiteSettings = {
  siteName: "Serenity Wedding Films",
  legalName: "SERENITY WEDDING FILMS (PVT) LTD",
  tagline: "Where Serenity Meets Cinema, Love Becomes a Masterpiece",
  contactEmail: "info@serenityweddingfilms.com",
  whatsappUrl: "https://wa.me/message/CUNOJLDRQ6PME1",
  whatsappNumber: "94771234567",
  whatsappPrefillMessage: "Hi! I'm interested in your wedding videography services.",
  locationLabel: "Sri Lanka",
  footerCopyrightText: "© 2026 SERENITY WEDDING FILMS (PVT) LTD",
  footerCreditText: "All photographs are the property of their respective owners",
  defaultOgImageUrl: "https://serenityweddingfilms.com/og-image.jpg",
  themeColor: "#2D2D2D",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: siteSettings.whatsappUrl,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://instagram.com/serenityweddingfilms",
  },
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://facebook.com/serenityweddingfilms",
  },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@serenityweddingfilms",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@serenityweddingfilms?_t=8hmv9VTaBx1&_r=1",
  },
];
