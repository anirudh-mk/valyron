import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field.tsx";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox.tsx";
import {
  FileText,
  AlignLeft,
  Settings2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
const productTypeOptions = ["Physical", "Service", "Digital"] as const;
const itemGroupOptions = ["Laptops", "Mobiles", "Accessories"] as const;
const uomOptions = ["Piece", "Box", "KG"] as const;
const salesUomOptions = ["Piece", "Box"] as const;
const countryOptions = ["India", "China", "USA"] as const;
const visibilityOptions = ["All Branches", "Main Branch"] as const;

export default function AdditionalInfoSection() {
  const [shortDesc, setShortDesc] = useState(
    "Apple MacBook Pro 14-inch M3 chip, 8GB RAM, 512GB SSD, Space Gray"
  );
  const [longDesc, setLongDesc] = useState(
    "MacBook Pro 14-inch with M3 chip, delivers exceptional performance and efficiency for professionals. Features: 8-core CPU, 10-core GPU, 8GB unified memory, 512GB SSD storage, Liquid Retina XDR display, Backlit Magic Keyboard, Force Touch trackpad and more."
  );


  return (
    <section className="space-y-4">
      {/* Card 1: Product Details */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Settings2 className="size-4" />
          </span>
          <CardTitle className="text-sm">Product Details</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Row 1: SKU, Barcode, HSN, UPC */}
          <div className="grid grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="info-sku">
                SKU <span className="text-destructive">*</span>
              </FieldLabel>
              <Input id="info-sku" defaultValue="MBP-M3-14" />
              <FieldDescription>Unique stock keeping unit</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="info-barcode">Barcode</FieldLabel>
              <Input id="info-barcode" defaultValue="8901234567890" />
              <FieldDescription>Scan barcode for this product</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="info-hsn">HSN / SAC Code</FieldLabel>
              <Input id="info-hsn" defaultValue="84713010" />
              <FieldDescription>For tax &amp; customs</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="info-upc">UPC / GTIN</FieldLabel>
              <Input id="info-upc" defaultValue="890123456789" />
              <FieldDescription>Universal product code</FieldDescription>
            </Field>
          </div>

          {/* Row 2: Product Type, Item Group, UOM, Sales UOM */}
          <div className="grid grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="info-type">Product Type</FieldLabel>
              <Combobox items={productTypeOptions}>
                <ComboboxInput id="info-type" placeholder="Select type" />
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
              <FieldLabel htmlFor="info-group">Item Group</FieldLabel>
              <Combobox items={itemGroupOptions}>
                <ComboboxInput id="info-group" placeholder="Select group" />
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
              <FieldLabel htmlFor="info-uom">
                UOM (Base Unit) <span className="text-destructive">*</span>
              </FieldLabel>
              <Combobox items={uomOptions}>
                <ComboboxInput id="info-uom" placeholder="Select UOM" />
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
              <FieldLabel htmlFor="info-sales-uom">Sales UOM</FieldLabel>
              <Combobox items={salesUomOptions}>
                <ComboboxInput id="info-sales-uom" placeholder="Select sales UOM" />
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
              <label
                htmlFor="same-uom-toggle"
                className="flex items-center gap-1.5 mt-1.5 cursor-pointer"
              >
                <Switch id="same-uom-toggle" defaultChecked />
                <span className="text-[10px] text-muted-foreground font-medium">
                  Same as base unit
                </span>
              </label>
            </Field>
          </div>

          {/* Row 3: Country, Manufacturer, Brand, Model */}
          <div className="grid grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="info-country">Country of Origin</FieldLabel>
              <Combobox items={countryOptions}>
                <ComboboxInput id="info-country" placeholder="Select country" />
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
              <FieldLabel htmlFor="info-manufacturer">Manufacturer</FieldLabel>
              <Input id="info-manufacturer" defaultValue="Apple Inc." />
            </Field>

            <Field>
              <FieldLabel htmlFor="info-brand">Brand</FieldLabel>
              <Input id="info-brand" defaultValue="Apple" />
            </Field>

            <Field>
              <FieldLabel htmlFor="info-model">Model</FieldLabel>
              <Input id="info-model" defaultValue='MacBook Pro M3 14"' />
            </Field>
          </div>

          {/* Row 4: Shelf Life, Warranty, Weight, Dimension */}
          <div className="grid grid-cols-4 gap-4">
            <Field>
              <FieldLabel htmlFor="info-shelf">Shelf Life (Days)</FieldLabel>
              <Input id="info-shelf" type="number" defaultValue="0" />
              <FieldDescription>0 for non-perishable items</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="info-warranty">
                Warranty Period (Months)
              </FieldLabel>
              <Input id="info-warranty" type="number" defaultValue="12" />
              <FieldDescription>0 if no warranty</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="info-weight">Weight (kg)</FieldLabel>
              <Input
                id="info-weight"
                type="number"
                step="0.01"
                defaultValue="1.55"
              />
            </Field>

            <Field>
              <FieldLabel>Dimension (L × W × H cm)</FieldLabel>
              <div className="grid grid-cols-3 gap-1">
                <Input
                  placeholder="L"
                  defaultValue="31.26"
                  className="text-center text-xs px-1"
                />
                <Input
                  placeholder="W"
                  defaultValue="22.12"
                  className="text-center text-xs px-1"
                />
                <Input
                  placeholder="H"
                  defaultValue="1.55"
                  className="text-center text-xs px-1"
                />
              </div>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Descriptions */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <FileText className="size-4" />
          </span>
          <CardTitle className="text-sm">Descriptions</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Short Description */}
          <Field>
            <FieldLabel htmlFor="short-description">
              Short Description
            </FieldLabel>
            <Textarea
              id="short-description"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="text-xs min-h-[50px] resize-none"
              maxLength={160}
            />
            <p className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
              <span>
                Brief description shown in lists and search results (max 160
                characters)
              </span>
              <span>{shortDesc.length} / 160</span>
            </p>
          </Field>

          {/* Detailed Description */}
          <Field>
            <FieldLabel htmlFor="detailed-description">
              Detailed Description
            </FieldLabel>

            <div className="border border-border rounded-lg overflow-hidden bg-background">
              {/* Toolbar */}
              <div className="flex items-center flex-wrap gap-1 p-1.5 border-b border-border bg-muted/20">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  className="gap-1 font-semibold text-xs"
                >
                  Paragraph
                  <ChevronDown className="size-3 text-muted-foreground" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                <Button type="button" variant="ghost" size="icon-xs">
                  <Bold className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <Italic className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <Underline className="size-3.5" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                <Button type="button" variant="ghost" size="icon-xs">
                  <List className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <ListOrdered className="size-3.5" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                <Button type="button" variant="ghost" size="icon-xs">
                  <AlignJustify className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <Link2 className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <ImageIcon className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <TableIcon className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs">
                  <AlignLeft className="size-3.5" />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1" />

                <Button type="button" variant="ghost" size="icon-xs">
                  <MoreHorizontal className="size-3.5" />
                </Button>
              </div>

              {/* Editable Area */}
              <Textarea
                id="detailed-description"
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 min-h-[100px] text-xs resize-y p-3 bg-transparent rounded-none"
                maxLength={2000}
              />
            </div>

            <p className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
              <span>Detailed product information for customers.</span>
              <span>{longDesc.length} / 2000</span>
            </p>
          </Field>
        </CardContent>
      </Card>

      {/* Card 3: Additional Options */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <AlignLeft className="size-4" />
          </span>
          <CardTitle className="text-sm">Additional Options</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="track-serial" className="text-xs font-semibold cursor-pointer">
                  Track Serial / IMEI
                </FieldLabel>
                <Switch id="track-serial" />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="batch-tracking" className="text-xs font-semibold cursor-pointer">
                  Batch Tracking
                </FieldLabel>
                <Switch id="batch-tracking" />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="expiry-tracking" className="text-xs font-semibold cursor-pointer">
                  Expiry Tracking
                </FieldLabel>
                <Switch id="expiry-tracking" />
              </Field>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="neg-stock" className="text-xs font-semibold cursor-pointer">
                  Allow Negative Stock
                </FieldLabel>
                <Switch id="neg-stock" />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="is-returnable" className="text-xs font-semibold cursor-pointer">
                  Is Returnable
                </FieldLabel>
                <Switch id="is-returnable" defaultChecked />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="is-bom" className="text-xs font-semibold cursor-pointer">
                  Is Bill of Material
                </FieldLabel>
                <Switch id="is-bom" />
              </Field>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="is-kit" className="text-xs font-semibold cursor-pointer">
                  Is Kit / Bundle
                </FieldLabel>
                <Switch id="is-kit" />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="add-active" className="text-xs font-semibold cursor-pointer">
                  Is Active
                </FieldLabel>
                <Switch id="add-active" defaultChecked />
              </Field>

              <Field orientation="horizontal" className="items-center justify-between">
                <FieldLabel htmlFor="visibility-branch" className="text-xs font-semibold cursor-pointer">
                  Visibility
                </FieldLabel>
                <Combobox items={visibilityOptions}>
                  <ComboboxInput id="visibility-branch" placeholder="Visibility" />
                  <ComboboxContent side="top" align="start">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
