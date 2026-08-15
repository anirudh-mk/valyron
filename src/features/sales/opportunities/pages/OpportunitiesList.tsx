import React, { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  Briefcase,
  Search,
  ChevronDown,
  Upload,
  MoreHorizontal,
  X,
  User,
  Calendar,
  Sparkles,
  Edit2,
  Phone,
  Info,
  TrendingUp,
  MapPin,
  Tag,
  DollarSign,
  Package,
  Plus,
  SlidersHorizontal,
  Settings2,
  Check,
  FileText
} from "lucide-react";

// --- Types ---
export interface Opportunity {
  id: string;
  name: string;
  description: string;
  accountName: string;
  stage: "Qualification" | "Proposal/Price Quote" | "Negotiation/Review" | "Closed Won" | "Closed Lost";
  amount: number;
  probability: number; // e.g. 75
  expectedClose: string;
  ownerName: string;
  ownerInitials: string;
  status: "Open" | "Won" | "Lost";
  source: string;
  createdOn: string;
  lastUpdated: string;
  products: { name: string; qty: number; value: number }[];
}

// --- Mock Data ---
const initialOpportunities: Opportunity[] = [
  {
    id: "office-furniture",
    name: "Office Furniture Supply",
    description: "Supply of office furniture",
    accountName: "Glow Systems Pvt Ltd",
    stage: "Proposal/Price Quote",
    amount: 1240000,
    probability: 75,
    expectedClose: "31 May 2026",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Open",
    source: "Website",
    createdOn: "20 May 2026, 11:20 AM",
    lastUpdated: "20 May 2026, 02:15 PM",
    products: [
      { name: "Modular Office Table", qty: 10, value: 700000 },
      { name: "Ergonomic Office Chair", qty: 10, value: 540000 },
    ],
  },
  {
    id: "erp-implementation",
    name: "ERP Implementation",
    description: "ERP software implementation",
    accountName: "TechNova Solutions",
    stage: "Negotiation/Review",
    amount: 4560000,
    probability: 60,
    expectedClose: "30 May 2026",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Open",
    source: "Referral",
    createdOn: "18 May 2026, 09:00 AM",
    lastUpdated: "22 May 2026, 04:30 PM",
    products: [
      { name: "Valyron Enterprise License", qty: 1, value: 3500000 },
      { name: "Consulting & Support", qty: 1, value: 1060000 },
    ],
  },
  {
    id: "led-lighting",
    name: "LED Lighting Project",
    description: "Warehouse LED lighting",
    accountName: "Bright Retailers",
    stage: "Qualification",
    amount: 875000,
    probability: 30,
    expectedClose: "28 May 2026",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    status: "Open",
    source: "Advertisement",
    createdOn: "19 May 2026, 02:00 PM",
    lastUpdated: "20 May 2026, 10:10 AM",
    products: [{ name: "Industrial LED Fixture", qty: 50, value: 875000 }],
  },
  {
    id: "annual-amc",
    name: "Annual AMC Contract",
    description: "AMC for HVAC systems",
    accountName: "Urban Traders",
    stage: "Proposal/Price Quote",
    amount: 630000,
    probability: 70,
    expectedClose: "27 May 2026",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Open",
    source: "Website",
    createdOn: "15 May 2026, 11:30 AM",
    lastUpdated: "17 May 2026, 01:20 PM",
    products: [{ name: "HVAC Annual Maintenance", qty: 1, value: 630000 }],
  },
  {
    id: "new-store",
    name: "New Store Setup",
    description: "Complete store setup",
    accountName: "Global Goods",
    stage: "Negotiation/Review",
    amount: 2500000,
    probability: 50,
    expectedClose: "27 May 2026",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    status: "Open",
    source: "Cold Call",
    createdOn: "12 May 2026, 10:00 AM",
    lastUpdated: "25 May 2026, 03:00 PM",
    products: [
      { name: "POS Billing Terminal", qty: 4, value: 1200000 },
      { name: "Barcode Scanner & Printer", qty: 4, value: 1300000 },
    ],
  },
  {
    id: "it-hardware",
    name: "IT Hardware Purchase",
    description: "Laptops & accessories",
    accountName: "Prime Distributors",
    stage: "Closed Won",
    amount: 980000,
    probability: 100,
    expectedClose: "24 May 2026",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Won",
    source: "Existing Customer",
    createdOn: "10 May 2026, 11:00 AM",
    lastUpdated: "24 May 2026, 05:00 PM",
    products: [
      { name: "Developer Laptop i7", qty: 10, value: 900000 },
      { name: "Monitor & Accessories Set", qty: 10, value: 80000 },
    ],
  },
  {
    id: "cloud-migration",
    name: "Cloud Migration Project",
    description: "Migration to AWS cloud",
    accountName: "Cloud Infra Pvt Ltd",
    stage: "Qualification",
    amount: 1820000,
    probability: 25,
    expectedClose: "23 May 2026",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    status: "Open",
    source: "Website",
    createdOn: "14 May 2026, 09:30 AM",
    lastUpdated: "14 May 2026, 09:30 AM",
    products: [{ name: "AWS Migration Consulting", qty: 1, value: 1820000 }],
  },
  {
    id: "website-redesign",
    name: "Website Redesign",
    description: "New corporate website",
    accountName: "NextGen Stores",
    stage: "Proposal/Price Quote",
    amount: 340000,
    probability: 65,
    expectedClose: "22 May 2026",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    status: "Open",
    source: "Social Media",
    createdOn: "08 May 2026, 11:00 AM",
    lastUpdated: "15 May 2026, 02:40 PM",
    products: [{ name: "Corporate Website UI/UX", qty: 1, value: 340000 }],
  },
  {
    id: "security-system",
    name: "Security System Setup",
    description: "CCTV & access control",
    accountName: "Design Hub",
    stage: "Closed Lost",
    amount: 215000,
    probability: 0,
    expectedClose: "21 May 2026",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Lost",
    source: "Cold Call",
    createdOn: "05 May 2026, 03:00 PM",
    lastUpdated: "21 May 2026, 11:00 AM",
    products: [{ name: "Security Camera & DVR Set", qty: 1, value: 215000 }],
  },
];

