import React from "react";
import PageHeader from "@/components/app/PageHeader.tsx";
import DashboardHeaderControls from "./DashboardHeaderControls.tsx";

interface DashboardHeaderProps {
  isStarred: boolean;
  setIsStarred: (starred: boolean) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  activeFilterBranch: string;
  setActiveFilterBranch: (branch: string) => void;
}

export function DashboardHeader({
  isStarred,
  setIsStarred,
  dateRange,
  setDateRange,
  activeFilterBranch,
  setActiveFilterBranch
}: DashboardHeaderProps) {
  return (
    <PageHeader
      title="Sales Dashboard"
      description="Overview of your sales performance and key metrics."
      isStarred={isStarred}
      onStarToggle={() => setIsStarred(!isStarred)}
    >
      <DashboardHeaderControls
        dateRange={dateRange}
        setDateRange={setDateRange}
        activeFilterBranch={activeFilterBranch}
        setActiveFilterBranch={setActiveFilterBranch}
      />
    </PageHeader>
  );
}

export default DashboardHeader;
