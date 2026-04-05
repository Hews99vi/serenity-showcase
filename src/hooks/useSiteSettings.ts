import { useQuery } from "@tanstack/react-query";
import {
  fetchSiteSettingsContent,
  type SiteSettingsContent,
} from "@/services/content/siteSettingsService";
import { siteSettings, socialLinks } from "@/content/defaults/site";

const initialData: SiteSettingsContent = {
  siteSettings,
  socialLinks,
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["content", "site-settings"],
    queryFn: fetchSiteSettingsContent,
    placeholderData: initialData,
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
