import { Card } from "@/components/ui/card.tsx";

export default function InventorySummarySection() {
  return (
    <Card className="p-4 space-y-3">
      <h3 className="text-sm font-semibold">Inventory Summary</h3>

      <div className="space-y-2.5">
        {/* Initial Stock */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Initial Stock</p>
          <p className="text-xs font-medium">25</p>
        </div>

        {/* Reorder Point */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Reorder Point</p>
          <p className="text-xs font-medium">10</p>
        </div>

        {/* Reorder Quantity */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Reorder Quantity</p>
          <p className="text-xs font-medium">50</p>
        </div>

        {/* Default Warehouse */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Default Warehouse</p>
          <p className="text-xs font-medium">Main Warehouse</p>
        </div>
      </div>
    </Card>
  );
}