import React from "react";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import {
  Calendar,
  ChevronDown,
  SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from "@/components/base/dropdown-menu.tsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/base/popover.tsx";

interface DashboardHeaderControlsProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  activeFilterBranch: string;
  setActiveFilterBranch: (branch: string) => void;
}

export function DashboardHeaderControls({
  dateRange,
  setDateRange,
  activeFilterBranch,
  setActiveFilterBranch
}: DashboardHeaderControlsProps) {
  return (
    <>
      {/* Date Picker using shadcn DropdownMenu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50 cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-xs">{dateRange}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border border-slate-200 shadow-xl z-50 text-xs">
          <DropdownMenuLabel className="px-3 py-2 text-slate-400 font-bold border-b select-none">
            Select Date Range
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700 cursor-pointer"
            onClick={() => setDateRange("01 May 2026 - 31 May 2026")}
          >
            May 2026 (Active Month)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700 cursor-pointer"
            onClick={() => setDateRange("01 Apr 2026 - 30 Apr 2026")}
          >
            April 2026 (Previous Month)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors font-medium text-slate-700 cursor-pointer"
            onClick={() => setDateRange("01 Mar 2026 - 31 May 2026")}
          >
            Last 3 Months (Spring)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter Options using shadcn Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50 cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-xs">Filters</span>
            {activeFilterBranch !== "All" && (
              <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100 px-1 text-[10px]">
                {activeFilterBranch}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-4 text-xs flex flex-col gap-3">
          <div className="font-bold text-slate-900 border-b pb-1 select-none flex justify-between items-center">
            <span>Filter Dashboard</span>
            <button
              className="text-blue-600 hover:underline font-medium cursor-pointer"
              onClick={() => setActiveFilterBranch("All")}
            >
              Reset
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 font-semibold mb-1">Branch Location</span>
            {["All", "Main Branch", "HSR Layout", "Whitefield", "Mysore Road"].map((branch) => (
              <label key={branch} className="flex items-center gap-2 py-1 cursor-pointer hover:text-slate-900">
                <input
                  type="radio"
                  name="branchFilter"
                  checked={activeFilterBranch === branch}
                  onChange={() => setActiveFilterBranch(branch)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className={activeFilterBranch === branch ? "font-bold text-blue-700" : "text-slate-600"}>
                  {branch}
                </span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default DashboardHeaderControls;
