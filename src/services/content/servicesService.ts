import {
  contactQuoteSection as defaultContactQuoteSection,
  contactSection as defaultContactSection,
  faqGroups as defaultFaqGroups,
  faqItems as defaultFaqItems,
  serviceItems as defaultServiceItems,
  servicesFaqCta as defaultServicesFaqCta,
  servicesFaqIntro as defaultServicesFaqIntro,
  servicesHero as defaultServicesHero,
} from "@/content/defaults/services";
import { fetchAdminSectionsByKey, fetchSectionsByKey, upsertSiteSection } from "@/services/content/sectionsService";
import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";
import type {
  ContactQuoteSection,
  ContactSection,
  FaqCallToActionSection,
  FaqGroup,
  FaqIntroSection,
  FaqItem,
  ServiceItem,
  ServicesHeroSection,
} from "@/types/content";
import { isIconName } from "@/types/content";

export interface ServicesContent {
  hero: ServicesHeroSection;
  faqIntro: FaqIntroSection;
  faqCta: FaqCallToActionSection;
  services: ServiceItem[];
  faqGroups: FaqGroup[];
  faqItems: FaqItem[];
}

export interface ContactContent {
  quoteSection: ContactQuoteSection;
  contactSection: ContactSection;
}

export interface AdminServicesContent extends ServicesContent, ContactContent {}

const servicesSectionDefaults = {
  "services.hero": defaultServicesHero,
  "services.faq_intro": defaultServicesFaqIntro,
  "services.faq_cta": defaultServicesFaqCta,
  "contact.quote": defaultContactQuoteSection,
  "contact.section": defaultContactSection,
};

export const servicesSectionDefinitions = {
  "services.hero": {
    pageSlug: "services",
    sectionSlug: "hero",
    label: "Services Hero",
  },
  "services.faq_intro": {
    pageSlug: "services",
    sectionSlug: "faq_intro",
    label: "Services FAQ Intro",
  },
  "services.faq_cta": {
    pageSlug: "services",
    sectionSlug: "faq_cta",
    label: "Services FAQ CTA",
  },
  "contact.quote": {
    pageSlug: "contact",
    sectionSlug: "quote",
    label: "Contact Quote",
  },
  "contact.section": {
    pageSlug: "contact",
    sectionSlug: "section",
    label: "Contact Section",
  },
} as const;

const mapServiceItemRow = (row: Record<string, unknown>): ServiceItem | null => {
  const dbId = row.id as string | undefined;
  const iconName = row.icon_name as ServiceItem["iconName"] | undefined;
  const title = row.title as string | undefined;
  const description = row.description as string | undefined;

  if (!dbId || !iconName || !isIconName(iconName) || !title || !description) {
    return null;
  }

  return {
    id: dbId,
    dbId,
    iconName,
    title,
    description,
    sortOrder: Number(row.sort_order ?? 0),
    isPublished: row.is_published !== false,
  };
};

const mapFaqGroupRow = (row: Record<string, unknown>): FaqGroup | null => {
  const dbId = row.id as string | undefined;
  const slug = row.slug as string | undefined;
  const label = row.label as string | undefined;
  const iconName = row.icon_name as FaqGroup["iconName"] | undefined;

  if (!dbId || !slug || !label || !iconName || !isIconName(iconName)) {
    return null;
  }

  return {
    id: slug,
    dbId,
    label,
    iconName,
    sortOrder: Number(row.sort_order ?? 0),
    isActive: row.is_active !== false,
  };
};

const mapFaqItemRow = (row: Record<string, unknown>, groupIdToSlug: Map<string, string>): FaqItem | null => {
  const dbId = row.id as string | undefined;
  const question = row.question as string | undefined;
  const answer = row.answer as string | undefined;
  const groupId = groupIdToSlug.get((row.group_id as string | undefined) ?? "");

  if (!dbId || !question || !answer || !groupId) {
    return null;
  }

  return {
    id: dbId,
    dbId,
    groupId,
    question,
    answer,
    sortOrder: Number(row.sort_order ?? 0),
    isPublished: row.is_published !== false,
  };
};

