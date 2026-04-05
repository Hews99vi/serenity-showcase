import { pageSeo } from "@/content/defaults/seo";
import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";
import type { ManagedPageSlug, PageSeo } from "@/types/content";

export type PageSlug = ManagedPageSlug;

const mapPageMetaRow = (row: Record<string, unknown>, defaults: PageSeo): PageSeo => ({
  ...defaults,
  title: (row.title as string) ?? defaults.title,
  description: (row.description as string) ?? defaults.description,
  keywords: (row.keywords as string | undefined) ?? defaults.keywords,
  ogTitle: (row.og_title as string | undefined) ?? defaults.ogTitle,
  ogDescription: (row.og_description as string | undefined) ?? defaults.ogDescription,
  ogUrl: (row.canonical_url as string | undefined) ?? defaults.ogUrl,
  ogImage: (row.og_image_url as string | undefined) ?? defaults.ogImage,
  canonical: (row.canonical_url as string | undefined) ?? defaults.canonical,
  noindex: (row.noindex as boolean | undefined) ?? defaults.noindex,
});

const mapPageMetaToRow = (pageSlug: PageSlug, meta: PageSeo) => ({
  page_slug: pageSlug,
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords ?? null,
  og_title: meta.ogTitle ?? null,
  og_description: meta.ogDescription ?? null,
  canonical_url: meta.canonical ?? meta.ogUrl ?? null,
  og_image_url: meta.ogImage ?? null,
  noindex: meta.noindex ?? false,
});

export const fetchPageSeo = async (pageSlug: PageSlug): Promise<PageSeo> => {
  const defaults = pageSeo[pageSlug];
  const client = getSupabaseClient();

  if (!client) {
    return defaults;
  }

  try {
    const { data, error } = await client
      .from("page_meta")
      .select("page_slug, title, description, keywords, og_title, og_description, canonical_url, og_image_url, noindex")
      .eq("page_slug", pageSlug)
      .maybeSingle();

    if (error || !data) {
      return defaults;
    }

    return mapPageMetaRow(data as Record<string, unknown>, defaults);
  } catch {
    return defaults;
  }
};

export const fetchAdminPageMeta = async (): Promise<Record<PageSlug, PageSeo>> => {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("page_meta")
    .select("page_slug, title, description, keywords, og_title, og_description, canonical_url, og_image_url, noindex");

  if (error) {
    throw error;
  }

  const rowsBySlug = new Map<string, Record<string, unknown>>(
    ((data ?? []) as Array<Record<string, unknown>>).map((row) => [String(row.page_slug ?? ""), row]),
  );

  return Object.keys(pageSeo).reduce((accumulator, key) => {
    const pageSlug = key as PageSlug;
    accumulator[pageSlug] = rowsBySlug.has(pageSlug)
      ? mapPageMetaRow(rowsBySlug.get(pageSlug) as Record<string, unknown>, pageSeo[pageSlug])
      : pageSeo[pageSlug];
    return accumulator;
  }, {} as Record<PageSlug, PageSeo>);
};

export const savePageMeta = async (pageSlug: PageSlug, meta: PageSeo): Promise<PageSeo> => {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("page_meta")
    .upsert(mapPageMetaToRow(pageSlug, meta), { onConflict: "page_slug" })
    .select("page_slug, title, description, keywords, og_title, og_description, canonical_url, og_image_url, noindex")
    .single();

  if (error) {
    throw error;
  }

  return mapPageMetaRow(data as Record<string, unknown>, pageSeo[pageSlug]);
};
