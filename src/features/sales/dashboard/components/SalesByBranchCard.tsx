import React from "react"
import {Info} from "lucide-react"
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/base/card"
import {Badge} from "@/components/base/badge"
import {Button} from "@/components/base/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table"

interface BranchRow {
  branch: string
  sales: string
  percent: string
}

const branches: BranchRow[] = [
  {branch: "Main Branch", sales: "9,25,000", percent: "50.4%"},
  {branch: "HSR Layout", sales: "4,20,000", percent: "22.9%"},
  {branch: "Whitefield", sales: "3,10,000", percent: "16.9%"},
  {branch: "Mysore Road", sales: "1,80,000", percent: "9.8%"},
]

export function SalesByBranchCard() {
  return (
    <Card className=" flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-bold text-slate-800">Sales by Branch</CardTitle>
          <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer"/>
        </div>
        <Badge
          variant="secondary"
          className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5"
        >
          This Month
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col justify-between text-xs">
        <Table className="w-full">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-1 h-auto text-slate-400 font-bold">Branch</TableHead>
              <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Sales (₹)</TableHead>
              <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-600 font-medium">
            {branches.map((row) => (
              <TableRow key={row.branch}>
                <TableCell className="py-1 font-bold text-slate-700">{row.branch}</TableCell>
                <TableCell className="py-1 text-right font-bold font-mono">{row.sales}</TableCell>
                <TableCell className="py-1 text-right font-mono">{row.percent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-1.5"
        >
          View All Branches →
        </Button>
      </CardFooter>
    </Card>
  )
}
