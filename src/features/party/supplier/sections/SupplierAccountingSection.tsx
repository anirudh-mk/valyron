import { Card, CardContent } from "@/components/base/card.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import { Textarea } from "@/components/base/textarea.tsx";
import {
  Field,
  FieldLabel,
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
  Calculator,
  Shuffle,
  FileSpreadsheet,
  Info,
} from "lucide-react";

interface SupplierAccountingSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const AP_ACCOUNTS = ["20000 - Accounts Payable", "20100 - Accounts Payable - Trade", "20200 - Accounts Payable - Other"] as const;
const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;
const TAX_ACCOUNTS = ["22000 - GST Payable", "22100 - VAT Payable", "22200 - Service Tax Payable"] as const;
const DISCOUNT_ACCOUNTS = ["31000 - Purchase Discounts", "31100 - General Discounts"] as const;
const EXPENSE_ACCOUNTS = ["51000 - Purchase Expenses", "51100 - Operating Expenses", "51200 - Admin Expenses"] as const;
const VARIANCE_ACCOUNTS = ["39000 - Exchange Rate Gain/Loss", "39100 - Currency Loss", "39200 - Currency Gain"] as const;
const PAYMENT_DISCOUNTS = ["32500 - Payment Discounts", "32510 - Supplier Rebates"] as const;
const WRITE_OFF_ACCOUNTS = ["53000 - Bad Debts", "53100 - Accounts Written Off"] as const;
const TDS_ACCOUNTS = ["22010 - TDS Payable", "22020 - TCS Payable"] as const;

const PAYMENT_TERMS = ["Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"] as const;
const DUE_BASIS_OPTIONS = ["Invoice Date", "Posting Date", "Delivery Date"] as const;
const ADVICE_FORMATS = ["Detailed", "Summary", "Standard"] as const;
const CREDIT_CHECK_OPTIONS = ["On Invoice", "On Purchase Order", "On Delivery Note", "No Check"] as const;

const ADVANCE_ACCOUNTS = ["11000 - Advance to Suppliers", "11100 - General Advances"] as const;
const RETAINAGE_ACCOUNTS = ["15000 - Retainage Payable", "15100 - Security Deposit Payable"] as const;
const COST_CENTERS = ["Main Cost Center", "Production", "Sales", "Development"] as const;
const PROJECTS = ["ERP Implementation", "Warehouse Expansion", "Supplier Integration"] as const;
const DEPARTMENTS = ["Finance", "Procurement", "Logistics", "IT", "HR"] as const;

