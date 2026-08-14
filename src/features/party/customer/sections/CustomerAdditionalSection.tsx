import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Separator } from "@/components/base/separator.tsx";
import { Input } from "@/components/base/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  Field,
  FieldLabel,
} from "@/components/base/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
} from "@/components/base/input-group.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import {
  Settings,
  Shield,
  Layers,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  X,
  PlusCircle,
  Info,
} from "lucide-react";

export interface CustomField {
  id: string;
  name: string;
  value: string;
  description: string;
}

interface CustomerAdditionalSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  customFields: CustomField[];
  onAddCustomField: (field: Omit<CustomField, "id">) => void;
  onDeleteCustomField: (id: string) => void;
  onUpdateCustomField: (id: string, name: string, value: string, description: string) => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;
const LANGUAGES = ["English", "Malayalam", "Hindi", "Tamil", "Arabic"] as const;
const TIMEZONES = ["Asia/Kolkata (UTC +05:30)", "Europe/London (UTC +00:00)", "America/New_York (UTC -05:00)", "Asia/Dubai (UTC +04:00)"] as const;
const COMM_PREFS = ["Email", "Phone", "SMS", "WhatsApp"] as const;
const CONTACT_METHODS = ["Email", "Phone", "SMS", "WhatsApp"] as const;

const INDUSTRIES = ["Manufacturing", "Retail", "Services", "Technology", "Construction", "Logistics"] as const;
const BUSINESS_TYPES = ["Private Limited", "Partnership", "Sole Proprietorship", "Public Limited", "LLP"] as const;
const TIERS = ["Gold", "Silver", "Platinum", "Bronze"] as const;
const REGIONS = ["South India", "North India", "East India", "West India", "International"] as const;

const PRECISIONS = ["2 Decimal Places", "3 Decimal Places", "4 Decimal Places", "0 Decimal Places"] as const;
const DATE_FORMATS = ["DD MMM YYYY", "YYYY-MM-DD", "DD-MM-YYYY", "MM/DD/YYYY"] as const;
const NUMBER_FORMATS = ["Indian (1,23,456.78)", "International (1,234,567.89)", "European (1.234.567,89)"] as const;

