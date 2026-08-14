import { Card, CardContent } from "@/components/base/card.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
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
  TrendingUp,
  Sliders,
  Percent,
  ShieldAlert,
  Truck,
  Info,
} from "lucide-react";

interface CustomerSalesPricingSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const PRICE_LISTS = ["Retail Price List", "Wholesale Price List", "Distributor Price List", "Special Price List"] as const;
const SALESPERSONS = ["John Smith", "Anjali Menon", "Sajith K.", "Priya Nair"] as const;
const GROUPS = ["Corporate", "Retail", "Individual", "Government", "Partner"] as const;
const CHANNELS = ["Direct Sales", "Online Store", "Retail Outlet", "Distributor Network", "Agent Referral"] as const;
const TAX_RATES = ["GST 0%", "GST 5%", "GST 12%", "GST 18%", "GST 28%", "Exempt"] as const;
const TAX_EXEMPTIONS = ["No Exemption", "SEZ Developer", "SEZ Unit", "Deemed Export", "UN Agency", "Other Exemption"] as const;
const ROUNDING_METHODS = ["Normal Rounding", "Round Up", "Round Down", "No Rounding"] as const;
const DISPLAY_PREFS = ["Tax Exclusive", "Tax Inclusive"] as const;
const DISCOUNT_TERMS = ["Within 10 days", "Within 15 days", "Within 30 days", "Cash On Delivery", "End of Month"] as const;
const VOLUME_DISCOUNTS = ["Based on Price List", "Tiered Quantity Discount", "Flat Annual Volume", "No Volume Discount"] as const;
const SPECIAL_PRICINGS = ["Customer Specific", "Group Specific", "Promotional", "None"] as const;
const WAREHOUSES = ["Main Warehouse", "Kozhikode Retail Yard", "Kochi Warehouse", "Bangalore Transit Hub"] as const;
const WAREHOUSE_ADDRESSES = ["Main Warehouse Address", "Kozhikode Yard Address", "Kochi Registered Address", "Bangalore Branch Address"] as const;
const PRIORITIES = ["Normal", "High", "Urgent", "Low"] as const;
const INCOTERMS = ["FOB - Free On Board", "CIF - Cost, Insurance & Freight", "EXW - Ex Works", "DDP - Delivered Duty Paid", "DAP - Delivered At Place"] as const;

