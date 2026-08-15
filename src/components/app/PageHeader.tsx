import {Button} from "@/components/base/button.tsx";
import {ChevronDown, Plus, Upload} from "lucide-react";
import React from "react";
import {Typography} from "@/components/app/Typography.tsx";

export default function PageHeader() {
  return (
    <div className="flex justify-between border-b border-slate-100">
      <div>
        <Typography variant="heading">Leads</Typography>
        <Typography variant="caption" >Manage and track your potential customers.</Typography>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs">
          <Upload className="h-3.5 w-3.5 text-slate-400"/>
          Import Leads
        </Button>
        <Button variant="outline" size="sm" className="bg-white border-slate-200 gap-1.5 font-semibold text-xs">
          More
          <ChevronDown className="h-3.5 w-3.5 text-slate-400"/>
        </Button>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs"
          // onClick={() => navigate("/dashboard/sales/leads/create")}
        >
          <Plus className="h-4 w-4"/>
          New Lead
        </Button>
      </div>
    </div>
  )
}