import React from "react"
import Grid from "@/components/app/Grid"
import { SalesTrendCard } from "./SalesTrendCard"
import { SalesByCustomerGroupCard } from "./SalesByCustomerGroupCard"
import { SalesByPaymentMethodCard } from "./SalesByPaymentMethodCard"
import { TopCustomersCard } from "./TopCustomersCard"
import type { TrendDataPoint, DonutDataPoint } from "./DashboardCharts"
import type { TopCustomer } from "./TopCustomersCard"

interface ChartsRowProps {
  trendData: TrendDataPoint[]
  customerGroupData: DonutDataPoint[]
  paymentMethodData: DonutDataPoint[]
  centerLabel: string
  topCustomers: TopCustomer[]
  formatCurrency: (val: number) => string
}

export function ChartsRow({
  trendData,
  customerGroupData,
  paymentMethodData,
  centerLabel,
  topCustomers,
  formatCurrency,
}: ChartsRowProps) {
  return (
    <Grid className="items-stretch">

      {/* Sales Trend Line Chart Card */}
      <SalesTrendCard data={trendData} />

      {/* Donut Chart: Customer Group */}
      <SalesByCustomerGroupCard
        data={customerGroupData}
        centerLabel={centerLabel}
      />

      {/* Donut Chart: Payment Method */}
      <SalesByPaymentMethodCard
        data={paymentMethodData}
        centerLabel={centerLabel}
      />

      {/* List Card: Top Customers */}
      <TopCustomersCard customers={topCustomers} formatCurrency={formatCurrency} />

    </Grid>
  )
}
