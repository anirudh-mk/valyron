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
  Plus,
  GitCompare,
  TrendingUp,
  History,
  CheckCircle,
  MoreHorizontal,
  Info,
  Calendar,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  FileCheck,
  Eye,
  Trash2,
  Download,
  FileText as FileIcon,
  Paperclip
} from "lucide-react";

export interface QuoRevisionItem {
  revision: string;
  date: string;
  revisedBy: string;
  revisedByInitials: string;
  revisedByBg: string;
  grandTotal: number;
  changePct: string;
  changeClass: string;
  status: string;
  remarks: string;
  isLatest?: boolean;
}

const revisionList: QuoRevisionItem[] = [
  { revision: "Revision 3", date: "08 Jun 2026 11:20 AM", revisedBy: "Arjun Jose", revisedByInitials: "AJ", revisedByBg: "bg-blue-100 text-blue-700", grandTotal: 198474.00, changePct: "-3.40%", changeClass: "text-rose-600 font-bold", status: "Sent", remarks: "Final adjustment before sending.", isLatest: true },
  { revision: "Revision 2", date: "05 Jun 2026 02:45 PM", revisedBy: "Jane Smith", revisedByInitials: "JS", revisedByBg: "bg-teal-100 text-teal-700", grandTotal: 205474.00, changePct: "-2.61%", changeClass: "text-rose-600 font-bold", status: "Sent", remarks: "Adjusted discount and prices." },
  { revision: "Revision 1", date: "02 Jun 2026 10:15 AM", revisedBy: "Arjun Jose", revisedByInitials: "AJ", revisedByBg: "bg-blue-100 text-blue-700", grandTotal: 210974.00, changePct: "+6.30%", changeClass: "text-emerald-600 font-bold", status: "Sent", remarks: "Added ups items and changed qty." },
  { revision: "Original", date: "31 May 2026 04:32 PM", revisedBy: "Arjun Jose", revisedByInitials: "AJ", revisedByBg: "bg-blue-100 text-blue-700", grandTotal: 198474.00, changePct: "-", changeClass: "text-slate-400 font-semibold", status: "Sent", remarks: "Initial quotation." },
];

