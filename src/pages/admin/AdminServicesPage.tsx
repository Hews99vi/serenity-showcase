import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQueryState from "@/components/admin/AdminQueryState";
import FaqGroupForm from "@/components/admin/forms/FaqGroupForm";
import FaqItemForm from "@/components/admin/forms/FaqItemForm";
import SectionFormCard from "@/components/admin/forms/SectionFormCard";
import ServiceItemForm from "@/components/admin/forms/ServiceItemForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deleteFaqGroup,
  deleteFaqItem,
  deleteServiceItem,
  fetchAdminServicesContent,
  saveFaqGroup,
  saveFaqGroupsOrder,
  saveFaqItem,
  saveFaqItemsOrder,
  saveServiceItem,
  saveServiceItemsOrder,
  saveServicesSection,
} from "@/services/content/servicesService";
import type {
  FaqCallToActionSection,
  FaqGroup,
  FaqIntroSection,
  FaqItem,
  ServiceItem,
  ServicesHeroSection,
} from "@/types/content";

const queryKey = ["admin", "page", "services"];

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const emptyServiceItem = (sortOrder: number): ServiceItem => ({
  id: `new-service-${sortOrder}`,
  title: "",
  description: "",
  iconName: "film",
  sortOrder,
  isPublished: true,
});

const emptyFaqGroup = (sortOrder: number): FaqGroup => ({
  id: "",
  label: "",
  iconName: "film",
  sortOrder,
  isActive: true,
});

const emptyFaqItem = (sortOrder: number): FaqItem => ({
  id: `new-faq-${sortOrder}`,
  groupId: "",
  question: "",
  answer: "",
  sortOrder,
  isPublished: true,
});

const invalidateAllContent = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin"] }),
    queryClient.invalidateQueries({ queryKey: ["content"] }),
  ]);
};

const AdminServicesPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchAdminServicesContent,
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
        <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage the services page copy, service cards, FAQ navigation groups, and individual FAQ answers.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Service items</CardTitle>
            <CardDescription>Saved service cards currently available.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.services.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ groups</CardTitle>
            <CardDescription>Groups available in the FAQ navigation.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.faqGroups.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ items</CardTitle>
            <CardDescription>Individual question and answer pairs currently saved.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.faqItems.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="copy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="copy">Page copy</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="faq-groups">FAQ groups</TabsTrigger>
          <TabsTrigger value="faq-items">FAQ items</TabsTrigger>
        </TabsList>

        <TabsContent value="copy" className="space-y-4">
          <SectionFormCard
            title="Services hero"
            initialValues={data.hero}
            fields={[
              { key: "eyebrow", label: "Eyebrow", required: true },
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
              { key: "faqPromptEyebrow", label: "FAQ prompt eyebrow", required: true },
              { key: "faqPromptText", label: "FAQ prompt text", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The services hero title is required.")}
            onSave={(values) => saveAndRefresh(() => saveServicesSection("services.hero", values as ServicesHeroSection))}
          />

          <SectionFormCard
            title="FAQ intro"
            initialValues={data.faqIntro}
            fields={[
              { key: "eyebrow", label: "Eyebrow", required: true },
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
            ]}
            validate={(values) => (values.title.trim() ? null : "The FAQ intro title is required.")}
            onSave={(values) => saveAndRefresh(() => saveServicesSection("services.faq_intro", values as FaqIntroSection))}
          />

          <SectionFormCard
            title="FAQ CTA"
            initialValues={data.faqCta}
            fields={[
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 3 },
              { key: "primaryButtonLabel", label: "Primary button label", required: true },
              { key: "primaryButtonHref", label: "Primary button link", required: true },
              { key: "secondaryButtonLabel", label: "Secondary button label", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The FAQ CTA title is required.")}
            onSave={(values) => saveAndRefresh(() => saveServicesSection("services.faq_cta", values as FaqCallToActionSection))}
          />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          {data.services.map((service, index) => (
            <ServiceItemForm
              key={service.dbId ?? service.id}
              title={service.title || `Service ${index + 1}`}
              description="Edit title, description, icon, and publish status."
              initialValue={service}
              onSave={(value) => saveAndRefresh(() => saveServiceItem(value))}
              onDelete={service.dbId ? () => saveAndRefresh(() => deleteServiceItem(service.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        saveServiceItemsOrder(
                          moveItem(data.services, index, index - 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.services.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        saveServiceItemsOrder(
                          moveItem(data.services, index, index + 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <ServiceItemForm
            title="Add service"
            description="Create a new service card."
            initialValue={emptyServiceItem(data.services.length + 1)}
            onSave={(value) => saveAndRefresh(() => saveServiceItem(value))}
          />
        </TabsContent>

        <TabsContent value="faq-groups" className="space-y-4">
          {data.faqGroups.map((group, index) => (
            <FaqGroupForm
              key={group.dbId ?? group.id}
              title={group.label || `FAQ group ${index + 1}`}
              description="Edit the FAQ navigation group used on the services page."
              initialValue={group}
              onSave={(value) => saveAndRefresh(() => saveFaqGroup(value))}
              onDelete={group.dbId ? () => saveAndRefresh(() => deleteFaqGroup(group.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        saveFaqGroupsOrder(
                          moveItem(data.faqGroups, index, index - 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.faqGroups.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        saveFaqGroupsOrder(
                          moveItem(data.faqGroups, index, index + 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <FaqGroupForm
            title="Add FAQ group"
            description="Create a new FAQ group for the services page."
            initialValue={emptyFaqGroup(data.faqGroups.length + 1)}
            onSave={(value) => saveAndRefresh(() => saveFaqGroup(value))}
          />
        </TabsContent>

        <TabsContent value="faq-items" className="space-y-4">
          {!data.faqGroups.length ? (
            <Card>
              <CardHeader>
                <CardTitle>No FAQ groups yet</CardTitle>
                <CardDescription>Create at least one FAQ group before adding FAQ items.</CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          {data.faqItems.map((item, index) => (
            <FaqItemForm
              key={item.dbId ?? item.id}
              title={item.question || `FAQ item ${index + 1}`}
              description="Edit the question, answer, and group assignment."
              initialValue={item}
              groups={data.faqGroups}
              onSave={(value) => saveAndRefresh(() => saveFaqItem(value, data.faqGroups))}
              onDelete={item.dbId ? () => saveAndRefresh(() => deleteFaqItem(item.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        saveFaqItemsOrder(
                          moveItem(data.faqItems, index, index - 1).map((faqItem, itemIndex) => ({
                            ...faqItem,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.faqItems.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        saveFaqItemsOrder(
                          moveItem(data.faqItems, index, index + 1).map((faqItem, itemIndex) => ({
                            ...faqItem,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <FaqItemForm
            title="Add FAQ item"
            description="Create a new question and answer."
            initialValue={emptyFaqItem(data.faqItems.length + 1)}
            groups={data.faqGroups}
            onSave={(value) => saveAndRefresh(() => saveFaqItem(value, data.faqGroups))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminServicesPage;
