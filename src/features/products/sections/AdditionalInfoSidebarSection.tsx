import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { HelpCircle, ExternalLink } from "lucide-react";

export default function AdditionalInfoSidebarSection() {
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
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-xs font-medium">Laptops</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Brand</p>
            <p className="text-xs font-medium">Apple</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="text-xs font-medium">Laptop</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Stock</p>
            <p className="text-xs font-medium">25 (Main Warehouse)</p>
          </div>
        </div>
      </Card>

      {/* Additional Info Summary */}
      <Card className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">Additional Info Summary</h3>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">SKU</p>
            <p className="text-xs font-medium text-foreground">MBP-M3-14</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Barcode</p>
            <p className="text-xs font-medium text-foreground">8901234567890</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">HSN / SAC</p>
            <p className="text-xs font-medium text-foreground">84713010</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">UOM</p>
            <p className="text-xs font-medium text-foreground">Piece</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Warranty</p>
            <p className="text-xs font-medium text-foreground">12 Months</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Weight</p>
            <p className="text-xs font-medium text-foreground">1.55 kg</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Country</p>
            <p className="text-xs font-medium text-foreground">China</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-xs font-medium text-foreground">Active</p>
          </div>
        </div>
      </Card>

      {/* Quick Help */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          <HelpCircle className="size-4 text-blue-600 dark:text-blue-400" />
          <h3>Quick Help</h3>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 leading-normal">
          <li>SKU must be unique.</li>
          <li>HSN/SAC is required for tax reporting.</li>
          <li>Enable tracking options as per business needs.</li>
        </ul>
        <div className="pt-1.5 border-t border-border mt-1">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            onClick={(e) => e.preventDefault()}
          >
            Learn more about additional info
            <ExternalLink className="size-3" />
          </a>
        </div>
      </Card>
    </div>
  );
}
