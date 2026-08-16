import React from "react"
import { TrendingUp, Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Badge } from "@/components/base/badge"
import { SalesComparisonChart, type BarDataPoint } from "./DashboardCharts"

interface SalesComparisonCardProps {
  data: BarDataPoint[]
}

export function SalesComparisonCard({ data }: SalesComparisonCardProps) {
  return (
    <Card className="border-slate-100 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-bold text-slate-800">Sales Comparison</CardTitle>
          <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
        </div>
        <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5">
          This Year
        </Badge>
      </CardHeader>

      <CardContent className="h-[240px] flex flex-col md:flex-row gap-6 items-center">

        {/* Bar Chart Container */}
        <div className="flex-1 w-full h-full min-h-[170px]">
          <SalesComparisonChart data={data} />

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] font-semibold text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded inline-block" />
              <span>This Year (₹)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-slate-300 rounded inline-block" />
              <span>Last Year (₹)</span>
            </div>
          </div>
        </div>

        {/* Side Aggregation Metrics */}
        <div className="w-full md:w-56 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 self-stretch">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Sales (This Year)
            </span>
            <div className="text-lg font-extrabold text-slate-900 font-mono">₹ 87,45,000</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>15.8% vs Last Year</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Sales (Last Year)
            </span>
            <div className="text-lg font-extrabold text-slate-500 font-mono">₹ 75,47,000</div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
