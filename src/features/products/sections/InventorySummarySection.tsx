import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export default function InventorySummarySection() {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Small Card</CardTitle>
        <CardDescription>
          This card uses the small size variant.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <p>
          The card component supports a size prop that can be set to
          &quot;sm&quot; for a more compact appearance.
        </p>
      </CardContent>
    </Card>
  );
}