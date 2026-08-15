import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Checkbox } from "@/components/base/checkbox.tsx";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/base/pagination.tsx";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/base/empty.tsx";
import { MoreHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Column Definition ────────────────────────────────────────────────────────

export interface DataTableColumn<TData> {
  /** Unique column key */
  key: string;
  /** Header label */
  header: React.ReactNode;
  /** Render function for cell content */
  cell: (row: TData) => React.ReactNode;
  /** Optional tailwind classes applied to both head and cell */
  className?: string;
  /** Set true to stop row-click propagation on this cell (e.g. action buttons) */
  stopPropagation?: boolean;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface DataTableProps<TData> {
  data: TData[];
  columns: DataTableColumn<TData>[];
  /** Return a unique string id per row */
  getRowId: (row: TData) => string;
  /** Currently selected row id */
  selectedRowId?: string | null;
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Show a leading checkbox column (default true) */
  showCheckbox?: boolean;
  /** Card wrapper className (e.g. col-span) */
  className?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Number of rows per page (default 10) */
  defaultPageSize?: number;
  /** Unit label shown in "Showing X–Y of Z …" */
  rowLabel?: string;
}

// ─── Pagination helpers ───────────────────────────────────────────────────────

function buildPageItems(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const items: (number | "ellipsis")[] = [];
  if (currentPage <= 3) {
    items.push(1, 2, 3, "ellipsis", totalPages);
  } else if (currentPage >= totalPages - 2) {
    items.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
  } else {
    items.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
  }
  return items;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  selectedRowId,
  onRowClick,
  showCheckbox = true,
  className,
  emptyMessage = "No results found.",
  defaultPageSize = 10,
  rowLabel = "rows",
}: DataTableProps<TData>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = defaultPageSize;

  // Reset to page 1 whenever data length changes (e.g. filter applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <Card className={cn("p-0 transition-all duration-300", className)}>
      <CardContent className="p-0">
        {/* ── Table ── */}
        <div className="overflow-x-auto min-w-0">
          <Table className="text-xs w-full">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                {showCheckbox && (
                  <TableHead className="w-12 text-center">
                    <Checkbox className="translate-y-0.5" />
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn("py-2 text-slate-400 font-bold", col.className)}
                  >
                    {col.header}
                  </TableHead>
                ))}
                {/* Trailing actions column */}
                <TableHead className="w-16 text-center" />
              </TableRow>
            </TableHeader>

            <TableBody className="text-slate-600 font-medium">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const rowId = getRowId(row);
                  const isSelected = selectedRowId === rowId;
                  return (
                    <TableRow
                      key={rowId}
                      className={cn(
                        "cursor-pointer hover:bg-slate-50 transition-colors",
                        isSelected && "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {showCheckbox && (
                        <TableCell
                          className="text-center py-3.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox className="translate-y-0.5" />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          className={cn("py-3.5", col.className)}
                          onClick={col.stopPropagation ? (e) => e.stopPropagation() : undefined}
                        >
                          {col.cell(row)}
                        </TableCell>
                      ))}
                      {/* Trailing actions slot */}
                      <TableCell
                        className="text-center py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-slate-200">
                          <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (showCheckbox ? 2 : 1)}
                    className="h-64 text-center py-8"
                  >
                    <div className="flex items-center justify-center h-full w-full">
                      <Empty>
                        <EmptyHeader>
                          <EmptyMedia variant="icon">
                            <Search className="h-5 w-5 text-slate-400" />
                          </EmptyMedia>
                          <EmptyTitle>No results found</EmptyTitle>
                          <EmptyDescription>{emptyMessage}</EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
          <span>
            Showing {data.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, data.length)} of {data.length} {rowLabel}
          </span>
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
              {buildPageItems(currentPage, totalPages).map((item, idx) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
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
                )
              )}
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
        </div>
      </CardContent>
    </Card>
  );
}

