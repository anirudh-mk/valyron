import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card.tsx";

const INVENTORY_ROWS = [
  { label: "Initial Stock", value: "25" },
  { label: "Reorder Point", value: "10" },
  { label: "Reorder Quantity", value: "50" },
  { label: "Default Warehouse", value: "Main Warehouse" },
] as const;

export default function InventorySummarySection() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm">Inventory Summary</CardTitle>
      </CardHeader>

      <CardContent>
        <dl className="space-y-2.5">
          {INVENTORY_ROWS.map(({ label, value }) => (
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