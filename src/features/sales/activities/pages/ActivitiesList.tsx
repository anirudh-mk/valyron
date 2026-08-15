import React, { useState } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  Activity,
  Search,
  ChevronDown,
  Upload,
  MoreHorizontal,
  X,
  Phone,
  Video,
  Mail,
  FileText,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  SlidersHorizontal,
  Settings2,
  History,
  Tag,
  User
} from "lucide-react";

// --- Types ---
export interface ActivityItem {
  id: string;
  subject: string;
  description: string;
  relatedName: string;
  relatedType: "Lead" | "Opportunity";
  relatedId: string;
  type: "Phone Call" | "Meeting" | "Email" | "Task";
  dueDate: string;
  ownerName: string;
  ownerInitials: string;
  status: "Upcoming" | "Completed" | "Overdue";
  priority: "High" | "Medium" | "Low";
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  reminder: string;
  tags: string[];
}

// --- Mock Data ---
const initialActivities: ActivityItem[] = [
  {
    id: "act-call-rahul",
    subject: "Call with Rahul Sharma",
    description: "Discussed ERP requirements and current processes. Client is interested in inventory and accounting modules.",
    relatedName: "Glow Systems Pvt Ltd",
    relatedType: "Lead",
    relatedId: "glow-systems",
    type: "Phone Call",
    dueDate: "31 May 2026, 10:30 AM",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Upcoming",
    priority: "High",
    contactPerson: "Rahul Sharma",
    contactPhone: "+91 98765 43210",
    contactEmail: "rahul@glowsys.com",
    reminder: "15 minutes before",
    tags: ["ERP", "High Priority", "Follow-up"],
  },
  {
    id: "act-demo",
    subject: "Product Demo",
    description: "Demo of ERP features for wholesale distributors.",
    relatedName: "TechNova Solutions",
    relatedType: "Opportunity",
    relatedId: "erp-implementation",
    type: "Meeting",
    dueDate: "31 May 2026, 02:00 PM",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Upcoming",
    priority: "Medium",
    contactPerson: "Priya Nair",
    contactPhone: "+91 91234 56789",
    contactEmail: "priya@technova.com",
    reminder: "30 minutes before",
    tags: ["Demo", "Distributors"],
  },
  {
    id: "act-follow-prop",
    subject: "Follow up Call",
    description: "Follow up on the lighting contract proposal sent last week.",
    relatedName: "Bright Retailers",
    relatedType: "Lead",
    relatedId: "bright-retailers",
    type: "Phone Call",
    dueDate: "01 Jun 2026, 11:00 AM",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    status: "Upcoming",
    priority: "Medium",
    contactPerson: "Amit Verma",
    contactPhone: "+91 99887 66554",
    contactEmail: "amit@brightretail.com",
    reminder: "10 minutes before",
    tags: ["Follow-up", "Lighting"],
  },
  {
    id: "act-send-quote",
    subject: "Send Quotation",
    description: "Prepare and email the final revised AMC quote.",
    relatedName: "Urban Traders",
    relatedType: "Opportunity",
    relatedId: "annual-amc",
    type: "Email",
    dueDate: "01 Jun 2026, 04:30 PM",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    status: "Upcoming",
    priority: "Low",
    contactPerson: "Sneha Iyer",
    contactPhone: "+91 98456 22110",
    contactEmail: "sneha@urbantraders.com",
    reminder: "15 minutes before",
    tags: ["Quotation", "AMC"],
  },
  {
    id: "act-visit",
    subject: "Site Visit",
    description: "Inspect warehouse layout for CCTV cabling.",
    relatedName: "Global Goods",
    relatedType: "Lead",
    relatedId: "global-goods",
    type: "Task",
    dueDate: "02 Jun 2026, 10:00 AM",
    ownerName: "Rahul Sharma",
    ownerInitials: "RS",
    status: "Upcoming",
    priority: "High",
    contactPerson: "Vivek Mehta",
    contactPhone: "+91 88890 11223",
    contactEmail: "vivek@globalgoods.com",
    reminder: "1 hour before",
    tags: ["Site Visit", "CCTV"],
  },
  {
    id: "act-req-disc",
    subject: "Requirement Discussion",
    description: "Detailed discussion on customized modules for hardware supply chain.",
    relatedName: "Prime Distributors",
    relatedType: "Opportunity",
    relatedId: "it-hardware",
    type: "Meeting",
    dueDate: "02 Jun 2026, 03:00 PM",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    status: "Completed",
    priority: "Medium",
    contactPerson: "Deepak Singh",
    contactPhone: "+91 97333 44556",
    contactEmail: "deepak@primedist.com",
    reminder: "15 minutes before",
    tags: ["Requirements", "Hardware"],
  },
];

