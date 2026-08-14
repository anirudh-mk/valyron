import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Separator } from "@/components/base/separator.tsx";
import { Progress } from "@/components/base/progress.tsx";
import { Users, Building2, MapPin, CheckCircle, Clock, AlertTriangle, FileText, ArrowRight, ShieldCheck, User, Plus } from "lucide-react";
import { type SupplierContact } from "./SupplierContactsSection";
import { type SupplierAddress } from "./SupplierAddressesSection";

export interface SupplierPreviewData {
  name: string;
  code: string;
  type: string;
  phone: string;
  email: string;
  currency: string;
  creditLimit: string;
  outstanding: string;
  overdue: string;
  paymentTerms: string;
  notes: string;
  group?: string;
  industry?: string;
}

interface SupplierPreviewSectionProps {
  supplier: SupplierPreviewData;
  contacts: SupplierContact[];
  addresses: SupplierAddress[];
  setActiveTab: (tab: string) => void;
  activeTab?: string;
}

export default function SupplierPreviewSection({
  supplier,
  contacts,
  addresses,
  setActiveTab,
  activeTab = "general",
}: SupplierPreviewSectionProps) {
  const parseAmount = (val: string) => {
    const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const limitNum = parseAmount(supplier.creditLimit || "500000.00");
  const outstandingNum = parseAmount(supplier.outstanding || "125000.00");
  const overdueNum = parseAmount(supplier.overdue || "25000.00");

  const availableCreditNum = Math.max(0, limitNum - outstandingNum);
  const utilization = limitNum > 0 ? Math.min(100, Math.round((outstandingNum / limitNum) * 100)) : 0;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formattedLimit = formatCurrency(limitNum);
  const formattedOutstanding = formatCurrency(outstandingNum);
  const formattedOverdue = formatCurrency(overdueNum);
  const formattedAvailable = formatCurrency(availableCreditNum);

  const getAddressBadge = (addr: SupplierAddress) => {
    if (addr.isBilling && addr.isShipping) {
      return (
        <span className="text-[8px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-1 py-0.5 rounded-sm shrink-0">
          Billing, Shipping
        </span>
      );
    }
    if (addr.isBilling) {
      return (
        <span className="text-[8px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded-sm shrink-0">
          Billing
        </span>
      );
    }
    if (addr.isShipping) {
      return (
        <span className="text-[8px] font-bold bg-orange-500/10 text-orange-500 px-1 py-0.5 rounded-sm shrink-0">
          Shipping
        </span>
      );
    }
    return null;
  };

  // Rendering content contextually based on tab selection
  const renderTabSpecificCards = () => {
    switch (activeTab) {
      case "purchasing-pricing":
        return (
          <>
            {/* Purchase Overview Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Purchase Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Purchase (YTD)</span>
                    <span className="font-semibold text-foreground">₹ 18,75,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open POs</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">₹ 4,25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GRN Pending</span>
                    <span className="font-bold text-orange-500">₹ 1,25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overdue POs</span>
                    <span className="font-bold text-destructive font-semibold">₹ 85,000.00</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-muted-foreground">On-Time Delivery</span>
                    <span className="text-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Purchases List */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Purchases</CardTitle>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {[
                    { code: "PO-000145", date: "15 May 2026", amount: "₹ 48,750.00", status: "Received", badge: "bg-green-500/10 text-green-600 dark:text-green-400" },
                    { code: "PO-000132", date: "10 May 2026", amount: "₹ 1,25,000.00", status: "Partially Received", badge: "bg-orange-500/10 text-orange-500" },
                    { code: "PO-000120", date: "02 May 2026", amount: "₹ 36,540.00", status: "Pending", badge: "bg-blue-500/10 text-blue-500" },
                    { code: "PO-000110", date: "28 Apr 2026", amount: "₹ 22,800.00", status: "Received", badge: "bg-green-500/10 text-green-600 dark:text-green-400" },
                  ].map((po) => (
                    <div key={po.code} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/30 gap-2">
                      <div className="min-w-0 col-span-1">
                        <p className="text-xs font-bold text-foreground">{po.code}</p>
                        <p className="text-[10px] text-muted-foreground font-semibold">{po.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-xs font-bold text-foreground">{po.amount}</span>
                        <Badge className={`${po.badge} border-none font-semibold text-[8px] py-0.5 px-1.5`}>
                          {po.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "accounting":
        return (
          <>
            {/* Account Overview Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payable Account</span>
                    <span className="font-semibold text-foreground truncate max-w-[150px]">20000 - Accounts Payable</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Opening Balance</span>
                    <span className="font-semibold text-foreground">₹ 25,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payable (YTD)</span>
                    <span className="font-semibold text-foreground">₹ 18,75,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid Amount (YTD)</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">₹ 17,20,000.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="text-orange-500">₹ 1,55,000.00</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="text-destructive">₹ 45,000.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions List */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Transactions</CardTitle>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {[
                    { code: "BILL-000145", date: "15 May 2026", amount: "₹ 48,750.00", status: "Open", badge: "bg-blue-500/10 text-blue-500" },
                    { code: "PAY-000098", date: "12 May 2026", amount: "₹ 25,000.00", status: "Paid", badge: "bg-green-500/10 text-green-600 dark:text-green-400" },
                    { code: "BILL-000138", date: "05 May 2026", amount: "₹ 1,25,000.00", status: "Partially Paid", badge: "bg-orange-500/10 text-orange-500" },
                    { code: "PAY-000092", date: "28 Apr 2026", amount: "₹ 36,540.00", status: "Paid", badge: "bg-green-500/10 text-green-600 dark:text-green-400" },
                  ].map((tx) => (
                    <div key={tx.code} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/30 gap-2">
                      <div className="min-w-0 col-span-1">
                        <p className="text-xs font-bold text-foreground">{tx.code}</p>
                        <p className="text-[10px] text-muted-foreground font-semibold">{tx.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-xs font-bold text-foreground">{tx.amount}</span>
                        <Badge className={`${tx.badge} border-none font-semibold text-[8px] py-0.5 px-1.5`}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      case "documents":
        return (
          <>
            {/* Document Summary Card with Donut Chart */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Document Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center items-center gap-6 py-2">
                  {/* SVG Donut Chart */}
                  <div className="relative h-18 w-18 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      {/* Grey background ring */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                      {/* Verified Segment: 5 / 8 = 62.5% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="hsl(var(--success, 142 76% 36%))"
                        strokeWidth="3"
                        strokeDasharray="62.5 37.5"
                        strokeDashoffset="0"
                      />
                      {/* Expiring Soon Segment: 1 / 8 = 12.5% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        strokeDasharray="12.5 87.5"
                        strokeDashoffset="-62.5"
                      />
                      {/* Expired Segment: 2 / 8 = 25% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="3"
                        strokeDasharray="25 75"
                        strokeDashoffset="-75"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-extrabold text-foreground leading-none">8</span>
                      <span className="text-[7px] text-muted-foreground font-bold tracking-wider uppercase mt-0.5">Total</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[10px] font-bold flex-1">
                    <div className="flex items-center justify-between text-success">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Verified
                      </span>
                      <span>5</span>
                    </div>
                    <div className="flex items-center justify-between text-orange-500">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Expiring Soon
                      </span>
                      <span>1</span>
                    </div>
                    <div className="flex items-center justify-between text-destructive">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Expired
                      </span>
                      <span>2</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted" /> Not Uploaded
                      </span>
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <button
                  type="button"
                  className="w-full text-center text-xs font-semibold text-primary hover:underline block"
                >
                  View all documents
                </button>
              </CardContent>
            </Card>

            {/* Recent Documents list */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Documents</CardTitle>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {[
                  { name: "GST Registration Certificate", date: "01 Apr 2024", badge: "bg-green-500/10 text-green-600 dark:text-green-400", status: "Verified" },
                  { name: "Bank Statement", date: "01 May 2024", badge: "bg-orange-500/10 text-orange-500", status: "Expiring Soon" },
                  { name: "ISO 9001:2015 Certificate", date: "10 Jan 2024", badge: "bg-red-500/10 text-red-600 dark:text-red-400", status: "Expired" },
                  { name: "Trade License", date: "05 Apr 2024", badge: "bg-green-500/10 text-green-600 dark:text-green-400", status: "Verified" },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/30 gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate" title={doc.name}>
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-semibold">{doc.date}</p>
                    </div>
                    <Badge className={`${doc.badge} border-none font-semibold text-[8px] py-0.5 px-1.5 shrink-0`}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        );

      case "additional":
        return (
          <>
            {/* Additional Overview Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Additional Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supplier Group</span>
                    <span className="font-semibold text-foreground">{supplier.group || "Local Suppliers"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry Type</span>
                    <span className="font-semibold text-foreground">{supplier.industry || "Manufacturing"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supplier Category</span>
                    <span className="font-semibold text-foreground">Raw Materials</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST Treatment</span>
                    <span className="font-semibold text-foreground">Registered Business</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Established</span>
                    <span className="font-semibold text-foreground">2015</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certifications</span>
                    <span className="font-bold text-green-600 dark:text-green-400">3</span>
                  </div>
                </div>
                <Separator />
                <button
                  type="button"
                  className="w-full text-center text-xs font-semibold text-primary hover:underline block"
                >
                  View all details
                </button>
              </CardContent>
            </Card>

            {/* Recent Updates Timeline */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Updates</CardTitle>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative pl-5 border-l border-border/40 space-y-4 text-left">
                  {/* Item 1 */}
                  <div className="relative">
                    <span className="absolute -left-[24px] top-0 h-4 w-4 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center">
                      <FileText className="h-2 w-2" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">Document uploaded</p>
                      <p className="text-[10px] text-muted-foreground">GST Registration Certificate</p>
                      <p className="text-[9px] text-muted-foreground font-mono mt-0.5">01 Apr 2024, 10:30 AM</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    <span className="absolute -left-[24px] top-0 h-4 w-4 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
                      <User className="h-2 w-2" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">Contact added</p>
                      <p className="text-[10px] text-muted-foreground">Ravi Sharma</p>
                      <p className="text-[9px] text-muted-foreground font-mono mt-0.5">01 Apr 2024, 10:28 AM</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <span className="absolute -left-[24px] top-0 h-4 w-4 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
                      <Plus className="h-2.5 w-2.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">Supplier created</p>
                      <p className="text-[10px] text-muted-foreground">John Doe</p>
                      <p className="text-[9px] text-muted-foreground font-mono mt-0.5">01 Apr 2024, 10:25 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );

      default:
        return (
          <>
            {/* 2. Financial Overview Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span className="font-semibold text-foreground">{formattedLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Credit</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{formattedAvailable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outstanding</span>
                    <span className="font-bold text-orange-500">{formattedOutstanding}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="font-bold text-destructive">{formattedOverdue}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-muted-foreground">Credit Utilization</span>
                    <span className="text-foreground">{utilization}%</span>
                  </div>
                  <Progress value={utilization} className="h-1.5" />
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`h-2.5 w-2.5 rounded-full ${outstandingNum <= limitNum ? 'bg-green-500' : 'bg-destructive'}`} />
                  <span className={outstandingNum <= limitNum ? 'text-green-600 dark:text-green-400' : 'text-destructive'}>
                    {outstandingNum <= limitNum ? "Within Limit" : "Limit Exceeded"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* 3. Recent Contacts Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Contacts</CardTitle>
                <button
                  onClick={() => setActiveTab("contacts")}
                  type="button"
                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                >
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                {contacts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Users className="h-4.5 w-4.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">No contacts added yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {contacts.slice(0, 4).map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/30">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-7 w-7 rounded-full bg-muted text-[10px] font-bold flex items-center justify-center shrink-0">
                            {contact.name.split(/\s+/).map(n => n[0]).join("").substring(0, 2).toUpperCase() || "C"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">
                              {contact.name || "Unnamed"}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {contact.designation || "Contact"}
                            </p>
                          </div>
                        </div>
                        {contact.isPrimary && (
                          <span className="text-[8px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-sm shrink-0">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab("contacts")}
                      type="button"
                      className="w-full text-center text-xs font-semibold text-primary hover:underline mt-2 pt-2 border-t border-border/40 block"
                    >
                      View all contacts &rarr;
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 4. Recent Addresses Card */}
            <Card className="border border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Addresses</CardTitle>
                <button
                  onClick={() => setActiveTab("addresses")}
                  type="button"
                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                >
                  View all
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                {addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mb-2">
                      <MapPin className="h-4.5 w-4.5 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">No addresses configured</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {addresses.slice(0, 3).map((addr) => (
                      <div key={addr.id} className="flex items-start justify-between p-2 rounded-md bg-muted/40 border border-border/30 gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {addr.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate leading-relaxed">
                            {addr.addressLine1}
                          </p>
                        </div>
                        {getAddressBadge(addr)}
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab("addresses")}
                      type="button"
                      className="w-full text-center text-xs font-semibold text-primary hover:underline mt-2 pt-2 border-t border-border/40 block"
                    >
                      View all addresses &rarr;
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="space-y-4 text-left">
      {/* 1. Supplier Summary Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Supplier Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg shrink-0">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate text-sm">{supplier.name || "Acme Supplies Pvt Ltd"}</h4>
              <Badge className="mt-1 bg-green-500/10 text-green-600 dark:text-green-400 border-none text-[10px] font-bold py-0.5 px-2">
                Active
              </Badge>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Code</span>
              <span className="font-semibold text-foreground">{supplier.code || "SUP-000124"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-semibold text-foreground capitalize">{supplier.type || "Goods Supplier"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-semibold text-foreground">{supplier.phone || "+91 98765 43210"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold text-foreground truncate max-w-[180px]">{supplier.email || "supplier@email.com"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span className="font-semibold text-foreground">{supplier.currency || "INR - Indian Rupee"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Terms</span>
              <span className="font-semibold text-foreground">{supplier.paymentTerms || "Net 30"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {renderTabSpecificCards()}
    </div>
  );
}
