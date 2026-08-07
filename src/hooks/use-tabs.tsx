import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarConfig } from "@/shared/config/navigation/sidebar.config";

export interface Tab {
  id: string; // URL pathname, e.g. "/dashboard/sales/estimate"
  title: string; // Display title
  url: string; // URL pathname + search query parameters
}

export type TabPosition = "top" | "bottom" | "left" | "right";

interface TabContextType {
  tabs: Tab[];
  activeTabId: string | null;
  openTab: (url: string, title?: string) => void;
  closeTab: (id: string) => void;
  closeOtherTabs: (id: string) => void;
  closeAllTabs: () => void;
  tabsEnabled: boolean;
  setTabsEnabled: (enabled: boolean) => void;
  tabPosition: TabPosition;
  setTabPosition: (position: TabPosition) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// Helper to look up human-readable title from URL pathname
export function getPageTitle(url: string): string {
  const pathname = url.split("?")[0];
  
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";

  // Check sidebar config
  if (sidebarConfig?.navMain) {
    for (const item of sidebarConfig.navMain) {
      if (item.url === pathname) return item.title;
      if (item.items) {
        for (const subItem of item.items) {
          if (subItem.url === pathname) return subItem.title;
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
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function TabProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Load from sessionStorage or default to Dashboard tab
  const [tabs, setTabs] = useState<Tab[]>(() => {
    try {
      const stored = sessionStorage.getItem("valyron_tabs");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading tabs from sessionStorage", e);
    }
    return [{ id: "/dashboard", title: "Dashboard", url: "/dashboard" }];
  });

  // Load tabsEnabled setting from localStorage (default: true)
  const [tabsEnabled, setTabsEnabledState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("valyron_tabs_enabled");
      return stored !== "false";
    } catch (e) {
      console.error("Error reading setting from localStorage", e);
      return true;
    }
  });

  const setTabsEnabled = (enabled: boolean) => {
    setTabsEnabledState(enabled);
    try {
      localStorage.setItem("valyron_tabs_enabled", JSON.stringify(enabled));
    } catch (e) {
      console.error("Error writing setting to localStorage", e);
    }
  };

  const [tabPosition, setTabPositionState] = useState<TabPosition>(() => {
    try {
      const stored = localStorage.getItem("valyron_tab_position");
      if (stored === "top" || stored === "bottom" || stored === "left" || stored === "right") {
        return stored;
      }
    } catch (e) {
      console.error("Error reading tab position from localStorage", e);
    }
    return "top";
  });

  const setTabPosition = (position: TabPosition) => {
    setTabPositionState(position);
    try {
      localStorage.setItem("valyron_tab_position", position);
    } catch (e) {
      console.error("Error writing tab position to localStorage", e);
    }
  };

  const activeTabId = location.pathname;

  // Persist tabs list whenever it changes
  useEffect(() => {
    sessionStorage.setItem("valyron_tabs", JSON.stringify(tabs));
  }, [tabs]);

  // Synchronize tabs state with active routing
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip empty or base path logic redirecting to dashboard
    if (currentPath === "/") return;

    const exists = tabs.some(tab => tab.id === currentPath);
    if (!exists) {
      const title = getPageTitle(currentPath);
      const newTab: Tab = {
        id: currentPath,
        title,
        url: currentPath + location.search,
      };
      setTabs(prev => [...prev, newTab]);
    } else {
      // Keep URL search params up to date
      setTabs(prev =>
        prev.map(tab => {
          if (tab.id === currentPath && tab.url !== (currentPath + location.search)) {
            return { ...tab, url: currentPath + location.search };
          }
          return tab;
        })
      );
    }
  }, [location.pathname, location.search]);

  const openTab = (url: string, title?: string) => {
    const pathname = url.split("?")[0];
    const resolvedTitle = title || getPageTitle(pathname);
    
    setTabs(prev => {
      const exists = prev.some(tab => tab.id === pathname);
      if (exists) {
        return prev.map(tab => {
          if (tab.id === pathname) {
            return { ...tab, url };
          }
          return tab;
        });
      }
      return [...prev, { id: pathname, title: resolvedTitle, url }];
    });
    navigate(url);
  };

  const closeTab = (id: string) => {
    const index = tabs.findIndex(tab => tab.id === id);
    if (index === -1) return;

    const newTabs = tabs.filter(tab => tab.id !== id);

    // If there are no tabs left, reset to dashboard
    if (newTabs.length === 0) {
      const defaultTab = { id: "/dashboard", title: "Dashboard", url: "/dashboard" };
      setTabs([defaultTab]);
      navigate("/dashboard");
      return;
    }

    setTabs(newTabs);

    // If the closed tab was active, navigate to another open tab
    if (activeTabId === id) {
      const nextActiveIndex = Math.min(index, newTabs.length - 1);
      navigate(newTabs[nextActiveIndex].url);
    }
  };

  const closeOtherTabs = (id: string) => {
    const tabToKeep = tabs.find(tab => tab.id === id);
    if (tabToKeep) {
      setTabs([tabToKeep]);
      if (activeTabId !== id) {
        navigate(tabToKeep.url);
      }
    }
  };

  const closeAllTabs = () => {
    const defaultTab = { id: "/dashboard", title: "Dashboard", url: "/dashboard" };
    setTabs([defaultTab]);
    navigate("/dashboard");
  };

  return (
    <TabContext.Provider
      value={{
        tabs,
        activeTabId,
        openTab,
        closeTab,
        closeOtherTabs,
        closeAllTabs,
        tabsEnabled,
        setTabsEnabled,
        tabPosition,
        setTabPosition,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
}
