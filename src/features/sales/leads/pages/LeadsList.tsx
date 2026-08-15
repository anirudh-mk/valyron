import React, { useState } from "react";
import Surface from "@/components/app/Surface.tsx";
import PageHeader from "@/components/app/PageHeader.tsx";
import MetricsSection from "@/features/sales/leads/sections/MetricsSection.tsx";
import { FilterBar } from "@/components/app/FilterBar.tsx";
import LeadDetailsSection from "@/features/sales/leads/sections/LeadDetailsSection.tsx";
import LeadsTable from "@/features/sales/leads/sections/LeadsTable.tsx";
import Grid from "@/components/app/Grid.tsx";

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
  {
    id: "delta-tech",
    name: "Delta Technologies",
    company: "Delta Technologies",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@deltatech.in",
    phone: "+91 99000 88888",
    score: 92,
    status: "Qualified",
    source: "Referral",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    createdOn: "19 May 2026",
    industry: "Information Technology",
    employees: "51 - 200",
    revenue: "₹ 10 Cr - ₹ 25 Cr",
    location: "Bangalore, Karnataka",
    notes: "Requires custom CRM modules and payroll integration.",
    tags: ["CRM", "High Priority"],
  },
  {
    id: "apex-logistics",
    name: "Apex Logistics Ltd",
    company: "Apex Logistics Ltd",
    contactPerson: "Siddharth Sen",
    email: "siddharth@apexlog.com",
    phone: "+91 98111 22222",
    score: 68,
    status: "Contacted",
    source: "Website",
    ownerName: "Arjun Jose",
    ownerInitials: "AJ",
    createdOn: "18 May 2026",
    industry: "Logistics",
    employees: "201 - 500",
    revenue: "₹ 50 Cr - ₹ 100 Cr",
    location: "Kolkata, West Bengal",
    notes: "Interested in warehouse management systems.",
    tags: ["Warehouse", "Logistics"],
  },
  {
    id: "quantum-labs",
    name: "Quantum Labs",
    company: "Quantum Labs",
    contactPerson: "Dr. Anil Prasad",
    email: "anil@quantumlabs.co",
    phone: "+91 97444 55555",
    score: 82,
    status: "Qualified",
    source: "Advertisement",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    createdOn: "17 May 2026",
    industry: "Healthcare & Biotech",
    employees: "11 - 50",
    revenue: "₹ 5 Cr - ₹ 10 Cr",
    location: "Hyderabad, India",
    notes: "Looking for ERP solutions to track clinical test inventory.",
    tags: ["Inventory", "Healthcare"],
  },
  {
    id: "zenith-retail",
    name: "Zenith Retail",
    company: "Zenith Retail",
    contactPerson: "Kavitha Rao",
    email: "kavitha@zenithretail.com",
    phone: "+91 96333 44444",
    score: 58,
    status: "New",
    source: "Social Media",
    ownerName: "Jane Smith",
    ownerInitials: "JS",
    createdOn: "16 May 2026",
    industry: "Retail & Wholesale",
    employees: "51 - 200",
    revenue: "₹ 10 Cr - ₹ 25 Cr",
    location: "Chennai, Tamil Nadu",
    notes: "Inquired about POS integration with accounting software.",
    tags: ["POS", "Retail"],
  },
  {
    id: "blue-ocean",
    name: "Blue Ocean Shipping",
    company: "Blue Ocean Shipping",
    contactPerson: "Capt. Sandeep",
    email: "sandeep@blueoceanship.com",
    phone: "+91 95222 33333",
    score: 35,
    status: "Lost",
    source: "Cold Call",
    ownerName: "Mike Johnson",
    ownerInitials: "MJ",
    createdOn: "15 May 2026",
    industry: "Transportation & Shipping",
    employees: "500+",
    revenue: "₹ 100 Cr+",
    location: "Visakhapatnam, Andhra Pradesh",
    notes: "Disqualified. Decided to build internal system instead.",
    tags: ["Disqualified", "Shipping"],
  },
];

interface FilterConfigArgs {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  sourceFilter: string;
  setSourceFilter: (v: string) => void;
  scoreFilter: string;
  setScoreFilter: (v: string) => void;
}

const getFilterConfig = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  scoreFilter,
  setScoreFilter,
}: FilterConfigArgs) => ({
  search: {
    value: searchTerm,
    onChange: setSearchTerm,
    placeholder: "Search leads by name, email, phone...",
  },
  filters: [
    {
      type: "select" as const,
      key: "status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "All Statuses", value: "All" },
        { label: "New", value: "New" },
        { label: "Contacted", value: "Contacted" },
        { label: "Qualified", value: "Qualified" },
        { label: "Lost / Disqualified", value: "Lost" },
      ],
    },
    {
      type: "select" as const,
      key: "source",
      value: sourceFilter,
      onChange: setSourceFilter,
      options: [
        { label: "All Sources", value: "All" },
        { label: "Website", value: "Website" },
        { label: "Referral", value: "Referral" },
        { label: "Social Media", value: "Social Media" },
        { label: "Cold Call", value: "Cold Call" },
        { label: "Advertisement", value: "Advertisement" },
      ],
    },
    {
      type: "select" as const,
      key: "score",
      value: scoreFilter,
      onChange: setScoreFilter,
      options: [
        { label: "All Lead Scores", value: "All" },
        { label: "High (> 70)", value: "High (> 70)" },
        { label: "Medium (50-70)", value: "Medium (50-70)" },
        { label: "Low (< 50)", value: "Low (< 50)" },
      ],
    },
    {
      type: "date" as const,
      key: "created",
      label: "Created: This Month",
      onClick: () => {
        // Open date picker
      },
    },
  ],
});

export default function LeadsList() {
  const [leads] = useState<Lead[]>(initialLeads);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("glow-systems");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");

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

  const filterConfig = getFilterConfig({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sourceFilter,
    setSourceFilter,
    scoreFilter,
    setScoreFilter,
  });

  return (
    <Surface>
      <PageHeader />
      <MetricsSection />
      {/* --- Filter / Controls Bar --- */}
      <FilterBar
        search={filterConfig.search}
        filters={filterConfig.filters}
      />

      {/* --- Main Table Layout with Right Details Sidebar Panel --- */}
      <Grid>
        <LeadsTable
          filteredLeads={filteredLeads}
          selectedLeadId={selectedLeadId}
          setSelectedLeadId={setSelectedLeadId}
        />

        {/* --- Sliding Right-Side Details Drawer (Displays when a lead is selected) --- */}
        {selectedLeadId && selectedLead && (
          <LeadDetailsSection
            selectedLead={selectedLead}
            setSelectedLeadId={setSelectedLeadId}
          />
        )}
      </Grid>
    </Surface>
  );
}
