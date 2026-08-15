import React, { useState } from "react";
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
  XCircle,
  FilterX
} from "lucide-react";

export interface SentQuotationItem {
  id: string;
  series: string;
  customerName: string;
  quotationDate: string;
  validTill: string;
  validTillDays: string;
  amount: number;
  status: "Sent" | "Viewed" | "Accepted" | "Expired" | "Cancelled";
  sentOn: string;
  sentTo: string;
}

const sentItems: SentQuotationItem[] = [
  { id: "QUO-2026-0288", series: "QUO-2026-", customerName: "Glow Systems Pvt Ltd", quotationDate: "31 May 2026", validTill: "30 Jun 2026", validTillDays: "30 days left", amount: 198474.00, status: "Sent", sentOn: "31 May 2026 04:40 PM", sentTo: "accounts@glowsystems.com" },
  { id: "QUO-2026-0285", series: "QUO-2026-", customerName: "TechVision India", quotationDate: "30 May 2026", validTill: "29 Jun 2026", validTillDays: "29 days left", amount: 92650.00, status: "Sent", sentOn: "30 May 2026 02:25 PM", sentTo: "procurement@techvision.in" },
  { id: "QUO-2026-0279", series: "QUO-2026-", customerName: "Prime Retail Ltd", quotationDate: "28 May 2026", validTill: "27 Jun 2026", validTillDays: "27 days left", amount: 125000.00, status: "Viewed", sentOn: "28 May 2026 11:15 AM", sentTo: "purchase@primeretail.com" },
  { id: "QUO-2026-0274", series: "QUO-2026-", customerName: "Byte Solutions", quotationDate: "26 May 2026", validTill: "25 Jun 2026", validTillDays: "25 days left", amount: 75430.00, status: "Accepted", sentOn: "26 May 2026 03:30 PM", sentTo: "info@bytesolutions.com" },
  { id: "QUO-2026-0270", series: "QUO-2026-", customerName: "Adithya Enterprises", quotationDate: "24 May 2026", validTill: "23 Jun 2026", validTillDays: "23 days left", amount: 54890.00, status: "Expired", sentOn: "24 May 2026 10:10 AM", sentTo: "admin@adithyaent.in" },
  { id: "QUO-2026-0265", series: "QUO-2026-", customerName: "GreenField Traders", quotationDate: "22 May 2026", validTill: "21 Jun 2026", validTillDays: "21 days left", amount: 102300.00, status: "Sent", sentOn: "22 May 2026 12:05 PM", sentTo: "orders@greenfield.com" },
  { id: "QUO-2026-0261", series: "QUO-2026-", customerName: "Innovatech Pvt Ltd", quotationDate: "20 May 2026", validTill: "19 Jun 2026", validTillDays: "19 days left", amount: 66120.00, status: "Viewed", sentOn: "20 May 2026 04:00 PM", sentTo: "purchasing@innovatech.com" },
  { id: "QUO-2026-0255", series: "QUO-2026-", customerName: "Nexora Solutions", quotationDate: "18 May 2026", validTill: "17 Jun 2026", validTillDays: "17 days left", amount: 89950.00, status: "Cancelled", sentOn: "18 May 2026 11:45 AM", sentTo: "-" },
];

