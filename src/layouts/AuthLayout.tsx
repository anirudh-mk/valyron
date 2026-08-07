import {AppSidebar} from "@/components/app-sidebar.tsx";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import type {ReactNode} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {TabProvider, getPageTitle, useTabs} from "@/hooks/use-tabs.tsx";
import {TabBar} from "@/components/tabs/TabBar.tsx";
import {getSearchPages} from "@/components/tabs/PageSearchDialog.tsx";

function AuthLayoutContent({ children }: { children?: ReactNode }) {
  const { tabsEnabled, tabPosition } = useTabs();
  const location = useLocation();
  const searchPages = getSearchPages();
  const activePage = searchPages.find(p => p.url === location.pathname);
  const category = activePage?.category || "Platform";
  const title = activePage?.title || getPageTitle(location.pathname);

  const isVertical = tabPosition === "left" || tabPosition === "right";

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="flex flex-col h-screen bg-background min-w-0 overflow-hidden">
        <header
          className="sticky top-0 z-50 bg-background border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {location.pathname !== "/dashboard" && location.pathname !== "/" && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <span className="text-muted-foreground">
                        {category}
                      </span>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block"/>
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
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
