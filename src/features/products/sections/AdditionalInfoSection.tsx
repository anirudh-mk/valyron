import { useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Field,
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

export default function AdditionalInfoSection() {
  const [shortDesc, setShortDesc] = useState("Apple MacBook Pro 14-inch M3 chip, 8GB RAM, 512GB SSD, Space Gray");
  const [longDesc, setLongDesc] = useState(
    "MacBook Pro 14-inch with M3 chip, delivers exceptional performance and efficiency for professionals. Features: 8-core CPU, 10-core GPU, 8GB unified memory, 512GB SSD storage, Liquid Retina XDR display, Backlit Magic Keyboard, Force Touch trackpad and more."
  );

  return (
    <div className="space-y-4">
      {/* Card 1: Product Details */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Settings2 className="size-4" />
          </div>
          <h2 className="text-sm font-semibold">Product Details</h2>
        </div>

        {/* Row 1: SKU, Barcode, HSN, UPC */}
        <div className="grid grid-cols-4 gap-4">
          <Field>
            <FieldLabel htmlFor="info-sku">
              SKU
              <span className="text-destructive">*</span>
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
            <FieldDescription>For tax & customs</FieldDescription>
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
            <Select defaultValue="physical">
              <SelectTrigger id="info-type">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="info-group">Item Group</FieldLabel>
            <Select defaultValue="laptops">
              <SelectTrigger id="info-group">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="mobiles">Mobiles</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="info-uom">
              UOM (Base Unit)
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select defaultValue="piece">
              <SelectTrigger id="info-uom">
                <SelectValue placeholder="Select UOM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piece">Piece</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="kg">KG</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="info-sales-uom">Sales UOM</FieldLabel>
            <Select defaultValue="piece">
              <SelectTrigger id="info-sales-uom">
                <SelectValue placeholder="Select Sales UOM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piece">Piece</SelectItem>
                <SelectItem value="box">Box</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Switch id="same-uom-toggle" defaultChecked />
              <label htmlFor="same-uom-toggle" className="text-[10px] text-muted-foreground font-medium cursor-pointer">
                Same as base unit
              </label>
            </div>
          </Field>
        </div>

        {/* Row 3: Country, Manufacturer, Brand, Model */}
        <div className="grid grid-cols-4 gap-4">
          <Field>
            <FieldLabel htmlFor="info-country">Country of Origin</FieldLabel>
            <Select defaultValue="china">
              <SelectTrigger id="info-country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
              </SelectContent>
            </Select>
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
            <FieldLabel htmlFor="info-warranty">Warranty Period (Months)</FieldLabel>
            <Input id="info-warranty" type="number" defaultValue="12" />
            <FieldDescription>0 if no warranty</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="info-weight">Weight (kg)</FieldLabel>
            <Input id="info-weight" type="number" step="0.01" defaultValue="1.55" />
          </Field>

          <Field>
            <FieldLabel>Dimension (L × W × H cm)</FieldLabel>
            <div className="grid grid-cols-3 gap-1">
              <Input placeholder="L" defaultValue="31.26" className="text-center text-xs px-1" />
              <Input placeholder="W" defaultValue="22.12" className="text-center text-xs px-1" />
              <Input placeholder="H" defaultValue="1.55" className="text-center text-xs px-1" />
            </div>
          </Field>
        </div>
      </Card>

      {/* Card 2: Descriptions */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <FileText className="size-4" />
          </div>
          <h2 className="text-sm font-semibold">Descriptions</h2>
        </div>

        {/* Short Description */}
        <Field>
          <FieldLabel htmlFor="short-description">Short Description</FieldLabel>
          <Textarea
            id="short-description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="text-xs min-h-[50px] resize-none"
            maxLength={160}
          />
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
            <span>Brief description shown in lists and search results (max 160 characters)</span>
            <span>{shortDesc.length} / 160</span>
          </div>
        </Field>

        {/* Detailed Description */}
        <Field>
          <FieldLabel htmlFor="detailed-description">Detailed Description</FieldLabel>

          {/* Text Editor Layout */}
          <div className="border border-border rounded-lg overflow-hidden bg-background">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-1 p-1.5 border-b border-border bg-muted/20">
              {/* Paragraph Select */}
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold hover:bg-muted rounded text-foreground border border-border bg-background"
                onClick={(e) => e.preventDefault()}
              >
                <span>Paragraph</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>

              <div className="w-[1px] h-4 bg-border self-center mx-1" />

              {/* Text formatting */}
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><Bold className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><Italic className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><Underline className="size-3.5" /></button>

              <div className="w-[1px] h-4 bg-border self-center mx-1" />

              {/* Lists */}
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><List className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><ListOrdered className="size-3.5" /></button>

              <div className="w-[1px] h-4 bg-border self-center mx-1" />

              {/* Align & Media */}
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><AlignJustify className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><Link2 className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><ImageIcon className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><TableIcon className="size-3.5" /></button>
              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><AlignLeft className="size-3.5" /></button>

              <div className="w-[1px] h-4 bg-border self-center mx-1" />

              <button type="button" className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground" onClick={(e) => e.preventDefault()}><MoreHorizontal className="size-3.5" /></button>
            </div>

            {/* Editable Text Area */}
            <Textarea
              id="detailed-description"
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 min-h-[100px] text-xs resize-y p-3 bg-transparent rounded-none"
              maxLength={2000}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
            <span>Detailed product information for customers.</span>
            <span>{longDesc.length} / 2000</span>
          </div>
        </Field>
      </Card>

      {/* Card 3: Additional Options */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <AlignLeft className="size-4" />
          </div>
          <h2 className="text-sm font-semibold">Additional Options</h2>
        </div>

        {/* 3 Columns of Toggles/Inputs */}
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

            <Field className="flex-row items-center justify-between gap-2">
              <FieldLabel htmlFor="visibility-branch" className="text-xs font-semibold shrink-0 cursor-pointer">
                Visibility
              </FieldLabel>
              <Select defaultValue="all">
                <SelectTrigger id="visibility-branch" className="h-7 text-[10px] w-[110px] py-1">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="main">Main Branch</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>
      </Card>
    </div>
  );
}
