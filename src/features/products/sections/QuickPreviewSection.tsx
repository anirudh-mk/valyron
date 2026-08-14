import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card.tsx";
import { Badge } from "@/components/base/badge.tsx";
import { Separator } from "@/components/base/separator.tsx";

const DETAIL_ROWS = [
  { label: "Category", value: "Laptops" },
  { label: "Brand", value: "Apple" },
  { label: "Stock", value: "25 (Main Warehouse)" },
] as const;

export default function QuickPreviewSection() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Quick Preview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Product mini-card */}
        <article className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/30">
          {/* Thumbnail */}
          <figure className="w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-slate-700 via-purple-700 to-pink-600 flex items-center justify-center">
            <figcaption className="text-white text-xs font-bold tracking-tight text-center leading-tight px-1">
              MacBook
            </figcaption>
          </figure>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight truncate">MacBook Pro M3 14"</p>
            <p className="text-xs text-primary mt-0.5 font-medium">SKU: MBP-M3-14</p>
            <Badge className="mt-1.5 text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800">
              Active
            </Badge>
          </div>
        </article>

        {/* Price */}
        <section>
          <p className="text-xl font-bold">₹ 1,999.00</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cost: ₹ 1,650.00 · Margin: 17.6%
          </p>
        </section>

        <Separator />

        {/* Details */}
        <dl className="space-y-2">
          {DETAIL_ROWS.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-xs font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}