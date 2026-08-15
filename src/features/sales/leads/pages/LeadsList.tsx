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
import Surface from "@/components/app/Surface.tsx";
import PageHeader from "@/components/app/PageHeader.tsx";
import MetricsSection from "@/features/sales/leads/sections/MetricsSection.tsx";
import { FilterBar } from "@/components/app/FilterBar.tsx";
import LeadDetailsSection from "@/features/sales/leads/sections/LeadDetailsSection.tsx";

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
    <Surface>
      <PageHeader />
      <MetricsSection />
      {/* --- Filter / Controls Bar --- */}
      <FilterBar
        search={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search leads by name, email, phone...",
        }}
        filters={[
          {
            type: "select",
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              {
                label: "All Statuses",
                value: "All",
              },
              {
                label: "New",
                value: "New",
              },
              {
                label: "Contacted",
                value: "Contacted",
              },
              {
                label: "Qualified",
                value: "Qualified",
              },
              {
                label: "Lost / Disqualified",
                value: "Lost",
              },
            ],
          },

          {
            type: "select",
            key: "source",
            value: sourceFilter,
            onChange: setSourceFilter,
            options: [
              {
                label: "All Sources",
                value: "All",
              },
              {
                label: "Website",
                value: "Website",
              },
              {
                label: "Referral",
                value: "Referral",
              },
              {
                label: "Social Media",
                value: "Social Media",
              },
              {
                label: "Cold Call",
                value: "Cold Call",
              },
              {
                label: "Advertisement",
                value: "Advertisement",
              },
            ],
          },

          {
            type: "select",
            key: "score",
            value: scoreFilter,
            onChange: setScoreFilter,
            options: [
              {
                label: "All Lead Scores",
                value: "All",
              },
              {
                label: "High (> 70)",
                value: "High (> 70)",
              },
              {
                label: "Medium (50-70)",
                value: "Medium (50-70)",
              },
              {
                label: "Low (< 50)",
                value: "Low (< 50)",
              },
            ],
          },

          {
            type: "date",
            key: "created",
            label: "Created: This Month",
            onClick: () => {
              // Open date picker
            },
          },
        ]}
      />

      {/* --- Main Table Layout with Right Details Sidebar Panel --- */}
      <div className="grid grid-cols-12 gap-6 items-start">

        {/* Leads Table Card (Spans less if drawer is open) */}
        <Card
          className={`border-slate-100 transition-all duration-300 ${selectedLeadId ? "col-span-12 xl:col-span-8" : "col-span-12"}`}>
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
                          <Badge variant="outline"
                            className={`px-2 py-0.5 font-extrabold text-[10px] ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge variant="outline"
                            className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${getStatusBadgeColor(lead.status)}`}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5 text-slate-700">{lead.source}</TableCell>
                        <TableCell className="py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
                              <div
                                className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
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
            <div
              className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
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
          <LeadDetailsSection
            selectedLead={selectedLead}
            setSelectedLeadId={setSelectedLeadId}
          />
        )}

      </div>

    </Surface>
  );
}
