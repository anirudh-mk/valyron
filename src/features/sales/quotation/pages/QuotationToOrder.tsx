import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Search,
  ChevronDown,
  Plus,
  ChevronRight,
  Eye,
  Trash2,
  Copy,
  Info,
  Calendar,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Mail,
  Phone
} from "lucide-react";

export interface ConversionLineItem {
  id: string;
  itemCode: string;
  itemName: string;
  description: string;
  qty: number;
  uom: string;
  rate: number;
  discountPct: number;
  amount: number;
  selected: boolean;
}

const defaultItems: ConversionLineItem[] = [
  { id: "1", itemCode: "PRD-0001", itemName: "Laptop Dell XPS 13", description: "13.4\" FHD, i7, 16GB RAM, 512GB SSD", qty: 2, uom: "Nos", rate: 78500.00, discountPct: 5, amount: 149150.00, selected: true },
  { id: "2", itemCode: "PRD-0005", itemName: "Wireless Mouse - Logitech", description: "Logitech MX Master 3S", qty: 2, uom: "Nos", rate: 8200.00, discountPct: 0, amount: 16400.00, selected: true },
  { id: "3", itemCode: "PRD-0012", itemName: "USB-C Hub 7-in-1", description: "7 Port USB-C Hub", qty: 2, uom: "Nos", rate: 3250.00, discountPct: 0, amount: 6500.00, selected: true },
  { id: "4", itemCode: "SRV-0003", itemName: "Installation and Setup", description: "On-site installation and configuration", qty: 1, uom: "Job", rate: 5000.00, discountPct: 0, amount: 5000.00, selected: true },
];

