import { useContext } from "react";
import { TabContext } from "./tabs.provider";

// Re-export everything for backward compatibility
export type { Tab, TabPosition, TabContextType } from "./tabs.types";
export { getPageTitle } from "./tabs.utils";
export { TabProvider, TabContext } from "./tabs.provider";

export function useTabs() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
}
