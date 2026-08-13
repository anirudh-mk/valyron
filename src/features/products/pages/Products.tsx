import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

import BasicInformationSection from "@/features/products/sections/BasicInformationSection.tsx";
import PricingSection from "@/features/products/sections/PricingSection.tsx";
import InventorySection from "@/features/products/sections/InventorySection.tsx";
import VariantsSection from "@/features/products/sections/VariantsSection.tsx";
import AccountingSection from "@/features/products/sections/AccountingSection.tsx";
import MediaSection from "@/features/products/sections/MediaSection.tsx";
import AdditionalInfoSection from "@/features/products/sections/AdditionalInfoSection.tsx";
import TabLayout from "@/features/products/components/TabLayout.tsx";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";


export default function ProductCreatePage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Create Product</h1>

      <Tabs defaultValue="basic-information">
        <TabsList variant="line" className="w-full justify-start border-b border-border">
          <TabsTrigger value="basic-information" className="flex-none">Basic Information</TabsTrigger>
          <TabsTrigger value="pricing-inventory" className="flex-none">Pricing &amp; Inventory</TabsTrigger>
          <TabsTrigger value="variants" className="flex-none">Variants</TabsTrigger>
          <TabsTrigger value="accounting" className="flex-none">Accounting</TabsTrigger>
          <TabsTrigger value="media-documents" className="flex-none">Media &amp; Documents</TabsTrigger>
          <TabsTrigger value="additional-info" className="flex-none">Additional Info</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-information">
          <TabLayout>
            <BasicInformationSection />
          </TabLayout>
        </TabsContent>

        <TabsContent value="pricing-inventory">
          <TabLayout>
            <PricingSection />
            <InventorySection />
          </TabLayout>
        </TabsContent>

        <TabsContent value="variants">
          <TabLayout>
            <VariantsSection />
          </TabLayout>
        </TabsContent>

        <TabsContent value="accounting">
          <TabLayout>
            <AccountingSection />
          </TabLayout>
        </TabsContent>

        <TabsContent value="media-documents">
          <TabLayout>
            <MediaSection />
          </TabLayout>
        </TabsContent>

        <TabsContent value="additional-info">
          <TabLayout>
            <AdditionalInfoSection />
          </TabLayout>
        </TabsContent>
      </Tabs>

      <Alert className="w-full">
        <Info />
        <AlertDescription>
          You can save this product as a draft and publish it later. Draft products will not be
          visible to customers until they are published.
        </AlertDescription>
      </Alert>
    </div>
  );
}