export default function QuotationToOrder() {
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState<"items" | "charges" | "terms" | "attachments">("items");

  // Items grid state
  const [items, setItems] = useState<ConversionLineItem[]>(defaultItems);

  // Address
  const [shippingAddress, setShippingAddress] = useState("Glow Systems Pvt Ltd, 45, 2nd Floor, Prestige Chambers, Residency Road, Bangalore - 560025, Karnataka, India");

  // Sidebar forms
  const [company, setCompany] = useState("Glow Systems Pvt Ltd");
  const [branch, setBranch] = useState("Main Branch");
  const [orderType, setOrderType] = useState("Regular");
  const [orderDate, setOrderDate] = useState("2026-05-31");
  const [deliveryDate, setDeliveryDate] = useState("2026-06-07");
  const [reference, setReference] = useState("");

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
      if (!item.selected) return;
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

  const handleToggleSelect = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setItems((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

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

  const handleDiscountChange = (id: string, discountPct: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newDisc = Math.min(100, Math.max(0, discountPct));
          const sub = item.qty * item.rate;
          const disc = sub * (newDisc / 100);
          return { ...item, discountPct: newDisc, amount: sub - disc };
        }
        return item;
      })
    );
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/dashboard/sales/quotation/details" className="hover:text-slate-600">QUO-2026-0288</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Create Sales Order</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Sales Order from Quotation</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review quotation details and confirm items to create a sales order.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation/details")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700 h-8"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 h-8"
          >
            Create Sales Order
          </Button>
        </div>
      </div>

      {/* --- Row 1: Source Quotation summary Card --- */}
      <Card className="border-slate-100 bg-white">
        <CardContent className="p-5 text-xs text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quotation</span>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 font-mono">QUO-2026-0288</span>
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[8px] px-1.5 py-0">Sent</Badge>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 mt-1 font-semibold">
                <span>Customer: Glow Systems Pvt Ltd</span>
                <span>Quotation Date: 31 May 2026</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Valid Till</span>
              <span className="font-bold text-slate-800">30 Jun 2026</span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">(30 days left)</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Salesperson</span>
              <div className="flex items-center gap-1">
                <Avatar className="h-4.5 w-4.5 text-[7px] font-bold">
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                </Avatar>
                <span className="font-bold text-slate-800">Arjun Jose</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold mt-1">Price List: Standard Selling</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Grand Total (₹)</span>
              <span className="font-extrabold text-slate-900 font-mono text-[13px]">{formatCurrency(198474)}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] text-slate-400 font-bold">INR - Indian Rupee</span>
                <Button variant="outline" size="sm" className="h-6 bg-white border-slate-200 text-slate-700 font-bold px-2 py-0.5 text-[8px] gap-1">
                  <Eye className="h-2.5 w-2.5" /> View Quotation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Main Section Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Main form details checklist and table (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Tab Selection Header */}
          <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2">
            {[
              { id: "items", label: "Items" },
              { id: "charges", label: "Additional Charges" },
              { id: "terms", label: "Terms & Notes" },
              { id: "attachments", label: "Attachments" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4.5 border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items checklist Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Items from Quotation (4)</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-[10px] py-1 px-2.5 h-7 gap-1">
                  <RefreshCw className="h-3 w-3" /> Update Items
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-[10px] py-1 px-2.5 h-7">
                  + Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 text-xs">
              
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">
                        <input
                          type="checkbox"
                          checked={items.every((it) => it.selected)}
                          onChange={handleToggleSelectAll}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                      </TableHead>
                      <TableHead className="w-12 text-center py-2.5">#</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-[200px]">Item Code / Name</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Description</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-16">Qty</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-18">UOM</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-24">Rate (₹)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-24">Discount (%)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-24">Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-655 font-semibold">
                    {items.map((row, idx) => (
                      <TableRow
                        key={row.id}
                        className={`hover:bg-slate-50/50 transition-colors ${!row.selected ? "opacity-40" : ""}`}
                      >
                        <TableCell className="text-center py-3">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={() => handleToggleSelect(row.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell className="text-center py-3 font-bold text-slate-455 text-slate-400">{idx + 1}</TableCell>
                        <TableCell className="py-3">
                          <div className="flex flex-col gap-0.2 font-bold text-slate-800">
                            <span>{row.itemCode}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{row.itemName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-slate-600 font-semibold leading-relaxed">
                          {row.description}
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <input
                            type="number"
                            value={row.qty}
                            disabled={!row.selected}
                            onChange={(e) => handleQtyChange(row.id, parseInt(e.target.value) || 0)}
                            className="p-1 border rounded w-12 text-center font-bold text-slate-800 focus:outline-none disabled:bg-slate-50"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <select
                            value={row.uom}
                            disabled={!row.selected}
                            onChange={() => {}}
                            className="p-1 border rounded bg-white text-slate-800 focus:outline-none disabled:bg-slate-50"
                          >
                            <option value="Nos">Nos</option>
                            <option value="Job">Job</option>
                          </select>
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          <input
                            type="number"
                            value={row.rate}
                            disabled={!row.selected}
                            onChange={(e) => handleRateChange(row.id, parseFloat(e.target.value) || 0)}
                            className="p-1 border rounded w-20 text-right font-mono font-bold text-slate-800 focus:outline-none disabled:bg-slate-50"
                          />
                        </TableCell>
                        <TableCell className="py-3 text-center">
                          <input
                            type="number"
                            value={row.discountPct}
                            disabled={!row.selected}
                            onChange={(e) => handleDiscountChange(row.id, parseFloat(e.target.value) || 0)}
                            className="p-1 border rounded w-12 text-center font-bold text-slate-800 focus:outline-none disabled:bg-slate-50"
                          />
                        </TableCell>
                        <TableCell className="py-3 text-right font-bold text-slate-900 font-mono">
                          {formatCurrency(row.amount).replace("₹", "").trim()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* bottom add items */}
              <div className="p-3 bg-slate-50/20 border-t border-slate-100 flex items-center">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-[10px] py-1.5 px-3 h-7.5">
                  + Add Item from Quotation
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* Lower notes and addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Customer Note */}
            <Card className="border-slate-100">
              <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-2.5">
                <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Note</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-xs font-semibold">
                <textarea
                  rows={3}
                  placeholder="Add a note for internal reference (won't be visible to customer)"
                  className="p-2.5 w-full border rounded-lg bg-slate-50/30 text-slate-755 text-slate-700 focus:bg-white focus:outline-none"
                />
              </CardContent>
            </Card>

            {/* Card 2: Shipping Address selection */}
            <Card className="border-slate-100">
              <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-2.5 flex flex-row items-center justify-between">
                <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shipping Address</CardTitle>
                <button className="text-[9px] font-bold text-blue-600 hover:underline">+ Add New Address</button>
              </CardHeader>
              <CardContent className="p-4 text-xs font-semibold text-slate-655 flex flex-col gap-2">
                <select
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="p-2.5 border rounded-lg bg-slate-50/30 text-slate-800 focus:outline-none cursor-pointer leading-relaxed text-[11px]"
                >
                  <option value="Glow Systems Pvt Ltd, 45, 2nd Floor, Prestige Chambers, Residency Road, Bangalore - 560025, Karnataka, India">
                    Glow Systems Pvt Ltd, 45, 2nd Floor, Prestige Chambers, Residency Road, Bangalore - 560025, Karnataka, India
                  </option>
                </select>
              </CardContent>
            </Card>

          </div>

        </div>

        {/* Right Sidebar stats & parameters inputs */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Summary calculations recap Card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed font-semibold text-slate-655">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Items</span>
                <span className="font-bold text-slate-900 font-mono">{items.filter((it) => it.selected).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sub Total (₹)</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(subtotal).replace("₹", "").trim()}</span>
              </div>
              <div className="flex items-center justify-between text-rose-600">
                <span className="font-semibold text-rose-500">Discount (₹)</span>
                <span className="font-bold font-mono">{formatCurrency(discountTotal).replace("₹", "").trim()}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 mt-0.5">
                <span className="text-slate-400">Taxable Amount (₹)</span>
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
                <span className="font-bold text-slate-800 font-mono">{rounding.toFixed(2)}</span>
              </div>

              <div className="flex flex-col gap-1 border-t pt-3 mt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Grand Total (₹)</span>
                  <span className="font-extrabold text-blue-600 text-sm font-mono">{formatCurrency(grandTotal).replace("₹", "").trim()}</span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold leading-tight">
                  (One Lakh Ninety Eight Thousand Four Hundred Seventy Four Only)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Sales Order parameters form Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sales Order Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4 text-xs font-semibold text-slate-600">
              
              {/* Company */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Company <span className="text-rose-500">*</span></label>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="p-2 border rounded-lg bg-white focus:outline-none"
                >
                  <option value="Glow Systems Pvt Ltd">Glow Systems Pvt Ltd</option>
                </select>
              </div>

              {/* Branch */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Branch <span className="text-rose-500">*</span></label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="p-2 border rounded-lg bg-white focus:outline-none"
                >
                  <option value="Main Branch">Main Branch</option>
                </select>
              </div>

              {/* Order Type */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Order Type <span className="text-rose-500">*</span></label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="p-2 border rounded-lg bg-white focus:outline-none"
                >
                  <option value="Regular">Regular</option>
                </select>
              </div>

              {/* Order Date */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Order Date <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold focus:outline-none"
                />
              </div>

              {/* Delivery Date */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold focus:outline-none"
                />
              </div>

              {/* Reference / Project */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Reference / Project</label>
                <input
                  type="text"
                  placeholder="Enter reference or project"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold focus:outline-none"
                />
              </div>

            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
