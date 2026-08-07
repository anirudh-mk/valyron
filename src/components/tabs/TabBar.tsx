import React, { useRef, useEffect, useState } from "react";
import { X, Plus, FileText } from "lucide-react";
import { useTabs } from "@/hooks/use-tabs";
import { PageSearchDialog } from "./PageSearchDialog";
import { cn } from "@/lib/utils";
import { sidebarConfig } from "@/shared/config/navigation/sidebar.config";

// Get page icon from sidebar config
export function getTabIcon(url: string) {
  const pathname = url.split("?")[0];
  
  if (sidebarConfig?.navMain) {
    for (const item of sidebarConfig.navMain) {
      if (item.url === pathname && item.icon) return item.icon;
      if (item.items) {
        for (const subItem of item.items) {
          if (subItem.url === pathname && item.icon) return item.icon;
        }
      }
    }
  }
  return FileText;
}

export function TabBar() {
  const { tabs, activeTabId, openTab, closeTab, tabPosition } = useTabs();
  const [dialogOpen, setDialogOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isVertical = tabPosition === "left" || tabPosition === "right";

  // Wheel horizontal scrolling helper for horizontal mode
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && !isVertical) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Keyboard shortcut listener (Alt+P or Ctrl+P to trigger search dialog)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key === "p") || (e.altKey && e.key === "P")) {
        e.preventDefault();
        setDialogOpen(prev => !prev);
      }
      
      if ((e.ctrlKey && e.key === "p") || (e.ctrlKey && e.key === "P")) {
        e.preventDefault();
        setDialogOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Middle-click mouse up to close tab
  const handleMouseUp = (e: React.MouseEvent, tabId: string) => {
    if (e.button === 1) { // Middle click
      e.preventDefault();
      closeTab(tabId);
    }
  };

  // Scroll active tab into view when activeTabId changes
  useEffect(() => {
    if (activeTabId && scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(
        `[data-tab-id="${activeTabId}"]`
      ) as HTMLElement;

      if (activeElement) {
        const container = scrollContainerRef.current;
        if (isVertical) {
          const containerTop = container.scrollTop;
          const containerBottom = containerTop + container.clientHeight;
          const elemTop = activeElement.offsetTop;
          const elemBottom = elemTop + activeElement.clientHeight;

          if (elemTop < containerTop) {
            container.scrollTo({ top: elemTop - 10, behavior: "smooth" });
          } else if (elemBottom > containerBottom) {
            container.scrollTo({ top: elemBottom - container.clientHeight + 10, behavior: "smooth" });
          }
        } else {
          const containerLeft = container.scrollLeft;
          const containerRight = containerLeft + container.clientWidth;
          const elemLeft = activeElement.offsetLeft;
          const elemRight = elemLeft + activeElement.clientWidth;

          if (elemLeft < containerLeft) {
            container.scrollTo({ left: elemLeft - 20, behavior: "smooth" });
          } else if (elemRight > containerRight) {
            container.scrollTo({ left: elemRight - container.clientWidth + 20, behavior: "smooth" });
          }
        }
      }
    }
  }, [activeTabId, tabs, isVertical]);

  return (
    <div
      className={cn(
        "flex select-none shrink-0 bg-slate-100 dark:bg-slate-900 border-border transition-all",
        isVertical
          ? cn(
              "flex-col w-48 h-full",
              tabPosition === "left" ? "border-r" : "border-l"
            )
          : cn(
              "items-center h-9 w-full border-b",
              tabPosition === "top"
                ? "sticky top-16 z-40 transition-[top] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:top-12"
                : "sticky bottom-0 z-40"
            )
      )}
    >
      {/* Scrollable Tabs Wrapper */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className={cn(
          "scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          isVertical
            ? "flex flex-col flex-1 w-full overflow-y-auto overflow-x-hidden py-1.5 gap-0.5"
            : "flex items-center flex-1 h-full overflow-x-auto overflow-y-hidden whitespace-nowrap"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const Icon = getTabIcon(tab.url);

          return (
            <div
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => openTab(tab.url)}
              onMouseUp={(e) => handleMouseUp(e, tab.id)}
              className={cn(
                "group relative flex items-center gap-1.5 px-3 cursor-pointer text-xs transition-colors",
                isVertical
                  ? "py-2.5 w-full justify-start border-b border-border/10"
                  : "h-full border-r border-border",
                isActive
                  ? cn(
                      "bg-background text-foreground font-medium",
                      isVertical
                        ? tabPosition === "left"
                          ? "border-l-2 border-l-primary"
                          : "border-r-2 border-r-primary"
                        : "border-t-2 border-t-primary"
                    )
                  : "bg-slate-100 dark:bg-slate-950/20 text-muted-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/40 hover:text-foreground"
              )}
            >
              {/* Tab Icon */}
              <Icon className={cn("size-3.5 shrink-0", isActive ? "text-primary" : "opacity-75")} />
              
              {/* Tab Title */}
              <span className="truncate max-w-[110px]">{tab.title}</span>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className={cn(
                  "p-0.5 rounded-sm hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-all",
                  isVertical ? "ml-auto" : "ml-1.5",
                  // Always show close button on active tab, and on hover for inactive tabs
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                <X className="size-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Buttons (Add Tab button / Search button) */}
      <div
        className={cn(
          "flex items-center shrink-0 bg-slate-100 dark:bg-slate-900",
          isVertical
            ? "justify-center w-full py-2 border-t border-border"
            : "h-full px-1 border-l border-border"
        )}
      >
        <button
          onClick={() => setDialogOpen(true)}
          title="Search Pages (Ctrl+P / Alt+P)"
          className="flex items-center justify-center size-7 rounded-sm hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* CmdK Page Search Dialog */}
      <PageSearchDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
