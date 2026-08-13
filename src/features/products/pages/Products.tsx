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
  Package,
  Coins,
  AlertTriangle,
  AlertOctagon,
  Clock,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Monitor,
  Mouse,
  Keyboard,
  Cpu,
  Armchair,
  HardDrive,
  Briefcase,
  Trash2,
  Edit3,
  Copy,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

// Mock product items based on screenshot
interface ProductItem {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  salesPrice: number;
  costPrice: number;
  stock: number;
  warehouses: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  status: "Active" | "Inactive";
  iconType: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "1",
    name: "MacBook Pro M3 14\"",
    description: "14-inch, Space Gray, 16GB RAM",
    sku: "MBP-M3-14",
    category: "Laptops",
    salesPrice: 1999.0,
    costPrice: 1650.0,
    stock: 12,
    warehouses: 2,
    stockStatus: "Low Stock",
    status: "Active",
    iconType: "laptop",
  },
  {
    id: "2",
    name: "Dell UltraSharp 27\" 4K",
    description: "U2723QE 4K USB-C Hub Monitor",
    sku: "DEL-U2723",
    category: "Monitors",
    salesPrice: 579.0,
    costPrice: 450.0,
    stock: 25,
    warehouses: 3,
    stockStatus: "In Stock",
    status: "Active",
    iconType: "monitor",
  },
  {
    id: "3",
    name: "Logitech MX Master 3S",
    description: "Wireless Performance Mouse",
    sku: "LOG-MX-3S",
    category: "Accessories",
    salesPrice: 99.0,
    costPrice: 68.0,
    stock: 3,
    warehouses: 1,
    stockStatus: "Low Stock",
    status: "Active",
    iconType: "mouse",
  },
  {
    id: "4",
    name: "Keychron K2 Mechanical",
    description: "75% Wireless Mechanical Keyboard",
    sku: "KEY-K2",
    category: "Accessories",
    salesPrice: 129.0,
    costPrice: 89.0,
    stock: 0,
    warehouses: 0,
    stockStatus: "Out of Stock",
    status: "Active",
    iconType: "keyboard",
  },
  {
    id: "5",
    name: "Anker PowerExpand+",
    description: "7-in-1 USB-C Hub",
    sku: "ANK-7IN1",
    category: "Accessories",
    salesPrice: 49.9,
    costPrice: 32.0,
    stock: 48,
    warehouses: 2,
    stockStatus: "In Stock",
    status: "Active",
    iconType: "cpu",
  },
  {
    id: "6",
    name: "Ergonomic Office Chair",
    description: "Adjustable, Mesh Back",
    sku: "CHAIR-ERG",
    category: "Furniture",
    salesPrice: 199.0,
    costPrice: 130.0,
    stock: 7,
    warehouses: 1,
    stockStatus: "Low Stock",
    status: "Active",
    iconType: "furniture",
  },
  {
    id: "7",
    name: "Samsung 990 PRO 1TB",
    description: "NVMe M.2 Internal SSD",
    sku: "SSD-990-1TB",
    category: "Storage",
    salesPrice: 129.99,
    costPrice: 92.0,
    stock: 35,
    warehouses: 2,
    stockStatus: "In Stock",
    status: "Active",
    iconType: "storage",
  },
  {
    id: "8",
    name: "Targus 15.6\" Backpack",
    description: "CitySmart Advanced",
    sku: "BAG-TG-15",
    category: "Accessories",
    salesPrice: 59.9,
    costPrice: 40.0,
    stock: 18,
    warehouses: 1,
    stockStatus: "In Stock",
    status: "Active",
    iconType: "backpack",
  },
];

