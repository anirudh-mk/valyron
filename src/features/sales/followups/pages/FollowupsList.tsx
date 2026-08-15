import React, { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  Phone,
  Calendar,
  X,
  ChevronDown,
  Upload,
  MoreHorizontal,
  Mail,
  Plus,
  SlidersHorizontal,
  Settings2,
  Video,
  FileText,
  User,
  History,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Clock3,
  Search,
  Check
} from "lucide-react";

// --- Types ---
export interface Followup {
  id: string;
  subject: string;
  description: string;
  relatedName: string;
  relatedType: "Lead" | "Opportunity";
  relatedId: string;
  type: "Phone Call" | "Meeting" | "Email" | "Task";
  scheduledTime: string;
  ownerName: string;
  ownerInitials: string;
  status: "Upcoming" | "Overdue" | "Completed";
  priority: "High" | "Medium" | "Low";
  duration: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  reminder: string;
  nextFollowupDate?: string;
  nextFollowupType?: string;
  historyLogs: { action: string; date: string; user: string }[];
}

// --- Mock Data ---
const initialFollowups: Followup[] = [
  {
    id: "call-rahul",
    subject: "Call with Rahul Sharma",
    description: "Discussed ERP requirements and current processes. Client is interested in inventory and accounting modules.",
    relatedName: "Glow Systems Pvt Ltd",
    relatedType: "Lead",
    relatedId: "glow-systems",
    type: "Phone Call",
    scheduledTime: "31 May 2026, 10:30 AM",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Upcoming",
    priority: "High",
    duration: "30 mins",
    contactPerson: "Rahul Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "rahul@glowsys.com",
    reminder: "15 minutes before",
    nextFollowupDate: "02 Jun 2026, 11:00 AM",
    nextFollowupType: "Follow-up Call",
    historyLogs: [
      { action: "Contacted on 28 May 2026", date: "28 May 2026", user: "Arjun Jose" },
      { action: "Meeting on 24 May 2026", date: "24 May 2026", user: "Jane Smith" },
      { action: "Email sent on 20 May 2026", date: "20 May 2026", user: "Mike Johnson" },
    ],
  },
  {
    id: "product-demo",
    subject: "Product Demo",
    description: "Demo of ERP features for wholesale distributors.",
    relatedName: "TechNova Solutions",
    relatedType: "Opportunity",
    relatedId: "erp-implementation",
    type: "Meeting",
    scheduledTime: "31 May 2026, 02:00 PM",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Upcoming",
    priority: "Medium",
    duration: "1 hr",
    contactPerson: "Priya Nair",
    contactPhone: "+91 91234 56789",
    contactEmail: "priya@technova.com",
    reminder: "30 minutes before",
    historyLogs: [
      { action: "Email sent on 29 May 2026", date: "29 May 2026", user: "Jane Smith" },
    ],
  },
  {
    id: "proposal-follow",
    subject: "Follow up Call",
    description: "Follow up on the lighting contract proposal sent last week.",
    relatedName: "Bright Retailers",
    relatedType: "Lead",
    relatedId: "bright-retailers",
    type: "Phone Call",
    scheduledTime: "01 Jun 2026, 11:00 AM",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    status: "Overdue",
    priority: "Medium",
    duration: "15 mins",
    contactPerson: "Amit Verma",
    contactPhone: "+91 99887 66554",
    contactEmail: "amit@brightretail.com",
    reminder: "10 minutes before",
    historyLogs: [],
  },
  {
    id: "send-quotation",
    subject: "Send Quotation",
    description: "Prepare and email the final revised AMC quote.",
    relatedName: "Urban Traders",
    relatedType: "Opportunity",
    relatedId: "annual-amc",
    type: "Email",
    scheduledTime: "01 Jun 2026, 04:30 PM",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    status: "Upcoming",
    priority: "Low",
    duration: "20 mins",
    contactPerson: "Sneha Iyer",
    contactPhone: "+91 98456 22110",
    contactEmail: "sneha@urbantraders.com",
    reminder: "15 minutes before",
    historyLogs: [],
  },
  {
    id: "site-visit",
    subject: "Site Visit",
    description: "Inspect warehouse layout for CCTV cabling.",
    relatedName: "Global Goods",
    relatedType: "Lead",
    relatedId: "global-goods",
    type: "Task",
    scheduledTime: "02 Jun 2026, 10:00 AM",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Upcoming",
    priority: "High",
    duration: "2 hrs",
    contactPerson: "Vivek Mehta",
    contactPhone: "+91 88890 11223",
    contactEmail: "vivek@globalgoods.com",
    reminder: "1 hour before",
    historyLogs: [],
  },
  {
    id: "req-disc",
    subject: "Requirement Discussion",
    description: "Detailed discussion on customized modules for hardware supply chain.",
    relatedName: "Prime Distributors",
    relatedType: "Opportunity",
    relatedId: "it-hardware",
    type: "Meeting",
    scheduledTime: "02 Jun 2026, 03:00 PM",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Completed",
    priority: "Medium",
    duration: "45 mins",
    contactPerson: "Deepak Singh",
    contactPhone: "+91 97333 44556",
    contactEmail: "deepak@primedist.com",
    reminder: "15 minutes before",
    historyLogs: [
      { action: "Completed meeting on 02 Jun 2026", date: "02 Jun 2026", user: "Jane Smith" },
    ],
  },
];

