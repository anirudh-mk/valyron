import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Send,
  Printer,
  MoreHorizontal,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  User,
  Paperclip,
  CheckSquare,
  Copy,
  Trash2,
  FileCheck,
  FileQuestion,
  Activity
} from "lucide-react";

export default function QuotationDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"items" | "terms" | "attachments" | "history" | "documents">("items");

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
        <span className="text-slate-655 font-extrabold">QUO-2026-0288</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quotation Details</h1>
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px]">
            Sent
          </Badge>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation/create")}
            className="bg-white border-slate-200 font-bold text-xs text-slate-700 h-8"
          >
            Edit
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700 h-8">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 h-8"
          >
            <Send className="h-4 w-4" />
            Send Quotation
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* --- Row 1: Detailed Metadata Grid --- */}
      <Card className="border-slate-100 bg-white">
        <CardContent className="p-6 text-xs text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-4">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Quotation No.</span>
              <span className="font-extrabold text-slate-900 font-mono text-sm">QUO-2026-0288</span>
              <span className="text-[10px] text-slate-400 font-semibold mt-1">Quotation Series: QUO-2026-</span>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Customer</span>
              <span className="font-bold text-blue-600 hover:underline cursor-pointer">Glow Systems Pvt Ltd</span>
              <button className="text-[10px] font-bold text-slate-400 text-left hover:text-slate-600 mt-1">View Customer</button>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Contact Person</span>
              <span className="font-bold text-slate-800">Rahul Sharma</span>
              <div className="flex items-center gap-2 mt-1">
                <a href="mailto:rahul@glowsys.com" className="h-6 w-6 border rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50"><Mail className="h-3 w-3" /></a>
                <a href="tel:+919876543210" className="h-6 w-6 border rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50"><Phone className="h-3 w-3" /></a>
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Quotation Date</span>
              <span className="font-bold text-slate-800">31 May 2026</span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">Valid Till: 30 Jun 2026 (30 days left)</span>
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Salesperson</span>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5 text-[8px] font-bold shrink-0">
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                </Avatar>
                <span className="font-bold text-slate-800">Arjun Jose</span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold mt-1 leading-tight">Company: Glow Systems Pvt Ltd</span>
            </div>

            {/* Column 6 */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Price List</span>
              <span className="font-bold text-slate-800">Standard Selling</span>
            </div>

            {/* Column 7 */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Grand Total</span>
              <span className="font-extrabold text-slate-900 font-mono text-sm">{formatCurrency(198474)}</span>
              <span className="text-[10px] text-slate-400 font-bold">Currency: INR - Indian Rupee</span>
            </div>

            {/* Column 8 */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-4">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Delivery Terms</span>
              <span className="font-bold text-slate-800">Ex-Works</span>
            </div>

            {/* Column 9 */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-4 col-span-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Reference / Project</span>
              <span className="font-bold text-slate-500">-</span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* --- Main Section Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Main Details and Tabbed Panels (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Tab Selection Header */}
          <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2">
            {[
              { id: "items", label: "Items" },
              { id: "terms", label: "Terms & Notes" },
              { id: "attachments", label: "Attachments" },
              { id: "history", label: "History" },
              { id: "documents", label: "Related Documents" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 px-4.5 border-b-2 font-semibold transition-colors ${isActive ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tabbed Content Card */}
          <Card className="border-slate-100">
            <CardContent className="p-0">
              
              {activeTab === "items" && (
                <>
                  <div className="p-4 bg-slate-50/20 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Items (4)</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-[10px] text-slate-700 py-1 px-2.5 h-7">
                        Add Item
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-[10px] text-slate-700 py-1 px-2.5 h-7">
                        + Add Section
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-[10px] text-slate-700 py-1 px-2.5 h-7">
                        Download Items
                      </Button>
                    </div>
                  </div>
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
                            <TableCell className="text-center py-3.5 font-bold text-slate-400">{row.idx}</TableCell>
                            <TableCell className="py-3.5">
                              <div className="flex flex-col gap-0.5">
                                <span className="font-bold text-slate-800">{row.code}</span>
                                <span className="text-[10px] text-slate-400 font-semibold">{row.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3.5 text-slate-605 font-semibold leading-relaxed">
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
                </>
              )}

              {activeTab === "terms" && (
                <div className="p-6 flex flex-col gap-5 text-xs font-semibold text-slate-655 leading-relaxed">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-slate-800">Terms &amp; Conditions</span>
                    <ol className="list-decimal pl-5 space-y-1 text-slate-600 mt-1">
                      <li>This quotation is valid until the date mentioned above.</li>
                      <li>Prices are subject to change without prior notice.</li>
                      <li>Payment to be made within 15 days from the date of invoice.</li>
                      <li>Goods once sold will not be taken back or exchanged.</li>
                      <li>Subject to our standard terms and conditions.</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
                    <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border">
                      <span className="font-bold text-slate-800">Customer Note</span>
                      <p className="text-slate-600 mt-1">Please let us know if you require any changes.</p>
                    </div>
                    <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-lg border">
                      <span className="font-bold text-slate-800">Internal Note</span>
                      <p className="text-slate-600 mt-1">Customer is looking for bulk order in next quarter.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "attachments" && (
                <div className="p-6 text-center text-slate-400 font-semibold text-xs">
                  Attachments index lists.
                </div>
              )}

              {activeTab === "history" && (
                <div className="p-6 flex flex-col gap-4 text-xs font-semibold text-slate-655">
                  <div className="relative flex flex-col gap-5 pl-4 border-l border-slate-200 py-1">
                    
                    {/* Activity 1 */}
                    <div className="relative flex flex-col gap-0.5 leading-tight">
                      <div className="absolute -left-[20.5px] top-0.5 h-2 w-2 bg-emerald-500 border border-white rounded-full" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Quotation sent to Rahul Sharma</span>
                        <span className="text-[10px] text-slate-400 font-bold font-mono">31 May 2026 04:40 PM</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">by Arjun Jose</span>
                    </div>

                    {/* Activity 2 */}
                    <div className="relative flex flex-col gap-0.5 leading-tight">
                      <div className="absolute -left-[20.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Status changed to Sent</span>
                        <span className="text-[10px] text-slate-400 font-bold font-mono">31 May 2026 04:40 PM</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">by Arjun Jose</span>
                    </div>

                    {/* Activity 3 */}
                    <div className="relative flex flex-col gap-0.5 leading-tight">
                      <div className="absolute -left-[20.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Quotation created</span>
                        <span className="text-[10px] text-slate-400 font-bold font-mono">31 May 2026 04:32 PM</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">by Arjun Jose</span>
                    </div>

                  </div>
                  <div className="text-center text-[10px] text-slate-400 mt-2 font-bold">
                    Created by Arjun Jose on 31 May 2026, 04:32 PM
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="p-6 text-center text-slate-400 font-semibold text-xs">
                  Documents logs feed list.
                </div>
              )}

            </CardContent>
          </Card>

          {/* Lower details grid columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Terms & Conditions */}
            <Card className="border-slate-100 flex flex-col justify-between">
              <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-2.5">
                <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Terms &amp; Conditions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-2 text-xs text-slate-655 font-semibold flex-1 justify-between">
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>This quotation is valid until the date mentioned above.</li>
                  <li>Prices are subject to change without prior notice.</li>
                  <li>Payment to be made within 15 days from the date of invoice.</li>
                </ol>
                <button className="text-[10px] font-bold text-blue-600 hover:underline mt-2 text-left">
                  View Full Terms &amp; Conditions
                </button>
              </CardContent>
            </Card>

            {/* Card 2: Note summaries */}
            <Card className="border-slate-100 flex flex-col justify-between">
              <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-2.5">
                <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Note</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-xs text-slate-600 font-semibold flex-1">
                <p className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border">
                  Please let us know if you require any changes.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>

        {/* Right Summary Sidebar Panel */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Status info card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</CardTitle>
              <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[9px] px-2 py-0">Sent</Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs text-slate-655 font-semibold">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sent On</span>
                <span className="font-bold text-slate-800">31 May 2026, 04:40 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Prepared By</span>
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-4.5 w-4.5 text-[8px] font-bold shrink-0">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                  </Avatar>
                  <span className="font-bold text-slate-855 text-slate-800 text-xs">Arjun Jose</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t pt-2.5 mt-0.5">
                <span className="text-slate-400">Last Modified On</span>
                <span className="font-bold text-slate-800">31 May 2026, 04:40 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Last Modified By</span>
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-4.5 w-4.5 text-[8px] font-bold shrink-0">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                  </Avatar>
                  <span className="font-bold text-slate-855 text-slate-800 text-xs">Arjun Jose</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Totals Calculation */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed font-semibold text-slate-655">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sub Total</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(177050.00)}</span>
              </div>
              <div className="flex items-center justify-between text-rose-600">
                <span className="font-semibold text-rose-500">Discount</span>
                <span className="font-bold font-mono">- {formatCurrency(8852.50)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-slate-400">Taxable Amount</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(168197.50)}</span>
              </div>

              {/* CGST / SGST list */}
              <div className="flex flex-col gap-1.5 pl-3 border-l border-slate-200 py-1">
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

              <div className="flex flex-col gap-1 border-t pt-3 mt-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Grand Total (₹)</span>
                  <span className="font-extrabold text-blue-600 text-sm font-mono">{formatCurrency(198474.00)}</span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold leading-tight">
                  (One Lakh Ninety Eight Thousand Four Hundred Seventy Four Only)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2 text-xs font-semibold text-slate-655">
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Send className="h-3.5 w-3.5 text-slate-400" />
                Send Quotation
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <FileCheck className="h-3.5 w-3.5 text-slate-400" />
                Mark as Draft
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                Duplicate
              </Button>
              <Button variant="outline" className="border-rose-100 text-rose-700 hover:bg-rose-50 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                Cancel Quotation
              </Button>
            </CardContent>
          </Card>

          {/* Related Documents list */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Related Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed text-slate-655 font-semibold">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Estimate</span>
                <span className="font-bold text-slate-800 font-mono">EST-2026-0513</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Sales Order</span>
                <span className="font-bold text-blue-600 font-mono cursor-pointer hover:underline">SO-2026-0176</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Delivery Note</span>
                <span className="text-slate-400">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Sales Invoice</span>
                <span className="text-slate-400">-</span>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments (2)</CardTitle>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-slate-655 font-semibold">
              <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px] flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> QUO-2026-0288_Terms.pdf
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

          {/* Activity Timeline Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity Timeline</CardTitle>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4 text-xs font-semibold text-slate-600">
              <div className="relative flex flex-col gap-4 pl-3 border-l border-slate-200 py-1">
                
                {/* Activity 1 */}
                <div className="relative flex flex-col gap-0.5 leading-tight">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                  <span>Quotation sent to Rahul Sharma</span>
                  <span className="text-[9px] text-slate-400 font-bold">31 May 2026, 04:40 PM</span>
                </div>

                {/* Activity 2 */}
                <div className="relative flex flex-col gap-0.5 leading-tight">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                  <span>Quotation created</span>
                  <span className="text-[9px] text-slate-400 font-bold">31 May 2026, 04:32 PM</span>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
