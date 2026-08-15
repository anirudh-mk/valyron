import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Search,
  ChevronDown,
  SlidersHorizontal,
  Settings2,
  ChevronRight,
  Eye,
  Check,
  X,
  FileQuestion,
  TrendingDown,
  Paperclip,
  Activity,
  MoreHorizontal
} from "lucide-react";

export interface ApprovalRequest {
  id: string;
  customerName: string;
  estimateDate: string;
  grandTotal: number;
  status: "Pending" | "Approved" | "Rejected";
  requestedBy: string;
  requestedByInitials: string;
  requestedByBg: string;
  requestedOn: string;
  remarks: string;
  workflow: { level: string; approver: string; status: "Pending" | "Approved" | "Neutral" }[];
  attachments: { name: string; size: string }[];
}

const mockRequests: ApprovalRequest[] = [
  {
    id: "EST-2026-0513",
    customerName: "Glow Systems Pvt Ltd",
    estimateDate: "31 May 2026",
    grandTotal: 198474.00,
    status: "Pending",
    requestedBy: "Arjun Jose",
    requestedByInitials: "AJ",
    requestedByBg: "bg-blue-100 text-blue-700",
    requestedOn: "31 May 2026, 04:32 PM",
    remarks: "Kindly review and approve the estimate. Requires 2 level approval.",
    workflow: [
      { level: "Level 1 - Sales Manager", approver: "Arjun Jose (Current Approver)", status: "Pending" },
      { level: "Level 2 - Finance Manager", approver: "-", status: "Neutral" },
      { level: "Completed", approver: "-", status: "Neutral" },
    ],
    attachments: [
      { name: "EST-2026-0513_Proposal.pdf", size: "312 KB" },
      { name: "Product_Specifications.pdf", size: "1.2 MB" },
    ],
  },
  {
    id: "EST-2026-0511",
    customerName: "TechNova Solutions",
    estimateDate: "31 May 2026",
    grandTotal: 185600.00,
    status: "Pending",
    requestedBy: "Jane Smith",
    requestedByInitials: "JS",
    requestedByBg: "bg-teal-100 text-teal-700",
    requestedOn: "31 May 2026, 02:15 PM",
    remarks: "Discount of 5% offered on volume deal. Please authorize.",
    workflow: [
      { level: "Level 1 - Sales Manager", approver: "Jane Smith (Approved)", status: "Approved" },
      { level: "Level 2 - Finance Manager", approver: "Jane Smith (Current)", status: "Pending" },
      { level: "Completed", approver: "-", status: "Neutral" },
    ],
    attachments: [
      { name: "TechNova_Requirements_Doc.pdf", size: "890 KB" },
    ],
  },
  {
    id: "EST-2026-0509",
    customerName: "Cloud Infra Pvt Ltd",
    estimateDate: "30 May 2026",
    grandTotal: 326500.00,
    status: "Pending",
    requestedBy: "Rahul Sharma",
    requestedByInitials: "RS",
    requestedByBg: "bg-purple-100 text-purple-700",
    requestedOn: "30 May 2026, 11:20 AM",
    remarks: "High priority Cloud Setup quote review.",
    workflow: [
      { level: "Level 1 - Sales Manager", approver: "Arjun Jose", status: "Pending" },
    ],
    attachments: [],
  },
  {
    id: "EST-2026-0507",
    customerName: "Global Goods",
    estimateDate: "29 May 2026",
    grandTotal: 75300.00,
    status: "Pending",
    requestedBy: "Jane Smith",
    requestedByInitials: "JS",
    requestedByBg: "bg-teal-100 text-teal-700",
    requestedOn: "29 May 2026, 09:40 AM",
    remarks: "Standard retail lighting setup.",
    workflow: [],
    attachments: [],
  },
  {
    id: "EST-2026-0506",
    customerName: "Prime Distributors",
    estimateDate: "28 May 2026",
    grandTotal: 215000.00,
    status: "Pending",
    requestedBy: "Rahul Sharma",
    requestedByInitials: "RS",
    requestedByBg: "bg-purple-100 text-purple-700",
    requestedOn: "28 May 2026, 03:25 PM",
    remarks: "Hardware AMC contracts review.",
    workflow: [],
    attachments: [],
  },
  {
    id: "EST-2026-0505",
    customerName: "Shree Agencies",
    estimateDate: "27 May 2026",
    grandTotal: 105600.00,
    status: "Approved",
    requestedBy: "Mike Johnson",
    requestedByInitials: "MJ",
    requestedByBg: "bg-amber-100 text-amber-700",
    requestedOn: "27 May 2026, 01:10 PM",
    remarks: "Approved standard pricing AMC quote.",
    workflow: [],
    attachments: [],
  },
  {
    id: "EST-2026-0502",
    customerName: "Urban Traders",
    estimateDate: "26 May 2026",
    grandTotal: 120000.00,
    status: "Rejected",
    requestedBy: "Arjun Jose",
    requestedByInitials: "AJ",
    requestedByBg: "bg-blue-100 text-blue-700",
    requestedOn: "26 May 2026, 10:05 AM",
    remarks: "Rejected due to low gross margin rate. Changes requested.",
    workflow: [],
    attachments: [],
  },
  {
    id: "EST-2026-0499",
    customerName: "Design Hub",
    estimateDate: "25 May 2026",
    grandTotal: 162450.00,
    status: "Approved",
    requestedBy: "Jane Smith",
    requestedByInitials: "JS",
    requestedByBg: "bg-teal-100 text-teal-700",
    requestedOn: "25 May 2026, 04:15 PM",
    remarks: "Approved standard pricing setup.",
    workflow: [],
    attachments: [],
  },
];

