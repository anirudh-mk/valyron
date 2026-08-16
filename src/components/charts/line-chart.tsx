import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/base/chart"

export interface LineChartSeries {
  key: string
  color?: string
  type?: "line" | "area"
  strokeDasharray?: string
  strokeWidth?: number
}

export interface LineChartProps {
  data: any[]
  config: ChartConfig
  xAxisKey: string
  series: LineChartSeries[]
  gridLines?: boolean
  className?: string
  yFormatter?: (value: any) => string
}

export function ReusableLineChart({
  data,
  config,
  xAxisKey,
  series,
  gridLines = true,
  className,
  yFormatter,
}: LineChartProps) {
  const gradientId = (key: string) => `gradient-${key}`

  return (
    <ChartContainer config={config} className={className}>
      <AreaChart data={data}>
        <defs>
          {series.map(
            (s) =>
              s.type === "area" && (
                <linearGradient
                  key={s.key}
                  id={gradientId(s.key)}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={s.color || `var(--color-${s.key})`}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={s.color || `var(--color-${s.key})`}
                    stopOpacity={0}
                  />
                </linearGradient>
              )
          )}
        </defs>
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
        {series.map((s) => {
          const colorVal = s.color || `var(--color-${s.key})`
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={colorVal}
              strokeWidth={s.strokeWidth ?? 2}
              strokeDasharray={s.strokeDasharray}
              fill={s.type === "area" ? `url(#${gradientId(s.key)})` : "none"}
              dot={{
                r: 3,
                stroke: colorVal,
                strokeWidth: 1.5,
                fill: "#fff",
              }}
              activeDot={{
                r: 5,
                stroke: colorVal,
                strokeWidth: 2,
                fill: colorVal,
              }}
            />
          )
        })}
      </AreaChart>
    </ChartContainer>
  )
}
