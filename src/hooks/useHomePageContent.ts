import { useQuery } from "@tanstack/react-query";
import {
  homeContactCta,
  homeFeaturedIntro,
  homeHero,
  homeIntro,
  homePhilosophy,
  homeQuality,
  homeTestimonialsIntro,
} from "@/content/defaults/home";
import { portfolioItems } from "@/content/defaults/portfolio";
import { siteSettings, socialLinks } from "@/content/defaults/site";
import { testimonials as defaultTestimonials } from "@/content/defaults/testimonials";
import { fetchPortfolioCollections } from "@/services/content/portfolioService";
import { fetchSectionsByKey } from "@/services/content/sectionsService";
import { fetchSiteSettingsContent, type SiteSettingsContent } from "@/services/content/siteSettingsService";
import { fetchTestimonialsCollection } from "@/services/content/testimonialsService";
import type {
  CallToActionSection,
  HomeHeroSection,
  HomeIntroSection,
  HomePhilosophySection,
  HomeQualitySection,
  HomeTestimonialsIntroSection,
  PortfolioItem,
  SectionIntro,
  Testimonial,
} from "@/types/content";

export interface HomePageContent extends SiteSettingsContent {
  hero: HomeHeroSection;
  intro: HomeIntroSection;
  philosophy: HomePhilosophySection;
  quality: HomeQualitySection;
  featuredIntro: SectionIntro;
  testimonialsIntro: HomeTestimonialsIntroSection;
  contactCta: CallToActionSection;
  featuredFilms: PortfolioItem[];
  testimonials: Testimonial[];
}

const fallbackData: HomePageContent = {
  siteSettings,
  socialLinks,
  hero: homeHero,
  intro: homeIntro,
  philosophy: homePhilosophy,
  quality: homeQuality,
  featuredIntro: homeFeaturedIntro,
  testimonialsIntro: homeTestimonialsIntro,
  contactCta: homeContactCta,
  featuredFilms: portfolioItems.filter((film) => film.featuredOnHome),
  testimonials: defaultTestimonials
    .filter((testimonial) => testimonial.showOnHome)
    .sort((a, b) => (a.homeSortOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeSortOrder ?? Number.MAX_SAFE_INTEGER)),
};

const fetchHomePageContent = async (): Promise<HomePageContent> => {
  const [{ siteSettings, socialLinks }, homeSections, { videos }, testimonials] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchSectionsByKey({
      "home.hero": homeHero,
      "home.intro": homeIntro,
      "home.philosophy": homePhilosophy,
      "home.quality": homeQuality,
      "home.featured_intro": homeFeaturedIntro,
      "home.testimonials_intro": homeTestimonialsIntro,
      "home.contact_cta": homeContactCta,
    }),
    fetchPortfolioCollections({ featuredOnly: true }),
    fetchTestimonialsCollection(),
  ]);

  return {
    siteSettings,
    socialLinks,
    hero: homeSections["home.hero"] as HomeHeroSection,
    intro: homeSections["home.intro"] as HomeIntroSection,
    philosophy: homeSections["home.philosophy"] as HomePhilosophySection,
    quality: homeSections["home.quality"] as HomeQualitySection,
    featuredIntro: homeSections["home.featured_intro"] as SectionIntro,
    testimonialsIntro: homeSections["home.testimonials_intro"] as HomeTestimonialsIntroSection,
    contactCta: homeSections["home.contact_cta"] as CallToActionSection,
    featuredFilms: videos,
    testimonials: testimonials
      .filter((testimonial) => testimonial.showOnHome)
      .sort((a, b) => (a.homeSortOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeSortOrder ?? Number.MAX_SAFE_INTEGER)),
  };
};

export const useHomePageContent = () => {
  return useQuery({
    queryKey: ["content", "page", "home"],
    queryFn: fetchHomePageContent,
    placeholderData: fallbackData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