export default function QuotationRevisions() {
  const navigate = useNavigate();
  const [selectedRevision, setSelectedRevision] = useState<string>("Revision 3");
  const [activeTab, setActiveTab] = useState<"history" | "comparison">("history");

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
        <span className="text-slate-655 font-extrabold">Revisions</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quotation Revisions</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track all revisions made to this quotation.
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
            Back to Quotation
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 h-8">
            <Plus className="h-4 w-4" />
            Create Revision
          </Button>
        </div>
      </div>

      {/* --- Row 1: Quotation Summary parameters Card --- */}
      <Card className="border-slate-100 bg-white">
        <CardContent className="p-5 text-xs text-slate-600">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 gap-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quotation No.</span>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 font-mono">QUO-2026-0288</span>
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[8px] px-1.5 py-0">Sent</Badge>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Customer</span>
              <span className="font-bold text-slate-800">Glow Systems Pvt Ltd</span>
              <span className="text-[10px] text-slate-400 font-bold">Valid Till: 30 Jun 2026 (30 days left)</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Salesperson</span>
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5 text-[8px] font-bold">
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                </Avatar>
                <span className="font-bold text-slate-800">Arjun Jose</span>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quotation Date</span>
              <span className="font-bold text-slate-800">31 May 2026</span>
              <span className="text-[10px] text-slate-400 font-bold">Currency: INR - Indian Rupee</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Grand Total</span>
              <span className="font-extrabold text-slate-900 font-mono text-[13px]">{formatCurrency(198474)}</span>
              <span className="text-[10px] text-slate-400 font-bold">Delivery: Ex-Works</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Main Section Grid Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Revisions history and comparator (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Tab Selection Header */}
          <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2 bg-transparent">
            {[
              { id: "history", label: "Revision History" },
              { id: "comparison", label: "Comparison" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-4 border-b-2 font-semibold transition-colors ${isActive ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Table Card */}
          <Card className="border-slate-100">
            <CardContent className="p-0">
              
              {activeTab === "history" && (
                <>
                  <div className="overflow-x-auto min-w-0">
                    <Table className="text-xs w-full">
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="py-2.5 text-slate-400 font-bold">Revision</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold">Revision Date</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold">Revised By</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold text-right">Grand Total (₹)</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold text-center">Change (%)</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                          <TableHead className="py-2.5 text-slate-400 font-bold w-1/3">Remarks</TableHead>
                          <TableHead className="py-2.5 w-16 text-center" />
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-slate-655 font-semibold">
                        {revisionList.map((rev) => {
                          const isSelected = selectedRevision === rev.revision;
                          return (
                            <TableRow
                              key={rev.revision}
                              onClick={() => setSelectedRevision(rev.revision)}
                              className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 border-l-2 border-l-blue-655" : ""}`}
                            >
                              <TableCell className="py-3.5">
                                <span className="font-bold text-slate-800">{rev.revision}</span>
                                {rev.isLatest && <Badge className="ml-1.5 bg-blue-100 text-blue-700 text-[8px] font-bold py-0 px-1">Latest</Badge>}
                              </TableCell>
                              <TableCell className="py-3.5 font-semibold text-slate-800">{rev.date}</TableCell>
                              <TableCell className="py-3.5">
                                <div className="flex items-center gap-1.5">
                                  <Avatar className="h-5.5 w-5.5 text-[8px] font-bold">
                                    <div className={`w-full h-full flex items-center justify-center rounded-full ${rev.revisedByBg} font-bold`}>
                                      {rev.revisedByInitials}
                                    </div>
                                  </Avatar>
                                  <span className="font-semibold text-slate-800">{rev.revisedBy}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                                {formatCurrency(rev.grandTotal).replace("₹", "").trim()}
                              </TableCell>
                              <TableCell className="py-3.5 text-center font-bold">
                                <span className={rev.changeClass}>{rev.changePct}</span>
                              </TableCell>
                              <TableCell className="py-3.5">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-[9px] font-bold">
                                  {rev.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-3.5 text-slate-500 font-semibold leading-relaxed">
                                {rev.remarks}
                              </TableCell>
                              <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Eye className="h-3.5 w-3.5 text-slate-400" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="p-3.5 bg-slate-50/30 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                    <Info className="h-3.5 w-3.5 text-blue-500" />
                    <span>Amounts are compared with the previous revision.</span>
                  </div>
                </>
              )}

              {activeTab === "comparison" && (
                <div className="p-6 text-center text-slate-400 font-semibold text-xs">
                  Line items differences grid breakdown.
                </div>
              )}

            </CardContent>
          </Card>

          {/* Bottom Card: Revision Summary comparator details */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Revision Summary</CardTitle>
                <p className="text-[10px] text-slate-400 mt-0.5">Compare the latest revision with the previous one.</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-455 text-slate-400">Compare</span>
                <select className="p-1 border rounded bg-white text-slate-700 font-semibold focus:outline-none cursor-pointer">
                  <option>Revision 3 (Latest) vs Revision 2</option>
                  <option>Revision 3 (Latest) vs Original</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-xs text-slate-655 font-semibold">
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { label: "Grand Total (₹)", prev: "2,05,474.00", current: "1,98,474.00", change: "-7,000.00 (-3.40%)", changeClass: "text-rose-600 font-bold" },
                  { label: "Sub Total (₹)", prev: "1,77,050.00", current: "1,70,050.00", change: "-7,000.00 (-3.95%)", changeClass: "text-rose-600 font-bold" },
                  { label: "Total Items", prev: "4", current: "4", change: "0 (0%)", changeClass: "text-slate-400 font-bold" },
                  { label: "Discount (₹)", prev: "8,852.50", current: "8,852.50", change: "0 (0%)", changeClass: "text-slate-400 font-bold" },
                  { label: "Taxable Amount (₹)", prev: "1,68,197.50", current: "1,59,621.50", change: "-8,576.00 (-5.10%)", changeClass: "text-rose-600 font-bold" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 border p-3 rounded-xl bg-slate-50/50">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">{item.label}</span>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <div className="flex justify-between items-center text-[10px] text-slate-455 text-slate-400">
                        <span>Previous</span>
                        <span className="font-mono">{item.prev}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-slate-805 text-slate-800">
                        <span>Latest</span>
                        <span className="font-mono">{item.current}</span>
                      </div>
                      <span className={`text-[10px] text-right mt-1 ${item.changeClass} font-mono`}>{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* items info callout footer */}
              <div className="p-3 bg-slate-50/30 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mt-4">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                <span>You can view item level changes in the Comparison tab.</span>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar stats panels */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Latest revision metadata card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Revision</CardTitle>
              <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-bold text-[9px] px-2 py-0">Sent</Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs text-slate-655 font-semibold">
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400">Revision</span>
                <span className="font-bold text-slate-900">Revision 3</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400">Revision Date</span>
                <span className="font-bold text-slate-800">08 Jun 2026, 11:20 AM</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-400">Revised By</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Avatar className="h-5 w-5 text-[8px] font-bold">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold">AJ</div>
                  </Avatar>
                  <span className="font-bold text-slate-800">Arjun Jose</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-2.5">
                <span className="text-slate-400">Grand Total</span>
                <span className="font-extrabold text-slate-900 font-mono">{formatCurrency(198474.00)}</span>
              </div>

              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full mt-2.5 flex items-center justify-center gap-1.5 h-8">
                View This Revision
              </Button>

            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2 text-xs font-semibold text-slate-655">
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Plus className="h-3.5 w-3.5 text-slate-400" />
                Create New Revision
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <GitCompare className="h-3.5 w-3.5 text-slate-400" />
                Compare Revisions
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Download className="h-3.5 w-3.5 text-slate-400" />
                Download Revision History
              </Button>
              <Button variant="outline" className="border-rose-100 text-rose-700 hover:bg-rose-50 font-bold w-full flex items-center justify-start gap-1.5 h-8">
                <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                Cancel Quotation
              </Button>
            </CardContent>
          </Card>

          {/* Revision Notes Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-xs font-semibold text-slate-455 text-slate-400">
              <span>No notes added for revisions.</span>
              <button className="text-blue-600 hover:underline font-bold ml-1">+ Add Note</button>
            </CardContent>
          </Card>

          {/* Revision attachments Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</CardTitle>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-slate-655 font-semibold">
              <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px] flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 text-slate-400" /> Revision_3_Terms.pdf
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
                  <span>Revision 3 created by Arjun Jose</span>
                  <span className="text-[9px] text-slate-400 font-bold">08 Jun 2026, 11:20 AM</span>
                </div>

                {/* Activity 2 */}
                <div className="relative flex flex-col gap-0.5 leading-tight">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                  <span>Revision 2 sent by Jane Smith</span>
                  <span className="text-[9px] text-slate-400 font-bold">05 Jun 2026, 02:45 PM</span>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
