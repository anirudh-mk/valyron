import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  Users,
  Search,
  Filter,
  SlidersHorizontal,
  Settings2,
  ChevronDown,
  UserPlus,
  Upload,
  MoreHorizontal,
  Mail,
  Phone,
  Globe,
  User,
  MapPin,
  Briefcase,
  FileText,
  Calendar,
  Sparkles,
  Edit2,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  X,
  Plus,
  Activity
} from "lucide-react";

// --- Types ---
export interface Lead {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  score: number;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: string;
  ownerName: string;
  ownerInitials: string;
  createdOn: string;
  industry: string;
  employees: string;
  revenue: string;
  location: string;
  notes: string;
  tags: string[];
}

// --- Mock Data ---
const initialLeads: Lead[] = [
  {
    id: "glow-systems",
    name: "Glow Systems Pvt Ltd",
    company: "Glow Systems Pvt Ltd",
    contactPerson: "Rahul Sharma",
    email: "rahul@glowsys.com",
    phone: "+91 98765 43210",
    score: 85,
    status: "Contacted",
    source: "Website",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    createdOn: "31 May 2026",
    industry: "Information Technology",
    employees: "51 - 200",
    revenue: "₹ 25 Cr - ₹ 50 Cr",
    location: "Bangalore, Karnataka, India",
    notes: "Interested in our ERP solution for inventory and accounting management. Budget discussion in progress.",
    tags: ["ERP", "Inventory", "High Priority"],
  },
  {
    id: "technova",
    name: "TechNova Solutions",
    company: "TechNova Solutions",
    contactPerson: "Priya Nair",
    email: "priya@technova.com",
    phone: "+91 91234 56789",
    score: 78,
    status: "Qualified",
    source: "Referral",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    createdOn: "30 May 2026",
    industry: "E-Commerce",
    employees: "11 - 50",
    revenue: "₹ 5 Cr - ₹ 10 Cr",
    location: "Mumbai, Maharashtra, India",
    notes: "Requires mobile app integration. Highly qualified lead.",
    tags: ["Mobile", "E-Commerce"],
  },
  {
    id: "bright-retailers",
    name: "Bright Retailers",
    company: "Bright Retailers",
    contactPerson: "Amit Verma",
    email: "amit@brightretail.com",
    phone: "+91 99887 66554",
    score: 65,
    status: "New",
    source: "Advertisement",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    createdOn: "29 May 2026",
    industry: "Retail & Wholesale",
    employees: "201 - 500",
    revenue: "₹ 50 Cr - ₹ 100 Cr",
    location: "Delhi, India",
    notes: "Initial inquiry from print ad. Needs follow up.",
    tags: ["Retail", "Inquiry"],
  },
  {
    id: "urban-traders",
    name: "Urban Traders",
    company: "Urban Traders",
    contactPerson: "Sneha Iyer",
    email: "sneha@urbantraders.com",
    phone: "+91 98456 22110",
    score: 55,
    status: "New",
    source: "Website",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    createdOn: "28 May 2026",
    industry: "Logistics",
    employees: "1 - 10",
    revenue: "₹ 1 Cr - ₹ 5 Cr",
    location: "Chennai, Tamil Nadu",
    notes: "Wants pricing catalog for basic CRM module.",
    tags: ["CRM", "Logistics"],
  },
  {
    id: "global-goods",
    name: "Global Goods",
    company: "Global Goods",
    contactPerson: "Vivek Mehta",
    email: "vivek@globalgoods.com",
    phone: "+91 88890 11223",
    score: 45,
    status: "Contacted",
    source: "Cold Call",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    createdOn: "27 May 2026",
    industry: "Manufacturing",
    employees: "500+",
    revenue: "₹ 100 Cr+",
    location: "Ahmedabad, Gujarat",
    notes: "Cold call contact. Shared brochure. Decision maker out of town.",
    tags: ["Cold Call", "Manufacturing"],
  },
  {
    id: "prime-dist",
    name: "Prime Distributors",
    company: "Prime Distributors",
    contactPerson: "Deepak Singh",
    email: "deepak@primedist.com",
    phone: "+91 97333 44556",
    score: 80,
    status: "Qualified",
    source: "Existing Customer",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    createdOn: "25 May 2026",
    industry: "Distribution & Wholesale",
    employees: "51 - 200",
    revenue: "₹ 25 Cr - ₹ 50 Cr",
    location: "Pune, Maharashtra",
    notes: "Existing client requesting upgrade option details.",
    tags: ["Upgrade", "Wholesale"],
  },
  {
    id: "shree-agencies",
    name: "Shree Agencies",
    company: "Shree Agencies",
    contactPerson: "Manoj Kumar",
    email: "manoj@shreeagencies.in",
    phone: "+91 90001 23456",
    score: 60,
    status: "Contacted",
    source: "Referral",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    createdOn: "24 May 2026",
    industry: "Logistics",
    employees: "11 - 50",
    revenue: "₹ 5 Cr - ₹ 10 Cr",
    location: "Kochi, Kerala",
    notes: "Wants demonstration of delivery tracking setup.",
    tags: ["Logistics", "Demo Scheduled"],
  },
  {
    id: "cloud-infra",
    name: "Cloud Infra Pvt Ltd",
    company: "Cloud Infra Pvt Ltd",
    contactPerson: "Anjali Rao",
    email: "anjali@cloudinfra.com",
    phone: "+91 99123 33445",
    score: 70,
    status: "Qualified",
    source: "Website",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    createdOn: "23 May 2026",
    industry: "Information Technology",
    employees: "51 - 200",
    revenue: "₹ 10 Cr - ₹ 25 Cr",
    location: "Hyderabad, Telangana",
    notes: "Requesting API documentation. Technical assessment ongoing.",
    tags: ["API", "High Tech"],
  },
  {
    id: "nextgen-stores",
    name: "NextGen Stores",
    company: "NextGen Stores",
    contactPerson: "Kiran Patel",
    email: "kiran@nextgen.com",
    phone: "+91 97654 32211",
    score: 50,
    status: "New",
    source: "Social Media",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    createdOn: "22 May 2026",
    industry: "Retail & Wholesale",
    employees: "11 - 50",
    revenue: "₹ 5 Cr - ₹ 10 Cr",
    location: "Surat, Gujarat",
    notes: "Inquired via LinkedIn message. Shared demo video links.",
    tags: ["LinkedIn", "Retail"],
  },
  {
    id: "design-hub",
    name: "Design Hub",
    company: "Design Hub",
    contactPerson: "Vishal Menon",
    email: "vishal@designhub.co",
    phone: "+91 89212 77881",
    score: 40,
    status: "Lost",
    source: "Cold Call",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    createdOn: "20 May 2026",
    industry: "Design & Creative",
    employees: "1 - 10",
    revenue: "Less than ₹ 1 Cr",
    location: "Bangalore, Karnataka",
    notes: "Disqualified. Budget too low and currently not looking for ERP setup.",
    tags: ["Disqualified", "Low Budget"],
  },
];

