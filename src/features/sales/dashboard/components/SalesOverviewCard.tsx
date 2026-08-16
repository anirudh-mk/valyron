import React from "react"
import { Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Button } from "@/components/base/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table"

interface OverviewRow {
  metric: string
  thisMonth: string
  lastMonth: string
  change: string
  positive: boolean
}

const rows: OverviewRow[] = [
  { metric: "Total Sales (₹)",       thisMonth: "18,35,000",  lastMonth: "15,48,750", change: "▲ 18.6%", positive: true  },
  { metric: "Total Invoices",         thisMonth: "156",         lastMonth: "139",       change: "▲ 12.2%", positive: true  },
  { metric: "Total Quotations",       thisMonth: "98",          lastMonth: "87",        change: "▲ 12.6%", positive: true  },
  { metric: "Converted Quotations",   thisMonth: "62 (63.3%)", lastMonth: "54 (62.1%)",change: "▲ 1.9%",  positive: true  },
  { metric: "Total Returns (₹)",      thisMonth: "97,350",      lastMonth: "1,03,950",  change: "▼ -6.4%", positive: false },
  { metric: "Gross Profit (₹)",       thisMonth: "6,48,250",   lastMonth: "5,58,600",  change: "▲ 16.2%", positive: true  },
  { metric: "Gross Profit Margin",    thisMonth: "35.3%",       lastMonth: "36.0%",     change: "▼ -0.7%", positive: false },
]

export function SalesOverviewCard() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-sm font-bold text-slate-800">Sales Overview</CardTitle>
            <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-75">
        <div className="overflow-auto max-h-61.25 pr-1">
          <Table className="text-xs w-full">
            <TableHeader className="bg-slate-50/50 sticky top-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-1.5 h-auto text-slate-400 font-bold">Metric</TableHead>
                <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">This Month</TableHead>
                <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">Last Month</TableHead>
                <TableHead className="py-1.5 h-auto text-right text-slate-400 font-bold">Change (%)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-slate-600 font-medium">
              {rows.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="py-1.5 font-bold text-slate-700">{row.metric}</TableCell>
                  <TableCell className="py-1.5 text-right font-bold text-slate-900 font-mono">
                    {row.thisMonth}
                  </TableCell>
                  <TableCell className="py-1.5 text-right font-mono">{row.lastMonth}</TableCell>
                  <TableCell
                    className={`py-1.5 text-right font-bold ${
                      row.positive ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {row.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2"
        >
          View Detailed Report →
        </Button>
      </CardContent>
    </Card>
  )
}
