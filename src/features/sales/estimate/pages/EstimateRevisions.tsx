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
  FileCheck
} from "lucide-react";

export interface RevisionHistoryItem {
  revision: string;
  date: string;
  modifiedBy: string;
  modifiedByInitials: string;
  modifiedByBg: string;
  status: string;
  grandTotal: number;
  changeVsPrev: string;
  changeValClass: string;
}

const revisionHistoryList: RevisionHistoryItem[] = [
  { revision: "Revision 3", date: "31 May 2026, 04:32 PM", modifiedBy: "Jane Smith", modifiedByInitials: "JS", modifiedByBg: "bg-teal-100 text-teal-700", status: "Approved", grandTotal: 198474.00, changeVsPrev: "+ ₹ 13,174.00 (+7.11%)", changeValClass: "text-emerald-600 font-bold" },
  { revision: "Revision 2", date: "29 May 2026, 11:20 AM", modifiedBy: "Arjun Jose", modifiedByInitials: "AJ", modifiedByBg: "bg-blue-100 text-blue-700", status: "Approved", grandTotal: 185300.00, changeVsPrev: "+ ₹ 23,500.00 (+14.53%)", changeValClass: "text-emerald-600 font-bold" },
  { revision: "Revision 1", date: "27 May 2026, 10:15 AM", modifiedBy: "Arjun Jose", modifiedByInitials: "AJ", modifiedByBg: "bg-blue-100 text-blue-700", status: "Approved", grandTotal: 161800.00, changeVsPrev: "-", changeValClass: "text-slate-400 font-semibold" },
  { revision: "Original", date: "26 May 2026, 03:45 PM", modifiedBy: "Arjun Jose", modifiedByInitials: "AJ", modifiedByBg: "bg-blue-100 text-blue-700", status: "Approved", grandTotal: 161800.00, changeVsPrev: "-", changeValClass: "text-slate-400 font-semibold" },
];