const mapServiceItems = (rows: Array<Record<string, unknown>>): ServiceItem[] => {
  return rows
    .map(mapServiceItemRow)
    .filter((row): row is ServiceItem => Boolean(row))
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

const mapFaqGroups = (
  rows: Array<Record<string, unknown>>,
): { groups: FaqGroup[]; groupIdToSlug: Map<string, string> } => {
  const mapped = rows
    .map(mapFaqGroupRow)
    .filter((row): row is FaqGroup => Boolean(row))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const groupIdToSlug = new Map<string, string>();
  rows.forEach((row) => {
    const id = row.id as string | undefined;
    const slug = row.slug as string | undefined;
    if (id && slug) {
      groupIdToSlug.set(id, slug);
    }
  });

  return {
    groups: mapped,
    groupIdToSlug,
  };
};

const mapFaqItems = (rows: Array<Record<string, unknown>>, groupIdToSlug: Map<string, string>): FaqItem[] => {
  return rows
    .map((row) => mapFaqItemRow(row, groupIdToSlug))
    .filter((row): row is FaqItem => Boolean(row))
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const fetchServicesCollections = async (): Promise<{
  services: ServiceItem[];
  faqGroups: FaqGroup[];
  faqItems: FaqItem[];
}> => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      services: defaultServiceItems,
      faqGroups: defaultFaqGroups,
      faqItems: defaultFaqItems,
    };
  }

  try {
    const [{ data: serviceRows, error: servicesError }, { data: faqGroupRows, error: faqGroupsError }, { data: faqItemRows, error: faqItemsError }] =
      await Promise.all([
        client
          .from("service_items")
          .select("id, icon_name, title, description, sort_order, is_published")
          .eq("is_published", true)
          .order("sort_order", { ascending: true }),
        client
          .from("faq_groups")
          .select("id, slug, label, icon_name, sort_order, is_active")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
        client
          .from("faq_items")
          .select("id, group_id, question, answer, sort_order, is_published")
          .eq("is_published", true)
          .order("sort_order", { ascending: true }),
      ]);

    const groupsQuerySucceeded = !faqGroupsError && Array.isArray(faqGroupRows);
    const itemsQuerySucceeded = !faqItemsError && Array.isArray(faqItemRows);
    const servicesQuerySucceeded = !servicesError && Array.isArray(serviceRows);
    const { groups, groupIdToSlug } = groupsQuerySucceeded
      ? mapFaqGroups(faqGroupRows as Array<Record<string, unknown>>)
      : { groups: defaultFaqGroups, groupIdToSlug: new Map<string, string>() };

    return {
      services: servicesQuerySucceeded
        ? mapServiceItems(serviceRows as Array<Record<string, unknown>>)
        : defaultServiceItems,
      faqGroups: groupsQuerySucceeded ? groups : defaultFaqGroups,
      faqItems: groupsQuerySucceeded && itemsQuerySucceeded
        ? mapFaqItems(faqItemRows as Array<Record<string, unknown>>, groupIdToSlug)
        : defaultFaqItems,
    };
  } catch {
    return {
      services: defaultServiceItems,
      faqGroups: defaultFaqGroups,
      faqItems: defaultFaqItems,
    };
  }
};

export const fetchServicesContent = async (): Promise<ServicesContent> => {
  const sections = await fetchSectionsByKey({
    "services.hero": defaultServicesHero,
    "services.faq_intro": defaultServicesFaqIntro,
    "services.faq_cta": defaultServicesFaqCta,
  });
  const collections = await fetchServicesCollections();

  return {
    hero: sections["services.hero"] as ServicesHeroSection,
    faqIntro: sections["services.faq_intro"] as FaqIntroSection,
    faqCta: sections["services.faq_cta"] as FaqCallToActionSection,
    services: collections.services,
    faqGroups: collections.faqGroups,
    faqItems: collections.faqItems,
  };
};

