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
  Building2,
  Coins,
  Truck,
  AlertTriangle,
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
import { Progress } from "@/components/base/progress.tsx";
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

interface SupplierItem {
  id: string;
  name: string;
  email: string;
  code: string;
  group: "Raw Materials" | "Services" | "Logistics";
  phone: string;
  outstanding: number;
  overdue: number;
  creditLimit: number;
  status: "Active" | "Inactive" | "On Hold";
}

const INITIAL_SUPPLIERS: SupplierItem[] = [
  {
    id: "1",
    name: "Acme Supplies Pvt Ltd",
    email: "supplier@email.com",
    code: "SUP-000124",
    group: "Raw Materials",
    phone: "+91 98765 43210",
    outstanding: 125000.0,
    overdue: 25000.0,
    creditLimit: 500000.0,
    status: "Active",
  },
  {
    id: "2",
    name: "Express Logistics",
    email: "shipping@express.com",
    code: "SUP-000125",
    group: "Logistics",
    phone: "+91 99887 66554",
    outstanding: 48750.0,
    overdue: 0.0,
    creditLimit: 150000.0,
    status: "Active",
  },
  {
    id: "3",
    name: "Techno Services Ltd",
    email: "support@techno.com",
    code: "SUP-000126",
    group: "Services",
    phone: "+91 91234 56789",
    outstanding: 350000.0,
    overdue: 45000.0,
    creditLimit: 300000.0,
    status: "On Hold",
  },
  {
    id: "4",
    name: "Standard Packaging Box",
    email: "orders@stdpack.com",
    code: "SUP-000127",
    group: "Raw Materials",
    phone: "+91 93412 67890",
    outstanding: 0.0,
    overdue: 0.0,
    creditLimit: 100000.0,
    status: "Active",
  },
  {
    id: "5",
    name: "Delta Maintenance",
    email: "maintenance@delta.org",
    code: "SUP-000128",
    group: "Services",
    phone: "+91 95678 12345",
    outstanding: 22800.0,
    overdue: 0.0,
    creditLimit: 50000.0,
    status: "Active",
  },
];

