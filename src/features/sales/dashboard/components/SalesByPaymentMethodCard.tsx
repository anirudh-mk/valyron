import React from "react"
import { Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { DonutChart, type DonutDataPoint } from "./DashboardCharts"

interface SalesByPaymentMethodCardProps {
  data: DonutDataPoint[]
  centerLabel: string
}

export function SalesByPaymentMethodCard({ data, centerLabel }: SalesByPaymentMethodCardProps) {
  return (
    <Card className="col-span-12 md:col-span-6 xl:col-span-3 border-slate-100 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-sm font-bold text-slate-800">
            Sales by Payment Method
          </CardTitle>
          <Info className="h-3.5 w-3.5 text-slate-300 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <DonutChart
          data={data}
          centerLabel={centerLabel}
          centerSublabel="Total"
        />
      </CardContent>
    </Card>
  )
}
