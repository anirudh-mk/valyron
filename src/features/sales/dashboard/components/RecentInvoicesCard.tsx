import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Badge } from "@/components/base/badge"
import { Button } from "@/components/base/button"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "Paid" | "Sent" | "Overdue"
}

const statusStyles: Record<Invoice["status"], string> = {
  Paid:    "bg-emerald-50 text-emerald-700 border-emerald-100",
  Sent:    "bg-blue-50 text-blue-700 border-blue-100",
  Overdue: "bg-rose-50 text-rose-700 border-rose-100",
}

const invoices: Invoice[] = [
  { id: "INV-2026-000152", date: "21 May 2026", amount: 56250,  status: "Paid"    },
  { id: "INV-2026-000151", date: "20 May 2026", amount: 48900,  status: "Paid"    },
  { id: "INV-2026-000150", date: "19 May 2026", amount: 34750,  status: "Sent"    },
  { id: "INV-2026-000149", date: "18 May 2026", amount: 22650,  status: "Overdue" },
  { id: "INV-2026-000148", date: "17 May 2026", amount: 15250,  status: "Paid"    },
]

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val)

export function RecentInvoicesCard() {
  return (
    <Card className="border-slate-100 flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
        <CardTitle className="text-sm font-bold text-slate-800">Recent Invoices</CardTitle>
        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold p-0 h-auto"
        >
          View all
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[225px] pr-1">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between text-xs py-1 hover:bg-slate-50 transition-colors rounded px-1"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-slate-800">{inv.id}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 font-mono">
                  {formatCurrency(inv.amount)}
                </span>
                <Badge
                  variant="outline"
                  className={`px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase ${statusStyles[inv.status]}`}
                >
                  {inv.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
