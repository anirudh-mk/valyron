import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Search,
  ChevronDown,
  Plus,
  SlidersHorizontal,
  Settings2,
  Calendar,
  MoreHorizontal,
  FolderOpen,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  History,
  CheckCircle,
  FileX,
  Clock
} from "lucide-react";

// --- Types ---
export interface EstimateItem {
  id: string;
  customerName: string;
  estimateDate: string;
  validTill: string;
  grandTotal: number;
  status: "Draft" | "Pending Approval" | "Approved" | "Expired";
  salespersonName: string;
  salespersonInitials: string;
  salespersonBg: string;
  convertedTo: string;
}

// --- Mock Data ---
const initialEstimates: EstimateItem[] = [
  { id: "EST-2026-0512", customerName: "Glow Systems Pvt Ltd", estimateDate: "31 May 2026", validTill: "14 Jun 2026", grandTotal: 248750.00, status: "Approved", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", convertedTo: "QUO-2026-0287" },
  { id: "EST-2026-0511", customerName: "TechNova Solutions", estimateDate: "31 May 2026", validTill: "14 Jun 2026", grandTotal: 185600.00, status: "Pending Approval", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", convertedTo: "" },
  { id: "EST-2026-0510", customerName: "Bright Retailers", estimateDate: "30 May 2026", validTill: "13 Jun 2026", grandTotal: 98750.00, status: "Draft", salespersonName: "Rahul Sharma", salespersonInitials: "RS", salespersonBg: "bg-purple-100 text-purple-700", convertedTo: "" },
  { id: "EST-2026-0509", customerName: "Cloud Infra Pvt Ltd", estimateDate: "30 May 2026", validTill: "13 Jun 2026", grandTotal: 326500.00, status: "Approved", salespersonName: "Mike Johnson", salespersonInitials: "MJ", salespersonBg: "bg-amber-100 text-amber-700", convertedTo: "QUO-2026-0286" },
  { id: "EST-2026-0508", customerName: "Urban Traders", estimateDate: "29 May 2026", validTill: "12 Jun 2026", grandTotal: 120000.00, status: "Approved", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", convertedTo: "QUO-2026-0285" },
  { id: "EST-2026-0507", customerName: "Global Goods", estimateDate: "29 May 2026", validTill: "11 Jun 2026", grandTotal: 75300.00, status: "Expired", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", convertedTo: "" },
  { id: "EST-2026-0506", customerName: "Prime Distributors", estimateDate: "28 May 2026", validTill: "11 Jun 2026", grandTotal: 215000.00, status: "Pending Approval", salespersonName: "Rahul Sharma", salespersonInitials: "RS", salespersonBg: "bg-purple-100 text-purple-700", convertedTo: "" },
  { id: "EST-2026-0505", customerName: "Shree Agencies", estimateDate: "27 May 2026", validTill: "10 Jun 2026", grandTotal: 105600.00, status: "Approved", salespersonName: "Mike Johnson", salespersonInitials: "MJ", salespersonBg: "bg-amber-100 text-amber-700", convertedTo: "QUO-2026-0284" },
  { id: "EST-2026-0504", customerName: "NextGen Stores", estimateDate: "27 May 2026", validTill: "10 Jun 2026", grandTotal: 52800.00, status: "Draft", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", convertedTo: "" },
  { id: "EST-2026-0503", customerName: "Design Hub", estimateDate: "26 May 2026", validTill: "09 Jun 2026", grandTotal: 162450.00, status: "Approved", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", convertedTo: "QUO-2026-0283" },
];

export default function EstimateList() {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<EstimateItem[]>(initialEstimates);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [customerFilter, setCustomerFilter] = useState("All");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getStatusColor = (status: EstimateItem["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Pending Approval":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Draft":
        return "bg-slate-50 text-slate-700 border-slate-200";
      case "Expired":
        return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  // Filtering
  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch =
      est.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      est.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || est.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || est.salespersonName === ownerFilter;
    const matchesCustomer = customerFilter === "All" || est.customerName === customerFilter;

    return matchesSearch && matchesStatus && matchesOwner && matchesCustomer;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Estimate List</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View, track and manage all your sales estimates.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            Import Estimates
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/estimate/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs"
          >
            <Plus className="h-4 w-4" />
            Create Estimate
            <ChevronDown className="h-3.5 w-3.5 border-l border-blue-500 pl-1.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* --- Row 1: KPI Stats Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Estimates", count: 256, change: "▲ 18.6% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: FileText },
          { label: "Draft", count: 32, change: "▲ 12.5% vs Apr 2026", color: "bg-slate-50 text-slate-600", icon: FolderOpen },
          { label: "Pending Approval", count: 18, change: "▲ 7.0% vs Apr 2026", color: "bg-amber-50 text-amber-600", icon: Clock },
          { label: "Approved", count: 142, change: "▲ 22.1% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
          { label: "Expired", count: 28, change: "▼ 10.9% vs Apr 2026", color: "bg-rose-50 text-rose-600", icon: FileX },
          { label: "Converted to Quotation", count: 98, change: "▲ 38.3% vs Apr 2026", color: "bg-purple-50 text-purple-600", icon: FileCheck },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
                <div className="text-[10px] font-bold text-emerald-600">
                  {kpi.change}
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
        
        {/* Estimates Table List (Spans left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-4">
          
          {/* Controls filtering block */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search estimates by number, customer..."
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
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Expired">Expired</option>
              </select>

              {/* Datepicker mock */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-slate-50/50 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 cursor-pointer">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>This Month</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>

              {/* Customer */}
              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All Customers</option>
                <option value="Glow Systems Pvt Ltd">Glow Systems Pvt Ltd</option>
                <option value="TechNova Solutions">TechNova Solutions</option>
                <option value="Bright Retailers">Bright Retailers</option>
                <option value="Cloud Infra Pvt Ltd">Cloud Infra Pvt Ltd</option>
              </select>

              {/* Salesperson */}
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All Salespersons</option>
                <option value="Arjun Jose">Arjun Jose</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
                <option value="Rahul Sharma">Rahul Sharma</option>
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

          {/* Table Container */}
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
                      <TableHead className="py-2.5 text-slate-400 font-bold">Valid Till</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right">Grand Total</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Salesperson</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Converted To</TableHead>
                      <TableHead className="py-2.5 w-16 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-600 font-medium">
                    {filteredEstimates.map((est) => (
                      <TableRow
                        key={est.id}
                        className="cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => navigate("/dashboard/sales/estimate/details")}
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span className="font-bold text-blue-600 hover:underline">{est.id}</span>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <span className="font-bold text-slate-800">{est.customerName}</span>
                        </TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-800">
                          {est.estimateDate}
                        </TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-500">
                          {est.validTill}
                        </TableCell>
                        <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                          {formatCurrency(est.grandTotal)}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(est.status)}`}>
                            {est.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className={`w-full h-full flex items-center justify-center rounded-full ${est.salespersonBg} font-bold`}>
                                {est.salespersonInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-800 text-xs">{est.salespersonName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-600 font-mono">
                          {est.convertedTo ? (
                            <span className="text-purple-600 font-bold hover:underline">{est.convertedTo}</span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-200">
                            <MoreHorizontal className="h-4.5 w-4.5 text-slate-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Table pagination footer */}
              <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <span>Showing 1 to {filteredEstimates.length} of {estimates.length} estimates</span>
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
                    <option>20 / page</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar Widget Panels */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Filters Summary Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Summary</CardTitle>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                  setOwnerFilter("All");
                  setCustomerFilter("All");
                }}
                className="text-[10px] font-bold text-blue-600 hover:underline"
              >
                Clear All
              </button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs text-slate-600 font-semibold">
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Date Range</span>
                <div className="flex items-center gap-2 p-2 border rounded-lg bg-slate-50 text-slate-700 cursor-pointer">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>01 May 2026 - 31 May 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                <span className="font-bold text-slate-800">{statusFilter}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Salesperson</span>
                <span className="font-bold text-slate-800">{ownerFilter}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Customer</span>
                <span className="font-bold text-slate-800 truncate max-w-[120px]">{customerFilter}</span>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full mt-1">
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-blue-600 font-semibold">
              <Link to="/dashboard/sales/estimate/create" className="flex items-center justify-between hover:underline group">
                <span>Create Estimate</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/dashboard/sales/estimate/approval" className="flex items-center justify-between hover:underline group">
                <span>Estimate Approval</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/dashboard/sales/estimate/revisions" className="flex items-center justify-between hover:underline group">
                <span>Estimate Revisions</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/dashboard/sales/estimate/details" className="flex items-center justify-between hover:underline group">
                <span>Estimate → Quotation</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </CardContent>
          </Card>

          {/* Reports Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-slate-700 font-semibold">
              {[
                "Estimate Summary",
                "Expired Estimates",
                "Estimates by Customer",
                "Estimates by Salesperson",
              ].map((report) => (
                <div key={report} className="flex items-center justify-between cursor-pointer hover:text-blue-600">
                  <span>{report}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
