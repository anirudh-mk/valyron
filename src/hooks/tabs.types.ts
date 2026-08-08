export interface Tab {
  id: string; // URL pathname, e.g. "/dashboard/sales/estimate"
  title: string; // Display title
  url: string; // URL pathname + search query parameters
}

export type TabPosition = "top" | "bottom" | "left" | "right";

export interface TabContextType {
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
