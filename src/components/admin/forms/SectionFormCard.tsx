import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export type SectionFieldType = "text" | "textarea" | "email" | "url" | "color" | "switch" | "string-array";

export interface SectionFieldConfig<T extends Record<string, unknown>> {
  key: Extract<keyof T, string>;
  label: string;
  type?: SectionFieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  itemLabels?: string[];
  rows?: number;
}

interface SectionFormCardProps<T extends Record<string, unknown>> {
  title: string;
  description?: string;
  initialValues: T;
  fields: SectionFieldConfig<T>[];
  onSave: (values: T) => Promise<void>;
  validate?: (values: T) => string | null;
  saveLabel?: string;
  children?: (args: { values: T; setValues: React.Dispatch<React.SetStateAction<T>> }) => ReactNode;
}

const SectionFormCard = <T extends Record<string, unknown>>({
  title,
  description,
  initialValues,
  fields,
  onSave,
  validate,
  saveLabel = "Save changes",
  children,
}: SectionFormCardProps<T>) => {
  const { toast } = useToast();
  const [values, setValues] = useState<T>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    if (!hasUserInteracted.current) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [initialValues, values]);

  const setFieldValue = (fieldKey: Extract<keyof T, string>, nextValue: unknown) => {
    hasUserInteracted.current = true;
    setValues((currentValues) => ({
      ...currentValues,
      [fieldKey]: nextValue,
    }));
  };

  const handleSave = async () => {
    const validationError = validate?.(values) ?? null;
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage(null);
    setIsSaving(true);

    try {
      await onSave(values);
      hasUserInteracted.current = false;
      toast({
        title: "Saved",
        description: `${title} has been updated.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save right now.";
      setErrorMessage(message);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field: SectionFieldConfig<T>) => {
    const value = values[field.key];

    if (field.type === "switch") {
      return (
        <div key={field.key} className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{field.label}</p>
            {field.description ? <p className="text-sm text-muted-foreground">{field.description}</p> : null}
          </div>
          <Switch checked={Boolean(value)} onCheckedChange={(checked) => setFieldValue(field.key, checked)} />
        </div>
      );
    }

    if (field.type === "string-array") {
      const arrayValue = Array.isArray(value) ? (value as string[]) : [];
      const itemCount = Math.max(arrayValue.length, field.itemLabels?.length ?? 0, 1);

      return (
        <div key={field.key} className="space-y-3 rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{field.label}</p>
            {field.description ? <p className="text-sm text-muted-foreground">{field.description}</p> : null}
          </div>
          <div className="space-y-3">
            {Array.from({ length: itemCount }).map((_, index) => (
              <div key={`${field.key}-${index}`} className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {field.itemLabels?.[index] ?? `Item ${index + 1}`}
                </label>
                <Textarea
                  value={arrayValue[index] ?? ""}
                  rows={field.rows ?? 3}
                  placeholder={field.placeholder}
                  onChange={(event) => {
                    const nextArray = [...arrayValue];
                    nextArray[index] = event.target.value;
                    setFieldValue(field.key, nextArray);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    const commonProps = {
      value: typeof value === "string" ? value : value === undefined || value === null ? "" : String(value),
      placeholder: field.placeholder,
      onChange: (
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
      ) => setFieldValue(field.key, event.target.value),
    };

    return (
      <div key={field.key} className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          {field.label}
          {field.required ? <span className="ml-1 text-destructive">*</span> : null}
        </label>
        {field.description ? <p className="text-sm text-muted-foreground">{field.description}</p> : null}
        {field.type === "textarea" ? (
          <Textarea {...commonProps} rows={field.rows ?? 4} />
        ) : (
          <Input {...commonProps} type={field.type ?? "text"} />
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map(renderField)}
        {children ? children({ values, setValues }) : null}
        {errorMessage ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => {
          hasUserInteracted.current = false;
          setValues(initialValues);
        }} disabled={!isDirty || isSaving}>
          Reset
        </Button>
        <Button onClick={() => void handleSave()} disabled={isSaving || !isDirty}>
          {isSaving ? "Saving..." : saveLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SectionFormCard;