export const fetchContactContent = async (): Promise<ContactContent> => {
  const sections = await fetchSectionsByKey({
    "contact.quote": defaultContactQuoteSection,
    "contact.section": defaultContactSection,
  });

  return {
    quoteSection: sections["contact.quote"] as ContactQuoteSection,
    contactSection: sections["contact.section"] as ContactSection,
  };
};

export const fetchAdminServicesContent = async (): Promise<AdminServicesContent> => {
  const client = requireSupabaseClient();
  const [sections, serviceResponse, faqGroupResponse, faqItemResponse] = await Promise.all([
    fetchAdminSectionsByKey(servicesSectionDefaults, servicesSectionDefinitions),
    client
      .from("service_items")
      .select("id, icon_name, title, description, sort_order, is_published")
      .order("sort_order", { ascending: true }),
    client
      .from("faq_groups")
      .select("id, slug, label, icon_name, sort_order, is_active")
      .order("sort_order", { ascending: true }),
    client
      .from("faq_items")
      .select("id, group_id, question, answer, sort_order, is_published")
      .order("sort_order", { ascending: true }),
  ]);

  if (serviceResponse.error) {
    throw serviceResponse.error;
  }

  if (faqGroupResponse.error) {
    throw faqGroupResponse.error;
  }

  if (faqItemResponse.error) {
    throw faqItemResponse.error;
  }

  const faqGroupRows = (faqGroupResponse.data ?? []) as Array<Record<string, unknown>>;
  const { groups, groupIdToSlug } = faqGroupRows.length
    ? mapFaqGroups(faqGroupRows)
    : { groups: [] as FaqGroup[], groupIdToSlug: new Map<string, string>() };

  return {
    hero: sections["services.hero"].content as ServicesHeroSection,
    faqIntro: sections["services.faq_intro"].content as FaqIntroSection,
    faqCta: sections["services.faq_cta"].content as FaqCallToActionSection,
    quoteSection: sections["contact.quote"].content as ContactQuoteSection,
    contactSection: sections["contact.section"].content as ContactSection,
    services: Array.isArray(serviceResponse.data)
      ? (serviceResponse.data as Array<Record<string, unknown>>)
          .map(mapServiceItemRow)
          .filter((row): row is ServiceItem => Boolean(row))
          .sort((a, b) => a.sortOrder - b.sortOrder)
      : [],
    faqGroups: groups,
    faqItems: Array.isArray(faqItemResponse.data)
      ? (faqItemResponse.data as Array<Record<string, unknown>>)
          .map((row) => mapFaqItemRow(row, groupIdToSlug))
          .filter((row): row is FaqItem => Boolean(row))
          .sort((a, b) => a.sortOrder - b.sortOrder)
      : [],
  };
};

export const saveServicesSection = async <T extends Record<string, unknown>>(
  sectionKey: keyof typeof servicesSectionDefinitions,
  content: T,
): Promise<void> => {
  const definition = servicesSectionDefinitions[sectionKey];
  await upsertSiteSection({
    sectionKey,
    pageSlug: definition.pageSlug,
    sectionSlug: definition.sectionSlug,
    label: definition.label,
    content,
    isEnabled: true,
  });
};

export const saveServiceItem = async (serviceItem: ServiceItem): Promise<ServiceItem> => {
  const client = requireSupabaseClient();
  const payload = {
    id: serviceItem.dbId,
    icon_name: serviceItem.iconName,
    title: serviceItem.title,
    description: serviceItem.description,
    sort_order: serviceItem.sortOrder,
    is_published: serviceItem.isPublished ?? true,
  };

  const query = serviceItem.dbId
    ? client.from("service_items").upsert(payload, { onConflict: "id" })
    : client.from("service_items").insert(payload);

  const { data, error } = await query
    .select("id, icon_name, title, description, sort_order, is_published")
    .single();

  if (error) {
    throw error;
  }

  const mapped = mapServiceItemRow(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Unable to save the service item.");
  }

  return mapped;
};

