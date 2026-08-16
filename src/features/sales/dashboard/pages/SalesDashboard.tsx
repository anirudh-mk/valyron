import React, { useState } from "react";
import MetricsGrid from "@/components/app/MetricsGrid.tsx";
import Surface from "@/components/app/Surface.tsx";
import {
  ShoppingBag,
  FileText,
  Users,
  Percent,
  ArrowDownRight,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import { ChartsRow } from "../components/ChartsRow";
import { AnalyticsRow } from "../components/AnalyticsRow";
import type { DonutDataPoint, BarDataPoint, TrendDataPoint } from "../components/DashboardCharts";

// --- Mock Data Sets (Based on Mockup / Toggleable) ---
const trendDataMay: TrendDataPoint[] = [
  { label: "1 May",  thisMonth: 320000,  lastMonth: 280000  },
  { label: "6 May",  thisMonth: 480000,  lastMonth: 350000  },
  { label: "11 May", thisMonth: 850000,  lastMonth: 720000  },
  { label: "16 May", thisMonth: 720000,  lastMonth: 900000  },
  { label: "21 May", thisMonth: 1200000, lastMonth: 1000000 },
  { label: "26 May", thisMonth: 1650000, lastMonth: 1450000 },
  { label: "31 May", thisMonth: 1400000, lastMonth: 1300000 },
];

const trendDataApril: TrendDataPoint[] = [
  { label: "1 Apr",  thisMonth: 280000,  lastMonth: 250000  },
  { label: "6 Apr",  thisMonth: 390000,  lastMonth: 310000  },
  { label: "11 Apr", thisMonth: 720000,  lastMonth: 650000  },
  { label: "16 Apr", thisMonth: 900000,  lastMonth: 820000  },
  { label: "21 Apr", thisMonth: 1000000, lastMonth: 950000  },
  { label: "26 Apr", thisMonth: 1450000, lastMonth: 1200000 },
  { label: "30 Apr", thisMonth: 1300000, lastMonth: 1100000 },
];

const customerGroupData: DonutDataPoint[] = [
  { label: "Retailers",        value: 745000, percentage: 40.6, color: "#2563eb" },
  { label: "Distributors",     value: 520000, percentage: 28.3, color: "#0d9488" },
  { label: "Wholesalers",      value: 365000, percentage: 19.9, color: "#ea580c" },
  { label: "Online Customers", value: 175000, percentage:  9.5, color: "#db2777" },
  { label: "Others",           value:  30000, percentage:  1.7, color: "#64748b" },
];

const paymentMethodData: DonutDataPoint[] = [
  { label: "Bank Transfer", value: 920000, percentage: 50.1, color: "#7c3aed" },
  { label: "UPI",           value: 510000, percentage: 27.8, color: "#2563eb" },
  { label: "Cash",          value: 270000, percentage: 14.7, color: "#ea580c" },
  { label: "Card",          value: 120000, percentage:  6.5, color: "#db2777" },
  { label: "Others",        value:  15000, percentage:  0.9, color: "#10b981" },
];

const topCustomers = [
  { name: "Globax Corporation",  value: 245000, initials: "GC", color: "bg-blue-100 text-blue-700"   },
  { name: "Tech Solutions Ltd",  value: 195000, initials: "TS", color: "bg-teal-100 text-teal-700"   },
  { name: "Bright Retailers",    value: 165000, initials: "BR", color: "bg-amber-100 text-amber-700" },
  { name: "Prime Distributors",  value: 130000, initials: "PD", color: "bg-purple-100 text-purple-700" },
  { name: "NextGen Stores",      value: 110000, initials: "NS", color: "bg-pink-100 text-pink-700"   },
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
  const [activeFilterBranch, setActiveFilterBranch] = useState("All");

  const isMayData = dateRange.includes("May");
  const currentTrendData = isMayData ? trendDataMay : trendDataApril;
  const centerLabel = isMayData ? "₹ 18,35,000" : "₹ 15,48,750";

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const kpiMetrics = [
    {
      label: "Total Sales (₹)",
      value: isMayData ? "₹ 18,35,000" : "₹ 15,48,750",
      change: isMayData ? "▲ 18.6% vs Apr 2026" : "▲ 12.4% vs Apr 2026",
      color: "bg-blue-50 text-blue-600",
      icon: ShoppingBag,
    },
    {
      label: "Invoices",
      value: isMayData ? "156" : "139",
      change: isMayData ? "▲ 12.5% vs Apr 2026" : "▲ 8.2% vs Apr 2026",
      color: "bg-emerald-50 text-emerald-600",
      icon: FileText,
    },
    {
      label: "New Customers",
      value: isMayData ? "32" : "28",
      change: isMayData ? "▲ 10.3% vs Apr 2026" : "▲ 9.1% vs Apr 2026",
      color: "bg-purple-50 text-purple-600",
      icon: Users,
    },
    {
      label: "Avg. Order Value (₹)",
      value: isMayData ? "₹ 11,762" : "₹ 11,142",
      change: isMayData ? "▲ 8.7% vs Apr 2026" : "▲ 5.4% vs Apr 2026",
      color: "bg-amber-50 text-amber-600",
      icon: ShoppingBag,
    },
    {
      label: "Returns (₹)",
      value: isMayData ? "₹ 97,350" : "₹ 1,03,950",
      change: isMayData ? "▼ -6.4% vs Apr 2026" : "▼ -2.1% vs Apr 2026",
      color: "bg-teal-50 text-teal-600",
      icon: ArrowDownRight,
      iconClass: "rotate-90",
    },
    {
      label: "Gross Profit (₹)",
      value: isMayData ? "₹ 6,48,250" : "₹ 5,58,600",
      change: isMayData ? "▲ 16.2% vs Apr 2026" : "▲ 11.5% vs Apr 2026",
      color: "bg-pink-50 text-pink-600",
      icon: Percent,
    },
  ];

  return (
    <Surface>

      {/* --- Page Header --- */}
      <DashboardHeader
        isStarred={isStarred}
        setIsStarred={setIsStarred}
        dateRange={dateRange}
        setDateRange={setDateRange}
        activeFilterBranch={activeFilterBranch}
        setActiveFilterBranch={setActiveFilterBranch}
      />

      {/* --- Row 1: KPI Cards --- */}
      <MetricsGrid items={kpiMetrics} />

      {/* --- Row 2: Charts & Highlights --- */}
      <ChartsRow
        trendData={currentTrendData}
        customerGroupData={customerGroupData}
        paymentMethodData={paymentMethodData}
        centerLabel={centerLabel}
        topCustomers={topCustomers}
        formatCurrency={formatCurrency}
      />

      {/* --- Row 3: Analytics, Invoices & Activity --- */}
      <AnalyticsRow comparisonData={comparisonData} />

    </Surface>
  );
}
