import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
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
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import {
  Building2,
  Tag,
  ShieldCheck,
  CreditCard,
  Truck,
  Settings,
  Eye,
  Trash2,
  Plus,
} from "lucide-react";

export interface CustomField {
  id: string;
  name: string;
  value: string;
  description: string;
}

export interface SupplierCertification {
  id: string;
  name: string;
  number: string;
  issuedDate: string;
  validTill: string;
  status: string;
}

interface SupplierAdditionalSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const GROUPS = ["Local Suppliers", "International Suppliers", "Outsourced", "Raw Materials"] as const;
const OWNERSHIPS = ["Private Limited", "Public Limited", "Partnership", "Sole Proprietorship"] as const;
const LANGUAGES = ["English", "Spanish", "Hindi", "Mandarin"] as const;
const INDUSTRIES = ["Manufacturing", "Wholesale", "Retail", "Services", "Construction"] as const;
const NATURES = ["Goods Supplier", "Service Provider", "Contractor", "Consultant"] as const;
const CATEGORIES = ["Raw Materials", "Components", "Services", "Logistics", "Office Supplies"] as const;
const TREATMENTS = ["Registered Business", "Unregistered Business", "SEZ", "Overseas"] as const;
const DELIVERY_PARTNERS = ["Delivery", "DHL Express", "FedEx", "Blue Dart", "Self Pickup"] as const;
const FREIGHT_PAYERS = ["Supplier", "Buyer", "Third Party"] as const;
const INCOTERMS = ["FOB", "EXW", "CIF", "DDP", "DAP"] as const;
const STATUS_OPTIONS = ["Active", "Inactive", "On Hold"] as const;

