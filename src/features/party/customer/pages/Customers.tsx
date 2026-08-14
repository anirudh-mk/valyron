import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Plus,
  FileUp,
  FileDown,
  Search,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  Users,
  Coins,
  AlertTriangle,
  AlertOctagon,
  Clock,
  MoreHorizontal,
  Trash2,
  Edit3,
  Copy,
} from "lucide-react";

import { Button } from "@/components/base/button.tsx";
import { Card, CardContent } from "@/components/base/card.tsx";
import { Input } from "@/components/base/input.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Checkbox } from "@/components/base/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table.tsx";

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  code: string;
  group: "Corporate" | "Retail" | "Wholesale";
  phone: string;
  outstanding: number;
  overdue: number;
  creditLimit: number;
  status: "Active" | "Inactive" | "On Hold";
}

const INITIAL_CUSTOMERS: CustomerItem[] = [
  {
    id: "1",
    name: "Acme Corporates",
    email: "billing@acmecorp.com",
    code: "CUST-0001",
    group: "Corporate",
    phone: "+91 98765 43210",
    outstanding: 125000.0,
    overdue: 25000.0,
    creditLimit: 500000.0,
    status: "Active",
  },
  {
    id: "2",
    name: "Anjali Menon",
    email: "anjali.menon@email.com",
    code: "CUST-0002",
    group: "Retail",
    phone: "+91 91234 56789",
    outstanding: 4500.0,
    overdue: 0.0,
    creditLimit: 50000.0,
    status: "Active",
  },
  {
    id: "3",
    name: "Zenith Retailers",
    email: "orders@zenith.com",
    code: "CUST-0003",
    group: "Wholesale",
    phone: "+91 99887 66554",
    outstanding: 350000.0,
    overdue: 85000.0,
    creditLimit: 300000.0,
    status: "On Hold",
  },
  {
    id: "4",
    name: "Rahul Kumar",
    email: "rahul.k@gmail.com",
    code: "CUST-0004",
    group: "Retail",
    phone: "+91 93412 67890",
    outstanding: 0.0,
    overdue: 0.0,
    creditLimit: 20000.0,
    status: "Active",
  },
  {
    id: "5",
    name: "Apex Distributors",
    email: "finance@apex.com",
    code: "CUST-0005",
    group: "Corporate",
    phone: "+91 95678 12345",
    outstanding: 187500.0,
    overdue: 0.0,
    creditLimit: 1000000.0,
    status: "Active",
  },
  {
    id: "6",
    name: "Kerala Bakery Group",
    email: "accounts@keralabakery.in",
    code: "CUST-0006",
    group: "Wholesale",
    phone: "+91 484 253 9876",
    outstanding: 48750.0,
    overdue: 12000.0,
    creditLimit: 150000.0,
    status: "Active",
  },
];

