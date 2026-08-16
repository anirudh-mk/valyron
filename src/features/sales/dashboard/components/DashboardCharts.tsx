import React, { useMemo } from "react"
import { ReusablePieChart } from "@/components/charts/pie-chart"
import { ReusableBarChart } from "@/components/charts/bar-chart"
import { type ChartConfig } from "@/components/base/chart"

// Formatting helpers
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val)
}

// ----------------------------------------------------
// 1. Sales Trend Bar Chart (This Month vs Last Month)
// ----------------------------------------------------
export interface TrendDataPoint {
  label: string
  thisMonth: number
  lastMonth: number
}

interface SalesTrendChartProps {
  data: TrendDataPoint[]
}

const trendChartConfig: ChartConfig = {
  thisMonth: {
    label: "This Month",
    color: "#2563eb",
  },
  lastMonth: {
    label: "Last Month",
    color: "#cbd5e1",
  },
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const series = useMemo(
    () => [
      { key: "thisMonth", radius: [4, 4, 0, 0] as [number, number, number, number] },
      { key: "lastMonth", radius: [4, 4, 0, 0] as [number, number, number, number] },
    ],
    []
  )

  return (
    <div className="w-full h-[240px]">
      <ReusableBarChart
        data={data}
        config={trendChartConfig}
        xAxisKey="label"
        series={series}
        yFormatter={(v) =>
          new Intl.NumberFormat("en-IN", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(v)
        }
        className="w-full h-full"
      />
    </div>
  )
}

// ----------------------------------------------------
// 2. Donut Chart (Segment-based Ring with Hover states)
// ----------------------------------------------------
export interface DonutDataPoint {
  label: string
  value: number
  percentage: number
  color: string
}

interface DonutChartProps {
  data: DonutDataPoint[]
  centerLabel: string
  centerSublabel: string
}

export function DonutChart({ data, centerLabel, centerSublabel }: DonutChartProps) {
  // Dynamically generate chart config based on data series labels
  const config = useMemo(() => {
    const cfg: ChartConfig = {}
    data.forEach((d) => {
      cfg[d.label] = {
        label: d.label,
        color: d.color,
      }
    })
    return cfg
  }, [data])

  return (
    <ReusablePieChart
      data={data}
      config={config}
      nameKey="label"
      dataKey="value"
      innerRadius="65%"
      outerRadius="85%"
      centerLabel={centerLabel}
      centerSublabel={centerSublabel}
      centerFormatter={formatCurrency}
      showLegend={true}
    />
  )
}

// ----------------------------------------------------
// 3. Sales Comparison Dual Bar Chart
// ----------------------------------------------------
export interface BarDataPoint {
  label: string
  thisYear: number
  lastYear: number
}

interface SalesComparisonChartProps {
  data: BarDataPoint[]
}

const comparisonChartConfig: ChartConfig = {
  thisYear: {
    label: "This Year",
    color: "#2563eb",
  },
  lastYear: {
    label: "Last Year",
    color: "#cbd5e1",
  },
}

export function SalesComparisonChart({ data }: SalesComparisonChartProps) {
  const series = useMemo(
    () => [
      { key: "thisYear", radius: [3, 3, 0, 0] as [number, number, number, number] },
      { key: "lastYear", radius: [3, 3, 0, 0] as [number, number, number, number] },
    ],
    []
  )

  return (
    <div className="w-full h-[240px]">
      <ReusableBarChart
        data={data}
        config={comparisonChartConfig}
        xAxisKey="label"
        series={series}
        yFormatter={formatCurrency}
        className="w-full h-full"
      />
    </div>
  )
}
