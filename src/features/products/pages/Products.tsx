import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs.tsx";

import BasicInformationSection from "@/features/products/sections/BasicInformationSection.tsx";
import ProductPreviewSection from "@/features/products/sections/ProductPreviewSection.tsx";
import {Info} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

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
            <div>
              {/* Pricing & Inventory */}
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
            <div>
              {/* Variants */}
            </div>

            <aside className="sticky top-4 self-start">
              <ProductPreviewSection/>
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