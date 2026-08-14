import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import { Separator } from "@/components/base/separator.tsx";
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
  FieldContent,
  FieldDescription,
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
  Tag,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  X,
  Info,
  MoreHorizontal,
} from "lucide-react";

export interface SupplierItemPricing {
  id: string;
  itemGroup: string;
  itemCode: string;
  uom: string;
  standardPrice: string;
  discountPercent: string;
  effectiveFrom: string;
  effectiveTo: string;
}

interface SupplierPurchasingPricingSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  itemPricing: SupplierItemPricing[];
  onAddItemPricing: (item: Omit<SupplierItemPricing, "id">) => void;
  onDeleteItemPricing: (id: string) => void;
  onUpdateItemPricing: (id: string, field: keyof SupplierItemPricing, value: any) => void;
}

const UOMS = ["Nos", "Kg", "Ltr", "Mtr", "Box", "Set"] as const;
const CURRENCIES = ["INR", "USD", "EUR", "GBP"] as const;
const CONFIRM_METHODS = ["By Email", "By Phone", "By Portal", "By Fax"] as const;
const CONFIRM_REQS = ["For All Orders", "Above Threshold", "For Special Items", "No Confirmation"] as const;
const INCOTERMS = ["FOB", "CIF", "EXW", "DDP", "DAP"] as const;
const FREIGHT_TERMS = ["To Pay", "Prepaid", "Collect", "Third Party"] as const;
const PAYMENT_TERMS = ["Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"] as const;
const REVISION_FREQS = ["Monthly", "Quarterly", "Bi-Annually", "Annually", "Custom"] as const;
const CURRENCY_LIST = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;

const PRICE_LISTS = ["Default Supplier Price List", "Standard Supplier Price List", "Wholesale Price List"] as const;
const PRICING_BASIS_OPTIONS = ["Item Wise", "Category Wise", "Volume Based"] as const;
const DISCOUNT_STRUCTURES = ["Item Discount", "Invoice Discount", "Tiered Discount"] as const;

