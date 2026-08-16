import React from "react"
import { FileText, ShoppingBag, Activity, type LucideIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card"
import { Button } from "@/components/base/button"

interface ActivityItem {
  icon: LucideIcon
  color: string
  text: string
  time: string
}

const activities: ActivityItem[] = [
  {
    icon: FileText,
    color: "bg-emerald-50 text-emerald-600",
    text: "Invoice INV-2026-000152 paid by Globax Corporation",
    time: "2 minutes ago",
  },
  {
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    text: "New quotation QUO-2026-00098 created",
    time: "15 minutes ago",
  },
  {
    icon: ShoppingBag,
    color: "bg-purple-50 text-purple-600",
    text: "Sales order SO-2026-00076 converted to invoice",
    time: "1 hour ago",
  },
  {
    icon: Activity,
    color: "bg-amber-50 text-amber-600",
    text: "Payment of ₹ 48,900 received from Tech Solutions Ltd",
    time: "2 hours ago",
  },
]

export function ActivityFeedCard() {
  return (
    <Card className="border-slate-100 flex flex-col h-full">
      <CardHeader className="pb-2 shrink-0">
        <CardTitle className="text-sm font-bold text-slate-800">Activity Feed</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[225px] pr-1">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-3 text-xs leading-relaxed">
              <div
                className={`p-2 rounded-xl shrink-0 h-8 w-8 flex items-center justify-center ${act.color}`}
              >
                <act.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-slate-700">{act.text}</p>
                <span className="text-[10px] text-slate-400 font-semibold">{act.time}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="link"
          className="text-xs text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto justify-start font-bold mt-2 pt-2 border-t border-slate-50 shrink-0"
        >
          View All Activity →
        </Button>
      </CardContent>
    </Card>
  )
}
