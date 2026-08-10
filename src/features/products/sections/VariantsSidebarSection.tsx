import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Info, Plus, Download, Upload } from "lucide-react";

export default function VariantsSidebarSection() {
  return (
    <div className="space-y-4">
      {/* Product Preview */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Product Preview</h3>

        {/* Product Card */}
        <div className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/30">
          <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-slate-700 via-purple-700 to-pink-600 flex items-center justify-center">
            <div className="text-white text-xs font-bold tracking-tight text-center leading-tight px-1">
              MacBook
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight truncate">MacBook Pro M3 14"</p>
            <p className="text-xs text-primary mt-0.5 font-medium">SKU: MBP-M3-14</p>
            <Badge className="mt-1.5 text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800">
              Active
            </Badge>
          </div>
        </div>

        {/* Product Info Rows */}
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Product Type</p>
            <p className="text-xs font-medium">Laptop</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-xs font-medium">Laptops</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Brand</p>
            <p className="text-xs font-medium">Apple</p>
          </div>
        </div>
      </Card>

      {/* Variant Summary */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Variant Summary</h3>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Attributes</p>
            <p className="text-xs font-medium">2</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Variants</p>
            <p className="text-xs font-medium">6</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Active Variants</p>
            <p className="text-xs font-medium">6</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Stock (All Variants)</p>
            <p className="text-xs font-medium">45</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 rounded-lg border border-green-100 dark:border-green-900/50 bg-green-50/50 dark:bg-green-950/20 p-2.5 mt-2">
          <Info className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-green-700 dark:text-green-400 leading-normal">
            Variants will inherit pricing, tax and other settings from the product.
          </p>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Quick Actions</h3>

        <div className="space-y-2">
          <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Plus className="size-3.5 text-muted-foreground" />
            Add Variant Manually
          </button>
          <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Upload className="size-3.5 text-muted-foreground" />
            Import Variants
          </button>
          <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <Download className="size-3.5 text-muted-foreground" />
            Export Variants
          </button>
        </div>
      </Card>
    </div>
  );
}
