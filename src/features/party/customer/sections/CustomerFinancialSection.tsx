import { Card, CardContent } from "@/components/base/card.tsx";
import { Switch } from "@/components/base/switch.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Progress } from "@/components/base/progress.tsx";
import { Separator } from "@/components/base/separator.tsx";
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
  IndianRupee,
  ShieldCheck,
  CreditCard,
  Settings2,
  Info,
} from "lucide-react";

interface CustomerFinancialSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const PAYMENT_TERMS = ["Immediate", "Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"] as const;
const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound", "AED - UAE Dirham"] as const;
const HOLD_REASONS = ["Overdue Invoices", "Credit Limit Exceeded", "Legal Dispute", "Account Under Review", "Other"] as const;
const APPROVAL_ROLES = ["Sales Manager", "Finance Manager", "Credit Controller", "Director", "System Administrator"] as const;
const PAYMENT_METHODS = ["Bank Transfer", "Cheque", "Credit Card", "Cash", "UPI", "Letter of Credit"] as const;
const YES_NO = ["Yes", "No"] as const;
const DISCOUNT_TERMS = ["Within 10 days", "Within 15 days", "Within 30 days", "Cash On Delivery", "End of Month"] as const;

export default function CustomerFinancialSection({
  formState,
  onChange,
  onSelectChange,
}: CustomerFinancialSectionProps) {
  // Helper to parse numeric values for financial calculation
  const parseAmount = (val: string) => {
    const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const limitNum = parseAmount(formState.creditLimit || "500000.00");
  const outstandingNum = parseAmount(formState.outstanding || "125000.00");
  const overdueNum = parseAmount(formState.overdue || "25000.00");
  const availableCreditNum = Math.max(0, limitNum - outstandingNum);
  const utilization = limitNum > 0 ? Math.min(100, Math.round((outstandingNum / limitNum) * 100)) : 0;

  // Helper to format currency numbers to Indian format ₹
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Credit & Payment */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-6">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Credit & Payment</h4>
              <p className="text-xs text-muted-foreground">Manage credit limit, payment terms and credit control settings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Credit Limit</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>₹</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="creditLimit"
                  value={formState.creditLimit}
                  onChange={onChange}
                  placeholder="5,00,000.00"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Payment Terms <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.paymentTerms || "Net 30"}
                onValueChange={(val) => onSelectChange("paymentTerms", val || "")}
                items={PAYMENT_TERMS}
              >
                <ComboboxInput placeholder="Select payment terms" />
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
              <FieldLabel>Credit Status</FieldLabel>
              <div className="pt-2">
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none font-semibold text-xs py-1 px-3">
                  Within Limit
                </Badge>
              </div>
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
          </div>

          {/* Stats display panel */}
          <div className="bg-muted/40 p-4 rounded-lg border border-border/40 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Credit Used</span>
              <p className="text-sm font-bold text-foreground">{formatCurrency(outstandingNum)}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <Progress value={utilization} className="h-1.5 flex-1" />
                <span className="text-[10px] font-semibold font-mono text-muted-foreground">{utilization}% of limit</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Available Credit</span>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(availableCreditNum)}</p>
              <span className="text-[10px] font-semibold text-muted-foreground block pt-1">75% of limit</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Outstanding</span>
              <p className="text-sm font-bold text-orange-500">{formatCurrency(outstandingNum)}</p>
              <span className="text-[10px] font-semibold text-muted-foreground block pt-1">12 Invoices</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Overdue</span>
              <p className="text-sm font-bold text-destructive">{formatCurrency(overdueNum)}</p>
              <span className="text-[10px] font-semibold text-muted-foreground block pt-1">2 Invoices</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <Field>
              <FieldLabel>Overdue Tolerance (Days)</FieldLabel>
              <Input
                name="overdueTolerance"
                value={formState.overdueTolerance || "7"}
                onChange={onChange}
                placeholder="e.g., 7"
              />
            </Field>

            <Field>
              <FieldLabel>Max Invoice Amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupText>₹</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  name="maxInvoiceAmount"
                  value={formState.maxInvoiceAmount || "100000.00"}
                  onChange={onChange}
                  placeholder="1,00,000.00"
                />
              </InputGroup>
            </Field>

            <div className="flex items-center gap-2 pt-5">
              <Switch
                id="credit-hold-toggle"
                checked={formState.creditHold || false}
                onCheckedChange={(checked) => onSelectChange("creditHold", checked ? "true" : "false")}
              />
              <label
                htmlFor="credit-hold-toggle"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                Credit Hold
              </label>
            </div>

            <Field>
              <FieldLabel>Credit Hold Reason</FieldLabel>
              <Combobox
                disabled={!(formState.creditHold === "true" || formState.creditHold === true)}
                value={formState.creditHoldReason || ""}
                onValueChange={(val) => onSelectChange("creditHoldReason", val || "")}
                items={HOLD_REASONS}
              >
                <ComboboxInput placeholder="Select reason" />
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

      {/* Section 2: Credit Control */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Credit Control</h4>
              <p className="text-xs text-muted-foreground">Define how credit limits and overdue rules are applied.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <Field orientation="horizontal">
              <Switch
                id="check-credit-limit"
                checked={formState.checkCreditLimitInvoicing !== false}
                onCheckedChange={(c) => onSelectChange("checkCreditLimitInvoicing", c ? "true" : "false")}
              />
              <FieldContent>
                <FieldLabel htmlFor="check-credit-limit" className="font-semibold cursor-pointer">
                  Check credit limit during invoicing
                </FieldLabel>
                <FieldDescription>Validate available credit while creating invoices</FieldDescription>
              </FieldContent>
            </Field>

            <div className="flex flex-col gap-3">
              <Field orientation="horizontal">
                <Switch
                  id="require-approval"
                  checked={formState.requireApprovalCreditExceeded !== false}
                  onCheckedChange={(c) => onSelectChange("requireApprovalCreditExceeded", c ? "true" : "false")}
                />
                <FieldContent>
                  <FieldLabel htmlFor="require-approval" className="font-semibold cursor-pointer">
                    Require approval when credit limit exceeded
                  </FieldLabel>
                  <FieldDescription>Allow sales only after approval</FieldDescription>
                </FieldContent>
              </Field>

              {(formState.requireApprovalCreditExceeded === "true" || formState.requireApprovalCreditExceeded === true || formState.requireApprovalCreditExceeded === undefined) && (
                <div className="pl-12 w-[240px]">
                  <Field>
                    <FieldLabel className="text-[10px] uppercase font-bold text-muted-foreground">Approval Required By</FieldLabel>
                    <Combobox
                      value={formState.approvalRequiredBy || "Sales Manager"}
                      onValueChange={(val) => onSelectChange("approvalRequiredBy", val || "")}
                      items={APPROVAL_ROLES}
                    >
                      <ComboboxInput placeholder="Select role" className="h-8.5 text-xs" />
                      <ComboboxContent>
                        <ComboboxEmpty>No results found.</ComboboxEmpty>
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
                </div>
              )}
            </div>

            <Field orientation="horizontal">
              <Switch
                id="check-overdue"
                checked={formState.checkOverdueInvoices !== false}
                onCheckedChange={(c) => onSelectChange("checkOverdueInvoices", c ? "true" : "false")}
              />
              <FieldContent>
                <FieldLabel htmlFor="check-overdue" className="font-semibold cursor-pointer">
                  Check overdue invoices
                </FieldLabel>
                <FieldDescription>Consider overdue invoices in credit evaluation</FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                id="notify-limit"
                checked={formState.notifyCreditApproachesLimit !== false}
                onCheckedChange={(c) => onSelectChange("notifyCreditApproachesLimit", c ? "true" : "false")}
              />
              <FieldContent>
                <FieldLabel htmlFor="notify-limit" className="font-semibold cursor-pointer">
                  Notify when credit approaches limit
                </FieldLabel>
                <FieldDescription>Send alert when credit utilization is high</FieldDescription>
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Switch
                id="block-sales"
                checked={formState.blockSalesCreditExceeded !== false}
                onCheckedChange={(c) => onSelectChange("blockSalesCreditExceeded", c ? "true" : "false")}
              />
              <FieldContent>
                <FieldLabel htmlFor="block-sales" className="font-semibold cursor-pointer">
                  Block new sales when credit limit exceeded
                </FieldLabel>
                <FieldDescription>Prevent invoicing when credit is exceeded</FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Payment Settings */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Settings2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Payment Settings</h4>
              <p className="text-xs text-muted-foreground">Configure default payment behavior for this customer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Preferred Payment Method</FieldLabel>
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
              <FieldLabel>Discount Allowed</FieldLabel>
              <Combobox
                value={formState.discountAllowed || "Yes"}
                onValueChange={(val) => onSelectChange("discountAllowed", val || "")}
                items={YES_NO}
              >
                <ComboboxInput placeholder="Select Option" />
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
              <FieldLabel>Cash Discount %</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="cashDiscountPercent"
                  value={formState.cashDiscountPercent || "2.00"}
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
                value={formState.cashDiscountTerms || "Within 10 days"}
                onValueChange={(val) => onSelectChange("cashDiscountTerms", val || "")}
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
          </div>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            <p>Financial settings will be applied to all transactions for this customer.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
