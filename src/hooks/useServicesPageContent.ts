import { useQuery } from "@tanstack/react-query";
import { siteSettings, socialLinks } from "@/content/defaults/site";
import {
  faqGroups,
  faqItems,
  serviceItems,
  servicesFaqCta,
  servicesFaqIntro,
  servicesHero,
} from "@/content/defaults/services";
import { fetchServicesContent, type ServicesContent } from "@/services/content/servicesService";
import { fetchSiteSettingsContent, type SiteSettingsContent } from "@/services/content/siteSettingsService";

export interface ServicesPageContent extends SiteSettingsContent, ServicesContent {}

const fallbackData: ServicesPageContent = {
  siteSettings,
  socialLinks,
  hero: servicesHero,
  faqIntro: servicesFaqIntro,
  faqCta: servicesFaqCta,
  services: serviceItems,
  faqGroups,
  faqItems,
};

const fetchServicesPageContent = async (): Promise<ServicesPageContent> => {
  const [{ siteSettings, socialLinks }, servicesContent] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchServicesContent(),
  ]);

  return {
    siteSettings,
    socialLinks,
    ...servicesContent,
  };
};

export const useServicesPageContent = () => {
  return useQuery({
    queryKey: ["content", "page", "services"],
    queryFn: fetchServicesPageContent,
    placeholderData: fallbackData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
