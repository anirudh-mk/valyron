import { Card } from "@/components/ui/card.tsx";

export default function QuickPreviewSection() {
  return (
    <Card className="p-4">
      <h3 className="text-base font-semibold">
        Quick Preview
      </h3>

      <div className="mt-4 space-y-3 border-t pt-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Category
          </p>
          <p className="text-sm font-medium">
            Laptops
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Brand
          </p>
          <p className="text-sm font-medium">
            Apple
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