export default function CustomerListPage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = React.useState("");
  const [groupFilter, setGroupFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [limitFilter, setLimitFilter] = React.useState("all");

  // Selection state
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  
  // View mode
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setGroupFilter("all");
    setStatusFilter("all");
    setLimitFilter("all");
  };

  // Filtered customers list
  const filteredCustomers = React.useMemo(() => {
    return INITIAL_CUSTOMERS.filter((cust) => {
      const matchSearch =
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGroup =
        groupFilter === "all" || cust.group === groupFilter;
      
      const matchStatus =
        statusFilter === "all" || cust.status === statusFilter;
      
      const matchLimit =
        limitFilter === "all" ||
        (limitFilter === "under-50k" && cust.creditLimit < 50000) ||
        (limitFilter === "50k-200k" && cust.creditLimit >= 50000 && cust.creditLimit <= 200000) ||
        (limitFilter === "above-200k" && cust.creditLimit > 200000);

      return matchSearch && matchGroup && matchStatus && matchLimit;
    });
  }, [searchTerm, groupFilter, statusFilter, limitFilter]);

  // Statistics calculations
  const stats = React.useMemo(() => {
    const total = INITIAL_CUSTOMERS.length;
    const active = INITIAL_CUSTOMERS.filter((c) => c.status === "Active").length;
    const hold = INITIAL_CUSTOMERS.filter((c) => c.status === "On Hold").length;
    const receivables = INITIAL_CUSTOMERS.reduce((acc, c) => acc + c.outstanding, 0);
    const overdueCount = INITIAL_CUSTOMERS.filter((c) => c.overdue > 0).length;

    return { total, active, hold, receivables, overdueCount };
  }, []);

  // Checkbox selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredCustomers.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected =
    filteredCustomers.length > 0 && selectedIds.length === filteredCustomers.length;

  const getInitials = (name: string) => {
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getGroupBadge = (group: string) => {
    switch (group) {
      case "Corporate":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 rounded-md font-medium"
          >
            Corporate
          </Badge>
        );
      case "Retail":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 rounded-md font-medium"
          >
            Retail
          </Badge>
        );
      case "Wholesale":
        return (
          <Badge
            variant="outline"
            className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20 rounded-md font-medium"
          >
            Wholesale
          </Badge>
        );
      default:
        return <Badge variant="secondary">{group}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-md font-medium"
          >
            Active
          </Badge>
        );
      case "On Hold":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 rounded-md font-medium"
          >
            On Hold
          </Badge>
        );
      case "Inactive":
        return (
          <Badge
            variant="outline"
            className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 rounded-md font-medium"
          >
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-4 text-left">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage your customer directory and accounts</p>
        </div>
        <div className="flex items-center gap-2">
          {/* New Customer Button */}
          <div className="flex items-center">
            <Button
              onClick={() => navigate("/valyron/party/customer/create")}
              className="rounded-r-none bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" /> New Customer
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-l-none border-l border-blue-500/30 px-2.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/valyron/party/customer/create")}>
                  Simple Customer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/party/customer/create")}>
                  Corporate Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/party/customer/create")}>
                  Lead/Prospect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="outline" className="shadow-xs gap-1.5">
            <FileUp className="h-4 w-4 text-muted-foreground" /> Import
          </Button>
          <Button variant="outline" className="shadow-xs gap-1.5">
            <FileDown className="h-4 w-4 text-muted-foreground" /> Export
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="shadow-xs border-muted-foreground/10 hover:border-blue-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Total Customers
              </span>
              <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">1,250</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-muted/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active 1,180
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" /> Inactive 70
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-emerald-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Outstanding Receivables
              </span>
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(stats.receivables)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs pt-1 border-t border-muted/50">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 4.2%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-amber-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Overdue Accounts
              </span>
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{stats.overdueCount}</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-muted-foreground font-semibold">Requires follow-up</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-rose-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Credit Hold
              </span>
              <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{stats.hold}</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-rose-600 font-semibold">Temporary hold</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-purple-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Recently Added
              </span>
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">8</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-muted-foreground">This week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Control Panel */}
      <Card className="shadow-xs border-muted-foreground/10">
        <CardContent className="p-3 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              {/* Group Filter */}
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Wholesale">Wholesale</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Credit Limit Filter */}
              <Select value={limitFilter} onValueChange={setLimitFilter}>
                <SelectTrigger className="h-9 w-[160px]">
                  <SelectValue placeholder="Credit Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Limit: All</SelectItem>
                  <SelectItem value="under-50k">Under ₹ 50,000</SelectItem>
                  <SelectItem value="50k-200k">₹ 50,000 - ₹ 2,00,000</SelectItem>
                  <SelectItem value="above-200k">Above ₹ 2,00,000</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-9 gap-1.5 shadow-xs">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" /> More Filters
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Select defaultValue="default">
                <SelectTrigger className="h-9 w-[130px] shadow-xs">
                  <SelectValue placeholder="Saved Views" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Saved Views</SelectItem>
                  <SelectItem value="receivables">Due Accounts</SelectItem>
                  <SelectItem value="wholesale">Wholesale VIP</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md shadow-xs h-9 overflow-hidden bg-background">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-full rounded-none px-2"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-full rounded-none px-2 border-l"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={resetFilters}
                className="h-9 w-9 shadow-xs"
                title="Reset Filters"
              >
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table Card */}
      <Card className="shadow-xs border-muted-foreground/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Customer Name
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Code
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Group
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2 text-right">
                Outstanding
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2 text-right">
                Overdue
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2 text-right">
                Credit Limit
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Status
              </TableHead>
              <TableHead className="w-[50px] pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                  No customers matched your filters.
                  <Button variant="link" onClick={resetFilters} className="ml-1 px-0 h-auto align-baseline">
                    Reset filters
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((cust) => {
                const isSelected = selectedIds.includes(cust.id);
                return (
                  <TableRow
                    key={cust.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      isSelected ? "bg-muted/20" : ""
                    }`}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectOne(cust.id, !!checked)}
                        aria-label={`Select ${cust.name}`}
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 shrink-0 rounded-full border bg-muted/40 text-xs font-bold flex items-center justify-center shadow-xs">
                          {getInitials(cust.name)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-foreground text-sm truncate max-w-[200px]">
                            {cust.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {cust.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground font-semibold py-2">
                      {cust.code}
                    </TableCell>
                    <TableCell className="py-2">
                      {getGroupBadge(cust.group)}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-muted-foreground font-mono py-2">
                      {cust.phone}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground py-2 font-mono">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(cust.outstanding)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-destructive py-2 font-mono">
                      {cust.overdue > 0
                        ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(cust.overdue)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-muted-foreground py-2 font-mono">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(cust.creditLimit)}
                    </TableCell>
                    <TableCell className="py-2">
                      {getStatusBadge(cust.status)}
                    </TableCell>
                    <TableCell className="pr-4 text-right py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2" onClick={() => navigate("/valyron/party/customer/create")}>
                            <Edit3 className="h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive gap-2 focus:bg-destructive/10">
                            <Trash2 className="h-4 w-4" /> Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-between p-4 border-t border-border/40 text-xs text-muted-foreground font-medium">
          <span>
            Showing 1 to {filteredCustomers.length} of {filteredCustomers.length} customers
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <span className="bg-muted py-1 px-2.5 rounded-md border border-border/30 font-semibold text-foreground">
                10 / page
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled
                className="bg-primary text-primary-foreground font-bold h-7 w-7 rounded-md flex items-center justify-center"
              >
                1
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
