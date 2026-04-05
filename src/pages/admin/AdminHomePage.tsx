import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminQueryState from "@/components/admin/AdminQueryState";
import SectionFormCard from "@/components/admin/forms/SectionFormCard";
import {
  homeContactCta,
  homeFeaturedIntro,
  homeHero,
  homeIntro,
  homePhilosophy,
  homeQuality,
  homeTestimonialsIntro,
} from "@/content/defaults/home";
import { fetchAdminPortfolioContent, savePortfolioItemsOrder } from "@/services/content/portfolioService";
import { fetchAdminSectionsByKey, upsertSiteSection } from "@/services/content/sectionsService";
import { fetchAdminTestimonialsContent, saveTestimonialsOrder } from "@/services/content/testimonialsService";
import type {
  CallToActionSection,
  FeatureItem,
  HomeHeroSection,
  HomeIntroSection,
  HomePhilosophySection,
  HomeQualitySection,
  HomeTestimonialsIntroSection,
  PortfolioItem,
  SectionIntro,
  Testimonial,
} from "@/types/content";

const homeSectionDefaults = {
  "home.hero": homeHero,
  "home.intro": homeIntro,
  "home.philosophy": homePhilosophy,
  "home.quality": homeQuality,
  "home.featured_intro": homeFeaturedIntro,
  "home.testimonials_intro": homeTestimonialsIntro,
  "home.contact_cta": homeContactCta,
};

const homeSectionDefinitions = {
  "home.hero": { pageSlug: "home", sectionSlug: "hero", label: "Home Hero" },
  "home.intro": { pageSlug: "home", sectionSlug: "intro", label: "Home Intro" },
  "home.philosophy": { pageSlug: "home", sectionSlug: "philosophy", label: "Home Philosophy" },
  "home.quality": { pageSlug: "home", sectionSlug: "quality", label: "Home Quality" },
  "home.featured_intro": { pageSlug: "home", sectionSlug: "featured_intro", label: "Home Featured Intro" },
  "home.testimonials_intro": {
    pageSlug: "home",
    sectionSlug: "testimonials_intro",
    label: "Home Testimonials Intro",
  },
  "home.contact_cta": { pageSlug: "home", sectionSlug: "contact_cta", label: "Home Contact CTA" },
} as const;

const homeQueryKey = ["admin", "page", "home"];

const createFeature = (): FeatureItem => ({
  iconName: "film",
  title: "",
  description: "",
});

const moveItem = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
};

const fetchAdminHomeContent = async () => {
  const [sections, portfolioContent, testimonialsContent] = await Promise.all([
    fetchAdminSectionsByKey(homeSectionDefaults, homeSectionDefinitions),
    fetchAdminPortfolioContent(),
    fetchAdminTestimonialsContent(),
  ]);

  return {
    hero: sections["home.hero"].content as HomeHeroSection,
    intro: sections["home.intro"].content as HomeIntroSection,
    philosophy: sections["home.philosophy"].content as HomePhilosophySection,
    quality: sections["home.quality"].content as HomeQualitySection,
    featuredIntro: sections["home.featured_intro"].content as SectionIntro,
    testimonialsIntro: sections["home.testimonials_intro"].content as HomeTestimonialsIntroSection,
    contactCta: sections["home.contact_cta"].content as CallToActionSection,
    videos: portfolioContent.videos,
    testimonials: testimonialsContent.testimonials,
  };
};

const invalidateAllContent = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin"] }),
    queryClient.invalidateQueries({ queryKey: ["content"] }),
  ]);
};

const AdminHomePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: homeQueryKey,
    queryFn: fetchAdminHomeContent,
  });
  const [featuredFilms, setFeaturedFilms] = useState<PortfolioItem[]>([]);
  const [homeTestimonials, setHomeTestimonials] = useState<Testimonial[]>([]);
  const [isSavingFeatured, setIsSavingFeatured] = useState(false);
  const [isSavingTestimonials, setIsSavingTestimonials] = useState(false);

  useEffect(() => {
    if (data?.videos) {
      setFeaturedFilms(
        [...data.videos].sort((a, b) => (a.homeFeatureOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeFeatureOrder ?? Number.MAX_SAFE_INTEGER)),
      );
    }
  }, [data?.videos]);

  useEffect(() => {
    if (data?.testimonials) {
      setHomeTestimonials(
        [...data.testimonials].sort(
          (a, b) => (a.homeSortOrder ?? Number.MAX_SAFE_INTEGER) - (b.homeSortOrder ?? Number.MAX_SAFE_INTEGER),
        ),
      );
    }
  }, [data?.testimonials]);

  const featuredIds = useMemo(
    () => featuredFilms.filter((film) => film.featuredOnHome).map((film) => film.id),
    [featuredFilms],
  );

  const homeTestimonialIds = useMemo(
    () => homeTestimonials.filter((testimonial) => testimonial.showOnHome).map((testimonial) => testimonial.id),
    [homeTestimonials],
  );

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

  const saveSection = async <T extends Record<string, unknown>>(sectionKey: keyof typeof homeSectionDefinitions, content: T) => {
    const definition = homeSectionDefinitions[sectionKey];
    await upsertSiteSection({
      sectionKey,
      pageSlug: definition.pageSlug,
      sectionSlug: definition.sectionSlug,
      label: definition.label,
      content,
      isEnabled: true,
    });
    await invalidateAllContent(queryClient);
  };

  const persistFeaturedSelections = async () => {
    setIsSavingFeatured(true);
    try {
      const featured = featuredFilms.filter((film) => film.featuredOnHome);
      const featuredOrder = new Map(featured.map((film, index) => [film.id, index + 1]));
      const nextItems = featuredFilms.map((film) => ({
        ...film,
        homeFeatureOrder: film.featuredOnHome ? featuredOrder.get(film.id) : undefined,
      }));
      await savePortfolioItemsOrder(nextItems);
      await invalidateAllContent(queryClient);
    } finally {
      setIsSavingFeatured(false);
    }
  };

  const persistHomeTestimonials = async () => {
    setIsSavingTestimonials(true);
    try {
      const visibleTestimonials = homeTestimonials.filter((testimonial) => testimonial.showOnHome);
      const homeOrder = new Map(visibleTestimonials.map((testimonial, index) => [testimonial.id, index + 1]));
      const nextTestimonials = homeTestimonials.map((testimonial) => ({
        ...testimonial,
        homeSortOrder: testimonial.showOnHome ? homeOrder.get(testimonial.id) : undefined,
      }));
      await saveTestimonialsOrder(nextTestimonials);
      await invalidateAllContent(queryClient);
    } finally {
      setIsSavingTestimonials(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
        <p className="text-sm text-muted-foreground">
          Edit the homepage sections and choose which films and testimonials are featured on the home experience.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Featured films</CardTitle>
            <CardDescription>Homepage selections currently marked from the portfolio collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{featuredIds.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Homepage testimonials</CardTitle>
            <CardDescription>Stories currently marked to appear on the homepage.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{homeTestimonialIds.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Section count</CardTitle>
            <CardDescription>Homepage singletons managed in this editor.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">7</p>
          </CardContent>
        </Card>
      </div>

      <SectionFormCard
        title="Hero"
        description="Top hero message and main call-to-action buttons."
        initialValues={data.hero}
        fields={[
          { key: "tagline", label: "Tagline", type: "textarea", required: true, rows: 3 },
          { key: "primaryCtaLabel", label: "Primary button label", required: true },
          { key: "primaryCtaHref", label: "Primary button link", type: "url", required: true },
          { key: "secondaryCtaLabel", label: "Secondary button label", required: true },
          { key: "secondaryCtaHref", label: "Secondary button link", type: "url", required: true },
          { key: "backgroundVideoPath", label: "Background video path", required: true },
        ]}
        validate={(values) => (values.tagline.trim() ? null : "The hero tagline is required.")}
        onSave={(values) => saveSection("home.hero", values)}
      />

      <SectionFormCard
        title="About section"
        description="Homepage introduction copy and background reel."
        initialValues={data.intro}
        fields={[
          { key: "eyebrow", label: "Eyebrow", required: true },
          { key: "title", label: "Title", required: true },
          { key: "paragraphs", label: "Paragraphs", type: "string-array", itemLabels: ["Paragraph 1", "Paragraph 2"] },
          { key: "signatureText", label: "Signature line", required: true },
          { key: "videoUrl", label: "Video URL", type: "url", required: true },
          { key: "videoTitle", label: "Video title", required: true },
        ]}
        validate={(values) => (values.title.trim() ? null : "The about section title is required.")}
        onSave={(values) => saveSection("home.intro", values)}
      />

      <SectionFormCard
        title="Philosophy section"
        description="The homepage philosophy block and supporting reel."
        initialValues={data.philosophy}
        fields={[
          { key: "eyebrow", label: "Eyebrow", required: true },
          { key: "title", label: "Title", required: true },
          { key: "paragraphs", label: "Paragraphs", type: "string-array", itemLabels: ["Paragraph 1", "Paragraph 2", "Paragraph 3"] },
          { key: "valuesLine", label: "Values line", required: true },
          { key: "videoUrl", label: "Video URL", type: "url", required: true },
          { key: "videoTitle", label: "Video title", required: true },
        ]}
        validate={(values) => (values.title.trim() ? null : "The philosophy title is required.")}
        onSave={(values) => saveSection("home.philosophy", values)}
      />

      <SectionFormCard
        title="Quality section"
        description="4K quality copy, supporting lines, and feature highlights."
        initialValues={data.quality}
        fields={[
          { key: "badge", label: "Badge", required: true },
          { key: "title", label: "Title", required: true },
          { key: "intro", label: "Intro", type: "textarea", required: true, rows: 4 },
          { key: "quoteLines", label: "Quote lines", type: "string-array", itemLabels: ["Line 1", "Line 2"] },
          { key: "videoUrl", label: "Video URL", type: "url", required: true },
          { key: "videoTitle", label: "Video title", required: true },
          { key: "scrollLabel", label: "Scroll label", required: true },
        ]}
        validate={(values) => (values.title.trim() ? null : "The quality title is required.")}
        onSave={(values) => saveSection("home.quality", values)}
      >
        {({ values, setValues }) => (
          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">Feature highlights</p>
                <p className="text-sm text-muted-foreground">Edit the three value cards shown in the quality section.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    features: [...current.features, createFeature()],
                  }))
                }
              >
                Add feature
              </Button>
            </div>
            <div className="space-y-4">
              {values.features.map((feature, index) => (
                <div key={`${feature.title}-${index}`} className="grid gap-3 rounded-lg border p-3 md:grid-cols-3">
                  <input className="hidden" readOnly value={feature.iconName} />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Icon name</label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={feature.iconName}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          features: current.features.map((currentFeature, featureIndex) =>
                            featureIndex === index
                              ? { ...currentFeature, iconName: event.target.value as FeatureItem["iconName"] }
                              : currentFeature,
                          ),
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={feature.title}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          features: current.features.map((currentFeature, featureIndex) =>
                            featureIndex === index ? { ...currentFeature, title: event.target.value } : currentFeature,
                          ),
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={feature.description}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          features: current.features.map((currentFeature, featureIndex) =>
                            featureIndex === index
                              ? { ...currentFeature, description: event.target.value }
                              : currentFeature,
                          ),
                        }))
                      }
                    />
                  </div>
                  <div className="md:col-span-3 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setValues((current) => ({
                          ...current,
                          features: current.features.filter((_, featureIndex) => featureIndex !== index),
                        }))
                      }
                    >
                      Remove feature
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionFormCard>

      <SectionFormCard
        title="Featured films intro"
        description="The copy above the homepage featured film layout."
        initialValues={data.featuredIntro}
        fields={[
          { key: "eyebrow", label: "Eyebrow", required: true },
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
        ]}
        validate={(values) => (values.title.trim() ? null : "The featured films title is required.")}
        onSave={(values) => saveSection("home.featured_intro", values)}
      />

      <SectionFormCard
        title="Testimonials intro"
        description="The heading and button above the homepage testimonial highlights."
        initialValues={data.testimonialsIntro}
        fields={[
          { key: "titleLine1", label: "Title line 1", required: true },
          { key: "titleLine2", label: "Title line 2", required: true },
          { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
          { key: "buttonLabel", label: "Button label", required: true },
          { key: "buttonHref", label: "Button link", required: true },
        ]}
        validate={(values) => (values.description.trim() ? null : "The testimonials description is required.")}
        onSave={(values) => saveSection("home.testimonials_intro", values)}
      />

      <SectionFormCard
        title="Contact CTA"
        description="The final homepage call-to-action block."
        initialValues={data.contactCta}
        fields={[
          { key: "eyebrow", label: "Eyebrow" },
          { key: "title", label: "Title", required: true },
          { key: "description", label: "Description", type: "textarea", required: true, rows: 4 },
          { key: "buttonLabel", label: "Button label", required: true },
          { key: "buttonHref", label: "Button link", required: true },
        ]}
        validate={(values) => (values.title.trim() ? null : "The CTA title is required.")}
        onSave={(values) => saveSection("home.contact_cta", values)}
      />

      <Card>
        <CardHeader>
          <CardTitle>Homepage featured films</CardTitle>
          <CardDescription>
            Choose which saved portfolio films appear on the homepage and set their order with move up and move down.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {featuredFilms.length ? (
            featuredFilms.map((film, index) => (
              <div key={film.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{film.homeTitle ?? film.coupleName}</p>
                  <p className="text-sm text-muted-foreground">{film.coupleName}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={film.featuredOnHome ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setFeaturedFilms((current) =>
                        current.map((currentFilm) =>
                          currentFilm.id === film.id ? { ...currentFilm, featuredOnHome: !currentFilm.featuredOnHome } : currentFilm,
                        ),
                      )
                    }
                  >
                    {film.featuredOnHome ? "Featured" : "Not featured"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!film.featuredOnHome || index === 0}
                    onClick={() => setFeaturedFilms((current) => moveItem(current, index, Math.max(index - 1, 0)))}
                  >
                    Move up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!film.featuredOnHome || index === featuredFilms.length - 1}
                    onClick={() => setFeaturedFilms((current) => moveItem(current, index, Math.min(index + 1, current.length - 1)))}
                  >
                    Move down
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No live portfolio films exist in Supabase yet. The public site is still using local fallback films until you save records.
            </p>
          )}
        </CardContent>
        <div className="px-6 pb-6 text-right">
          <Button onClick={() => void persistFeaturedSelections()} disabled={isSavingFeatured || !featuredFilms.length}>
            {isSavingFeatured ? "Saving..." : "Save featured films"}
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Homepage testimonials</CardTitle>
          <CardDescription>
            Choose which testimonial videos appear on the homepage and set their display order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {homeTestimonials.length ? (
            homeTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{testimonial.coupleName}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.shortQuote}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={testimonial.showOnHome ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setHomeTestimonials((current) =>
                        current.map((currentTestimonial) =>
                          currentTestimonial.id === testimonial.id
                            ? { ...currentTestimonial, showOnHome: !currentTestimonial.showOnHome }
                            : currentTestimonial,
                        ),
                      )
                    }
                  >
                    {testimonial.showOnHome ? "Shown on home" : "Hidden from home"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!testimonial.showOnHome || index === 0}
                    onClick={() => setHomeTestimonials((current) => moveItem(current, index, Math.max(index - 1, 0)))}
                  >
                    Move up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!testimonial.showOnHome || index === homeTestimonials.length - 1}
                    onClick={() => setHomeTestimonials((current) => moveItem(current, index, Math.min(index + 1, current.length - 1)))}
                  >
                    Move down
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No live testimonials exist in Supabase yet. The public site is still using local fallback testimonials until you save records.
            </p>
          )}
        </CardContent>
        <div className="px-6 pb-6 text-right">
          <Button onClick={() => void persistHomeTestimonials()} disabled={isSavingTestimonials || !homeTestimonials.length}>
            {isSavingTestimonials ? "Saving..." : "Save homepage testimonials"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminHomePage;
