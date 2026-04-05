import { useQuery } from "@tanstack/react-query";
import {
  portfolioCategories,
  portfolioCategoriesIntro,
  portfolioCta,
  portfolioHero,
  portfolioIntro,
  portfolioItems,
} from "@/content/defaults/portfolio";
import { siteSettings, socialLinks } from "@/content/defaults/site";
import {
  fetchPortfolioContent,
  type PortfolioContent,
} from "@/services/content/portfolioService";
import { fetchSiteSettingsContent, type SiteSettingsContent } from "@/services/content/siteSettingsService";
import type {
  CallToActionSection,
  PortfolioCategoriesIntroSection,
  PortfolioHeroSection,
  PortfolioIntroSection,
} from "@/types/content";

export interface PortfolioPageContent extends SiteSettingsContent, PortfolioContent {}

const fallbackData: PortfolioPageContent = {
  siteSettings,
  socialLinks,
  hero: portfolioHero,
  intro: portfolioIntro,
  categoriesIntro: portfolioCategoriesIntro,
  cta: portfolioCta,
  categories: portfolioCategories,
  videos: portfolioItems,
};

const fetchPortfolioPageContent = async (): Promise<PortfolioPageContent> => {
  const [{ siteSettings, socialLinks }, portfolioContent] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchPortfolioContent(),
  ]);

  return {
    siteSettings,
    socialLinks,
    hero: portfolioContent.hero as PortfolioHeroSection,
    intro: portfolioContent.intro as PortfolioIntroSection,
    categoriesIntro: portfolioContent.categoriesIntro as PortfolioCategoriesIntroSection,
    cta: portfolioContent.cta as CallToActionSection,
    categories: portfolioContent.categories,
    videos: portfolioContent.videos,
  };
};

export const usePortfolioPageContent = () => {
  return useQuery({
    queryKey: ["content", "page", "portfolio"],
    queryFn: fetchPortfolioPageContent,
    placeholderData: fallbackData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
