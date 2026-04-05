import {
  testimonials as defaultTestimonials,
  testimonialsPageCta as defaultTestimonialsPageCta,
  testimonialsPageHero as defaultTestimonialsPageHero,
  testimonialsPageQuote as defaultTestimonialsPageQuote,
} from "@/content/defaults/testimonials";
import { parseYoutubeId } from "@/lib/youtube";
import { fetchAdminSectionsByKey, fetchSectionsByKey, upsertSiteSection } from "@/services/content/sectionsService";
import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";
import type {
  CallToActionSection,
  QuoteHighlightSection,
  Testimonial,
  TestimonialsPageHeroSection,
} from "@/types/content";

export interface TestimonialsContent {
  hero: TestimonialsPageHeroSection;
  quote: QuoteHighlightSection;
  cta: CallToActionSection;
  testimonials: Testimonial[];
}

const testimonialSectionDefaults = {
  "testimonials.hero": defaultTestimonialsPageHero,
  "testimonials.quote": defaultTestimonialsPageQuote,
  "testimonials.cta": defaultTestimonialsPageCta,
};

export const testimonialsSectionDefinitions = {
  "testimonials.hero": {
    pageSlug: "testimonials",
    sectionSlug: "hero",
    label: "Testimonials Hero",
  },
  "testimonials.quote": {
    pageSlug: "testimonials",
    sectionSlug: "quote",
    label: "Testimonials Quote",
  },
  "testimonials.cta": {
    pageSlug: "testimonials",
    sectionSlug: "cta",
    label: "Testimonials Call To Action",
  },
} as const;

const mapTestimonialRow = (row: Record<string, unknown>): Testimonial | null => {
  const dbId = row.id as string | undefined;
  const youtubeId = parseYoutubeId((row.youtube_id as string | undefined) ?? "");
  const coupleName = row.couple_name as string | undefined;
  const shortQuote = row.short_quote as string | undefined;
  const fullQuote = row.full_quote as string | undefined;
  const eventType = row.event_type as string | undefined;

  if (!dbId || !youtubeId || !coupleName || !shortQuote || !fullQuote || !eventType) {
    return null;
  }

  return {
    id: dbId,
    dbId,
    coupleName,
    shortQuote,
    fullQuote,
    eventType,
    eventYear: String(row.event_year ?? ""),
    location: (row.location as string) ?? "",
    youtubeId,
    showOnHome: Boolean(row.show_on_home),
    homeSortOrder:
      row.home_sort_order === null || row.home_sort_order === undefined
        ? undefined
        : Number(row.home_sort_order),
    pageSortOrder: Number(row.page_sort_order ?? 0),
    isPublished: row.is_published !== false,
  };
};

const mapTestimonials = (rows: Array<Record<string, unknown>>): Testimonial[] => {
  return rows
    .map(mapTestimonialRow)
    .filter((row): row is Testimonial => Boolean(row))
    .sort((a, b) => a.pageSortOrder - b.pageSortOrder);
};

export const fetchTestimonialsCollection = async (): Promise<Testimonial[]> => {
  const client = getSupabaseClient();
  if (!client) {
    return defaultTestimonials;
  }

  try {
    const { data, error } = await client
      .from("testimonials")
      .select(
        "id, couple_name, short_quote, full_quote, event_type, event_year, location, youtube_id, show_on_home, home_sort_order, page_sort_order, is_published",
      )
      .eq("is_published", true)
      .order("page_sort_order", { ascending: true });

    if (error || !Array.isArray(data)) {
      return defaultTestimonials;
    }

    return mapTestimonials(data as Array<Record<string, unknown>>);
  } catch {
    return defaultTestimonials;
  }
};

export const fetchTestimonialsContent = async (): Promise<TestimonialsContent> => {
  const sections = await fetchSectionsByKey(testimonialSectionDefaults);
  const testimonials = await fetchTestimonialsCollection();

  return {
    hero: sections["testimonials.hero"] as TestimonialsPageHeroSection,
    quote: sections["testimonials.quote"] as QuoteHighlightSection,
    cta: sections["testimonials.cta"] as CallToActionSection,
    testimonials,
  };
};

