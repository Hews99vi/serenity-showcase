import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export interface SiteSectionRecord<T extends Record<string, unknown>> {
  sectionKey: string;
  pageSlug: string;
  sectionSlug: string;
  label: string;
  content: T;
  isEnabled: boolean;
}

export interface UpsertSiteSectionInput<T extends Record<string, unknown>> {
  sectionKey: string;
  pageSlug: string;
  sectionSlug: string;
  label: string;
  content: T;
  isEnabled?: boolean;
}

const mapSectionRow = <T extends Record<string, unknown>>(
  defaults: T,
  row: Record<string, unknown> | null | undefined,
): SiteSectionRecord<T> => ({
  sectionKey: String(row?.section_key ?? ""),
  pageSlug: String(row?.page_slug ?? ""),
  sectionSlug: String(row?.section_slug ?? ""),
  label: String(row?.label ?? ""),
  content: mergeSectionContent(defaults, row?.content),
  isEnabled: row?.is_enabled !== false,
});

export const mergeSectionContent = <T extends Record<string, unknown>>(
  defaults: T,
  candidate: unknown,
): T => {
  if (!isPlainObject(candidate)) {
    return defaults;
  }

  return {
    ...defaults,
    ...candidate,
  } as T;
};

export const fetchSectionsByKey = async <T extends Record<string, Record<string, unknown>>>(
  defaultsByKey: T,
): Promise<T> => {
  const client = getSupabaseClient();
  if (!client) {
    return defaultsByKey;
  }

  const sectionKeys = Object.keys(defaultsByKey);
  if (!sectionKeys.length) {
    return defaultsByKey;
  }

  try {
    const { data, error } = await client
      .from("site_sections")
      .select("section_key, content, is_enabled")
      .in("section_key", sectionKeys)
      .eq("is_enabled", true);

    if (error || !data) {
      return defaultsByKey;
    }

    const rowsByKey = new Map(data.map((row) => [row.section_key as keyof T, row.content]));

    return sectionKeys.reduce((accumulator, sectionKey) => {
      accumulator[sectionKey as keyof T] = mergeSectionContent(
        defaultsByKey[sectionKey as keyof T],
        rowsByKey.get(sectionKey as keyof T),
      );
      return accumulator;
    }, { ...defaultsByKey } as T);
  } catch {
    return defaultsByKey;
  }
};

export const fetchAdminSectionsByKey = async <T extends Record<string, Record<string, unknown>>>(
  defaultsByKey: T,
  definitions: Record<string, { pageSlug: string; sectionSlug: string; label: string }>,
): Promise<Record<keyof T, SiteSectionRecord<T[keyof T]>>> => {
  const client = requireSupabaseClient();
  const sectionKeys = Object.keys(defaultsByKey);

  if (!sectionKeys.length) {
    return {} as Record<keyof T, SiteSectionRecord<T[keyof T]>>;
  }

  const { data, error } = await client
    .from("site_sections")
    .select("section_key, page_slug, section_slug, label, content, is_enabled")
    .in("section_key", sectionKeys);

  if (error) {
    throw error;
  }

  const rowsByKey = new Map(
    (data ?? []).map((row) => [row.section_key as keyof T, row as Record<string, unknown>]),
  );

  return sectionKeys.reduce((accumulator, sectionKey) => {
    const row = rowsByKey.get(sectionKey as keyof T);
    const definition = definitions[sectionKey];

    accumulator[sectionKey as keyof T] = row
      ? mapSectionRow(defaultsByKey[sectionKey as keyof T], row)
      : {
          sectionKey,
          pageSlug: definition.pageSlug,
          sectionSlug: definition.sectionSlug,
          label: definition.label,
          content: defaultsByKey[sectionKey as keyof T],
          isEnabled: true,
        };

    return accumulator;
  }, {} as Record<keyof T, SiteSectionRecord<T[keyof T]>>);
};

export const upsertSiteSection = async <T extends Record<string, unknown>>({
  sectionKey,
  pageSlug,
  sectionSlug,
  label,
  content,
  isEnabled = true,
}: UpsertSiteSectionInput<T>): Promise<SiteSectionRecord<T>> => {
  const client = requireSupabaseClient();

  const payload = {
    section_key: sectionKey,
    page_slug: pageSlug,
    section_slug: sectionSlug,
    label,
    content,
    is_enabled: isEnabled,
  };

  const { data, error } = await client
    .from("site_sections")
    .upsert(payload, { onConflict: "section_key" })
    .select("section_key, page_slug, section_slug, label, content, is_enabled")
    .single();

  if (error) {
    throw error;
  }

  return mapSectionRow(content, data as Record<string, unknown>);
};