export const saveServiceItemsOrder = async (items: ServiceItem[]): Promise<void> => {
  const client = requireSupabaseClient();
  const updatePromises = items
    .filter((item) => item.dbId)
    .map((item, index) =>
      client
        .from("service_items")
        .update({
          sort_order: index + 1,
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

export const deleteServiceItem = async (serviceItemId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("service_items").delete().eq("id", serviceItemId);

  if (error) {
    throw error;
  }
};

export const saveFaqGroup = async (faqGroup: FaqGroup): Promise<FaqGroup> => {
  const client = requireSupabaseClient();
  const payload = {
    id: faqGroup.dbId,
    slug: faqGroup.id,
    label: faqGroup.label,
    icon_name: faqGroup.iconName,
    sort_order: faqGroup.sortOrder,
    is_active: faqGroup.isActive ?? true,
  };

  const query = faqGroup.dbId
    ? client.from("faq_groups").upsert(payload, { onConflict: "id" })
    : client.from("faq_groups").insert(payload);

  const { data, error } = await query
    .select("id, slug, label, icon_name, sort_order, is_active")
    .single();

  if (error) {
    throw error;
  }

  const mapped = mapFaqGroupRow(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Unable to save the FAQ group.");
  }

  return mapped;
};

export const saveFaqGroupsOrder = async (groups: FaqGroup[]): Promise<void> => {
  const client = requireSupabaseClient();
  const updatePromises = groups
    .filter((group) => group.dbId)
    .map((group, index) =>
      client
        .from("faq_groups")
        .update({
          sort_order: index + 1,
          is_active: group.isActive ?? true,
        })
        .eq("id", group.dbId)
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

export const deleteFaqGroup = async (faqGroupId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("faq_groups").delete().eq("id", faqGroupId);

  if (error) {
    throw error;
  }
};

export const saveFaqItem = async (faqItem: FaqItem, faqGroups: FaqGroup[]): Promise<FaqItem> => {
  const client = requireSupabaseClient();
  const matchingGroup = faqGroups.find((group) => group.id === faqItem.groupId);

  if (!matchingGroup?.dbId) {
    throw new Error("Please choose a saved FAQ group before saving this FAQ item.");
  }

  const payload = {
    id: faqItem.dbId,
    group_id: matchingGroup.dbId,
    question: faqItem.question,
    answer: faqItem.answer,
    sort_order: faqItem.sortOrder,
    is_published: faqItem.isPublished ?? true,
  };

  const query = faqItem.dbId
    ? client.from("faq_items").upsert(payload, { onConflict: "id" })
    : client.from("faq_items").insert(payload);

  const { data, error } = await query
    .select("id, group_id, question, answer, sort_order, is_published")
    .single();

  if (error) {
    throw error;
  }

  const groupIdToSlug = new Map(
    faqGroups.filter((group) => group.dbId).map((group) => [group.dbId as string, group.id]),
  );
  const mapped = mapFaqItemRow(data as Record<string, unknown>, groupIdToSlug);
  if (!mapped) {
    throw new Error("Unable to save the FAQ item.");
  }

  return mapped;
};

export const saveFaqItemsOrder = async (items: FaqItem[]): Promise<void> => {
  const client = requireSupabaseClient();
  const updatePromises = items
    .filter((item) => item.dbId)
    .map((item, index) =>
      client
        .from("faq_items")
        .update({
          sort_order: index + 1,
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

export const deleteFaqItem = async (faqItemId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("faq_items").delete().eq("id", faqItemId);

  if (error) {
    throw error;
  }
};

