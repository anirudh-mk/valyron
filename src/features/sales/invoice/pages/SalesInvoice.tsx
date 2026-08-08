import { useState, useCallback } from "react";
import {
  Save, FileText, MoreHorizontal, Share2, Eye, Plus, Trash2,
  Copy, Search, SlidersHorizontal, Printer, ChevronDown, ChevronsUpDown, X,
  CheckCircle2, CreditCard, ClipboardList,
  Activity, Sparkles, ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select.tsx";
import { cn } from "@/lib/utils.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command.tsx";

// ── Types ─────────────────────────────────────────────────────────────────────
type LineItem = {
  id: number;
  description: string;
  sku: string;
  qty: number;
  unit: string;
  rate: number;
  taxRate: number;
  discount: number;
  amount: number;
};

function makeRow(id: number): LineItem {
  return { id, description: "", sku: "", qty: 1, unit: "pcs", rate: 0, taxRate: 5, discount: 0, amount: 0 };
}

function computeAmount(row: LineItem) {
  const base = row.qty * row.rate;
  const afterDiscount = base - (base * row.discount) / 100;
  return afterDiscount + (afterDiscount * row.taxRate) / 100;
}

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Product catalog (replace with API data) ──────────────────────────────────
type Product = { id: string; name: string; sku: string; rate: number; taxRate: number; unit: string; category: string };

const PRODUCT_CATALOG: Product[] = [
  { id: "p1",  name: "MacBook Pro M3 14-inch",          sku: "MBP-M3-14",  rate: 166500, taxRate: 18, unit: "pcs", category: "Laptops" },
  { id: "p2",  name: "Dell UltraSharp 27\" 4K Monitor",  sku: "DEL-U2723",  rate: 48200,  taxRate: 18, unit: "pcs", category: "Monitors" },
  { id: "p3",  name: "Logitech MX Master 3S Mouse",      sku: "LOG-MX-3S",  rate: 8200,   taxRate: 18, unit: "pcs", category: "Peripherals" },
  { id: "p4",  name: "96W USB-C Power Adapter",          sku: "APL-96W",    rate: 6500,   taxRate: 18, unit: "pcs", category: "Accessories" },
  { id: "p5",  name: "Thunderbolt 4 Cable (1m)",         sku: "APL-TB4",    rate: 2200,   taxRate: 18, unit: "pcs", category: "Accessories" },
  { id: "p6",  name: "Samsung 970 EVO SSD 1TB",          sku: "SAM-970-1T", rate: 9800,   taxRate: 18, unit: "pcs", category: "Storage" },
  { id: "p7",  name: "Corsair 32GB DDR5 RAM Kit",        sku: "COR-D5-32",  rate: 12400,  taxRate: 18, unit: "pcs", category: "Memory" },
  { id: "p8",  name: "Annual Software Maintenance",       sku: "SVC-MAINT",  rate: 24000,  taxRate: 18, unit: "nos", category: "Services" },
  { id: "p9",  name: "IT Consulting (per hour)",          sku: "SVC-CONSULT",rate: 2500,   taxRate: 18, unit: "hrs", category: "Services" },
  { id: "p10", name: "Wireless Keyboard (Compact)",       sku: "LOG-K380",   rate: 3800,   taxRate: 18, unit: "pcs", category: "Peripherals" },
];

// ── Recent invoices mock ───────────────────────────────────────────────────────
const RECENT_INVOICES = [
  { id: "INV-2024-00120", date: "May 10, 2024", amount: "₹2,04,500", status: "Paid" },
  { id: "INV-2024-00119", date: "Apr 28, 2024", amount: "₹1,56,300", status: "Overdue" },
  { id: "INV-2024-00118", date: "Apr 15, 2024", amount: "₹2,62,000", status: "Paid" },
];

// ─────────────────────────────────────────────────────────────────────────────
type SidebarMode = null | "customer" | "product";

export default function SalesInvoiceCreatePage() {
  const [rows, setRows] = useState<LineItem[]>([makeRow(1)]);
  const [nextId, setNextId] = useState(2);
  const [notes, setNotes] = useState("");
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(null);
  const [focusedProduct, setFocusedProduct] = useState<Product | null>(null);

  const updateRow = useCallback((id: number, field: keyof LineItem, value: string | number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [field]: value };
        return { ...updated, amount: computeAmount(updated) };
      })
    );
  }, []);

  const addRow = () => {
    setRows((prev) => [...prev, makeRow(nextId)]);
    setNextId((n) => n + 1);
  };

  const removeRow = (id: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const subtotal = rows.reduce((s, r) => s + r.qty * r.rate, 0);
  const taxAmount = rows.reduce((s, r) => {
    const base = r.qty * r.rate;
    const afterDiscount = base - (base * r.discount) / 100;
    return s + (afterDiscount * r.taxRate) / 100;
  }, 0);
  const discountAmount = rows.reduce((s, r) => s + (r.qty * r.rate * r.discount) / 100, 0);
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="flex flex-col h-full bg-background">

      {/* ══ Top Header ══ */}
      <div className="flex items-center justify-between px-6 py-3 border-b shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold tracking-tight text-foreground">Invoice INV-2024-00121</h1>
          <Badge className="bg-amber-100 text-amber-700 border border-amber-200 font-medium px-2 py-0.5 text-xs rounded-full">
            ● Draft
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
            <MoreHorizontal size={13} /> More
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
            <Share2 size={13} /> Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
            <Eye size={13} /> Preview
          </Button>
        </div>
      </div>

      {/* ══ Customer meta strip ══ */}
      <div className="flex items-center gap-1.5 px-6 py-2 border-b bg-muted/30 text-xs text-muted-foreground shrink-0">
        <span className="font-medium text-foreground">Acme Corporation</span>
        <span>·</span>
        <span>ID: 8829-00121</span>
        <span>·</span>
        <span>Created by John Doe</span>
      </div>

      {/* ══ Body ══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Main content ── */}
        <div className="flex-1 overflow-auto">

          {/* Info tiles */}
          <div className="grid grid-cols-5 border-b divide-x">
            {[
              { label: "Customer", value: "Acme Corporation", sub: "acme@corp.com", clickable: true },
              { label: "Issue Date", value: "May 24, 2024", sub: "11:30 AM", clickable: false },
              { label: "Due Date", value: "Jun 07, 2024", sub: <span className="text-red-500 font-medium">14 Days Overdue</span>, clickable: false },
              { label: "Payment Terms", value: "Net 14 Days", sub: "", clickable: false },
              { label: "Currency", value: "USD - US Dollar", sub: "", clickable: false },
            ].map((tile, i) => (
              <div
                key={i}
                onClick={() => tile.clickable && setSidebarMode("customer")}
                className={cn(
                  "px-4 py-3 transition-colors",
                  tile.clickable && "cursor-pointer hover:bg-blue-50/50",
                  tile.clickable && sidebarMode === "customer" && "bg-blue-50 border-b-2 border-b-blue-500"
                )}
              >
                <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-1">{tile.label}</p>
                <p className={cn("text-sm font-semibold", tile.clickable ? "text-blue-600" : "text-foreground")}>{tile.value}</p>
                {tile.sub && <p className="text-xs text-muted-foreground mt-0.5">{tile.sub}</p>}
              </div>
            ))}
          </div>

          {/* Items table */}
          <div className="px-6 pt-5 pb-3">

            {/* Table toolbar */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search products or scan barcode" className="pl-8 h-8 text-xs" />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border rounded px-1 py-0.5">⌘I</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8 ml-auto">
                <SlidersHorizontal size={12} /> Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                <Copy size={12} /> Bulk Edit
              </Button>
              <Button size="sm" className="gap-1.5 text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={13} /> Add Item
              </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    {["#", "Item & Description", "SKU", "Qty", "Unit Price", "Disc.", "Tax", "Amount", ""].map((h, i) => (
                      <th key={i} className={cn(
                        "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground py-2.5 px-3",
                        i === 0 && "w-8 pl-4",
                        i === 7 && "text-right pr-4",
                        i === 8 && "w-14",
                      )}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={row.id} className="border-b last:border-b-0 hover:bg-muted/20 group transition-colors">
                      {/* # */}
                      <td className="pl-4 py-2.5 text-muted-foreground text-xs">{idx + 1}</td>

                      {/* Description — product picker */}
                      <td className="px-3 py-2 min-w-[220px]">
                        <ProductPicker
                          value={row.description}
                          onSelect={(product) => {
                            setRows((prev) =>
                              prev.map((r) => {
                                if (r.id !== row.id) return r;
                                const updated: LineItem = {
                                  ...r,
                                  description: product.name,
                                  sku: product.sku,
                                  rate: product.rate,
                                  taxRate: product.taxRate,
                                  unit: product.unit,
                                };
                                return { ...updated, amount: computeAmount(updated) };
                              })
                            );
                            // Switch sidebar to product assistant
                            setFocusedProduct(product);
                            setSidebarMode("product");
                          }}
                        />
                      </td>

                      {/* SKU */}
                      <td className="px-3 py-2 w-28">
                        <Input
                          value={row.sku}
                          onChange={(e) => updateRow(row.id, "sku", e.target.value)}
                          placeholder="SKU-001"
                          className="h-8 text-xs font-mono border-transparent bg-transparent shadow-none hover:border-input focus:border-input focus:bg-background"
                        />
                      </td>

                      {/* Qty */}
                      <td className="px-3 py-2 w-20">
                        <Input
                          type="number" min={0} value={row.qty}
                          onChange={(e) => updateRow(row.id, "qty", parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm border-transparent bg-transparent shadow-none hover:border-input focus:border-input focus:bg-background"
                        />
                      </td>

                      {/* Unit Price */}
                      <td className="px-3 py-2 w-28">
                        <Input
                          type="number" min={0} value={row.rate}
                          onChange={(e) => updateRow(row.id, "rate", parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm border-transparent bg-transparent shadow-none hover:border-input focus:border-input focus:bg-background"
                        />
                      </td>

                      {/* Discount */}
                      <td className="px-3 py-2 w-24">
                        <Input
                          type="number" min={0} max={100} value={row.discount}
                          onChange={(e) => updateRow(row.id, "discount", parseFloat(e.target.value) || 0)}
                          className="h-8 text-sm border-transparent bg-transparent shadow-none hover:border-input focus:border-input focus:bg-background"
                        />
                      </td>

                      {/* Tax */}
                      <td className="px-3 py-2 w-28">
                        <Select
                          value={String(row.taxRate)}
                          onValueChange={(v) => updateRow(row.id, "taxRate", Number(v))}
                        >
                          <SelectTrigger className="h-8 text-xs border-transparent bg-transparent shadow-none hover:border-input focus:border-input focus:bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 5, 12, 18, 28].map((r) => (
                              <SelectItem key={r} value={String(r)}>GST {r}%</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-2 text-right font-semibold tabular-nums text-foreground w-32">
                        {fmt(row.amount)}
                      </td>

                      {/* Actions */}
                      <td className="px-2 py-2 w-14">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setRows((prev) => [...prev, { ...row, id: nextId }]);
                              setNextId((n) => n + 1);
                            }}
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                            title="Duplicate"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            onClick={() => removeRow(row.id)}
                            className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-50"
                            title="Remove"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add row link */}
              <button
                onClick={addRow}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 transition-colors border-t"
              >
                <Plus size={13} /> Add new line item
              </button>
            </div>
          </div>

          {/* Notes + Summary */}
          <div className="grid grid-cols-2 gap-5 px-6 pb-5">

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes…"
                className="resize-none h-28 text-sm"
              />
              <div className="mt-3 space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attachments</Label>
                <div className="border-2 border-dashed rounded-lg px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer">
                  <FileText size={13} /> Add file or drag and drop
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y">
                <SummaryRow label="Subtotal" value={fmt(subtotal)} />
                <SummaryRow
                  label="Discount"
                  value={discountAmount > 0 ? `− ${fmt(discountAmount)}` : "—"}
                  action={<button className="text-xs text-blue-600 hover:underline">Add</button>}
                />
                <SummaryRow label={`Tax (avg ${rows.length ? Math.round(rows.reduce((s,r)=>s+r.taxRate,0)/rows.length) : 0}%)`} value={fmt(taxAmount)} />
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                  <div>
                    <p className="text-sm font-bold text-foreground">Total Amount</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Amount in words</p>
                  </div>
                  <span className="text-xl font-bold text-foreground tabular-nums">{fmt(total)}</span>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* ── Right Sidebar (context-aware) — only shown when triggered ── */}
        {sidebarMode !== null && (
        <div className="w-72 border-l shrink-0 overflow-auto bg-background">

          {/* Sidebar header */}
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b">
            <Sparkles size={13} className="text-violet-500 shrink-0" />
            <span className="text-xs font-semibold text-foreground">
              {sidebarMode === "customer" ? "Customer Assistant" : "Product Assistant"}
            </span>
            <button
              onClick={() => setSidebarMode(null)}
              className="ml-auto p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          </div>


          {/* ── CUSTOMER mode ── */}
          {sidebarMode === "customer" && (
            <>
              {/* Customer Credit */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-foreground">Customer Credit</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Available Credit</p>
                <p className="text-base font-bold text-foreground">₹10,20,000 <span className="font-normal text-muted-foreground text-sm">/ ₹41,50,000</span></p>
                <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "75%" }} />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-md">
                  <CheckCircle2 size={11} />
                  <span>Excellent payment history</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 px-1">Last payment: May 10, 2024</p>
              </div>

              {/* Customer Recent Invoices */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList size={14} className="text-blue-500" />
                  <span className="text-sm font-semibold text-foreground">Recent Invoices</span>
                </div>
                <div className="space-y-2">
                  {RECENT_INVOICES.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">{inv.id}</p>
                        <p className="text-[11px] text-muted-foreground">{inv.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-foreground">{inv.amount}</p>
                        <Badge className={cn(
                          "text-[10px] px-1.5 py-0 rounded-full font-medium",
                          inv.status === "Paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-600 border-red-200"
                        )}>
                          {inv.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Log */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-orange-500" />
                    <span className="text-sm font-semibold text-foreground">Activity Log</span>
                  </div>
                  <button className="text-xs text-blue-600 hover:underline">View all</button>
                </div>
                <div className="space-y-2.5">
                  {[
                    { dot: "bg-emerald-500", text: "Invoice created", sub: "by John Doe", time: "May 24, 11:30 AM" },
                    { dot: "bg-blue-400", text: "Payment received", sub: "₹2,04,500", time: "May 10, 9:15 AM" },
                  ].map((a, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", a.dot)} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{a.text}</p>
                        <p className="text-[11px] text-muted-foreground">{a.sub}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── PRODUCT mode ── */}
          {sidebarMode === "product" && focusedProduct && (
            <>
              {/* Product header */}
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-snug">{focusedProduct.name}</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{focusedProduct.sku}</p>
                  </div>
                  <Badge className="text-[10px] shrink-0 bg-blue-100 text-blue-700 border-blue-200">{focusedProduct.category}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-background rounded-md px-2.5 py-2 border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Unit Price</p>
                    <p className="text-sm font-bold text-foreground">₹{focusedProduct.rate.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="bg-background rounded-md px-2.5 py-2 border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">GST Rate</p>
                    <p className="text-sm font-bold text-foreground">{focusedProduct.taxRate}%</p>
                  </div>
                </div>
              </div>

              {/* Frequently bought together */}
              <div className="p-4 border-b">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">Frequently Bought Together</p>
                <div className="space-y-2">
                  {PRODUCT_CATALOG
                    .filter((p) => p.id !== focusedProduct.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center shrink-0">
                            <ShoppingCart size={11} className="text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-[11px] text-blue-600">₹{item.rate.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setRows((prev) => [...prev, { ...makeRow(nextId), description: item.name, sku: item.sku, rate: item.rate, taxRate: item.taxRate, unit: item.unit, amount: computeAmount({ ...makeRow(nextId), rate: item.rate, taxRate: item.taxRate }) }]);
                            setNextId((n) => n + 1);
                          }}
                          className="w-5 h-5 rounded-full border-2 border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0"
                          title="Add to invoice"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Smart suggestion */}
              <div className="p-4">
                <div className="p-2.5 rounded-lg border bg-violet-50/60 border-violet-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={11} className="text-violet-500" />
                    <span className="text-xs font-semibold text-violet-700">Smart Suggestion</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Customers who buy <strong>{focusedProduct.name.split(" ")[0]}</strong> also add accessories from the <strong>{focusedProduct.category}</strong> category.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
        )}

        </div>

      {/* ══ Bottom action bar ══ */}
      <div className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 py-3 shrink-0">

        {/* Totals */}
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">Sub Total</p>
            <p className="text-base font-bold text-foreground tabular-nums">{fmt(subtotal)}</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">Tax</p>
            <p className="text-base font-bold text-blue-600 tabular-nums">{fmt(taxAmount)}</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">Total</p>
            <p className="text-base font-bold text-foreground tabular-nums">{fmt(total)}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-sm h-9">
            <Save size={14} /> Save Draft
          </Button>
          <Button variant="outline" size="sm" className="text-sm h-9">
            Hold Invoice
          </Button>
          <Button size="sm" className="gap-1.5 text-sm h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold pl-4 pr-1">
            <Printer size={14} /> Pay &amp; Print
            <Separator orientation="vertical" className="h-5 ml-2 bg-blue-500" />
            <ChevronDown size={14} className="ml-1 mr-1" />
          </Button>
        </div>
      </div>

    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function SummaryRow({ label, value, action }: { label: string; value: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        {action}
        <span className="text-sm font-medium text-foreground tabular-nums">{value}</span>
      </div>
    </div>
  );
}

// ── ProductPicker ─────────────────────────────────────────────────────────────
function ProductPicker({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (product: Product) => void;
}) {
  const [open, setOpen] = useState(false);

  // Group products by category
  const categories = Array.from(new Set(PRODUCT_CATALOG.map((p) => p.category)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-between w-full h-8 px-2 rounded-md text-sm text-left",
            "border-transparent bg-transparent hover:border hover:border-input",
            "focus:outline-none focus:border focus:border-input focus:bg-background",
            "transition-all group-hover:border-input/50",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">{value || "Select product…"}</span>
          <ChevronsUpDown size={12} className="shrink-0 text-muted-foreground ml-1" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="start" side="bottom">
        <Command>
          <CommandInput placeholder="Search products…" className="h-9 text-sm" />
          <CommandList className="max-h-64">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No products found.
            </CommandEmpty>
            {categories.map((cat) => (
              <CommandGroup key={cat} heading={cat}>
                {PRODUCT_CATALOG.filter((p) => p.category === cat).map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => {
                      onSelect(product);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{product.name}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{product.sku}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground tabular-nums shrink-0 ml-3">
                      ₹{product.rate.toLocaleString("en-IN")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}