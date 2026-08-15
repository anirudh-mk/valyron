import React, { useState, useRef, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import {
  Users,
  Search,
  ChevronDown,
  Upload,
  MoreHorizontal,
  X,
  Calendar,
  Briefcase,
  TrendingUp,
  Activity,
  Award,
  Wallet,
  Building,
  ArrowRight,
  Info,
  SlidersHorizontal,
  Settings2,
  Check
} from "lucide-react";

// --- Types ---
export interface PipelineOpportunity {
  id: string;
  name: string;
  accountName: string;
  stage: "New" | "Qualification" | "Proposal" | "Negotiation" | "Won" | "Lost";
  amount: number;
  probability: number;
  expectedClose: string;
  ownerName: string;
  ownerInitials: string;
  ownerBg: string;
  source: string;
}

// --- Columns Configuration ---
const COLUMNS: { id: PipelineOpportunity["stage"]; label: string; percentage: number; color: string; border: string }[] = [
  { id: "New", label: "New", percentage: 18, color: "bg-blue-600 text-blue-700", border: "border-t-blue-500 bg-blue-50/10" },
  { id: "Qualification", label: "Qualification", percentage: 15, color: "bg-cyan-500 text-cyan-700", border: "border-t-cyan-500 bg-cyan-50/10" },
  { id: "Proposal", label: "Proposal", percentage: 17, color: "bg-purple-500 text-purple-700", border: "border-t-purple-500 bg-purple-50/10" },
  { id: "Negotiation", label: "Negotiation", percentage: 22, color: "bg-amber-500 text-amber-700", border: "border-t-amber-500 bg-amber-50/10" },
  { id: "Won", label: "Won", percentage: 46, color: "bg-emerald-500 text-emerald-700", border: "border-t-emerald-500 bg-emerald-50/10" },
  { id: "Lost", label: "Lost", percentage: 13, color: "bg-rose-500 text-rose-700", border: "border-t-rose-500 bg-rose-50/10" },
];

// --- Initial Mock Data ---
const initialOpps: PipelineOpportunity[] = [
  // New
  { id: "opp-new-1", name: "Cloud Infra Setup", accountName: "Cloud Infra Pvt Ltd", stage: "New", amount: 1230000, probability: 10, expectedClose: "03 Jun 2026", ownerName: "Rahul Sharma", ownerInitials: "RS", ownerBg: "bg-purple-100 text-purple-700", source: "Website" },
  { id: "opp-new-2", name: "IT Hardware Supply", accountName: "Shree Agencies", stage: "New", amount: 1230000, probability: 10, expectedClose: "30 May 2026", ownerName: "Mike Johnson", ownerInitials: "MJ", ownerBg: "bg-amber-100 text-amber-700", source: "Cold Call" },
  { id: "opp-new-3", name: "Digital Marketing", accountName: "Design Hub", stage: "New", amount: 410000, probability: 10, expectedClose: "04 Jun 2026", ownerName: "Jane Smith", ownerInitials: "JS", ownerBg: "bg-teal-100 text-teal-700", source: "Social Media" },

  // Qualification
  { id: "opp-qual-1", name: "Retail Store Expansion", accountName: "Bright Retailers", stage: "Qualification", amount: 1890000, probability: 25, expectedClose: "05 Jun 2026", ownerName: "Rahul Sharma", ownerInitials: "RS", ownerBg: "bg-purple-100 text-purple-700", source: "Referral" },
  { id: "opp-qual-2", name: "Warehouse Solution", accountName: "Cloud Infra Pvt Ltd", stage: "Qualification", amount: 2650000, probability: 25, expectedClose: "08 Jun 2026", ownerName: "Arjun Jose", ownerInitials: "AJ", ownerBg: "bg-blue-100 text-blue-700", source: "Website" },
  { id: "opp-qual-3", name: "Website & Mobile App", accountName: "NextGen Stores", stage: "Qualification", amount: 720000, probability: 25, expectedClose: "25 May 2026", ownerName: "Mike Johnson", ownerInitials: "MJ", ownerBg: "bg-amber-100 text-amber-700", source: "Social Media" },

  // Proposal
  { id: "opp-prop-1", name: "Annual Supply Contract", accountName: "TechNova Solutions", stage: "Proposal", amount: 2240000, probability: 50, expectedClose: "10 Jun 2026", ownerName: "Jane Smith", ownerInitials: "JS", ownerBg: "bg-teal-100 text-teal-700", source: "Referral" },
  { id: "opp-prop-2", name: "Office Automation Setup", accountName: "Prime Distributors", stage: "Proposal", amount: 980000, probability: 50, expectedClose: "18 Jun 2026", ownerName: "Arjun Jose", ownerInitials: "AJ", ownerBg: "bg-blue-100 text-blue-700", source: "Website" },
  { id: "opp-prop-3", name: "Product Demo Project", accountName: "TechNova Solutions", stage: "Proposal", amount: 1550000, probability: 50, expectedClose: "31 May 2026", ownerName: "Jane Smith", ownerInitials: "JS", ownerBg: "bg-teal-100 text-teal-700", source: "Referral" },

  // Negotiation
  { id: "opp-neg-1", name: "ERP Implementation", accountName: "Glow Systems Pvt Ltd", stage: "Negotiation", amount: 2875000, probability: 75, expectedClose: "15 Jun 2026", ownerName: "Arjun Jose", ownerInitials: "AJ", ownerBg: "bg-blue-100 text-blue-700", source: "Website" },
  { id: "opp-neg-2", name: "Software Licensing Deal", accountName: "Global Goods", stage: "Negotiation", amount: 3100000, probability: 75, expectedClose: "12 Jun 2026", ownerName: "Rahul Sharma", ownerInitials: "RS", ownerBg: "bg-purple-100 text-purple-700", source: "Cold Call" },
  { id: "opp-neg-3", name: "Cloud Migration Project", accountName: "Urban Traders", stage: "Negotiation", amount: 1550000, probability: 75, expectedClose: "20 Jun 2026", ownerName: "Mike Johnson", ownerInitials: "MJ", ownerBg: "bg-amber-100 text-amber-700", source: "Advertisement" },

  // Won
  { id: "opp-won-1", name: "IT Infrastructure Upgrade", accountName: "Bright Retailers", stage: "Won", amount: 1850000, probability: 100, expectedClose: "28 May 2026", ownerName: "Rahul Sharma", ownerInitials: "RS", ownerBg: "bg-purple-100 text-purple-700", source: "Existing Customer" },
  { id: "opp-won-2", name: "Client Support System", accountName: "Global Goods", stage: "Won", amount: 975000, probability: 100, expectedClose: "26 May 2026", ownerName: "Mike Johnson", ownerInitials: "MJ", ownerBg: "bg-amber-100 text-amber-700", source: "Cold Call" },
  { id: "opp-won-3", name: "Storage Solution Supply", accountName: "Cloud Infra Pvt Ltd", stage: "Won", amount: 2260000, probability: 100, expectedClose: "25 May 2026", ownerName: "Arjun Jose", ownerInitials: "AJ", ownerBg: "bg-blue-100 text-blue-700", source: "Website" },

  // Lost
  { id: "opp-lost-1", name: "CRM Implementation", accountName: "Shree Agencies", stage: "Lost", amount: 850000, probability: 0, expectedClose: "29 May 2026", ownerName: "Jane Smith", ownerInitials: "JS", ownerBg: "bg-teal-100 text-teal-700", source: "Referral" },
  { id: "opp-lost-2", name: "SEO Services", accountName: "Design Hub", stage: "Lost", amount: 220000, probability: 0, expectedClose: "20 May 2026", ownerName: "Mike Johnson", ownerInitials: "MJ", ownerBg: "bg-amber-100 text-amber-700", source: "Social Media" },
  { id: "opp-lost-3", name: "Network Setup", accountName: "Urban Traders", stage: "Lost", amount: 740000, probability: 0, expectedClose: "18 May 2026", ownerName: "Rahul Sharma", ownerInitials: "RS", ownerBg: "bg-purple-100 text-purple-700", source: "Website" },
];

// --- Column Footer Static Metrics (Mocked remainder counts) ---
const colFooters: Record<PipelineOpportunity["stage"], { count: number; sum: number }> = {
  New: { count: 75, sum: 1650000 },
  Qualification: { count: 59, sum: 1005000 },
  Proposal: { count: 45, sum: 1560000 },
  Negotiation: { count: 33, sum: 2435000 },
  Won: { count: 83, sum: 6595000 },
  Lost: { count: 35, sum: 1400000 },
};

// --- Conversion Funnel Metric Data ---
const funnelRates = [
  { label: "New → Qualification", rate: 48.7, color: "bg-blue-600" },
  { label: "Qualification → Proposal", rate: 77.4, color: "bg-cyan-500" },
  { label: "Proposal → Negotiation", rate: 60.2, color: "bg-purple-500" },
  { label: "Negotiation → Won", rate: 58.3, color: "bg-emerald-500" },
];

export default function SalesPipeline() {
  const [opps, setOpps] = useState<PipelineOpportunity[]>(initialOpps);
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  // Filter states
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [territoryFilter, setTerritoryFilter] = useState("All");

  // Format currencies
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Drag & Drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedCardId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineOpportunity["stage"]) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain") || draggedCardId;
    if (!cardId) return;

    setOpps((prev) =>
      prev.map((opp) => {
        if (opp.id === cardId) {
          let probability = opp.probability;
          if (targetStage === "Won") probability = 100;
          else if (targetStage === "Lost") probability = 0;
          else if (opp.stage === "Won" || opp.stage === "Lost") {
            probability = targetStage === "New" ? 10 : targetStage === "Qualification" ? 25 : targetStage === "Proposal" ? 50 : 75;
          }
          return { ...opp, stage: targetStage, probability };
        }
        return opp;
      })
    );
    setDraggedCardId(null);
  };

  // Card Stage Direction Arrows
  const handleMoveStage = (id: string, currentStage: PipelineOpportunity["stage"], direction: "next" | "prev") => {
    const currentIndex = COLUMNS.findIndex((c) => c.id === currentStage);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= COLUMNS.length) return;

    const targetStage = COLUMNS[nextIndex].id;
    setOpps((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          let probability = opp.probability;
          if (targetStage === "Won") probability = 100;
          else if (targetStage === "Lost") probability = 0;
          else if (opp.stage === "Won" || opp.stage === "Lost") {
            probability = targetStage === "New" ? 10 : targetStage === "Qualification" ? 25 : targetStage === "Proposal" ? 50 : 75;
          }
          return { ...opp, stage: targetStage, probability };
        }
        return opp;
      })
    );
  };

  // Filters application
  const filteredOpps = useMemo(() => {
    return opps.filter((opp) => {
      const matchesSearch =
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.accountName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesOwner = ownerFilter === "All" || opp.ownerName === ownerFilter;
      const matchesSource = sourceFilter === "All" || opp.source === sourceFilter;
      
      return matchesSearch && matchesOwner && matchesSource;
    });
  }, [opps, searchTerm, ownerFilter, sourceFilter]);

  // Aggregate Metrics based on board cards + remainders
  const aggregateMetrics = useMemo(() => {
    let boardSum = 0;
    let weightedSum = 0;
    let cardCount = 0;
    
    // Sum active board cards
    filteredOpps.forEach((opp) => {
      boardSum += opp.amount;
      weightedSum += opp.amount * (opp.probability / 100);
      cardCount += 1;
    });

    // Sum static column remainders
    COLUMNS.forEach((col) => {
      const footer = colFooters[col.id];
      boardSum += footer.sum;
      weightedSum += footer.sum * (col.percentage / 100);
      cardCount += footer.count;
    });

    return {
      totalPipelineValue: boardSum,
      weightedPipelineValue: weightedSum,
      totalOpportunities: cardCount,
    };
  }, [filteredOpps]);

  // Top Owners Data Calculation
  const topOwnersList = useMemo(() => {
    const ownerTotals: Record<string, { value: number; initials: string; bg: string }> = {
      "Arjun Jose": { value: 7840000, initials: "AJ", bg: "bg-blue-100 text-blue-700" },
      "Rahul Sharma": { value: 5890000, initials: "RS", bg: "bg-purple-100 text-purple-700" },
      "Jane Smith": { value: 4230000, initials: "JS", bg: "bg-teal-100 text-teal-700" },
      "Mike Johnson": { value: 2860000, initials: "MJ", bg: "bg-amber-100 text-amber-700" },
      "Others": { value: 4055000, initials: "OT", bg: "bg-slate-100 text-slate-700" },
    };

    // Calculate dynamic changes from dragged cards
    // Reset baseline, we will sum based on actual owned cards in our dataset + mock offsets
    const ownedMap: Record<string, number> = {
      "Arjun Jose": 4850000,
      "Rahul Sharma": 3520000,
      "Jane Smith": 2130000,
      "Mike Johnson": 1540000,
      "Others": 3055000,
    };

    filteredOpps.forEach((opp) => {
      if (ownedMap[opp.ownerName] !== undefined) {
        ownedMap[opp.ownerName] += opp.amount;
      } else {
        ownedMap["Others"] += opp.amount;
      }
    });

    return Object.keys(ownerTotals).map((name) => ({
      name,
      value: ownedMap[name] || ownerTotals[name].value,
      initials: ownerTotals[name].initials,
      bg: ownerTotals[name].bg,
    })).sort((a, b) => b.value - a.value);
  }, [filteredOpps]);

  // Lower Donut Ring Calculation
  const donutData: { label: string; value: number; percentage: number; color: string }[] = useMemo(() => {
    return COLUMNS.map((col) => {
      const activeCards = filteredOpps.filter((o) => o.stage === col.id);
      const activeSum = activeCards.reduce((acc, curr) => acc + curr.amount, 0);
      const totalSum = activeSum + colFooters[col.id].sum;
      
      const pct = (totalSum / aggregateMetrics.totalPipelineValue) * 100;

      let color = "#2563eb";
      if (col.id === "New") color = "#2563eb";
      else if (col.id === "Qualification") color = "#06b6d4";
      else if (col.id === "Proposal") color = "#a855f7";
      else if (col.id === "Negotiation") color = "#f59e0b";
      else if (col.id === "Won") color = "#10b981";
      else if (col.id === "Lost") color = "#f43f5e";

      return {
        label: col.label,
        value: totalSum,
        percentage: pct,
        color,
      };
    });
  }, [filteredOpps, aggregateMetrics]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sales Pipeline</h1>
            <Info className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Visualize and manage your opportunities across all stages of the sales process.
          </p>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
              Pipeline View
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </Button>
          </div>
          
          <div className="relative">
            <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              This Month (01 May - 31 May 2026)
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- Row 1: KPI Cards --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Pipeline Value", count: formatCurrency(aggregateMetrics.totalPipelineValue), change: "▲ 22.4% vs Apr 2026", color: "bg-purple-50 text-purple-600", icon: Activity },
          { label: "Total Opportunities", count: aggregateMetrics.totalOpportunities, change: "▲ 18.6% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Briefcase },
          { label: "Weighted Pipeline Value", count: formatCurrency(aggregateMetrics.weightedPipelineValue), change: "▲ 20.1% vs Apr 2026", color: "bg-amber-50 text-amber-600", icon: Wallet },
          { label: "Conversion Rate", count: "26.9%", change: "▲ 3.2% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: Award },
          { label: "Avg. Deal Size", count: formatCurrency(Math.round(aggregateMetrics.totalPipelineValue / aggregateMetrics.totalOpportunities)), change: "▲ 6.7% vs Apr 2026", color: "bg-indigo-50 text-indigo-600", icon: TrendingUp },
          { label: "Expected Revenue (This Month)", count: "₹ 41,20,000", change: "▲ 15.8% vs Apr 2026", color: "bg-amber-50 text-amber-600", icon: Wallet },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-base font-extrabold text-slate-900 font-mono truncate max-w-[130px]">{kpi.count}</div>
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

      {/* --- Row 2: Controls & View Header --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Owners</option>
            <option value="Arjun Jose">Arjun Jose</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Mike Johnson">Mike Johnson</option>
            <option value="Rahul Sharma">Rahul Sharma</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
          </select>

          <select className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer">
            <option>Show Value: Expected</option>
            <option>Show Value: Total</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <select className="pl-3 pr-8 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs appearance-none font-semibold text-slate-700 cursor-pointer">
            <option>Group by: Stage</option>
          </select>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* --- Middle Section: Kanban Columns + Sidebar Panel Grid --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Kanban Board Columns (Spans left-center, 6 columns grid) */}
        <div className="col-span-12 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 select-none">
          {COLUMNS.map((col) => {
            const colOpps = filteredOpps.filter((opp) => opp.stage === col.id);
            const activeSum = colOpps.reduce((acc, curr) => acc + curr.amount, 0);
            
            const footerMetrics = colFooters[col.id];
            const columnTotalCount = colOpps.length + footerMetrics.count;
            const columnTotalSum = activeSum + footerMetrics.sum;

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`flex flex-col gap-3 rounded-xl border border-slate-200/50 p-2.5 min-h-[520px] transition-colors ${col.border}`}
              >
                {/* Column Title Card Header */}
                <div className="flex flex-col gap-0.5 border-b pb-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="truncate">{col.label}</span>
                    <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0">
                      {columnTotalCount}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono mt-0.5">
                    <span>{formatCurrency(columnTotalSum)}</span>
                    <span>({col.percentage}%)</span>
                  </div>
                </div>

                {/* Column Cards Lists */}
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-0.5 flex-1">
                  {colOpps.map((opp) => (
                    <div
                      key={opp.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, opp.id)}
                      className="bg-white border border-slate-200/80 rounded-lg p-2.5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing text-[11px]"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-slate-850 hover:text-blue-600 truncate leading-tight">
                          {opp.name}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold truncate">
                          {opp.accountName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 font-bold">
                        <span className="text-slate-900 font-mono">
                          {formatCurrency(opp.amount).replace("₹", "").trim()}
                        </span>
                        <Badge className={`text-[8px] font-extrabold px-1 py-0.2 rounded border ${
                          opp.stage === "Won"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : opp.stage === "Lost"
                            ? "bg-rose-50 text-rose-700 border-rose-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}>
                          {opp.stage === "Won" ? "Won" : opp.stage === "Lost" ? "Lost" : `${opp.probability}%`}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 font-semibold">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4.5 w-4.5 text-[8px] font-bold">
                            <div className={`w-full h-full flex items-center justify-center rounded-full ${opp.ownerBg} font-bold`}>
                              {opp.ownerInitials}
                            </div>
                          </Avatar>
                          <span className="text-[9px] text-slate-500 font-semibold">{opp.ownerName.split(" ")[0]}</span>
                        </div>
                        <span className="text-[8px]">{opp.expectedClose.split(" ").slice(0, 2).join(" ")}</span>
                      </div>

                      {/* Manual Arrow Stages movements */}
                      <div className="flex items-center justify-end gap-1 pt-1 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleMoveStage(opp.id, opp.stage, "prev")}
                          disabled={col.id === COLUMNS[0].id}
                          className="h-4 w-4 flex items-center justify-center rounded border border-slate-100 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          &larr;
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveStage(opp.id, opp.stage, "next")}
                          disabled={col.id === COLUMNS[COLUMNS.length - 1].id}
                          className="h-4 w-4 flex items-center justify-center rounded border border-slate-100 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          &rarr;
                        </button>
                      </div>

                    </div>
                  ))}

                  {colOpps.length === 0 && (
                    <div className="text-center py-6 text-[10px] text-slate-300 italic border border-dashed border-slate-200/50 rounded-lg select-none">
                      No cards
                    </div>
                  )}
                </div>

                {/* Column Footer metrics offsets */}
                <div className="border-t pt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold select-none">
                  <span>+ {footerMetrics.count} more</span>
                  <span className="font-mono">{formatCurrency(footerMetrics.sum).replace("₹", "").trim()}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Right Sidebar: Summary, Filters, and Owners */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Pipeline Summary Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pipeline Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Total Pipeline Value</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(aggregateMetrics.totalPipelineValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Weighted Pipeline Value</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(aggregateMetrics.weightedPipelineValue)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 mt-1">
                <span className="text-slate-400 font-semibold">Total Opportunities</span>
                <span className="font-bold text-slate-800 font-mono">{aggregateMetrics.totalOpportunities}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Open Opportunities</span>
                <span className="font-bold text-slate-800 font-mono">224</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-emerald-600">Won Opportunities</span>
                <span className="font-bold text-emerald-700 font-mono">86</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-rose-600">Lost Opportunities</span>
                <span className="font-bold text-rose-700 font-mono">38</span>
              </div>
            </CardContent>
          </Card>

          {/* Filters Form Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters</CardTitle>
              <button
                type="button"
                onClick={() => {
                  setOwnerFilter("All");
                  setSourceFilter("All");
                  setTerritoryFilter("All");
                }}
                className="text-[10px] font-bold text-blue-600 hover:underline"
              >
                Clear All
              </button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold">Date Range</span>
                <div className="flex items-center gap-2 p-2 border rounded-lg bg-slate-50 font-semibold text-slate-700 cursor-pointer">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>01 May 2026 - 31 May 2026</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold">Owners</span>
                <select
                  value={ownerFilter}
                  onChange={(e) => setOwnerFilter(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="All">All Owners</option>
                  <option value="Arjun Jose">Arjun Jose</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                  <option value="Rahul Sharma">Rahul Sharma</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold">Stages</span>
                <select className="p-2 border rounded-lg bg-white font-semibold text-slate-700 cursor-pointer focus:outline-none">
                  <option>All Stages</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold">Sources</span>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="All">All Sources</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-slate-500 font-semibold">Territory</span>
                <select
                  value={territoryFilter}
                  onChange={(e) => setTerritoryFilter(e.target.value)}
                  className="p-2 border rounded-lg bg-white font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="All">All Territories</option>
                  <option value="North">North India</option>
                  <option value="South">South India</option>
                  <option value="West">West India</option>
                </select>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full mt-1.5">
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Top Owners List */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Owners by Pipeline Value</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex flex-col gap-2.5">
                {topOwnersList.map((owner) => (
                  <div key={owner.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="h-6 w-6 text-[10px] shrink-0 font-bold">
                        <div className={`w-full h-full flex items-center justify-center rounded-full ${owner.bg} font-bold`}>
                          {owner.initials}
                        </div>
                      </Avatar>
                      <span className="font-semibold text-slate-700 truncate">{owner.name}</span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono whitespace-nowrap">
                      {formatCurrency(owner.value)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1 text-xs">
                <span className="font-bold text-slate-800">Total</span>
                <span className="font-extrabold text-slate-900 font-mono">{formatCurrency(aggregateMetrics.totalPipelineValue)}</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* --- Row 3: Bottom Analytics Cards Row (Donut, Line, and Funnel) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Card 1: Pipeline Value by Stage Donut Chart */}
        <Card className="border-slate-100 flex flex-col h-[340px]">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">Pipeline Value by Stage</CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                This Month
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
            <StageDonutChart
              data={donutData}
              centerLabel={formatCurrency(aggregateMetrics.totalPipelineValue)}
              centerSublabel="Total Pipeline"
            />
          </CardContent>
        </Card>

        {/* Analytics Card 2: Pipeline Trend Line Chart */}
        <Card className="border-slate-100 flex flex-col h-[340px]">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">Pipeline Trend (Weighted Value)</CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                This Month
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center overflow-hidden">
            <WeightedPipelineTrendChart />
          </CardContent>
        </Card>

        {/* Analytics Card 3: Conversion Rate Funnel Bars */}
        <Card className="border-slate-100 flex flex-col h-[340px]">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">Conversion Rate by Stage</CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
                This Month
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center gap-5 p-6 text-xs text-slate-600 font-semibold">
            {funnelRates.map((funnel) => (
              <div key={funnel.label} className="space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>{funnel.label}</span>
                  <span className="font-mono text-slate-900">{funnel.rate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${funnel.color}`}
                    style={{ width: `${funnel.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

// ----------------------------------------------------
// Auxiliary component: StageDonutChart (Custom SVG Ring)
// ----------------------------------------------------
interface DonutProps {
  data: { label: string; value: number; percentage: number; color: string }[];
  centerLabel: string;
  centerSublabel: string;
}

function StageDonutChart({ data, centerLabel, centerSublabel }: DonutProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Render donut ring slices
  let accumulatedPct = 0;
  const segments = data.map((d, index) => {
    // Slices ring must map to 100% space
    // Let's normalize data percentages to 100% total
    const sumPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0);
    const normalizedPct = sumPercentage > 0 ? (d.percentage / sumPercentage) * 100 : 0;

    const strokeLength = (normalizedPct / 100) * circumference;
    const strokeOffset = circumference - (accumulatedPct / 100) * circumference;
    accumulatedPct += normalizedPct;

    return {
      ...d,
      strokeLength,
      strokeOffset,
      index,
    };
  });

  return (
    <div className="flex items-center justify-between gap-4 h-full py-2">
      <div className="relative w-[130px] h-[130px] shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#f8fafc" strokeWidth={strokeWidth} />
          {segments.map((seg) => {
            const isHovered = hoveredIdx === seg.index;
            return (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${seg.strokeLength} ${circumference}`}
                strokeDashoffset={seg.strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(seg.index)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none px-2">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">
            {hoveredIdx !== null ? data[hoveredIdx].label : centerSublabel}
          </span>
          <span className="text-[11px] font-bold text-slate-900 font-mono mt-0.5 truncate max-w-[110px]">
            {hoveredIdx !== null ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(data[hoveredIdx].value) : centerLabel}
          </span>
          {hoveredIdx !== null && (
            <span className="text-[9px] font-extrabold text-slate-400">
              {data[hoveredIdx].percentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Legend Block */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[220px] text-[10px]">
        {data.map((item, index) => {
          const isHovered = hoveredIdx === index;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-between p-0.5 rounded transition-colors cursor-pointer ${isHovered ? "bg-accent/40 font-semibold" : ""}`}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate max-w-[80px] text-slate-500 font-medium">{item.label}</span>
              </div>
              <div className="text-right whitespace-nowrap shrink-0 text-slate-900 font-bold font-mono">
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(item.value).replace("₹", "").trim()}
                <span className="text-[9px] text-slate-400 font-medium ml-0.5">({item.percentage.toFixed(0)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Auxiliary component: WeightedPipelineTrendChart (SVG Spline)
// ----------------------------------------------------
function WeightedPipelineTrendChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<SVGSVGElement | null>(null);

  const points = [
    { label: "1 May", value: 3500000 },
    { label: "6 May", value: 6500000 },
    { label: "11 May", value: 9200000 },
    { label: "16 May", value: 8500000 },
    { label: "21 May", value: 12000000 },
    { label: "26 May", value: 14500000 },
    { label: "31 May", value: 17820000 },
  ];

  const width = 450;
  const height = 200;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 20000000; // 2C
  const minVal = 0;

  const getX = (index: number) => {
    return paddingLeft + (index / (points.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  const getBezierPath = () => {
    let d = `M ${getX(0)} ${getY(points[0].value)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(points[i].value);
      const x2 = getX(i + 1);
      const y2 = getY(points[i + 1].value);
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + (2 * (x2 - x1)) / 3;
      const cpY2 = y2;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return d;
  };

  const getAreaPath = () => {
    const linePath = getBezierPath();
    const startX = getX(0);
    const endX = getX(points.length - 1);
    const bottomY = paddingTop + chartHeight;
    return `${linePath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relativeX = clientX - (rect.width * paddingLeft) / width;
    const relativeChartWidth = (rect.width * chartWidth) / width;
    const pct = relativeX / relativeChartWidth;
    let idx = Math.round(pct * (points.length - 1));
    idx = Math.max(0, Math.min(points.length - 1, idx));
    setHoveredIdx(idx);
  };

  const formattedVal = (val: number) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center">
      <svg
        ref={containerRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Y Ticks */}
        {[0, 5000000, 10000000, 15000000, 20000000].map((val, i) => {
          const y = getY(val);
          const label = val === 0 ? "₹ 0" : val === 10000000 ? "₹ 1C" : val === 20000000 ? "₹ 2C" : `₹ ${val / 10000000}C`;
          return (
            <g key={i} className="opacity-30">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
              <text x={paddingLeft - 8} y={y + 3} textAnchor="end" className="text-[9px] font-bold fill-slate-400 font-mono">
                {label}
              </text>
            </g>
          );
        })}

        {/* X Ticks */}
        {points.map((pt, i) => {
          const x = getX(i);
          return (
            <text key={i} x={x} y={height - 8} textAnchor="middle" className="text-[9px] font-bold fill-slate-400">
              {pt.label.split(" ")[0]}
            </text>
          );
        })}

        {/* Area */}
        <path d={getAreaPath()} fill="url(#trendAreaGradient)" />

        {/* Spline Line */}
        <path d={getBezierPath()} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" />

        {/* Hover guides */}
        {hoveredIdx !== null && (
          <line x1={getX(hoveredIdx)} y1={paddingTop} x2={getX(hoveredIdx)} y2={paddingTop + chartHeight} stroke="#94a3b8" strokeWidth={1} strokeDasharray="2 2" />
        )}

        {/* Circle Dots */}
        {points.map((pt, i) => {
          const x = getX(i);
          const y = getY(pt.value);
          const isHovered = hoveredIdx === i;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isHovered ? 5 : 3.5}
              fill={isHovered ? "#2563eb" : "#ffffff"}
              stroke="#2563eb"
              strokeWidth={1.5}
              className="transition-all duration-150 cursor-pointer"
            />
          );
        })}
      </svg>

      {/* Floating Tooltip Box */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-20 bg-background/95 backdrop-blur-sm border shadow-md rounded-lg p-2 text-[10px] pointer-events-none flex flex-col gap-0.5 transition-all duration-150"
          style={{
            left: `${Math.min(width - 120, Math.max(10, (getX(hoveredIdx) / width) * 100 - 10))}%`,
            top: `${Math.min(height - 80, Math.max(10, (getY(points[hoveredIdx].value) / height) * 100 - 45))}%`,
          }}
        >
          <div className="font-bold border-b pb-0.5 text-slate-800">
            {points[hoveredIdx].label} 2026
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            <span className="text-slate-400 font-semibold">Value:</span>
            <span className="font-bold text-slate-900 font-mono">
              {formattedVal(points[hoveredIdx].value)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