export default function SupplierPurchasingPricingSection({
  formState,
  onChange,
  onSelectChange,
  itemPricing,
  onAddItemPricing,
  onDeleteItemPricing,
  onUpdateItemPricing,
}: SupplierPurchasingPricingSectionProps) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemGroup, setItemGroup] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [uom, setUom] = useState("Nos");
  const [standardPrice, setStandardPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("0.00");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");

  const handleSaveItem = () => {
    if (!itemGroup.trim() || !itemCode.trim() || !standardPrice.trim()) return;
    onAddItemPricing({
      itemGroup,
      itemCode,
      uom,
      standardPrice,
      discountPercent,
      effectiveFrom: effectiveFrom || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      effectiveTo: effectiveTo || "—",
    });
    setItemGroup("");
    setItemCode("");
    setUom("Nos");
    setStandardPrice("");
    setDiscountPercent("0.00");
    setEffectiveFrom("");
    setEffectiveTo("");
    setIsAddingItem(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Purchasing Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Tag className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Purchasing Information</h4>
              <p className="text-xs text-muted-foreground">Define purchasing preferences and terms for this supplier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field>
              <FieldLabel>Default Purchase UOM</FieldLabel>
              <Combobox
                value={formState.purchaseUom || "Nos"}
                onValueChange={(val) => onSelectChange("purchaseUom", val || "")}
                items={UOMS}
              >
                <ComboboxInput placeholder="Select UOM" />
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
              <FieldLabel>Minimum Order Value</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Combobox
                    value={formState.minOrderValueCurrency || "INR"}
                    onValueChange={(val) => onSelectChange("minOrderValueCurrency", val || "")}
                    items={CURRENCIES}
                  >
                    <ComboboxInput placeholder="INR" className="h-9 border-none w-14 bg-muted text-xs font-semibold px-2" />
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
                </InputGroupAddon>
                <InputGroupInput
                  name="minOrderValue"
                  value={formState.minOrderValue}
                  onChange={onChange}
                  placeholder="5,000.00"
                />
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">Minimum order amount</span>
            </Field>

            <Field>
              <FieldLabel>Lead Time (Days)</FieldLabel>
              <Input
                name="leadTimeDays"
                value={formState.leadTimeDays}
                onChange={onChange}
                placeholder="7"
              />
              <span className="text-[10px] text-muted-foreground mt-1 block">Expected delivery time</span>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Confirming Order</FieldLabel>
              <Combobox
                value={formState.confirmingOrder || "By Email"}
                onValueChange={(val) => onSelectChange("confirmingOrder", val || "")}
                items={CONFIRM_METHODS}
              >
                <ComboboxInput placeholder="Select method" />
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

            <div className="flex flex-col pt-2 gap-1 justify-center">
              <div className="flex items-center gap-2">
                <Switch
                  id="acknowledgement-required-switch"
                  checked={formState.orderAcknowledgementRequired !== false}
                  onCheckedChange={(c) => onSelectChange("orderAcknowledgementRequired", c ? "true" : "false")}
                />
                <label
                  htmlFor="acknowledgement-required-switch"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Order Acknowledgement Required
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Yes</span>
            </div>

            <Field>
              <FieldLabel>Acknowledgement Within (Days)</FieldLabel>
              <Input
                name="acknowledgementWithinDays"
                value={formState.acknowledgementWithinDays || "2"}
                onChange={onChange}
                placeholder="2"
                disabled={formState.orderAcknowledgementRequired === "false" || formState.orderAcknowledgementRequired === false}
              />
            </Field>

            <Field>
              <FieldLabel>Supplier Confirmation Required</FieldLabel>
              <Combobox
                value={formState.supplierConfirmationRequired || "For All Orders"}
                onValueChange={(val) => onSelectChange("supplierConfirmationRequired", val || "")}
                items={CONFIRM_REQS}
              >
                <ComboboxInput placeholder="Select requirement" />
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
              <FieldLabel>Incoterms</FieldLabel>
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

            <Field>
              <FieldLabel>Freight Terms</FieldLabel>
              <Combobox
                value={formState.freightTerms || "To Pay"}
                onValueChange={(val) => onSelectChange("freightTerms", val || "")}
                items={FREIGHT_TERMS}
              >
                <ComboboxInput placeholder="Select Freight Terms" />
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
                id="inspection-required-switch"
                checked={formState.inspectionRequired === true || formState.inspectionRequired === "true"}
                onCheckedChange={(c) => onSelectChange("inspectionRequired", c ? "true" : "false")}
              />
              <label
                htmlFor="inspection-required-switch"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Inspection Required
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="quality-check-required-switch"
                checked={formState.qualityCheckRequired !== false}
                onCheckedChange={(c) => onSelectChange("qualityCheckRequired", c ? "true" : "false")}
              />
              <label
                htmlFor="quality-check-required-switch"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Quality Check Required
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Preferred Payment Terms</FieldLabel>
              <Combobox
                value={formState.paymentTerms || "Net 30"}
                onValueChange={(val) => onSelectChange("paymentTerms", val || "")}
                items={PAYMENT_TERMS}
              >
                <ComboboxInput placeholder="Select terms" />
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
              <FieldLabel>Price Validity (Days)</FieldLabel>
              <Input
                name="priceValidityDays"
                value={formState.priceValidityDays || "30"}
                onChange={onChange}
                placeholder="30"
              />
            </Field>

            <Field>
              <FieldLabel>Rate Revision Frequency</FieldLabel>
              <Combobox
                value={formState.rateRevisionFrequency || "Monthly"}
                onValueChange={(val) => onSelectChange("rateRevisionFrequency", val || "")}
                items={REVISION_FREQS}
              >
                <ComboboxInput placeholder="Select frequency" />
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
              <FieldLabel>Preferred Currency</FieldLabel>
              <Combobox
                value={formState.currency || "INR - Indian Rupee"}
                onValueChange={(val) => onSelectChange("currency", val || "")}
                items={CURRENCY_LIST}
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
          </div>
        </CardContent>
      </Card>

      {/* 2. Pricing Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Pricing Information</h4>
              <p className="text-xs text-muted-foreground">Define pricing behavior and price list for this supplier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <Field>
              <FieldLabel>Price List</FieldLabel>
              <Combobox
                value={formState.priceList || "Default Supplier Price List"}
                onValueChange={(val) => onSelectChange("priceList", val || "")}
                items={PRICE_LISTS}
              >
                <ComboboxInput placeholder="Select price list" />
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
              <FieldLabel>Pricing Basis</FieldLabel>
              <Combobox
                value={formState.pricingBasis || "Item Wise"}
                onValueChange={(val) => onSelectChange("pricingBasis", val || "")}
                items={PRICING_BASIS_OPTIONS}
              >
                <ComboboxInput placeholder="Select pricing basis" />
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
              <FieldLabel>Discount Structure</FieldLabel>
              <Combobox
                value={formState.discountStructure || "Item Discount"}
                onValueChange={(val) => onSelectChange("discountStructure", val || "")}
                items={DISCOUNT_STRUCTURES}
              >
                <ComboboxInput placeholder="Select discount structure" />
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

            <div className="flex flex-col pt-1 gap-1">
              <div className="flex items-center gap-2">
                <Switch
                  id="tax-exclusive-pricing-switch"
                  checked={formState.taxExclusivePricing !== false}
                  onCheckedChange={(checked) => onSelectChange("taxExclusivePricing", checked ? "true" : "false")}
                />
                <div className="flex items-baseline gap-1.5">
                  <label
                    htmlFor="tax-exclusive-pricing-switch"
                    className="text-xs font-semibold text-foreground cursor-pointer select-none"
                  >
                    Tax Exclusive Pricing
                  </label>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {formState.taxExclusivePricing !== false ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Prices do not include tax</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Item Pricing (Optional) */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Item Pricing (Optional)</h4>
              <p className="text-xs text-muted-foreground">Define default pricing for items or item groups from this supplier.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingItem(true)}
                className="text-xs font-semibold gap-1.5 h-8.5"
                type="button"
              >
                <Plus className="h-4 w-4" /> Add Item Pricing
              </Button>
              <Button variant="ghost" size="icon-sm" type="button" className="h-8.5 w-8.5">
                <MoreHorizontal className="h-4.5 w-4.5" />
              </Button>
            </div>
          </div>

          {/* Add Item Pricing Form inline drawer */}
          {isAddingItem && (
            <Card className="bg-muted/40 border border-border/40 p-4 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  New Item Pricing
                </h5>
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Field>
                  <FieldLabel>Item / Item Group</FieldLabel>
                  <Input
                    value={itemGroup}
                    onChange={(e) => setItemGroup(e.target.value)}
                    placeholder="e.g., Stainless Steel Sheet"
                  />
                </Field>
                <Field>
                  <FieldLabel>Item Code</FieldLabel>
                  <Input
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                    placeholder="e.g., SS-SHEET-001"
                  />
                </Field>
                <Field>
                  <FieldLabel>UOM</FieldLabel>
                  <Combobox
                    value={uom}
                    onValueChange={(val) => setUom(val || "Nos")}
                    items={UOMS}
                  >
                    <ComboboxInput placeholder="Select UOM" className="h-9 text-xs" />
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
                </Field>
                <Field>
                  <FieldLabel>Standard Price (INR)</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupText>₹</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      value={standardPrice}
                      onChange={(e) => setStandardPrice(e.target.value)}
                      placeholder="850.00"
                    />
                  </InputGroup>
                </Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Discount (%)</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      placeholder="5.00"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel>Effective From</FieldLabel>
                  <Input
                    value={effectiveFrom}
                    onChange={(e) => setEffectiveFrom(e.target.value)}
                    placeholder="e.g., 01 Apr 2024"
                  />
                </Field>
                <Field>
                  <FieldLabel>Effective To</FieldLabel>
                  <Input
                    value={effectiveTo}
                    onChange={(e) => setEffectiveTo(e.target.value)}
                    placeholder="e.g., 31 Mar 2025"
                  />
                </Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingItem(false)}
                  type="button"
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveItem}
                  type="button"
                  className="text-xs"
                >
                  Save Item Pricing
                </Button>
              </div>
            </Card>
          )}

          {/* Pricing Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-b border-border/30 h-10">
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[24%]">Item / Item Group</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[16%]">Item Code</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[10%]">UOM</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[16%]">Standard Price (INR)</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[12%]">Discount (%)</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[12%]">Effective From</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[12%]">Effective To</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground h-10 w-[60px] text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemPricing.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-20 text-center text-xs text-muted-foreground">
                      No item pricing defined yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  itemPricing.map((item) => (
                    <TableRow key={item.id} className="hover:bg-accent/10 border-b border-border/30 h-11">
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold">
                        {item.itemGroup}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold font-mono">
                        {item.itemCode}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-semibold">
                        {item.uom}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-bold font-mono">
                        {`₹ ${parseFloat(item.standardPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-foreground font-semibold font-mono">
                        {`${parseFloat(item.discountPercent).toFixed(2)}`}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-semibold font-mono">
                        {item.effectiveFrom}
                      </TableCell>
                      <TableCell className="py-2.5 text-xs text-muted-foreground font-semibold font-mono">
                        {item.effectiveTo}
                      </TableCell>
                      <TableCell className="py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-foreground text-muted-foreground transition-colors cursor-pointer"
                            title="Edit pricing"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteItemPricing(item.id)}
                            className="hover:bg-accent p-1.5 rounded-sm hover:text-destructive text-muted-foreground transition-colors cursor-pointer"
                            title="Delete pricing"
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

          <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-muted-foreground font-medium">
            <span>
              Showing 1 to {itemPricing.length} of {itemPricing.length} items
            </span>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1.5">
                <span>Show</span>
                <span className="bg-muted py-1 px-2.5 rounded-md border border-border/30 font-semibold text-foreground">
                  10 / page
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled
                  className="bg-primary text-primary-foreground font-bold h-7 w-7 rounded-md flex items-center justify-center"
                >
                  1
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info banner */}
      <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
        <Info className="h-4.5 w-4.5 shrink-0" />
        <p>These purchasing and pricing settings will be used as default for purchase transactions with this supplier.</p>
      </div>
    </div>
  );
}