export default function SupplierAdditionalSection({
  formState,
  onChange,
  onSelectChange,
  tags,
  onAddTag,
  onRemoveTag,
}: SupplierAdditionalSectionProps) {
  const [certifications, setCertifications] = useState<SupplierCertification[]>([
    {
      id: "cert-1",
      name: "ISO 9001:2015",
      number: "ISO9001/2024/556",
      issuedDate: "10 Jan 2024",
      validTill: "09 Jan 2025",
      status: "Valid",
    },
    {
      id: "cert-2",
      name: "ISO 14001:2015",
      number: "ISO14001/2024/221",
      issuedDate: "12 Feb 2024",
      validTill: "11 Feb 2025",
      status: "Valid",
    },
    {
      id: "cert-3",
      name: "OHSAS 18001",
      number: "OHSAS/2023/112",
      issuedDate: "05 Dec 2023",
      validTill: "04 Dec 2024",
      status: "Valid",
    },
  ]);

  const [tagInput, setTagInput] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleAddTagClick = () => {
    if (tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput("");
      setIsAddingTag(false);
    }
  };

  const handleAddCert = () => {
    const newCert: SupplierCertification = {
      id: `cert-${Date.now()}`,
      name: "ISO 27001",
      number: "ISO27001/2026/001",
      issuedDate: "01 May 2026",
      validTill: "30 Apr 2027",
      status: "Valid",
    };
    setCertifications((prev) => [...prev, newCert]);
  };

  const handleDelCert = (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {/* Col 1 */}
      <div className="space-y-6">
        {/* 1. Business Information */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <Building2 className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Business Information</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>Supplier Group</FieldLabel>
                <Combobox
                  value={formState.group || "Local Suppliers"}
                  onValueChange={(val) => onSelectChange("group", val || "")}
                  items={GROUPS}
                >
                  <ComboboxInput placeholder="Select group" />
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
                <FieldLabel>Ownership Type</FieldLabel>
                <Combobox
                  value={formState.ownershipType || "Private Limited"}
                  onValueChange={(val) => onSelectChange("ownershipType", val || "")}
                  items={OWNERSHIPS}
                >
                  <ComboboxInput placeholder="Select ownership" />
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
                <FieldLabel>Year Established</FieldLabel>
                <Input
                  name="yearEstablished"
                  value={formState.yearEstablished}
                  onChange={onChange}
                  placeholder="2015"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Website</FieldLabel>
                <Input
                  name="website"
                  value={formState.website || "www.acmesupplies.com"}
                  onChange={onChange}
                  placeholder="www.acmesupplies.com"
                />
              </Field>

              <Field>
                <FieldLabel>Legal Name</FieldLabel>
                <Input
                  name="legalName"
                  value={formState.legalName || "Acme Supplies Private Limited"}
                  onChange={onChange}
                  placeholder="Acme Supplies Private Limited"
                />
              </Field>
            </div>

            <Field>
              <div className="flex justify-between items-center">
                <FieldLabel>Notes</FieldLabel>
                <div className="flex items-center gap-2 shrink-0">
                  <Combobox
                    value={formState.notesLanguage || "English"}
                    onValueChange={(val) => onSelectChange("notesLanguage", val || "")}
                    items={LANGUAGES}
                  >
                    <ComboboxInput placeholder="Select language" className="h-7 w-24 text-[11px] font-semibold border-none bg-muted px-2 py-0" />
                    <ComboboxContent>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item} className="text-xs">
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {(formState.notes || "").length}/250
                  </span>
                </div>
              </div>
              <Textarea
                name="notes"
                value={formState.notes || "Primary supplier for raw materials and packaging items."}
                onChange={onChange}
                maxLength={250}
                placeholder="Primary supplier for raw materials and packaging items."
                className="min-h-[64px]"
              />
            </Field>
          </CardContent>
        </Card>

        {/* 2. Compliance & Certifications */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Compliance &amp; Certifications</h4>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[30%]">Certification</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[30%]">Cert. Number</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[18%] font-mono">Issued Date</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[18%] font-mono">Valid Till</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%]">Status</TableHead>
                    <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[45px] text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certifications.map((c) => (
                    <TableRow key={c.id} className="hover:bg-accent/10 border-b border-border/30 h-11">
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold">
                        {c.name}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold font-mono">
                        {c.number}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-semibold font-mono">
                        {c.issuedDate}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-semibold font-mono">
                        {c.validTill}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <span className="text-[9px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-sm shrink-0 select-none">
                          {c.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelCert(c.id)}
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-start">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddCert}
                className="text-xs font-semibold gap-1 h-8"
                type="button"
              >
                <Plus className="h-3.5 w-3.5" /> Add Certification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Logistics & Delivery */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <Truck className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Logistics &amp; Delivery</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel>Preferred Delivery Partner</FieldLabel>
                <Combobox
                  value={formState.preferredDeliveryPartner || "Delivery"}
                  onValueChange={(val) => onSelectChange("preferredDeliveryPartner", val || "")}
                  items={DELIVERY_PARTNERS}
                >
                  <ComboboxInput placeholder="Select partner" />
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
                <FieldLabel>Freight Payable By</FieldLabel>
                <Combobox
                  value={formState.freightPayableBy || "Supplier"}
                  onValueChange={(val) => onSelectChange("freightPayableBy", val || "")}
                  items={FREIGHT_PAYERS}
                >
                  <ComboboxInput placeholder="Select payer" />
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
                <FieldLabel>Default Incoterms</FieldLabel>
                <Combobox
                  value={formState.incoterms || "FOB"}
                  onValueChange={(val) => onSelectChange("incoterms", val || "")}
                  items={INCOTERMS}
                >
                  <ComboboxInput placeholder="Select Incoterm" />
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

            <Field>
              <div className="flex justify-between items-center">
                <FieldLabel>Delivery Instructions</FieldLabel>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {(formState.deliveryInstructions || "").length}/250
                </span>
              </div>
              <Textarea
                name="deliveryInstructions"
                value={formState.deliveryInstructions || "Goods to be delivered between 9 AM - 6 PM on working days."}
                onChange={onChange}
                maxLength={250}
                placeholder="Goods to be delivered between 9 AM - 6 PM on working days."
                className="min-h-[50px] h-[50px]"
              />
            </Field>

            <div className="flex flex-col pt-1 gap-1">
              <div className="flex items-center gap-2">
                <Switch
                  id="additional-active-supplier"
                  checked={formState.status !== "Inactive"}
                  onCheckedChange={(checked) => onSelectChange("status", checked ? "Active" : "Inactive")}
                />
                <label
                  htmlFor="additional-active-supplier"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Active Supplier
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Inactive suppliers will not be available in transactions.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Col 2 */}
      <div className="space-y-6">
        {/* 4. Classification */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <Tag className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Classification</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Industry Type</FieldLabel>
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
                <FieldLabel>Nature of Business</FieldLabel>
                <Combobox
                  value={formState.natureOfBusiness || "Goods Supplier"}
                  onValueChange={(val) => onSelectChange("natureOfBusiness", val || "")}
                  items={NATURES}
                >
                  <ComboboxInput placeholder="Select nature" />
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
                <FieldLabel>Supplier Category</FieldLabel>
                <Combobox
                  value={formState.group || "Raw Materials"}
                  onValueChange={(val) => onSelectChange("group", val || "")}
                  items={CATEGORIES}
                >
                  <ComboboxInput placeholder="Select category" />
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
                <FieldLabel>GST Treatment</FieldLabel>
                <Combobox
                  value={formState.gstTreatment || "Registered Business"}
                  onValueChange={(val) => onSelectChange("gstTreatment", val || "")}
                  items={TREATMENTS}
                >
                  <ComboboxInput placeholder="Select GST treatment" />
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

            <Field>
              <FieldLabel>Tags</FieldLabel>
              <div className="flex flex-wrap gap-1.5 p-2 border border-border/40 rounded-md min-h-[42px] items-center">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-sm select-none"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => onRemoveTag(tag)}
                      className="hover:text-destructive text-[10px] font-bold shrink-0 cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {isAddingTag ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Press enter"
                      className="h-6 text-[10px] py-0 px-1 w-20 font-bold border-none shadow-none focus-visible:ring-0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddTagClick();
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsAddingTag(false)}
                      className="text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="text-[10px] font-bold text-primary hover:underline px-2 py-0.5 flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" /> Add Tag
                  </button>
                )}
              </div>
            </Field>
          </CardContent>
        </Card>

        {/* 5. Bank & Payment Details */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <CreditCard className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">Bank &amp; Payment Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Bank Name</FieldLabel>
                <Input
                  value={formState.bankName || "HDFC Bank"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>Branch</FieldLabel>
                <Input
                  value={formState.branch || "MG Road, Bangalore"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>Account Number</FieldLabel>
                <Input
                  value={formState.accountNumber || "5010 1234 5678 90"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold font-mono"
                />
              </Field>

              <Field>
                <FieldLabel>IFSC Code</FieldLabel>
                <Input
                  value={formState.ifscCode || "HDFCC0001234"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>SWIFT Code</FieldLabel>
                <Input
                  value={formState.swiftCode || "HDFCINBB"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold font-mono"
                />
              </Field>

              <Field>
                <FieldLabel>Beneficiary Name</FieldLabel>
                <Input
                  value={formState.accountHolderName || "Acme Supplies Pvt Ltd"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* 6. System & Status */}
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <Settings className="h-4.5 w-4.5" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">System &amp; Status</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Supplier Code (Auto)</FieldLabel>
                <Input
                  value={formState.code || "SUP-000124"}
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>Status</FieldLabel>
                <Combobox
                  value={formState.status || "Active"}
                  onValueChange={(val) => onSelectChange("status", val || "Active")}
                  items={STATUS_OPTIONS}
                >
                  <ComboboxInput placeholder="Select status" />
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
                <FieldLabel>Created By</FieldLabel>
                <Input
                  value="John Doe"
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>Created On</FieldLabel>
                <Input
                  value="01 Apr 2024, 10:30 AM"
                  disabled
                  className="bg-muted text-muted-foreground font-semibold font-mono"
                />
              </Field>

              <Field>
                <FieldLabel>Last Modified By</FieldLabel>
                <Input
                  value="John Doe"
                  disabled
                  className="bg-muted text-muted-foreground font-semibold"
                />
              </Field>

              <Field>
                <FieldLabel>Last Modified On</FieldLabel>
                <Input
                  value="01 Apr 2024, 10:30 AM"
                  disabled
                  className="bg-muted text-muted-foreground font-semibold font-mono"
                />
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
