import { useQuery } from "@tanstack/react-query";
import { pageSeo } from "@/content/defaults/seo";
import { fetchPageSeo, type PageSlug } from "@/services/content/seoService";

export const usePageMeta = (pageSlug: PageSlug) => {
  return useQuery({
    queryKey: ["content", "page-meta", pageSlug],
    queryFn: () => fetchPageSeo(pageSlug),
    placeholderData: pageSeo[pageSlug],
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
