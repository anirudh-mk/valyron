import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Separator } from "@/components/base/separator.tsx";
import { Progress } from "@/components/base/progress.tsx";
import { Users, Plus, Activity, Clock } from "lucide-react";
import { type CustomerContact } from "./CustomerContactsSection";

export interface CustomerPreviewData {
  name: string;
  code: string;
  type: string;
  phone: string;
  email: string;
  currency: string;
  creditLimit: string;
  outstanding: string;
  overdue: string;
  notes: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  user: string;
}

interface CustomerPreviewSectionProps {
  customer: CustomerPreviewData;
  contacts: CustomerContact[];
  setActiveTab: (tab: string) => void;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    title: "Customer created",
    timestamp: "10 May 2026, 10:30 AM",
    user: "John Doe",
  },
  {
    id: "act-2",
    title: "GST certificate uploaded",
    timestamp: "10 May 2026, 11:45 AM",
    user: "John Doe",
  },
  {
    id: "act-3",
    title: "Credit limit updated",
    timestamp: "12 May 2026, 09:20 AM",
    user: "John Doe",
  },
  {
    id: "act-4",
    title: "Contact Rahul Kumar added",
    timestamp: "12 May 2026, 09:25 AM",
    user: "John Doe",
  },
];

export default function CustomerPreviewSection({
  customer,
  contacts,
  setActiveTab,
}: CustomerPreviewSectionProps) {
  // Helper to extract initials for the avatar
  const getInitials = (name: string) => {
    if (!name) return "C";
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Helper to parse numeric values for financial calculation
  const parseAmount = (val: string) => {
    const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const limitNum = parseAmount(customer.creditLimit || "500000.00");
  const outstandingNum = parseAmount(customer.outstanding || "125000.00");
  const overdueNum = parseAmount(customer.overdue || "25000.00");

  const availableCreditNum = Math.max(0, limitNum - outstandingNum);
  const utilization = limitNum > 0 ? Math.min(100, Math.round((outstandingNum / limitNum) * 100)) : 0;

  // Helper to format currency numbers to Indian format ₹
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

  return (
    <div className="space-y-4">
      {/* 1. Quick Preview Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg shrink-0">
              {getInitials(customer.name)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate text-sm">{customer.name || "Customer Name"}</h4>
              <Badge className="mt-1 bg-green-500/10 text-green-600 dark:text-green-400 border-none text-[10px] font-bold py-0.5 px-2">
                Active
              </Badge>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Code</span>
              <span className="font-semibold text-foreground">{customer.code || "CUS-000124"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-semibold text-foreground capitalize">{customer.type || "Business"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-semibold text-foreground">{customer.phone || "+91 98765 43210"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold text-foreground truncate max-w-[180px]">{customer.email || "customer@acme.com"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span className="font-semibold text-foreground">{customer.currency || "INR - Indian Rupee"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Financial Summary Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Financial Summary</CardTitle>
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

      {/* 3. Contacts Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contacts ({contacts.length})</CardTitle>
          <button
            onClick={() => setActiveTab("contacts")}
            type="button"
            className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="h-3 w-3" /> Add Contact
          </button>
        </CardHeader>
        <CardContent className="space-y-3">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mb-2">
                <Users className="h-4.5 w-4.5 text-muted-foreground" />
              </div>
              <p className="text-xs font-semibold text-foreground">No contacts added yet</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Add primary contact details for this customer.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {contacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border/30">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 rounded-full bg-muted text-[10px] font-bold flex items-center justify-center shrink-0">
                      {`${contact.firstName?.[0] || ""}${contact.lastName?.[0] || ""}`.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {`${contact.firstName} ${contact.lastName}`.trim() || "Unnamed"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {contact.designation || "Contact"}
                      </p>
                    </div>
                  </div>
                  {contact.isPrimary && (
                    <span className="text-[8px] font-bold bg-green-500/10 text-green-600 dark:text-green-400 px-1 py-0.5 rounded-sm shrink-0">
                      Primary
                    </span>
                  )}
                </div>
              ))}
              {contacts.length > 3 && (
                <p className="text-[10px] text-muted-foreground text-center font-semibold pt-1">
                  + {contacts.length - 3} more contact(s)
                </p>
              )}
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

      {/* 4. Recent Activities Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Activities</CardTitle>
          <button
            type="button"
            className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
          >
            View all
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative pl-4 border-l border-border/60 space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="relative space-y-0.5 text-left">
                {/* Timeline dot */}
                <div className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                <p className="text-xs font-semibold text-foreground leading-none">
                  {activity.title}
                </p>
                <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-semibold">
                  <Clock className="h-2.5 w-2.5 shrink-0" />
                  <span>{activity.timestamp}</span>
                  <span>•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="w-full text-center text-xs font-semibold text-primary hover:underline mt-2 pt-2 border-t border-border/40 block"
          >
            View all activities &rarr;
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
