import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { FaqGroup, FaqItem } from "@/types/content";

interface FaqItemFormProps {
  title: string;
  description?: string;
  initialValue: FaqItem;
  groups: FaqGroup[];
  onSave: (value: FaqItem) => Promise<void>;
  onDelete?: () => Promise<void>;
  onMoveUp?: () => Promise<void>;
  onMoveDown?: () => Promise<void>;
}

const FaqItemForm = ({
  title,
  description,
  initialValue,
  groups,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: FaqItemFormProps) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState<FaqItem>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setDraft(initialValue);
  }, [initialValue]);

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialValue), [draft, initialValue]);

  const handleSave = async () => {
    if (!draft.groupId) {
      setErrorMessage("Please choose an FAQ group.");
      return;
    }

    if (!draft.question.trim() || !draft.answer.trim()) {
      setErrorMessage("Both the question and answer are required.");
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(draft);
      toast({ title: "Saved", description: `${title} has been updated.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save this FAQ item.";
      setErrorMessage(message);
      toast({ variant: "destructive", title: "Save failed", description: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!window.confirm("Delete this FAQ item? This cannot be undone.")) return;

    setIsDeleting(true);

    try {
      await onDelete();
      toast({ title: "Deleted", description: `${title} has been removed.` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to delete this FAQ item.";
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
        <div className="space-y-2">
          <Label>FAQ group</Label>
          <Select value={draft.groupId} onValueChange={(value) => setDraft((current) => ({ ...current, groupId: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a group" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Question</Label>
          <Textarea value={draft.question} onChange={(event) => setDraft((current) => ({ ...current, question: event.target.value }))} rows={3} />
        </div>

        <div className="space-y-2">
          <Label>Answer</Label>
          <Textarea value={draft.answer} onChange={(event) => setDraft((current) => ({ ...current, answer: event.target.value }))} rows={5} />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <div>
            <p className="text-sm font-medium">Published</p>
            <p className="text-sm text-muted-foreground">Show this FAQ item on the public services page.</p>
          </div>
          <Switch checked={draft.isPublished ?? true} onCheckedChange={(checked) => setDraft((current) => ({ ...current, isPublished: checked }))} />
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
          {isSaving ? "Saving..." : "Save FAQ item"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FaqItemForm;
