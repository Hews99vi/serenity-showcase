import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { FaqGroup, IconName } from "@/types/content";

const iconOptions: IconName[] = ["film", "calendar", "clock", "palette", "sparkles", "heart", "eye", "map-pin", "plane"];

interface FaqGroupFormProps {
  title: string;
  description?: string;
  initialValue: FaqGroup;
  onSave: (value: FaqGroup) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const FaqGroupForm = ({
  title,
  description,
  initialValue,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: FaqGroupFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<FaqGroup>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDraft(initialValue);
  }, [initialValue]);

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialValue), [draft, initialValue]);

  const handleSave = async () => {
    if (!draft.id.trim() || !draft.label.trim()) {
      setErrorMessage("Both the group ID and label are required.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(draft);
      toast({ title: "Saved", description: `${title} has been updated.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save this FAQ group.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Save failed", description: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("Delete this FAQ group? Any related FAQ items will also be removed.")) return;

    setIsDeleting(true);

    try {
      await onDelete();
      toast({ title: "Deleted", description: `${title} has been removed.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete this FAQ group.";
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
            <Label>Group ID / slug</Label>
            <Input value={draft.id} onChange={(event) => setDraft((current) => ({ ...current, id: event.target.value }))} placeholder="booking" />
          </div>
          <div className="space-y-2">
            <Label>Label</Label>
            <Input value={draft.label} onChange={(event) => setDraft((current) => ({ ...current, label: event.target.value }))} placeholder="Booking & Coverage" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-sm text-muted-foreground">Show this FAQ group in the public FAQ navigation.</p>
            </div>
            <Switch checked={draft.isActive ?? true} onCheckedChange={(checked) => setDraft((current) => ({ ...current, isActive: checked }))} />
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
          {isSaving ? "Saving..." : "Save group"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FaqGroupForm;
