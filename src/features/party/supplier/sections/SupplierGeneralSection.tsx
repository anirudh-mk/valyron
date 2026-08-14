import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import { Input } from "@/components/base/input.tsx";
import { Button } from "@/components/base/button.tsx";
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
  Building2,
  Phone,
  Mail,
  IndianRupee,
  Calendar,
  Eye,
  EyeOff,
  Plus,
  Info,
  Globe,
  Settings,
} from "lucide-react";

interface SupplierGeneralSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const SUPPLIER_TYPES = ["Goods Supplier", "Service Provider", "Manufacturer", "Distributor", "Contractor", "Consultant"] as const;
const SUPPLIER_GROUPS = ["Raw Materials", "Logistics", "IT & Hardware", "Marketing Services", "Office Supplies", "Other"] as const;
const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;
const PAYMENT_TERMS = ["Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"] as const;
const GST_TREATMENTS = ["Registered Business", "Unregistered Business", "Consumer", "SEZ Unit", "Overseas"] as const;
const COUNTRIES = ["India", "United States", "United Kingdom", "Germany", "Singapore"] as const;
const INDUSTRIES = ["Manufacturing", "Retail", "Services", "Technology", "Logistics"] as const;
const NATURES = ["Supplier", "Manufacturer", "Distributor", "Agent"] as const;
const TURNOVERS = ["Under ₹ 10 Cr", "₹ 10 Cr - ₹ 50 Cr", "₹ 50 Cr - ₹ 250 Cr", "Above ₹ 250 Cr"] as const;
const BANKS = ["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Federal Bank"] as const;

