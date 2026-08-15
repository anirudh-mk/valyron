import React, { useState } from "react";
import { Card } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar } from "@/components/base/avatar.tsx";
import {
  X,
  Edit2,
  Sparkles,
  Phone,
  MoreHorizontal,
  User,
  FileText,
  Upload,
  Activity,
} from "lucide-react";
import type { Lead } from "../pages/LeadsList.tsx";

const getScoreColor = (score: number) => {
  if (score >= 75) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 50) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-rose-100 text-rose-800 border-rose-200";
};

interface LeadDetailsSectionProps {
  selectedLead: Lead;
  setSelectedLeadId: (id: string | null) => void;
}

export default function LeadDetailsSection({
  selectedLead,
  setSelectedLeadId,
}: LeadDetailsSectionProps) {
  const [selectedTab, setSelectedTab] = useState<"overview" | "activities" | "notes" | "files">("overview");

  return (
    <Card className="col-span-12 xl:col-span-4 border-slate-100 border-l-2 shadow-lg sticky top-6 bg-white overflow-hidden max-h-[800px] flex flex-col">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-bold text-slate-900 text-sm truncate max-w-[200px]">
            {selectedLead.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <Badge className="bg-blue-100 text-blue-700 text-[10px] font-bold hover:bg-blue-100">
              {selectedLead.status}
            </Badge>
            <Badge
              variant="outline"
              className={`text-[9px] font-bold ${getScoreColor(selectedLead.score)}`}
            >
              Lead Score: {selectedLead.score}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-slate-400 hover:bg-slate-100"
            onClick={() => setSelectedLeadId(null)}
          >
            <X className="h-4.5 w-4.5" />
          </Button>
        </div>
      </div>

      {/* Quick action button toolbar */}
      <div className="px-4 py-2 bg-slate-50/20 border-b border-slate-100 flex items-center gap-1.5 text-xs">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white"
        >
          <Edit2 className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Convert
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-[11px] gap-1 font-semibold text-slate-700 bg-white"
        >
          <Phone className="h-3.5 w-3.5 text-emerald-600" />
          Follow Up
        </Button>
        <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white ml-auto">
          <MoreHorizontal className="h-4 w-4 text-slate-400" />
        </Button>
      </div>

      {/* Drawer Tabs Header */}
      <div className="border-b border-slate-100 flex text-xs font-bold text-slate-500 bg-slate-50/20">
        {[
          { id: "overview", label: "Overview", icon: User },
          { id: "activities", label: "Activities", icon: FileText },
          { id: "notes", label: "Notes", icon: Edit2 },
          { id: "files", label: "Files", icon: Upload },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 py-2.5 border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              selectedTab === tab.id
                ? "border-blue-600 text-blue-700 font-bold bg-white"
                : "border-transparent hover:bg-slate-50/50 hover:text-slate-700"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5 shrink-0" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Drawer Content Body */}
      <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-5 text-xs text-slate-600 max-h-[580px]">
        {selectedTab === "overview" && (
          <>
            {/* Lead Information */}
            <div className="flex flex-col gap-2.5">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">
                Lead Information
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Lead Name</span>
                  <span className="font-bold text-slate-800">{selectedLead.contactPerson}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Company</span>
                  <span className="font-bold text-slate-800">{selectedLead.company}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Email</span>
                  <span className="font-semibold text-blue-600 hover:underline">{selectedLead.email}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Phone</span>
                  <span className="font-bold text-slate-800">{selectedLead.phone}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Website</span>
                  <span className="font-semibold text-blue-600 hover:underline">
                    {selectedLead.email.split("@")[1]}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Source</span>
                  <span className="font-bold text-slate-800">{selectedLead.source}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Owner</span>
                  <span className="font-bold text-slate-800">{selectedLead.ownerName}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Created On</span>
                  <span className="font-bold text-slate-800">{selectedLead.createdOn}</span>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="flex flex-col gap-2.5 pt-2.5 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">
                Company Details
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Industry</span>
                  <span className="font-bold text-slate-800">{selectedLead.industry}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Employees</span>
                  <span className="font-bold text-slate-800">{selectedLead.employees}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Annual Revenue</span>
                  <span className="font-bold text-slate-800 font-mono">{selectedLead.revenue}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 font-semibold text-[10px]">Location</span>
                  <span className="font-bold text-slate-800">{selectedLead.location}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2.5 pt-2.5 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">
                Notes
              </h4>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 font-semibold text-slate-700 leading-relaxed">
                {selectedLead.notes}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2 pt-2.5 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] text-slate-400">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5 items-center">
                {selectedLead.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200 font-semibold text-[10px] px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 ml-1">
                  + Add Tag
                </button>
              </div>
            </div>
          </>
        )}

        {selectedTab === "activities" && (
          <div className="flex flex-col gap-4 text-center py-6 text-slate-400">
            <Activity className="h-8 w-8 text-slate-300 mx-auto" />
            <span>No activities logged yet for this lead.</span>
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-slate-200 font-bold self-center"
            >
              Log Activity
            </Button>
          </div>
        )}

        {selectedTab === "notes" && (
          <div className="flex flex-col gap-3">
            <div className="font-bold text-slate-800 mb-1">Add a quick note</div>
            <textarea
              placeholder="Type details here..."
              className="w-full min-h-[80px] p-2 border rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold self-end text-xs"
            >
              Save Note
            </Button>
          </div>
        )}

        {selectedTab === "files" && (
          <div className="flex flex-col gap-4 text-center py-8 border border-dashed border-slate-200 rounded-lg bg-slate-50/50 justify-center">
            <Upload className="h-8 w-8 text-slate-300 mx-auto" />
            <div className="flex flex-col gap-1 text-[11px]">
              <span className="font-bold text-slate-700">Drag files here to upload</span>
              <span className="text-slate-400 font-semibold">Or click to browse from device</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
