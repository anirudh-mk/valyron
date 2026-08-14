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
  BookOpen,
  Scale,
  Percent,
  Calculator,
  Calendar,
  Layers,
  Info,
  ExternalLink,
} from "lucide-react";

interface CustomerAccountingSectionProps {
  formState: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

const RECEIVABLE_ACCOUNTS = ["1101 - Accounts Receivable - Trade", "1102 - Inter-Company Receivables", "1103 - Employee Advances"] as const;
const SALES_ACCOUNTS = ["4001 - Sales - Domestic", "4002 - Sales - Exports", "4003 - Service Income", "4004 - Other Operating Revenue"] as const;
const ADVANCE_ACCOUNTS = ["2105 - Customer Advances", "2106 - Deferred Revenue", "2107 - Security Deposits Received"] as const;
const WRITEOFF_ACCOUNTS = ["5104 - Bad Debts Written Off", "5105 - Allowance for Doubtful Debts"] as const;

const TAX_TREATMENTS = ["Registered Business", "Unregistered Business", "Consumer", "SEZunit", "Overseas"] as const;
const TAX_CATEGORIES = ["Inter-State", "Intra-State"] as const;
const TAX_RATES = ["GST 0%", "GST 5%", "GST 12%", "GST 18%", "GST 28%", "Exempt"] as const;
const PLACES_OF_SUPPLY = ["Kerala (32)", "Tamil Nadu (33)", "Karnataka (29)", "Maharashtra (27)", "Delhi (07)"] as const;
const GST_TYPES = ["Regular", "Composition", "Casual Taxable Person", "Input Service Distributor"] as const;

const ITC_ELIGIBILITIES = ["Eligible", "Ineligible", "Partially Eligible", "Not Applicable"] as const;
const YES_NO = ["Yes", "No"] as const;
const TDS_SECTIONS = ["194H - Commission/Brokerage", "194C - Contractors", "194J - Professional Fees", "194Q - Purchase of Goods", "None"] as const;

const CURRENCIES = ["INR - Indian Rupee", "USD - US Dollar", "EUR - Euro", "GBP - British Pound"] as const;
const EXCHANGE_RATE_TYPES = ["Default Company Rate", "Custom Transaction Rate", "Spot Rate", "Average Monthly Rate"] as const;
const ROUNDING_METHODS = ["Normal Rounding", "Round Up", "Round Down", "No Rounding"] as const;

export default function CustomerAccountingSection({
  formState,
  onChange,
  onSelectChange,
}: CustomerAccountingSectionProps) {
  return (
    <div className="space-y-6">
      {/* Account Mapping */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Account Mapping</h4>
                <p className="text-xs text-muted-foreground">Select default accounts to be used in transactions with this customer.</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Chart of Accounts <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Receivable Account <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.receivableAccount || "1101 - Accounts Receivable - Trade"}
                onValueChange={(val) => onSelectChange("receivableAccount", val || "")}
                items={RECEIVABLE_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select receivable account" />
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
              <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
                Current Balance: ₹ 1,25,000.00
              </span>
            </Field>

            <Field>
              <FieldLabel>Sales Account <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.salesAccount || "4001 - Sales - Domestic"}
                onValueChange={(val) => onSelectChange("salesAccount", val || "")}
                items={SALES_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select sales account" />
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
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Current Balance: ₹ 0.00
              </span>
            </Field>

            <Field>
              <FieldLabel>Advance Account <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.advanceAccount || "2105 - Customer Advances"}
                onValueChange={(val) => onSelectChange("advanceAccount", val || "")}
                items={ADVANCE_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select advance account" />
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
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Current Balance: ₹ 0.00
              </span>
            </Field>

            <Field>
              <FieldLabel>Write Off Account <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.writeOffAccount || "5104 - Bad Debts Written Off"}
                onValueChange={(val) => onSelectChange("writeOffAccount", val || "")}
                items={WRITEOFF_ACCOUNTS}
              >
                <ComboboxInput placeholder="Select write off account" />
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
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Current Balance: ₹ 0.00
              </span>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Tax Configuration */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Scale className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Tax Configuration</h4>
              <p className="text-xs text-muted-foreground">Define tax details and compliance information.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>Tax Treatment <span className="text-destructive">*</span></FieldLabel>
              <Combobox
                value={formState.taxTreatment || "Registered Business"}
                onValueChange={(val) => onSelectChange("taxTreatment", val || "")}
                items={TAX_TREATMENTS}
              >
                <ComboboxInput placeholder="Select tax treatment" />
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
              <FieldLabel>Tax Category</FieldLabel>
              <Combobox
                value={formState.taxCategory || "Inter-State"}
                onValueChange={(val) => onSelectChange("taxCategory", val || "")}
                items={TAX_CATEGORIES}
              >
                <ComboboxInput placeholder="Select tax category" />
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
                value={formState.gstin || "32XXXXXXXXXX125"}
                onChange={onChange}
                placeholder="e.g., 32XXXXXXXXXX125"
              />
            </Field>

            <Field>
              <FieldLabel>PAN / Tax No.</FieldLabel>
              <Input
                name="pan"
                value={formState.pan || "XXXXX1234X"}
                onChange={onChange}
                placeholder="e.g., XXXXX1234X"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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
              <FieldLabel>Place of Supply</FieldLabel>
              <Combobox
                value={formState.placeOfSupply || "Kerala (32)"}
                onValueChange={(val) => onSelectChange("placeOfSupply", val || "")}
                items={PLACES_OF_SUPPLY}
              >
                <ComboboxInput placeholder="Select place of supply" />
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
              <FieldLabel>GST Type</FieldLabel>
              <Combobox
                value={formState.gstType || "Regular"}
                onValueChange={(val) => onSelectChange("gstType", val || "")}
                items={GST_TYPES}
              >
                <ComboboxInput placeholder="Select GST Type" />
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
                id="e-invoicing-applicable"
                checked={formState.eInvoicingApplicable !== false}
                onCheckedChange={(c) => onSelectChange("eInvoicingApplicable", c ? "true" : "false")}
              />
              <label
                htmlFor="e-invoicing-applicable"
                className="text-xs font-semibold text-foreground cursor-pointer select-none"
              >
                E-Invoicing Applicable
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Details */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Compliance Details</h4>
              <p className="text-xs text-muted-foreground">Additional statutory and compliance information.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>TAN</FieldLabel>
              <Input
                name="tan"
                value={formState.tan || "BLRA12345B"}
                onChange={onChange}
                placeholder="e.g., BLRA12345B"
              />
            </Field>

            <Field>
              <FieldLabel>CIN (If Applicable)</FieldLabel>
              <Input
                name="cin"
                value={formState.cin || ""}
                onChange={onChange}
                placeholder="Enter CIN"
              />
            </Field>

            <Field>
              <FieldLabel>MSME Registration No.</FieldLabel>
              <Input
                name="msmeRegistrationNo"
                value={formState.msmeRegistrationNo || ""}
                onChange={onChange}
                placeholder="Enter MSME No."
              />
            </Field>

            <Field>
              <FieldLabel>FSSAI No.</FieldLabel>
              <Input
                name="fssaiNo"
                value={formState.fssaiNo || ""}
                onChange={onChange}
                placeholder="Enter FSSAI No."
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field>
              <FieldLabel>ITC Eligibility</FieldLabel>
              <Combobox
                value={formState.itcEligibility || "Eligible"}
                onValueChange={(val) => onSelectChange("itcEligibility", val || "")}
                items={ITC_ELIGIBILITIES}
              >
                <ComboboxInput placeholder="Select eligibility" />
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
              <FieldLabel>TDS Applicable</FieldLabel>
              <Combobox
                value={formState.tdsApplicable || "Yes"}
                onValueChange={(val) => onSelectChange("tdsApplicable", val || "")}
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
              <FieldLabel>TDS Section</FieldLabel>
              <Combobox
                value={formState.tdsSection || "194H - Commission/Brokerage"}
                onValueChange={(val) => onSelectChange("tdsSection", val || "")}
                items={TDS_SECTIONS}
              >
                <ComboboxInput placeholder="Select TDS section" />
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
              <FieldLabel>TCS Applicable</FieldLabel>
              <Combobox
                value={formState.tcsApplicable || "No"}
                onValueChange={(val) => onSelectChange("tcsApplicable", val || "")}
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
          </div>
        </CardContent>
      </Card>

      {/* Other Settings */}
      <Card className="border border-border/50 shadow-sm">
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center gap-2.5 pb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Scale className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Other Settings</h4>
              <p className="text-xs text-muted-foreground">Additional accounting preferences and settings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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
              <FieldLabel>Exchange Rate Type</FieldLabel>
              <Combobox
                value={formState.exchangeRateType || "Default Company Rate"}
                onValueChange={(val) => onSelectChange("exchangeRateType", val || "")}
                items={EXCHANGE_RATE_TYPES}
              >
                <ComboboxInput placeholder="Select exchange rate type" />
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
              <FieldLabel>Exchange Rate</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="exchangeRate"
                  value={formState.exchangeRate || "1.0000"}
                  onChange={onChange}
                  placeholder="1.0000"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost" size="icon-xs" type="button" title="Calculate">
                    <Calculator className="h-3.5 w-3.5 text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
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
              <FieldLabel>Opening Balance</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  name="openingBalance"
                  value={formState.openingBalance || "0.00"}
                  onChange={onChange}
                  placeholder="0.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="ghost" size="icon-xs" type="button" title="Select Date">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                As on 10 May 2026
              </span>
            </Field>
          </div>

          <div className="flex items-center gap-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg border border-blue-500/20 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            <p>Accounting settings will be applied to all transactions for this customer.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