export default function QuotationSend() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"All" | "Sent" | "Viewed" | "Accepted" | "Expired" | "Cancelled">("All");

  const [dateRange, setDateRange] = useState("01 May 2026 - 31 May 2026");
  const [customer, setCustomer] = useState("All");
  const [salesperson, setSalesperson] = useState("All");
  const [status, setStatus] = useState("Sent");
  const [branch, setBranch] = useState("All Branches");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getStatusColor = (status: SentQuotationItem["status"]) => {
    switch (status) {
      case "Sent":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Viewed":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Expired":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Cancelled":
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const filteredItems = sentItems.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Send Quotations</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Send Quotations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track all quotations that have been sent to customers.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-bold text-xs text-slate-700 h-8">
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/quotation/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-bold text-xs h-8"
          >
            <Plus className="h-4 w-4" />
            Send Quotation
          </Button>
        </div>
      </div>

      {/* --- Detailed Filters Panel --- */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
        
        {/* Date range picker */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-700">Date Range</label>
          <div className="flex items-center gap-2 p-2 border rounded-lg bg-slate-50/50 hover:bg-white cursor-pointer transition-colors">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>{dateRange}</span>
          </div>
        </div>

        {/* Customer */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-700">Customer</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="p-2 border rounded-lg bg-white focus:outline-none"
          >
            <option value="All">Select customer</option>
          </select>
        </div>

        {/* Salesperson */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-700">Salesperson</label>
          <select
            value={salesperson}
            onChange={(e) => setSalesperson(e.target.value)}
            className="p-2 border rounded-lg bg-white focus:outline-none"
          >
            <option value="All">Select salesperson</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-lg bg-white focus:outline-none"
          >
            <option value="Sent">Sent</option>
          </select>
        </div>

        {/* Branch */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-slate-700">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-2 border rounded-lg bg-white focus:outline-none"
          >
            <option value="All Branches">All Branches</option>
          </select>
        </div>

        {/* Amount Range */}
        <div className="flex flex-col gap-1 col-span-2">
          <label className="font-bold text-slate-700">Amount Range</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Min amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="p-2 border rounded-lg bg-white w-full focus:outline-none"
            />
            <span className="text-slate-400">-</span>
            <input
              type="text"
              placeholder="Max amount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="p-2 border rounded-lg bg-white w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-end justify-end gap-2">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700 gap-1.5 font-bold h-9">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            More Filters
          </Button>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-500 gap-1.5 font-bold h-9">
            <FilterX className="h-3.5 w-3.5 text-slate-400" />
            Clear Filters
          </Button>
        </div>

      </div>

      {/* --- Filter pills bar and count status --- */}
      <div className="flex items-center justify-between border-b pb-2 text-xs font-bold text-slate-400 gap-2 mt-2">
        <div className="flex items-center gap-1">
          {[
            { id: "All", label: "All", count: null },
            { id: "Sent", label: "Sent", count: 28 },
            { id: "Viewed", label: "Viewed", count: 12 },
            { id: "Accepted", label: "Accepted", count: 8 },
            { id: "Expired", label: "Expired", count: 4 },
            { id: "Cancelled", label: "Cancelled", count: 2 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1.5 px-3 border-b-2 font-semibold transition-colors ${
                  isActive ? "border-blue-600 text-blue-755 text-blue-700 font-bold bg-white rounded-t-lg" : "border-transparent hover:text-slate-600"
                }`}
              >
                {tab.label} {tab.count !== null ? `(${tab.count})` : ""}
              </button>
            );
          })}
        </div>
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total 28 Records</span>
      </div>

      {/* --- Table list Card --- */}
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
                  <TableHead className="py-2.5 text-slate-400 font-bold text-right">Amount (₹)</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Sent On</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Sent To</TableHead>
                  <TableHead className="py-2.5 w-16 text-center" />
                </TableRow>
              </TableHeader>
              <TableBody className="text-slate-655 font-semibold">
                {filteredItems.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => navigate("/dashboard/sales/quotation/details")}
                    className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                  >
                    <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex flex-col gap-0.2">
                        <span className="font-bold text-blue-600 hover:underline">{row.id}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{row.series}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 font-bold text-slate-800">{row.customerName}</TableCell>
                    <TableCell className="py-3.5 font-semibold text-slate-855 text-slate-800">{row.quotationDate}</TableCell>
                    <TableCell className="py-3.5 font-semibold text-slate-500">
                      <div className="flex flex-col gap-0.2">
                        <span>{row.validTill}</span>
                        <span className="text-[9px] text-slate-400 font-bold">{row.validTillDays}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                      {formatCurrency(row.amount).replace("₹", "").trim()}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(row.status)}`}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 font-bold text-slate-500">{row.sentOn}</TableCell>
                    <TableCell className="py-3.5 text-slate-600 font-semibold truncate max-w-[180px]">{row.sentTo}</TableCell>
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
            <span>Showing 1 to {filteredItems.length} of {sentItems.length} entries</span>
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
  );
}
