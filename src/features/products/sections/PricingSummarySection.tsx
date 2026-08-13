import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export default function PricingSummarySection() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Pricing Summary</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="space-y-2.5">
          <div className="flex items-center justify-between">
            <dt className="text-xs text-muted-foreground">Selling Price (Excl. Tax)</dt>
            <dd className="text-xs font-medium">₹ 1,694.92</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-xs text-muted-foreground">GST 18%</dt>
            <dd className="text-xs font-medium">₹ 304.08</dd>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <dt className="text-xs text-muted-foreground">Selling Price (Incl. Tax)</dt>
            <dd className="text-sm font-bold">₹ 1,999.00</dd>
          </div>
        </dl>

        {/* Profit Margin highlight */}
        <div className="flex items-center justify-between rounded-md bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-3 py-2 mt-3">
          <p className="text-xs font-medium text-green-700 dark:text-green-400">Profit Margin</p>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">17.6%</p>
        </div>
      </CardContent>
    </Card>
  );
}