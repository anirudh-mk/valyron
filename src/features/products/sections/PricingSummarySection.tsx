import {Card} from "@/components/ui/card.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Info} from "lucide-react";

export default function PricingSummarySection() {
  return (
    <Card className="p-4">
      <h3 className="text-base font-semibold">
        Pricing Summary
      </h3>

      <div className="mt-4 space-y-3 border-b pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Selling Price (Excl.Tax)
          </p>
          <p className="text-sm font-medium">
            $1,299.00
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            GST (18%)
          </p>
          <p className="text-sm font-medium">
            $300.00
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Stock
          </p>
          <p className="text-sm font-medium">
            25 (Main Warehouse)
          </p>
        </div>
      </div>
    </Card>
  );
}