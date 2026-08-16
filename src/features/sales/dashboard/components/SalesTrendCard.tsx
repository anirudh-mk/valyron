import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Badge } from "@/components/base/badge"
import { Info } from "lucide-react"
import { SalesTrendChart, type TrendDataPoint } from "./DashboardCharts"

interface SalesTrendCardProps {
  data: TrendDataPoint[]
}

export function SalesTrendCard({ data }: SalesTrendCardProps) {
  return (
    <Card className="col-span-12 xl:col-span-4 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-bold text-slate-800">Sales Trend</CardTitle>
          <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
        </div>
        <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
          This Month
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <SalesTrendChart data={data} />
      </CardContent>
    </Card>
  )
}