export default function LeadsList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("glow-systems");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"overview" | "activities" | "notes" | "files">("overview");

  // Filter Logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "All" || lead.source === sourceFilter;
    
    let matchesScore = true;
    if (scoreFilter === "High (> 70)") {
      matchesScore = lead.score > 70;
    } else if (scoreFilter === "Medium (50-70)") {
      matchesScore = lead.score >= 50 && lead.score <= 70;
    } else if (scoreFilter === "Low (< 50)") {
      matchesScore = lead.score < 50;
    }

    return matchesSearch && matchesStatus && matchesSource && matchesScore;
  });

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 50) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-rose-100 text-rose-800 border-rose-200";
  };

  const getStatusBadgeColor = (status: Lead["status"]) => {
    switch (status) {
      case "New":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Contacted":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Qualified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Lost":
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads</h1>
            <span className="text-xs text-muted-foreground font-semibold px-2 py-0.5 bg-slate-100 rounded-full">
              {filteredLeads.length} of {leads.length} leads
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage and track your potential customers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs">
            <Upload className="h-3.5 w-3.5 text-slate-400" />
            Import Leads
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs"
            onClick={() => navigate("/dashboard/sales/leads/create")}
          >
            <Plus className="h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* --- KPI Cards Row --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Leads", count: 468, change: "▲ 18.6% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Users },
          { label: "New Leads", count: 126, change: "▲ 12.3% vs Apr 2026", color: "bg-purple-50 text-purple-600", icon: UserPlus },
          { label: "Contacted", count: 182, change: "▲ 9.8% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Phone },
          { label: "Qualified", count: 96, change: "▲ 15.7% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: User },
          { label: "Converted", count: 64, change: "▲ 11.4% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: Sparkles },
          { label: "Lost / Disqualified", count: 28, change: "▼ -6.3% vs Apr 2026", color: "bg-rose-50 text-rose-600", icon: X },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
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
              placeholder="Search leads by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost / Disqualified</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Source Dropdown */}
          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Score Dropdown */}
          <div className="relative">
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Lead Scores</option>
              <option value="High (> 70)">High (&gt; 70)</option>
              <option value="Medium (50-70)">Medium (50-70)</option>
              <option value="Low (< 50)">Low (&lt; 50)</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Datepicker Range Simulation */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-slate-50/50 hover:bg-white rounded-lg text-xs font-semibold text-slate-700 cursor-pointer">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Created: This Month</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Filter Toggle and Gear icons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-slate-200 text-slate-700 gap-1.5 font-semibold text-xs ${showFilters ? "border-blue-500 bg-blue-50" : "bg-white"}`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* --- Main Table Layout with Right Details Sidebar Panel --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Leads Table Card (Spans less if drawer is open) */}
        <Card className={`border-slate-100 transition-all duration-300 ${selectedLeadId ? "col-span-12 xl:col-span-8" : "col-span-12"}`}>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-w-0">
              <Table className="text-xs w-full">
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center py-2.5">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Lead Name</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Company</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Contact</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold text-center">Lead Score</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Source</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Owner</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Created On</TableHead>
                    <TableHead className="py-2.5 w-16 text-center" />
                  </TableRow>
                </TableHeader>
                <TableBody className="text-slate-600 font-medium">
                  {filteredLeads.map((lead) => {
                    const isSelected = selectedLeadId === lead.id;
                    return (
                      <TableRow
                        key={lead.id}
                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""}`}
                        onClick={() => setSelectedLeadId(isSelected ? null : lead.id)}
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5 font-bold text-blue-600 hover:underline">
                          {lead.name}
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-800">{lead.company}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5 text-slate-700">
                            <span>{lead.phone}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{lead.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-center">
                          <Badge variant="outline" className={`px-2 py-0.5 font-extrabold text-[10px] ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${getStatusBadgeColor(lead.status)}`}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-700">{lead.source}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
                                {lead.ownerInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-800 text-xs">{lead.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-400 font-semibold">{lead.createdOn}</TableCell>
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-200">
                            <MoreHorizontal className="h-4.5 w-4.5 text-slate-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-slate-400 font-medium">
                        No leads match your filter choices.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
              <span>Showing 1 to {filteredLeads.length} of {filteredLeads.length} leads</span>
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

        {/* --- Sliding Right-Side Details Drawer (Displays when a lead is selected) --- */}
        {selectedLeadId && selectedLead && (
          <Card className="col-span-12 xl:col-span-4 border-slate-100 border-l-2 shadow-lg sticky top-6 bg-white overflow-hidden max-h-[800px] flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{selectedLead.name}</h3>
                <div className="flex items-center gap-1.5">
                  <Badge className="bg-blue-100 text-blue-700 text-[10px] font-bold hover:bg-blue-100">
                    {selectedLead.status}
                  </Badge>
                  <Badge variant="outline" className={`text-[9px] font-bold ${getScoreColor(selectedLead.score)}`}>
                    Lead Score: {selectedLead.score}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-slate-400 hover:bg-slate-100" onClick={() => setSelectedLeadId(null)}>
                  <X className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>

            {/* Quick action button toolbar */}
            <div className="px-4 py-2 bg-slate-50/20 border-b border-slate-100 flex items-center gap-1.5 text-xs">
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white">
                <Edit2 className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Convert
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                Follow Up
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white ml-auto">
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
              </Button>
            </div>

            {/* Drawer Tabs Header */}
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

            {/* Drawer Content Body */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-5 text-xs text-slate-600 max-h-[580px]">
              
              {selectedTab === "overview" && (
                <>
                  {/* Lead Information */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Lead Information</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Lead Name</span>
                        <span className="font-bold text-slate-800">{selectedLead.contactPerson}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Company</span>
                        <span className="font-bold text-slate-800">{selectedLead.company}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Email</span>
                        <span className="font-semibold text-blue-600 hover:underline">{selectedLead.email}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Phone</span>
                        <span className="font-bold text-slate-800">{selectedLead.phone}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Website</span>
                        <span className="font-semibold text-blue-600 hover:underline">{selectedLead.email.split("@")[1]}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Source</span>
                        <span className="font-bold text-slate-800">{selectedLead.source}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Owner</span>
                        <span className="font-bold text-slate-800">{selectedLead.ownerName}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Created On</span>
                        <span className="font-bold text-slate-800">{selectedLead.createdOn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Details */}
                  <div className="flex flex-col gap-2.5 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Company Details</h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Industry</span>
                        <span className="font-bold text-slate-800">{selectedLead.industry}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Employees</span>
                        <span className="font-bold text-slate-800">{selectedLead.employees}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Annual Revenue</span>
                        <span className="font-bold text-slate-800 font-mono">{selectedLead.revenue}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Location</span>
                        <span className="font-bold text-slate-800">{selectedLead.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-2.5 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Notes</h4>
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 font-semibold text-slate-700 leading-relaxed">
                      {selectedLead.notes}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Tags</h4>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {selectedLead.tags.map((tag) => (
                        <Badge key={tag} className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200 font-semibold text-[10px] px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 ml-1">
                        + Add Tag
                      </button>
                    </div>
                  </div>
                </>
              )}

              {selectedTab === "activities" && (
                <div className="flex flex-col gap-4 text-center py-6 text-slate-400">
                  <Activity className="h-8 w-8 text-slate-300 mx-auto" />
                  <span>No activities logged yet for this lead.</span>
                  <Button variant="outline" size="sm" className="bg-white border-slate-200 font-bold self-center">
                    Log Activity
                  </Button>
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
                <div className="flex flex-col gap-4 text-center py-8 border border-dashed border-slate-200 rounded-lg bg-slate-50/50 justify-center">
                  <Upload className="h-8 w-8 text-slate-300 mx-auto" />
                  <div className="flex flex-col gap-1 text-[11px]">
                    <span className="font-bold text-slate-700">Drag files here to upload</span>
                    <span className="text-slate-400 font-semibold">Or click to browse from device</span>
                  </div>
                </div>
              )}

            </div>
          </Card>
        )}

      </div>

    </div>
  );
}
