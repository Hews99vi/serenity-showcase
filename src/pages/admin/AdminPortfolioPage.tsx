import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import AdminQueryState from "@/components/admin/AdminQueryState";
import PortfolioItemForm from "@/components/admin/forms/PortfolioItemForm";
import SectionFormCard from "@/components/admin/forms/SectionFormCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  deletePortfolioCategory,
  deletePortfolioItem,
  fetchAdminPortfolioContent,  savePortfolioCategoriesOrder,
  savePortfolioCategory,
  savePortfolioItem,
  savePortfolioItemsOrder,
  savePortfolioSection,
} from "@/services/content/portfolioService";
import type {
  CallToActionSection,
  IconName,
  PortfolioCategoriesIntroSection,
  PortfolioCategory,
  PortfolioHeroSection,
  PortfolioIntroSection,
  PortfolioItem,
} from "@/types/content";

const iconOptions: IconName[] = ["map-pin", "sparkles", "heart", "film", "plane", "calendar", "clock", "palette", "eye"];
const queryKey = ["admin", "page", "portfolio"];

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const emptyCategory = (sortOrder: number): PortfolioCategory => ({
  id: "",
  title: "",
  subtitle: "",
  description: "",
  iconName: "map-pin",
  image: "",
  sortOrder,
  isActive: true,
});

const emptyPortfolioItem = (sortOrder: number): PortfolioItem => ({
  id: `new-film-${sortOrder}`,
  youtubeId: "",
  caption: "",
  coupleName: "",
  categoryId: "",
  featuredOnHome: false,
  sortOrder,
  homeTitle: "",
  homeSubtitle: "",
  isPublished: true,
});

const invalidateAllContent = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin"] }),
    queryClient.invalidateQueries({ queryKey: ["content"] }),
  ]);
};

const isSafePortfolioImageValue = (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return false;
  }

  if (trimmedValue.startsWith("src/assets/") || trimmedValue.startsWith("/src/assets/")) {
    return false;
  }

  return trimmedValue.startsWith("/") || /^https?:\/\//i.test(trimmedValue);
};

interface PortfolioCategoryEditorProps {
  title: string;
  initialValue: PortfolioCategory;
  onSave: (value: PortfolioCategory) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const PortfolioCategoryEditor = ({
  title,
  initialValue,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: PortfolioCategoryEditorProps) => {
  const [draft, setDraft] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setDraft(initialValue);
  }, [initialValue]);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(initialValue);

