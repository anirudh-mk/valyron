import React from "react";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { DataTable } from "@/components/app/DataTable.tsx";
import type { DataTableColumn } from "@/components/app/DataTable.tsx";
import type { Lead } from "../pages/LeadsList.tsx";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 50) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-rose-100 text-rose-800 border-rose-200";
};

const getStatusBadgeColor = (status: Lead["status"]) => {
  switch (status) {
    case "New":       return "bg-purple-100 text-purple-700 border-purple-200";
    case "Contacted": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Qualified": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Lost":      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

// ─── Column definitions ───────────────────────────────────────────────────────

const leadsColumns: DataTableColumn<Lead>[] = [
  {
    key: "name",
    header: "Lead Name",
    cell: (lead) => (
      <span className="font-bold text-blue-600 hover:underline">{lead.name}</span>
    ),
  },
  {
    key: "company",
    header: "Company",
    cell: (lead) => <span className="text-slate-800">{lead.company}</span>,
  },
  {
    key: "contact",
    header: "Contact",
    cell: (lead) => (
      <div className="flex flex-col gap-0.5 text-slate-700">
        <span>{lead.phone}</span>
        <span className="text-[10px] text-slate-400 font-semibold">{lead.email}</span>
      </div>
    ),
  },
  {
    key: "score",
    header: "Lead Score",
    className: "text-center",
    cell: (lead) => (
      <Badge
        variant="outline"
        className={`px-2 py-0.5 font-extrabold text-[10px] ${getScoreColor(lead.score)}`}
      >
        {lead.score}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (lead) => (
      <Badge
        variant="outline"
        className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${getStatusBadgeColor(lead.status)}`}
      >
        {lead.status}
      </Badge>
    ),
  },
  {
    key: "source",
    header: "Source",
    cell: (lead) => <span className="text-slate-700">{lead.source}</span>,
  },
  {
    key: "owner",
    header: "Owner",
    cell: (lead) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-5.5 w-5.5 text-[9px] font-bold">
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700 rounded-full font-bold">
            {lead.ownerInitials}
          </div>
        </Avatar>
        <span className="font-semibold text-slate-800 text-xs">{lead.ownerName}</span>
      </div>
    ),
  },
  {
    key: "createdOn",
    header: "Created On",
    cell: (lead) => <span className="text-slate-400 font-semibold">{lead.createdOn}</span>,
  },
];

// ─── Props & Component ────────────────────────────────────────────────────────

interface LeadsTableProps {
  filteredLeads: Lead[];
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
}

export default function LeadsTable({
  filteredLeads,
  selectedLeadId,
  setSelectedLeadId,
}: LeadsTableProps) {
  return (
    <DataTable<Lead>
      data={filteredLeads}
      columns={leadsColumns}
      getRowId={(lead) => lead.id}
      selectedRowId={selectedLeadId}
      onRowClick={(lead) =>
        setSelectedLeadId(selectedLeadId === lead.id ? null : lead.id)
      }
      className={`transition-all duration-300 ${
        selectedLeadId ? "col-span-12 xl:col-span-8" : "col-span-12"
      }`}
      emptyMessage="No leads match your filter choices."
      rowLabel="leads"
    />
  );
}
