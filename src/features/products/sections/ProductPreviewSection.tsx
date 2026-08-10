import QuickPreviewSection from "@/features/products/sections/QuickPreviewSection.tsx";
import PricingSummarySection from "@/features/products/sections/PricingSummarySection.tsx";
import InventorySummarySection from "@/features/products/sections/InventorySummarySection.tsx";

export default function ProductPreviewSection() {
  return (
    <div className="space-y-4">
      <QuickPreviewSection />
      <PricingSummarySection />
      <InventorySummarySection />
    </div>
  )
}