import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getYoutubeThumbnailUrl, parseYoutubeId } from "@/lib/youtube";
import type { Testimonial } from "@/types/content";

interface TestimonialFormProps {
  title: string;
  description?: string;
  initialValue: Testimonial;
  onSave: (value: Testimonial) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const TestimonialForm = ({
  title,
  description,
  initialValue,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: TestimonialFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<Testimonial>(initialValue);
  const [youtubeInput, setYoutubeInput] = useState(initialValue.youtubeId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    if (!draft.coupleName.trim()) {
      setErrorMessage("Couple names are required.");
      return;
    }

    if (!draft.shortQuote.trim() || !draft.fullQuote.trim()) {
      setErrorMessage("Both the short quote and full testimonial are required.");
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
      const message = error instanceof Error ? error.message : "Unable to save this testimonial.";
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

    if (!window.confirm("Delete this testimonial? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete();
      toast({ title: "Deleted", description: `${title} has been removed.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete this testimonial.";
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
            <Label>Event type</Label>
            <Input
              value={draft.eventType}
              onChange={(event) => setDraft((current) => ({ ...current, eventType: event.target.value }))}
              placeholder="Wedding"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Event year</Label>
            <Input
              value={draft.eventYear}
              onChange={(event) => setDraft((current) => ({ ...current, eventYear: event.target.value }))}
              placeholder="2026"
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={draft.location}
              onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
              placeholder="Sri Lanka"
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
          <Label>Short quote</Label>
          <Textarea
            value={draft.shortQuote}
            onChange={(event) => setDraft((current) => ({ ...current, shortQuote: event.target.value }))}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Full testimonial</Label>
          <Textarea
            value={draft.fullQuote}
            onChange={(event) => setDraft((current) => ({ ...current, fullQuote: event.target.value }))}
            rows={5}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Show on homepage</p>
              <p className="text-sm text-muted-foreground">Display this story on the homepage highlights.</p>
            </div>
            <Switch
              checked={draft.showOnHome}
              onCheckedChange={(checked) =>
                setDraft((current) => ({
                  ...current,
                  showOnHome: checked,
                  homeSortOrder: checked ? current.homeSortOrder : undefined,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Published</p>
              <p className="text-sm text-muted-foreground">Make this testimonial visible on the public site.</p>
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
          {isSaving ? "Saving..." : "Save testimonial"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestimonialForm;