export const fetchAdminTestimonialsContent = async (): Promise<TestimonialsContent> => {
  const client = requireSupabaseClient();
  const [sections, response] = await Promise.all([
    fetchAdminSectionsByKey(testimonialSectionDefaults, testimonialsSectionDefinitions),
    client
      .from("testimonials")
      .select(
        "id, couple_name, short_quote, full_quote, event_type, event_year, location, youtube_id, show_on_home, home_sort_order, page_sort_order, is_published",
      )
      .order("page_sort_order", { ascending: true }),
  ]);

  if (response.error) {
    throw response.error;
  }

  return {
    hero: sections["testimonials.hero"].content as TestimonialsPageHeroSection,
    quote: sections["testimonials.quote"].content as QuoteHighlightSection,
    cta: sections["testimonials.cta"].content as CallToActionSection,
    testimonials: Array.isArray(response.data)
      ? (response.data as Array<Record<string, unknown>>)
          .map(mapTestimonialRow)
          .filter((row): row is Testimonial => Boolean(row))
          .sort((a, b) => a.pageSortOrder - b.pageSortOrder)
      : [],
  };
};

export const saveTestimonialsSection = async <T extends Record<string, unknown>>(
  sectionKey: keyof typeof testimonialsSectionDefinitions,
  content: T,
): Promise<void> => {
  const definition = testimonialsSectionDefinitions[sectionKey];
  await upsertSiteSection({
    sectionKey,
    pageSlug: definition.pageSlug,
    sectionSlug: definition.sectionSlug,
    label: definition.label,
    content,
    isEnabled: true,
  });
};

export const saveTestimonial = async (testimonial: Testimonial): Promise<Testimonial> => {
  const client = requireSupabaseClient();
  const youtubeId = parseYoutubeId(testimonial.youtubeId);

  if (!youtubeId) {
    throw new Error("A valid YouTube URL or ID is required.");
  }

  const payload = {
    id: testimonial.dbId,
    couple_name: testimonial.coupleName,
    short_quote: testimonial.shortQuote,
    full_quote: testimonial.fullQuote,
    event_type: testimonial.eventType,
    event_year: testimonial.eventYear ? Number(testimonial.eventYear) : null,
    location: testimonial.location,
    youtube_id: youtubeId,
    show_on_home: testimonial.showOnHome,
    home_sort_order: testimonial.homeSortOrder ?? null,
    page_sort_order: testimonial.pageSortOrder,
    is_published: testimonial.isPublished ?? true,
  };

  const query = testimonial.dbId
    ? client.from("testimonials").upsert(payload, { onConflict: "id" })
    : client.from("testimonials").insert(payload);

  const { data, error } = await query
    .select(
      "id, couple_name, short_quote, full_quote, event_type, event_year, location, youtube_id, show_on_home, home_sort_order, page_sort_order, is_published",
    )
    .single();

  if (error) {
    throw error;
  }

  const mapped = mapTestimonialRow(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Unable to save the testimonial.");
  }

  return mapped;
};

export const saveTestimonialsOrder = async (testimonials: Testimonial[]): Promise<void> => {
  const client = requireSupabaseClient();
  const rows = testimonials
    .filter((testimonial) => testimonial.dbId)
    .map((testimonial, index) => ({
      id: testimonial.dbId,
      page_sort_order: index + 1,
      show_on_home: testimonial.showOnHome,
      home_sort_order: testimonial.homeSortOrder ?? null,
      is_published: testimonial.isPublished ?? true,
    }));

  if (!rows.length) {
    return;
  }

  const { error } = await client.from("testimonials").upsert(rows, { onConflict: "id" });

  if (error) {
    throw error;
  }
};

export const deleteTestimonial = async (testimonialId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("testimonials").delete().eq("id", testimonialId);

  if (error) {
    throw error;
  }
};

