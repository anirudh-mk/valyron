import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download,
  MoreHorizontal,
  Info,
  Check,
  X,
  FileQuestion,
  Paperclip,
  MessageSquare,
  Send
} from "lucide-react";

export interface ApprovalHistoryRow {
  level: number;
  approver: string;
  role: string;
  initials: string;
  bg: string;
  status: "Approved" | "Pending";
  comments: string;
  actionDate: string;
}

const initialHistory: ApprovalHistoryRow[] = [
  { level: 1, approver: "Arjun Jose", role: "Sales Executive", initials: "AJ", bg: "bg-blue-100 text-blue-700", status: "Approved", comments: "Looks good. Please proceed.", actionDate: "31 May 2026 04:45 PM" },
  { level: 2, approver: "Jane Smith", role: "Sales Manager", initials: "JS", bg: "bg-teal-100 text-teal-700", status: "Pending", comments: "-", actionDate: "-" },
  { level: 3, approver: "Mike Johnson", role: "Head - Sales", initials: "MJ", bg: "bg-amber-100 text-amber-700", status: "Pending", comments: "-", actionDate: "-" },
];

export default function QuotationApproval() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ApprovalHistoryRow[]>(initialHistory);
  const [commentsList, setCommentsList] = useState([
    { author: "Arjun Jose", time: "31 May 2026, 04:40 PM", text: "Please review and approve.", initials: "AJ", bg: "bg-blue-100 text-blue-700" },
    { author: "Jane Smith", time: "31 May 2026, 04:45 PM", text: "Will review the pricing and get back.", initials: "JS", bg: "bg-teal-100 text-teal-700" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleApprove = () => {
    setHistory((prev) =>
      prev.map((row) => {
        if (row.level === 2) {
          return { ...row, status: "Approved", comments: "Approved standard volume prices.", actionDate: "31 May 2026, 04:50 PM" };
        }
        return row;
      })
    );
    setCommentsList((prev) => [
      ...prev,
      { author: "Jane Smith", time: "31 May 2026, 04:50 PM", text: "Approved standard volume prices.", initials: "JS", bg: "bg-teal-100 text-teal-700" },
    ]);
    setIsApproved(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      { author: "Arjun Jose", time: "31 May 2026, 04:52 PM", text: newComment, initials: "AJ", bg: "bg-blue-100 text-blue-700" },
    ]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/dashboard/sales/quotation/details" className="hover:text-slate-600">QUO-2026-0288</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Approval</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quotation Approval</h1>
          <Badge className="bg-amber-50 text-amber-700 border-amber-100 font-bold text-[10px]">
            {isApproved ? "Level 3 Pending" : "Pending Approval"}
          </Badge>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700 h-8">
            <Download className="h-3.5 w-3.5 text-slate-400" />
            Download Quotation
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- Row 1: Quotation Summary Card --- */}
      <Card className="border-slate-100 bg-white">
        <CardContent className="p-5 text-xs text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quotation No.</span>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 font-mono">QUO-2026-0288</span>
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[8px] px-1.5 py-0">QUO-2026-</Badge>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 mt-1 font-semibold">
                <span>Customer: Glow Systems Pvt Ltd</span>
                <span>Company: Glow Systems Pvt Ltd</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quotation Date</span>
              <span className="font-bold text-slate-800">31 May 2026</span>
              <span className="text-[10px] text-slate-400 font-bold mt-1">Valid Till: 30 Jun 2026 (30 days left)</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Grand Total</span>
              <span className="font-extrabold text-slate-905 text-slate-950 font-mono text-[13px]">{formatCurrency(198474)}</span>
              <span className="text-[9px] text-slate-400 font-bold">Currency: INR - Indian Rupee</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Salesperson</span>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5 text-[8px] font-bold">
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                </Avatar>
                <span className="font-bold text-slate-800">Arjun Jose</span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold mt-1">Price List: Standard Selling</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Delivery Terms</span>
              <span className="font-bold text-slate-800">Ex-Works</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Main Details and Tabbed Panels (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Tab Selection Header */}
          <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2">
            {[
              { id: "items", label: "Items" },
              { id: "details", label: "Details" },
              { id: "terms", label: "Terms & Notes" },
              { id: "attachments", label: "Attachments" },
              { id: "history", label: "History" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4.5 border-b-2 font-semibold transition-colors ${tab.id === "items" ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Items (4)</CardTitle>
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
                        <TableCell className="text-center py-3.5 font-bold text-slate-400">{row.idx}</TableCell>
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

              {/* total list stats callouts below items table */}
              <div className="grid grid-cols-5 gap-3 p-4 bg-slate-50/40 border-t font-mono text-[10px] font-bold text-right text-slate-700">
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Sub Total (₹)</span>
                  <span className="mt-1">1,77,050.00</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Discount (₹)</span>
                  <span className="mt-1 text-rose-600">8,852.50</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">Taxable Amount (₹)</span>
                  <span className="mt-1">1,68,197.50</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">CGST @ 9% (₹)</span>
                  <span className="mt-1">15,137.78</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">SGST @ 9% (₹)</span>
                  <span className="mt-1">15,137.78</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Approval Workflow progress stepper checklist */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-xs text-slate-655 font-semibold flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">Step 1</span>
                  <span className="font-bold text-slate-800">Sales Executive</span>
                  <span className="text-[10px] text-slate-500">Arjun Jose</span>
                  <Badge className="bg-emerald-50 text-emerald-700 text-[8px] w-fit font-bold mt-1">Approved on 31 May 2026</Badge>
                </div>
              </div>

              <div className="hidden md:block h-px bg-slate-200 flex-1 border-dashed border-t mx-2" />

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold border-2 ${isApproved ? "bg-emerald-100 text-emerald-700 border-emerald-500" : "bg-amber-100 text-amber-700 border-amber-500"}`}>
                  {isApproved ? <Check className="h-4.5 w-4.5" /> : "2"}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">Step 2</span>
                  <span className="font-bold text-slate-800">Sales Manager</span>
                  <span className="text-[10px] text-slate-500">Jane Smith</span>
                  <Badge className={`text-[8px] w-fit font-bold mt-1 ${isApproved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {isApproved ? "Approved" : "Pending Approval"}
                  </Badge>
                </div>
              </div>

              <div className="hidden md:block h-px bg-slate-200 flex-1 border-dashed border-t mx-2" />

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center font-bold bg-white">
                  3
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">Step 3</span>
                  <span className="font-bold text-slate-800">Head - Sales</span>
                  <span className="text-[10px] text-slate-500">Mike Johnson</span>
                  <Badge className="bg-slate-100 text-slate-600 text-[8px] w-fit font-bold mt-1">Pending</Badge>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Card 3: Approval History Table logs */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Approval History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">Level</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Approver</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold w-1/2">Comments</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Action Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-655 font-semibold">
                    {history.map((row) => (
                      <TableRow key={row.level} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="text-center py-3.5 font-bold text-slate-455 text-slate-400">{row.level}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[8px] font-bold">
                              <div className={`w-full h-full flex items-center justify-center rounded-full ${row.bg} font-bold`}>
                                {row.initials}
                              </div>
                            </Avatar>
                            <div className="flex flex-col gap-0.2">
                              <span className="font-bold text-slate-800">{row.approver}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{row.role}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`text-[9px] font-bold ${
                            row.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}>
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-500 font-semibold leading-relaxed">
                          {row.comments}
                        </TableCell>
                        <TableCell className="py-3.5 font-bold text-slate-400">{row.actionDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar stats layout */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Status info card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approval Status</CardTitle>
              <Badge className="bg-amber-50 text-amber-700 border-amber-100 font-bold text-[9px] px-2 py-0">Pending</Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs text-slate-655 font-semibold">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px]">Current Approver</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Avatar className="h-5 w-5 text-[8px] font-bold">
                    <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 rounded-full font-bold">JS</div>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">Jane Smith</span>
                    <span className="text-[9px] text-slate-400">Manager - Sales</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-2.5">
                <span className="text-slate-400">Requested On</span>
                <span className="font-bold text-slate-800">31 May 2026, 04:40 PM</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Approval Level</span>
                <span className="font-bold text-slate-800">Level 2 of 3</span>
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

              <div className="flex items-center justify-between border-t pt-3 mt-1 text-sm font-extrabold">
                <span className="text-slate-900">Grand Total (₹)</span>
                <span className="text-blue-600 font-mono">{formatCurrency(198474.00)}</span>
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
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> Quotation_QUO-2026-0288.pdf
                </span>
                <span className="text-[9px] text-slate-400 font-bold shrink-0">(312 KB)</span>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px] flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> Technical_Specs.pdf
                </span>
                <span className="text-[9px] text-slate-400 font-bold shrink-0">(1.2 MB)</span>
              </div>
            </CardContent>
          </Card>

          {/* Comments Discussion Card widget */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comments</CardTitle>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">Add Comment</button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4 text-xs font-semibold text-slate-700">
              
              {/* feed */}
              <div className="flex flex-col gap-3.5">
                {commentsList.map((cmt, idx) => (
                  <div key={idx} className="flex gap-2 leading-relaxed">
                    <Avatar className="h-5.5 w-5.5 text-[8px] font-bold shrink-0">
                      <div className={`w-full h-full flex items-center justify-center rounded-full ${cmt.bg} font-bold`}>
                        {cmt.initials}
                      </div>
                    </Avatar>
                    <div className="flex flex-col bg-slate-50 p-2.5 rounded-xl flex-1 border">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                        <span>{cmt.author}</span>
                        <span>{cmt.time}</span>
                      </div>
                      <p className="mt-1 text-slate-655 font-semibold text-[10px]">{cmt.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleAddComment} className="flex items-center gap-1.5 mt-2 border-t pt-3">
                <input
                  type="text"
                  placeholder="Type a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-1.5 border rounded-lg bg-slate-50/50 text-[10px] focus:bg-white focus:outline-none"
                />
                <Button type="submit" size="icon" className="h-7 w-7 bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="h-3 w-3" />
                </Button>
              </form>

            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2 text-xs font-semibold text-slate-655">
              
              {!isApproved ? (
                <Button
                  onClick={handleApprove}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full flex items-center justify-center gap-1.5 h-8"
                >
                  <Check className="h-3.5 w-3.5" />
                  Approve
                </Button>
              ) : (
                <Button
                  disabled
                  className="bg-emerald-600 text-white font-bold w-full flex items-center justify-center gap-1.5 h-8 cursor-not-allowed"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Approved (Level 2)
                </Button>
              )}

              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-center gap-1.5 h-8">
                <FileQuestion className="h-3.5 w-3.5 text-slate-400" />
                Request Changes
              </Button>
              <Button variant="outline" className="border-rose-100 text-rose-700 hover:bg-rose-50 font-bold w-full flex items-center justify-center gap-1.5 h-8">
                <X className="h-3.5 w-3.5 text-rose-500" />
                Reject
              </Button>

              <div className="p-2.5 bg-slate-50 border rounded-lg text-[9px] text-slate-400 font-bold leading-tight mt-1">
                This quotation will be sent to the customer only after all required approvals are completed.
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
