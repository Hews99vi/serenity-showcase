import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { SocialLink, SocialPlatform } from "@/types/content";

const platformOptions: SocialPlatform[] = ["whatsapp", "instagram", "facebook", "youtube", "tiktok"];

interface SocialLinkFormProps {
  title: string;
  description?: string;
  initialValue: SocialLink;
  onSave: (value: SocialLink) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const SocialLinkForm = ({
  title,
  description,
  initialValue,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: SocialLinkFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<SocialLink>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDraft(initialValue);
  }, [initialValue]);

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialValue), [draft, initialValue]);

  const handleSave = async () => {
    if (!draft.label.trim() || !draft.href.trim()) {
      setErrorMessage("Label and URL are required.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(draft);
      toast({ title: "Saved", description: `${title} has been updated.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save this social link.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Save failed", description: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("Delete this social link? This cannot be undone.")) return;

    setIsDeleting(true);

    try {
      await onDelete();
      toast({ title: "Deleted", description: `${title} has been removed.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete this social link.";
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
            <Label>Platform</Label>
            <Select value={draft.platform} onValueChange={(value: SocialPlatform) => setDraft((current) => ({ ...current, platform: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Label</Label>
            <Input value={draft.label} onChange={(event) => setDraft((current) => ({ ...current, label: event.target.value }))} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>URL</Label>
          <Input value={draft.href} onChange={(event) => setDraft((current) => ({ ...current, href: event.target.value }))} type="url" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">Active</p>
            <p className="text-sm text-muted-foreground">Show this social link in the public footer and contact area.</p>
          </div>
          <Switch checked={draft.isActive ?? true} onCheckedChange={(checked) => setDraft((current) => ({ ...current, isActive: checked }))} />
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
          {isSaving ? "Saving..." : "Save link"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SocialLinkForm;
