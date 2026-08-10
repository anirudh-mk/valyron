import { Input } from "@/components/ui/input.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus, ScanBarcode, Settings } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { UnitConfiguration } from "@/features/products/components/UnitConfiguration.tsx";
import { Switch } from "@/components/ui/switch.tsx";

export default function BasicInformationSection() {
  return (
    <Card className="p-6 gap-4">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">

        {/* Product Name */}
        <Field>
          <FieldLabel htmlFor="product-name">
            Product Name
            <span className="text-destructive">*</span>
          </FieldLabel>

          <Input
            id="product-name"
            placeholder="Enter product name"
            required
          />
        </Field>

        {/* SKU */}
        <Field>
          <FieldLabel htmlFor="product-sku">
            SKU
            <span className="text-destructive">*</span>
          </FieldLabel>

          <ButtonGroup>
            <Input
              id="product-sku"
              placeholder="Enter SKU"
              required
            />

            <Button
              type="button"
              variant="outline"
              aria-label="SKU settings"
            >
              <Settings />
            </Button>
          </ButtonGroup>
        </Field>

        {/* Barcode */}
        <Field>
          <FieldLabel htmlFor="product-barcode">
            Barcode
          </FieldLabel>

          <ButtonGroup>
            <Input
              id="product-barcode"
              placeholder="Enter Barcode"
            />

            <Button
              type="button"
              variant="outline"
              aria-label="Scan barcode"
            >
              <ScanBarcode />
            </Button>
          </ButtonGroup>
        </Field>

        {/* Category */}
        <Field>
          <FieldLabel htmlFor="product-category">
            Category
            <span className="text-destructive">*</span>
          </FieldLabel>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger
                id="product-category"
                className="flex-1"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add category"
            >
              <Plus />
            </Button>
          </div>
        </Field>

        {/* Product Type */}
        <Field>
          <FieldLabel htmlFor="product-type">
            Product Type
          </FieldLabel>

          <Select>
            <SelectTrigger
              id="product-type"
              className="flex-1"
            >
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {/* Brand / Manufacturer */}
        <Field>
          <FieldLabel htmlFor="product-brand">
            Brand/Manufacturer
          </FieldLabel>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger
                id="product-brand"
                className="flex-1"
              >
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add brand"
            >
              <Plus />
            </Button>
          </div>
        </Field>
      </div>

      {/* Product Description */}
      <Field>
        <FieldLabel htmlFor="product-description">
          Product Description
        </FieldLabel>

        <Textarea
          id="product-description"
          placeholder="Enter Product Description..."
        />
      </Field>

      {/* Units */}
      <div className="grid grid-cols-3 grid-rows-1 gap-4">

        {/* Sales Unit */}
        <Field>
          <FieldLabel htmlFor="sales-unit">
            Sales Unit
            <span className="text-destructive">*</span>
          </FieldLabel>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger
                id="sales-unit"
                className="flex-1"
              >
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add sales unit"
            >
              <Plus />
            </Button>
          </div>
        </Field>

        {/* Purchase Unit */}
        <Field>
          <FieldLabel htmlFor="purchase-unit">
            Purchase Unit
          </FieldLabel>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger
                id="purchase-unit"
                className="flex-1"
              >
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Add purchase unit"
            >
              <Plus />
            </Button>
          </div>
        </Field>

        <UnitConfiguration />
      </div>

      {/* Product Settings */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4">

        {/* Track Inventory */}
        <Field orientation="horizontal" className="max-w-sm">
          <Switch id="track-inventory" />

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
          <Switch id="is-active" />

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
        <Field>
          <FieldLabel htmlFor="product-tags">
            Tags
          </FieldLabel>

          <Input
            id="product-tags"
            placeholder="Type and press enter to add tags"
          />
        </Field>

        {/* HSN / SAC */}
        <Field>
          <FieldLabel htmlFor="hsn-sac-code">
            HSN/SAC Code
          </FieldLabel>

          <Input
            id="hsn-sac-code"
            placeholder="Enter HSN/SAC Code"
          />
        </Field>
      </div>
    </Card>
  );
}