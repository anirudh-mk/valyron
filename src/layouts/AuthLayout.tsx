import {AppSidebar} from "@/components/layout/app-sidebar.tsx";
import {Navbar} from "@/components/layout/navbar.tsx";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/base/sidebar"
import type {ReactNode} from "react";
import {Outlet} from "react-router-dom";
import {TabProvider, useTabs} from "@/hooks/use-tabs.tsx";
import {TabBar} from "@/components/tabs/TabBar.tsx";

function AuthLayoutContent({ children }: { children?: ReactNode }) {
  const { tabsEnabled, tabPosition } = useTabs();

  const isVertical = tabPosition === "left" || tabPosition === "right";

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="flex flex-col h-screen bg-background min-w-0 overflow-hidden">
        <Navbar />
        
        {/* Horizontal Top Tab Bar */}
        {tabsEnabled && tabPosition === "top" && <TabBar />}

        {/* Content Wrapper */}
        <div className={`flex-1 flex min-h-0 min-w-0 overflow-hidden ${isVertical ? "flex-row" : "flex-col"}`}>
          {/* Vertical Left Tab Bar */}
          {tabsEnabled && tabPosition === "left" && <TabBar />}

          {/* Main Page Area */}
          <div className="flex-1 overflow-auto min-w-0">
            {children ?? <Outlet />}
          </div>

          {/* Vertical Right Tab Bar */}
          {tabsEnabled && tabPosition === "right" && <TabBar />}
        </div>

        {/* Horizontal Bottom Tab Bar */}
        {tabsEnabled && tabPosition === "bottom" && <TabBar />}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AuthLayout({children}: { children?: ReactNode }) {
  return (
    <TabProvider>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </TabProvider>
  )
}
