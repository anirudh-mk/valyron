import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/base/combobox.tsx";
import { Field, FieldLabel } from "@/components/base/field.tsx";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/base/input-group.tsx";

interface CustomerGeneralSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const CUSTOMER_TYPE_OPTIONS = ["Business", "Individual"] as const;
const CUSTOMER_GROUP_OPTIONS = ["Corporate", "Retail", "Wholesale"] as const;
const CURRENCY_OPTIONS = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro"] as const;
const PREFERRED_CONTACT_OPTIONS = ["Email", "Phone", "SMS", "WhatsApp"] as const;
const TAX_TREATMENT_OPTIONS = [
  "Registered Business",
  "Unregistered Business",
  "Consumer",
  "SEZ",
] as const;

export default function CustomerGeneralSection({
  formState,
  onChange,
  onSelectChange,
}: CustomerGeneralSectionProps) {
  return (
    <div className="space-y-4">
      {/* 1. Customer Information Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Customer Information</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Basic details about the customer.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Row 1: Name, Code, Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="customer-name">
                Customer Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="customer-name"
                name="name"
                value={formState.name}
                onChange={onChange}
                placeholder="Enter customer name"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="customer-code">
                Customer Code <span className="text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="customer-code"
                  name="code"
                  value={formState.code}
                  onChange={onChange}
                  placeholder="e.g., CUS-000124"
                  required
                />
                <InputGroupAddon align="inline-end" className="text-xs text-muted-foreground bg-muted px-2.5 flex items-center border-l border-border h-full">
                  Auto generated
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="customer-type">
                Customer Type <span className="text-destructive">*</span>
              </FieldLabel>
              <Combobox
                value={formState.type}
                onValueChange={(val) => onSelectChange("type", val || "")}
                items={CUSTOMER_TYPE_OPTIONS}
              >
                <ComboboxInput id="customer-type" placeholder="Select type" />
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

          {/* Row 2: Customer Group, Email, Phone, Alternate Phone */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="customer-group">Customer Group</FieldLabel>
              <Combobox
                value={formState.group}
                onValueChange={(val) => onSelectChange("group", val || "")}
                items={CUSTOMER_GROUP_OPTIONS}
              >
                <ComboboxInput id="customer-group" placeholder="Select group" />
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
              <FieldLabel htmlFor="customer-email">Email</FieldLabel>
              <Input
                id="customer-email"
                type="email"
                name="email"
                value={formState.email}
                onChange={onChange}
                placeholder="customer@acme.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="customer-phone">Phone</FieldLabel>
              <Input
                id="customer-phone"
                name="phone"
                value={formState.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="customer-alt-phone">Alternate Phone</FieldLabel>
              <Input
                id="customer-alt-phone"
                name="alternatePhone"
                value={formState.alternatePhone}
                onChange={onChange}
                placeholder="Enter alternate phone"
              />
            </Field>
          </div>

          {/* Row 3: Website, Currency, Preferred Contact, Customer Since */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="customer-website">Website</FieldLabel>
              <Input
                id="customer-website"
                name="website"
                value={formState.website}
                onChange={onChange}
                placeholder="www.acme.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="customer-currency">
                Currency <span className="text-destructive">*</span>
              </FieldLabel>
              <Combobox
                value={formState.currency}
                onValueChange={(val) => onSelectChange("currency", val || "")}
                items={CURRENCY_OPTIONS}
              >
                <ComboboxInput id="customer-currency" placeholder="Select currency" />
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
              <FieldLabel htmlFor="customer-preferred-contact">Preferred Contact Method</FieldLabel>
              <Combobox
                value={formState.preferredContact}
                onValueChange={(val) => onSelectChange("preferredContact", val || "")}
                items={PREFERRED_CONTACT_OPTIONS}
              >
                <ComboboxInput id="customer-preferred-contact" placeholder="Select method" />
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
              <FieldLabel htmlFor="customer-since">Customer Since</FieldLabel>
              <Input
                id="customer-since"
                type="date"
                name="customerSince"
                value={formState.customerSince}
                onChange={onChange}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* 2. Tax Information Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Tax Information</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Tax registration and identification details.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="tax-treatment">Tax Treatment</FieldLabel>
              <Combobox
                value={formState.taxTreatment}
                onValueChange={(val) => onSelectChange("taxTreatment", val || "")}
                items={TAX_TREATMENT_OPTIONS}
              >
                <ComboboxInput id="tax-treatment" placeholder="Select tax treatment" />
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
              <FieldLabel htmlFor="gstin-tax-id">GSTIN / Tax ID</FieldLabel>
              <Input
                id="gstin-tax-id"
                name="taxId"
                value={formState.taxId}
                onChange={onChange}
                placeholder="32XXXXXXXXXX1Z5"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="pan-tax-no">PAN / Tax No.</FieldLabel>
              <Input
                id="pan-tax-no"
                name="pan"
                value={formState.pan}
                onChange={onChange}
                placeholder="XXXXX1234X"
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* 3. Notes Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Notes</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Internal notes about this customer.</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            name="notes"
            value={formState.notes}
            onChange={onChange}
            placeholder="Add any additional notes..."
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
          <div className="text-right text-xs text-muted-foreground">
            {formState.notes.length} / 500
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
