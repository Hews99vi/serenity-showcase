import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { PageSeo } from "@/types/content";

interface PageMetaFormProps {
  title: string;
  description?: string;
  initialValue: PageSeo;
  onSave: (value: PageSeo) => Promise<void>;
}

const PageMetaForm = ({ title, description, initialValue, onSave }: PageMetaFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<PageSeo>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setDraft(initialValue);
  }, [initialValue]);

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialValue), [draft, initialValue]);

  const handleSave = async () => {
    if (!draft.title.trim() || !draft.description.trim()) {
      setErrorMessage("Title and description are required.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(draft);
      toast({ title: "Saved", description: `${title} metadata has been updated.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save page metadata.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Save failed", description: message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Page title</Label>
          <Input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
        </div>

        <div className="space-y-2">
          <Label>Meta description</Label>
          <Textarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} rows={4} />
        </div>

        <div className="space-y-2">
          <Label>Keywords</Label>
          <Textarea value={draft.keywords ?? ""} onChange={(event) => setDraft((current) => ({ ...current, keywords: event.target.value }))} rows={3} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Open Graph title</Label>
            <Input value={draft.ogTitle ?? ""} onChange={(event) => setDraft((current) => ({ ...current, ogTitle: event.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>Open Graph image</Label>
            <Input value={draft.ogImage ?? ""} onChange={(event) => setDraft((current) => ({ ...current, ogImage: event.target.value }))} type="url" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Open Graph description</Label>
          <Textarea value={draft.ogDescription ?? ""} onChange={(event) => setDraft((current) => ({ ...current, ogDescription: event.target.value }))} rows={3} />
        </div>

        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input value={draft.canonical ?? ""} onChange={(event) => setDraft((current) => ({ ...current, canonical: event.target.value, ogUrl: event.target.value }))} type="url" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">No index</p>
            <p className="text-sm text-muted-foreground">Prevent this route from being indexed by search engines.</p>
          </div>
          <Switch checked={draft.noindex ?? false} onCheckedChange={(checked) => setDraft((current) => ({ ...current, noindex: checked }))} />
        </div>

        {errorMessage ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => void handleSave()} disabled={isSaving || !isDirty}>
          {isSaving ? "Saving..." : "Save metadata"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PageMetaForm;
