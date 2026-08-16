import { useLocation } from "react-router-dom";
import { getPageTitle } from "@/hooks/use-tabs.tsx";
import { getSearchPages } from "@/components/tabs/PageSearchDialog.tsx";
import { SidebarTrigger } from "@/components/base/sidebar";
import { Separator } from "@/components/base/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/base/breadcrumb";

export function Navbar() {
  const location = useLocation();
  const searchPages = getSearchPages();
  const activePage = searchPages.find((p) => p.url === location.pathname);
  const category = activePage?.category || "Platform";
  const title = activePage?.title || getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-50 bg-background border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {location.pathname !== "/dashboard" && location.pathname !== "/" && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <span className="text-muted-foreground">{category}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}