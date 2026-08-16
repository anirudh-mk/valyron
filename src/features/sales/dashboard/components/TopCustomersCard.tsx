import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Badge } from "@/components/base/badge"
import { Button } from "@/components/base/button"
import { Avatar, AvatarFallback } from "@/components/base/avatar"

export interface TopCustomer {
  name: string
  value: number
  initials: string
  color: string
}

interface TopCustomersCardProps {
  customers: TopCustomer[]
  formatCurrency: (val: number) => string
}

export function TopCustomersCard({ customers, formatCurrency }: TopCustomersCardProps) {
  return (
    <Card className="col-span-12 xl:col-span-2 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold text-slate-800">Top Customers</CardTitle>
        <Badge
          variant="secondary"
          className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5"
        >
          This Month
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          {customers.map((cust) => (
            <div
              key={cust.name}
              className="flex items-center justify-between text-xs py-0.5 hover:bg-slate-50 transition-colors rounded"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback
                    className={`text-[10px] font-bold w-full h-full flex items-center justify-center rounded-full ${cust.color}`}
                  >
                    {cust.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-slate-700 truncate">{cust.name}</span>
              </div>
              <span className="font-bold text-slate-900 whitespace-nowrap shrink-0 font-mono">
                {formatCurrency(cust.value)}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2"
        >
          View All Customers →
        </Button>
      </CardContent>
    </Card>
  )
}
