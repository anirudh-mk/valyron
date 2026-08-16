import { sidebarConfig } from "@/shared/config/navigation/sidebar.config";

// Helper to look up human-readable title from URL pathname
export function getPageTitle(url: string): string {
  const pathname = url.split("?")[0];

  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";

  // Check sidebar config
  if (sidebarConfig?.groups) {
    for (const group of sidebarConfig.groups) {
      if (group.items) {
        for (const item of group.items) {
          if (item.url === pathname) return item.title;
          if (item.items) {
            for (const subItem of item.items) {
              if (subItem.url === pathname) return subItem.title;
            }
          }
        }
      }
    }
  }

  // Fallback: capitalize segments
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "Dashboard";

  const lastSegment = parts[parts.length - 1];
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
