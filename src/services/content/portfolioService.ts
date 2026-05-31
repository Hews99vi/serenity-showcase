import {
  portfolioCategories as defaultPortfolioCategories,
  portfolioCategoriesIntro as defaultPortfolioCategoriesIntro,
  portfolioCta as defaultPortfolioCta,
  portfolioHero as defaultPortfolioHero,
  portfolioIntro as defaultPortfolioIntro,
  portfolioItems as defaultPortfolioItems,
} from "@/content/defaults/portfolio";
import { parseYoutubeId } from "@/lib/youtube";
import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";
import { fetchAdminSectionsByKey, fetchSectionsByKey, upsertSiteSection } from "@/services/content/sectionsService";
import type {
  CallToActionSection,
  PortfolioCategoriesIntroSection,
  PortfolioCategory,
  PortfolioCategoryId,
  PortfolioHeroSection,
  PortfolioIntroSection,
  PortfolioItem,
} from "@/types/content";
import { isIconName } from "@/types/content";

export interface PortfolioContent {
  hero: PortfolioHeroSection;
  intro: PortfolioIntroSection;
  categoriesIntro: PortfolioCategoriesIntroSection;
  cta: CallToActionSection;
  categories: PortfolioCategory[];
  videos: PortfolioItem[];
}

export interface AdminPortfolioContent extends PortfolioContent {
  categories: PortfolioCategory[];
  videos: PortfolioItem[];
}

const portfolioSectionDefaults = {
  "portfolio.hero": defaultPortfolioHero,
  "portfolio.intro": defaultPortfolioIntro,
  "portfolio.categories_intro": defaultPortfolioCategoriesIntro,
  "portfolio.cta": defaultPortfolioCta,
};

export const portfolioSectionDefinitions = {
  "portfolio.hero": {
    pageSlug: "portfolio",
    sectionSlug: "hero",
    label: "Portfolio Hero",
  },
  "portfolio.intro": {
    pageSlug: "portfolio",
    sectionSlug: "intro",
    label: "Portfolio Intro",
  },
  "portfolio.categories_intro": {
    pageSlug: "portfolio",
    sectionSlug: "categories_intro",
    label: "Portfolio Categories Intro",
  },
  "portfolio.cta": {
    pageSlug: "portfolio",
    sectionSlug: "cta",
    label: "Portfolio Call To Action",
  },
} as const;

const mapPortfolioCategoryRow = (row: Record<string, unknown>): PortfolioCategory | null => {
  const dbId = row.id as string | undefined;
  const slug = row.slug as PortfolioCategoryId | undefined;
  const title = row.title as string | undefined;
  const subtitle = row.subtitle as string | undefined;
  const description = row.description as string | undefined;
  const iconName = row.icon_name as PortfolioCategory["iconName"] | undefined;
  const image = row.image_url as string | undefined;

  if (!dbId || !slug || !title || !subtitle || !description || !iconName || !isIconName(iconName) || !image) {
    return null;
  }

  return {
    dbId,
    id: slug,
    title,
    subtitle,
    description,
    iconName,
    image,
    sortOrder: Number(row.sort_order ?? 0),
    isActive: row.is_active !== false,
  };
};

const mapPortfolioCategories = (
  rows: Array<Record<string, unknown>>,
): { categories: PortfolioCategory[]; categoryIdToSlug: Map<string, PortfolioCategoryId> } => {
  const mapped = rows
    .map(mapPortfolioCategoryRow)
    .filter((row): row is PortfolioCategory => Boolean(row))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const categoryIdToSlug = new Map<string, PortfolioCategoryId>();
  rows.forEach((row) => {
    const id = row.id as string | undefined;
    const slug = row.slug as PortfolioCategoryId | undefined;
    if (id && slug) {
      categoryIdToSlug.set(id, slug);
    }
  });

  return {
    categories: mapped,
    categoryIdToSlug,
  };
};

const mapPortfolioItemRow = (
  row: Record<string, unknown>,
  categoryIdToSlug: Map<string, PortfolioCategoryId>,
): PortfolioItem | null => {
  const dbId = row.id as string | undefined;
  const youtubeId = parseYoutubeId((row.youtube_id as string | undefined) ?? "");
  const categoryId = categoryIdToSlug.get((row.category_id as string | undefined) ?? "");
  const coupleName = (row.couple_name as string | undefined) ?? "";
  const caption = (row.caption as string | undefined) ?? "";

  if (!dbId || !youtubeId || !categoryId) {
    return null;
  }

  return {
    id: dbId,
    dbId,
    youtubeId,
    caption,
    coupleName,
    categoryId,
    featuredOnHome: Boolean(row.featured_on_home),
    homeFeatureOrder:
      row.home_feature_order === null || row.home_feature_order === undefined
        ? undefined
        : Number(row.home_feature_order),
    sortOrder: Number(row.sort_order ?? 0),
    homeTitle: (row.display_title as string | undefined) ?? undefined,
    homeSubtitle: (row.display_subtitle as string | undefined) ?? undefined,
    isPublished: row.is_published !== false,
  };
};