export default function SupplierAccountingSection({
  formState,
  onChange,
  onSelectChange,
}: SupplierAccountingSectionProps) {
  return (
    <div className="space-y-6 text-left">
      {/* 1. Accounting Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Calculator className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Accounting Information</h4>
              <p className="text-xs text-muted-foreground">Define accounting details for transactions with this supplier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Accounts Payable Account <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.receivableAccount || "20000 - Accounts Payable"}
                onValueChange={(val) => onSelectChange("receivableAccount", val || "")}
                items={AP_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select account" />
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
              <FieldLabel>Payable Account Name</FieldLabel>
              <Input
                name="payableAccountName"
                value={formState.payableAccountName || "Accounts Payable"}
                onChange={onChange}
                placeholder="Accounts Payable"
              />
            </Field>

            <Field>
              <FieldLabel>Opening Balance</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>₹</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="openingBalance"
                  value={formState.openingBalance || "25,000.00"}
                  onChange={onChange}
                  placeholder="25,000.00"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Opening Balance as on <span className="text-destructive">*</span></FieldLabel>
              <Input
                name="openingBalanceDate"
                value={formState.openingBalanceDate || "2024-04-01"}
                onChange={onChange}
                placeholder="01 Apr 2024"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Account Currency</FieldLabel>
              <Combobox
                value={formState.currency || "INR - Indian Rupee"}
                onValueChange={(val) => onSelectChange("currency", val || "")}
                items={CURRENCIES}
              >
                <ComboboxInput placeholder="Select Currency" />
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
              <FieldLabel>Tax Payable Account</FieldLabel>
              <Combobox
                value={formState.taxPayableAccount || "22000 - GST Payable"}
                onValueChange={(val) => onSelectChange("taxPayableAccount", val || "")}
                items={TAX_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select Tax Account" />
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
              <FieldLabel>Discount Received Account</FieldLabel>
              <Combobox
                value={formState.discountReceivedAccount || "31000 - Purchase Discounts"}
                onValueChange={(val) => onSelectChange("discountReceivedAccount", val || "")}
                items={DISCOUNT_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select Discount Account" />
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
              <FieldLabel>Expense Account</FieldLabel>
              <Combobox
                value={formState.salesAccount || "51000 - Purchase Expenses"}
                onValueChange={(val) => onSelectChange("salesAccount", val || "")}
                items={EXPENSE_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select Expense Account" />
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Exchange Rate Variance Account</FieldLabel>
              <Combobox
                value={formState.exchangeRateVarianceAccount || "39000 - Exchange Rate Gain/Loss"}
                onValueChange={(val) => onSelectChange("exchangeRateVarianceAccount", val || "")}
                items={VARIANCE_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select Variance Account" />
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
              <FieldLabel>Payment Discount Account</FieldLabel>
              <Combobox
                value={formState.paymentDiscountAccount || "32500 - Payment Discounts"}
                onValueChange={(val) => onSelectChange("paymentDiscountAccount", val || "")}
                items={PAYMENT_DISCOUNTS}
              >
                <ComboboxInput placeholder="Select Discount Account" />
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
              <FieldLabel>Write Off Account</FieldLabel>
              <Combobox
                value={formState.writeOffAccount || "53000 - Bad Debts"}
                onValueChange={(val) => onSelectChange("writeOffAccount", val || "")}
                items={WRITE_OFF_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select Write Off Account" />
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
              <FieldLabel>TDS Payable Account</FieldLabel>
              <Combobox
                value={formState.tdsPayableAccount || "22010 - TDS Payable"}
                onValueChange={(val) => onSelectChange("tdsPayableAccount", val || "")}
                items={TDS_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select TDS Account" />
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

      {/* 2. Payment & Reconciliation */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Shuffle className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Payment &amp; Reconciliation</h4>
              <p className="text-xs text-muted-foreground">Set default terms for payments and reconciliation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Default Payment Terms</FieldLabel>
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
              <FieldLabel>Due Date Basis</FieldLabel>
              <Combobox
                value={formState.dueDateBasis || "Invoice Date"}
                onValueChange={(val) => onSelectChange("dueDateBasis", val || "")}
                items={DUE_BASIS_OPTIONS}
              >
                <ComboboxInput placeholder="Select Due Date Basis" />
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
                  id="payment-advice-required-switch"
                  checked={formState.paymentAdviceRequired !== false}
                  onCheckedChange={(c) => onSelectChange("paymentAdviceRequired", c ? "true" : "false")}
                />
                <label
                  htmlFor="payment-advice-required-switch"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Payment Advice Required
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Yes</span>
            </div>

            <Field>
              <FieldLabel>Payment Advice Format</FieldLabel>
              <Combobox
                value={formState.paymentAdviceFormat || "Detailed"}
                onValueChange={(val) => onSelectChange("paymentAdviceFormat", val || "")}
                items={ADVICE_FORMATS}
                disabled={formState.paymentAdviceRequired === "false" || formState.paymentAdviceRequired === false}
              >
                <ComboboxInput placeholder="Select format" />
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
            <div className="flex flex-col pt-2 gap-1 justify-center">
              <div className="flex items-center gap-2">
                <Switch
                  id="auto-reconciliation-switch"
                  checked={formState.autoReconciliation !== false}
                  onCheckedChange={(c) => onSelectChange("autoReconciliation", c ? "true" : "false")}
                />
                <label
                  htmlFor="auto-reconciliation-switch"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Auto Reconciliation
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Automatically reconcile payments</span>
            </div>

            <Field>
              <FieldLabel>Matching Tolerance (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="matchingTolerancePercent"
                  value={formState.matchingTolerancePercent || "2.00"}
                  onChange={onChange}
                  placeholder="2.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Credit Limit Check</FieldLabel>
              <Combobox
                value={formState.creditLimitCheck || "On Invoice"}
                onValueChange={(val) => onSelectChange("creditLimitCheck", val || "")}
                items={CREDIT_CHECK_OPTIONS}
              >
                <ComboboxInput placeholder="Select check condition" />
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
                  id="block-transactions-switch"
                  checked={formState.blockTransactionsCreditExceeded === true || formState.blockTransactionsCreditExceeded === "true"}
                  onCheckedChange={(c) => onSelectChange("blockTransactionsCreditExceeded", c ? "true" : "false")}
                />
                <label
                  htmlFor="block-transactions-switch"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Set Over Credit Limit
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Block Transactions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Additional Settings */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <FileSpreadsheet className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Additional Settings</h4>
              <p className="text-xs text-muted-foreground">Configure additional accounting preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex flex-col pt-2 gap-1 justify-center">
              <div className="flex items-center gap-2">
                <Switch
                  id="allow-advance-payment-switch"
                  checked={formState.allowAdvancePayment !== false}
                  onCheckedChange={(c) => onSelectChange("allowAdvancePayment", c ? "true" : "false")}
                />
                <label
                  htmlFor="allow-advance-payment-switch"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Allow Advance Payment
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Yes</span>
            </div>

            <Field>
              <FieldLabel>Advance Payment Account</FieldLabel>
              <Combobox
                value={formState.advanceAccount || "11000 - Advance to Suppliers"}
                onValueChange={(val) => onSelectChange("advanceAccount", val || "")}
                items={ADVANCE_ACCOUNTS}
                disabled={formState.allowAdvancePayment === "false" || formState.allowAdvancePayment === false}
              >
                <ComboboxInput placeholder="Select account" />
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
              <FieldLabel>Retainage Account</FieldLabel>
              <Combobox
                value={formState.retainageAccount || "15000 - Retainage Payable"}
                onValueChange={(val) => onSelectChange("retainageAccount", val || "")}
                items={RETAINAGE_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select account" />
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
              <FieldLabel>Retainage (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="retainagePercent"
                  value={formState.retainagePercent || "0.00"}
                  onChange={onChange}
                  placeholder="0.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Cost Center (Default)</FieldLabel>
              <Combobox
                value={formState.defaultCostCenter || ""}
                onValueChange={(val) => onSelectChange("defaultCostCenter", val || "")}
                items={COST_CENTERS}
              >
                <ComboboxInput placeholder="Select cost center" />
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
              <FieldLabel>Project (Default)</FieldLabel>
              <Combobox
                value={formState.defaultProject || ""}
                onValueChange={(val) => onSelectChange("defaultProject", val || "")}
                items={PROJECTS}
              >
                <ComboboxInput placeholder="Select project" />
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
              <FieldLabel>Department (Default)</FieldLabel>
              <Combobox
                value={formState.defaultDepartment || ""}
                onValueChange={(val) => onSelectChange("defaultDepartment", val || "")}
                items={DEPARTMENTS}
              >
                <ComboboxInput placeholder="Select department" />
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
              <div className="flex justify-between">
                <FieldLabel>Notes</FieldLabel>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {(formState.accountingNotes || "").length}/250
                </span>
              </div>
              <Textarea
                name="accountingNotes"
                value={formState.accountingNotes || ""}
                onChange={onChange}
                maxLength={250}
                placeholder="Add notes for accounting (optional)..."
                className="min-h-[38px] h-[38px]"
              />
            </Field>
          </div>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4.5 w-4.5 shrink-0" />
            <p>These accounting settings will be used as default for all transactions with this supplier.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
