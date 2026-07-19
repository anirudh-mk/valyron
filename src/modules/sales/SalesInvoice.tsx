import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Eye, Download, Send } from "lucide-react";
import { format } from "date-fns";
import LedgerAutoComplete from "@/components/CommonComponents/LedgerAutoComplete";
import { FrappeStyleInvoiceTable } from "@/components/ItemTable/GlobalInvoiceItemsTable";
import GridTable from "@/components/ItemTable/GridTable";
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
  const isDomesticGST = invoiceType === "tax_invoice" && isIndianCustomer;

  const currencySymbol = currencies.find(c => c.value === currency)?.symbol || "₹";



  const [state, setState] = useState({
    voucherType: "Sales Invoice",
    currency: "INR", 
    exchangeRate: 1,
    placeOfSupply: "KL",
    reverseCharge: false,
    applyTDS: false,
    selectedCustomer: null,
    items: [],
    grandtotal: 0,
    taxamount: 0,
    taxpercent: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto ">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-2">
            <TabsTrigger value="all">All Invoices (48)</TabsTrigger>
            <TabsTrigger value="create">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-0">
            <div className="bg-white border rounded shadow-sm flex flex-col font-sans">
              {/* Toolbar Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b bg-[#f3f4f6]">
                <div className="flex items-center gap-3">
                  <h2 className="text-[13px] font-bold text-gray-700 uppercase tracking-widest pl-1">Create Sales Invoice</h2>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-[10px] rounded-sm px-1.5 py-0 font-medium tracking-wide">DRAFT</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-6 px-2.5 text-[11px] bg-white rounded-sm border-gray-300 font-medium shadow-sm hover:bg-gray-50">Save</Button>
                  <Button variant="secondary" size="sm" className="h-6 px-2.5 text-[11px] bg-white text-gray-700 rounded-sm border-gray-300 shadow-sm hover:bg-gray-50 font-medium">
                    <Download className="h-3 w-3 mr-1.5 text-gray-500" /> PDF
                  </Button>
                  <Button size="sm" className="h-6 px-3.5 text-[11px] bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium shadow-sm">
                    <Send className="h-3 w-3 mr-1.5" /> Submit
                  </Button>
                </div>
              </div>

              {/* Form Body - Excel Style Dense Layout */}
              <div className="border-b bg-gray-50/50">
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x border-gray-200">
                  
                  {/* Ledger / Customer Details */}
                  <div className="lg:col-span-5 p-3">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pl-1">Customer Information</h3>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center">
                        <Label className="w-24 text-[11px] font-medium text-gray-500 text-right pr-3">Customer</Label>
                        <div className="flex-1">
                          <LedgerAutoComplete
                            ledgers={ledgers}
                            onSelect={(ledger) => setSelectedCustomer(ledger)}
                          />
                        </div>
                      </div>
                      
                      {selectedCustomer && (
                        <div className="ml-24 text-[11px] bg-white p-2 border rounded-sm border-gray-200 shadow-sm flex flex-col gap-0.5 mt-0.5">
                          <div className="font-bold text-gray-800 text-[12px]">{selectedCustomer.name}</div>
                          <div className="text-gray-500">{selectedCustomer.country} {selectedCustomer.gstin ? <span className="text-gray-400 font-mono ml-1">| GSTIN: {selectedCustomer.gstin}</span> : ""}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Details */}
                  <div className="lg:col-span-4 p-3">
                     <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pl-1">Invoice Details</h3>
                     <div className="grid gap-1.5">
                        <div className="flex items-center">
                          <Label className="w-24 text-[11px] font-medium text-gray-500 text-right pr-3">Invoice No.</Label>
                          <Input defaultValue="INV-2025-0049" readOnly className="flex-1 h-6 text-[11px] rounded-sm font-semibold bg-gray-100 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 px-2" />
                        </div>
                        <div className="flex items-center">
                          <Label className="w-24 text-[11px] font-medium text-gray-500 text-right pr-3">Date</Label>
                          <Input type="date" defaultValue={format(new Date(), "yyyy-MM-dd")} className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 px-2" />
                        </div>
                        <div className="flex items-center">
                          <Label className="w-24 text-[11px] font-medium text-gray-500 text-right pr-3">Due Date</Label>
                          <Input type="date" defaultValue={format(new Date(Date.now() + 30*24*60*60*1000), "yyyy-MM-dd")} className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 px-2" />
                        </div>
                        <div className="flex items-center">
                          <Label className="w-24 text-[11px] font-medium text-gray-500 text-right pr-3">PO Ref.</Label>
                          <Input placeholder="Optional" className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 px-2" />
                        </div>
                     </div>
                  </div>

                  {/* Accounting Details */}
                  <div className="lg:col-span-3 p-3">
                     <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 pl-1">Accounting</h3>
                     <div className="grid gap-1.5">
                        <div className="flex items-center">
                          <Label className="w-20 text-[11px] font-medium text-gray-500 text-right pr-3">Type</Label>
                          <Select value={invoiceType} onValueChange={setInvoiceType}>
                            <SelectTrigger className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 px-2 bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {invoiceTypes.map(t => (
                                <SelectItem key={t.value} value={t.value} className="text-[11px] py-1">{t.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center">
                          <Label className="w-20 text-[11px] font-medium text-gray-500 text-right pr-3">Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 px-2 bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map(c => (
                                <SelectItem key={c.value} value={c.value} className="text-[11px] py-1">
                                  {c.symbol} {c.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {isDomesticGST && (
                          <div className="flex items-center">
                            <Label className="w-20 text-[11px] font-medium text-gray-500 text-right pr-3">PoS</Label>
                            <Select value={placeOfSupply} onValueChange={setPlaceOfSupply}>
                              <SelectTrigger className="flex-1 h-6 text-[11px] rounded-sm border-gray-200 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 px-2 bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {indianStates.map(s => (
                                  <SelectItem key={s.code} value={s.code} className="text-[11px] py-1">{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {(isDomesticGST || applyTDS) && (
                           <div className="flex flex-col gap-1.5 mt-1 pl-20 pt-2 border-t border-dashed border-gray-200">
                             {isDomesticGST && (
                               <div className="flex items-center space-x-2">
                                 <Checkbox id="rc" className="w-3.5 h-3.5 rounded-[2px]" checked={reverseCharge} onCheckedChange={(c) => setReverseCharge(!!c)} />
                                 <Label htmlFor="rc" className="text-[10px] text-gray-600 font-medium leading-none cursor-pointer">Reverse Charge</Label>
                               </div>
                             )}
                             {(isDomesticGST && items.some(i => i.rate * i.qty > 250000)) && (
                               <div className="flex items-center space-x-2">
                                 <Checkbox id="tds" className="w-3.5 h-3.5 rounded-[2px]" checked={applyTDS} onCheckedChange={(c) => setApplyTDS(!!c)} />
                                 <Label htmlFor="tds" className="text-[10px] text-gray-600 font-medium leading-none cursor-pointer">Apply TDS u/s 194J</Label>
                               </div>
                             )}
                           </div>
                        )}
                     </div>
                  </div>
                </div>
              </div>

              {/* Items Table Background Block */}
                <GridTable/>
            </div>
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
                        <tr key={inv.id} className="border-t hover:bg-gray-50 text-[13px]">
                          <td className="px-4 py-4">{inv.id}</td>
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