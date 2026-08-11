import {Input} from "@/components/ui/input.tsx";
import {Card} from "@/components/ui/card.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";

import {Button} from "@/components/ui/button.tsx";
import {Plus, ScanBarcode, Settings} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {UnitConfiguration} from "@/features/products/components/UnitConfiguration.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import Grid from "@/components/common/Grid.tsx";
import FormField from "@/components/common/FormField.tsx";
import InputIconButton from "@/components/common/InputIconButton.tsx";
import FormSelect from "@/components/common/FormSelect.tsx";

const categoryOptions = [
  {value: "engineering", label: "Engineering"},
  {value: "design", label: "Design"},
  {value: "marketing", label: "Marketing"},
  {value: "sales", label: "Sales"},
  {value: "support", label: "Customer Support"},
  {value: "hr", label: "Human Resources"},
  {value: "finance", label: "Finance"},
  {value: "operations", label: "Operations"},
];

export default function BasicInformationSection() {
  return (
    <Card className="p-6 gap-4">
      <Grid rows={2} columns={3} gap={4}>
        {/* Product Name */}
        <FormField
          label="Product Name"
          htmlFor="product-name"
          required
        >
          <Input
            id="product-name"
            placeholder="Enter product name"
          />
        </FormField>

        {/* SKU */}
        <FormField
          label="SKU"
          htmlFor="product-sku"
          required
        >
          <InputIconButton
            id="product-sku"
            placeholder="Enter SKU"
            required
            icon={<Settings/>}
            ariaLabel="SKU settings"
            onClick={() => {
              // Open settings
            }}
          />
        </FormField>

        {/* Barcode */}
        <FormField
          label="Barcode"
          htmlFor="product-barcode"
        >
          <InputIconButton
            id="product-barcode"
            placeholder="Enter Barcode"
            icon={<ScanBarcode/>}
            ariaLabel="Scan barcode"
          />
        </FormField>

        {/* Category */}
        <FormField label="Category" htmlFor="product-category" required>
          <div className="flex gap-2">
            <FormSelect
              id="product-category"
              placeholder="Select Category"
              options={categoryOptions}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add category"
            >
              <Plus/>
            </Button>
          </div>
        </FormField>

        {/* Product Type */}
        <FormField
          label="Product Type"
          htmlFor="product-type"
        >
          <FormSelect
            id="product-type"
            placeholder="Select Type"
            options={categoryOptions}
          />
        </FormField>

        {/* Brand / Manufacturer */}
        <FormField
          label="Brand"
          htmlFor="product-brand"
        >
          <div className="flex gap-2">
            <FormSelect
              id="product-brand"
              placeholder="Select Brand"
              options={categoryOptions}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add brand"
            >
              <Plus/>
            </Button>
          </div>
        </FormField>
      </Grid>

      {/* Product Description */}
      <FormField
        label="Description"
        htmlFor="product-description"
      >
        <Textarea
          id="product-description"
          placeholder="Enter Product Description..."
        />
      </FormField>

      {/* Units */}
      <Grid columns={3} gap={4}>

        {/* Sales Unit */}
        <FormField
          label="Sales Unit"
          htmlFor="sales-unit"
          required
        >
          <div className="flex gap-2">
            <FormSelect
              id="sales-unit"
              placeholder="Select Unit"
              options={categoryOptions}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add sales unit"
            >
              <Plus/>
            </Button>
          </div>
        </FormField>

        {/* Purchase Unit */}
        <FormField
          label="Purchase Unit"
          htmlFor="purchase-unit"
        >
          <div className="flex gap-2">
            <FormSelect
              id="purchase-unit"
              placeholder="Select Unit"
              options={categoryOptions}
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add purchase unit"
            >
              <Plus/>
            </Button>
          </div>
        </FormField>
        <FormField
          label="Conversion (Purchase → Sales)"
          htmlFor="unit-conversion"
        >
          <UnitConfiguration/>
        </FormField>
      </Grid>

      {/* Product Settings */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4">

        {/* Track Inventory */}
        <Field orientation="horizontal" className="max-w-sm">
          <Switch id="track-inventory"/>

          <FieldContent>
            <FieldLabel htmlFor="track-inventory">
              Track Inventory
            </FieldLabel>

            <FieldDescription>
              Enable if you want to track stock for this product.
            </FieldDescription>
          </FieldContent>
        </Field>

        {/* Is Active */}
        <Field orientation="horizontal" className="max-w-sm">
          <Switch id="is-active"/>

          <FieldContent>
            <FieldLabel htmlFor="is-active">
              Is Active
            </FieldLabel>

            <FieldDescription>
              Inactive products will not appear in transactions.
            </FieldDescription>
          </FieldContent>
        </Field>

        {/* Tags */}
        <FormField
          label="Tags"
          htmlFor="product-tags"
        >
          <Input
            id="product-tags"
            placeholder="Type and press enter to add tags"
          />
        </FormField>

        <FormField
          label="HSN/SAC Code"
          htmlFor="hsn-sac-code"
        >
          <Input
            id="hsn-sac-code"
            placeholder="Enter HSN/SAC Code"
          />
        </FormField>
      </div>
    </Card>
  );
}