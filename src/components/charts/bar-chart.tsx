import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/base/chart"

export interface BarChartProps {
  data: any[]
  config: ChartConfig
  xAxisKey: string
  series: {
    key: string
    color?: string
    radius?: [number, number, number, number]
  }[]
  gridLines?: boolean
  className?: string
  yFormatter?: (value: any) => string
}

export function ReusableBarChart({
  data,
  config,
  xAxisKey,
  series,
  gridLines = true,
  className,
  yFormatter,
}: BarChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <BarChart data={data}>
        {gridLines && (
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            className="stroke-border/50"
          />
        )}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="fill-muted-foreground text-[10px] font-medium"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={yFormatter}
          className="fill-muted-foreground text-[10px] font-medium"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            fill={s.color || `var(--color-${s.key})`}
            radius={s.radius || [4, 4, 0, 0]}
            maxBarSize={45}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
