import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Eye, Download, Send, Globe, Building2 } from "lucide-react";
import { format } from "date-fns";
import LedgerAutoComplete from "@/components/CommonComponents/LedgerAutoComplete";
import GlobalInvoiceItemsTable from "@/components/ItemTable/GlobalInvoiceItemsTable";
// Indian States for Place of Supply
const indianStates = [
  { code: "AN", name: "Andaman and Nicobar Islands" },
  { code: "AP", name: "Andhra Pradesh" },
  { code: "KL", name: "Kerala" },
  { code: "MH", name: "Maharashtra" },
  { code: "KA", name: "Karnataka" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "DL", name: "Delhi" },
  // Add more as needed
];

const invoiceTypes = [
  { value: "tax_invoice", label: "Tax Invoice (GST)" },
  { value: "bill_of_supply", label: "Bill of Supply (Non-GST)" },
  { value: "export_wp", label: "Export with Payment" },
  { value: "export_wop", label: "Export without Payment" },
  { value: "sez_wp", label: "SEZ with Payment" },
  { value: "sez_wop", label: "SEZ without Payment" },
  { value: "proforma", label: "Proforma Invoice" },
];

const currencies = [
  { value: "INR", symbol: "₹", label: "Indian Rupee" },
  { value: "USD", symbol: "$", label: "US Dollar" },
  { value: "EUR", symbol: "€", label: "Euro" },
  { value: "AED", symbol: "د.إ", label: "UAE Dirham" },
  { value: "GBP", symbol: "£", label: "British Pound" },
];

const mockInvoices = [
  { id: "INV-2025-0048", date: "2025-11-29", customer: "Google LLC", amount: "$18,500", status: "Sent", type: "export_wp" },
  { id: "INV-2025-0047", date: "2025-11-24", customer: "Acme Corporation", amount: "₹5,90,000", status: "Paid", type: "tax_invoice" },
  { id: "INV-2025-0046", date: "2025-11-20", customer: "TechCorp Ltd", amount: "₹4,25,000", status: "Sent", type: "tax_invoice" },
];

const ledgers = [
  { id: 1, name: "Acme Corporation", gstin: "27AAECA1234A1Z5", state: "MH", country: "India" },
  { id: 2, name: "Google LLC", gstin: "", state: "", country: "USA" },
  { id: 3, name: "Berlin Tech GmbH", gstin: "", state: "", country: "Germany" },
];

export default function SalesInvoiceGlobal() {
  const [activeTab, setActiveTab] = useState("all");
  const [invoiceType, setInvoiceType] = useState("tax_invoice");
  const [currency, setCurrency] = useState("INR");
  const [placeOfSupply, setPlaceOfSupply] = useState("KL");
  const [reverseCharge, setReverseCharge] = useState(false);
  const [applyTDS, setApplyTDS] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  const isIndianCustomer = selectedCustomer?.country === "India";
  const isExport = invoiceType.includes("export") || invoiceType.includes("sez");
  const isDomesticGST = invoiceType === "tax_invoice" && isIndianCustomer;
  const isIGST = isDomesticGST && selectedCustomer?.state !== "KL";
  const showTaxColumns = isDomesticGST || currency === "INR";

  const currencySymbol = currencies.find(c => c.value === currency)?.symbol || "₹";

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Sales Invoices
          </h1>
          <p className="text-gray-600 mt-1">Create GST, VAT, Export, SEZ & Proforma invoices for any country</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="all">All Invoices (48)</TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-0">
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl">Create New Invoice</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">

                {/* Invoice Type & Currency */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>Invoice Type</Label>
                    <Select value={invoiceType} onValueChange={setInvoiceType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceTypes.map(t => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(c => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.symbol} {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {isDomesticGST && (
                    <div>
                      <Label>Place of Supply</Label>
                      <Select value={placeOfSupply} onValueChange={setPlaceOfSupply}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map(s => (
                            <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Customer Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold mb-3">Bill To</h3>
                    <LedgerAutoComplete
                      ledgers={ledgers}
                      onSelect={(ledger) => setSelectedCustomer(ledger)}
                    />
                    {selectedCustomer && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm">
                        <p className="font-semibold">{selectedCustomer.name}</p>
                        <p className="text-gray-600">{selectedCustomer.country}</p>
                        {selectedCustomer.gstin && <p>GSTIN: {selectedCustomer.gstin}</p>}
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      <h3 className="font-bold text-lg">Valyron Labs Private Limited</h3>
                    </div>
                    <p className="text-sm">123 Tech Park, Kozhikode, Kerala 673001<br />India</p>
                    <div className="mt-3 text-sm font-medium">
                      <div>GSTIN: 32AAGCV1234A1Z5</div>
                      <div>PAN: AAGCV1234A</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Invoice Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Invoice No.</Label>
                    <Input defaultValue="INV-2025-0049" readOnly className="font-bold" />
                  </div>
                  <div>
                    <Label>Invoice Date</Label>
                    <Input type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} />
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input type="date" defaultValue={format(new Date(Date.now() + 30*24*60*60*1000), "yyyy-MM-dd")} />
                  </div>
                  <div>
                    <Label>PO Reference</Label>
                    <Input placeholder="Optional" />
                  </div>
                </div>

                {/* Tax Options */}
                {(isDomesticGST || applyTDS) && (
                  <div className="flex gap-6 flex-wrap">
                    {isDomesticGST && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rc" checked={reverseCharge} onCheckedChange={(c) => setReverseCharge(!!c)} />
                          <Label htmlFor="rc">Reverse Charge Applicable</Label>
                        </div>
                        {items.some(i => i.rate * i.qty > 250000) && (
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tds" checked={applyTDS} onCheckedChange={(c) => setApplyTDS(!!c)} />
                            <Label htmlFor="tds">Apply TDS u/s 194J @10%</Label>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Items Table */}
                <GlobalInvoiceItemsTable
                  items={items}
                  onItemsChange={setItems}
                  currency={currency}
                  currencySymbol={currencySymbol}
                  invoiceType={invoiceType}
                  placeOfSupply={placeOfSupply}
                  companyState="KL"
                  customerState={selectedCustomer?.state || ""}
                  reverseCharge={reverseCharge}
                />

                <div className="flex justify-end gap-3 pt-8">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="secondary">
                    <Send className="h-4 w-4 mr-2" />
                    Send Invoice
                  </Button>
                  <Button onClick={() => window.print()}>
                    <Download className="h-4 w-4 mr-2" />
                    Print / Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            {/* Your existing All Invoices table */}
            <Card>
              <CardHeader>
                <CardTitle>All Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3">Invoice</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th className="text-right">Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInvoices.map(inv => (
                        <tr key={inv.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-4 font-medium">{inv.id}</td>
                          <td>{format(new Date(inv.date), "dd MMM yyyy")}</td>
                          <td>{inv.customer}</td>
                          <td className="text-right font-semibold">{inv.amount}</td>
                          <td>
                            <Badge variant="outline">
                              {invoiceTypes.find(t => t.value === inv.type)?.label || inv.type}
                            </Badge>
                          </td>
                          <td><Badge>{inv.status}</Badge></td>
                          <td>
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}