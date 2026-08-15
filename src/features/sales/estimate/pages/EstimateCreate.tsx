import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/base/card.tsx";
import { Button } from "@/components/base/button.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/table.tsx";
import {
  ArrowLeft,
  Save,
  X,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  ChevronDown,
  Upload,
  Info
} from "lucide-react";

// --- Types ---
export interface LineItem {
  id: string;
  code: string;
  name: string;
  description: string;
  qty: number;
  uom: string;
  rate: number;
  discountPct: number;
}

export default function EstimateCreate() {
  const navigate = useNavigate();

  // Preset Line Items
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", code: "PRD-0001", name: "Laptop Dell XPS 13", description: "13.4\" FHD, i7, 16GB RAM, 512GB SSD", qty: 2, uom: "Nos", rate: 78500, discountPct: 5 },
    { id: "2", code: "PRD-0005", name: "Wireless Mouse - Logitech", description: "Logitech MX Master 3S", qty: 2, uom: "Nos", rate: 8200, discountPct: 0 },
    { id: "3", code: "PRD-0012", name: "USB-C Hub 7-in-1", description: "7 Port USB-C Hub", qty: 2, uom: "Nos", rate: 3250, discountPct: 0 },
    { id: "4", code: "SRV-0003", name: "Installation and Setup", description: "On-site installation and configuration", qty: 1, uom: "Job", rate: 5000, discountPct: 0 },
  ]);

  // Form Fields
  const [customer, setCustomer] = useState("Glow Systems Pvt Ltd");
  const [contactPerson, setContactPerson] = useState("Rahul Sharma");
  const [estimateNo, setEstimateNo] = useState("EST-2026-0513");
  const [estimateDate, setEstimateDate] = useState("2026-05-31");
  const [validTill, setValidTill] = useState("2026-06-14");
  const [salesperson, setSalesperson] = useState("Arjun Jose");
  const [priceList, setPriceList] = useState("Standard Selling");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [deliveryTerms, setDeliveryTerms] = useState("Ex-Works");
  const [project, setProject] = useState("ERP Implementation");
  const [remarks, setRemarks] = useState("");
  const [privateNote, setPrivateNote] = useState("");

  const [activeTab, setActiveTab] = useState<"details" | "additional">("details");

  // Calculations
  const calculations = useMemo(() => {
    let subtotal = 0;
    let discountTotal = 0;

    items.forEach((item) => {
      const lineCost = item.qty * item.rate;
      const discountVal = lineCost * (item.discountPct / 100);
      subtotal += lineCost;
      discountTotal += discountVal;
    });

    const taxableAmount = subtotal - discountTotal;
    
    // Tax Rates: CGST 9% and SGST 9%
    const cgst = Math.round(taxableAmount * 0.09 * 100) / 100;
    const sgst = Math.round(taxableAmount * 0.09 * 100) / 100;
    
    const unroundedTotal = taxableAmount + cgst + sgst;
    const grandTotal = Math.round(unroundedTotal);
    const roundingOff = Math.round((grandTotal - unroundedTotal) * 100) / 100;

    return {
      subtotal,
      discountTotal,
      taxableAmount,
      cgst,
      sgst,
      roundingOff,
      grandTotal,
    };
  }, [items]);

  // Edit Handlers
  const handleItemChange = (id: string, field: keyof LineItem, val: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: val };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      code: "PRD-0000",
      name: "New Product/Service",
      description: "Description note here",
      qty: 1,
      uom: "Nos",
      rate: 0,
      discountPct: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 text-foreground p-6 gap-6">
      
      {/* --- Page Header Toolbar --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 rounded-full" onClick={() => navigate("/dashboard/sales/estimate")}>
            <ArrowLeft className="h-4.5 w-4.5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Estimate</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Create a new sales estimate for your customer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-xs" onClick={() => navigate("/dashboard/sales/estimate")}>
            Cancel
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 font-bold text-xs">
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/sales/estimate/details")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5"
          >
            <Save className="h-4 w-4" />
            Save &amp; Submit
            <ChevronDown className="h-3.5 w-3.5 border-l border-blue-500 pl-1.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* --- Main Grid Layout --- */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Form Main Area (left-center) */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          
          {/* Section: Details Tabs Header */}
          <div className="flex border-b border-slate-200 text-xs font-bold text-slate-400 gap-1 mt-2">
            {[
              { id: "details", label: "Estimate Details" },
              { id: "additional", label: "Additional Info" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2.5 px-5 border-b-2 font-semibold transition-colors ${isActive ? "border-blue-600 text-blue-700 font-bold bg-white" : "border-transparent hover:text-slate-600"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Card className="border-slate-100">
            <CardContent className="p-6 flex flex-col gap-6 text-xs text-slate-600">
              
              {activeTab === "details" && (
                <>
                  {/* Grid 1: Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* Customer */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-bold text-slate-700">Customer <span className="text-rose-500">*</span></label>
                      <select
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Glow Systems Pvt Ltd">Glow Systems Pvt Ltd</option>
                        <option value="TechNova Solutions">TechNova Solutions</option>
                        <option value="Bright Retailers">Bright Retailers</option>
                        <option value="Cloud Infra Pvt Ltd">Cloud Infra Pvt Ltd</option>
                      </select>
                      <div className="text-[10px] text-slate-400 mt-1 font-medium bg-slate-50 p-2 border rounded leading-relaxed">
                        #45, 2nd Floor, Residency Road, Bengaluru, Karnataka - 560025, India
                        <button className="text-blue-600 font-bold ml-1.5 hover:underline">View Details</button>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-bold text-slate-700">Contact Person <span className="text-rose-500">*</span></label>
                      <select
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Rahul Sharma">Rahul Sharma</option>
                        <option value="Priya Nair">Priya Nair</option>
                        <option value="Amit Verma">Amit Verma</option>
                      </select>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-semibold">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> rahul@glowsys.com</span>
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91 98765 43210</span>
                      </div>
                    </div>

                    {/* Estimate No */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Estimate No. <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        value={estimateNo}
                        onChange={(e) => setEstimateNo(e.target.value)}
                        className="p-2 border rounded-lg bg-slate-50 font-mono font-bold text-slate-800 focus:outline-none focus:bg-white"
                      />
                    </div>

                    {/* Estimate Date */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Estimate Date <span className="text-rose-500">*</span></label>
                      <input
                        type="date"
                        value={estimateDate}
                        onChange={(e) => setEstimateDate(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                    {/* Valid Till */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Valid Till <span className="text-rose-500">*</span></label>
                      <input
                        type="date"
                        value={validTill}
                        onChange={(e) => setValidTill(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 font-bold">(14 days validity)</span>
                    </div>

                    {/* Salesperson */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Salesperson <span className="text-rose-500">*</span></label>
                      <select
                        value={salesperson}
                        onChange={(e) => setSalesperson(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Arjun Jose">Arjun Jose</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Mike Johnson">Mike Johnson</option>
                      </select>
                    </div>

                  </div>

                  {/* Grid 2: Terms and Pricing lists */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                    
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Price List <span className="text-rose-500">*</span></label>
                      <select
                        value={priceList}
                        onChange={(e) => setPriceList(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Standard Selling">Standard Selling</option>
                        <option value="Distributor Price">Distributor Price</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Currency <span className="text-rose-500">*</span></label>
                      <select className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none">
                        <option>INR - Indian Rupee</option>
                        <option>USD - US Dollar</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Payment Terms</label>
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Net 30">Net 30</option>
                        <option value="Net 15">Net 15</option>
                        <option value="Net 60">Net 60</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Delivery Terms</label>
                      <select
                        value={deliveryTerms}
                        onChange={(e) => setDeliveryTerms(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Ex-Works">Ex-Works</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Delivery Date</label>
                      <input type="date" defaultValue="2026-06-07" className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700">Project (Optional)</label>
                      <select
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="ERP Implementation">ERP Implementation</option>
                        <option value="Store Setup">Store Setup</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="font-bold text-slate-700">Remarks</label>
                      <input
                        type="text"
                        placeholder="Remarks or special instructions..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="p-2 border rounded-lg bg-white font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                  </div>
                </>
              )}

              {activeTab === "additional" && (
                <div className="py-8 text-center text-slate-400 font-semibold">
                  Additional configuration, taxes configurations, or customer references.
                </div>
              )}

            </CardContent>
          </Card>

          {/* Items Line Editor Section */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/20 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">Items ({items.length})</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 font-semibold text-xs text-slate-700" onClick={handleAddItem}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Row
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 font-semibold text-xs text-slate-700">
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto min-w-0">
                <Table className="text-xs w-full">
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 text-center py-2">#</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold w-1/4">Item Code / Name</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold w-1/3">Description</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold w-16 text-center">Qty</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold w-16">UOM</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold text-right w-24">Rate (₹)</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold text-center w-20">Discount</TableHead>
                      <TableHead className="py-2 text-slate-400 font-bold text-right w-28">Amount (₹)</TableHead>
                      <TableHead className="py-2 w-12 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-600 font-medium">
                    {items.map((item, idx) => {
                      const amount = item.qty * item.rate * (1 - item.discountPct / 100);
                      return (
                        <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="text-center py-2.5 font-bold text-slate-400">
                            {idx + 1}
                          </TableCell>
                          
                          {/* Item Code / Name */}
                          <TableCell className="py-2.5">
                            <div className="flex flex-col gap-0.5">
                              <input
                                type="text"
                                value={item.code}
                                onChange={(e) => handleItemChange(item.id, "code", e.target.value)}
                                className="bg-transparent border-0 hover:bg-slate-100/50 p-1 rounded font-bold text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                                className="bg-transparent border-0 hover:bg-slate-100/50 p-1 rounded text-slate-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none text-[10px]"
                              />
                            </div>
                          </TableCell>

                          {/* Description */}
                          <TableCell className="py-2.5">
                            <textarea
                              value={item.description}
                              rows={1}
                              onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                              className="w-full bg-transparent border-0 hover:bg-slate-100/50 p-1 rounded text-slate-655 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed"
                            />
                          </TableCell>

                          {/* Qty */}
                          <TableCell className="py-2.5 text-center">
                            <input
                              type="number"
                              value={item.qty}
                              onChange={(e) => handleItemChange(item.id, "qty", Number(e.target.value))}
                              className="w-12 text-center bg-transparent border hover:bg-slate-150 p-1 rounded font-bold text-slate-800 focus:bg-white focus:outline-none"
                            />
                          </TableCell>

                          {/* UOM */}
                          <TableCell className="py-2.5">
                            <select
                              value={item.uom}
                              onChange={(e) => handleItemChange(item.id, "uom", e.target.value)}
                              className="bg-transparent border rounded p-1 font-semibold text-slate-700 cursor-pointer focus:bg-white focus:outline-none"
                            >
                              <option value="Nos">Nos</option>
                              <option value="Job">Job</option>
                              <option value="Hrs">Hrs</option>
                            </select>
                          </TableCell>

                          {/* Rate */}
                          <TableCell className="py-2.5 text-right">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                              className="w-20 text-right bg-transparent border hover:bg-slate-150 p-1 rounded font-bold text-slate-800 font-mono focus:bg-white focus:outline-none"
                            />
                          </TableCell>

                          {/* Discount */}
                          <TableCell className="py-2.5 text-center">
                            <div className="inline-flex items-center gap-1">
                              <input
                                type="number"
                                value={item.discountPct}
                                onChange={(e) => handleItemChange(item.id, "discountPct", Number(e.target.value))}
                                className="w-10 text-center bg-transparent border hover:bg-slate-150 p-1 rounded font-semibold text-slate-800 focus:bg-white focus:outline-none"
                              />
                              <span className="text-slate-400 font-bold">%</span>
                            </div>
                          </TableCell>

                          {/* Amount */}
                          <TableCell className="py-2.5 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(amount).replace("₹", "").trim()}
                          </TableCell>

                          {/* Delete Action */}
                          <TableCell className="text-center py-2.5">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="h-7 w-7 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 flex items-center justify-center"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Items Bottom Buttons toolbar */}
              <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs font-semibold">
                <Button variant="outline" size="sm" className="h-7 bg-white border-dashed border-slate-300 hover:border-slate-400 font-semibold text-xs text-slate-600" onClick={handleAddItem}>
                  + Add Item
                </Button>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Info className="h-3.5 w-3.5 text-blue-500" />
                  <span>Items total recalculates dynamically inside the summary panel.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Layout: Terms + Signature canvas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Terms & Conditions Box */}
            <Card className="border-slate-100">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100 py-3">
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Terms &amp; Conditions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed text-slate-600">
                <div className="flex items-center gap-1.5 border-b pb-2 mb-1">
                  <span className="font-bold cursor-pointer hover:bg-slate-100 px-1.5 py-0.5 rounded">B</span>
                  <span className="italic cursor-pointer hover:bg-slate-100 px-1.5 py-0.5 rounded">I</span>
                  <span className="underline cursor-pointer hover:bg-slate-100 px-1.5 py-0.5 rounded">U</span>
                  <span className="text-slate-300">|</span>
                  <span className="cursor-pointer hover:bg-slate-100 px-1.5 py-0.5 rounded">List</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 font-semibold text-slate-700">
                  <li>This is an estimate and not a final invoice.</li>
                  <li>Prices are valid till the above mentioned validity date.</li>
                  <li>Goods once sold will not be taken back or exchanged.</li>
                  <li>Payment should be made as per the payment terms.</li>
                  <li>Any taxes applicable will be charged extra as per actual.</li>
                </ol>
              </CardContent>
            </Card>

            {/* Customer Signature Box */}
            <Card className="border-slate-100">
              <CardHeader className="bg-slate-50/30 border-b border-slate-100 py-3 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Signature</CardTitle>
                <button className="text-[10px] font-bold text-blue-600 hover:underline">Clear</button>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center h-[130px] border-2 border-dashed border-slate-200 rounded-lg m-4 mt-2 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Click to add signature</span>
                <span className="text-[9px] text-slate-400 font-medium mt-0.5">Signature will be embedded in the PDF</span>
              </CardContent>
            </Card>

          </div>

        </div>

        {/* Right Summary Sidebar Area */}
        <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
          
          {/* Summary Totals Calculation Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Total Items ({items.length})</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(calculations.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-rose-600">
                <span className="font-semibold text-rose-500">Discount</span>
                <span className="font-bold font-mono">- {formatCurrency(calculations.discountTotal)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-slate-400 font-semibold">Taxable Amount</span>
                <span className="font-bold text-slate-900 font-mono">{formatCurrency(calculations.taxableAmount)}</span>
              </div>

              {/* CGST / SGST list */}
              <div className="flex flex-col gap-1.5 pl-3 border-l border-slate-200 py-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(calculations.cgst)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">SGST @ 9%</span>
                  <span className="font-bold text-slate-800 font-mono">{formatCurrency(calculations.sgst)}</span>
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:underline w-fit">+ Add Tax</button>
              </div>

              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-slate-400 font-semibold">Rounding Off</span>
                <span className="font-bold text-slate-800 font-mono">{calculations.roundingOff}</span>
              </div>

              <div className="flex flex-col gap-1 border-t pt-3 mt-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Grand Total</span>
                  <span className="font-extrabold text-blue-600 text-sm font-mono">{formatCurrency(calculations.grandTotal)}</span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold leading-tight">
                  (One Lakh Ninety Eight Thousand Four Hundred Seventy Four Only)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3 text-xs leading-relaxed items-center justify-center border border-dashed rounded-lg m-4 mt-2 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="h-6 w-6 text-slate-400" />
              <span className="font-bold text-slate-655 text-[10px] uppercase text-center">Drag &amp; drop files here</span>
              <span className="text-[8px] text-slate-400 text-center">or click to browse. Max size 10MB</span>
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card className="border-slate-100">
            <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2">
              <textarea
                value={privateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
                placeholder="Add a private note..."
                rows={3}
                className="p-2 border rounded-lg bg-white text-xs font-semibold focus:outline-none w-full resize-none leading-relaxed"
              />
            </CardContent>
          </Card>

          {/* User History Card */}
          <div className="px-4 text-[10px] text-slate-400 font-semibold flex flex-col gap-1 bg-slate-50 border p-3.5 rounded-xl border-slate-200/60">
            <div className="flex items-center justify-between">
              <span>Created By:</span>
              <span className="font-bold text-slate-655">Arjun Jose</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Created On:</span>
              <span className="font-bold text-slate-655">31 May 2026, 11:15 AM</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
