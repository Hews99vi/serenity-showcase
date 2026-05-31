export type SocialPlatform = "whatsapp" | "instagram" | "facebook" | "youtube" | "tiktok";

export type IconName =
  | "film"
  | "sparkles"
  | "heart"
  | "eye"
  | "map-pin"
  | "plane"
  | "calendar"
  | "clock"
  | "palette";

export type PortfolioCategoryId = string;

export type ManagedPageSlug = "home" | "portfolio" | "services" | "contact" | "testimonials";

export interface SiteSettings {
  siteName: string;
  legalName: string;
  tagline: string;
  contactEmail: string;
  whatsappUrl: string;
  whatsappNumber: string;
  whatsappPrefillMessage: string;
  locationLabel: string;
  footerCopyrightText: string;
  footerCreditText: string;
  defaultOgImageUrl: string;
  themeColor: string;
}

export interface SocialLink {
  id?: string;
  platform: SocialPlatform;
  label: string;
  href: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface HomeHeroSection {
  tagline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backgroundVideoPath: string;
}

export interface HomeIntroSection {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signatureText: string;
  videoUrl: string;
  videoTitle: string;
}

export interface HomePhilosophySection {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  valuesLine: string;
  videoUrl: string;
  videoTitle: string;
}

export interface FeatureItem {
  iconName: IconName;
  title: string;
  description: string;
}

export interface HomeQualitySection {
  badge: string;
  title: string;
  intro: string;
  features: FeatureItem[];
  quoteLines: [string, string];
  videoUrl: string;
  videoTitle: string;
  scrollLabel: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HomeTestimonialsIntroSection {
  titleLine1: string;
  titleLine2: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface CallToActionSection {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface PortfolioHeroSection {
  title: string;
  subtitle: string;
}

export interface PortfolioIntroSection {
  titlePrefix: string;
  highlightText: string;
  paragraphs: [string, string];
  quoteText: string;
  heroVideoPath: string;
}

export interface PortfolioCategoriesIntroSection {
  eyebrow: string;
  title: string;
  description: string;
  allLabel: string;
}

export interface PortfolioCategory {
  dbId?: string;
  id: PortfolioCategoryId;
  title: string;
  subtitle: string;
  description: string;
  iconName: IconName;
  image: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface PortfolioItem {
  id: string;
  dbId?: string;
  youtubeId: string;
  caption: string;
  coupleName: string;
  categoryId: PortfolioCategoryId;
  featuredOnHome: boolean;
  homeFeatureOrder?: number;
  sortOrder: number;
  homeTitle?: string;
  homeSubtitle?: string;
  isPublished?: boolean;
}

export interface TestimonialsPageHeroSection {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  moreStoriesLabel: string;
  readMoreLabel: string;
}

export interface QuoteHighlightSection {
  quoteText: string;
  attribution: string;
}

export interface Testimonial {
  id: string;
  dbId?: string;
  coupleName: string;
  shortQuote: string;
  fullQuote: string;
  eventType: string;
  eventYear: string;
  location: string;
  youtubeId: string;
  showOnHome: boolean;
  homeSortOrder?: number;
  pageSortOrder: number;
  isPublished?: boolean;
}

export interface ServicesHeroSection {
  eyebrow: string;
  title: string;
  description: string;
  faqPromptEyebrow: string;
  faqPromptText: string;
}

export interface ServiceItem {
  id: string;
  dbId?: string;
  iconName: IconName;
  title: string;
  description: string;
  sortOrder: number;
  isPublished?: boolean;
}

export interface FaqIntroSection {
  eyebrow: string;
  title: string;
  description: string;
}

export interface FaqCallToActionSection {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
}

export interface FaqGroup {
  id: string;
  dbId?: string;
  label: string;
  iconName: IconName;
  sortOrder: number;
  isActive?: boolean;
}

export interface FaqItem {
  id: string;
  dbId?: string;
  groupId: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished?: boolean;
}

export interface ContactQuoteSection {
  eyebrow: string;
  title: string;
  description: string;
  quoteText: string;
}

export interface ContactSection {
  eyebrow: string;
  title: string;
  socialHeading: string;
  whatsappEyebrow: string;
  whatsappLabel: string;
  emailEyebrow: string;
}

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  canonical?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
}

export const ICON_OPTIONS: IconName[] = [
  "film",
  "sparkles",
  "heart",
  "eye",
  "map-pin",
  "plane",
  "calendar",
  "clock",
  "palette",
];

export const isIconName = (value: unknown): value is IconName => {
  return typeof value === "string" && ICON_OPTIONS.includes(value as IconName);
};