export default function EstimateApproval() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockRequests);
  const [selectedReqId, setSelectedReqId] = useState<string>("EST-2026-0513");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getStatusColor = (status: ApprovalRequest["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          return {
            ...req,
            status: "Approved",
            workflow: req.workflow.map((w) => ({ ...w, status: "Approved" })),
          };
        }
        return req;
      })
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          return { ...req, status: "Rejected" };
        }
        return req;
      })
    );
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedRequest = requests.find((r) => r.id === selectedReqId) || requests[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Estimate Approval</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review and approve estimates before conversion to quotation or sales order.
          </p>
        </div>

        <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* --- Row 1: KPI Stats row --- */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Pending Approval", count: 18, sum: "₹ 18,75,300.00", color: "bg-amber-50 text-amber-600", icon: Clock },
          { label: "Approved", count: 42, sum: "₹ 42,68,900.00", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
          { label: "Rejected", count: 5, sum: "₹ 3,24,150.00", color: "bg-rose-50 text-rose-600", icon: XCircle },
          { label: "Approved (This Month)", count: 16, sum: "₹ 16,45,600.00", color: "bg-blue-50 text-blue-600", icon: Calendar },
          { label: "Avg. Approval Time", count: "1.8 Days", sum: "▼ vs last month: 2.3 Days", color: "bg-purple-50 text-purple-600", icon: Clock, trend: true },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
                <div className={`text-[10px] font-bold ${kpi.trend ? "text-emerald-600" : "text-slate-400 font-semibold font-mono"}`}>
                  {kpi.sum}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl shrink-0 ${kpi.color}`}>
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Main Section Grid --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Approvals Inbox list (Spans left-center) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4">
          
          {/* Controls filtering bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Search box */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search estimates by no., customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* Datepicker mock */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-slate-50/50 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 cursor-pointer">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Date Range</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>

              <select className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer">
                <option>Customer</option>
              </select>

              <select className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer">
                <option>Salesperson</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 gap-1.5 font-semibold text-xs">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Table Inbox */}
          <Card className="border-slate-100">
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      </TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Estimate No.</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Customer</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Estimate Date</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right">Grand Total (₹)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Requested By</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Requested On</TableHead>
                      <TableHead className="py-2.5 w-24 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-600 font-medium">
                    {filteredRequests.map((req) => {
                      const isSelected = selectedReqId === req.id;
                      return (
                        <TableRow
                          key={req.id}
                          className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""}`}
                          onClick={() => setSelectedReqId(req.id)}
                        >
                          <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                          </TableCell>
                          <TableCell className="py-3.5 font-bold text-blue-650 text-slate-800">
                            {req.id}
                          </TableCell>
                          <TableCell className="py-3.5 font-bold text-slate-800">{req.customerName}</TableCell>
                          <TableCell className="py-3.5 font-semibold text-slate-800">{req.estimateDate}</TableCell>
                          <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(req.grandTotal).replace("₹", "").trim()}
                          </TableCell>
                          <TableCell className="py-3.5">
                            <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(req.status)}`}>
                              {req.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3.5">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                                <div className={`w-full h-full flex items-center justify-center rounded-full ${req.requestedByBg} font-bold`}>
                                  {req.requestedByInitials}
                                </div>
                              </Avatar>
                              <span className="font-semibold text-slate-800 text-xs">{req.requestedBy}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-3.5 font-semibold text-slate-400">{req.requestedOn.split(",")[0]}</TableCell>
                          
                          {/* Inbox Actions Row quick buttons */}
                          <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => setSelectedReqId(req.id)}
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              
                              {req.status === "Pending" ? (
                                <>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 text-emerald-600 hover:bg-emerald-50"
                                    onClick={() => handleApprove(req.id)}
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 text-rose-600 hover:bg-rose-50"
                                    onClick={() => handleReject(req.id)}
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </Button>
                                </>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-355 pr-4">-</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Table pagination footer */}
              <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <span>Showing 1 to {filteredRequests.length} of {requests.length} estimates</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-blue-50 text-blue-700 border-blue-200">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    &gt;
                  </Button>
                  <select className="ml-2 py-1 px-2 border rounded bg-white font-semibold cursor-pointer">
                    <option>10 / page</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar: Details of selected + Workflow level logs */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          {selectedRequest && (
            <Card className="border-slate-100 shadow-md">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimate Summary</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">{selectedRequest.id}</span>
                </div>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[9px] font-bold">
                  {selectedRequest.status} Approval
                </Badge>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-4 text-xs font-semibold text-slate-655 leading-relaxed">
                
                {/* Details list */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Customer</span>
                    <span className="font-bold text-slate-800 text-right">{selectedRequest.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Estimate Date</span>
                    <span className="font-bold text-slate-800">{selectedRequest.estimateDate}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <span className="text-slate-400">Grand Total</span>
                    <span className="font-bold text-slate-900 font-mono">{formatCurrency(selectedRequest.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Requested By</span>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5 text-[8px] font-bold">
                        <div className={`w-full h-full flex items-center justify-center rounded-full ${selectedRequest.requestedByBg} font-bold`}>
                          {selectedRequest.requestedByInitials}
                        </div>
                      </Avatar>
                      <span className="font-bold text-slate-800">{selectedRequest.requestedBy}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Requested On</span>
                    <span className="font-bold text-slate-800">{selectedRequest.requestedOn}</span>
                  </div>
                  
                  {/* Remarks */}
                  <div className="flex flex-col gap-1 mt-1 border p-2.5 rounded-lg bg-slate-50 text-[11px] leading-relaxed">
                    <span className="text-slate-400 font-bold uppercase text-[8px]">Remarks</span>
                    <p className="font-semibold text-slate-700 mt-0.5">{selectedRequest.remarks}</p>
                  </div>
                </div>

                {/* Workflow Status Checklist tracker */}
                {selectedRequest.workflow && selectedRequest.workflow.length > 0 && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approval Workflow</span>
                    <div className="flex flex-col gap-3 pl-3 border-l border-slate-200 mt-2">
                      {selectedRequest.workflow.map((w, idx) => (
                        <div key={idx} className="relative flex flex-col gap-0.5">
                          <div className={`absolute -left-[16.5px] top-1.5 h-2 w-2 rounded-full border border-white ${
                            w.status === "Approved" ? "bg-emerald-500" : w.status === "Pending" ? "bg-blue-500" : "bg-slate-300"
                          }`} />
                          <span className="font-bold text-slate-800">{w.level}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{w.approver}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions bottom bar inside Sidebar */}
                {selectedRequest.status === "Pending" && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Actions</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex-1 gap-1"
                        onClick={() => handleApprove(selectedRequest.id)}
                      >
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex-1 gap-1"
                        onClick={() => handleReject(selectedRequest.id)}
                      >
                        <X className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs gap-1">
                      <FileQuestion className="h-4 w-4" /> Request Changes
                    </Button>
                  </div>
                )}

                {/* Attachments */}
                {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attachments ({selectedRequest.attachments.length})</span>
                    <div className="flex flex-col gap-2 mt-1">
                      {selectedRequest.attachments.map((file) => (
                        <div key={file.name} className="flex items-center justify-between p-2 border rounded-lg bg-slate-50 text-[10px] group cursor-pointer hover:bg-white transition-colors">
                          <span className="font-semibold text-blue-600 hover:underline truncate max-w-[170px] flex items-center gap-1.5">
                            <Paperclip className="h-3 w-3 text-slate-400" /> {file.name}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold shrink-0">{file.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent activity timeline log */}
                <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent Activity</span>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 font-semibold">
                    <Activity className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{selectedRequest.requestedBy} requested approval on {selectedRequest.requestedOn.split(",")[0]}.</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}
        </div>

      </div>

    </div>
  );
}
