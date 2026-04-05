import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminQueryState from "@/components/admin/AdminQueryState";
import PageMetaForm from "@/components/admin/forms/PageMetaForm";
import { fetchAdminPageMeta, savePageMeta, type PageSlug } from "@/services/content/seoService";

const queryKey = ["admin", "page", "seo"];

const AdminSeoPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchAdminPageMeta,
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

  const handleSave = async (pageSlug: PageSlug, value: (typeof data)[PageSlug]) => {
    await savePageMeta(pageSlug, value);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin"] }),
      queryClient.invalidateQueries({ queryKey: ["content"] }),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">SEO</h1>
        <p className="text-sm text-muted-foreground">
          Edit route-level metadata while keeping the static HTML fallback in place for the public site.
        </p>
      </div>

      <div className="space-y-4">
        {(Object.entries(data) as Array<[PageSlug, (typeof data)[PageSlug]]>).map(([pageSlug, meta]) => (
          <PageMetaForm
            key={pageSlug}
            title={pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1)}
            description={`Metadata used for the ${pageSlug} route.`}
            initialValue={meta}
            onSave={(value) => handleSave(pageSlug, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSeoPage;