export default function FollowupsList() {
  const [followups, setFollowups] = useState<Followup[]>(initialFollowups);
  const [selectedFollowupId, setSelectedFollowupId] = useState<string | null>("call-rahul");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"All" | "Lead" | "Opportunity">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [detailsTab, setDetailsTab] = useState<"details" | "notes" | "attachments" | "history">("details");

  // Filtering Logic
  const filteredFollowups = followups.filter((f) => {
    const matchesCategory = activeCategoryTab === "All" || f.relatedType === activeCategoryTab;
    const matchesSearch =
      f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.relatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || f.type === typeFilter;
    const matchesStatus = statusFilter === "All" || f.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || f.ownerName === ownerFilter;

    return matchesCategory && matchesSearch && matchesType && matchesStatus && matchesOwner;
  });

  const selectedFollowup = followups.find((f) => f.id === selectedFollowupId) || followups[0];

  const getTypeColorBadge = (type: Followup["type"]) => {
    switch (type) {
      case "Phone Call":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Meeting":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Email":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "Task":
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  const getStatusColor = (status: Followup["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Overdue":
        return "bg-rose-100 text-rose-800 border-rose-200 font-bold";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const getPriorityColor = (priority: Followup["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Low":
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getIcon = (type: Followup["type"]) => {
    switch (type) {
      case "Phone Call":
        return Phone;
      case "Meeting":
        return Video;
      case "Email":
        return Mail;
      case "Task":
        return FileText;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Follow-ups</h1>
            <span className="text-xs text-muted-foreground font-semibold px-2 py-0.5 bg-slate-100 rounded-full">
              {filteredFollowups.length} of {followups.length} follow-ups
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Stay on top of your leads and opportunities by following up at the right time.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            Log Follow-up
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            Follow-up Plan
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs">
            <Plus className="h-4 w-4" />
            New Follow-up
            <ChevronDown className="h-3.5 w-3.5 border-l border-blue-500 pl-1.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* --- KPI Cards Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Follow-ups", count: 642, change: "▲ 18.6% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Clock },
          { label: "Due Today", count: 28, change: "View today's list →", color: "bg-amber-50 text-amber-600", icon: Calendar, actionable: true },
          { label: "Due This Week", count: 84, change: "View this week's list →", color: "bg-blue-50 text-blue-600", icon: Calendar, actionable: true },
          { label: "Overdue", count: 41, change: "View overdue list →", color: "bg-rose-50 text-rose-600", icon: AlertTriangle, actionable: true },
          { label: "Completed (This Month)", count: 312, change: "▲ 22.1% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
        ].map((kpi, idx) => (
          <Card key={idx} className="border-slate-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
                <div className={`text-[10px] font-bold ${kpi.actionable ? "text-blue-600 hover:underline cursor-pointer" : kpi.change.startsWith("▲") ? "text-emerald-600" : "text-rose-600"}`}>
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

      {/* --- Filter Tabs Header --- */}
      <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2">
        {["All Follow-ups", "Lead Follow-ups", "Opportunity Follow-ups"].map((label) => {
          const typeVal = label.startsWith("Lead") ? "Lead" : label.startsWith("Opportunity") ? "Opportunity" : "All";
          const isActive = activeCategoryTab === typeVal;
          return (
            <button
              key={label}
              onClick={() => setActiveCategoryTab(typeVal)}
              className={`py-2 px-4 border-b-2 font-semibold transition-colors ${isActive ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* --- Filters Control Bar --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search follow-ups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Email">Email</option>
              <option value="Task">Task</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50/50 border border-slate-200 rounded-lg text-xs appearance-none font-semibold text-slate-700 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Owner Filter */}
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
            <span>This Month</span>
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
        <Card className={`border-slate-100 transition-all duration-300 ${selectedFollowupId ? "col-span-12 xl:col-span-8" : "col-span-12"}`}>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-w-0">
              <Table className="text-xs w-full">
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center py-2.5">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Follow-up</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Related To</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Type</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Scheduled Date &amp; Time</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Owner</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Priority</TableHead>
                    <TableHead className="py-2.5 w-16 text-center" />
                  </TableRow>
                </TableHeader>
                <TableBody className="text-slate-600 font-medium">
                  {filteredFollowups.map((f) => {
                    const isSelected = selectedFollowupId === f.id;
                    const IconComp = getIcon(f.type);
                    return (
                      <TableRow
                        key={f.id}
                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""}`}
                        onClick={() => setSelectedFollowupId(isSelected ? null : f.id)}
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800">{f.subject}</span>
                            <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[200px]">
                              {f.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-700">{f.relatedName}</span>
                            <Badge variant="outline" className="w-fit text-[9px] font-semibold tracking-wide py-0 px-1 bg-slate-50 text-slate-500">
                              {f.relatedType}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 gap-1 text-[10px] font-bold ${getTypeColorBadge(f.type)}`}>
                            {IconComp && <IconComp className="h-3 w-3 inline-block" />}
                            {f.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5 font-bold">
                            <span className="text-slate-800">{f.scheduledTime.split(",")[0]}</span>
                            <span className={`text-[10px] ${f.status === "Overdue" ? "text-rose-600" : "text-blue-600"}`}>
                              {f.scheduledTime.split(",")[1]?.trim()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
                                {f.ownerInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-800 text-xs">{f.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(f.status)}`}>
                            {f.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge className={`px-2 py-0.5 text-[9px] font-bold border ${getPriorityColor(f.priority)}`}>
                            {f.priority}
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
              <span>Showing 1 to {filteredFollowups.length} of {filteredFollowups.length} follow-ups</span>
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

        {/* --- Drawer Follow-up Details Right Panel --- */}
        {selectedFollowupId && selectedFollowup && (
          <Card className="col-span-12 xl:col-span-4 border-slate-100 border-l-2 shadow-lg sticky top-6 bg-white overflow-hidden max-h-[800px] flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{selectedFollowup.subject}</h3>
                <div className="flex items-center gap-1.5">
                  <Badge className={`px-2 py-0 px-1 bg-amber-50 text-amber-700 border-amber-100 font-bold hover:bg-amber-50 text-[10px]`}>
                    {selectedFollowup.status}
                  </Badge>
                  <Badge className={`px-2 py-0 px-1 font-bold text-[10px] ${getPriorityColor(selectedFollowup.priority)}`}>
                    {selectedFollowup.priority} Priority
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-slate-400 hover:bg-slate-100" onClick={() => setSelectedFollowupId(null)}>
                <X className="h-4.5 w-4.5" />
              </Button>
            </div>

            {/* Related Entity Block */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Related To:</span>
                <span className="font-bold text-slate-800">{selectedFollowup.relatedName}</span>
                <Badge variant="outline" className="text-[9px] py-0 px-1 bg-slate-100 text-slate-600">
                  {selectedFollowup.relatedType}
                </Badge>
              </div>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">View</button>
            </div>

            {/* Tabs Header */}
            <div className="border-b border-slate-100 flex text-xs font-bold text-slate-500 bg-slate-50/20">
              {[
                { id: "details", label: "Details", icon: User },
                { id: "notes", label: "Notes", icon: FileText },
                { id: "attachments", label: "Files", icon: Upload },
                { id: "history", label: "History", icon: History },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailsTab(tab.id as any)}
                  className={`flex-1 py-2.5 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${detailsTab === tab.id ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:bg-slate-50/50 hover:text-slate-700"}`}
                >
                  <tab.icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable details panel */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-5 text-xs text-slate-600 max-h-[500px]">
              
              {detailsTab === "details" && (
                <>
                  {/* Follow-up Details */}
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Type</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.type}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Scheduled Date &amp; Time</span>
                        <span className="font-bold text-slate-855 text-blue-600">{selectedFollowup.scheduledTime}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Duration</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.duration}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Owner</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4.5 w-4.5 text-[8px] font-bold shrink-0">
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-full">
                              {selectedFollowup.ownerInitials}
                            </div>
                          </Avatar>
                          <span className="font-bold text-slate-800">{selectedFollowup.ownerName}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Contact Person</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.contactPerson}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Phone</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.contactPhone}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 col-span-2">
                        <span className="text-slate-400 font-semibold text-[10px]">Email</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.contactEmail}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Reminder</span>
                        <span className="font-bold text-slate-800">{selectedFollowup.reminder}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Description</h4>
                    <p className="font-semibold text-slate-700 leading-relaxed bg-slate-50 p-2.5 border border-slate-100 rounded-lg">
                      {selectedFollowup.description}
                    </p>
                  </div>

                  {/* Next Follow-up */}
                  {selectedFollowup.nextFollowupDate && (
                    <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
                      <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Next Follow-up</h4>
                      <div className="flex items-center justify-between border border-slate-100 bg-slate-50 p-2.5 rounded-lg">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-slate-855 text-blue-600">{selectedFollowup.nextFollowupDate}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{selectedFollowup.nextFollowupType || "Follow-up Call"}</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] font-bold">Scheduled</Badge>
                      </div>
                    </div>
                  )}
                </>
              )}

              {detailsTab === "notes" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  Notes catalog for this client interactions.
                </div>
              )}

              {detailsTab === "attachments" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  No attachments linked to this call.
                </div>
              )}

              {detailsTab === "history" && (
                <div className="flex flex-col gap-4">
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">History Timeline</h4>
                  <div className="relative flex flex-col gap-4 pl-4 border-l border-slate-100 py-1.5">
                    {selectedFollowup.historyLogs.map((log, idx) => (
                      <div key={idx} className="relative flex flex-col gap-1">
                        {/* Dot marker */}
                        <div className="absolute -left-[20.5px] top-1 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full" />
                        <span className="font-bold text-slate-800">{log.action}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">by {log.user}</span>
                      </div>
                    ))}
                    {selectedFollowup.historyLogs.length === 0 && (
                      <div className="text-slate-400 font-semibold italic">No previous logs for this item.</div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <Button variant="outline" size="sm" className="bg-white border-slate-200 font-bold text-xs flex-1 text-slate-700">
                Edit
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex-1">
                Log Follow-up
              </Button>
            </div>

          </Card>
        )}

      </div>

    </div>
  );
}
