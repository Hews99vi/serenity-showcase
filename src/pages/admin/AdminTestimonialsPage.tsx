import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQueryState from "@/components/admin/AdminQueryState";
import SectionFormCard from "@/components/admin/forms/SectionFormCard";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  deleteTestimonial,
  fetchAdminTestimonialsContent,
  saveTestimonial,
  saveTestimonialsOrder,
  saveTestimonialsSection,
} from "@/services/content/testimonialsService";
import type { CallToActionSection, QuoteHighlightSection, Testimonial, TestimonialsPageHeroSection } from "@/types/content";

const queryKey = ["admin", "page", "testimonials"];

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const emptyTestimonial = (sortOrder: number): Testimonial => ({
  id: `new-testimonial-${sortOrder}`,
  coupleName: "",
  shortQuote: "",
  fullQuote: "",
  eventType: "Wedding",
  eventYear: "",
  location: "",
  youtubeId: "",
  showOnHome: false,
  pageSortOrder: sortOrder,
  isPublished: true,
});

const invalidateAllContent = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin"] }),
    queryClient.invalidateQueries({ queryKey: ["content"] }),
  ]);
};

const AdminTestimonialsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchAdminTestimonialsContent,
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

  const newTestimonial = emptyTestimonial(data.testimonials.length + 1);

  const saveAndRefresh = async (callback: () => Promise<void>) => {
    try {
      await callback();
      await invalidateAllContent(queryClient);
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Action failed", 
        description: error instanceof Error ? error.message : "An unexpected error occurred." 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Testimonials</h1>
        <p className="text-sm text-muted-foreground">
          Edit the testimonials page copy and manage the testimonial videos shown across the site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total testimonials</CardTitle>
            <CardDescription>All testimonial records currently saved in Supabase.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.testimonials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Homepage-visible testimonials</CardTitle>
            <CardDescription>Testimonials currently marked to appear on the homepage.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.testimonials.filter((item) => item.showOnHome).length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="copy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="copy">Page copy</TabsTrigger>
          <TabsTrigger value="items">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="copy" className="space-y-4">
          <SectionFormCard
            title="Testimonials hero"
            initialValues={data.hero}
            fields={[
              { key: "eyebrow", label: "Eyebrow", required: true },
              { key: "titleLine1", label: "Title line 1", required: true },
              { key: "titleLine2", label: "Title line 2", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
              { key: "moreStoriesLabel", label: "More stories label", required: true },
              { key: "readMoreLabel", label: "Read more label", required: true },
            ]}
            validate={(values) => (values.description.trim() ? null : "The hero description is required.")}
            onSave={(values) => saveAndRefresh(() => saveTestimonialsSection("testimonials.hero", values as TestimonialsPageHeroSection))}
          />

          <SectionFormCard
            title="Quote highlight"
            initialValues={data.quote}
            fields={[
              { key: "quoteText", label: "Quote text", type: "textarea", required: true, rows: 4 },
              { key: "attribution", label: "Attribution", required: true },
            ]}
            validate={(values) => (values.quoteText.trim() ? null : "The quote highlight is required.")}
            onSave={(values) => saveAndRefresh(() => saveTestimonialsSection("testimonials.quote", values as QuoteHighlightSection))}
          />

          <SectionFormCard
            title="Testimonials CTA"
            initialValues={data.cta}
            fields={[
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
              { key: "buttonLabel", label: "Button label", required: true },
              { key: "buttonHref", label: "Button link", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The CTA title is required.")}
            onSave={(values) => saveAndRefresh(() => saveTestimonialsSection("testimonials.cta", values as CallToActionSection))}
          />
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          {data.testimonials.map((testimonial, index) => (
            <TestimonialForm
              key={testimonial.dbId ?? testimonial.id}
              title={testimonial.coupleName || `Testimonial ${index + 1}`}
              description="Edit the testimonial copy, YouTube reel, and visibility settings."
              initialValue={testimonial}
              onSave={(value) => saveAndRefresh(() => saveTestimonial(value))}
              onDelete={testimonial.dbId ? () => saveAndRefresh(() => deleteTestimonial(testimonial.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        saveTestimonialsOrder(
                          moveItem(data.testimonials, index, index - 1).map((item, itemIndex) => ({
                            ...item,
                            pageSortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.testimonials.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        saveTestimonialsOrder(
                          moveItem(data.testimonials, index, index + 1).map((item, itemIndex) => ({
                            ...item,
                            pageSortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <TestimonialForm
            title="Add testimonial"
            description="Create a new testimonial story."
            initialValue={newTestimonial}
            onSave={(value) => saveAndRefresh(() => saveTestimonial(value))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTestimonialsPage;
