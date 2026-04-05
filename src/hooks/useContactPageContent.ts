import { useQuery } from "@tanstack/react-query";
import { siteSettings, socialLinks } from "@/content/defaults/site";
import { contactQuoteSection, contactSection } from "@/content/defaults/services";
import { fetchContactContent, type ContactContent } from "@/services/content/servicesService";
import { fetchSiteSettingsContent, type SiteSettingsContent } from "@/services/content/siteSettingsService";

export interface ContactPageContent extends SiteSettingsContent, ContactContent {}

const fallbackData: ContactPageContent = {
  siteSettings,
  socialLinks,
  quoteSection: contactQuoteSection,
  contactSection,
};

const fetchContactPageContent = async (): Promise<ContactPageContent> => {
  const [{ siteSettings, socialLinks }, contactContent] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchContactContent(),
  ]);

  return {
    siteSettings,
    socialLinks,
    ...contactContent,
  };
};

export const useContactPageContent = () => {
  return useQuery({
    queryKey: ["content", "page", "contact"],
    queryFn: fetchContactPageContent,
    placeholderData: fallbackData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
