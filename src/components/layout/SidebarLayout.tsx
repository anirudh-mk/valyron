import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar.tsx";
import { Navbar } from "./navbar.tsx";
import { TabLayout } from "./TabLayout.tsx";
import { SidebarInset, SidebarProvider } from "@/components/base/sidebar";

interface SidebarLayoutProps {
  children?: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen bg-background min-w-0 overflow-hidden">
        <Navbar />
        <TabLayout>{children}</TabLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
