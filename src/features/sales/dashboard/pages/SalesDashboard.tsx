import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar, AvatarFallback } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  ShoppingBag,
  FileText,
  Users,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
  Info,
  TrendingUp,
  Building,
  Activity,
  DollarSign
} from "lucide-react";
import {
  SalesTrendChart,
  DonutChart,
  SalesComparisonChart
} from "../components/DashboardCharts";
import type {
  TrendDataPoint,
  DonutDataPoint,
  BarDataPoint
} from "../components/DashboardCharts";

// --- Mock Data Sets (Based on Mockup / Toggleable) ---
const trendDataMay: TrendDataPoint[] = [
  { label: "1 May", thisMonth: 320000, lastMonth: 280000 },
  { label: "6 May", thisMonth: 480000, lastMonth: 350000 },
  { label: "11 May", thisMonth: 850000, lastMonth: 720000 },
  { label: "16 May", thisMonth: 720000, lastMonth: 900000 },
  { label: "21 May", thisMonth: 1200000, lastMonth: 1000000 },
  { label: "26 May", thisMonth: 1650000, lastMonth: 1450000 },
  { label: "31 May", thisMonth: 1400000, lastMonth: 1300000 },
];

const trendDataApril: TrendDataPoint[] = [
  { label: "1 Apr", thisMonth: 280000, lastMonth: 250000 },
  { label: "6 Apr", thisMonth: 390000, lastMonth: 310000 },
  { label: "11 Apr", thisMonth: 720000, lastMonth: 650000 },
  { label: "16 Apr", thisMonth: 900000, lastMonth: 820000 },
  { label: "21 Apr", thisMonth: 1000000, lastMonth: 950000 },
  { label: "26 Apr", thisMonth: 1450000, lastMonth: 1200000 },
  { label: "30 Apr", thisMonth: 1300000, lastMonth: 1100000 },
];

const customerGroupData: DonutDataPoint[] = [
  { label: "Retailers", value: 745000, percentage: 40.6, color: "#2563eb" },
  { label: "Distributors", value: 520000, percentage: 28.3, color: "#0d9488" },
  { label: "Wholesalers", value: 365000, percentage: 19.9, color: "#ea580c" },
  { label: "Online Customers", value: 175000, percentage: 9.5, color: "#db2777" },
  { label: "Others", value: 30000, percentage: 1.7, color: "#64748b" },
];

const paymentMethodData: DonutDataPoint[] = [
  { label: "Bank Transfer", value: 920000, percentage: 50.1, color: "#7c3aed" },
  { label: "UPI", value: 510000, percentage: 27.8, color: "#2563eb" },
  { label: "Cash", value: 270000, percentage: 14.7, color: "#ea580c" },
  { label: "Card", value: 120000, percentage: 6.5, color: "#db2777" },
  { label: "Others", value: 15000, percentage: 0.9, color: "#10b981" },
];

const topCustomers = [
  { name: "Globax Corporation", value: 245000, initials: "GC", color: "bg-blue-100 text-blue-700" },
  { name: "Tech Solutions Ltd", value: 195000, initials: "TS", color: "bg-teal-100 text-teal-700" },
  { name: "Bright Retailers", value: 165000, initials: "BR", color: "bg-amber-100 text-amber-700" },
  { name: "Prime Distributors", value: 130000, initials: "PD", color: "bg-purple-100 text-purple-700" },
  { name: "NextGen Stores", value: 110000, initials: "NS", color: "bg-pink-100 text-pink-700" },
];

const comparisonData: BarDataPoint[] = [
  { label: "Jan 2026", thisYear: 1250000, lastYear: 1050000 },
  { label: "Feb 2026", thisYear: 1420000, lastYear: 1200000 },
  { label: "Mar 2026", thisYear: 1650000, lastYear: 1380000 },
  { label: "Apr 2026", thisYear: 1548750, lastYear: 1410000 },
  { label: "May 2026", thisYear: 1835000, lastYear: 1548750 },
];

