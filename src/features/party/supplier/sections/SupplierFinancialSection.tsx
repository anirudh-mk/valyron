import { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Input } from "@/components/base/input.tsx";
import {
  Field,
  FieldLabel,
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
  CreditCard,
  Building,
  ShieldCheck,
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  Info,
} from "lucide-react";

interface SupplierFinancialSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const PAYMENT_TERMS = ["Immediate", "Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"] as const;
const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;
const PRICE_LISTS = ["Default Supplier Price List", "Standard Supplier Price List", "Wholesale Price List"] as const;
const PAYMENT_METHODS = ["Bank Transfer", "Cheque", "Credit Card", "Cash", "UPI", "Letter of Credit"] as const;

const BANKS = ["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Federal Bank"] as const;
const ACCOUNT_TYPES = ["Current Account", "Savings Account", "Overdraft", "Cash Credit"] as const;

const GST_TREATMENTS = ["Registered Business", "Unregistered Business", "Consumer", "SEZ Unit", "Overseas"] as const;
const REG_TYPES = ["Regular", "Composition", "Casual Taxable Person", "Non-Resident"] as const;

const ROUNDING_OFF_OPTIONS = ["2 Decimal Places", "3 Decimal Places", "4 Decimal Places", "No Rounding"] as const;

export default function SupplierFinancialSection({
  formState,
  onChange,
  onSelectChange,
}: SupplierFinancialSectionProps) {
  const [showAccountNo, setShowAccountNo] = useState(false);

  return (
    <div className="space-y-6 text-left">
      {/* 1. Payment Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Payment Information</h4>
              <p className="text-xs text-muted-foreground">Define payment terms and banking details for this supplier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Payment Terms <span className="text-destructive">*</span></FieldLabel>
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
              <span className="text-[10px] text-muted-foreground mt-1 block">Payment due within 30 days</span>
            </Field>

            <Field>
              <FieldLabel>Credit Limit</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Combobox
                    value={formState.creditLimitCurrency || "INR"}
                    onValueChange={(val) => onSelectChange("creditLimitCurrency", val || "")}
                    items={["INR", "USD", "EUR", "GBP"]}
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
                  name="creditLimit"
                  value={formState.creditLimit}
                  onChange={onChange}
                  placeholder="5,00,000.00"
                />
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">Maximum credit allowed</span>
            </Field>

            <Field>
              <FieldLabel>Currency <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.currency || "INR - Indian Rupee"}
                onValueChange={(val) => onSelectChange("currency", val || "")}
                items={CURRENCIES}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Payment Method</FieldLabel>
              <Combobox
                value={formState.preferredPaymentMethod || "Bank Transfer"}
                onValueChange={(val) => onSelectChange("preferredPaymentMethod", val || "")}
                items={PAYMENT_METHODS}
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

            <Field>
              <FieldLabel>Advance Payment (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="advancePaymentPercent"
                  value={formState.advancePaymentPercent || "0.00"}
                  onChange={onChange}
                  placeholder="0.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">Advance payment required</span>
            </Field>

            <div className="flex flex-col pt-2 gap-1 justify-center">
              <div className="flex items-center gap-2">
                <Switch
                  id="financial-tds-applicable"
                  checked={formState.tdsApplicable !== false}
                  onCheckedChange={(checked) => onSelectChange("tdsApplicable", checked ? "true" : "false")}
                />
                <label
                  htmlFor="financial-tds-applicable"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  TDS Applicable
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">TDS will be deducted</span>
            </div>

            <Field>
              <FieldLabel>TDS Rate (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="tdsRatePercent"
                  value={formState.tdsRatePercent || "0.00"}
                  onChange={onChange}
                  placeholder="0.00"
                  disabled={formState.tdsApplicable === "false" || formState.tdsApplicable === false}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* 2. Bank Account Details */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Building className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Bank Account Details</h4>
              <p className="text-xs text-muted-foreground">Primary bank account for payments.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Bank Name <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.bankName || "HDFC Bank"}
                onValueChange={(val) => onSelectChange("bankName", val || "")}
                items={BANKS}
              >
                <ComboboxInput placeholder="Select bank" />
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
              <FieldLabel>Account Holder Name <span className="text-destructive">*</span></FieldLabel>
              <Input
                name="accountHolderName"
                value={formState.accountHolderName}
                onChange={onChange}
                placeholder="Acme Supplies Pvt Ltd"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Account Number <span className="text-destructive">*</span></FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="accountNumber"
                  type={showAccountNo ? "text" : "password"}
                  value={formState.accountNumber}
                  onChange={onChange}
                  placeholder="5010 1234 5678 90"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    variant="ghost"
                    size="icon-xs"
                    type="button"
                    onClick={() => setShowAccountNo(!showAccountNo)}
                    title={showAccountNo ? "Hide" : "Show"}
                  >
                    {showAccountNo ? (
                      <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>IFSC Code <span className="text-destructive">*</span></FieldLabel>
              <Input
                name="ifscCode"
                value={formState.ifscCode}
                onChange={onChange}
                placeholder="HDFCC0001234"
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Account Type</FieldLabel>
              <Combobox
                value={formState.accountType || "Current Account"}
                onValueChange={(val) => onSelectChange("accountType", val || "")}
                items={ACCOUNT_TYPES}
              >
                <ComboboxInput placeholder="Select account type" />
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
              <FieldLabel>Branch</FieldLabel>
              <Input
                name="branch"
                value={formState.branch}
                onChange={onChange}
                placeholder="MG Road, Bangalore"
              />
            </Field>

            <Field>
              <FieldLabel>UPI ID (Optional)</FieldLabel>
              <Input
                name="upiId"
                value={formState.upiId}
                onChange={onChange}
                placeholder="acmesupplies@hdfcbank"
              />
            </Field>

            <div className="flex items-center pt-5 justify-end">
              <button
                type="button"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Another Bank Account
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Tax Information */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Tax Information</h4>
              <p className="text-xs text-muted-foreground">Tax and statutory details.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>GST Treatment <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.gstTreatment || "Registered Business"}
                onValueChange={(val) => onSelectChange("gstTreatment", val || "")}
                items={GST_TREATMENTS}
              >
                <ComboboxInput placeholder="Select GST treatment" />
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
              <FieldLabel>GSTIN / UIN</FieldLabel>
              <Input
                name="gstin"
                value={formState.gstin}
                onChange={onChange}
                placeholder="29ABCDE1234F1Z5"
              />
            </Field>

            <Field>
              <FieldLabel>Tax Registration Type</FieldLabel>
              <Combobox
                value={formState.taxRegistrationType || "Regular"}
                onValueChange={(val) => onSelectChange("taxRegistrationType", val || "")}
                items={REG_TYPES}
              >
                <ComboboxInput placeholder="Select registration type" />
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
              <FieldLabel>PAN / Tax No.</FieldLabel>
              <Input
                name="pan"
                value={formState.pan}
                onChange={onChange}
                placeholder="ABCDE1234F"
              />
            </Field>
          </div>

          <div className="flex flex-col pt-1 gap-1">
            <div className="flex items-center gap-2">
              <Switch
                id="e-commerce-operator-switch"
                checked={formState.isECommerceOperator === true || formState.isECommerceOperator === "true"}
                onCheckedChange={(checked) => onSelectChange("isECommerceOperator", checked ? "true" : "false")}
              />
              <label
                htmlFor="e-commerce-operator-switch"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                E-Commerce Operator
              </label>
            </div>
            <span className="text-[10px] text-muted-foreground ml-10">Applicable for TCS</span>
          </div>
        </CardContent>
      </Card>

      {/* 4. Other Financial Settings */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Other Financial Settings</h4>
              <p className="text-xs text-muted-foreground">Late payment charges, round offs and discounts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Field>
              <FieldLabel>Interest on Overdue (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="interestOnOverduePercent"
                  value={formState.interestOnOverduePercent || "18.00"}
                  onChange={onChange}
                  placeholder="18.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">Per annum</span>
            </Field>

            <Field>
              <FieldLabel>Interest Grace Period (Days)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="interestGracePeriodDays"
                  value={formState.interestGracePeriodDays || "0"}
                  onChange={onChange}
                  placeholder="0"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>days</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">Days after due date</span>
            </Field>

            <Field>
              <FieldLabel>Rounding Off</FieldLabel>
              <Combobox
                value={formState.roundingOff || "2 Decimal Places"}
                onValueChange={(val) => onSelectChange("roundingOff", val || "")}
                items={ROUNDING_OFF_OPTIONS}
              >
                <ComboboxInput placeholder="Select rounding" />
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

            <div className="flex flex-col justify-center pt-2 gap-1">
              <div className="flex items-center gap-2">
                <Switch
                  id="financial-discount-allowed"
                  checked={formState.discountAllowed !== "No" && formState.discountAllowed !== "false" && formState.discountAllowed !== false}
                  onCheckedChange={(c) => onSelectChange("discountAllowed", c ? "Yes" : "No")}
                />
                <label
                  htmlFor="financial-discount-allowed"
                  className="text-xs font-semibold text-foreground cursor-pointer select-none"
                >
                  Discount Allowed
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground ml-10">Yes</span>
            </div>

            <Field>
              <FieldLabel>Cash Discount (%)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="cashDiscountPercentFinancial"
                  value={formState.cashDiscountPercentFinancial || "2.00"}
                  onChange={onChange}
                  placeholder="2.00"
                  disabled={formState.discountAllowed === "No" || formState.discountAllowed === "false" || formState.discountAllowed === false}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">If paid within terms</span>
            </Field>
          </div>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4.5 w-4.5 shrink-0" />
            <p>These financial settings will be used for transactions with this supplier.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