export default function SupplierListPage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = React.useState("");
  const [groupFilter, setGroupFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [outstandingFilter, setOutstandingFilter] = React.useState("all");

  // Selection state
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  
  // View mode
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setGroupFilter("all");
    setStatusFilter("all");
    setOutstandingFilter("all");
  };

  // Filtered suppliers list
  const filteredSuppliers = React.useMemo(() => {
    return INITIAL_SUPPLIERS.filter((sup) => {
      const matchSearch =
        sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchGroup =
        groupFilter === "all" || sup.group === groupFilter;
      
      const matchStatus =
        statusFilter === "all" || sup.status === statusFilter;
      
      const matchOutstanding =
        outstandingFilter === "all" ||
        (outstandingFilter === "zero" && sup.outstanding === 0) ||
        (outstandingFilter === "under-50k" && sup.outstanding > 0 && sup.outstanding < 50000) ||
        (outstandingFilter === "above-50k" && sup.outstanding >= 50000);

      return matchSearch && matchGroup && matchStatus && matchOutstanding;
    });
  }, [searchTerm, groupFilter, statusFilter, outstandingFilter]);

  // Statistics calculations
  const stats = React.useMemo(() => {
    const total = INITIAL_SUPPLIERS.length;
    const active = INITIAL_SUPPLIERS.filter((s) => s.status === "Active").length;
    const hold = INITIAL_SUPPLIERS.filter((s) => s.status === "On Hold").length;
    const payables = INITIAL_SUPPLIERS.reduce((acc, s) => acc + s.outstanding, 0);
    const overdueCount = INITIAL_SUPPLIERS.filter((s) => s.overdue > 0).length;

    return { total, active, hold, payables, overdueCount };
  }, []);

  // Checkbox selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSuppliers.map((s) => s.id));
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
    filteredSuppliers.length > 0 && selectedIds.length === filteredSuppliers.length;

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
      case "Raw Materials":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 rounded-md font-medium"
          >
            Raw Materials
          </Badge>
        );
      case "Services":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 rounded-md font-medium"
          >
            Services
          </Badge>
        );
      case "Logistics":
        return (
          <Badge
            variant="outline"
            className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20 rounded-md font-medium"
          >
            Logistics
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Suppliers</h1>
          <p className="text-sm text-muted-foreground">Manage your vendor directory and procurement sources</p>
        </div>
        <div className="flex items-center gap-2">
          {/* New Supplier Button */}
          <div className="flex items-center">
            <Button
              onClick={() => navigate("/valyron/party/supplier/create")}
              className="rounded-r-none bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" /> New Supplier
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
                <DropdownMenuItem onClick={() => navigate("/valyron/party/supplier/create")}>
                  Simple Supplier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/party/supplier/create")}>
                  Manufacturer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/party/supplier/create")}>
                  Service Vendor
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
                Total Suppliers
              </span>
              <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Building2 className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">450</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-muted/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active 430
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" /> Inactive 20
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-emerald-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Outstanding Payables
              </span>
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(stats.payables)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs pt-1 border-t border-muted/50">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 5.8%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-amber-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Pending Deliveries
              </span>
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Truck className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">8</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-amber-600 font-semibold">In transit / scheduled</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-rose-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Overdue Payables
              </span>
              <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{stats.overdueCount}</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-rose-600 font-semibold">Requires payment releases</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-muted-foreground/10 hover:border-purple-500/30 transition-all">
          <CardContent className="p-3 space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                On-Time Delivery
              </span>
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">94%</span>
            </div>
            <div className="pt-1 border-t border-muted/50 space-y-1">
              <Progress value={94} className="h-1" />
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
                  placeholder="Search suppliers..."
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
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
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

              {/* Outstanding Filter */}
              <Select value={outstandingFilter} onValueChange={setOutstandingFilter}>
                <SelectTrigger className="h-9 w-[160px]">
                  <SelectValue placeholder="Outstanding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Payables: All</SelectItem>
                  <SelectItem value="zero">Nil Balance</SelectItem>
                  <SelectItem value="under-50k">Under ₹ 50,000</SelectItem>
                  <SelectItem value="above-50k">Above ₹ 50,000</SelectItem>
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
                  <SelectItem value="payables">Due Payables</SelectItem>
                  <SelectItem value="logistics">Logistic Vendors</SelectItem>
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

      {/* Suppliers Table Card */}
      <Card className="shadow-xs border-muted-foreground/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all suppliers"
                />
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-2">
                Supplier Name
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
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                  No suppliers matched your filters.
                  <Button variant="link" onClick={resetFilters} className="ml-1 px-0 h-auto align-baseline">
                    Reset filters
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((sup) => {
                const isSelected = selectedIds.includes(sup.id);
                return (
                  <TableRow
                    key={sup.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      isSelected ? "bg-muted/20" : ""
                    }`}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectOne(sup.id, !!checked)}
                        aria-label={`Select ${sup.name}`}
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 shrink-0 rounded-full border bg-muted/40 text-xs font-bold flex items-center justify-center shadow-xs">
                          {getInitials(sup.name)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-foreground text-sm truncate max-w-[200px]">
                            {sup.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {sup.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground font-semibold py-2">
                      {sup.code}
                    </TableCell>
                    <TableCell className="py-2">
                      {getGroupBadge(sup.group)}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-muted-foreground font-mono py-2">
                      {sup.phone}
                    </TableCell>
                    <TableCell className="text-right font-bold text-foreground py-2 font-mono">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(sup.outstanding)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-destructive py-2 font-mono">
                      {sup.overdue > 0
                        ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(sup.overdue)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-muted-foreground py-2 font-mono">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(sup.creditLimit)}
                    </TableCell>
                    <TableCell className="py-2">
                      {getStatusBadge(sup.status)}
                    </TableCell>
                    <TableCell className="pr-4 text-right py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2" onClick={() => navigate("/valyron/party/supplier/create")}>
                            <Edit3 className="h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive gap-2 focus:bg-destructive/10">
                            <Trash2 className="h-4 w-4" /> Delete Supplier
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
            Showing 1 to {filteredSuppliers.length} of {filteredSuppliers.length} suppliers
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
