import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Calendar,
  AlertTriangle
} from "lucide-react";

export interface ExpiredQuotationItem {
  id: string;
  customerName: string;
  quotationDate: string;
  expiredOn: string;
  amount: number;
  salesperson: string;
}

const expiredItems: ExpiredQuotationItem[] = [
  { id: "QUO-2026-0285", customerName: "Global Goods", quotationDate: "28 May 2026", expiredOn: "27 Jun 2026", amount: 75300.00, salesperson: "Jane Smith" },
  { id: "QUO-2026-0280", customerName: "Spectrum Solutions", quotationDate: "23 May 2026", expiredOn: "22 Jun 2026", amount: 86750.00, salesperson: "Rahul Sharma" },
];

export default function QuotationExpired() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const filteredItems = expiredItems.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Breadcrumbs --- */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <Link to="/dashboard/sales/quotation" className="hover:text-slate-600">Quotations</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-655 font-extrabold">Expired Quotations</span>
      </div>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Expired Quotations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View and manage all quotations that have passed their validity dates.
          </p>
        </div>

        <Button variant="outline" size="sm" className="bg-white border-slate-200 p-2 h-8 w-8 text-slate-400">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* --- Controls Panel --- */}
      <div className="flex items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
        <div className="relative w-64 text-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search expired quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-full bg-slate-50/50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* --- Table list Card --- */}
      <Card className="border-slate-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto min-w-0">
            <Table className="text-xs w-full">
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-2.5 text-slate-400 font-bold">Quotation No.</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Customer</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Quotation Date</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Expired On</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold text-right">Amount (₹)</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Status</TableHead>
                  <TableHead className="py-2.5 text-slate-400 font-bold">Salesperson</TableHead>
                  <TableHead className="py-2.5 w-16 text-center" />
                </TableRow>
              </TableHeader>
              <TableBody className="text-slate-655 font-semibold">
                {filteredItems.length > 0 ? (
                  filteredItems.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => navigate("/dashboard/sales/quotation/details")}
                      className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                    >
                      <TableCell className="py-3.5 font-bold text-blue-600 hover:underline">
                        {row.id}
                      </TableCell>
                      <TableCell className="py-3.5 font-bold text-slate-800">{row.customerName}</TableCell>
                      <TableCell className="py-3.5 font-semibold text-slate-800">{row.quotationDate}</TableCell>
                      <TableCell className="py-3.5 font-semibold text-slate-500">
                        <div className="flex items-center gap-1.5 text-rose-600">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>{row.expiredOn}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3.5 text-right font-bold text-slate-900 font-mono">
                        {formatCurrency(row.amount).replace("₹", "").trim()}
                      </TableCell>
                      <TableCell className="py-3.5">
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-100 font-bold text-[9px]">
                          Expired
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3.5 font-bold text-slate-700">{row.salesperson}</TableCell>
                      <TableCell className="text-center py-3.5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:bg-slate-100" onClick={() => navigate("/dashboard/sales/quotation/details")}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-slate-400 font-bold">
                      No expired quotations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
