import React, { useState, useMemo } from "react";
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
  Eye,
  ChevronRight,
  Send,
  User
} from "lucide-react";

// --- Types ---
export interface QuotationItem {
  id: string;
  customerName: string;
  quotationDate: string;
  validTill: string;
  validTillDays: string;
  grandTotal: number;
  status: "Draft" | "Sent" | "Expired" | "Converted";
  salespersonName: string;
  salespersonInitials: string;
  salespersonBg: string;
  createdOn: string;
}

// --- Mock Data ---
const initialQuotations: QuotationItem[] = [
  { id: "QUO-2026-0288", customerName: "Glow Systems Pvt Ltd", quotationDate: "31 May 2026", validTill: "30 Jun 2026", validTillDays: "30 days", grandTotal: 198474.00, status: "Sent", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", createdOn: "31 May 2026 04:40 PM" },
  { id: "QUO-2026-0287", customerName: "TechNova Solutions", quotationDate: "30 May 2026", validTill: "29 Jun 2026", validTillDays: "29 days", grandTotal: 185600.00, status: "Draft", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", createdOn: "30 May 2026 02:15 PM" },
  { id: "QUO-2026-0286", customerName: "Cloud Infra Pvt Ltd", quotationDate: "29 May 2026", validTill: "28 Jun 2026", validTillDays: "28 days", grandTotal: 326500.00, status: "Sent", salespersonName: "Rahul Sharma", salespersonInitials: "RS", salespersonBg: "bg-purple-100 text-purple-700", createdOn: "29 May 2026 11:20 AM" },
  { id: "QUO-2026-0285", customerName: "Global Goods", quotationDate: "28 May 2026", validTill: "27 Jun 2026", validTillDays: "27 days", grandTotal: 75300.00, status: "Expired", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", createdOn: "28 May 2026 09:40 AM" },
  { id: "QUO-2026-0284", customerName: "Prime Distributors", quotationDate: "27 May 2026", validTill: "26 Jun 2026", validTillDays: "26 days", grandTotal: 215000.00, status: "Converted", salespersonName: "Mike Johnson", salespersonInitials: "MJ", salespersonBg: "bg-amber-100 text-amber-700", createdOn: "27 May 2026 03:10 PM" },
  { id: "QUO-2026-0283", customerName: "Shree Agencies", quotationDate: "26 May 2026", validTill: "25 Jun 2026", validTillDays: "25 days", grandTotal: 105600.00, status: "Sent", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", createdOn: "26 May 2026 10:05 AM" },
  { id: "QUO-2026-0282", customerName: "Urban Traders", quotationDate: "25 May 2026", validTill: "24 Jun 2026", validTillDays: "24 days", grandTotal: 120000.00, status: "Draft", salespersonName: "Arjun Jose", salespersonInitials: "AJ", salespersonBg: "bg-blue-100 text-blue-700", createdOn: "25 May 2026 09:00 AM" },
  { id: "QUO-2026-0281", customerName: "Alpha Industries", quotationDate: "24 May 2026", validTill: "23 Jun 2026", validTillDays: "23 days", grandTotal: 162450.00, status: "Converted", salespersonName: "Jane Smith", salespersonInitials: "JS", salespersonBg: "bg-teal-100 text-teal-700", createdOn: "24 May 2026 04:15 PM" },
  { id: "QUO-2026-0280", customerName: "Spectrum Solutions", quotationDate: "23 May 2026", validTill: "22 Jun 2026", validTillDays: "22 days", grandTotal: 86750.00, status: "Expired", salespersonName: "Rahul Sharma", salespersonInitials: "RS", salespersonBg: "bg-purple-100 text-purple-700", createdOn: "23 May 2026 01:20 PM" },
  { id: "QUO-2026-0279", customerName: "Bright Enterprises", quotationDate: "22 May 2026", validTill: "21 Jun 2026", validTillDays: "21 days", grandTotal: 234800.00, status: "Sent", salespersonName: "Mike Johnson", salespersonInitials: "MJ", salespersonBg: "bg-amber-100 text-amber-700", createdOn: "22 May 2026 11:10 AM" },
];

export default function QuotationList() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<QuotationItem[]>(initialQuotations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getStatusColor = (status: QuotationItem["status"]) => {
    switch (status) {
      case "Converted":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Sent":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Draft":
        return "bg-slate-50 text-slate-700 border-slate-200";
      case "Expired":
        return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  // Filter logic
  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || q.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || q.salespersonName === ownerFilter;

    return matchesSearch && matchesStatus && matchesOwner;
  });

  // Donut chart segments calculation
  const donutData = useMemo(() => {
    const statusCounts = { Draft: 15, Sent: 56, Expired: 18, Converted: 39 };
    const total = 128;
    return [
      { label: "Draft", value: 15, percentage: (15 / total) * 100, color: "#94a3b8" },
      { label: "Sent", value: 56, percentage: (56 / total) * 100, color: "#2563eb" },
      { label: "Expired", value: 18, percentage: (18 / total) * 100, color: "#f43f5e" },
      { label: "Converted", value: 39, percentage: (39 / total) * 100, color: "#10b981" },
    ];
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span className="hover:text-slate-600">Sales</span>
        <ChevronRight className="h-3 w-3" />
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Quotation List</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quotations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage and track all your quotations. Convert quotations to sales orders when confirmed.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700">
            Import
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-bold text-xs"
          >
            <Plus className="h-4 w-4" />
            New Quotation
          </Button>
        </div>
      </div>

      {/* --- Row 1: KPI Stats Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Quotations", count: 128, sum: "₹ 1,24,75,300.00", color: "bg-blue-50 text-blue-600", icon: FileText },
          { label: "Draft", count: 15, sum: "₹ 9,12,500.00", color: "bg-slate-50 text-slate-600", icon: FolderOpen },
          { label: "Sent", count: 56, sum: "₹ 48,67,200.00", color: "bg-blue-50 text-blue-600", icon: Send },
          { label: "Expired", count: 18, sum: "₹ 12,15,600.00", color: "bg-rose-50 text-rose-600", icon: FileX },
          { label: "Converted", count: 39, sum: "₹ 54,79,000.00", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
                <div className="text-[10px] font-bold text-slate-400 font-mono">{kpi.sum}</div>
              </div>
              <div className={`p-2.5 rounded-xl shrink-0 ${kpi.color}`}>
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Table View (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-4">
          
          {/* Controls filtering bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search box */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by quotation no., customer..."
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
                <option value="Sent">Sent</option>
                <option value="Expired">Expired</option>
                <option value="Converted">Converted</option>
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

          {/* Quotations Table */}
          <Card className="border-slate-100">
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2.5">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      </TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Quotation No.</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Customer</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Quotation Date</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Valid Till</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold text-right">Grand Total (₹)</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Salesperson</TableHead>
                      <TableHead className="py-2.5 text-slate-400 font-bold">Created On</TableHead>
                      <TableHead className="py-2.5 w-16 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-655 font-semibold">
                    {filteredQuotations.map((q) => (
                      <TableRow
                        key={q.id}
                        onClick={() => navigate("/dashboard/sales/quotation/details")}
                        className="cursor-pointer hover:bg-slate-50 transition-colors"
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5 font-bold text-blue-600 hover:underline">
                          {q.id}
                        </TableCell>
                        <TableCell className="py-3.5 font-bold text-slate-800">{q.customerName}</TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-800">{q.quotationDate}</TableCell>
                        <TableCell className="py-3.5 font-semibold text-slate-500">
                          <div className="flex flex-col gap-0.2">
                            <span>{q.validTill}</span>
                            <span className="text-[9px] text-slate-400 font-bold">{q.validTillDays}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-right font-bold text-slate-905 text-slate-900 font-mono">
                          {formatCurrency(q.grandTotal).replace("₹", "").trim()}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(q.status)}`}>
                            {q.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className={`w-full h-full flex items-center justify-center rounded-full ${q.salespersonBg} font-bold`}>
                                {q.salespersonInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-800 text-xs">{q.salespersonName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-400 font-bold">{q.createdOn.split(" ")[0]} {q.createdOn.split(" ")[1]}</TableCell>
                        
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:bg-slate-100" onClick={() => navigate("/dashboard/sales/quotation/details")}>
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-4 w-4 text-slate-400" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Table pagination footer */}
              <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <span>Showing 1 to {filteredQuotations.length} of {quotations.length} quotations</span>
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

        {/* Right Sidebar stats dashboard panels */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Summary Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</CardTitle>
              <select className="p-1 border rounded bg-white text-[10px] font-bold text-slate-700 focus:outline-none cursor-pointer">
                <option>This Month</option>
              </select>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed text-slate-655 font-semibold">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Quotations</span>
                <span className="font-bold text-slate-900 font-mono">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Amount</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(4867200.00)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Converted Amount</span>
                <span className="font-bold text-slate-800 font-mono">{formatCurrency(2784000.00)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-emerald-600">Conversion Rate</span>
                <span className="font-bold text-emerald-700 font-mono">+ 57.18%</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2.5 mt-0.5">
                <span className="text-slate-400">Average Quotation Value</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(202800.00)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Breakdown Donut Chart Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 overflow-hidden">
              <StatusBreakdownDonutChart data={donutData} total={128} />
            </CardContent>
          </Card>

          {/* Top Salespersons Progress Indicators */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Salespersons</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs text-slate-655 font-semibold">
              {[
                { name: "Arjun Jose", sum: 1845600.00, pct: 100, initials: "AJ", bg: "bg-blue-100 text-blue-700" },
                { name: "Jane Smith", sum: 1326200.00, pct: 72, initials: "JS", bg: "bg-teal-100 text-teal-700" },
                { name: "Rahul Sharma", sum: 985500.00, pct: 53, initials: "RS", bg: "bg-purple-100 text-purple-700" },
                { name: "Mike Johnson", sum: 626900.00, pct: 34, initials: "MJ", bg: "bg-amber-100 text-amber-700" },
              ].map((sp) => (
                <div key={sp.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5 text-[8px] font-bold shrink-0">
                        <div className={`w-full h-full flex items-center justify-center rounded-full ${sp.bg} font-bold`}>
                          {sp.initials}
                        </div>
                      </Avatar>
                      <span className="truncate max-w-[100px]">{sp.name}</span>
                    </div>
                    <span className="font-mono text-[11px]">{formatCurrency(sp.sum)}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${sp.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent activities Card widget */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-[10px]">
              <div className="relative flex flex-col gap-3 pl-3 border-l border-slate-200 py-0.5 leading-tight">
                <div className="relative flex flex-col gap-0.5 text-slate-600 font-semibold">
                  <div className="absolute -left-[16.5px] top-0.5 h-2 w-2 bg-blue-500 border border-white rounded-full" />
                  <span>Quotation <span className="font-bold text-blue-600">QUO-2026-0288</span> sent to Glow Systems Pvt Ltd</span>
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

// Donut Helper Component
interface DonutBreakdownProps {
  data: { label: string; value: number; percentage: number; color: string }[];
  total: number;
}
function StatusBreakdownDonutChart({ data, total }: DonutBreakdownProps) {
  const size = 110;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accum = 0;
  const segments = data.map((d) => {
    const strokeLength = (d.percentage / 100) * circumference;
    const strokeOffset = circumference - (accum / 100) * circumference;
    accum += d.percentage;
    return { ...d, strokeLength, strokeOffset };
  });

  return (
    <div className="flex items-center gap-4 py-1 justify-between">
      <div className="relative w-[85px] h-[85px] shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#f8fafc" strokeWidth={strokeWidth} />
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.strokeLength} ${circumference}`}
              strokeDashoffset={seg.strokeOffset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
          <span className="text-sm font-extrabold text-slate-900 font-mono leading-none">{total}</span>
          <span className="text-[8px] text-slate-400 font-extrabold uppercase mt-0.5">Total</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1 text-[10px] font-semibold text-slate-655">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-400 font-bold truncate">{item.label}</span>
            </div>
            <span className="font-bold text-slate-800 font-mono text-[9px]">{item.value} ({item.percentage.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
