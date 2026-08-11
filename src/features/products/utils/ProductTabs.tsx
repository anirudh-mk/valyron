import BasicInformationSection from "@/features/products/sections/BasicInformationSection.tsx";
import ProductPreviewSection from "@/features/products/sections/ProductPreviewSection.tsx";
import PricingSection from "@/features/products/sections/PricingSection.tsx";
import InventorySection from "@/features/products/sections/InventorySection.tsx";
import VariantsSection from "@/features/products/sections/VariantsSection.tsx";
import VariantsSidebarSection from "@/features/products/sections/VariantsSidebarSection.tsx";
import AccountingSection from "@/features/products/sections/AccountingSection.tsx";
import AccountingSidebarSection from "@/features/products/sections/AccountingSidebarSection.tsx";
import MediaSection from "@/features/products/sections/MediaSection.tsx";
import MediaSidebarSection from "@/features/products/sections/MediaSidebarSection.tsx";
import AdditionalInfoSection from "@/features/products/sections/AdditionalInfoSection.tsx";
import AdditionalInfoSidebarSection from "@/features/products/sections/AdditionalInfoSidebarSection.tsx";

export const tabs = [
  {
    value: "basic-information",
    label: "Basic Information",
    content: <BasicInformationSection />,
    sidebar: <ProductPreviewSection />,
  },
  {
    value: "pricing-inventory",
    label: "Pricing & Inventory",
    content: (
      <div className="space-y-4 min-w-0">
        <PricingSection />
        <InventorySection />
      </div>
    ),
    sidebar: <ProductPreviewSection />,
  },
  {
    value: "variants",
    label: "Variants",
    content: (
      <div className="space-y-4 min-w-0">
        <VariantsSection />
      </div>
    ),
    sidebar: <VariantsSidebarSection />,
  },
  {
    value: "accounting",
    label: "Accounting",
    content: (
      <div className="space-y-4 min-w-0">
        <AccountingSection />
      </div>
    ),
    sidebar: <AccountingSidebarSection />,
  },
  {
    value: "media-documents",
    label: "Media & Documents",
    content: (
      <div className="space-y-4 min-w-0">
        <MediaSection />
      </div>
    ),
    sidebar: <MediaSidebarSection />,
  },
  {
    value: "additional-info",
    label: "Additional Info",
    content: (
      <div className="space-y-4 min-w-0">
        <AdditionalInfoSection />
      </div>
    ),
    sidebar: <AdditionalInfoSidebarSection />,
  },
];