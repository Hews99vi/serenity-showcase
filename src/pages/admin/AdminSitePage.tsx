import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQueryState from "@/components/admin/AdminQueryState";
import SectionFormCard from "@/components/admin/forms/SectionFormCard";
import SocialLinkForm from "@/components/admin/forms/SocialLinkForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  deleteSocialLink,
  fetchAdminSiteSettingsContent,
  saveSiteSettings,
  saveSocialLink,
  saveSocialLinksOrder,
} from "@/services/content/siteSettingsService";
import { fetchAdminServicesContent, saveServicesSection } from "@/services/content/servicesService";
import type { ContactQuoteSection, ContactSection, SiteSettings, SocialLink } from "@/types/content";

const queryKey = ["admin", "page", "site"];

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const emptySocialLink = (sortOrder: number): SocialLink => ({
  platform: "instagram",
  label: "",
  href: "",
  sortOrder,
  isActive: true,
});

const invalidateAllContent = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin"] }),
    queryClient.invalidateQueries({ queryKey: ["content"] }),
  ]);
};

const AdminSitePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const [siteContent, servicesContent] = await Promise.all([
        fetchAdminSiteSettingsContent(),
        fetchAdminServicesContent(),
      ]);

      return {
        ...siteContent,
        quoteSection: servicesContent.quoteSection,
        contactSection: servicesContent.contactSection,
      };
    },
  });

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading admin content...</div>;
  }

  if (error) {
    return (
      <AdminQueryState
        title="Unable to load admin content"
        description={error instanceof Error ? error.message : "An unexpected error occurred while loading this editor."}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data) {
    return (
      <AdminQueryState
        title="No admin data available"
        description="The editor did not return any data for this page."
        onRetry={() => void refetch()}
      />
    );
  }

  const saveAndRefresh = async (callback: () => Promise<void>) => {
    await callback();
    await invalidateAllContent(queryClient);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Site</h1>
        <p className="text-sm text-muted-foreground">
          Manage global site settings, contact copy, footer content, and the social links shown on the public site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Primary contact email</CardTitle>
            <CardDescription>The main contact address currently saved for the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{data.siteSettings.contactEmail}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social links</CardTitle>
            <CardDescription>Active and inactive social links currently saved in Supabase.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.socialLinks.length}</p>
          </CardContent>
        </Card>
      </div>

      <SectionFormCard
        title="Site settings"
        description="Global brand, contact, footer, and sharing settings."
        initialValues={data.siteSettings}
        fields={[
          { key: "siteName", label: "Site name", required: true },
          { key: "legalName", label: "Legal name" },
          { key: "tagline", label: "Tagline", type: "textarea", required: true, rows: 3 },
          { key: "contactEmail", label: "Contact email", type: "email", required: true },
          { key: "whatsappUrl", label: "WhatsApp URL", type: "url" },
          { key: "whatsappNumber", label: "WhatsApp number" },
          { key: "whatsappPrefillMessage", label: "WhatsApp prefill message", type: "textarea", rows: 3 },
          { key: "locationLabel", label: "Location label", required: true },
          { key: "footerCopyrightText", label: "Footer copyright text" },
          { key: "footerCreditText", label: "Footer credit text", type: "textarea", rows: 3 },
          { key: "defaultOgImageUrl", label: "Default Open Graph image", type: "url" },
          { key: "themeColor", label: "Theme color", type: "color" },
        ]}
        validate={(values) => {
          if (!values.siteName.trim()) return "Site name is required.";
          if (!values.tagline.trim()) return "Tagline is required.";
          if (!values.contactEmail.trim()) return "Contact email is required.";
          if (!values.locationLabel.trim()) return "Location label is required.";
          return null;
        }}
        onSave={(values) => saveAndRefresh(() => saveSiteSettings(values as SiteSettings))}
      />

      <SectionFormCard
        title="Contact quote section"
        description="The quote block shown at the top of the contact page."
        initialValues={data.quoteSection}
        fields={[
          { key: "eyebrow", label: "Eyebrow", required: true },
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
          { key: "quoteText", label: "Quote text", type: "textarea", required: true, rows: 3 },
        ]}
        validate={(values) => (values.title.trim() ? null : "The contact quote title is required.")}
        onSave={(values) => saveAndRefresh(() => saveServicesSection("contact.quote", values as ContactQuoteSection))}
      />

      <SectionFormCard
        title="Contact section"
        description="The heading and labels used in the main contact information section."
        initialValues={data.contactSection}
        fields={[
          { key: "eyebrow", label: "Eyebrow", required: true },
          { key: "title", label: "Title", required: true },
          { key: "socialHeading", label: "Social heading", required: true },
          { key: "whatsappEyebrow", label: "WhatsApp eyebrow", required: true },
          { key: "whatsappLabel", label: "WhatsApp label", required: true },
          { key: "emailEyebrow", label: "Email eyebrow", required: true },
        ]}
        validate={(values) => (values.title.trim() ? null : "The contact section title is required.")}
        onSave={(values) => saveAndRefresh(() => saveServicesSection("contact.section", values as ContactSection))}
      />

      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Social links</h2>
          <p className="text-sm text-muted-foreground">
            Add, reorder, publish, or remove social links used in the footer and contact page.
          </p>
        </div>

        {data.socialLinks.map((link, index) => (
          <SocialLinkForm
            key={link.id ?? `${link.platform}-${index}`}
            title={link.label || `Social link ${index + 1}`}
            description="Edit platform, label, URL, and active status."
            initialValue={link}
            onSave={(value) => saveAndRefresh(() => saveSocialLink(value))}
            onDelete={link.id ? () => saveAndRefresh(() => deleteSocialLink(link.id as string)) : undefined}
            onMoveUp={
              index > 0
                ? () =>
                    saveAndRefresh(() =>
                      saveSocialLinksOrder(
                        moveItem(data.socialLinks, index, index - 1).map((item, itemIndex) => ({
                          ...item,
                          sortOrder: itemIndex + 1,
                        })),
                      ),
                    )
                : undefined
            }
            onMoveDown={
              index < data.socialLinks.length - 1
                ? () =>
                    saveAndRefresh(() =>
                      saveSocialLinksOrder(
                        moveItem(data.socialLinks, index, index + 1).map((item, itemIndex) => ({
                          ...item,
                          sortOrder: itemIndex + 1,
                        })),
                      ),
                    )
                : undefined
            }
          />
        ))}

        <SocialLinkForm
          title="Add social link"
          description="Create a new footer or contact social link."
          initialValue={emptySocialLink(data.socialLinks.length + 1)}
          onSave={(value) => saveAndRefresh(() => saveSocialLink(value))}
        />
      </div>
    </div>
  );
};

export default AdminSitePage;
