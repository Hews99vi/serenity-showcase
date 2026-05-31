import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getYoutubeThumbnailUrl, parseYoutubeId } from "@/lib/youtube";
import type { PortfolioCategory, PortfolioItem } from "@/types/content";

interface PortfolioItemFormProps {
  title: string;
  description?: string;
  initialValue: PortfolioItem;
  categories: PortfolioCategory[];
  onSave: (value: PortfolioItem) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const PortfolioItemForm = ({
  title,
  description,
  initialValue,
  categories,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: PortfolioItemFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<PortfolioItem>(initialValue);
  const [youtubeInput, setYoutubeInput] = useState(initialValue.youtubeId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Keep track of the baseline to know if the user has made changes
  const [baselineValue, setBaselineValue] = useState(initialValue);
  const normalizedYoutubeInput = parseYoutubeId(youtubeInput) ?? youtubeInput;
  const normalizedBaselineYoutube = parseYoutubeId(baselineValue.youtubeId) ?? baselineValue.youtubeId;
  const userMadeChanges = JSON.stringify({ ...draft, youtubeId: normalizedYoutubeInput }) !== JSON.stringify({ ...baselineValue, youtubeId: normalizedBaselineYoutube });

  useEffect(() => {
    if (!userMadeChanges) {
      setDraft(initialValue);
      setYoutubeInput(initialValue.youtubeId);
      setBaselineValue(initialValue);
    }
  }, [initialValue, userMadeChanges]);

  const normalizedYoutubeId = useMemo(() => parseYoutubeId(youtubeInput), [youtubeInput]);
  const thumbnailUrl = useMemo(() => getYoutubeThumbnailUrl(youtubeInput), [youtubeInput]);
  const isDirty = useMemo(
    () => JSON.stringify({ ...draft, youtubeId: normalizedYoutubeId ?? youtubeInput }) !== JSON.stringify(initialValue),
    [draft, initialValue, normalizedYoutubeId, youtubeInput],
  );

  const handleSave = async () => {
    if (!draft.categoryId) {
      setErrorMessage("Please choose a category.");
      return;
    }

    if (!draft.coupleName.trim() && !draft.homeTitle?.trim()) {
      setErrorMessage("Add at least a couple name or a home display title.");
      return;
    }

    if (!normalizedYoutubeId) {
      setErrorMessage("Please enter a valid YouTube URL or ID.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave({
        ...draft,
        youtubeId: normalizedYoutubeId,
      });
      setBaselineValue({ ...draft, youtubeId: normalizedYoutubeId });
      toast({ title: "Saved", description: `${title} has been updated.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save this film.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Save failed", description: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    if (!window.confirm("Delete this film? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete();
      toast({ title: "Deleted", description: `${title} has been removed.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete this film.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Delete failed", description: message });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Couple names</Label>
            <Input
              value={draft.coupleName}
              onChange={(event) => setDraft((current) => ({ ...current, coupleName: event.target.value }))}
              placeholder="Bride & Groom"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={draft.categoryId}
              onValueChange={(value) => setDraft((current) => ({ ...current, categoryId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Home display title</Label>
            <Input
              value={draft.homeTitle ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, homeTitle: event.target.value }))}
              placeholder="Optional homepage title"
            />
          </div>
          <div className="space-y-2">
            <Label>Home display subtitle</Label>
            <Input
              value={draft.homeSubtitle ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, homeSubtitle: event.target.value }))}
              placeholder="Optional homepage subtitle"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>YouTube URL or ID</Label>
          <Input
            value={youtubeInput}
            onChange={(event) => setYoutubeInput(event.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
          {normalizedYoutubeId ? (
            <p className="text-sm text-muted-foreground">Stored video ID: {normalizedYoutubeId}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Paste a full YouTube link or a raw video ID.</p>
          )}
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="YouTube thumbnail preview" className="mt-2 aspect-video w-full rounded-md border object-cover" />
          ) : null}
        </div>

        <div className="space-y-2">
          <Label>Caption</Label>
          <Textarea
            value={draft.caption}
            onChange={(event) => setDraft((current) => ({ ...current, caption: event.target.value }))}
            placeholder="Describe the story or moment"
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Featured on homepage</p>
              <p className="text-sm text-muted-foreground">Include this film in the home featured section.</p>
            </div>
            <Switch
              checked={draft.featuredOnHome}
              onCheckedChange={(checked) =>
                setDraft((current) => ({
                  ...current,
                  featuredOnHome: checked,
                  homeFeatureOrder: checked ? current.homeFeatureOrder : undefined,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Published</p>
              <p className="text-sm text-muted-foreground">Make this film visible on the public site.</p>
            </div>
            <Switch
              checked={draft.isPublished ?? true}
              onCheckedChange={(checked) => setDraft((current) => ({ ...current, isPublished: checked }))}
            />
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => void onMoveUp?.()} disabled={!onMoveUp}>
            <ArrowUp className="mr-2 h-4 w-4" />
            Move up
          </Button>
          <Button variant="outline" size="sm" onClick={() => void onMoveDown?.()} disabled={!onMoveDown}>
            <ArrowDown className="mr-2 h-4 w-4" />
            Move down
          </Button>
          {onDelete ? (
            <Button variant="destructive" size="sm" onClick={() => void handleDelete()} disabled={isDeleting}>
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          ) : null}
        </div>
        <Button onClick={() => void handleSave()} disabled={isSaving || !isDirty}>
          {isSaving ? "Saving..." : "Save film"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioItemForm;
