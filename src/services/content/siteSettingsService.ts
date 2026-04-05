import { getSupabaseClient, requireSupabaseClient } from "@/lib/supabase";
import { siteSettings as defaultSiteSettings, socialLinks as defaultSocialLinks } from "@/content/defaults/site";
import type { SiteSettings, SocialLink } from "@/types/content";

export interface SiteSettingsContent {
  siteSettings: SiteSettings;
  socialLinks: SocialLink[];
}

const mapSiteSettingsRow = (row: Record<string, unknown>): SiteSettings => ({
  ...defaultSiteSettings,
  siteName: (row.site_name as string) ?? defaultSiteSettings.siteName,
  legalName: (row.legal_name as string) ?? defaultSiteSettings.legalName,
  tagline: (row.tagline as string) ?? defaultSiteSettings.tagline,
  contactEmail: (row.contact_email as string) ?? defaultSiteSettings.contactEmail,
  whatsappUrl: (row.whatsapp_url as string) ?? defaultSiteSettings.whatsappUrl,
  whatsappNumber: (row.whatsapp_number as string) ?? defaultSiteSettings.whatsappNumber,
  whatsappPrefillMessage:
    (row.whatsapp_prefill_message as string) ?? defaultSiteSettings.whatsappPrefillMessage,
  locationLabel: (row.location_label as string) ?? defaultSiteSettings.locationLabel,
  footerCopyrightText:
    (row.footer_copyright_text as string) ?? defaultSiteSettings.footerCopyrightText,
  footerCreditText:
    (row.footer_credit_text as string) ?? defaultSiteSettings.footerCreditText,
  defaultOgImageUrl:
    (row.default_og_image_url as string) ?? defaultSiteSettings.defaultOgImageUrl,
  themeColor: (row.theme_color as string) ?? defaultSiteSettings.themeColor,
});

const mapSiteSettingsToRow = (settings: SiteSettings) => ({
  id: 1,
  site_name: settings.siteName,
  legal_name: settings.legalName,
  tagline: settings.tagline,
  contact_email: settings.contactEmail,
  whatsapp_url: settings.whatsappUrl,
  whatsapp_number: settings.whatsappNumber,
  whatsapp_prefill_message: settings.whatsappPrefillMessage,
  location_label: settings.locationLabel,
  footer_copyright_text: settings.footerCopyrightText,
  footer_credit_text: settings.footerCreditText,
  default_og_image_url: settings.defaultOgImageUrl,
  theme_color: settings.themeColor,
});

const mapSocialLinkRow = (row: Record<string, unknown>): SocialLink | null => {
  const platform = row.platform as SocialLink["platform"] | undefined;
  const label = row.label as string | undefined;
  const href = row.url as string | undefined;

  if (!platform || !label || !href) {
    return null;
  }

  return {
    id: (row.id as string | undefined) ?? undefined,
    platform,
    label,
    href,
    sortOrder: Number(row.sort_order ?? 0),
    isActive: row.is_active !== false,
  };
};

const mapSocialLinks = (rows: Array<Record<string, unknown>>): SocialLink[] => {
  return rows
    .map(mapSocialLinkRow)
    .filter((row): row is SocialLink => Boolean(row))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
};

export const fetchSiteSettingsContent = async (): Promise<SiteSettingsContent> => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      siteSettings: defaultSiteSettings,
      socialLinks: defaultSocialLinks,
    };
  }

  try {
    const [{ data: siteSettingsRow, error: siteSettingsError }, { data: socialLinksRows, error: socialLinksError }] =
      await Promise.all([
        client.from("site_settings").select("*").eq("id", 1).maybeSingle(),
        client
          .from("social_links")
          .select("id, platform, label, url, is_active, sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

    return {
      siteSettings:
        !siteSettingsError && siteSettingsRow
          ? mapSiteSettingsRow(siteSettingsRow as Record<string, unknown>)
          : defaultSiteSettings,
      socialLinks:
        !socialLinksError && Array.isArray(socialLinksRows)
          ? mapSocialLinks(socialLinksRows as Array<Record<string, unknown>>)
          : defaultSocialLinks,
    };
  } catch {
    return {
      siteSettings: defaultSiteSettings,
      socialLinks: defaultSocialLinks,
    };
  }
};

export const fetchAdminSiteSettingsContent = async (): Promise<SiteSettingsContent> => {
  const client = requireSupabaseClient();

  const [{ data: siteSettingsRow, error: siteSettingsError }, { data: socialLinksRows, error: socialLinksError }] =
    await Promise.all([
      client.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      client
        .from("social_links")
        .select("id, platform, label, url, is_active, sort_order")
        .order("sort_order", { ascending: true }),
    ]);

  if (siteSettingsError) {
    throw siteSettingsError;
  }

  if (socialLinksError) {
    throw socialLinksError;
  }

  return {
    siteSettings: siteSettingsRow ? mapSiteSettingsRow(siteSettingsRow as Record<string, unknown>) : defaultSiteSettings,
    socialLinks: Array.isArray(socialLinksRows)
      ? (socialLinksRows as Array<Record<string, unknown>>)
          .map(mapSocialLinkRow)
          .filter((row): row is SocialLink => Boolean(row))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      : [],
  };
};

export const saveSiteSettings = async (settings: SiteSettings): Promise<SiteSettings> => {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("site_settings")
    .upsert(mapSiteSettingsToRow(settings), { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapSiteSettingsRow(data as Record<string, unknown>);
};

export const saveSocialLink = async (socialLink: SocialLink): Promise<SocialLink> => {
  const client = requireSupabaseClient();
  const payload = {
    id: socialLink.id,
    platform: socialLink.platform,
    label: socialLink.label,
    url: socialLink.href,
    is_active: socialLink.isActive ?? true,
    sort_order: socialLink.sortOrder ?? 0,
  };

  const query = socialLink.id
    ? client.from("social_links").upsert(payload, { onConflict: "id" })
    : client.from("social_links").insert(payload);

  const { data, error } = await query.select("id, platform, label, url, is_active, sort_order").single();

  if (error) {
    throw error;
  }

  const mapped = mapSocialLinkRow(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Unable to save the social link.");
  }

  return mapped;
};

export const saveSocialLinksOrder = async (socialLinks: SocialLink[]): Promise<void> => {
  const client = requireSupabaseClient();
  const rows = socialLinks
    .filter((link) => link.id)
    .map((link, index) => ({ id: link.id, sort_order: index + 1, is_active: link.isActive ?? true }));

  if (!rows.length) {
    return;
  }

  const { error } = await client.from("social_links").upsert(rows, { onConflict: "id" });

  if (error) {
    throw error;
  }
};

export const deleteSocialLink = async (socialLinkId: string): Promise<void> => {
  const client = requireSupabaseClient();
  const { error } = await client.from("social_links").delete().eq("id", socialLinkId);

  if (error) {
    throw error;
  }
};

