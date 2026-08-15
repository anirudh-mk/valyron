import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import { Button } from "@/components/base/button.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/base/pagination.tsx";
import { MoreHorizontal } from "lucide-react";
import type { Lead } from "../pages/LeadsList.tsx";

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
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when filtered list changes or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredLeads.length, pageSize]);

  // Paginated Slicing
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Generate Pagination Items (ellipsis pages)
  const getPageItems = () => {
    const totalPages = Math.ceil(filteredLeads.length / pageSize);
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: (number | "ellipsis")[] = [];
    if (currentPage <= 3) {
      items.push(1, 2, 3, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      items.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
    } else {
      items.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
    }
    return items;
  };

  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  return (
    <Card
      className={`border-slate-100 transition-all duration-300 ${selectedLeadId ? "col-span-12 xl:col-span-8" : "col-span-12"
        }`}
    >
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
              {paginatedLeads.map((lead) => {
                const isSelected = selectedLeadId === lead.id;
                return (
                  <TableRow
                    key={lead.id}
                    className={`cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600" : ""
                      }`}
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
                      <Badge
                        variant="outline"
                        className={`px-2 py-0.5 font-extrabold text-[10px] ${getScoreColor(lead.score)}`}
                      >
                        {lead.score}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge
                        variant="outline"
                        className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${getStatusBadgeColor(
                          lead.status
                        )}`}
                      >
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
          <span>
            Showing {filteredLeads.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredLeads.length)} of {filteredLeads.length} leads
          </span>
          <div className="flex items-center gap-4">
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {getPageItems().map((item, idx) => {
                  if (item === "ellipsis") {
                    return (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(item);
                        }}
                        isActive={currentPage === item}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages || totalPages === 0}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="py-1 px-2 border rounded bg-white font-semibold cursor-pointer"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
