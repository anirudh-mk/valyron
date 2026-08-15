import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Copy,
  ChevronRight,
  UploadCloud,
  FileText as FileIcon,
  HelpCircle,
  Undo2,
  Save,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Eraser,
  Heading
} from "lucide-react";

export interface QuotationLineItem {
  id: string;
  itemCode: string;
  itemName: string;
  description: string;
  qty: number;
  uom: string;
  rate: number;
  discountPct: number;
  amount: number;
}

const defaultItems: QuotationLineItem[] = [
  { id: "1", itemCode: "PRD-0001", itemName: "Laptop Dell XPS 13", description: "13.4\" FHD, i7, 16GB RAM, 512GB SSD", qty: 2, uom: "Nos", rate: 78500.00, discountPct: 5, amount: 149150.00 },
  { id: "2", itemCode: "PRD-0005", itemName: "Wireless Mouse - Logitech", description: "Logitech MX Master 3S", qty: 2, uom: "Nos", rate: 8200.00, discountPct: 0, amount: 16400.00 },
  { id: "3", itemCode: "PRD-0012", itemName: "USB-C Hub 7-in-1", description: "7 Port USB-C Hub", qty: 2, uom: "Nos", rate: 3250.00, discountPct: 0, amount: 6500.00 },
  { id: "4", itemCode: "SRV-0003", itemName: "Installation and Setup", description: "On-site installation and configuration", qty: 1, uom: "Job", rate: 5000.00, discountPct: 0, amount: 5000.00 },
];

