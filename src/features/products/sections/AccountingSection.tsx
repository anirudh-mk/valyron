import { useState } from "react";
import { Card } from "@/components/ui/card.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group.tsx";
import { FileSpreadsheet, Calculator, Settings2, IndianRupee } from "lucide-react";

export default function AccountingSection() {
  const [valuationMethod, setValuationMethod] = useState("weighted-average");
  const [isService, setIsService] = useState(false);

  return (
    <div className="space-y-4">
      {/* Card 1: Accounting Information */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <FileSpreadsheet className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Accounting Information</h2>
            <p className="text-xs text-muted-foreground">Configure how this product will be recorded in your accounts.</p>
          </div>
        </div>

        {/* Row 1: Income, Expense, Inventory Asset */}
        <div className="grid grid-cols-3 gap-4">
          {/* Income Account */}
          <Field>
            <FieldLabel htmlFor="income-account">
              Income Account
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select defaultValue="sales-goods">
              <SelectTrigger id="income-account" className="h-14 py-2 flex flex-col items-start justify-center gap-0 text-left">
                <span className="text-xs font-semibold">Sales of Goods</span>
                <span className="text-[10px] text-muted-foreground">4001</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales-goods">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Sales of Goods</span>
                    <span className="text-[10px] text-muted-foreground">4001</span>
                  </div>
                </SelectItem>
                <SelectItem value="other-income">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Other Income</span>
                    <span className="text-[10px] text-muted-foreground">4002</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Expense Account */}
          <Field>
            <FieldLabel htmlFor="expense-account">
              Expense Account
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select defaultValue="cogs">
              <SelectTrigger id="expense-account" className="h-14 py-2 flex flex-col items-start justify-center gap-0 text-left">
                <span className="text-xs font-semibold">Cost of Goods Sold</span>
                <span className="text-[10px] text-muted-foreground">5001</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cogs">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Cost of Goods Sold</span>
                    <span className="text-[10px] text-muted-foreground">5001</span>
                  </div>
                </SelectItem>
                <SelectItem value="purchase-expense">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Purchase Expense</span>
                    <span className="text-[10px] text-muted-foreground">5002</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Inventory Asset Account */}
          <Field>
            <FieldLabel htmlFor="inventory-asset-account">
              Inventory Asset Account
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Select defaultValue="trading-goods" disabled={isService}>
              <SelectTrigger id="inventory-asset-account" className="h-14 py-2 flex flex-col items-start justify-center gap-0 text-left">
                <span className="text-xs font-semibold">Inventory - Trading Goods</span>
                <span className="text-[10px] text-muted-foreground">1201</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trading-goods">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Inventory - Trading Goods</span>
                    <span className="text-[10px] text-muted-foreground">1201</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Row 2: Tax Liability, Input Tax Credit, Asset (Non-inventory) */}
        <div className="grid grid-cols-3 gap-4">
          {/* Tax Liability Account */}
          <Field>
            <FieldLabel htmlFor="tax-liability-account">Tax Liability Account</FieldLabel>
            <Select defaultValue="output-cgst">
              <SelectTrigger id="tax-liability-account" className="h-14 py-2 flex flex-col items-start justify-center gap-0 text-left">
                <span className="text-xs font-semibold">Output CGST</span>
                <span className="text-[10px] text-muted-foreground">2201</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="output-cgst">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Output CGST</span>
                    <span className="text-[10px] text-muted-foreground">2201</span>
                  </div>
                </SelectItem>
                <SelectItem value="output-sgst">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Output SGST</span>
                    <span className="text-[10px] text-muted-foreground">2202</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Input Tax Credit Account */}
          <Field>
            <FieldLabel htmlFor="input-tax-credit">Input Tax Credit Account</FieldLabel>
            <Select defaultValue="input-cgst">
              <SelectTrigger id="input-tax-credit" className="h-14 py-2 flex flex-col items-start justify-center gap-0 text-left">
                <span className="text-xs font-semibold">Input CGST</span>
                <span className="text-[10px] text-muted-foreground">1311</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="input-cgst">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Input CGST</span>
                    <span className="text-[10px] text-muted-foreground">1311</span>
                  </div>
                </SelectItem>
                <SelectItem value="input-sgst">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Input SGST</span>
                    <span className="text-[10px] text-muted-foreground">1312</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Asset Account for Non-Inventory */}
          <Field>
            <FieldLabel htmlFor="asset-account-non-inventory">Asset Account (For Non-Inventory)</FieldLabel>
            <Select>
              <SelectTrigger id="asset-account-non-inventory" className="h-14 text-left">
                <span className="text-xs text-muted-foreground">Select account (Optional)</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash (1001)</SelectItem>
                <SelectItem value="bank">Bank (1002)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* This is a Service Toggle */}
        <Field orientation="horizontal" className="items-start border-t border-border pt-4">
          <Switch
            id="is-service-toggle"
            checked={isService}
            onCheckedChange={setIsService}
          />
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor="is-service-toggle" className="font-semibold cursor-pointer">
              This is a Service
            </FieldLabel>
            <FieldDescription>
              Enable if this is a non-inventory service item.
            </FieldDescription>
          </div>
        </Field>
      </Card>

      {/* Card 2: Inventory Valuation */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Calculator className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Inventory Valuation</h2>
            <p className="text-xs text-muted-foreground">Choose how the inventory value of this product is calculated.</p>
          </div>
        </div>

        {/* Valuation Methods Radio-style Cards */}
        <div className="grid grid-cols-4 gap-3">
          {/* Weighted Average */}
          <div
            className={`cursor-pointer rounded-lg border p-3 flex flex-col gap-1 transition-all ${
              valuationMethod === "weighted-average"
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/10"
            }`}
            onClick={() => setValuationMethod("weighted-average")}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="valuation-method"
                checked={valuationMethod === "weighted-average"}
                onChange={() => setValuationMethod("weighted-average")}
                className="accent-primary"
              />
              <span className="text-xs font-semibold text-foreground">Weighted Average</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal pl-5">
              Cost is calculated based on weighted average of all purchases.
            </p>
          </div>

          {/* FIFO */}
          <div
            className={`cursor-pointer rounded-lg border p-3 flex flex-col gap-1 transition-all ${
              valuationMethod === "fifo"
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/10"
            }`}
            onClick={() => setValuationMethod("fifo")}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="valuation-method"
                checked={valuationMethod === "fifo"}
                onChange={() => setValuationMethod("fifo")}
                className="accent-primary"
              />
              <span className="text-xs font-semibold text-foreground">FIFO (First In, First Out)</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal pl-5">
              Oldest stock will be sold first.
            </p>
          </div>

          {/* LIFO */}
          <div
            className={`cursor-pointer rounded-lg border p-3 flex flex-col gap-1 transition-all ${
              valuationMethod === "lifo"
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/10"
            }`}
            onClick={() => setValuationMethod("lifo")}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="valuation-method"
                checked={valuationMethod === "lifo"}
                onChange={() => setValuationMethod("lifo")}
                className="accent-primary"
              />
              <span className="text-xs font-semibold text-foreground">LIFO (Last In, First Out)</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal pl-5">
              Latest stock will be sold first.
            </p>
          </div>

          {/* Standard Cost */}
          <div
            className={`cursor-pointer rounded-lg border p-3 flex flex-col gap-1 transition-all ${
              valuationMethod === "standard-cost"
                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                : "border-border bg-background hover:bg-muted/10"
            }`}
            onClick={() => setValuationMethod("standard-cost")}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="valuation-method"
                checked={valuationMethod === "standard-cost"}
                onChange={() => setValuationMethod("standard-cost")}
                className="accent-primary"
              />
              <span className="text-xs font-semibold text-foreground">Standard Cost</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal pl-5">
              Use a fixed standard cost for valuation.
            </p>
          </div>
        </div>

        {/* Row Under Valuation */}
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="default-cost">Default Cost</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>
                  <IndianRupee className="size-3.5" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="default-cost"
                defaultValue="1,650.00"
              />
            </InputGroup>
            <FieldDescription>Used when actual cost is not available.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="rounding-method">Rounding Method</FieldLabel>
            <Select defaultValue="nearest">
              <SelectTrigger id="rounding-method">
                <SelectValue placeholder="Rounding Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nearest">Round to Nearest</SelectItem>
                <SelectItem value="up">Round Up</SelectItem>
                <SelectItem value="down">Round Down</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="decimal-places">Decimal Places</FieldLabel>
            <Select defaultValue="2">
              <SelectTrigger id="decimal-places">
                <SelectValue placeholder="Decimal Places" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Card>

      {/* Card 3: Additional Settings */}
      <Card className="p-6 gap-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
            <Settings2 className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Additional Settings</h2>
            <p className="text-xs text-muted-foreground">Configure additional accounting related settings for this product.</p>
          </div>
        </div>

        {/* Checkboxes & Switches layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column Checkboxes */}
          <div className="space-y-4">
            {/* Track Stock value in accounting */}
            <div className="flex items-start gap-3">
              <Checkbox id="track-stock-value" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="track-stock-value"
                  className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Track stock value in accounting
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Record inventory value in balance sheet.
                </p>
              </div>
            </div>

            {/* Include in financial reports */}
            <div className="flex items-start gap-3">
              <Checkbox id="include-financial-reports" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="include-financial-reports"
                  className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Include in financial reports
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Show this product in profit & loss reports.
                </p>
              </div>
            </div>

            {/* Allow discount on sales */}
            <div className="flex items-start gap-3">
              <Checkbox id="allow-discount-sales" defaultChecked />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="allow-discount-sales"
                  className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Allow discount on sales
                </label>
                <p className="text-[10px] text-muted-foreground">
                  Allow discount when selling this product.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Switches */}
          <div className="space-y-4">
            {/* Allow purchase */}
            <Field orientation="horizontal" className="items-start gap-3">
              <Switch id="allow-purchase" defaultChecked />
              <div className="flex flex-col gap-0.5">
                <FieldLabel htmlFor="allow-purchase" className="font-semibold text-xs cursor-pointer">
                  Allow purchase
                </FieldLabel>
                <FieldDescription className="text-[10px]">
                  Allow this product to be purchased.
                </FieldDescription>
              </div>
            </Field>

            {/* Allow sale */}
            <Field orientation="horizontal" className="items-start gap-3">
              <Switch id="allow-sale" defaultChecked />
              <div className="flex flex-col gap-0.5">
                <FieldLabel htmlFor="allow-sale" className="font-semibold text-xs cursor-pointer">
                  Allow sale
                </FieldLabel>
                <FieldDescription className="text-[10px]">
                  Allow this product to be sold.
                </FieldDescription>
              </div>
            </Field>

            {/* Active */}
            <Field orientation="horizontal" className="items-start gap-3">
              <Switch id="accounting-active" defaultChecked />
              <div className="flex flex-col gap-0.5">
                <FieldLabel htmlFor="accounting-active" className="font-semibold text-xs cursor-pointer">
                  Active
                </FieldLabel>
                <FieldDescription className="text-[10px]">
                  Inactive products will not appear in transactions.
                </FieldDescription>
              </div>
            </Field>
          </div>
        </div>
      </Card>
    </div>
  );
}