export default function SupplierGeneralSection({
  formState,
  onChange,
  onSelectChange,
}: SupplierGeneralSectionProps) {
  const [showAccountNo, setShowAccountNo] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Supplier Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Building2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Supplier Information</h4>
              <p className="text-xs text-muted-foreground">Basic details about the supplier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Supplier Name <span className="text-destructive">*</span></FieldLabel>
              <Input
                name="name"
                value={formState.name}
                onChange={onChange}
                placeholder="Enter supplier name"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Supplier Code <span className="text-destructive">*</span></FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="code"
                  value={formState.code}
                  onChange={onChange}
                  placeholder="SUP-000124"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost" size="icon-xs" type="button" title="Settings">
                    <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Supplier Type <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.type || "Goods Supplier"}
                onValueChange={(val) => onSelectChange("type", val || "")}
                items={SUPPLIER_TYPES}
              >
                <ComboboxInput placeholder="Select type" />
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
              <FieldLabel>Supplier Group</FieldLabel>
              <Combobox
                value={formState.group || "Raw Materials"}
                onValueChange={(val) => onSelectChange("group", val || "")}
                items={SUPPLIER_GROUPS}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                value={formState.email}
                onChange={onChange}
                placeholder="supplier@email.com"
              />
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>
              <Input
                name="phone"
                value={formState.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
            </Field>

            <Field>
              <FieldLabel>Alternate Phone</FieldLabel>
              <Input
                name="alternatePhone"
                value={formState.alternatePhone}
                onChange={onChange}
                placeholder="Enter alternate phone"
              />
            </Field>

            <Field>
              <FieldLabel>Website</FieldLabel>
              <Input
                name="website"
                value={formState.website}
                onChange={onChange}
                placeholder="www.supplier.com"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Currency <span className="text-destructive">*</span></FieldLabel>
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
              <FieldLabel>Payment Terms <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.paymentTerms || "Net 30"}
                onValueChange={(val) => onSelectChange("paymentTerms", val || "")}
                items={PAYMENT_TERMS}
              >
                <ComboboxInput placeholder="Select payment terms" />
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
              <FieldLabel>GST Treatment <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.gstTreatment || "Registered Business"}
                onValueChange={(val) => onSelectChange("gstTreatment", val || "")}
                items={GST_TREATMENTS}
              >
                <ComboboxInput placeholder="Select GST Treatment" />
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
              <FieldLabel>GSTIN / UIN</FieldLabel>
              <Input
                name="gstin"
                value={formState.gstin}
                onChange={onChange}
                placeholder="Enter GSTIN or UIN"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <Field>
              <FieldLabel>PAN / Tax No.</FieldLabel>
              <Input
                name="pan"
                value={formState.pan}
                onChange={onChange}
                placeholder="Enter PAN or Tax No."
              />
            </Field>

            <Field>
              <FieldLabel>Country of Registration</FieldLabel>
              <Combobox
                value={formState.countryOfRegistration || "India"}
                onValueChange={(val) => onSelectChange("countryOfRegistration", val || "")}
                items={COUNTRIES}
              >
                <ComboboxInput placeholder="Select country" />
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
              <InputGroup>
                <InputGroupInput
                  name="yearEstablished"
                  value={formState.yearEstablished}
                  onChange={onChange}
                  placeholder="Select year"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost" size="icon-xs" type="button">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="supplier-status"
                checked={formState.status !== "Inactive"}
                onCheckedChange={(checked) => onSelectChange("status", checked ? "Active" : "Inactive")}
              />
              <label htmlFor="supplier-status" className="text-xs font-semibold text-foreground cursor-pointer select-none">
                Active
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Business Details */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Globe className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Business Details</h4>
              <p className="text-xs text-muted-foreground">Additional information about the supplier.</p>
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
              <FieldLabel>Nature of Business</FieldLabel>
              <Combobox
                value={formState.natureOfBusiness || "Supplier"}
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
              <FieldLabel>Vendor Since</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="vendorSince"
                  value={formState.vendorSince}
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
              <FieldLabel>Annual Turnover</FieldLabel>
              <Combobox
                value={formState.annualTurnover || "₹ 50 Cr - ₹ 250 Cr"}
                onValueChange={(val) => onSelectChange("annualTurnover", val || "")}
                items={TURNOVERS}
              >
                <ComboboxInput placeholder="Select turnover" />
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
            <div className="flex justify-between">
              <FieldLabel>Business Description</FieldLabel>
              <span className="text-[10px] text-muted-foreground font-mono">
                {(formState.businessDescription || "").length}/500
              </span>
            </div>
            <Textarea
              name="businessDescription"
              value={formState.businessDescription}
              onChange={onChange}
              maxLength={500}
              placeholder="Enter brief description about this supplier..."
              className="min-h-[80px]"
            />
          </Field>
        </CardContent>
      </Card>

      {/* 3. Bank Details */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <IndianRupee className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Bank Details</h4>
              <p className="text-xs text-muted-foreground">Primary bank account details for payments.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Bank Name</FieldLabel>
              <Combobox
                value={formState.bankName || "HDFC Bank"}
                onValueChange={(val) => onSelectChange("bankName", val || "")}
                items={BANKS}
              >
                <ComboboxInput placeholder="Select bank" />
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
              <FieldLabel>Account Holder Name</FieldLabel>
              <Input
                name="accountHolderName"
                value={formState.accountHolderName}
                onChange={onChange}
                placeholder="Acme Supplies Pvt Ltd"
              />
            </Field>

            <Field>
              <FieldLabel>Account Number</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="accountNumber"
                  type={showAccountNo ? "text" : "password"}
                  value={formState.accountNumber}
                  onChange={onChange}
                  placeholder="5010 **** **** 1234"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    variant="ghost"
                    size="icon-xs"
                    type="button"
                    onClick={() => setShowAccountNo(!showAccountNo)}
                    title={showAccountNo ? "Hide" : "Show"}
                  >
                    {showAccountNo ? (
                      <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>IFSC Code</FieldLabel>
              <Input
                name="ifscCode"
                value={formState.ifscCode}
                onChange={onChange}
                placeholder="HDFCC0001234"
              />
            </Field>
          </div>

          <button
            type="button"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Another Bank Account
          </button>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4.5 w-4.5 shrink-0" />
            <p>Basic supplier information. You can add more details in other sections.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
