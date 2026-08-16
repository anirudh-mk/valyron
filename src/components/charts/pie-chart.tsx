import * as React from "react"
import { Cell, Pie, PieChart, Sector } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/base/chart"

export interface PieChartProps {
  data: any[]
  config: ChartConfig
  nameKey: string
  dataKey: string
  innerRadius?: number | string
  outerRadius?: number | string
  className?: string
  centerLabel?: string
  centerSublabel?: string
  centerFormatter?: (value: any) => string
  showLegend?: boolean
}

export function ReusablePieChart({
  data,
  config,
  nameKey,
  dataKey,
  innerRadius = "65%",
  outerRadius = "85%",
  className,
  centerLabel,
  centerSublabel,
  centerFormatter,
  showLegend = true,
}: PieChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const activeSegment = activeIndex !== null ? data[activeIndex] : null

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, isActive } = props
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={isActive ? Number(outerRadius) + 3 : outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <div className="relative w-[160px] h-[160px]">
        <ChartContainer config={config} className="w-full h-full aspect-square">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              shape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => {
                const colorVal = entry.color || `var(--color-${entry[nameKey]})`
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorVal}
                    className="stroke-background hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ChartContainer>

        {(centerLabel || centerSublabel) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
              {activeSegment ? activeSegment[nameKey] : centerSublabel}
            </span>
            <span className="text-sm font-extrabold text-foreground mt-0.5 font-mono">
              {activeSegment
                ? centerFormatter
                  ? centerFormatter(activeSegment[dataKey])
                  : activeSegment[dataKey]
                : centerLabel}
            </span>
            {activeSegment && activeSegment.percentage !== undefined && (
              <span className="text-[10px] font-bold text-muted-foreground">
                {activeSegment.percentage.toFixed(1)}%
              </span>
            )}
          </div>
        )}
      </div>

      {showLegend && (
        <div className="w-full mt-4 flex flex-col gap-1.5 text-xs text-card-foreground">
          {data.map((item, index) => {
            const isHovered = activeIndex === index
            const colorVal = item.color || `var(--color-${item[nameKey]})`
            return (
              <div
                key={item[nameKey]}
                className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
                  isHovered ? "bg-accent/40 font-semibold" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: colorVal }}
                  />
                  <span className="truncate max-w-[120px] text-muted-foreground">
                    {item[nameKey]}
                  </span>
                </div>
                <div className="text-right whitespace-nowrap shrink-0">
                  <span className="font-medium mr-1 text-foreground font-mono">
                    {centerFormatter ? centerFormatter(item[dataKey]) : item[dataKey]}
                  </span>
                  {item.percentage !== undefined && (
                    <span className="text-muted-foreground text-[10px]">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