export default function CustomerSalesPricingSection({
  formState,
  onChange,
  onSelectChange,
}: CustomerSalesPricingSectionProps) {
  return (
    <div className="space-y-6">
      {/* Sales & Pricing */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Sales & Pricing</h4>
              <p className="text-xs text-muted-foreground">Configure sales preferences, price lists and discount rules for this customer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Price List <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.priceList || "Retail Price List"}
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
              <FieldLabel>Salesperson</FieldLabel>
              <Combobox
                value={formState.salesperson || "John Smith"}
                onValueChange={(val) => onSelectChange("salesperson", val || "")}
                items={SALESPERSONS}
              >
                <ComboboxInput placeholder="Select salesperson" />
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
              <FieldLabel>Customer Group</FieldLabel>
              <Combobox
                value={formState.customerGroup || "Corporate"}
                onValueChange={(val) => onSelectChange("customerGroup", val || "")}
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
              <FieldLabel>Sales Channel</FieldLabel>
              <Combobox
                value={formState.salesChannel || "Direct Sales"}
                onValueChange={(val) => onSelectChange("salesChannel", val || "")}
                items={CHANNELS}
              >
                <ComboboxInput placeholder="Select sales channel" />
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

      {/* Pricing Preferences */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Sliders className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Pricing Preferences</h4>
              <p className="text-xs text-muted-foreground">Define how prices, discounts and taxes are applied for this customer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Default Tax</FieldLabel>
              <Combobox
                value={formState.defaultTax || "GST 18%"}
                onValueChange={(val) => onSelectChange("defaultTax", val || "")}
                items={TAX_RATES}
              >
                <ComboboxInput placeholder="Select tax rate" />
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
              <FieldLabel>Tax Exemption</FieldLabel>
              <Combobox
                value={formState.taxExemption || "No Exemption"}
                onValueChange={(val) => onSelectChange("taxExemption", val || "")}
                items={TAX_EXEMPTIONS}
              >
                <ComboboxInput placeholder="Select tax exemption" />
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
              <FieldLabel>Rounding Method</FieldLabel>
              <Combobox
                value={formState.roundingMethod || "Normal Rounding"}
                onValueChange={(val) => onSelectChange("roundingMethod", val || "")}
                items={ROUNDING_METHODS}
              >
                <ComboboxInput placeholder="Select rounding method" />
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
              <FieldLabel>Price Display Preference</FieldLabel>
              <Combobox
                value={formState.priceDisplayPreference || "Tax Exclusive"}
                onValueChange={(val) => onSelectChange("priceDisplayPreference", val || "")}
                items={DISPLAY_PREFS}
              >
                <ComboboxInput placeholder="Select price display" />
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
            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="allow-manual-price"
                checked={formState.allowManualPrice !== false}
                onCheckedChange={(c) => onSelectChange("allowManualPrice", c ? "true" : "false")}
              />
              <label
                htmlFor="allow-manual-price"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow Manual Price
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="allow-discount-pricing"
                checked={formState.allowDiscount !== false}
                onCheckedChange={(c) => onSelectChange("allowDiscount", c ? "true" : "false")}
              />
              <label
                htmlFor="allow-discount-pricing"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow Discount
              </label>
            </div>

            <Field>
              <FieldLabel>Maximum Discount %</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="maxDiscountPercent"
                  value={formState.maxDiscountPercent || "15.00"}
                  onChange={onChange}
                  placeholder="15.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="price-override-approval"
                checked={formState.priceOverrideApproval || false}
                onCheckedChange={(c) => onSelectChange("priceOverrideApproval", c ? "true" : "false")}
              />
              <label
                htmlFor="price-override-approval"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Price Override Approval
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discount Rules */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Percent className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Discount Rules</h4>
              <p className="text-xs text-muted-foreground">Set default discount behavior for this customer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Cash Discount %</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="cashDiscountPercentSales"
                  value={formState.cashDiscountPercentSales || "2.00"}
                  onChange={onChange}
                  placeholder="2.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Cash Discount Terms</FieldLabel>
              <Combobox
                value={formState.cashDiscountTermsSales || "Within 10 days"}
                onValueChange={(val) => onSelectChange("cashDiscountTermsSales", val || "")}
                items={DISCOUNT_TERMS}
              >
                <ComboboxInput placeholder="Select discount terms" />
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
              <FieldLabel>Volume Discount</FieldLabel>
              <Combobox
                value={formState.volumeDiscount || "Based on Price List"}
                onValueChange={(val) => onSelectChange("volumeDiscount", val || "")}
                items={VOLUME_DISCOUNTS}
              >
                <ComboboxInput placeholder="Select volume discount" />
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
              <FieldLabel>Special Pricing</FieldLabel>
              <Combobox
                value={formState.specialPricing || "Customer Specific"}
                onValueChange={(val) => onSelectChange("specialPricing", val || "")}
                items={SPECIAL_PRICINGS}
              >
                <ComboboxInput placeholder="Select special pricing" />
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

      {/* Sales Policies */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Sales Policies</h4>
              <p className="text-xs text-muted-foreground">Control sales behavior and order requirements.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="require-sales-order"
                checked={formState.requireSalesOrder || false}
                onCheckedChange={(c) => onSelectChange("requireSalesOrder", c ? "true" : "false")}
              />
              <label
                htmlFor="require-sales-order"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Require Sales Order
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="require-customer-po"
                checked={formState.requireCustomerPO !== false}
                onCheckedChange={(c) => onSelectChange("requireCustomerPO", c ? "true" : "false")}
              />
              <label
                htmlFor="require-customer-po"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Require Customer PO
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="allow-backdated-invoices"
                checked={formState.allowBackdatedInvoices !== false}
                onCheckedChange={(c) => onSelectChange("allowBackdatedInvoices", c ? "true" : "false")}
              />
              <label
                htmlFor="allow-backdated-invoices"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow Backdated Invoices
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="allow-credit-sales"
                checked={formState.allowCreditSales !== false}
                onCheckedChange={(c) => onSelectChange("allowCreditSales", c ? "true" : "false")}
              />
              <label
                htmlFor="allow-credit-sales"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow Credit Sales
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3">
            <Field>
              <FieldLabel>Minimum Order Amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>₹</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="minOrderAmount"
                  value={formState.minOrderAmount || "10000.00"}
                  onChange={onChange}
                  placeholder="10,000.00"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Minimum Invoice Amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>₹</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="minInvoiceAmount"
                  value={formState.minInvoiceAmount || "5000.00"}
                  onChange={onChange}
                  placeholder="5,000.00"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Lead Time (Days)</FieldLabel>
              <Input
                name="leadTimeDays"
                value={formState.leadTimeDays || "2"}
                onChange={onChange}
                placeholder="2"
              />
            </Field>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="partial-delivery"
                checked={formState.partialDelivery !== false}
                onCheckedChange={(c) => onSelectChange("partialDelivery", c ? "true" : "false")}
              />
              <label
                htmlFor="partial-delivery"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Allow Partial Delivery
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse & Fulfillment */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Truck className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Warehouse & Fulfillment</h4>
              <p className="text-xs text-muted-foreground">Configure default fulfillment settings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Default Warehouse</FieldLabel>
              <Combobox
                value={formState.defaultWarehouse || "Main Warehouse"}
                onValueChange={(val) => onSelectChange("defaultWarehouse", val || "")}
                items={WAREHOUSES}
              >
                <ComboboxInput placeholder="Select warehouse" />
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
              <FieldLabel>Ship From Address</FieldLabel>
              <Combobox
                value={formState.shipFromAddress || "Main Warehouse Address"}
                onValueChange={(val) => onSelectChange("shipFromAddress", val || "")}
                items={WAREHOUSE_ADDRESSES}
              >
                <ComboboxInput placeholder="Select shipping address" />
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
              <FieldLabel>Delivery Priority</FieldLabel>
              <Combobox
                value={formState.deliveryPriority || "Normal"}
                onValueChange={(val) => onSelectChange("deliveryPriority", val || "")}
                items={PRIORITIES}
              >
                <ComboboxInput placeholder="Select priority" />
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
              <FieldLabel>Incoterms</FieldLabel>
              <Combobox
                value={formState.incoterms || "FOB - Free On Board"}
                onValueChange={(val) => onSelectChange("incoterms", val || "")}
                items={INCOTERMS}
              >
                <ComboboxInput placeholder="Select Incoterms" />
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

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            <p>These sales and pricing settings will be applied to all transactions for this customer unless overridden.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
