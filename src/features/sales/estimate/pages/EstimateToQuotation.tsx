import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Paperclip,
  Activity,
  ArrowRight,
  Info
} from "lucide-react";

export default function EstimateToQuotation() {
  const navigate = useNavigate();

  // Checkbox states
  const [copyItems, setCopyItems] = useState(true);
  const [copyTerms, setCopyTerms] = useState(true);
  const [copyAttachments, setCopyAttachments] = useState(false);

  // Form states
  const [quoSeries, setQuoSeries] = useState("QUO-2026-");
  const [quoNo, setQuoNo] = useState("QUO-2026-0288");
  const [salesperson, setSalesperson] = useState("Arjun Jose");
  const [quoDate, setQuoDate] = useState("2026-05-31");
  const [validTill, setValidTill] = useState("2026-06-30");
  const [currency, setCurrency] = useState("INR - Indian Rupee");
  const [deliveryTerms, setDeliveryTerms] = useState("Ex-Works");

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
        <Link to="/dashboard/sales/estimate" className="hover:text-slate-600">Estimates</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/dashboard/sales/estimate/details" className="hover:text-slate-600">EST-2026-0513</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Convert to Quotation</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Estimate &rarr; Quotation</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review estimate details and convert it to a quotation.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/estimate/details")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/estimate")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5"
          >
            <ArrowRight className="h-4 w-4" />
            Convert to Quotation
          </Button>
        </div>
      </div>

      {/* --- Row 1: Source Estimate Summary Card --- */}
      <Card className="border-slate-100 bg-white">
        <CardContent className="p-5 text-xs text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Estimate No.</span>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 font-mono">EST-2026-0513</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[8px] px-1.5 py-0">Approved</Badge>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 mt-1 font-semibold">
                <span>Customer: Glow Systems Pvt Ltd</span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  Contact: Rahul Sharma 
                  <a href="#" className="text-slate-400 hover:text-slate-600"><Mail className="h-2.5 w-2.5" /></a>
                  <a href="#" className="text-slate-400 hover:text-slate-600"><Phone className="h-2.5 w-2.5" /></a>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Estimate Date</span>
              <span className="font-bold text-slate-800">31 May 2026</span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">Valid Till: 14 Jun 2026 (14 days left)</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Grand Total (₹)</span>
              <span className="font-extrabold text-slate-950 font-mono text-[13px]">{formatCurrency(198474)}</span>
              <span className="text-[9px] text-slate-400 font-bold">One Lakh Ninety Eight Thousand Four Hundred Seventy Four Only</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Status</span>
              <Badge className="w-fit bg-emerald-50 text-emerald-700 border-emerald-100 font-bold hover:bg-emerald-50 text-[9px] px-2 py-0.5">
                Approved
              </Badge>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-semibold">
                <span>Approved By:</span>
                <Avatar className="h-4.5 w-4.5 text-[7px] font-bold shrink-0">
                  <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 rounded-full font-bold">JS</div>
                </Avatar>
                <span className="font-bold text-slate-600">Jane Smith</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Main Layout Grid --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Quotation Details Form & Items Grid (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Form details card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quotation Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-5 text-xs text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Series */}
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Quotation Series <span className="text-rose-500">*</span></label>
                  <select
                    value={quoSeries}
                    onChange={(e) => setQuoSeries(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="QUO-2026-">QUO-2026-</option>
                  </select>
                </div>

                {/* Quotation No */}
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Quotation No. <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    value={quoNo}
                    disabled
                    className="p-2 border rounded-lg bg-slate-100 font-mono font-bold text-slate-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold">Auto generated</span>
                </div>

                {/* Copy from reference */}
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Copy From Estimate</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value="EST-2026-0513"
                      disabled
                      className="p-2 border rounded-lg bg-slate-100 font-mono font-semibold text-slate-500 w-full focus:outline-none"
                    />
                    <Button variant="outline" size="sm" className="h-8.5 bg-white border-slate-200 text-slate-700 font-bold px-2 py-1">
                      View Estimate
                    </Button>
                  </div>
                </div>

                {/* Salesperson */}
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Salesperson <span className="text-rose-500">*</span></label>
                  <select
                    value={salesperson}
                    onChange={(e) => setSalesperson(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-855 text-slate-800 focus:outline-none"
                  >
                    <option value="Arjun Jose">Arjun Jose</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Quotation Date <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    value={quoDate}
                    onChange={(e) => setQuoDate(e.target.value)}
                    className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                  />
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

                {/* Delivery terms */}
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

              </div>

              {/* Toggles checkboxes section */}
              <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Additional Options</span>
                <div className="flex flex-wrap gap-6 items-center mt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={copyItems}
                      onChange={(e) => setCopyItems(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Copy items from estimate</span>
                      <span className="text-[9px] text-slate-400 font-semibold">All items, quantities, rates and discounts will be copied.</span>
                    </div>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={copyTerms}
                      onChange={(e) => setCopyTerms(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">Copy terms and conditions</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Terms &amp; conditions from estimate will be copied.</span>
                    </div>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={copyAttachments}
                      onChange={(e) => setCopyAttachments(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-855 text-slate-800">Copy attachments</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Attachments from estimate will be copied.</span>
                    </div>
                  </label>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Copy Preview Items Grid */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Items to be included in quotation (4)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">#</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Item Code / Name</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-1/3">Description</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-16">Qty</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-16">UOM</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-24">Rate (₹)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-center w-20">Discount</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right w-28">Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-655 font-semibold">
                    {[
                      { idx: 1, code: "PRD-0001", name: "Laptop Dell XPS 13", desc: "13.4\" FHD, i7, 16GB RAM, 512GB SSD", qty: 2, uom: "Nos", rate: 78500.00, discount: "5%", amount: 149150.00 },
                      { idx: 2, code: "PRD-0005", name: "Wireless Mouse - Logitech", desc: "Logitech MX Master 3S", qty: 2, uom: "Nos", rate: 8200.00, discount: "0%", amount: 16400.00 },
                      { idx: 3, code: "PRD-0012", name: "USB-C Hub 7-in-1", desc: "7 Port USB-C Hub", qty: 2, uom: "Nos", rate: 3250.00, discount: "0%", amount: 6500.00 },
                      { idx: 4, code: "SRV-0003", name: "Installation and Setup", desc: "On-site installation and configuration", qty: 1, uom: "Job", rate: 5000.00, discount: "0%", amount: 5000.00 },
                    ].map((row) => (
                      <TableRow key={row.idx} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="text-center py-3.5 font-bold text-slate-455 text-slate-400">{row.idx}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800">{row.code}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-600 font-semibold leading-relaxed">
                          {row.desc}
                        </TableCell>
                        <TableCell className="py-3.5 text-center font-bold text-slate-800">{row.qty}</TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-500">{row.uom}</TableCell>
                        <TableCell className="py-3.5 text-right font-bold text-slate-800 font-mono">
                          {formatCurrency(row.rate).replace("₹", "").trim()}
                        </TableCell>
                        <TableCell className="py-3.5 text-center font-bold text-slate-700">{row.discount}</TableCell>
                        <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                          {formatCurrency(row.amount).replace("₹", "").trim()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* items info callout footer */}
              <div className="p-3 bg-slate-50/30 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                <span>Items and pricing are copied from the estimate. You can review or edit after creating the quotation.</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar Widget Panels */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Summary calculations recap Card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimate Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed font-semibold text-slate-655">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Items</span>
                <span className="font-bold text-slate-800 font-mono">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-bold text-slate-855 text-slate-800 font-mono">{formatCurrency(177050.00)}</span>
              </div>
              <div className="flex items-center justify-between text-rose-605 text-rose-600">
                <span className="font-semibold text-rose-500">Discount</span>
                <span className="font-bold font-mono">- {formatCurrency(8852.50)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 mt-0.5">
                <span className="text-slate-400">Taxable Amount</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(168197.50)}</span>
              </div>

              {/* CGST / SGST list */}
              <div className="flex flex-col gap-1.5 pl-3 border-l border-slate-200 py-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(15137.78)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(15137.78)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-slate-400">Rounding Off</span>
                <span className="font-bold text-slate-800 font-mono">₹ 0.94</span>
              </div>

              <div className="flex flex-col gap-1 border-t pt-3 mt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Grand Total</span>
                  <span className="font-extrabold text-blue-600 text-sm font-mono">{formatCurrency(198474.00)}</span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold leading-tight">
                  (One Lakh Ninety Eight Thousand Four Hundred Seventy Four Only)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* What happens next instruction Card */}
          <Card className="border-slate-100 bg-blue-50/20 border-l-2 border-l-blue-600">
            <CardContent className="p-4 flex flex-col gap-2 text-xs">
              <span className="font-extrabold text-blue-700 flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                What happens next?
              </span>
              <p className="font-semibold text-slate-655 leading-relaxed text-[11px]">
                A new quotation will be created with the selected details. You can further review, edit and send it to the customer.
              </p>
            </CardContent>
          </Card>

          {/* Attachments Card list */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments (2)</CardTitle>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-slate-655 font-semibold">
              <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px] flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> EST-2026-0513_Proposal.pdf
                </span>
                <span className="text-[9px] text-slate-400 font-bold shrink-0">(312 KB)</span>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px] flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> Product_Specifications.pdf
                </span>
                <span className="text-[9px] text-slate-400 font-bold shrink-0">(1.2 MB)</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity history list */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4 text-[10px]">
              <div className="relative flex flex-col gap-4 pl-3 border-l border-slate-200 py-1">
                
                {/* Activity 1 */}
                <div className="relative flex flex-col gap-0.5 leading-tight font-semibold text-slate-600">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-emerald-500 border border-white rounded-full" />
                  <span>Estimate approved by Jane Smith</span>
                  <span className="text-[9px] text-slate-400 font-bold">31 May 2026, 04:32 PM</span>
                </div>

                {/* Activity 2 */}
                <div className="relative flex flex-col gap-0.5 leading-tight font-semibold text-slate-600">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                  <span>Arjun Jose initiated conversion to quotation</span>
                  <span className="text-[9px] text-slate-400 font-bold">31 May 2026, 04:40 PM</span>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
