import type {
  CallToActionSection,
  QuoteHighlightSection,
  Testimonial,
  TestimonialsPageHeroSection,
} from "@/types/content";

export const testimonialsPageHero: TestimonialsPageHeroSection = {
  eyebrow: "Words from Our Couples",
  titleLine1: "Love Stories",
  titleLine2: "Told by You",
  description:
    "Real moments, genuine emotions, and heartfelt words from the couples who trusted us to capture their most precious day",
  moreStoriesLabel: "More Stories",
  readMoreLabel: "Read Full Story",
};

export const testimonialsPageQuote: QuoteHighlightSection = {
  quoteText:
    '"Every love story is beautiful, but yours should be told in a way that makes you feel every moment again and again."',
  attribution: "Serenity Films",
};

export const testimonialsPageCta: CallToActionSection = {
  title: "Share Your Story",
  description:
    "Let us capture the beautiful moments of your special day and create a film you'll treasure forever",
  buttonLabel: "Get in Touch",
  buttonHref: "/contact",
};

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    coupleName: "Udaraka & Uma",
    shortQuote: "The video was absolutely beautiful. Thank you for your amazing work!",
    fullQuote:
      "A huge thank you for Serenity Wedding Films for the incredible job you did capturing our wedding day! The video was absolutely beautiful. Thank you so much Ishara malli for your amazing work and dedication.",
    eventType: "Wedding",
    eventYear: "2024",
    location: "Sri Lanka",
    youtubeId: "GUipYDqu72k",
    showOnHome: true,
    homeSortOrder: 1,
    pageSortOrder: 1,
  },
  {
    id: "testimonial-2",
    coupleName: "Bashi & Dehemi",
    shortQuote: "My work was beautifully done. Everyone said it was beautiful.",
    fullQuote:
      "My work was beautifully done. Everyone said it was beautiful. It was beautiful than I expected. Good job. Thank you malli.",
    eventType: "Wedding",
    eventYear: "2024",
    location: "Sri Lanka",
    youtubeId: "pxaBIOkCW1M",
    showOnHome: true,
    homeSortOrder: 2,
    pageSortOrder: 2,
  },
  {
    id: "testimonial-3",
    coupleName: "Nilmi & Tharindu",
    shortQuote: "Thank you for finishing our video so lovely. We truly appreciate it.",
    fullQuote:
      "Thank you so much for all the hard work you put into our wedding day video. We truly appreciate it. It meant so much to us that you finished our video so lovely. Thank you again @ishara malli.",
    eventType: "Wedding",
    eventYear: "2024",
    location: "Sri Lanka",
    youtubeId: "fSSQLuejmzg",
    showOnHome: true,
    homeSortOrder: 3,
    pageSortOrder: 3,
  },
];