export default function ProductListPage() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [warehouseFilter, setWarehouseFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [stockFilter, setStockFilter] = React.useState("all");

  // Selection state
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  
  // View mode
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setWarehouseFilter("all");
    setStatusFilter("all");
    setStockFilter("all");
  };

  // Filtered products list
  const filteredProducts = React.useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      const matchSearch =
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory =
        categoryFilter === "all" || prod.category === categoryFilter;
      
      const matchStatus =
        statusFilter === "all" || prod.status === statusFilter;
      
      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "In Stock" && prod.stockStatus === "In Stock") ||
        (stockFilter === "Low Stock" && prod.stockStatus === "Low Stock") ||
        (stockFilter === "Out of Stock" && prod.stockStatus === "Out of Stock");

      return matchSearch && matchCategory && matchStatus && matchStock;
    });
  }, [searchTerm, categoryFilter, statusFilter, stockFilter]);

  // Statistics calculations
  const stats = React.useMemo(() => {
    const total = INITIAL_PRODUCTS.length;
    const active = INITIAL_PRODUCTS.filter((p) => p.status === "Active").length;
    const inactive = total - active;
    const stockValue = INITIAL_PRODUCTS.reduce((acc, p) => acc + p.stock * p.salesPrice, 0);
    const lowStock = INITIAL_PRODUCTS.filter((p) => p.stockStatus === "Low Stock").length;
    const outOfStock = INITIAL_PRODUCTS.filter((p) => p.stockStatus === "Out of Stock").length;

    return { total, active, inactive, stockValue, lowStock, outOfStock };
  }, []);

  // Checkbox selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
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
    filteredProducts.length > 0 && selectedIds.length === filteredProducts.length;

  // Icon mapping helper
  const renderProductIcon = (type: string) => {
    const baseClass = "h-5 w-5 text-muted-foreground";
    switch (type) {
      case "laptop":
        return <Laptop className={baseClass} />;
      case "monitor":
        return <Monitor className={baseClass} />;
      case "mouse":
        return <Mouse className={baseClass} />;
      case "keyboard":
        return <Keyboard className={baseClass} />;
      case "cpu":
        return <Cpu className={baseClass} />;
      case "furniture":
        return <Armchair className={baseClass} />;
      case "storage":
        return <HardDrive className={baseClass} />;
      case "backpack":
        return <Briefcase className={baseClass} />;
      default:
        return <Package className={baseClass} />;
    }
  };

  // Colored Badge helpers
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Laptops":
        return (
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 rounded-md font-medium"
          >
            Laptops
          </Badge>
        );
      case "Monitors":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 rounded-md font-medium"
          >
            Monitors
          </Badge>
        );
      case "Accessories":
        return (
          <Badge
            variant="outline"
            className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20 rounded-md font-medium"
          >
            Accessories
          </Badge>
        );
      case "Furniture":
        return (
          <Badge
            variant="outline"
            className="bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20 rounded-md font-medium"
          >
            Furniture
          </Badge>
        );
      case "Storage":
        return (
          <Badge
            variant="outline"
            className="bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20 rounded-md font-medium"
          >
            Storage
          </Badge>
        );
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-md font-medium"
          >
            In Stock
          </Badge>
        );
      case "Low Stock":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 rounded-md font-medium"
          >
            Low Stock
          </Badge>
        );
      case "Out of Stock":
        return (
          <Badge
            variant="outline"
            className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 rounded-md font-medium"
          >
            Out of Stock
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <div className="flex items-center gap-2">
          {/* New Product Dropdown Split Button */}
          <div className="flex items-center">
            <Button
              onClick={() => navigate("/valyron/products/create")}
              className="rounded-r-none bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs"
            >
              <Plus className="mr-1.5 h-4 w-4" /> New Product
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
                <DropdownMenuItem onClick={() => navigate("/valyron/products/create")}>
                  Simple Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/products/create")}>
                  Variant Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/valyron/products/create")}>
                  Service Item
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Card 1 */}
        <Card className="shadow-xs border-muted-foreground/10 hover:border-blue-500/30 transition-all">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Total Products
              </span>
              <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Package className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">1,846</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-muted/50">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active 1,562
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" /> Inactive 284
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="shadow-xs border-muted-foreground/10 hover:border-emerald-500/30 transition-all">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Total Stock Value
              </span>
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">$235,680.50</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs pt-1 border-t border-muted/50">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ 8.6%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="shadow-xs border-muted-foreground/10 hover:border-amber-500/30 transition-all">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Low Stock Items
              </span>
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{stats.lowStock + 20}</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <button
                onClick={() => setStockFilter("Low Stock")}
                className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
              >
                View items
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="shadow-xs border-muted-foreground/10 hover:border-rose-500/30 transition-all">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Out of Stock Items
              </span>
              <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <AlertOctagon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">{stats.outOfStock + 8}</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <button
                onClick={() => setStockFilter("Out of Stock")}
                className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
              >
                View items
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Card 5 */}
        <Card className="shadow-xs border-muted-foreground/10 hover:border-purple-500/30 transition-all">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
                Recently Added
              </span>
              <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">15</span>
            </div>
            <div className="pt-1 border-t border-muted/50">
              <span className="text-xs text-muted-foreground">This week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Control Panel */}
      <Card className="shadow-xs border-muted-foreground/10">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left aligned filter inputs */}
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              {/* Category Select */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Monitors">Monitors</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                </SelectContent>
              </Select>

              {/* Warehouse Select */}
              <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warehouses</SelectItem>
                  <SelectItem value="wh1">Warehouse A</SelectItem>
                  <SelectItem value="wh2">Warehouse B</SelectItem>
                  <SelectItem value="wh3">Warehouse C</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Select */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Stock Status Select */}
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="h-9 w-[140px]">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Stock: All</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-9 gap-1.5 shadow-xs">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" /> More Filters
              </Button>
            </div>

            {/* Right aligned action controls */}
            <div className="flex items-center gap-2">
              <Select defaultValue="default">
                <SelectTrigger className="h-9 w-[130px] shadow-xs">
                  <SelectValue placeholder="Saved Views" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Saved Views</SelectItem>
                  <SelectItem value="low">Low Inventory</SelectItem>
                  <SelectItem value="valuable">High Value</SelectItem>
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

      {/* Products Table Card */}
      <Card className="shadow-xs border-muted-foreground/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[40px] pl-4">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                Product
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                SKU
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                Category
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3 text-right">
                Sales Price
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3 text-right">
                Cost Price
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                Stock
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                Stock Status
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground text-xs uppercase tracking-wider py-3">
                Status
              </TableHead>
              <TableHead className="w-[50px] pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                  No products matched your filters.
                  <Button variant="link" onClick={resetFilters} className="ml-1 px-0 h-auto align-baseline">
                    Reset filters
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <TableRow
                    key={product.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      isSelected ? "bg-muted/20" : ""
                    }`}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectOne(product.id, !!checked)}
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-md border bg-muted/30 flex items-center justify-center shadow-xs">
                          {renderProductIcon(product.iconType)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-foreground text-sm truncate max-w-[220px]">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[220px]">
                            {product.description}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground font-medium py-3">
                      {product.sku}
                    </TableCell>
                    <TableCell className="py-3">
                      {getCategoryBadge(product.category)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground py-3">
                      ${product.salesPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground py-3">
                      ${product.costPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-foreground">{product.stock}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                          In {product.warehouses} WH
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      {getStockStatusBadge(product.stockStatus)}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-md font-semibold px-2">
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2">
                            <Edit3 className="h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive gap-2 focus:bg-destructive/10">
                            <Trash2 className="h-4 w-4" /> Delete Product
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
      </Card>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-sm text-muted-foreground">
          Showing 1 to {filteredProducts.length} of 1,846 products
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Select defaultValue="20">
              <SelectTrigger className="h-8 w-[120px] shadow-xs">
                <SelectValue placeholder="20 per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="default" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              1
            </Button>
            <Button variant="outline" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" className="h-8 w-8">
              3
            </Button>
            <span className="text-muted-foreground px-1">...</span>
            <Button variant="outline" className="h-8 w-8">
              93
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