const mapPortfolioItems = (
  rows: Array<Record<string, unknown>>,
  categoryIdToSlug: Map<string, PortfolioCategoryId>,
): PortfolioItem[] => {
  return rows
    .map((row) => mapPortfolioItemRow(row, categoryIdToSlug))
    .filter((row): row is PortfolioItem => Boolean(row))
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const fetchPortfolioCollections = async (options?: {
  featuredOnly?: boolean;
}): Promise<{ categories: PortfolioCategory[]; videos: PortfolioItem[] }> => {
  const client = getSupabaseClient();
  const defaultVideos = options?.featuredOnly
    ? defaultPortfolioItems.filter((item) => item.featuredOnHome)
    : defaultPortfolioItems;

  if (!client) {
    return {
      categories: defaultPortfolioCategories,
      videos: defaultVideos,
    };
  }

  try {
    const itemsQuery = client
      .from("portfolio_items")
      .select(
        "id, category_id, couple_name, display_title, display_subtitle, caption, youtube_id, featured_on_home, home_feature_order, sort_order, is_published",
      )
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    const [{ data: categoryRows, error: categoriesError }, { data: itemRows, error: itemsError }] =
      await Promise.all([
        client
          .from("portfolio_categories")
          .select("id, slug, title, subtitle, description, icon_name, image_url, sort_order, is_active")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
        options?.featuredOnly ? itemsQuery.eq("featured_on_home", true) : itemsQuery,
      ]);

    const categoriesQuerySucceeded = !categoriesError && Array.isArray(categoryRows);
    const { categories, categoryIdToSlug } = categoriesQuerySucceeded
      ? mapPortfolioCategories(categoryRows as Array<Record<string, unknown>>)
      : { categories: defaultPortfolioCategories, categoryIdToSlug: new Map<string, PortfolioCategoryId>() };

    const itemsQuerySucceeded = !itemsError && Array.isArray(itemRows);
    const mappedVideos = itemsQuerySucceeded
      ? mapPortfolioItems(itemRows as Array<Record<string, unknown>>, categoryIdToSlug)
      : [];

    return {
      categories: categoriesQuerySucceeded ? categories : defaultPortfolioCategories,
      videos: categoriesQuerySucceeded && itemsQuerySucceeded ? mappedVideos : defaultVideos,
    };
  } catch {
    return {
      categories: defaultPortfolioCategories,
      videos: defaultVideos,
    };
  }
};

export const fetchPortfolioContent = async (): Promise<PortfolioContent> => {
  const sections = await fetchSectionsByKey(portfolioSectionDefaults);
  const collections = await fetchPortfolioCollections();

  return {
    hero: sections["portfolio.hero"] as PortfolioHeroSection,
    intro: sections["portfolio.intro"] as PortfolioIntroSection,
    categoriesIntro: sections["portfolio.categories_intro"] as PortfolioCategoriesIntroSection,
    cta: sections["portfolio.cta"] as CallToActionSection,
    categories: collections.categories,
    videos: collections.videos,
  };
};

export const fetchAdminPortfolioContent = async (): Promise<AdminPortfolioContent> => {
  const client = requireSupabaseClient();
  const [sections, categoryResponse, itemResponse] = await Promise.all([
    fetchAdminSectionsByKey(portfolioSectionDefaults, portfolioSectionDefinitions),
    client
      .from("portfolio_categories")
      .select("id, slug, title, subtitle, description, icon_name, image_url, sort_order, is_active")
      .order("sort_order", { ascending: true }),
    client
      .from("portfolio_items")
      .select(
        "id, category_id, couple_name, display_title, display_subtitle, caption, youtube_id, featured_on_home, home_feature_order, sort_order, is_published",
      )
      .order("sort_order", { ascending: true }),
  ]);

  if (categoryResponse.error) {
    throw categoryResponse.error;
  }

  if (itemResponse.error) {
    throw itemResponse.error;
  }

  const categoryRows = (categoryResponse.data ?? []) as Array<Record<string, unknown>>;
  const itemRows = (itemResponse.data ?? []) as Array<Record<string, unknown>>;
  const { categories, categoryIdToSlug } = categoryRows.length
    ? mapPortfolioCategories(categoryRows)
    : { categories: [] as PortfolioCategory[], categoryIdToSlug: new Map<string, PortfolioCategoryId>() };

  return {
    hero: sections["portfolio.hero"].content as PortfolioHeroSection,
    intro: sections["portfolio.intro"].content as PortfolioIntroSection,
    categoriesIntro: sections["portfolio.categories_intro"].content as PortfolioCategoriesIntroSection,
    cta: sections["portfolio.cta"].content as CallToActionSection,
    categories,
    videos: itemRows.length ? mapPortfolioItems(itemRows, categoryIdToSlug) : [],
  };
};

export const savePortfolioSection = async <T extends Record<string, unknown>>(
  sectionKey: keyof typeof portfolioSectionDefinitions,
  content: T,
): Promise<void> => {
  const definition = portfolioSectionDefinitions[sectionKey];
  await upsertSiteSection({
    sectionKey,
    pageSlug: definition.pageSlug,
    sectionSlug: definition.sectionSlug,
    label: definition.label,
    content,
    isEnabled: true,
  });
};

export const savePortfolioCategory = async (category: PortfolioCategory): Promise<PortfolioCategory> => {
  const client = requireSupabaseClient();
  const payload = {
    id: category.dbId,
    slug: category.id,
    title: category.title,
    subtitle: category.subtitle,
    description: category.description,
    icon_name: category.iconName,
    image_url: category.image,
    sort_order: category.sortOrder ?? 0,
    is_active: category.isActive ?? true,
  };

  const query = category.dbId
    ? client.from("portfolio_categories").upsert(payload, { onConflict: "id" })
    : client.from("portfolio_categories").insert(payload);

  const { data, error } = await query
    .select("id, slug, title, subtitle, description, icon_name, image_url, sort_order, is_active")
    .single();

  if (error) {
    throw error;
  }

  const mapped = mapPortfolioCategoryRow(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Unable to save the portfolio category.");
  }

  return mapped;
};

export const savePortfolioCategoriesOrder = async (categories: PortfolioCategory[]): Promise<void> => {
  const client = requireSupabaseClient();
  const updatePromises = categories
    .filter((category) => category.dbId)
    .map((category, index) =>
      client
        .from("portfolio_categories")
        .update({
          sort_order: index + 1,
          is_active: category.isActive ?? true,
        })
        .eq("id", category.dbId)
    );

  if (!updatePromises.length) {
    return;
  }

  const results = await Promise.all(updatePromises);
  const error = results.find((res) => res.error)?.error;

  if (error) {
    throw error;
  }
};

export const deletePortfolioCategory = async (categoryId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("portfolio_categories").delete().eq("id", categoryId);

  if (error) {
    throw error;
  }
};

export const savePortfolioItem = async (
  item: PortfolioItem,
  categories: PortfolioCategory[],
): Promise<PortfolioItem> => {
  const client = requireSupabaseClient();
  const youtubeId = parseYoutubeId(item.youtubeId);

  if (!youtubeId) {
    throw new Error("A valid YouTube URL or ID is required.");
  }

  const matchingCategory = categories.find((category) => category.id === item.categoryId);
  if (!matchingCategory?.dbId) {
    throw new Error("Please choose a saved portfolio category before saving this film.");
  }

  const payload = {
    id: item.dbId,
    category_id: matchingCategory.dbId,
    couple_name: item.coupleName,
    display_title: item.homeTitle ?? null,
    display_subtitle: item.homeSubtitle ?? null,
    caption: item.caption,
    youtube_id: youtubeId,
    featured_on_home: item.featuredOnHome,
    home_feature_order: item.homeFeatureOrder ?? null,
    sort_order: item.sortOrder,
    is_published: item.isPublished ?? true,
  };

  const query = item.dbId
    ? client.from("portfolio_items").upsert(payload, { onConflict: "id" })
    : client.from("portfolio_items").insert(payload);

  const { data, error } = await query
    .select(
      "id, category_id, couple_name, display_title, display_subtitle, caption, youtube_id, featured_on_home, home_feature_order, sort_order, is_published",
    )
    .single();

  if (error) {
    throw error;
  }

  const categoryIdToSlug = new Map(
    categories.filter((category) => category.dbId).map((category) => [category.dbId as string, category.id]),
  );
  const mapped = mapPortfolioItemRow(data as Record<string, unknown>, categoryIdToSlug);
  if (!mapped) {
    throw new Error("Unable to save the portfolio film.");
  }

  return mapped;
};

export const savePortfolioItemsOrder = async (items: PortfolioItem[]): Promise<void> => {
  const client = requireSupabaseClient();
  const updatePromises = items
    .filter((item) => item.dbId)
    .map((item, index) =>
      client
        .from("portfolio_items")
        .update({
          sort_order: index + 1,
          featured_on_home: item.featuredOnHome,
          home_feature_order: item.homeFeatureOrder ?? null,
          is_published: item.isPublished ?? true,
        })
        .eq("id", item.dbId)
    );

  if (!updatePromises.length) {
    return;
  }

  const results = await Promise.all(updatePromises);
  const error = results.find((res) => res.error)?.error;

  if (error) {
    throw error;
  }
};

export const deletePortfolioItem = async (itemId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("portfolio_items").delete().eq("id", itemId);

  if (error) {
    throw error;
  }
};

