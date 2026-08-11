import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export default function QuickPreviewSection() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="text-sm font-semibold">Quick Preview</h3>

      {/* Product card */}
      <div className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/30">
        {/* Product Image */}
        <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-slate-700 via-purple-700 to-pink-600 flex items-center justify-center">
          <div className="text-white text-xs font-bold tracking-tight text-center leading-tight px-1">
            MacBook
          </div>
        </div>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight truncate">MacBook Pro M3 14"</p>
          <p className="text-xs text-primary mt-0.5 font-medium">SKU: MBP-M3-14</p>
          <Badge
            className="mt-1.5 text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            Active
          </Badge>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xl font-bold">₹ 1,999.00</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Cost: ₹ 1,650.00 · Margin: 17.6%
        </p>
      </div>

      {/* Details */}
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
          <p className="text-xs text-muted-foreground">Stock</p>
          <p className="text-xs font-medium">25 (Main Warehouse)</p>
        </div>
      </div>
    </Card>
  );
}