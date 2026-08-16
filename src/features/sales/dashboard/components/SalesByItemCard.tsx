import React from "react"
import { Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Badge } from "@/components/base/badge"
import { Button } from "@/components/base/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table"

interface ItemRow {
  name: string
  quantity: string
  sales: string
}

const items: ItemRow[] = [
  { name: "LED Monitor 24 Inch", quantity: "45",  sales: "4,50,000" },
  { name: "Keyboard Wireless",   quantity: "78",  sales: "2,34,000" },
  { name: "USB-C Cable 1.5m",    quantity: "120", sales: "1,80,000" },
  { name: "Wireless Mouse",      quantity: "95",  sales: "1,42,500" },
  { name: "Office Chair",        quantity: "18",  sales: "1,25,000" },
]

export function SalesByItemCard() {
  return (
    <Card className="border-slate-100 flex-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-bold text-slate-800">Sales by Item (Top 5)</CardTitle>
          <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
        </div>
        <Badge
          variant="secondary"
          className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5"
        >
          By Amount
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col justify-between text-xs h-[105px]">
        <div className="overflow-auto max-h-[80px]">
          <Table className="w-full">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-1 h-auto text-slate-400 font-bold">Item</TableHead>
                <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Quantity</TableHead>
                <TableHead className="py-1 h-auto text-right text-slate-400 font-bold">Sales (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-slate-600 font-medium">
              {items.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="py-1 font-bold text-slate-700">{item.name}</TableCell>
                  <TableCell className="py-1 text-right font-mono">{item.quantity}</TableCell>
                  <TableCell className="py-1 text-right font-bold font-mono">{item.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-1.5"
        >
          View All Items →
        </Button>
      </CardContent>
    </Card>
  )
}
