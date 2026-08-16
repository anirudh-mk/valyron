import type { ReactNode } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout.tsx";
import { TabProvider } from "@/hooks/use-tabs.tsx";

export default function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <TabProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </TabProvider>
  );
}