export default function EstimateRevisions() {
  const navigate = useNavigate();
  const [selectedRevision, setSelectedRevision] = useState<string>("Revision 3");

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
        <span className="text-slate-655 font-extrabold">Revisions</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Estimate Revisions</h1>
          <Info className="h-4 w-4 text-slate-400" />
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/estimate/details")}
            className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700"
          >
            Back to Estimate Details
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700">
            <GitCompare className="h-3.5 w-3.5 text-slate-400" />
            Compare Revisions
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-bold text-xs">
            <Plus className="h-4 w-4" />
            Create New Revision
          </Button>
        </div>
      </div>

      {/* --- Row 1: KPI Stats Summary Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Estimate Info */}
        <Card className="border-slate-100 p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimate</span>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-600 font-mono text-sm">EST-2026-0513</span>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-bold">Approved</Badge>
          </div>
          <div className="flex flex-col gap-0.5 text-[11px] text-slate-500 font-semibold mt-1">
            <span>Customer: Glow Systems Pvt Ltd</span>
            <span>Price List: Standard Selling</span>
          </div>
        </Card>

        {/* Card 2: Current Revision */}
        <Card className="border-slate-100 p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Revision</span>
          <span className="font-extrabold text-slate-900 text-sm">Revision 3</span>
          <div className="flex flex-col gap-0.5 text-[11px] text-slate-500 font-semibold mt-1">
            <div className="flex items-center gap-1">
              <span>By:</span>
              <Avatar className="h-4 w-4 text-[8px] font-bold">
                <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 rounded-full font-bold">JS</div>
              </Avatar>
              <span className="font-bold text-slate-700">Jane Smith</span>
            </div>
            <span>On: 31 May 2026, 04:32 PM</span>
          </div>
        </Card>

        {/* Card 3: Revision Summary */}
        <Card className="border-slate-100 p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revision Summary</span>
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
            <span>Total Revisions:</span>
            <span className="font-bold text-slate-900">3</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
            <span>Original Amount:</span>
            <span className="font-bold text-slate-900 font-mono">{formatCurrency(185300)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold border-t pt-1 mt-0.5">
            <span>Net Change:</span>
            <span className="text-emerald-600 font-bold font-mono">+ ₹ 13,174.00 (+7.11%)</span>
          </div>
        </Card>

        {/* Card 4: Change Summary */}
        <Card className="border-slate-100 p-4 flex flex-col gap-2 text-[11px] text-slate-500 font-semibold">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Change Summary (vs Prev)</span>
          <div className="grid grid-cols-2 gap-y-1 mt-1">
            <div className="flex justify-between pr-2"><span>Items Added:</span><span className="font-bold text-slate-800">1</span></div>
            <div className="flex justify-between pl-2 border-l"><span>Items Removed:</span><span className="font-bold text-slate-800">0</span></div>
            <div className="flex justify-between pr-2"><span>Items Modified:</span><span className="font-bold text-slate-800">2</span></div>
            <div className="flex justify-between pl-2 border-l"><span>Amount Change:</span><span className="font-bold text-emerald-600 font-mono">+₹13,174</span></div>
          </div>
        </Card>

      </div>

      {/* --- Main Section Grid Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Revisions list and Bottom comparator (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Revision History Card Table */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Revisions History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="py-2.5 text-slate-400 font-bold">Revision</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Revision Date</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Modified By</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right">Grand Total (₹)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Change vs Previous</TableHead>
                      <TableHead className="py-2.5 w-24 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-600 font-medium">
                    {revisionHistoryList.map((rev) => {
                      const isSelected = selectedRevision === rev.revision;
                      return (
                        <TableRow
                          key={rev.revision}
                          onClick={() => setSelectedRevision(rev.revision)}
                          className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/25 border-l-2 border-l-blue-600" : ""}`}
                        >
                          <TableCell className="py-3.5">
                            <span className="font-bold text-slate-800">{rev.revision}</span>
                          </TableCell>
                          <TableCell className="py-3.5 font-semibold text-slate-800">{rev.date}</TableCell>
                          <TableCell className="py-3.5">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                                <div className={`w-full h-full flex items-center justify-center rounded-full ${rev.modifiedByBg} font-bold`}>
                                  {rev.modifiedByInitials}
                                </div>
                              </Avatar>
                              <span className="font-semibold text-slate-800">{rev.modifiedBy}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3.5">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-bold">
                              {rev.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(rev.grandTotal).replace("₹", "").trim()}
                          </TableCell>
                          <TableCell className="py-3.5">
                            <span className={rev.changeValClass}>{rev.changeVsPrev}</span>
                          </TableCell>
                          <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                            <button className="text-[10px] font-bold text-blue-600 hover:underline mr-2">View Details</button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-4 w-4 text-slate-400" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Card: Compare Revisions Details */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Compare Revisions</CardTitle>
                <p className="text-[10px] text-slate-400 mt-0.5">Quick comparison of amount changes across revisions.</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Compare with</span>
                <select className="p-1 border rounded bg-white text-slate-700 font-semibold cursor-pointer focus:outline-none">
                  <option>Revision 1</option>
                  <option>Revision 2</option>
                  <option>Original</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-xs text-slate-655 font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center pb-5 border-b border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold">Revision 1</span>
                  <span className="text-[10px] text-slate-400">27 May 2026, 10:15 AM</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm mt-1">{formatCurrency(161800)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-bold">Current Revision 3</span>
                  <span className="text-[10px] text-slate-400">31 May 2026, 04:32 PM</span>
                  <span className="font-extrabold text-blue-600 font-mono text-sm mt-1">{formatCurrency(198474)}</span>
                </div>
                <div className="flex flex-col gap-1 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                  <span className="text-emerald-700 font-bold">Difference</span>
                  <span className="font-extrabold text-emerald-800 font-mono text-sm mt-0.5">+ {formatCurrency(36674.00)}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">(+22.66%)</span>
                </div>
              </div>

              {/* Differences detailed breakdown grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-5">
                {[
                  { label: "Items Total", diff: "+ ₹ 31,200.00", color: "text-emerald-600 font-bold" },
                  { label: "Discount", diff: "- ₹ 0.00", color: "text-slate-500 font-semibold" },
                  { label: "Tax", diff: "+ ₹ 5,474.00", color: "text-emerald-600 font-bold" },
                  { label: "Rounding Off", diff: "+ ₹ 0.94", color: "text-emerald-600 font-bold" },
                  { label: "Net Change", diff: "+ ₹ 36,674.94", color: "text-emerald-700 font-extrabold" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5 border p-2.5 rounded-lg bg-slate-50/50">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">{item.label}</span>
                    <span className={`font-mono text-[11px] mt-0.5 ${item.color}`}>{item.diff}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar Detail Inspector */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* selected revision metadata card */}
          <Card className="border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">{selectedRevision}</CardTitle>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[9px] font-bold">Current</Badge>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs text-slate-655 font-semibold">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px]">Revision Date</span>
                <span className="font-bold text-slate-800">31 May 2026, 04:32 PM</span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px]">Modified By</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Avatar className="h-5 w-5 text-[8px] font-bold">
                    <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 rounded-full font-bold">JS</div>
                  </Avatar>
                  <span className="font-bold text-slate-800">Jane Smith</span>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 text-[10px]">Status</span>
                <Badge variant="outline" className="w-fit bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[9px] px-2 py-0">
                  Approved
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t pt-2.5">
                <span className="text-slate-400">Grand Total</span>
                <span className="font-extrabold text-slate-900 font-mono">{formatCurrency(198474.00)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Taxable Amount</span>
                <span className="font-bold text-slate-800 font-mono">{formatCurrency(168197.50)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Tax</span>
                <span className="font-bold text-slate-800 font-mono">{formatCurrency(30275.56)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2.5">
                <span className="text-slate-400">Rounding Off</span>
                <span className="font-bold text-slate-800 font-mono">₹ 0.94</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Remarks</span>
                <p className="p-2.5 border rounded-lg bg-slate-50 font-semibold text-slate-700 leading-relaxed text-[11px]">
                  Updated laptop specification and added installation service.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Attachments</span>
                <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[11px] group cursor-pointer hover:bg-white transition-colors">
                  <span className="font-semibold text-blue-600 hover:underline truncate max-w-[150px]">Revision_3_EST-2026-0513.pdf</span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-bold">(312 KB)</span>
                </div>
              </div>

              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 font-bold w-full mt-2.5 flex items-center justify-center gap-1.5">
                View Revision Details
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
