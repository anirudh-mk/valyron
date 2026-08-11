import { Card } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export default function PricingSummarySection() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="text-sm font-semibold">Pricing Summary</h3>

      <div className="space-y-2.5">
        {/* Selling Price Excl. Tax */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Selling Price (Excl. Tax)</p>
          <p className="text-xs font-medium">₹ 1,694.92</p>
        </div>

        {/* GST */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">GST 18%</p>
          <p className="text-xs font-medium">₹ 304.08</p>
        </div>

        <Separator />

        {/* Selling Price Incl. Tax */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Selling Price (Incl. Tax)</p>
          <p className="text-sm font-bold">₹ 1,999.00</p>
        </div>
      </div>

      {/* Profit Margin */}
      <div className="flex items-center justify-between rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-3 py-2 mt-1">
        <p className="text-xs font-medium text-green-700 dark:text-green-400">Profit Margin</p>
        <p className="text-sm font-bold text-green-700 dark:text-green-400">17.6%</p>
      </div>
    </Card>
  );
}