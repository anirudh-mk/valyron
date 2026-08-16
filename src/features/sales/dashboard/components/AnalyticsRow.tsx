import React from "react"
import { SalesOverviewCard } from "./SalesOverviewCard"
import { SalesByItemCard } from "./SalesByItemCard"
import { SalesByBranchCard } from "./SalesByBranchCard"
import { SalesComparisonCard } from "./SalesComparisonCard"
import { RecentInvoicesCard } from "./RecentInvoicesCard"
import { ActivityFeedCard } from "./ActivityFeedCard"
import type { BarDataPoint } from "./DashboardCharts"

interface AnalyticsRowProps {
  comparisonData: BarDataPoint[]
}

export function AnalyticsRow({ comparisonData }: AnalyticsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-6 items-stretch">

      {/* ── Row 1 ────────────────────────────────────────────────── */}

      {/* Col 1: Sales Overview */}
      <SalesOverviewCard />

      {/* Col 2: Sales by Item + Sales by Branch stacked */}
      <div className="flex flex-col gap-6">
        <SalesByItemCard />
        <SalesByBranchCard />
      </div>

      {/* Col 3: Recent Invoices — same row height as Sales Overview */}
      <RecentInvoicesCard />

      {/* ── Row 2 ────────────────────────────────────────────────── */}

      {/* Col 1–2: Sales Comparison */}
      <div className="col-span-2 h-full">
        <SalesComparisonCard data={comparisonData} />
      </div>

      {/* Col 3: Activity Feed — same row height as Sales Comparison */}
      <ActivityFeedCard />

    </div>
  )
}
