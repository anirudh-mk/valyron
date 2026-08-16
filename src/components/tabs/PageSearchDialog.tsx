import React from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/base/command";
import { useTabs } from "@/hooks/use-tabs";
import { sidebarConfig } from "@/shared/config/navigation/sidebar.config";

interface PageSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface SearchPageItem {
  title: string;
  url: string;
  category: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Extract all valid navigable routes from sidebarConfig
export function getSearchPages(): SearchPageItem[] {
  const pages: SearchPageItem[] = [];
  const allItems = sidebarConfig.groups?.flatMap(group => group.items) || [];

  // Add Dashboard
  const dbItem = allItems.find(item => item.url === "/dashboard");
  pages.push({
    title: "Dashboard",
    url: "/dashboard",
    category: "General",
    icon: dbItem?.icon,
  });

  allItems.forEach(item => {
    // If the item has children/sub-items
    if (item.items && item.items.length > 0) {
      item.items.forEach(subItem => {
        if (subItem.url && subItem.url !== "#") {
          pages.push({
            title: subItem.title,
            url: subItem.url,
            category: item.title,
            icon: item.icon, // Inherit parent icon
          });
        }
      });
    } else if (item.url && item.url !== "#" && item.url !== "/dashboard") {
      // Standalone items (e.g. Products, Reports)
      pages.push({
        title: item.title,
        url: item.url,
        category: "Platform",
        icon: item.icon,
      });
    }
  });

  return pages;
}

export function PageSearchDialog({ open, onOpenChange }: PageSearchDialogProps) {
  const { openTab } = useTabs();
  const searchPages = getSearchPages();

  // Find unique categories
  const categories = Array.from(new Set(searchPages.map(page => page.category)));

  const handleSelect = (url: string) => {
    openTab(url);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Pages"
      description="Type a page name to navigate quickly..."
    >
      <CommandInput placeholder="Search pages... (e.g. Invoice, Customer, Estimate)" />
      <CommandList>
        <CommandEmpty>No pages found.</CommandEmpty>
        {categories.map(category => (
          <CommandGroup key={category} heading={category}>
            {searchPages
              .filter(page => page.category === category)
              .map(page => {
                const Icon = page.icon;
                return (
                  <CommandItem
                    key={page.url}
                    value={page.title}
                    onSelect={() => handleSelect(page.url)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {Icon && <Icon className="size-4 opacity-70" />}
                    <span>{page.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto font-mono">
                      {page.url}
                    </span>
                  </CommandItem>
                );
              })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
