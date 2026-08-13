import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field.tsx";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { FileSpreadsheet, Calculator, Settings2, IndianRupee } from "lucide-react";

const VALUATION_METHODS = [
  {
    id: "weighted-average",
    label: "Weighted Average",
    description: "Cost is calculated based on weighted average of all purchases.",
  },
  {
    id: "fifo",
    label: "FIFO (First In, First Out)",
    description: "Oldest stock will be sold first.",
  },
  {
    id: "lifo",
    label: "LIFO (Last In, First Out)",
    description: "Latest stock will be sold first.",
  },
  {
    id: "standard-cost",
    label: "Standard Cost",
    description: "Use a fixed standard cost for valuation.",
  },
] as const;

const CHECKBOX_SETTINGS = [
  {
    id: "track-stock-value",
    label: "Track stock value in accounting",
    description: "Record inventory value in balance sheet.",
    defaultChecked: true,
  },
  {
    id: "include-financial-reports",
    label: "Include in financial reports",
    description: "Show this product in profit & loss reports.",
    defaultChecked: true,
  },
  {
    id: "allow-discount-sales",
    label: "Allow discount on sales",
    description: "Allow discount when selling this product.",
    defaultChecked: true,
  },
] as const;

const SWITCH_SETTINGS = [
  {
    id: "allow-purchase",
    label: "Allow purchase",
    description: "Allow this product to be purchased.",
    defaultChecked: true,
  },
  {
    id: "allow-sale",
    label: "Allow sale",
    description: "Allow this product to be sold.",
    defaultChecked: true,
  },
  {
    id: "accounting-active",
    label: "Active",
    description: "Inactive products will not appear in transactions.",
    defaultChecked: true,
  },
] as const;

const ROUNDING_OPTIONS = ["Round to Nearest", "Round Up", "Round Down"] as const;
const DECIMAL_OPTIONS = ["0", "1", "2", "3", "4"] as const;

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

function AccountCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select an account" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default function AccountingSection() {
  const [valuationMethod, setValuationMethod] = useState("weighted-average");
  const [isService, setIsService] = useState(false);

  return (
    <div className="space-y-4">
      {/* Card 1: Accounting Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
              <FileSpreadsheet className="size-4" />
            </div>
            Accounting Information
          </CardTitle>
          <CardDescription>
            Configure how this product will be recorded in your accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>
                Income Account <span className="text-destructive">*</span>
              </FieldLabel>
              <AccountCombobox />
            </Field>

            <Field>
              <FieldLabel>
                Expense Account <span className="text-destructive">*</span>
              </FieldLabel>
              <AccountCombobox />
            </Field>

            <Field>
              <FieldLabel>
                Inventory Asset Account <span className="text-destructive">*</span>
              </FieldLabel>
              <AccountCombobox />
            </Field>

            <Field>
              <FieldLabel>Tax Liability Account</FieldLabel>
              <AccountCombobox />
            </Field>

            <Field>
              <FieldLabel>Input Tax Credit Account</FieldLabel>
              <AccountCombobox />
            </Field>

            <Field>
              <FieldLabel>Asset Account (For Non-Inventory)</FieldLabel>
              <AccountCombobox />
            </Field>
          </div>

          <Separator />

          <Field orientation="horizontal">
            <Switch
              id="is-service-toggle"
              checked={isService}
              onCheckedChange={setIsService}
            />
            <FieldContent>
              <FieldLabel htmlFor="is-service-toggle" className="font-semibold cursor-pointer">
                This is a Service
              </FieldLabel>
              <FieldDescription>
                Enable if this is a non-inventory service item.
              </FieldDescription>
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      {/* Card 2: Inventory Valuation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
              <Calculator className="size-4" />
            </div>
            Inventory Valuation
          </CardTitle>
          <CardDescription>
            Choose how the inventory value of this product is calculated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Valuation Method Cards */}
          <RadioGroup
            value={valuationMethod}
            onValueChange={setValuationMethod}
            className="grid grid-cols-4 gap-3"
          >
            {VALUATION_METHODS.map((method) => (
              <FieldLabel key={method.id} htmlFor={method.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="text-xs">{method.label}</FieldTitle>
                    <FieldDescription className="text-[10px]">
                      {method.description}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={method.id} id={method.id}/>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>

          {/* Valuation Settings */}
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="default-cost">Default Cost</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>
                    <IndianRupee className="size-3.5" />
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="default-cost" defaultValue="1,650.00" />
              </InputGroup>
              <FieldDescription>Used when actual cost is not available.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="rounding-method">Rounding Method</FieldLabel>
              <Combobox items={ROUNDING_OPTIONS}>
                <ComboboxInput id="rounding-method" placeholder="Rounding Method" />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
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
              <FieldLabel htmlFor="decimal-places">Decimal Places</FieldLabel>
              <Combobox items={DECIMAL_OPTIONS}>
                <ComboboxInput id="decimal-places" placeholder="Decimal Places" />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
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
        </CardContent>
      </Card>

      {/* Card 3: Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
              <Settings2 className="size-4" />
            </div>
            Additional Settings
          </CardTitle>
          <CardDescription>
            Configure additional accounting related settings for this product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Checkbox settings */}
            <div className="space-y-4">
              {CHECKBOX_SETTINGS.map((setting) => (
                <Field key={setting.id} orientation="horizontal" className="items-start gap-3">
                  <Checkbox id={setting.id} defaultChecked={setting.defaultChecked} />
                  <FieldContent>
                    <FieldLabel htmlFor={setting.id} className="text-xs font-semibold cursor-pointer">
                      {setting.label}
                    </FieldLabel>
                    <FieldDescription className="text-[10px]">
                      {setting.description}
                    </FieldDescription>
                  </FieldContent>
                </Field>
              ))}
            </div>

            {/* Switch settings */}
            <div className="space-y-4">
              {SWITCH_SETTINGS.map((setting) => (
                <Field key={setting.id} orientation="horizontal" className="items-start gap-3">
                  <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                  <FieldContent>
                    <FieldLabel htmlFor={setting.id} className="text-xs font-semibold cursor-pointer">
                      {setting.label}
                    </FieldLabel>
                    <FieldDescription className="text-[10px]">
                      {setting.description}
                    </FieldDescription>
                  </FieldContent>
                </Field>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
