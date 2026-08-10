import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs.tsx";

import BasicInformationSection from "@/features/products/sections/BasicInformationSection.tsx";
import PricingSection from "@/features/products/sections/PricingSection.tsx";
import InventorySection from "@/features/products/sections/InventorySection.tsx";
import VariantsSection from "@/features/products/sections/VariantsSection.tsx";
import AccountingSection from "@/features/products/sections/AccountingSection.tsx";
import MediaSection from "@/features/products/sections/MediaSection.tsx";
import AdditionalInfoSection from "@/features/products/sections/AdditionalInfoSection.tsx";
import ProductPreviewSection from "@/features/products/sections/ProductPreviewSection.tsx";
import VariantsSidebarSection from "@/features/products/sections/VariantsSidebarSection.tsx";
import AccountingSidebarSection from "@/features/products/sections/AccountingSidebarSection.tsx";
import MediaSidebarSection from "@/features/products/sections/MediaSidebarSection.tsx";
import AdditionalInfoSidebarSection from "@/features/products/sections/AdditionalInfoSidebarSection.tsx";
import {Info} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Card} from "@/components/ui/card.tsx";

export default function Products() {
  return (
    <div className="p-4 space-y-4">
      {/* Page Heading */}
      <h1 className="text-2xl font-semibold">
        Create Product
      </h1>

      <Tabs
        defaultValue="basic-information"
        className="mt-4"
      >
        <TabsList
          variant="line"
          className="w-full justify-start border-b border-border"
        >
          <TabsTrigger value="basic-information" className="flex-none">
            Basic Information
          </TabsTrigger>

          <TabsTrigger value="pricing-inventory" className="flex-none">
            Pricing & Inventory
          </TabsTrigger>

          <TabsTrigger value="variants" className="flex-none">
            Variants
          </TabsTrigger>

          <TabsTrigger value="accounting" className="flex-none">
            Accounting
          </TabsTrigger>

          <TabsTrigger value="media-documents" className="flex-none">
            Media & Documents
          </TabsTrigger>

          <TabsTrigger value="additional-info" className="flex-none">
            Additional Info
          </TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent
          value="basic-information"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-4">
            {/* Left */}
            <div className="min-w-0">
              <BasicInformationSection/>
            </div>

            {/* Right */}
            <aside className="sticky top-4 self-start">
              <ProductPreviewSection/>
            </aside>
          </div>
        </TabsContent>

        {/* Pricing & Inventory */}
        <TabsContent
          value="pricing-inventory"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 min-w-0">
              <PricingSection />
              <InventorySection />
            </div>

            <aside className="sticky top-4 self-start">
              <ProductPreviewSection/>
            </aside>
          </div>
        </TabsContent>

        {/* Variants */}
        <TabsContent
          value="variants"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 min-w-0">
              <VariantsSection />
            </div>

            <aside className="sticky top-4 self-start">
              <VariantsSidebarSection />
            </aside>
          </div>
        </TabsContent>

        {/* Accounting */}
        <TabsContent
          value="accounting"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 min-w-0">
              <AccountingSection />
            </div>

            <aside className="sticky top-4 self-start">
              <AccountingSidebarSection />
            </aside>
          </div>
        </TabsContent>

        {/* Media & Documents */}
        <TabsContent
          value="media-documents"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 min-w-0">
              <MediaSection />
            </div>

            <aside className="sticky top-4 self-start">
              <MediaSidebarSection />
            </aside>
          </div>
        </TabsContent>

        {/* Additional Info */}
        <TabsContent
          value="additional-info"
          className="mt-4"
        >
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4 min-w-0">
              <AdditionalInfoSection />
            </div>

            <aside className="sticky top-4 self-start">
              <AdditionalInfoSidebarSection />
            </aside>
          </div>
        </TabsContent>
      </Tabs>
      <Alert className="w-full">
        <Info />
        <AlertDescription>
          You can save this product as a draft and publish it later. Draft products will not be visible to customers until they are published.
        </AlertDescription>
      </Alert>
    </div>
  );
}