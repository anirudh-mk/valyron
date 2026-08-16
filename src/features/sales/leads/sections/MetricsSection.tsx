import React from "react";
import { Phone, Sparkles, User, UserPlus, Users, X } from "lucide-react";
import MetricsGrid from "@/components/app/MetricsGrid.tsx";

export default function MetricsSection() {
  return (
    <MetricsGrid
      items={[
        {
          label: "Total Leads",
          value: 468,
          change: "▲ 18.6% vs Apr 2026",
          color: "bg-blue-50 text-blue-600",
          icon: Users
        },
        {
          label: "New Leads",
          value: 126,
          change: "▲ 12.3% vs Apr 2026",
          color: "bg-purple-50 text-purple-600",
          icon: UserPlus
        },
        {
          label: "Contacted",
          value: 182,
          change: "▲ 9.8% vs Apr 2026",
          color: "bg-blue-50 text-blue-600",
          icon: Phone
        },
        {
          label: "Qualified",
          value: 96,
          change: "▲ 15.7% vs Apr 2026",
          color: "bg-emerald-50 text-emerald-600",
          icon: User
        },
        {
          label: "Converted",
          value: 64,
          change: "▲ 11.4% vs Apr 2026",
          color: "bg-emerald-50 text-emerald-600",
          icon: Sparkles
        },
        {
          label: "Lost / Disqualified",
          value: 28,
          change: "▼ -6.3% vs Apr 2026",
          color: "bg-rose-50 text-rose-600",
          icon: X
        },
      ]}
    />
  );
}