import React from "react";
import { useTable, tableFeatures, columnSizingFeature } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/base/empty.tsx";

export const defaultTableFeatures = tableFeatures({
  columnSizingFeature,
});

interface DataTableProps<TData extends Record<string, any>> {
  columns: ColumnDef<typeof defaultTableFeatures, TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  selectedRowId?: string | null;
  getRowId?: (row: TData) => string;
}

export function DataTable<TData extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  selectedRowId,
  getRowId,
}: DataTableProps<TData>) {
  const table = useTable({
    data,
    columns,
    features: defaultTableFeatures,
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
  });

  return (
    <div className="overflow-x-auto min-w-0">
      <Table className="text-xs w-full">
        <TableHeader className="bg-slate-50/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="py-2.5 text-slate-400 font-bold"
                  style={{ width: header.column.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-slate-600 font-medium">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const isSelected = selectedRowId === row.id;
              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected && "selected"}
                  className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                    isSelected
                      ? "bg-blue-50/20 hover:bg-blue-50/30 border-l-2 border-l-blue-600"
                      : ""
                  }`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-96 text-center py-8"
              >
                <div className="flex items-center justify-center h-full w-full">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Search className="h-5 w-5 text-slate-400" />
                      </EmptyMedia>
                      <EmptyTitle>No results found</EmptyTitle>
                      <EmptyDescription>
                        Try adjusting your search terms or filters.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
