import { useQuery } from "@tanstack/react-query";
import { siteSettings, socialLinks } from "@/content/defaults/site";
import {
  testimonials,
  testimonialsPageCta,
  testimonialsPageHero,
  testimonialsPageQuote,
} from "@/content/defaults/testimonials";
import { fetchSiteSettingsContent, type SiteSettingsContent } from "@/services/content/siteSettingsService";
import {
  fetchTestimonialsContent,
  type TestimonialsContent,
} from "@/services/content/testimonialsService";

export interface TestimonialsPageContent extends SiteSettingsContent, TestimonialsContent {}

const fallbackData: TestimonialsPageContent = {
  siteSettings,
  socialLinks,
  hero: testimonialsPageHero,
  quote: testimonialsPageQuote,
  cta: testimonialsPageCta,
  testimonials,
};

const fetchTestimonialsPageContent = async (): Promise<TestimonialsPageContent> => {
  const [{ siteSettings, socialLinks }, testimonialsContent] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchTestimonialsContent(),
  ]);

  return {
    siteSettings,
    socialLinks,
    ...testimonialsContent,
  };
};

export const useTestimonialsPageContent = () => {
  return useQuery({
    queryKey: ["content", "page", "testimonials"],
    queryFn: fetchTestimonialsPageContent,
    placeholderData: fallbackData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
