import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Avatar, AvatarFallback } from "@/components/base/avatar.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  ArrowLeft,
  Save,
  X,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Activity,
  FileText,
  TrendingUp,
  Tag,
  Briefcase,
  AlertCircle
} from "lucide-react";

export default function LeadCreate() {
  const navigate = useNavigate();

  // Form State
  const [leadName, setLeadName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [source, setSource] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("New");
  const [closeDate, setCloseDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("Arjun Jose");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [description, setDescription] = useState("");

  const [activeTab, setActiveTab] = useState<"info" | "additional" | "notes" | "attachments">("info");

  // Dynamic Checklist Calculation
  const isLeadNameAdded = leadName.trim().length > 0;
  const isContactPersonAdded = contactPerson.trim().length > 0;
  const isEmailOrPhoneAdded = email.trim().length > 0 || phone.trim().length > 0 || mobile.trim().length > 0;
  const isLeadOwnerAssigned = assignedTo.trim().length > 0;
  const isLeadSourceSelected = source.trim().length > 0;

  const checklistItems = [
    { label: "Add Lead Name", checked: isLeadNameAdded },
    { label: "Add Contact Person", checked: isContactPersonAdded },
    { label: "Add Email or Phone", checked: isEmailOrPhoneAdded },
    { label: "Assign Lead Owner", checked: isLeadOwnerAssigned },
    { label: "Select Lead Source", checked: isLeadSourceSelected },
  ];

  const completedCount = checklistItems.filter((i) => i.checked).length;
  const completedPct = Math.round((completedCount / checklistItems.length) * 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !contactPerson || !status || !assignedTo) {
      alert("Please fill in all required fields (marked with *)");
      return;
    }
    // Redirect back to leads list
    navigate("/dashboard/sales/leads");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigate("/dashboard/sales/leads")}>Leads</span>
            <span>&gt;</span>
            <span className="text-slate-600">Create Lead</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Create New Lead</h1>
        </div>

        {/* Form controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard/sales/leads")}
            className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700"
          >
            <X className="h-4 w-4 text-slate-400" />
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="bg-white border-slate-200 gap-1.5 font-semibold text-xs text-slate-700"
          >
            Save &amp; New
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 font-semibold text-xs"
          >
            <Save className="h-4 w-4" />
            Save Lead
          </Button>
        </div>
      </div>

      {/* --- Main Tab Navigation --- */}
      <div className="flex border-b border-slate-200/80 text-xs font-bold text-slate-500 gap-1">
        {[
          { id: "info", label: "Lead Information", icon: User },
          { id: "additional", label: "Additional Information", icon: Briefcase },
          { id: "notes", label: "Notes", icon: FileText },
          { id: "attachments", label: "Attachments", icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${activeTab === tab.id ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-700 hover:bg-slate-50/50"}`}
          >
            <tab.icon className="h-4 w-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- Main Dual-Column Grid --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Form Block */}
        <Card className="col-span-12 xl:col-span-9 border-slate-100 p-6">
          <form onSubmit={handleSave} className="flex flex-col gap-6 text-xs font-medium text-slate-700">
            
            {activeTab === "info" && (
              <>
                {/* Basic Information section */}
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-sm text-slate-900 border-b pb-1.5 select-none">
                    Basic Information
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Lead Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Lead Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Enter lead name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        required
                      />
                    </div>
                    {/* Contact Person */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Contact Person <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        placeholder="Enter contact person name"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        required
                      />
                    </div>
                    {/* Job Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Job Title</label>
                      <input
                        type="text"
                        placeholder="Enter job title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Company</label>
                      <input
                        type="text"
                        placeholder="Enter company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="Enter email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                    </div>
                    {/* Website */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Enter website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Lead Source */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Lead Source</label>
                      <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">Select source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Advertisement">Advertisement</option>
                      </select>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Phone</label>
                      <div className="flex gap-1.5">
                        <select className="p-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none w-20 font-semibold cursor-pointer">
                          <option>🇮🇳 +91</option>
                          <option>🇺🇸 +1</option>
                          <option>🇬🇧 +44</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="p-2 flex-1 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                    </div>
                    {/* Mobile */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Mobile</label>
                      <div className="flex gap-1.5">
                        <select className="p-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none w-20 font-semibold cursor-pointer">
                          <option>🇮🇳 +91</option>
                          <option>🇺🇸 +1</option>
                          <option>🇬🇧 +44</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Enter mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="p-2 flex-1 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Lead Score */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Lead Score</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Enter lead score"
                          value={score}
                          onChange={(e) => setScore(e.target.value)}
                          className="p-2 w-full border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                          max={100}
                          min={0}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">/ 100</span>
                      </div>
                    </div>
                    {/* Lead Status */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Lead Status <span className="text-rose-500">*</span></label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                        required
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost / Disqualified</option>
                      </select>
                    </div>
                    {/* Expected Close Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Expected Close Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="date"
                          value={closeDate}
                          onChange={(e) => setCloseDate(e.target.value)}
                          className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Assigned To */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Assigned To <span className="text-rose-500">*</span></label>
                      <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                        required
                      >
                        <option value="Arjun Jose">Arjun Jose</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Mike Johnson">Mike Johnson</option>
                        <option value="Rahul Sharma">Rahul Sharma</option>
                      </select>
                    </div>
                    {/* Priority */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Priority</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Tags</label>
                      <div className="relative">
                        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Select or type tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="flex flex-col gap-4 pt-6 border-t border-slate-100 mt-2">
                  <div className="font-bold text-sm text-slate-900 border-b pb-1.5 select-none">
                    Address Information
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address Line 1 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Address Line 1</label>
                      <input
                        type="text"
                        placeholder="Enter address line 1"
                        value={addr1}
                        onChange={(e) => setAddr1(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                    {/* Address Line 2 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Address Line 2</label>
                      <input
                        type="text"
                        placeholder="Enter address line 2"
                        value={addr2}
                        onChange={(e) => setAddr2(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Country */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                    {/* State */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">State</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">Select state</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                      </select>
                    </div>
                    {/* City */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">City</label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                    {/* Pincode */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-600">Pincode</label>
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="flex flex-col gap-4 pt-6 border-t border-slate-100 mt-2">
                  <div className="font-bold text-sm text-slate-900 border-b pb-1.5 select-none">
                    Description
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-600">Lead Description</label>
                    <div className="relative">
                      <textarea
                        placeholder="Enter description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border border-slate-200 rounded-lg bg-slate-50/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold w-full min-h-[100px] max-h-[250px]"
                        maxLength={1000}
                      />
                      <span className="absolute right-3.5 bottom-3.5 text-slate-400 font-bold select-none text-[10px]">
                        {description.length}/1000
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "additional" && (
              <div className="py-6 text-center text-slate-400 font-semibold">
                Additional sections form elements appear here.
              </div>
            )}

            {activeTab === "notes" && (
              <div className="py-6 text-center text-slate-400 font-semibold">
                Manage notes for this lead setup here.
              </div>
            )}

            {activeTab === "attachments" && (
              <div className="py-6 text-center text-slate-400 font-semibold">
                Attach files and documents here.
              </div>
            )}

          </form>
        </Card>

        {/* Right Side: Sidebar Checklist & Summary */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Lead Summary Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Lead Status</span>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-bold hover:bg-purple-100">
                  {status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Lead Source</span>
                <span className="font-bold text-slate-800">{source || "--"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Assigned To</span>
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5 text-[9px] font-bold">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full">
                      AJ
                    </div>
                  </Avatar>
                  <span className="font-bold text-slate-800">{assignedTo}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Created On</span>
                <span className="font-bold text-slate-800">21 May 2026, 10:30 AM</span>
              </div>
            </CardContent>
          </Card>

          {/* Checklist Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Checklist</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3.5 text-xs">
              
              {/* Checklist Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span>{completedPct}% Completed</span>
                  <span>{completedCount}/{checklistItems.length}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${completedPct}%` }}
                  />
                </div>
              </div>

              {/* Checklist list items */}
              <div className="flex flex-col gap-2.5">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div
                      className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                        item.checked
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "border-slate-200 text-transparent"
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className={`font-semibold ${item.checked ? "text-slate-500 line-through" : "text-slate-700"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-slate-100 bg-amber-50/30 border-amber-100">
            <CardContent className="p-4 flex gap-3 text-xs">
              <HelpCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-extrabold text-amber-800">Tips</span>
                <p className="text-amber-700/90 font-medium leading-relaxed">
                  Capture as much information as possible about your lead to improve conversion opportunities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Count Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Related</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5 text-xs text-slate-600 font-semibold">
              <div className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
                <span>Activities</span>
                <span className="font-bold font-mono">0</span>
              </div>
              <div className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
                <span>Follow-ups</span>
                <span className="font-bold font-mono">0</span>
              </div>
              <div className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
                <span>Opportunities</span>
                <span className="font-bold font-mono">0</span>
              </div>
              <div className="flex items-center justify-between hover:text-slate-900 cursor-pointer">
                <span>Notes</span>
                <span className="font-bold font-mono">0</span>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
