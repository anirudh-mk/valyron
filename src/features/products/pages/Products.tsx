import {Info} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import TabSection from "@/features/products/sections/TabSection.tsx";
import Workspace from "@/components/common/Workspace.tsx";
import HeaderSection from "@/features/products/sections/HeaderSection.tsx";

export default function Products() {
  return (
    <Workspace>
      <HeaderSection/>
      <TabSection/>
      <Alert className="w-full">
        <Info/>
        <AlertDescription>
          You can save this product as a draft and publish it later. Draft products will not be visible to customers
          until they are published.
        </AlertDescription>
      </Alert>
    </Workspace>
  );
}