export default function ActivitiesList() {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [selectedActId, setSelectedActId] = useState<string | null>("act-call-rahul");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"All" | "Lead" | "Opportunity">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [detailsTab, setDetailsTab] = useState<"details" | "notes" | "attachments" | "history">("details");

  // Filtering Logic
  const filteredActivities = activities.filter((act) => {
    const matchesCategory = activeCategoryTab === "All" || act.relatedType === activeCategoryTab;
    const matchesSearch =
      act.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.relatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || act.type === typeFilter;
    const matchesStatus = statusFilter === "All" || act.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || act.ownerName === ownerFilter;

    return matchesCategory && matchesSearch && matchesType && matchesStatus && matchesOwner;
  });

  const selectedActivity = activities.find((act) => act.id === selectedActId) || activities[0];

  const getTypeColorBadge = (type: ActivityItem["type"]) => {
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

  const getStatusColor = (status: ActivityItem["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Overdue":
        return "bg-rose-100 text-rose-800 border-rose-200 font-bold";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const getPriorityColor = (priority: ActivityItem["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Low":
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getIcon = (type: ActivityItem["type"]) => {
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Activities</h1>
            <span className="text-xs text-muted-foreground font-semibold px-2 py-0.5 bg-slate-100 rounded-full">
              {filteredActivities.length} of {activities.length} activities
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Track and manage all activities related to leads and opportunities.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            Log Activity
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700">
            More
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs">
            <Plus className="h-4 w-4" />
            New Activity
          </Button>
        </div>
      </div>

      {/* --- KPI Cards Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Activities", count: 568, change: "▲ 18.6% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Activity },
          { label: "Upcoming", count: 152, change: "▲ 12.3% vs Apr 2026", color: "bg-blue-50 text-blue-600", icon: Clock },
          { label: "Overdue", count: 43, change: "▼ -10.6% vs Apr 2026", color: "bg-rose-50 text-rose-600", icon: AlertTriangle },
          { label: "Completed", count: 285, change: "▲ 22.1% vs Apr 2026", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
          { label: "Today's Activities", count: 28, change: "View today's schedule →", color: "bg-amber-50 text-amber-600", icon: Calendar, actionable: true },
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
        {["All Activities", "Lead Activities", "Opportunity Activities"].map((label) => {
          const typeVal = label.includes("Lead") ? "Lead" : label.includes("Opportunity") ? "Opportunity" : "All";
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
              placeholder="Search activities..."
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
              <option value="All">All Activity Types</option>
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
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
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
        <Card className={`border-slate-100 transition-all duration-300 ${selectedActId ? "col-span-12 xl:col-span-8" : "col-span-12"}`}>
          <CardContent className="p-0">
            <div className="overflow-x-auto min-w-0">
              <Table className="text-xs w-full">
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12 text-center py-2.5">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    </TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Activity</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Related To</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Type</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Due Date &amp; Time</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Owner</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                    <TableHead className="py-2.5 text-slate-400 font-bold">Priority</TableHead>
                    <TableHead className="py-2.5 w-16 text-center" />
                  </TableRow>
                </TableHeader>
                <TableBody className="text-slate-600 font-medium">
                  {filteredActivities.map((act) => {
                    const isSelected = selectedActId === act.id;
                    const IconComp = getIcon(act.type);
                    return (
                      <TableRow
                        key={act.id}
                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""}`}
                        onClick={() => setSelectedActId(isSelected ? null : act.id)}
                      >
                        <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800">{act.subject}</span>
                            <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[200px]">
                              {act.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-700">{act.relatedName}</span>
                            <Badge variant="outline" className="w-fit text-[9px] font-semibold tracking-wide py-0 px-1 bg-slate-50 text-slate-500">
                              {act.relatedType}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline" className={`px-2 py-0.5 gap-1 text-[10px] font-bold ${getTypeColorBadge(act.type)}`}>
                            {IconComp && <IconComp className="h-3 w-3 inline-block" />}
                            {act.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 font-bold text-slate-800">
                          {act.dueDate}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
                                {act.ownerInitials}
                              </div>
                            </Avatar>
                            <span className="font-semibold text-slate-855 text-xs">{act.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge className={`px-2 py-0.5 text-[9px] font-bold border ${getStatusColor(act.status)}`}>
                            {act.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge className={`px-2 py-0.5 text-[9px] font-bold border ${getPriorityColor(act.priority)}`}>
                            {act.priority}
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
              <span>Showing 1 to {filteredActivities.length} of {filteredActivities.length} activities</span>
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

        {/* --- Drawer Activity Details Right Panel --- */}
        {selectedActId && selectedActivity && (
          <Card className="col-span-12 xl:col-span-4 border-slate-100 border-l-2 shadow-lg sticky top-6 bg-white overflow-hidden max-h-[800px] flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{selectedActivity.subject}</h3>
                <div className="flex items-center gap-1.5">
                  <Badge className={`px-2 py-0 px-1 bg-amber-50 text-amber-700 border-amber-100 font-bold hover:bg-amber-50 text-[10px]`}>
                    {selectedActivity.status}
                  </Badge>
                  <Badge className={`px-2 py-0 px-1 font-bold text-[10px] ${getPriorityColor(selectedActivity.priority)}`}>
                    {selectedActivity.priority} Priority
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-slate-400 hover:bg-slate-100" onClick={() => setSelectedActId(null)}>
                <X className="h-4.5 w-4.5" />
              </Button>
            </div>

            {/* Related Entity Block */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Related To:</span>
                <span className="font-bold text-slate-800">{selectedActivity.relatedName}</span>
                <Badge variant="outline" className="text-[9px] py-0 px-1 bg-slate-100 text-slate-600">
                  {selectedActivity.relatedType}
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
                  {/* Activity Details List */}
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Activity Type</span>
                        <span className="font-bold text-slate-800">{selectedActivity.type}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Due Date &amp; Time</span>
                        <span className="font-bold text-blue-600">{selectedActivity.dueDate}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Contact Person</span>
                        <span className="font-bold text-slate-800">{selectedActivity.contactPerson}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Phone</span>
                        <span className="font-bold text-slate-800">{selectedActivity.contactPhone}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 col-span-2">
                        <span className="text-slate-400 font-semibold text-[10px]">Email</span>
                        <span className="font-bold text-slate-800">{selectedActivity.contactEmail}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Owner</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4.5 w-4.5 text-[8px] font-bold shrink-0">
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold rounded-full">
                              {selectedActivity.ownerInitials}
                            </div>
                          </Avatar>
                          <span className="font-bold text-slate-800">{selectedActivity.ownerName}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-semibold text-[10px]">Reminder</span>
                        <span className="font-bold text-slate-800">{selectedActivity.reminder}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Description</h4>
                    <p className="font-semibold text-slate-700 leading-relaxed bg-slate-50 p-2.5 border border-slate-100 rounded-lg">
                      {selectedActivity.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
                    <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">Tags</h4>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {selectedActivity.tags.map((tag) => (
                        <Badge key={tag} className="bg-slate-100 text-slate-655 border-slate-200 font-semibold text-[10px] px-2 py-0.5">
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

              {detailsTab === "notes" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  Add logs and summary notes regarding this action here.
                </div>
              )}

              {detailsTab === "attachments" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  No files attached to this activity.
                </div>
              )}

              {detailsTab === "history" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  No previous audit histories logged.
                </div>
              )}

            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex-1">
                Mark as Completed
              </Button>
              <Button variant="outline" size="sm" className="border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex-1">
                Mark as Cancelled
              </Button>
            </div>

          </Card>
        )}

      </div>

    </div>
  );
}