export default function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [selectedOppId, setSelectedOppId] = useState<string | null>("office-furniture");
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [selectedTab, setSelectedTab] = useState<"overview" | "activities" | "notes" | "files">("overview");

  // Filtering opportunities
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === "All" || opp.stage === stageFilter;
    const matchesStatus = statusFilter === "All" || opp.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || opp.ownerName === ownerFilter;
    const matchesSource = sourceFilter === "All" || opp.source === sourceFilter;

    return matchesSearch && matchesStage && matchesStatus && matchesOwner && matchesSource;
  });

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0];

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStageBadgeColor = (stage: Opportunity["stage"]) => {
    switch (stage) {
      case "Qualification":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Proposal/Price Quote":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Negotiation/Review":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Closed Won":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Closed Lost":
        return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  const getStatusColor = (status: Opportunity["status"]) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Won":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-bold";
      case "Lost":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100 font-bold";
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 75) return "bg-emerald-500";
    if (prob >= 50) return "bg-amber-500";
    if (prob > 0) return "bg-purple-500";
    return "bg-slate-300";
  };

  // Pipeline stepper indicators
  const stagesList = ["Qualification", "Proposal/Quote", "Negotiation", "Closed"];
  const currentStageIndex = selectedOpp ? (
    selectedOpp.stage === "Qualification" ? 0 :
    selectedOpp.stage === "Proposal/Price Quote" ? 1 :
    selectedOpp.stage === "Negotiation/Review" ? 2 : 3
  ) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Opportunities</h1>
            <span className="text-xs text-muted-foreground font-semibold px-2 py-0.5 bg-slate-100 rounded-full">
              {filteredOpps.length} of {opportunities.length} opportunities
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Track and manage your sales opportunities from pipeline to win.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            Import Opportunities
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs">
            <Plus className="h-4 w-4" />
            New Opportunity
            <ChevronDown className="h-3.5 w-3.5 border-l border-blue-500 pl-1.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* --- KPI Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Opportunities", count: 184, change: "▲ 16.8% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Briefcase },
          { label: "Open Opportunities", count: 132, change: "▲ 14.6% vs Apr 2026", color: "bg-amber-50 text-amber-600", icon: Info },
          { label: "Won Opportunities", count: 34, change: "▲ 10.3% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: Check },
          { label: "Lost Opportunities", count: 18, change: "▼ -5.2% vs Apr 2026", color: "bg-rose-50 text-rose-600", icon: X },
          { label: "Expected Revenue", count: "₹ 2,48,75,000", change: "▲ 18.7% vs Apr 2026", color: "bg-purple-50 text-purple-600", icon: TrendingUp },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-lg font-extrabold text-slate-900 font-mono">{kpi.count}</div>
                <div className={`text-[10px] font-bold ${kpi.change.startsWith("▲") ? "text-emerald-600" : "text-rose-600"}`}>
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

      {/* --- Filter / Controls Bar --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Stage Dropdown */}
          <div className="relative">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Stages</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal/Price Quote">Proposal/Quote</option>
              <option value="Negotiation/Review">Negotiation/Review</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Owner Dropdown */}
          <div className="relative">
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Owners</option>
              <option value="Arjun Jose">Arjun Jose</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Rahul Sharma">Rahul Sharma</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Date Picker Close Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-slate-50/50 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 cursor-pointer">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Expected Close: This Month</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Buttons right */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 gap-1.5 font-semibold text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* --- Main Table Layout with Right Drawer --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Table View */}
        <Card className={`border-slate-100 transition-all duration-300 ${selectedOppId ? "col-span-12 xl:col-span-8" : "col-span-12"}`}>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-w-0">
              <Table className="text-xs w-full">
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center py-2.5">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Opportunity Name</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Account Name</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Stage</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold text-right">Amount (₹)</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Probability</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Expected Close</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Owner</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                    <TableHead className="py-2.5 w-16 text-center" />
                  </TableRow>
                </TableHeader>
                <TableBody className="text-slate-600 font-medium">
                  {filteredOpps.map((opp) => {
                    const isSelected = selectedOppId === opp.id;
                    return (
                      <TableRow
                        key={opp.id}
                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""}`}
                        onClick={() => setSelectedOppId(isSelected ? null : opp.id)}
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-blue-600 hover:underline">{opp.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{opp.description}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-800">{opp.accountName}</TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold ${getStageBadgeColor(opp.stage)}`}>
                            {opp.stage}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                          {formatCurrency(opp.amount).replace("₹", "").trim()}
                        </TableCell>
                        <TableCell className="py-3.5 w-32">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 font-mono w-8 shrink-0">{opp.probability}%</span>
                            <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getProbabilityColor(opp.probability)}`}
                                style={{ width: `${opp.probability}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-700 font-semibold">{opp.expectedClose}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
                                {opp.ownerInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-855 text-xs">{opp.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge className={`px-2 py-0.5 text-[9px] font-bold ${getStatusColor(opp.status)}`}>
                            {opp.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-200">
                            <MoreHorizontal className="h-4.5 w-4.5 text-slate-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
              <span>Showing 1 to {filteredOpps.length} of {filteredOpps.length} opportunities</span>
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
                  <option>50 / page</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Drawer Opportunity Details Right Panel --- */}
        {selectedOppId && selectedOpp && (
          <Card className="col-span-12 xl:col-span-4 border-slate-100 border-l-2 shadow-lg sticky top-6 bg-white overflow-hidden max-h-[800px] flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{selectedOpp.name}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold hover:underline cursor-pointer">{selectedOpp.accountName}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[10px] text-blue-600 hover:underline cursor-pointer font-bold">View Account</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-slate-400 hover:bg-slate-100" onClick={() => setSelectedOppId(null)}>
                <X className="h-4.5 w-4.5" />
              </Button>
            </div>

            {/* Stage Tags Toolbar */}
            <div className="px-4 py-2 bg-slate-50/20 border-b border-slate-100 flex items-center gap-2">
              <Badge className={`px-2 py-0.5 text-[9px] font-bold ${getStatusColor(selectedOpp.status)}`}>
                {selectedOpp.status}
              </Badge>
              <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold ${getStageBadgeColor(selectedOpp.stage)}`}>
                {selectedOpp.stage}
              </Badge>
            </div>

            {/* Tabs Header */}
            <div className="border-b border-slate-100 flex text-xs font-bold text-slate-500 bg-slate-50/20">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "activities", label: "Activities", icon: FileText },
                { id: "notes", label: "Notes", icon: Edit2 },
                { id: "files", label: "Files", icon: Upload },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex-1 py-2.5 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${selectedTab === tab.id ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:bg-slate-50/50 hover:text-slate-700"}`}
                >
                  <tab.icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable details panel */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-5 text-xs text-slate-600 max-h-[550px]">
              
              {selectedTab === "overview" && (
                <>
                  {/* Opportunity Summary */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Opportunity Summary</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Amount</span>
                        <span className="font-bold text-slate-800 font-mono">{formatCurrency(selectedOpp.amount)}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Probability</span>
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <span>{selectedOpp.probability}%</span>
                          <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: `${selectedOpp.probability}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Expected Revenue</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {formatCurrency(Math.round(selectedOpp.amount * (selectedOpp.probability / 100)))}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Expected Close Date</span>
                        <span className="font-bold text-slate-800">{selectedOpp.expectedClose}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Sales Stage</span>
                        <span className="font-bold text-slate-800">{selectedOpp.stage}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Owner</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4.5 w-4.5 text-[8px] font-bold shrink-0">
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-full">
                              {selectedOpp.ownerInitials}
                            </div>
                          </Avatar>
                          <span className="font-bold text-slate-800">{selectedOpp.ownerName}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Lead Source</span>
                        <span className="font-bold text-slate-800">{selectedOpp.source}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Created On</span>
                        <span className="font-bold text-slate-800">{selectedOpp.createdOn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage Pipeline Progress */}
                  <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Stage Pipeline</h4>
                    
                    {/* Visual Stepper */}
                    <div className="relative flex items-center justify-between w-full px-1.5 py-2">
                      {/* Connection bar background */}
                      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10" />
                      
                      {stagesList.map((stage, idx) => {
                        const isDone = idx < currentStageIndex;
                        const isActive = idx === currentStageIndex;
                        return (
                          <div key={stage} className="flex flex-col items-center gap-1.5 relative">
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold text-[10px] transition-all duration-300 ${
                                isDone
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : isActive
                                  ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100"
                                  : "bg-white border-slate-200 text-slate-400"
                              }`}
                            >
                              {isDone ? <Check className="h-3 w-3 stroke-[3]" /> : idx + 1}
                            </div>
                            <span className={`text-[9px] font-bold select-none whitespace-nowrap absolute top-7 ${
                              isActive ? "text-blue-600 font-bold" : "text-slate-400"
                            }`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 text-blue-800 font-semibold p-2.5 rounded-lg text-center mt-6">
                      The opportunity is in {selectedOpp.stage} stage.
                    </div>
                  </div>

                  {/* Products Grid list */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Products ({selectedOpp.products.length})</h4>
                      <button className="text-[10px] font-bold text-blue-600 hover:underline">View All Products →</button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {selectedOpp.products.map((prod, idx) => (
                        <div key={idx} className="flex items-center justify-between border border-slate-100 bg-slate-50/50 p-2.5 rounded-lg">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800">{prod.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{prod.qty} Nos</span>
                          </div>
                          <span className="font-bold text-slate-900 font-mono">{formatCurrency(prod.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedTab === "activities" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  Activities list for this opportunity will load here.
                </div>
              )}

              {selectedTab === "notes" && (
                <div className="flex flex-col gap-3">
                  <div className="font-bold text-slate-800 mb-1">Add a quick note</div>
                  <textarea
                    placeholder="Type details here..."
                    className="w-full min-h-[80px] p-2 border rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold self-end text-xs">
                    Save Note
                  </Button>
                </div>
              )}

              {selectedTab === "files" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  Attachments and quotes documents appear here.
                </div>
              )}

            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 font-bold text-xs flex-1 text-slate-700">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-slate-200 font-bold text-xs flex-1 text-slate-700">
                Convert to Quotation
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex-1">
                Follow Up
              </Button>
            </div>

          </Card>
        )}

      </div>

    </div>
  );
}
