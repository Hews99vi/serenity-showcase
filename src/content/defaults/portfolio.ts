import categoryCultural from "@/assets/category-cultural.jpg";
import categoryDestination from "@/assets/category-destination.jpg";
import categoryEngagement from "@/assets/category-engagement.jpg";
import type {
  CallToActionSection,
  PortfolioCategoriesIntroSection,
  PortfolioCategory,
  PortfolioHeroSection,
  PortfolioIntroSection,
  PortfolioItem,
} from "@/types/content";

export const portfolioHero: PortfolioHeroSection = {
  title: "Our Work",
  subtitle: "Stories We've Told",
};

export const portfolioIntro: PortfolioIntroSection = {
  titlePrefix: "Every couple has a",
  highlightText: "unique rhythm",
  paragraphs: [
    "From intimate coastside ceremonies to elegant hotel celebrations, we focus on genuine emotion, natural storytelling, and timeless cinematics.",
    "Our work blends real moments, clean visuals, and thoughtful sound design to create films that feel personal, emotional, and beautifully true to you.",
  ],
  quoteText:
    '"We capture love in its most authentic form quietly, powerfully, and with heart."',
  heroVideoPath: "/videos/portfolio-hero.mp4",
};

export const portfolioCategoriesIntro: PortfolioCategoriesIntroSection = {
  eyebrow: "Browse by Category",
  title: "We create",
  description: "Select a category to explore our featured wedding films",
  allLabel: "Featured Films",
};

export const portfolioCta: CallToActionSection = {
  title: "Ready to tell your story?",
  description: "",
  buttonLabel: "Get in Touch",
  buttonHref: "/contact",
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "destination",
    title: "Destination Weddings",
    subtitle: "Love Across Borders",
    description: "Exotic locations, breathtaking vistas, and unforgettable celebrations",
    iconName: "map-pin",
    image: categoryDestination,
  },
  {
    id: "cultural",
    title: "Classic Sri Lankan Cultural Weddings",
    subtitle: "Timeless Traditions",
    description: "Rich heritage, sacred rituals, and the beauty of our culture",
    iconName: "sparkles",
    image: categoryCultural,
  },
  {
    id: "engagement",
    title: "Engagement & Pre-Wedding Stories",
    subtitle: "The Beginning",
    description: "Capturing the magic of your journey before the big day",
    iconName: "heart",
    image: categoryEngagement,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "film-1",
    youtubeId: "0TvxJPETd-8",
    caption: "A celebration filled with colour, culture, and heartfelt connections.",
    coupleName: "Kavindu & Lankika",
    categoryId: "cultural",
    featuredOnHome: true,
    homeFeatureOrder: 1,
    sortOrder: 1,
    homeTitle: "Eternal Moments",
    homeSubtitle: "A Love Story",
  },
  {
    id: "film-2",
    youtubeId: "EQBWxoCvVdQ",
    caption: "Where tradition meets timeless love, beautifully captured.",
    coupleName: "Nilupuli & Chinthaka",
    categoryId: "cultural",
    featuredOnHome: true,
    homeFeatureOrder: 3,
    sortOrder: 2,
    homeTitle: "Timeless Vows",
    homeSubtitle: "Your Perfect Day",
  },
  {
    id: "film-3",
    youtubeId: "v-BLUo0s0zI",
    caption: "A quiet moment by the sea. A story told through soft light and raw emotion.",
    coupleName: "Malka & Amasha",
    categoryId: "destination",
    featuredOnHome: false,
    sortOrder: 3,
  },
  {
    id: "film-4",
    youtubeId: "oq4QcEnhz5E",
    caption: "Love knows no borders, a destination celebration.",
    coupleName: "Jithmi & Waruna",
    categoryId: "destination",
    featuredOnHome: false,
    sortOrder: 4,
  },
  {
    id: "film-5",
    youtubeId: "d4EVqmeHXLM",
    caption: "Sacred rituals and heartfelt moments woven together.",
    coupleName: "Uma & Udaraka",
    categoryId: "cultural",
    featuredOnHome: true,
    homeFeatureOrder: 2,
    sortOrder: 5,
    homeTitle: "Golden Hours",
    homeSubtitle: "Captured Forever",
  },
  {
    id: "film-6",
    youtubeId: "LzUrmG_gBlA",
    caption: "The beauty of heritage, the joy of celebration.",
    coupleName: "Gayani & Rajitha",
    categoryId: "cultural",
    featuredOnHome: false,
    sortOrder: 6,
  },
  {
    id: "film-7",
    youtubeId: "YaZWNpmYuYo",
    caption: "Two souls finding forever in a moment of pure joy.",
    coupleName: "Chamudi & Umesh",
    categoryId: "engagement",
    featuredOnHome: false,
    sortOrder: 7,
  },
  {
    id: "film-8",
    youtubeId: "gINkgjJelU4",
    caption: "The beginning of a beautiful journey together.",
    coupleName: "Bhanusha & Janith",
    categoryId: "engagement",
    featuredOnHome: false,
    sortOrder: 8,
  },
  {
    id: "film-9",
    youtubeId: "Jh254MxhU3g",
    caption: "Love stories start with a simple yes.",
    coupleName: "Rasanjalee & Sumedha",
    categoryId: "engagement",
    featuredOnHome: false,
    sortOrder: 9,
  },
];