  const handleSave = async () => {
    if (!draft.id.trim() || !draft.title.trim() || !draft.subtitle.trim() || !draft.description.trim() || !draft.image.trim()) {
      setErrorMessage("Slug, title, subtitle, description, and image path are required.");
      return;
    }

    if (!isSafePortfolioImageValue(draft.image)) {
      setErrorMessage("Use a public path like /category-destination.jpg or an absolute https:// image URL. src/assets paths are not supported.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(draft);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save this category.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !window.confirm("Delete this category? Films in this category may no longer display publicly.")) {
      return;
    }

    await onDelete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Edit the category card shown on the portfolio page.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Category slug</Label>
            <Input value={draft.id} onChange={(event) => setDraft((current) => ({ ...current, id: event.target.value }))} placeholder="destination" />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input value={draft.subtitle} onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select value={draft.iconName} onValueChange={(value: IconName) => setDraft((current) => ({ ...current, iconName: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Image path or URL</Label>
          <Input value={draft.image} onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))} placeholder="/category-destination.jpg or https://example.com/image.jpg" />
          <p className="text-sm text-muted-foreground">Use a public site path like /category-destination.jpg or a full https:// URL. Do not use src/assets paths.</p>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">Active</p>
            <p className="text-sm text-muted-foreground">Show this category on the public portfolio page.</p>
          </div>
          <Switch checked={draft.isActive ?? true} onCheckedChange={(checked) => setDraft((current) => ({ ...current, isActive: checked }))} />
        </div>
        {errorMessage ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">{errorMessage}</div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void onMoveUp?.()} disabled={!onMoveUp}>
            <ArrowUp className="mr-2 h-4 w-4" /> Move up
          </Button>
          <Button variant="outline" size="sm" onClick={() => void onMoveDown?.()} disabled={!onMoveDown}>
            <ArrowDown className="mr-2 h-4 w-4" /> Move down
          </Button>
          {onDelete ? (
            <Button variant="destructive" size="sm" onClick={() => void handleDelete()}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          ) : null}
        </div>
        <Button onClick={() => void handleSave()} disabled={!isDirty || isSaving}>
          {isSaving ? "Saving..." : "Save category"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AdminPortfolioPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchAdminPortfolioContent,
  });

  const newCategory = useMemo(() => emptyCategory((data?.categories.length ?? 0) + 1), [data?.categories.length]);
  const newFilm = useMemo(() => emptyPortfolioItem((data?.videos.length ?? 0) + 1), [data?.videos.length]);

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
        <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-sm text-muted-foreground">
          Manage portfolio page copy, category cards, and the film library used across the public site.
        </p>
      </div>

      <Tabs defaultValue="copy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="copy">Page copy</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="films">Films</TabsTrigger>
        </TabsList>

        <TabsContent value="copy" className="space-y-4">
          <SectionFormCard
            title="Portfolio hero"
            initialValues={data.hero}
            fields={[
              { key: "title", label: "Title", required: true },
              { key: "subtitle", label: "Subtitle", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The portfolio title is required.")}
            onSave={(values) => saveAndRefresh(() => savePortfolioSection("portfolio.hero", values as PortfolioHeroSection))}
          />

          <SectionFormCard
            title="Portfolio intro"
            initialValues={data.intro}
            fields={[
              { key: "titlePrefix", label: "Title prefix", required: true },
              { key: "highlightText", label: "Highlight text", required: true },
              { key: "paragraphs", label: "Paragraphs", type: "string-array", itemLabels: ["Paragraph 1", "Paragraph 2"] },
              { key: "quoteText", label: "Quote text", type: "textarea", required: true, rows: 4 },
              { key: "heroVideoPath", label: "Hero video path", required: true },
            ]}
            validate={(values) => (values.titlePrefix.trim() ? null : "The intro heading is required.")}
            onSave={(values) => saveAndRefresh(() => savePortfolioSection("portfolio.intro", values as PortfolioIntroSection))}
          />

          <SectionFormCard
            title="Categories intro"
            initialValues={data.categoriesIntro}
            fields={[
              { key: "eyebrow", label: "Eyebrow", required: true },
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", required: true, rows: 3 },
              { key: "allLabel", label: "All label", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The categories title is required.")}
            onSave={(values) =>
              saveAndRefresh(() => savePortfolioSection("portfolio.categories_intro", values as PortfolioCategoriesIntroSection))
            }
          />

          <SectionFormCard
            title="Portfolio CTA"
            initialValues={data.cta}
            fields={[
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", type: "textarea", rows: 3 },
              { key: "buttonLabel", label: "Button label", required: true },
              { key: "buttonHref", label: "Button link", required: true },
            ]}
            validate={(values) => (values.title.trim() ? null : "The CTA title is required.")}
            onSave={(values) => saveAndRefresh(() => savePortfolioSection("portfolio.cta", values as CallToActionSection))}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {data.categories.map((category, index) => (
            <PortfolioCategoryEditor
              key={category.dbId ?? category.id}
              title={category.title || `Category ${index + 1}`}
              initialValue={category}
              onSave={(value) => saveAndRefresh(() => savePortfolioCategory(value))}
              onDelete={category.dbId ? () => saveAndRefresh(() => deletePortfolioCategory(category.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        savePortfolioCategoriesOrder(
                          moveItem(data.categories, index, index - 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.categories.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        savePortfolioCategoriesOrder(
                          moveItem(data.categories, index, index + 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <PortfolioCategoryEditor
            title="Add category"
            initialValue={newCategory}
            onSave={(value) => saveAndRefresh(() => savePortfolioCategory(value))}
          />
        </TabsContent>

        <TabsContent value="films" className="space-y-4">
          {!data.categories.length ? (
            <Card>
              <CardHeader>
                <CardTitle>No categories yet</CardTitle>
                <CardDescription>Create at least one saved category before adding portfolio films.</CardDescription>
              </CardHeader>
            </Card>
          ) : null}

          {data.videos.map((video, index) => (
            <PortfolioItemForm
              key={video.dbId ?? video.id}
              title={video.coupleName || video.homeTitle || `Film ${index + 1}`}
              description="Edit film details, publication status, and homepage feature settings."
              initialValue={video}
              categories={data.categories}
              onSave={(value) => saveAndRefresh(() => savePortfolioItem(value, data.categories))}
              onDelete={video.dbId ? () => saveAndRefresh(() => deletePortfolioItem(video.dbId as string)) : undefined}
              onMoveUp={
                index > 0
                  ? () =>
                      saveAndRefresh(() =>
                        savePortfolioItemsOrder(
                          moveItem(data.videos, index, index - 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
              onMoveDown={
                index < data.videos.length - 1
                  ? () =>
                      saveAndRefresh(() =>
                        savePortfolioItemsOrder(
                          moveItem(data.videos, index, index + 1).map((item, itemIndex) => ({
                            ...item,
                            sortOrder: itemIndex + 1,
                          })),
                        ),
                      )
                  : undefined
              }
            />
          ))}

          <PortfolioItemForm
            title="Add film"
            description="Create a new portfolio entry."
            initialValue={newFilm}
            categories={data.categories}
            onSave={(value) => saveAndRefresh(() => savePortfolioItem(value, data.categories))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortfolioPage;