export default function QuotationCreate() {
  const navigate = useNavigate();

  // Wizard state
  const [step, setStep] = useState(1);

  // Form states
  const [customer, setCustomer] = useState("Glow Systems Pvt Ltd");
  const [contactPerson, setContactPerson] = useState("Rahul Sharma");
  const [salesperson, setSalesperson] = useState("Arjun Jose");
  const [quotationSeries, setQuotationSeries] = useState("QUO-2026-");
  const [quotationDate, setQuotationDate] = useState("2026-05-31");
  const [validTill, setValidTill] = useState("2026-06-30");
  const [currency, setCurrency] = useState("INR - Indian Rupee");
  const [priceList, setPriceList] = useState("Standard Selling");
  const [deliveryTerms, setDeliveryTerms] = useState("Ex-Works");
  const [reference, setReference] = useState("");
  const [customerPo, setCustomerPo] = useState("");
  const [template, setTemplate] = useState("Standard Template");

  // Items grid
  const [items, setItems] = useState<QuotationLineItem[]>(defaultItems);

  // Totals calculations
  const [subtotal, setSubtotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [taxableAmount, setTaxableAmount] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [rounding, setRounding] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    let sub = 0;
    let disc = 0;

    items.forEach((item) => {
      const itemSub = item.qty * item.rate;
      const itemDisc = itemSub * (item.discountPct / 100);
      sub += itemSub;
      disc += itemDisc;
    });

    const taxable = sub - disc;
    const cgstTax = taxable * 0.09;
    const sgstTax = taxable * 0.09;
    const rawTotal = taxable + cgstTax + sgstTax;
    const roundedTotal = Math.round(rawTotal);
    const roundOff = roundedTotal - rawTotal;

    setSubtotal(sub);
    setDiscountTotal(disc);
    setTaxableAmount(taxable);
    setCgst(cgstTax);
    setSgst(sgstTax);
    setRounding(roundOff);
    setGrandTotal(roundedTotal);
  }, [items]);

  const handleQtyChange = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, qty);
          const sub = newQty * item.rate;
          const disc = sub * (item.discountPct / 100);
          return { ...item, qty: newQty, amount: sub - disc };
        }
        return item;
      })
    );
  };

  const handleRateChange = (id: string, rate: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newRate = Math.max(0, rate);
          const sub = item.qty * newRate;
          const disc = sub * (item.discountPct / 100);
          return { ...item, rate: newRate, amount: sub - disc };
        }
        return item;
      })
    );
  };

  const handleDiscountChange = (id: string, discPct: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newDisc = Math.min(100, Math.max(0, discPct));
          const sub = item.qty * item.rate;
          const disc = sub * (newDisc / 100);
          return { ...item, discountPct: newDisc, amount: sub - disc };
        }
        return item;
      })
    );
  };

  const handleAddItem = () => {
    const newItemId = (items.length + 1).toString();
    setItems((prev) => [
      ...prev,
      {
        id: newItemId,
        itemCode: "",
        itemName: "",
        description: "",
        qty: 1,
        uom: "Nos",
        rate: 0,
        discountPct: 0,
        amount: 0,
      },
    ]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDuplicateItem = (id: string) => {
    const target = items.find((item) => item.id === id);
    if (!target) return;

    const newItemId = (items.length + 1).toString();
    setItems((prev) => [
      ...prev,
      {
        ...target,
        id: newItemId,
      },
    ]);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6 pb-24">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">New Quotation</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Quotation</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Create a new quotation for your customer.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700"
          >
            Save as Draft
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5"
          >
            Save &amp; Send
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* --- Main Section Columns Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Input Details Forms Block (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Card 1: Customer & Quotation Details */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer &amp; Quotation Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600">
              
              {/* Customer selection */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-700">Customer <span className="text-rose-500">*</span></label>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">+ New Customer</button>
                </div>
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="Glow Systems Pvt Ltd">Glow Systems Pvt Ltd</option>
                </select>
              </div>

              {/* Quotation Series */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Quotation Series <span className="text-rose-500">*</span></label>
                <select
                  value={quotationSeries}
                  onChange={(e) => setQuotationSeries(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="QUO-2026-">QUO-2026-</option>
                </select>
              </div>

              {/* Salesperson */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Salesperson <span className="text-rose-500">*</span></label>
                <select
                  value={salesperson}
                  onChange={(e) => setSalesperson(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="Arjun Jose">Arjun Jose</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              {/* Contact Person */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Contact Person</label>
                <select
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-855 text-slate-800 focus:outline-none"
                >
                  <option value="Rahul Sharma">Rahul Sharma</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Quotation Date <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  value={quotationDate}
                  onChange={(e) => setQuotationDate(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Company</label>
                <input
                  type="text"
                  value="Glow Systems Pvt Ltd"
                  disabled
                  className="p-2 border rounded-lg bg-slate-100 font-semibold text-slate-500 focus:outline-none"
                />
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Currency <span className="text-rose-500">*</span></label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="INR - Indian Rupee">INR - Indian Rupee</option>
                </select>
              </div>

              {/* Valid Till */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Valid Till <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  value={validTill}
                  onChange={(e) => setValidTill(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Branch */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Branch</label>
                <input
                  type="text"
                  value="Main Branch"
                  disabled
                  className="p-2 border rounded-lg bg-slate-100 font-semibold text-slate-500 focus:outline-none"
                />
              </div>

              {/* Price List */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Price List <span className="text-rose-500">*</span></label>
                <select
                  value={priceList}
                  onChange={(e) => setPriceList(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="Standard Selling">Standard Selling</option>
                </select>
              </div>

              {/* Delivery Terms */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Delivery Terms</label>
                <select
                  value={deliveryTerms}
                  onChange={(e) => setDeliveryTerms(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="Ex-Works">Ex-Works</option>
                </select>
              </div>

            </CardContent>
          </Card>

          {/* Card 2: Line Items Grid Editor */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Items</CardTitle>
              <div className="flex items-center gap-2">
                <Button onClick={handleAddItem} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1 px-2.5 h-7">
                  + Add Item
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-[10px] py-1 px-2.5 h-7">
                  + Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">#</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-[220px]">Item Code / Name *</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Description</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-18">Qty *</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-18">UOM *</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-24">Rate (₹) *</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-28">Discount</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-28">Amount (₹)</TableHead>
                      <TableHead className="w-20 text-center py-2.5">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((row, idx) => (
                      <TableRow key={row.id} className="hover:bg-slate-50/20 transition-colors">
                        <TableCell className="text-center py-3 font-bold text-slate-400">{idx + 1}</TableCell>
                        <TableCell className="py-3">
                          <input
                            type="text"
                            placeholder="Search item..."
                            value={row.itemCode ? `${row.itemCode} - ${row.itemName}` : ""}
                            onChange={() => {}}
                            className="p-1.5 border rounded w-full bg-white font-semibold text-slate-800 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <input
                            type="text"
                            placeholder="Item description..."
                            value={row.description}
                            onChange={() => {}}
                            className="p-1.5 border rounded w-full bg-white font-semibold text-slate-700 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <input
                            type="number"
                            value={row.qty}
                            onChange={(e) => handleQtyChange(row.id, parseInt(e.target.value) || 0)}
                            className="p-1.5 border rounded w-14 text-center font-bold text-slate-800 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <select
                            value={row.uom}
                            onChange={() => {}}
                            className="p-1.5 border rounded w-16 bg-white font-semibold text-slate-755 text-slate-800 focus:outline-none"
                          >
                            <option value="Nos">Nos</option>
                            <option value="Job">Job</option>
                          </select>
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <input
                            type="number"
                            value={row.rate}
                            onChange={(e) => handleRateChange(row.id, parseFloat(e.target.value) || 0)}
                            className="p-1.5 border rounded w-22 text-right font-mono font-bold text-slate-800 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <div className="flex items-center gap-1 border rounded bg-white p-0.5 overflow-hidden">
                            <input
                              type="number"
                              value={row.discountPct}
                              onChange={(e) => handleDiscountChange(row.id, parseFloat(e.target.value) || 0)}
                              className="p-1 w-10 text-center font-bold text-slate-800 focus:outline-none"
                            />
                            <div className="flex bg-slate-100 text-[8px] font-bold rounded">
                              <span className="p-0.5 px-1 bg-white text-blue-600 border shadow-xs rounded">%</span>
                              <span className="p-0.5 px-1 text-slate-400 cursor-pointer">₹</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-right font-bold text-slate-900 font-mono">
                          {formatCurrency(row.amount).replace("₹", "").trim()}
                        </TableCell>
                        
                        <TableCell className="text-center py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-slate-400 hover:bg-slate-100"
                              onClick={() => handleDuplicateItem(row.id)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-rose-500 hover:bg-rose-50"
                              onClick={() => handleDeleteItem(row.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Terms and conditions rich-text editor */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Terms &amp; Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-5 text-xs">
              
              {/* Terms editor */}
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-800">Terms &amp; Conditions</span>
                <div className="flex flex-col border rounded-lg bg-white overflow-hidden shadow-xs">
                  {/* formatting tool bar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-100">
                    <select className="p-1 border rounded bg-white text-[10px] font-bold text-slate-600 focus:outline-none"><option>Normal</option></select>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Bold className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Italic className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Underline className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Strikethrough className="h-3.5 w-3.5" /></button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><List className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ListOrdered className="h-3.5 w-3.5" /></button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Link2 className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ImageIcon className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Eraser className="h-3.5 w-3.5" /></button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Type terms and conditions here..."
                    className="p-3 w-full bg-white font-semibold text-slate-700 focus:outline-none resize-y"
                  />
                </div>
              </div>

              {/* Customer Note editor */}
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-800">Customer Note</span>
                <div className="flex flex-col border rounded-lg bg-white overflow-hidden shadow-xs">
                  {/* formatting tool bar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-100">
                    <select className="p-1 border rounded bg-white text-[10px] font-bold text-slate-600 focus:outline-none"><option>Normal</option></select>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Bold className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Italic className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Underline className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Strikethrough className="h-3.5 w-3.5" /></button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><List className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ListOrdered className="h-3.5 w-3.5" /></button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Link2 className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><ImageIcon className="h-3.5 w-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Eraser className="h-3.5 w-3.5" /></button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Type a note for your customer..."
                    className="p-3 w-full bg-white font-semibold text-slate-700 focus:outline-none resize-y"
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Card 4: Additional Information Form inputs */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-xs text-slate-600 flex flex-col md:flex-row md:items-start gap-6">
              
              <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Reference / Project</label>
                  <input
                    type="text"
                    placeholder="Enter reference or project"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Customer PO No.</label>
                  <input
                    type="text"
                    placeholder="Enter customer po no."
                    value={customerPo}
                    onChange={(e) => setCustomerPo(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Quotation Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="Standard Template">Standard Template</option>
                  </select>
                </div>
              </div>

              {/* Upload Drag box */}
              <div className="w-full md:w-1/3 flex flex-col gap-1.5 shrink-0">
                <span className="font-bold text-slate-800">Attachments</span>
                <div className="border border-dashed border-slate-200 bg-slate-50/50 p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                  <UploadCloud className="h-6 w-6 text-slate-400 mb-1.5" />
                  <span className="font-bold text-blue-600 hover:underline">Upload Files</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">or drag files here</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-2">Max file size: 10MB. Supports: PDF, DOC, XLS...</span>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Right Totals Sidebar Panel */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed font-semibold text-slate-655">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sum Intel</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(subtotal).replace("₹", "").trim()}</span>
              </div>
              <div className="flex items-center justify-between text-rose-600">
                <span className="font-semibold text-rose-500">Discount</span>
                <span className="font-bold font-mono">- {formatCurrency(discountTotal).replace("₹", "").trim()}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 mt-0.5">
                <span className="text-slate-400">Taxable Amount</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(taxableAmount).replace("₹", "").trim()}</span>
              </div>

              {/* CGST / SGST list */}
              <div className="flex flex-col gap-1.5 pl-3 border-l border-slate-200 py-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(cgst).replace("₹", "").trim()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(sgst).replace("₹", "").trim()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-slate-400">Rounding Off</span>
                <span className="font-bold text-slate-800 font-mono">₹ {rounding.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between border-t pt-3 mt-1 text-sm font-extrabold">
                <span className="text-slate-900">Grand Total (₹)</span>
                <span className="text-blue-600 font-mono">{formatCurrency(grandTotal).replace("₹", "").trim()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* --- Stepper Wizard Sticky Bottom Navigation Footer --- */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-6 py-4.5 flex items-center justify-between shadow-lg z-50">
        
        {/* badges steps */}
        <div className="flex items-center gap-4 text-xs font-bold">
          
          <div className="flex items-center gap-1.5">
            <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step === 1 ? "bg-blue-600 text-white" : "border text-slate-400"} font-bold`}>
              1
            </span>
            <span className={step === 1 ? "text-slate-900 font-bold" : "text-slate-400 font-semibold"}>Details</span>
          </div>

          <div className="h-px w-6 bg-slate-200" />

          <div className="flex items-center gap-1.5">
            <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step === 2 ? "bg-blue-600 text-white" : "border text-slate-400"} font-bold`}>
              2
            </span>
            <span className={step === 2 ? "text-slate-900 font-bold" : "text-slate-400 font-semibold"}>Items</span>
          </div>

          <div className="h-px w-6 bg-slate-200" />

          <div className="flex items-center gap-1.5">
            <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step === 3 ? "bg-blue-600 text-white" : "border text-slate-400"} font-bold`}>
              3
            </span>
            <span className={step === 3 ? "text-slate-900 font-bold" : "text-slate-400 font-semibold"}>Preview</span>
          </div>

        </div>

        {/* actions on right */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700 h-8 px-4"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 h-8 px-4"
          >
            Save &amp; Send
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>

    </div>
  );
}