export default function CustomerAdditionalSection({
  formState,
  onChange,
  onSelectChange,
  customFields,
  onAddCustomField,
  onDeleteCustomField,
  onUpdateCustomField,
  tags,
  onAddTag,
  onRemoveTag,
}: CustomerAdditionalSectionProps) {
  const [newTagInput, setNewTagInput] = useState("");
  
  // Custom field local states for adding/editing
  const [isAddingField, setIsAddingField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldVal, setFieldVal] = useState("");
  const [fieldDesc, setFieldDesc] = useState("");
  
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagInput.trim()) {
      onAddTag(newTagInput.trim());
      setNewTagInput("");
    }
  };

  const handleSaveField = () => {
    if (!fieldName.trim() || !fieldVal.trim()) return;
    if (editingFieldId) {
      onUpdateCustomField(editingFieldId, fieldName, fieldVal, fieldDesc);
      setEditingFieldId(null);
    } else {
      onAddCustomField({ name: fieldName, value: fieldVal, description: fieldDesc });
    }
    setFieldName("");
    setFieldVal("");
    setFieldDesc("");
    setIsAddingField(false);
  };

  const handleStartEdit = (field: CustomField) => {
    setEditingFieldId(field.id);
    setFieldName(field.name);
    setFieldVal(field.value);
    setFieldDesc(field.description);
    setIsAddingField(true);
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Settings className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">General Settings</h4>
              <p className="text-xs text-muted-foreground">General preferences and configuration for this customer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Customer Since</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="customerSince"
                  value={formState.customerSince}
                  onChange={onChange}
                  placeholder="Select date"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost" size="icon-xs" type="button">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Preferred Currency</FieldLabel>
              <Combobox
                value={formState.currency || "INR - Indian Rupee"}
                onValueChange={(val) => onSelectChange("currency", val || "")}
                items={CURRENCIES}
              >
                <ComboboxInput placeholder="Select currency" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Preferred Language</FieldLabel>
              <Combobox
                value={formState.preferredLanguage || "English"}
                onValueChange={(val) => onSelectChange("preferredLanguage", val || "")}
                items={LANGUAGES}
              >
                <ComboboxInput placeholder="Select language" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Timezone</FieldLabel>
              <Combobox
                value={formState.timezone || "Asia/Kolkata (UTC +05:30)"}
                onValueChange={(val) => onSelectChange("timezone", val || "")}
                items={TIMEZONES}
              >
                <ComboboxInput placeholder="Select timezone" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <Field>
              <FieldLabel>Communication Preference</FieldLabel>
              <Combobox
                value={formState.communicationPreference || "Email"}
                onValueChange={(val) => onSelectChange("communicationPreference", val || "")}
                items={COMM_PREFS}
              >
                <ComboboxInput placeholder="Select preference" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Preferred Contact Method</FieldLabel>
              <Combobox
                value={formState.preferredContactMethod || "Email"}
                onValueChange={(val) => onSelectChange("preferredContactMethod", val || "")}
                items={CONTACT_METHODS}
              >
                <ComboboxInput placeholder="Select contact method" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="marketing-emails"
                checked={formState.marketingEmails !== false}
                onCheckedChange={(c) => onSelectChange("marketingEmails", c ? "true" : "false")}
              />
              <label
                htmlFor="marketing-emails"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow marketing emails
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="sms-notifications"
                checked={formState.smsNotifications === true || formState.smsNotifications === "true"}
                onCheckedChange={(c) => onSelectChange("smsNotifications", c ? "true" : "false")}
              />
              <label
                htmlFor="sms-notifications"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow SMS notifications
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Classification */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Customer Classification</h4>
              <p className="text-xs text-muted-foreground">Classify customer for segmentation and reporting.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Industry</FieldLabel>
              <Combobox
                value={formState.industry || "Manufacturing"}
                onValueChange={(val) => onSelectChange("industry", val || "")}
                items={INDUSTRIES}
              >
                <ComboboxInput placeholder="Select industry" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Business Type</FieldLabel>
              <Combobox
                value={formState.businessType || "Private Limited"}
                onValueChange={(val) => onSelectChange("businessType", val || "")}
                items={BUSINESS_TYPES}
              >
                <ComboboxInput placeholder="Select business type" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Customer Tier</FieldLabel>
              <Combobox
                value={formState.customerTier || "Gold"}
                onValueChange={(val) => onSelectChange("customerTier", val || "")}
                items={TIERS}
              >
                <ComboboxInput placeholder="Select tier" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Region</FieldLabel>
              <Combobox
                value={formState.region || "South India"}
                onValueChange={(val) => onSelectChange("region", val || "")}
                items={REGIONS}
              >
                <ComboboxInput placeholder="Select region" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </div>

          {/* Tags Element */}
          <Field>
            <FieldLabel>Tags</FieldLabel>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-input rounded-md bg-background focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring min-h-10 transition-[color,box-shadow]">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1 bg-muted/60 text-foreground border-border/60 text-xs font-semibold px-2 py-0.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => onRemoveTag(tag)}
                    className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-full p-0.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <form onSubmit={handleAddTagSubmit} className="flex-1 min-w-24">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  placeholder={tags.length === 0 ? "Add tags..." : ""}
                  className="w-full text-xs font-semibold bg-transparent outline-none border-none p-0 text-foreground placeholder:text-muted-foreground"
                />
              </form>
            </div>
          </Field>
        </CardContent>
      </Card>

      {/* Custom Fields */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Custom Fields</h4>
                <p className="text-xs text-muted-foreground">Add custom information specific to your business.</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingFieldId(null);
                setFieldName("");
                setFieldVal("");
                setFieldDesc("");
                setIsAddingField(true);
              }}
              className="text-xs font-semibold gap-1.5 h-8.5 shrink-0 self-end sm:self-auto"
              type="button"
            >
              <Plus className="h-4 w-4" /> Add Custom Field
            </Button>
          </div>

          {/* Interactive add/edit fields card inline */}
          {isAddingField && (
            <Card className="bg-muted/40 border border-border/40 p-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  {editingFieldId ? "Edit Custom Field" : "New Custom Field"}
                </h5>
                <button
                  type="button"
                  onClick={() => setIsAddingField(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Field Name</FieldLabel>
                  <Input
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    placeholder="e.g., Customer Reference No."
                  />
                </Field>
                <Field>
                  <FieldLabel>Value</FieldLabel>
                  <Input
                    value={fieldVal}
                    onChange={(e) => setFieldVal(e.target.value)}
                    placeholder="e.g., ACME-REF-2026-001"
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    value={fieldDesc}
                    onChange={(e) => setFieldDesc(e.target.value)}
                    placeholder="e.g., Internal reference number"
                  />
                </Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingField(false)}
                  type="button"
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveField}
                  type="button"
                  className="text-xs"
                >
                  Save Field
                </Button>
              </div>
            </Card>
          )}

          {/* Custom Fields Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[30%]">Field Name</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[35%]">Value</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[25%]">Description</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customFields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-20 text-center text-xs text-muted-foreground">
                      No custom fields added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  customFields.map((field) => (
                    <TableRow key={field.id} className="hover:bg-accent/10 border-b border-border/30 h-11">
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold">
                        {field.name}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold font-mono">
                        {field.value}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-medium">
                        {field.description || "—"}
                      </TableCell>
                      <TableCell className="py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(field)}
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                            title="Edit field"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCustomField(field.id)}
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                            title="Delete field"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Other Preferences */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Settings className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Other Preferences</h4>
              <p className="text-xs text-muted-foreground">Default precision and formatting preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Default Price Precision</FieldLabel>
              <Combobox
                value={formState.defaultPricePrecision || "2 Decimal Places"}
                onValueChange={(val) => onSelectChange("defaultPricePrecision", val || "")}
                items={PRECISIONS}
              >
                <ComboboxInput placeholder="Select precision" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Default Quantity Precision</FieldLabel>
              <Combobox
                value={formState.defaultQuantityPrecision || "2 Decimal Places"}
                onValueChange={(val) => onSelectChange("defaultQuantityPrecision", val || "")}
                items={PRECISIONS}
              >
                <ComboboxInput placeholder="Select precision" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Date Format</FieldLabel>
              <Combobox
                value={formState.dateFormat || "DD MMM YYYY"}
                onValueChange={(val) => onSelectChange("dateFormat", val || "")}
                items={DATE_FORMATS}
              >
                <ComboboxInput placeholder="Select format" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel>Number Format</FieldLabel>
              <Combobox
                value={formState.numberFormat || "Indian (1,23,456.78)"}
                onValueChange={(val) => onSelectChange("numberFormat", val || "")}
                items={NUMBER_FORMATS}
              >
                <ComboboxInput placeholder="Select format" />
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </div>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            <p>Additional settings help personalize your business relationship with this customer.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
