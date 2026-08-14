import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Checkbox } from "@/components/base/checkbox";
import { Label } from "@/components/base/label";
import { useTabs } from "@/hooks/use-tabs";
import type { TabPosition } from "@/hooks/use-tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import { Settings2, Layout, Database, Sliders, Info, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const { tabsEnabled, setTabsEnabled, tabs, closeAllTabs, tabPosition, setTabPosition } = useTabs();

  const handleResetCache = () => {
    sessionStorage.removeItem("valyron_tabs");
    closeAllTabs();
    alert("Session cache reset successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-primary">
          <Settings2 className="size-6" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your interface layouts, data storage, and preference behaviors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Main Settings Panel */}
        <div className="md:col-span-2 space-y-6">
          {/* Layout Configurations */}
          <Card className="border shadow-md bg-card">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Layout className="size-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Workspace Layout</CardTitle>
                <CardDescription>Configure how you navigate between views</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {/* Enable Tabs Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40">
                <Checkbox
                  id="tab-toggle"
                  checked={tabsEnabled}
                  onCheckedChange={(checked) => setTabsEnabled(checked === true)}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="tab-toggle"
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    Enable VS Code-style Tabbed Navigation
                  </Label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Keep multiple pages open as horizontal tabs at the top of your screen. 
                    If disabled, navigating to other pages will close the current one in standard single-page fashion.
                  </p>
                </div>
              </div>

              {/* Tab Position Selector (only visible if tabs are enabled) */}
              {tabsEnabled && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Tab Bar Position
                    </Label>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Choose where the tab navigation bar should be positioned on your screen.
                    </p>
                  </div>
                  <Select value={tabPosition} onValueChange={(val: TabPosition) => setTabPosition(val)}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left (Vertical)</SelectItem>
                      <SelectItem value="right">Right (Vertical)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cache and Storage */}
          <Card className="border shadow-md bg-card">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <Database className="size-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Cache & Storage</CardTitle>
                <CardDescription>Manage active local session storage</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Active Session Tabs Cache
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Currently tracking <span className="font-semibold text-primary">{tabs.length}</span> open tab state(s).
                  </p>
                </div>
                <button
                  onClick={handleResetCache}
                  className="px-3 py-1.5 bg-destructive hover:bg-destructive/90 text-white rounded-md text-xs font-medium transition-colors shadow-xs"
                >
                  Clear Tab Cache
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info Card */}
        <div className="space-y-6">
          <Card className="border shadow-md bg-card">
            <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
              <Info className="size-4.5 text-blue-500" />
              <CardTitle className="text-sm font-bold">Preferences Info</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-3 leading-relaxed">
              <p>
                Settings changes are updated dynamically and saved in your browser's 
                <span className="font-semibold text-slate-800 dark:text-slate-200"> localStorage</span>.
              </p>
              <p>
                Tabs cache is stored in 
                <span className="font-semibold text-slate-800 dark:text-slate-200"> sessionStorage</span> 
                so it remains isolated to this browser tab.
              </p>
              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-lg flex gap-2 text-slate-700 dark:text-slate-300">
                <Sliders className="size-4 shrink-0 text-blue-500 mt-0.5" />
                <p className="leading-normal">
                  Toggle tabs off to maximize view height for dense tables or reporting tools.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