export default function SalesDashboard() {
  const [isStarred, setIsStarred] = useState(false);
  const [dateRange, setDateRange] = useState("01 May 2026 - 31 May 2026");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterBranch, setActiveFilterBranch] = useState("All");

  // Toggle mockup states for data simulation
  const isMayData = dateRange.includes("May");
  const currentTrendData = isMayData ? trendDataMay : trendDataApril;

  // Currencies formatting
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sales Dashboard</h1>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-slate-100 rounded-full"
              onClick={() => setIsStarred(!isStarred)}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  isStarred ? "fill-amber-400 stroke-amber-500" : "text-slate-400"
                }`}
              />
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Overview of your sales performance and key metrics.
          </p>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto relative">
          
          {/* Date Picker Button */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-xs">{dateRange}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Button>

            {/* Date Picker Simulator Dropdown */}
            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 text-xs">
                <div className="px-3 py-2 text-slate-400 font-bold border-b select-none">
                  Select Date Range
                </div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700"
                  onClick={() => {
                    setDateRange("01 May 2026 - 31 May 2026");
                    setShowDatePicker(false);
                  }}
                >
                  May 2026 (Active Month)
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700"
                  onClick={() => {
                    setDateRange("01 Apr 2026 - 30 Apr 2026");
                    setShowDatePicker(false);
                  }}
                >
                  April 2026 (Previous Month)
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700"
                  onClick={() => {
                    setDateRange("01 Mar 2026 - 31 May 2026");
                    setShowDatePicker(false);
                  }}
                >
                  Last 3 Months (Spring)
                </button>
              </div>
            )}
          </div>

          {/* Filters Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50 ${
              showFilters ? "border-blue-500 ring-1 ring-blue-500/25" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-xs">Filters</span>
            {activeFilterBranch !== "All" && (
              <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100 px-1 text-[10px]">
                {activeFilterBranch}
              </Badge>
            )}
          </Button>

          {/* Filter Simulator Box */}
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-4 text-xs flex flex-col gap-3">
              <div className="font-bold text-slate-900 border-b pb-1 select-none flex justify-between items-center">
                <span>Filter Dashboard</span>
                <button
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => {
                    setActiveFilterBranch("All");
                    setShowFilters(false);
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold mb-1">Branch Location</span>
                {["All", "Main Branch", "HSR Layout", "Whitefield", "Mysore Road"].map((branch) => (
                  <label key={branch} className="flex items-center gap-2 py-1 cursor-pointer hover:text-slate-900">
                    <input
                      type="radio"
                      name="branchFilter"
                      checked={activeFilterBranch === branch}
                      onChange={() => {
                        setActiveFilterBranch(branch);
                        setShowFilters(false);
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className={activeFilterBranch === branch ? "font-bold text-blue-700" : "text-slate-600"}>
                      {branch}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- Row 1: KPI Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Total Sales */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales (₹)</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "₹ 18,35,000" : "₹ 15,48,750"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>{isMayData ? "18.6%" : "12.4%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 2: Invoices */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoices</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "156" : "139"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>{isMayData ? "12.5%" : "8.2%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 3: New Customers */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Customers</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "32" : "28"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>{isMayData ? "10.3%" : "9.1%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4: Avg Order Value */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg. Order Value (₹)</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "₹ 11,762" : "₹ 11,142"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>{isMayData ? "8.7%" : "5.4%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 5: Returns */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Returns (₹)</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "₹ 97,350" : "₹ 1,03,950"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
                <ArrowDownRight className="h-3 w-3" />
                <span>{isMayData ? "-6.4%" : "-2.1%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl shrink-0">
              <ArrowDownRight className="h-5 w-5 rotate-90" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 6: Gross Profit */}
        <Card className="border-slate-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Profit (₹)</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {isMayData ? "₹ 6,48,250" : "₹ 5,58,600"}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>{isMayData ? "16.2%" : "11.5%"} vs Apr 2026</span>
              </div>
            </div>
            <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl shrink-0">
              <Percent className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* --- Row 2: Charts and Highlights Row --- */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Sales Trend Line Chart Card */}
        <Card className="col-span-12 xl:col-span-4 border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-bold text-slate-800">Sales Trend</CardTitle>
              <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
            </div>
            <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
              This Month
            </Badge>
          </CardHeader>
          <CardContent className="h-[240px]">
            <SalesTrendChart data={currentTrendData} />
            
            {/* Custom chart legend inside card content */}
            <div className="flex items-center justify-center gap-4 mt-1 text-[10px] font-semibold text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-blue-600 rounded-full inline-block" />
                <span>This Month</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-slate-400 rounded-full border border-dashed border-white inline-block" />
                <span>Last Month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart: Customer Group */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 border-slate-100">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-bold text-slate-800">Sales by Customer Group</CardTitle>
              <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
            </div>
          </CardHeader>
          <CardContent className="h-[240px] flex flex-col justify-between">
            <DonutChart
              data={customerGroupData}
              centerLabel={isMayData ? "₹ 18,35,000" : "₹ 15,48,750"}
              centerSublabel="Total"
            />
          </CardContent>
        </Card>

        {/* Donut Chart: Payment Method */}
        <Card className="col-span-12 md:col-span-6 xl:col-span-3 border-slate-100">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-bold text-slate-800">Sales by Payment Method</CardTitle>
              <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
            </div>
          </CardHeader>
          <CardContent className="h-[240px] flex flex-col justify-between">
            <DonutChart
              data={paymentMethodData}
              centerLabel={isMayData ? "₹ 18,35,000" : "₹ 15,48,750"}
              centerSublabel="Total"
            />
          </CardContent>
        </Card>

        {/* List Card: Top Customers */}
        <Card className="col-span-12 xl:col-span-2 border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-800">Top Customers</CardTitle>
            <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
              This Month
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-[240px]">
            <div className="flex flex-col gap-2.5">
              {topCustomers.map((cust) => (
                <div key={cust.name} className="flex items-center justify-between text-xs py-0.5 hover:bg-slate-50 transition-colors rounded">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-6 w-6 text-[10px] shrink-0 font-bold">
                      <div className={`w-full h-full flex items-center justify-center rounded-full ${cust.color}`}>
                        {cust.initials}
                      </div>
                    </Avatar>
                    <span className="font-semibold text-slate-700 truncate">{cust.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 whitespace-nowrap shrink-0 font-mono">
                    {formatCurrency(cust.value)}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="link"
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2"
            >
              View All Customers →
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* --- Row 3: Grid containing Tables, Invoices, Feeds, and Sales Comparison --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT & CENTER COMBINED VERTICAL STACK */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Row: Sales Overview Table & Items/Branch Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sales Overview Comparison Card */}
            <Card className="border-slate-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CardTitle className="text-sm font-bold text-slate-800">Sales Overview</CardTitle>
                    <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-[300px]">
                <div className="overflow-auto max-h-[245px] pr-1">
                  <Table className="text-xs w-full">
                    <TableHeader className="bg-slate-50/50 sticky top-0">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="py-1.5 h-auto text-slate-400 font-bold">Metric</TableHead>
                        <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">This Month</TableHead>
                        <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">Last Month</TableHead>
                        <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">Change (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-slate-600 font-medium">
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Total Sales (₹)</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">18,35,000</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">15,48,750</TableCell>
                        <TableCell className="py-1.5 text-right text-emerald-600 font-bold">▲ 18.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Total Invoices</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">156</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">139</TableCell>
                        <TableCell className="py-1.5 text-right text-emerald-600 font-bold">▲ 12.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Total Quotations</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">98</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">87</TableCell>
                        <TableCell className="py-1.5 text-right text-emerald-600 font-bold">▲ 12.6%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Converted Quotations</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">62 (63.3%)</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">54 (62.1%)</TableCell>
                        <TableCell className="py-1.5 text-right text-emerald-600 font-bold">▲ 1.9%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Total Returns (₹)</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">97,350</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">1,03,950</TableCell>
                        <TableCell className="py-1.5 text-right text-rose-600 font-bold">▼ -6.4%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Gross Profit (₹)</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">6,48,250</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">5,58,600</TableCell>
                        <TableCell className="py-1.5 text-right text-emerald-600 font-bold">▲ 16.2%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1.5 font-bold text-slate-700">Gross Profit Margin</TableCell>
                        <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">35.3%</TableCell>
                        <TableCell className="py-1.5 text-right font-mono">36.0%</TableCell>
                        <TableCell className="py-1.5 text-right text-rose-600 font-bold">▼ -0.7%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Button
                  variant="link"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2"
                >
                  View Detailed Report →
                </Button>
              </CardContent>
            </Card>

            {/* Sales by Item & Sales by Branch Stacked Column */}
            <div className="flex flex-col gap-6">
              
              {/* Sales by Item Card */}
              <Card className="border-slate-100 flex-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-1.5">
                    <CardTitle className="text-sm font-bold text-slate-800">Sales by Item (Top 5)</CardTitle>
                    <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                    By Amount
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col justify-between text-xs h-[105px]">
                  <div className="overflow-auto max-h-[80px]">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="py-1 h-auto text-slate-400 font-bold">Item</TableHead>
                          <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Quantity</TableHead>
                          <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Sales (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-slate-600 font-medium">
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">LED Monitor 24 Inch</TableCell>
                          <TableCell className="py-1 text-right font-mono">45</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">4,50,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Keyboard Wireless</TableCell>
                          <TableCell className="py-1 text-right font-mono">78</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">2,34,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">USB-C Cable 1.5m</TableCell>
                          <TableCell className="py-1 text-right font-mono">120</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">1,80,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Wireless Mouse</TableCell>
                          <TableCell className="py-1 text-right font-mono">95</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">1,42,500</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Office Chair</TableCell>
                          <TableCell className="py-1 text-right font-mono">18</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">1,25,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <Button
                    variant="link"
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-1.5"
                  >
                    View All Items →
                  </Button>
                </CardContent>
              </Card>

              {/* Sales by Branch Card */}
              <Card className="border-slate-100 flex-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-1.5">
                    <CardTitle className="text-sm font-bold text-slate-800">Sales by Branch</CardTitle>
                    <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                    This Month
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col justify-between text-xs h-[105px]">
                  <div className="overflow-auto max-h-[80px]">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="py-1 h-auto text-slate-400 font-bold">Branch</TableHead>
                          <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Sales (₹)</TableHead>
                          <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-slate-600 font-medium">
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Main Branch</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">9,25,000</TableCell>
                          <TableCell className="py-1 text-right font-mono">50.4%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">HSR Layout</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">4,20,000</TableCell>
                          <TableCell className="py-1 text-right font-mono">22.9%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Whitefield</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">3,10,000</TableCell>
                          <TableCell className="py-1 text-right font-mono">16.9%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-1 font-bold text-slate-700">Mysore Road</TableCell>
                          <TableCell className="py-1 text-right font-bold font-mono">1,80,000</TableCell>
                          <TableCell className="py-1 text-right font-mono">9.8%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <Button
                    variant="link"
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-1.5"
                  >
                    View All Branches →
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Bottom Row: Sales Comparison Chart (Spans columns 1 and 2) */}
          <Card className="border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-1.5">
                <CardTitle className="text-sm font-bold text-slate-800">Sales Comparison</CardTitle>
                <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
              </div>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                This Year
              </Badge>
            </CardHeader>
            <CardContent className="h-[240px] flex flex-col md:flex-row gap-6 items-center">
              
              {/* Bar Chart Container */}
              <div className="flex-1 w-full h-full min-h-[170px]">
                <SalesComparisonChart data={comparisonData} />
                
                {/* Custom chart legend */}
                <div className="flex items-center justify-center gap-4 mt-2 text-[10px] font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded inline-block" />
                    <span>This Year (₹)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-slate-300 rounded inline-block" />
                    <span>Last Year (₹)</span>
                  </div>
                </div>
              </div>

              {/* Side Aggregation Metrics */}
              <div className="w-full md:w-56 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 self-stretch">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Sales (This Year)</span>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">₹ 87,45,000</div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>15.8% vs Last Year</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total Sales (Last Year)</span>
                  <div className="text-lg font-extrabold text-slate-500 font-mono">₹ 75,47,000</div>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN (Invoices, Activities) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Recent Invoices Card */}
          <Card className="border-slate-100 flex flex-col h-[325px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
              <CardTitle className="text-sm font-bold text-slate-800">Recent Invoices</CardTitle>
              <button className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold">
                View all
              </button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[225px] pr-1">
                {[
                  { id: "INV-2026-000152", date: "21 May 2026", amount: 56250, status: "Paid", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                  { id: "INV-2026-000151", date: "20 May 2026", amount: 48900, status: "Paid", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                  { id: "INV-2026-000150", date: "19 May 2026", amount: 34750, status: "Sent", color: "bg-blue-50 text-blue-700 border-blue-100" },
                  { id: "INV-2026-000149", date: "18 May 2026", amount: 22650, status: "Overdue", color: "bg-rose-50 text-rose-700 border-rose-100" },
                  { id: "INV-2026-000148", date: "17 May 2026", amount: 15250, status: "Paid", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                ].map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between text-xs py-1 hover:bg-slate-50 transition-colors rounded px-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-800">{inv.id}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{inv.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 font-mono">{formatCurrency(inv.amount)}</span>
                      <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${inv.color}`}>
                        {inv.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed Card */}
          <Card className="border-slate-100 flex flex-col h-[325px]">
            <CardHeader className="pb-2 shrink-0">
              <CardTitle className="text-sm font-bold text-slate-800">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[225px] pr-1">
                {[
                  {
                    icon: FileText,
                    color: "bg-emerald-50 text-emerald-600",
                    text: "Invoice INV-2026-000152 paid by Globax Corporation",
                    time: "2 minutes ago"
                  },
                  {
                    icon: FileText,
                    color: "bg-blue-50 text-blue-600",
                    text: "New quotation QUO-2026-00098 created",
                    time: "15 minutes ago"
                  },
                  {
                    icon: ShoppingBag,
                    color: "bg-purple-50 text-purple-600",
                    text: "Sales order SO-2026-00076 converted to invoice",
                    time: "1 hour ago"
                  },
                  {
                    icon: Activity,
                    color: "bg-amber-50 text-amber-600",
                    text: "Payment of ₹ 48,900 received from Tech Solutions Ltd",
                    time: "2 hours ago"
                  },
                ].map((act, i) => (
                  <div key={i} className="flex gap-3 text-xs leading-relaxed">
                    <div className={`p-2 rounded-xl shrink-0 h-8 w-8 flex items-center justify-center ${act.color}`}>
                      <act.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold text-slate-700">{act.text}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="link"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2 pt-2 border-t border-slate-50 shrink-0"
              >
                View All Activity →
              </Button>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
