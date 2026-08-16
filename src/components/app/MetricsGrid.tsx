import React from "react";
import { Card, CardContent } from "@/components/base/card.tsx";
import type { LucideIcon } from "lucide-react";

export interface MetricItem {
  label: string;
  value: string | number;
  change: string;
  color?: string;
  icon: LucideIcon;
  iconClass?: string;
}

interface MetricsGridProps {
  items: MetricItem[];
}

export function MetricsGrid({ items }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((kpi, idx) => (
        <Card key={idx}>
          <CardContent className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
              <div className="text-xl font-bold text-slate-900 font-mono">{kpi.value}</div>
              <div
                className={`text-[10px] font-bold ${kpi.change.startsWith("▲") ? "text-emerald-600" : "text-rose-600"}`}>
                {kpi.change}
              </div>
            </div>
            <div className={`p-2.5 rounded-xl shrink-0 ${kpi.color || "bg-slate-50 text-slate-600"}`}>
              <kpi.icon className={`h-4.5 w-4.5 ${kpi.iconClass || ""}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default MetricsGrid;
