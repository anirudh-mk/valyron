import React from "react";
import { Phone, Sparkles, User, UserPlus, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/base/card.tsx";

export default function MetricsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[
        {
          label: "Total Leads",
          count: 468,
          change: "▲ 18.6% vs Apr 2026",
          color: "bg-blue-50 text-blue-600",
          icon: Users
        },
        {
          label: "New Leads",
          count: 126,
          change: "▲ 12.3% vs Apr 2026",
          color: "bg-purple-50 text-purple-600",
          icon: UserPlus
        },
        {
          label: "Contacted",
          count: 182,
          change: "▲ 9.8% vs Apr 2026",
          color: "bg-blue-50 text-blue-600",
          icon: Phone
        },
        {
          label: "Qualified",
          count: 96,
          change: "▲ 15.7% vs Apr 2026",
          color: "bg-emerald-50 text-emerald-600",
          icon: User
        },
        {
          label: "Converted",
          count: 64,
          change: "▲ 11.4% vs Apr 2026",
          color: "bg-emerald-50 text-emerald-600",
          icon: Sparkles
        },
        {
          label: "Lost / Disqualified",
          count: 28,
          change: "▼ -6.3% vs Apr 2026",
          color: "bg-rose-50 text-rose-600",
          icon: X
        },
      ].map((kpi, idx) => (
        <Card key={idx} className=" hover:shadow-sm transition-shadow">
          <CardContent className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
              <div className="text-xl font-bold text-slate-900 font-mono">{kpi.count}</div>
              <div
                className={`text-[10px] font-bold ${kpi.change.startsWith("▲") ? "text-emerald-600" : "text-rose-600"}`}>
                {kpi.change}
              </div>
            </div>
            <div className={`p-2.5 rounded-xl shrink-0 ${kpi.color}`}>
              <kpi.icon className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}