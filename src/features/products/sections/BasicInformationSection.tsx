import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { UnitConfiguration } from "@/features/products/components/UnitConfiguration.tsx";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox.tsx";
import { Plus, ScanBarcode, Settings } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Engineering", "Design", "Marketing", "Sales",
  "Customer Support", "Human Resources", "Finance", "Operations",
] as const;

const PRODUCT_TYPE_OPTIONS = ["Physical", "Service", "Digital"] as const;
const UNIT_OPTIONS = ["Piece", "Box", "KG", "Litre", "Meter"] as const;

function ComboboxWithAdd({
  id,
  placeholder,
  items,
  addLabel,
}: {
  id: string;
  placeholder: string;
  items: readonly string[];
  addLabel: string;
}) {
  return (
    <div className="flex gap-2">
      <div className="flex-1 min-w-0">
      <Combobox items={items}>
        <ComboboxInput id={id} placeholder={placeholder} />
        <ComboboxContent>
          <ComboboxEmpty>No results.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      </div>
      <Button type="button" variant="outline" size="icon" aria-label={addLabel}>
        <Plus />
      </Button>
    </div>
  );
}

export default function BasicInformationSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-0">
        <CardTitle className="text-sm">Basic Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Row 1: Name, SKU, Barcode */}
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="product-name">
              Product Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input id="product-name" placeholder="Enter product name" />
          </Field>

          <Field>
            <FieldLabel htmlFor="product-sku">
              SKU <span className="text-destructive">*</span>
            </FieldLabel>
            <InputGroup>
              <InputGroupInput id="product-sku" placeholder="Enter SKU" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="SKU settings">
                  <Settings />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="product-barcode">Barcode</FieldLabel>
            <InputGroup>
              <InputGroupInput id="product-barcode" placeholder="Enter Barcode" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Scan barcode">
                  <ScanBarcode />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>

        {/* Row 2: Category, Product Type, Brand */}
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="product-category">
              Category <span className="text-destructive">*</span>
            </FieldLabel>
            <ComboboxWithAdd
              id="product-category"
              placeholder="Select Category"
              items={CATEGORY_OPTIONS}
              addLabel="Add category"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="product-type">Product Type</FieldLabel>
            <Combobox items={PRODUCT_TYPE_OPTIONS}>
              <ComboboxInput id="product-type" placeholder="Select Type" />
              <ComboboxContent>
                <ComboboxEmpty>No results.</ComboboxEmpty>
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
            <FieldLabel htmlFor="product-brand">Brand</FieldLabel>
            <ComboboxWithAdd
              id="product-brand"
              placeholder="Select Brand"
              items={CATEGORY_OPTIONS}
              addLabel="Add brand"
            />
          </Field>
        </div>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="product-description">Description</FieldLabel>
          <Textarea id="product-description" placeholder="Enter Product Description..." />
        </Field>

        {/* Row 3: Sales Unit, Purchase Unit, Conversion */}
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="sales-unit">
              Sales Unit <span className="text-destructive">*</span>
            </FieldLabel>
            <ComboboxWithAdd
              id="sales-unit"
              placeholder="Select Unit"
              items={UNIT_OPTIONS}
              addLabel="Add sales unit"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="purchase-unit">Purchase Unit</FieldLabel>
            <ComboboxWithAdd
              id="purchase-unit"
              placeholder="Select Unit"
              items={UNIT_OPTIONS}
              addLabel="Add purchase unit"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="purchase-conversion">
              Conversion (Purchase → Sales)
            </FieldLabel>
            <UnitConfiguration />
          </Field>
        </div>

        {/* Settings row */}
        <div className="grid grid-cols-2 gap-4">
          <Field orientation="horizontal">
            <Switch id="track-inventory" />
            <FieldContent>
              <FieldLabel htmlFor="track-inventory">Track Inventory</FieldLabel>
              <FieldDescription>
                Enable if you want to track stock for this product.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field orientation="horizontal">
            <Switch id="is-active" />
            <FieldContent>
              <FieldLabel htmlFor="is-active">Is Active</FieldLabel>
              <FieldDescription>
                Inactive products will not appear in transactions.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="product-tags">Tags</FieldLabel>
            <Input id="product-tags" placeholder="Type and press enter to add tags" />
          </Field>

          <Field>
            <FieldLabel htmlFor="hsn-sac-code">HSN/SAC Code</FieldLabel>
            <Input id="hsn-sac-code" placeholder="Enter HSN/SAC Code" />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}